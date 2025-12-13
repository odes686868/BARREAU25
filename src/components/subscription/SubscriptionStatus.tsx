import React from 'react';
import { Crown, AlertCircle } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

export function SubscriptionStatus() {
  const { subscription, loading } = useSubscription();

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

  if (subscription.tier === 'free') {
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

  const isActive = subscription.status === 'active';
  const isCancelling = subscription.cancelAtPeriodEnd;
  const endDate = subscription.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString('fr-FR')
    : null;

  const bgColor = isCancelling
    ? 'bg-orange-50 border-orange-200'
    : isActive
      ? 'bg-green-50 border-green-200'
      : 'bg-red-50 border-red-200';

  const textColor = isCancelling
    ? 'text-orange-600'
    : isActive
      ? 'text-green-600'
      : 'text-red-600';

  const textColorDark = isCancelling
    ? 'text-orange-800'
    : isActive
      ? 'text-green-800'
      : 'text-red-800';

  const textColorLight = isCancelling
    ? 'text-orange-700'
    : isActive
      ? 'text-green-700'
      : 'text-red-700';

  return (
    <div className={`rounded-lg p-4 border ${bgColor}`}>
      <div className="flex items-center space-x-3">
        <Crown className={`w-6 h-6 ${textColor}`} />
        <div className="flex-1">
          <h3 className={`font-medium ${textColorDark}`}>
            {subscription.planName || 'Forfait Premium'}
          </h3>
          <div className={`text-sm ${textColorLight}`}>
            <p>
              Statut: {isCancelling ? 'Annulation prévue' : isActive ? 'Actif' : 'Inactif'}
            </p>
            {endDate && (
              <p>
                {isCancelling ? 'Se termine le' : 'Renouvellement le'}: {endDate}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}