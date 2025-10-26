import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

export function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeSubscription, setActiveSubscription] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscriptionStatus();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('price_id, subscription_status')
        .eq('subscription_status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
      } else if (data) {
        setActiveSubscription(data.price_id);
      }
    } catch (error) {
      console.error('Error fetching subscription status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      navigate('/auth');
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

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Une erreur est survenue lors du processus de paiement. Veuillez réessayer.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre forfait
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accédez à tous nos examens de préparation au Barreau avec un forfait premium
          </p>
        </div>

        <div className="flex justify-center">
          <div className="max-w-md">
            {STRIPE_PRODUCTS.map((product) => (
              <SubscriptionCard
                key={product.id}
                product={product}
                isActive={activeSubscription === product.priceId}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Garantie de satisfaction
            </h3>
            <p className="text-gray-600">
              Nous sommes convaincus de la qualité de notre plateforme. 
              Si vous n'êtes pas satisfait, contactez-nous dans les 7 premiers jours 
              pour un remboursement complet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}