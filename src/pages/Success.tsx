import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useSubscriptionStore } from '../store/subscriptionStore';

export function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchSubscription } = useSubscriptionStore();
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Refresh subscription data after successful payment
    fetchSubscription();
  }, [fetchSubscription]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Paiement réussi !
        </h1>
        
        <p className="text-gray-600 mb-6">
          Votre abonnement a été activé avec succès. Vous avez maintenant accès à toutes les fonctionnalités premium.
        </p>
        
        {sessionId && (
          <p className="text-sm text-gray-500 mb-6">
            ID de session: {sessionId}
          </p>
        )}
        
        <div className="space-y-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Aller au tableau de bord
          </button>
          
          <button
            onClick={() => navigate('/exams')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Commencer un examen
          </button>
        </div>
      </div>
    </div>
  );
}