import React from 'react';
import { PricingCard } from '../components/pricing/PricingCard';
import { stripeProducts } from '../stripe-config';

export function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Choisissez votre forfait
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accédez à tous nos examens de préparation au Barreau avec un forfait adapté à vos besoins.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="max-w-md">
            {stripeProducts.map((product) => (
              <PricingCard
                key={product.priceId}
                product={product}
                isPopular={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}