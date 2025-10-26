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
}

export function useSubscription() {
  const { user } = useAuthStore();
  const [subscription, setSubscription] = useState<SubscriptionData>({
    isActive: false
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
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        setSubscription({ isActive: false });
      } else if (data) {
        const product = getProductByPriceId(data.price_id);
        setSubscription({
          isActive: data.subscription_status === 'active',
          planName: product?.name,
          priceId: data.price_id,
          status: data.subscription_status,
          currentPeriodEnd: data.current_period_end
        });
      } else {
        setSubscription({ isActive: false });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription({ isActive: false });
    } finally {
      setLoading(false);
    }
  };

  return { subscription, loading, refetch: fetchSubscription };
}