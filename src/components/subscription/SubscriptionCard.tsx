import React, { useState } from 'react';
import { Crown, Check, Loader2 } from 'lucide-react';
import { STRIPE_PRODUCTS } from '../../stripe-config';
import { createCheckoutSession } from '../../lib/stripe';
import { useSubscription } from '../../hooks/useSubscription';

export function SubscriptionCard() {
  const [loading, setLoading] = useState(false);
  const { subscription } = useSubscription();
  const premiumProduct = STRIPE_PRODUCTS[0];

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
      console.error('Erreur lors de la creation de la session de paiement:', error);
    } finally {
      setLoading(false);
    }
  };

  const isPremium = subscription.tier === 'premium';

  return (
    <div className={`bg-white rounded-2xl shadow-xl border-2 p-8 relative overflow-hidden ${isPremium ? 'border-green-300' : 'border-[#1e2c4f]/20'}`}>
      <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-lg text-sm font-medium ${isPremium ? 'bg-green-600 text-white' : 'bg-[#1e2c4f] text-white'}`}>
        {isPremium ? 'Plan actuel' : 'Recommandé'}
      </div>

      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${isPremium ? 'bg-green-100' : 'bg-[#1e2c4f]/10'}`}>
          <Crown className={`w-8 h-8 ${isPremium ? 'text-green-600' : 'text-[#1e2c4f]'}`} />
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
          disabled={loading || isPremium}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            isPremium
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : loading
              ? 'bg-[#1e2c4f]/60 text-white cursor-not-allowed'
              : 'bg-[#1e2c4f] text-white hover:bg-[#2a3f6f] hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Redirection...
            </div>
          ) : isPremium ? (
            'Déjà abonné'
          ) : (
            'Commencer maintenant'
          )}
        </button>
      </div>
    </div>
  );
}