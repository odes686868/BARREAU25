import React, { useEffect, useState } from 'react';
import { Crown, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getProductByPriceId } from '../../stripe-config';

interface SubscriptionData {
  subscription_status: string;
  price_id: string | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
}

export function SubscriptionStatus() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status, price_id, current_period_end, cancel_at_period_end')
        .maybeSingle();

      if (error) {
        console.error('Erreur lors de la récupération de l\'abonnement:', error);
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'abonnement:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="animate-pulse flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-amber-600" />
          <div>
            <h3 className="font-medium text-amber-800">Plan Gratuit</h3>
            <p className="text-sm text-amber-700">
              Accès limité aux fonctionnalités
            </p>
          </div>
        </div>
      </div>
    );
  }

  const product = subscription.price_id ? getProductByPriceId(subscription.price_id) : null;
  const isActive = subscription.subscription_status === 'active';
  const endDate = subscription.current_period_end 
    ? new Date(subscription.current_period_end * 1000).toLocaleDateString('fr-FR')
    : null;

  return (
    <div className={`rounded-lg p-4 border ${
      isActive 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center space-x-3">
        <Crown className={`w-6 h-6 ${
          isActive ? 'text-green-600' : 'text-red-600'
        }`} />
        <div className="flex-1">
          <h3 className={`font-medium ${
            isActive ? 'text-green-800' : 'text-red-800'
          }`}>
            {product?.name || 'Abonnement Premium'}
          </h3>
          <div className={`text-sm ${
            isActive ? 'text-green-700' : 'text-red-700'
          }`}>
            <p>
              Statut: {isActive ? 'Actif' : 'Inactif'}
              {subscription.cancel_at_period_end && ' (Annulation programmée)'}
            </p>
            {endDate && (
              <p>
                {subscription.cancel_at_period_end ? 'Se termine le' : 'Renouvellement le'}: {endDate}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}