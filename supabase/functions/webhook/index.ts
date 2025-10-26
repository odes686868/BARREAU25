import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cryptoProvider = Deno.createHttpClient({})

serve(async (request) => {
  const signature = request.headers.get('Stripe-Signature')

  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  const body = await request.text()
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!

  let event

  try {
    event = await verifySignature(body, signature, webhookSecret)
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message)
    return new Response(`Webhook signature verification failed.`, { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  console.log(`🔔 Event received: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(supabase, event.data.object)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(supabase, event.data.object)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(supabase, event.data.object)
        break
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(supabase, event.data.object)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (error) {
    console.error(`Error handling ${event.type}:`, error)
    return new Response(`Error handling ${event.type}`, { status: 500 })
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})

async function verifySignature(body: string, signature: string, secret: string) {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  const parts = signature.split(',')
  const timestamp = parts.find(part => part.startsWith('t='))?.split('=')[1]
  const hash = parts.find(part => part.startsWith('v1='))?.split('=')[1]

  if (!timestamp || !hash) {
    throw new Error('Invalid signature format')
  }

  const payload = `${timestamp}.${body}`
  const expectedHash = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  const expectedHashHex = Array.from(new Uint8Array(expectedHash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  if (expectedHashHex !== hash) {
    throw new Error('Invalid signature')
  }

  return JSON.parse(body)
}

async function handleCheckoutCompleted(supabase: any, session: any) {
  const userId = session.metadata?.user_id
  if (!userId) {
    console.error('No user_id in session metadata')
    return
  }

  // Create or update customer
  const { error: customerError } = await supabase
    .from('stripe_customers')
    .upsert({
      user_id: userId,
      customer_id: session.customer,
    })

  if (customerError) {
    console.error('Error upserting customer:', customerError)
    throw customerError
  }

  // If it's a subscription, handle it
  if (session.subscription) {
    const { data: subscription } = await fetch(
      `https://api.stripe.com/v1/subscriptions/${session.subscription}`,
      {
        headers: {
          'Authorization': `Bearer ${Deno.env.get('STRIPE_SECRET_KEY')}`,
        },
      }
    ).then(res => res.json())

    await handleSubscriptionChange(supabase, subscription)
  }
}

async function handleSubscriptionChange(supabase: any, subscription: any) {
  const { error } = await supabase
    .from('stripe_subscriptions')
    .upsert({
      customer_id: subscription.customer,
      subscription_id: subscription.id,
      price_id: subscription.items.data[0]?.price.id,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      status: subscription.status,
    })

  if (error) {
    console.error('Error upserting subscription:', error)
    throw error
  }
}

async function handleSubscriptionDeleted(supabase: any, subscription: any) {
  const { error } = await supabase
    .from('stripe_subscriptions')
    .update({ deleted_at: new Date().toISOString() })
    .eq('subscription_id', subscription.id)

  if (error) {
    console.error('Error deleting subscription:', error)
    throw error
  }
}

async function handlePaymentSucceeded(supabase: any, invoice: any) {
  // Update subscription status if needed
  if (invoice.subscription) {
    const { error } = await supabase
      .from('stripe_subscriptions')
      .update({ status: 'active' })
      .eq('subscription_id', invoice.subscription)

    if (error) {
      console.error('Error updating subscription status:', error)
      throw error
    }
  }
}