import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setError('Session ID manquant');
      setLoading(false);
      return;
    }

    // Simulate processing time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Traitement de votre paiement...
          </h2>
          <p className="text-gray-600">
            Veuillez patienter pendant que nous confirmons votre abonnement.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Erreur de paiement
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Retour aux forfaits
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Paiement réussi !
          </h1>
          
          <p className="text-gray-600 mb-6">
            Félicitations ! Votre abonnement Premium a été activé avec succès. 
            Vous avez maintenant accès à tous nos examens de pratique.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">
              Votre forfait Premium inclut :
            </h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Accès illimité aux examens</li>
              <li>• Tests de pratique sans limite</li>
              <li>• Suivi détaillé des progrès</li>
              <li>• Explications complètes</li>
              <li>• Support prioritaire</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Commencer les examens
            </button>
            
            <button
              onClick={() => navigate('/profile')}
              className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Voir mon profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}