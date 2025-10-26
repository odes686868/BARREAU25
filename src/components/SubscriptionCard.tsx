import React, { useState } from 'react';
import { Crown, Check, Loader2 } from 'lucide-react';
import { StripeProduct } from '../stripe-config';

interface SubscriptionCardProps {
  product: StripeProduct;
  isActive?: boolean;
  onSubscribe: (priceId: string) => Promise<void>;
}

export function SubscriptionCard({ product, isActive = false, onSubscribe }: SubscriptionCardProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (isActive || loading) return;
    
    setLoading(true);
    try {
      await onSubscribe(product.priceId);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative bg-white rounded-xl shadow-lg border-2 p-8 transition-all duration-300 ${
      isActive ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-indigo-300 hover:shadow-xl'
    }`}>
      {isActive && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Check className="w-4 h-4" />
            Actif
          </span>
        </div>
      )}
      
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Crown className="w-12 h-12 text-indigo-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="mb-8">
          <span className="text-4xl font-bold text-gray-900">
            {product.currencySymbol}{product.price}
          </span>
          <span className="text-gray-600 ml-2">/mois</span>
        </div>
        
        <div className="space-y-3 mb-8">
          <div className="flex items-center text-gray-700">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span>Accès illimité à tous les examens</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span>Suivi détaillé des progrès</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span>Explications détaillées</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            <span>Support prioritaire</span>
          </div>
        </div>
        
        <button
          onClick={handleSubscribe}
          disabled={isActive || loading}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            isActive
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : loading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Traitement...
            </>
          ) : isActive ? (
            'Abonnement actif'
          ) : (
            'S\'abonner maintenant'
          )}
        </button>
      </div>
    </div>
  );
}