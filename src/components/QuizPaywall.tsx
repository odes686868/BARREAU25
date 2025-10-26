import React, { useState } from 'react';
import { Crown, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { STRIPE_PRODUCTS } from '../stripe-config';

interface QuizPaywallProps {
  remainingQuizzes: number;
  onClose?: () => void;
}

export function QuizPaywall({ remainingQuizzes, onClose }: QuizPaywallProps) {
  const navigate = useNavigate();
  const premiumProduct = STRIPE_PRODUCTS[0];

  const handleUpgrade = () => {
    navigate('/subscription');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Limite de quiz gratuit atteinte
          </h2>

          <p className="text-gray-600 mb-6">
            Vous avez utilisé votre quiz gratuit. Passez au premium pour un accès illimité !
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-indigo-600" />
            </div>

            <h3 className="font-bold text-xl text-gray-900 mb-2">
              {premiumProduct.name}
            </h3>

            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">
                {premiumProduct.currencySymbol}{premiumProduct.price}
              </span>
              <span className="text-gray-600">/mois</span>
            </div>

            <ul className="text-left space-y-2 mb-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Quiz illimités</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Accès à tous les examens</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Suivi détaillé des progrès</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Explications détaillées</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mb-3"
          >
            Passer au Premium
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors"
            >
              Retour
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
