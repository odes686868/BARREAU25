import React, { useEffect } from 'react';
import { Crown, AlertCircle } from 'lucide-react';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { STRIPE_PRODUCTS } from '../stripe-config';

export function SubscriptionStatus() {
  const { subscription, loading, fetchSubscription } = useSubscriptionStore();

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-lg p-3">
        <div className="animate-pulse flex items-center">
          <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  const isActive = subscription?.subscription_status === 'active';
  const currentProduct = STRIPE_PRODUCTS.find(p => p.priceId === subscription?.price_id);

  if (!subscription || !isActive) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-center text-yellow-800">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Plan gratuit</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
      <div className="flex items-center text-blue-800">
        <Crown className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">
          {currentProduct?.name || 'Plan Premium'}
        </span>
      </div>
    </div>
  );
}