import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { getProductByPriceId } from '../stripe-config';

interface SubscriptionData {
  isActive: boolean;
  planName?: string;
  priceId?: string;
  status?: string;
  currentPeriodEnd?: number;
  tier: 'free' | 'premium';
  freeTestsRemaining?: number;
}

export function useSubscription() {
  const { user } = useAuthStore();
  const [subscription, setSubscription] = useState<SubscriptionData>({
    isActive: false,
    tier: 'free'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    } else {
      setSubscription({ isActive: false });
      setLoading(false);
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      // Fetch user tier
      const { data: tierData, error: tierError } = await supabase
        .from('user_tiers')
        .select('*')
        .single();

      if (tierError && tierError.code !== 'PGRST116') {
        console.error('Error fetching tier:', tierError);
        setSubscription({ isActive: true, tier: 'free', freeTestsRemaining: 3 });
        setLoading(false);
        return;
      }

      // Fetch Stripe subscription
      const { data: stripeData, error: stripeError } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      const hasActiveStripeSubscription =
        stripeData && stripeData.subscription_status === 'active';

      if (hasActiveStripeSubscription) {
        const product = getProductByPriceId(stripeData.price_id);
        setSubscription({
          isActive: true,
          tier: 'premium',
          planName: product?.name,
          priceId: stripeData.price_id,
          status: stripeData.subscription_status,
          currentPeriodEnd: stripeData.current_period_end
        });
      } else if (tierData) {
        setSubscription({
          isActive: true,
          tier: tierData.tier || 'free',
          freeTestsRemaining: tierData.free_tests_remaining,
          planName: 'Plan Gratuit'
        });
      } else {
        setSubscription({
          isActive: true,
          tier: 'free',
          freeTestsRemaining: 3,
          planName: 'Plan Gratuit'
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription({ isActive: true, tier: 'free', freeTestsRemaining: 3 });
    } finally {
      setLoading(false);
    }
  };

  return { subscription, loading, refetch: fetchSubscription };
}