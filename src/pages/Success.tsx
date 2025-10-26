import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Crown, ArrowRight } from 'lucide-react';
import { getProductByPriceId } from '../stripe-config';

export function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<any>(null);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      navigate('/pricing');
      return;
    }

    // Try to get product info from URL params or localStorage
    const priceId = searchParams.get('price_id') || localStorage.getItem('checkout_price_id');
    if (priceId) {
      const productInfo = getProductByPriceId(priceId);
      setProduct(productInfo);
      localStorage.removeItem('checkout_price_id');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Paiement réussi !
            </h1>
            <p className="text-gray-600">
              Votre abonnement a été activé avec succès
            </p>
          </div>

          {product && (
            <div className="bg-indigo-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-indigo-900">{product.name}</span>
              </div>
              <p className="text-sm text-indigo-700 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-indigo-900">
                {product.currencySymbol}{product.price}/mois
              </p>
            </div>
          )}

          <div className="space-y-3 mb-8 text-left">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Accès illimité à tous les examens</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Suivi détaillé de vos progrès</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Explications détaillées</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Support prioritaire</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            Commencer maintenant
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Un email de confirmation a été envoyé à votre adresse
          </p>
        </div>
      </div>
    </div>
  );
}