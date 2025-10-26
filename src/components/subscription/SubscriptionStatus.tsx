import React, { useEffect, useState } from 'react';
import { Crown, Calendar, CreditCard } from 'lucide-react';
import { getUserSubscription, SubscriptionData } from '../../lib/stripe';
import { getProductByPriceId } from '../../stripe-config';

export function SubscriptionStatus() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const data = await getUserSubscription();
        setSubscription(data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center">
          <Crown className="h-6 w-6 text-yellow-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800">Aucun abonnement actif</h3>
            <p className="text-yellow-700">Souscrivez à un forfait pour accéder à toutes les fonctionnalités.</p>
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
    <div className={`rounded-lg shadow-md p-6 ${isActive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Crown className={`h-6 w-6 mr-3 ${isActive ? 'text-green-600' : 'text-red-600'}`} />
          <div>
            <h3 className={`text-lg font-semibold ${isActive ? 'text-green-800' : 'text-red-800'}`}>
              {product?.name || 'Abonnement'}
            </h3>
            <p className={`text-sm ${isActive ? 'text-green-700' : 'text-red-700'}`}>
              Statut: {subscription.subscription_status === 'active' ? 'Actif' : 'Inactif'}
            </p>
          </div>
        </div>
        
        {isActive && (
          <div className="text-right">
            {endDate && (
              <div className="flex items-center text-sm text-green-700 mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                Renouvellement: {endDate}
              </div>
            )}
            {subscription.cancel_at_period_end && (
              <p className="text-sm text-orange-600 font-medium">
                Annulation programmée
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}