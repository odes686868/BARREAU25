import React, { useEffect, useState } from 'react';
import { Crown, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

interface SubscriptionData {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

export function SubscriptionStatus() {
  const { user } = useAuthStore();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchSubscription();
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Chargement...</span>
      </div>
    );
  }

  if (!subscription || subscription.subscription_status !== 'active') {
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <span className="text-sm">Forfait Gratuit</span>
      </div>
    );
  }

  const periodEnd = new Date(subscription.current_period_end * 1000);
  const isExpiringSoon = periodEnd.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000; // 7 days

  return (
    <div className="flex items-center space-x-2">
      <Crown className="w-4 h-4 text-yellow-500" />
      <span className="text-sm font-medium text-yellow-700">
        Forfait Premium
      </span>
      {subscription.cancel_at_period_end && (
        <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
          Se termine le {periodEnd.toLocaleDateString('fr-CA')}
        </span>
      )}
      {isExpiringSoon && !subscription.cancel_at_period_end && (
        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
          Renouvelle le {periodEnd.toLocaleDateString('fr-CA')}
        </span>
      )}
    </div>
  );
}