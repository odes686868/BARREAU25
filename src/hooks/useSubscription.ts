import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { getProductByPriceId } from '../stripe-config'

export interface SubscriptionData {
  customer_id: string | null
  subscription_id: string | null
  subscription_status: string | null
  price_id: string | null
  current_period_start: number | null
  current_period_end: number | null
  cancel_at_period_end: boolean | null
  payment_method_brand: string | null
  payment_method_last4: string | null
}

export const useSubscription = () => {
  const { user, loading: authLoading } = useAuth()
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setSubscription(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle()

        if (fetchError) {
          console.error('Error fetching subscription:', fetchError)
          setError('Failed to fetch subscription data')
          return
        }

        setSubscription(data)
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchSubscription()
    }
  }, [user, authLoading])

  const getSubscriptionPlan = () => {
    if (!subscription?.price_id) return null
    return getProductByPriceId(subscription.price_id)
  }

  const isActive = subscription?.subscription_status === 'active'
  const isPending = subscription?.subscription_status === 'incomplete' || 
                   subscription?.subscription_status === 'not_started'

  return {
    subscription,
    loading: loading || authLoading,
    error,
    isActive,
    isPending,
    plan: getSubscriptionPlan()
  }
}