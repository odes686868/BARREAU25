import { supabase } from './auth';

export interface SubscriptionData {
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
}

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription') {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('User not authenticated');
  }

  const baseUrl = window.location.origin;
  const successUrl = `${baseUrl}/success`;
  const cancelUrl = `${baseUrl}/pricing`;

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      price_id: priceId,
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  const { url } = await response.json();
  return url;
}

export async function getUserSubscription(): Promise<SubscriptionData | null> {
  const { data, error } = await supabase
    .from('stripe_user_subscriptions')
    .select('subscription_status, price_id, current_period_start, current_period_end, cancel_at_period_end')
    .maybeSingle();

  if (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }

  return data;
}