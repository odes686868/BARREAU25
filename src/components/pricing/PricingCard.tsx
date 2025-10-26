import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { createCheckoutSession } from '../../lib/stripe';
import { StripeProduct } from '../../stripe-config';

interface PricingCardProps {
  product: StripeProduct;
  isPopular?: boolean;
}

export function PricingCard({ product, isPopular = false }: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const checkoutUrl = await createCheckoutSession(product.priceId, product.mode);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setLoading(false);
    }
  };

  const features = [
    'Accès illimité à tous les examens',
    'Questions mises à jour régulièrement',
    'Suivi de progression détaillé',
    'Explications complètes',
    'Support prioritaire'
  ];

  return (
    <div className={`relative bg-white rounded-2xl shadow-xl ${isPopular ? 'ring-2 ring-blue-500' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            Recommandé
          </span>
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="mb-8">
          <span className="text-4xl font-bold text-gray-900">
            {product.currencySymbol}{product.price}
          </span>
          {product.mode === 'subscription' && (
            <span className="text-gray-600 ml-2">/mois</span>
          )}
        </div>

        <Button
          onClick={handleSubscribe}
          loading={loading}
          className="w-full mb-8"
          variant={isPopular ? 'primary' : 'outline'}
        >
          {product.mode === 'subscription' ? 'S\'abonner' : 'Acheter'}
        </Button>

        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}