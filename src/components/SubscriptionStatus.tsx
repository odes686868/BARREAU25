import React, { useEffect, useState } from 'react';
import { Crown, Loader2, X } from 'lucide-react';
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
  const [cancelling, setCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

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

  const handleCancelSubscription = async () => {
    setCancelling(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert('Veuillez vous reconnecter');
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cancel-subscription`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to cancel subscription');
      }

      alert('Votre abonnement sera annulé à la fin de la période de facturation actuelle.');
      await fetchSubscription();
      setShowCancelConfirm(false);
    } catch (error: any) {
      console.error('Error cancelling subscription:', error);
      alert(error.message || 'Erreur lors de l\'annulation de l\'abonnement');
    } finally {
      setCancelling(false);
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
  const isExpiringSoon = periodEnd.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="w-6 h-6 text-yellow-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Forfait Premium
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                {subscription.cancel_at_period_end ? (
                  <span className="text-sm text-orange-600">
                    Se termine le {periodEnd.toLocaleDateString('fr-CA')}
                  </span>
                ) : (
                  <span className="text-sm text-gray-600">
                    {isExpiringSoon ? 'Renouvelle' : 'Actif jusqu\'au'} le {periodEnd.toLocaleDateString('fr-CA')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {!subscription.cancel_at_period_end && (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              Annuler l'abonnement
            </button>
          )}
        </div>

        {subscription.cancel_at_period_end && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              Votre abonnement sera annulé à la fin de la période de facturation actuelle.
              Vous conserverez l'accès premium jusqu'au {periodEnd.toLocaleDateString('fr-CA')}.
            </p>
          </div>
        )}
      </div>

      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Annuler l'abonnement
              </h3>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir annuler votre abonnement premium ?
              Vous conserverez l'accès à toutes les fonctionnalités premium jusqu'à la fin de votre période de facturation actuelle ({periodEnd.toLocaleDateString('fr-CA')}).
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                disabled={cancelling}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Garder l'abonnement
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={cancelling}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {cancelling ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Annulation...
                  </>
                ) : (
                  'Confirmer l\'annulation'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}