import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { StripeProduct, formatPrice } from '../stripe-config';

interface SubscriptionCardProps {
  product: StripeProduct;
  isCurrentPlan?: boolean;
  onSubscribe: (priceId: string) => Promise<void>;
}

export function SubscriptionCard({ product, isCurrentPlan, onSubscribe }: SubscriptionCardProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (isCurrentPlan || loading) return;
    
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
    <div className={`bg-white rounded-lg shadow-lg p-6 border-2 ${
      isCurrentPlan ? 'border-green-500' : 'border-gray-200'
    }`}>
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-gray-600 mb-4">{product.description}</p>
        )}
        
        <div className="mb-6">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-gray-600 ml-1">/mois</span>
        </div>

        {isCurrentPlan ? (
          <div className="flex items-center justify-center bg-green-100 text-green-800 py-2 px-4 rounded-lg">
            <Check className="w-5 h-5 mr-2" />
            Plan actuel
          </div>
        ) : (
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Traitement...
              </>
            ) : (
              'S\'abonner'
            )}
          </button>
        )}
      </div>
    </div>
  );
}