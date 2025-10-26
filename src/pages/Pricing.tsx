import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

export function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { subscription, loading } = useSubscriptionStore();

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Erreur lors de la création de la session de paiement');
    }
  };

  const getCurrentPlanName = () => {
    if (!subscription || subscription.subscription_status !== 'active') {
      return null;
    }
    
    const product = STRIPE_PRODUCTS.find(p => p.priceId === subscription.price_id);
    return product?.name || null;
  };

  const currentPlanName = getCurrentPlanName();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-lg text-gray-600">
            Accédez à tous les examens et fonctionnalités premium
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {STRIPE_PRODUCTS.map((product) => (
            <SubscriptionCard
              key={product.id}
              product={product}
              isCurrentPlan={currentPlanName === product.name}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>

        {currentPlanName && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Votre plan actuel: <span className="font-semibold text-gray-900">{currentPlanName}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}