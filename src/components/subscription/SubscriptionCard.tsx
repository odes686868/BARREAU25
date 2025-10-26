import React, { useState } from 'react';
import { Crown, Check, Loader2 } from 'lucide-react';
import { stripeProducts } from '../../stripe-config';
import { createCheckoutSession } from '../../lib/stripe';

interface SubscriptionCardProps {
  currentPlan?: string;
}

export function SubscriptionCard({ currentPlan }: SubscriptionCardProps) {
  const [loading, setLoading] = useState(false);
  const premiumProduct = stripeProducts[0]; // Forfait Premium

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { url } = await createCheckoutSession({
        priceId: premiumProduct.priceId,
        mode: premiumProduct.mode,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: window.location.href,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erreur lors de la création de la session de paiement:', error);
    } finally {
      setLoading(false);
    }
  };

  const isCurrentPlan = currentPlan === premiumProduct.name;

  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-200 p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-2 rounded-bl-lg text-sm font-medium">
        Recommandé
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
          <Crown className="w-8 h-8 text-indigo-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {premiumProduct.name}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {premiumProduct.description}
        </p>
        
        <div className="mb-8">
          <span className="text-4xl font-bold text-gray-900">
            {premiumProduct.currencySymbol}{premiumProduct.price}
          </span>
          <span className="text-gray-600 ml-2">/mois</span>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Accès illimité à tous les examens</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Questions pratiques illimitées</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Suivi détaillé des progrès</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Explications détaillées</span>
          </div>
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">Support prioritaire</span>
          </div>
        </div>
        
        <button
          onClick={handleSubscribe}
          disabled={loading || isCurrentPlan}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            isCurrentPlan
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : loading
              ? 'bg-indigo-400 text-white cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Redirection...
            </div>
          ) : isCurrentPlan ? (
            'Plan actuel'
          ) : (
            'Commencer maintenant'
          )}
        </button>
      </div>
    </div>
  );
}