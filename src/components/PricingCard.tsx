import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { StripeProduct } from '../stripe-config';

interface PricingCardProps {
  product: StripeProduct;
  isPopular?: boolean;
  onSubscribe: (priceId: string) => Promise<void>;
}

export function PricingCard({ product, isPopular = false, onSubscribe }: PricingCardProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await onSubscribe(product.priceId);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Accès illimité aux examens',
    'Tests de pratique sans limite',
    'Suivi détaillé des progrès',
    'Explications complètes',
    'Support prioritaire'
  ];

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col ${isPopular ? 'ring-2 ring-[#1e2c4f]' : 'border border-gray-200'}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#1e2c4f] text-white px-4 py-2 rounded-full text-sm font-medium">
            Recommande
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">
            {product.currencySymbol}{product.price}
          </span>
          <span className="text-gray-600 ml-2">
            {product.mode === 'subscription' ? '/mois' : ''}
          </span>
        </div>
        <p className="text-gray-600">{product.description}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={loading || !user}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          isPopular
            ? 'bg-[#1e2c4f] text-white hover:bg-[#2a3f6f] disabled:bg-[#1e2c4f]/60'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50'
        } disabled:cursor-not-allowed flex items-center justify-center`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Traitement...
          </>
        ) : (
          "S'abonner maintenant"
        )}
      </button>

      {!user && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Connectez-vous pour vous abonner
        </p>
      )}
    </div>
  );
}