import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PricingCard } from '../components/PricingCard';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { GraduationCap, ArrowLeft } from 'lucide-react';

export function PricingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/pricing`,
          mode: 'subscription',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Erreur lors de la création de la session de paiement. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#1e2c4f] text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <GraduationCap size={32} />
            <span className="text-xl font-bold">Barreau IA</span>
          </Link>
          {user && (
            <button
              onClick={() => navigate('/app')}
              className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Retour au tableau de bord</span>
            </button>
          )}
        </div>
      </nav>

      <div className="py-12">
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
              onClick={() => navigate('/app')}
              className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Commencer gratuitement
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}