import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Crown } from 'lucide-react';

export function SuccessPage() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Paiement réussi !
          </h1>
          
          <p className="text-gray-600 mb-6">
            Félicitations ! Votre abonnement Premium a été activé avec succès.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Crown className="w-5 h-5" />
              <span className="font-medium">Forfait Premium activé</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Vous avez maintenant accès à toutes les fonctionnalités premium
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Commencer maintenant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <p className="text-sm text-gray-500">
              Redirection automatique dans {countdown} secondes...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}