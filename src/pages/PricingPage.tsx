import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PricingCard } from '../components/PricingCard';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { useAuthStore } from '../store/authStore';

export function PricingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Erreur lors de la création de la session de paiement. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre forfait
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accédez à tous nos examens de pratique et maximisez vos chances de réussite
          </p>
        </div>

        <div className="flex justify-center">
          <div className="max-w-md">
            {STRIPE_PRODUCTS.map((product) => (
              <PricingCard
                key={product.id}
                product={product}
                isPopular={true}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Forfait Gratuit
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez notre plateforme avec un accès limité
            </p>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                1 test de pratique gratuit
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                Accès aux explications de base
              </li>
            </ul>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Commencer gratuitement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}