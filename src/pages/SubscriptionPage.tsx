import React from 'react';
import { SubscriptionCard } from '../components/subscription/SubscriptionCard';
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choisissez votre plan
          </h1>
          <p className="text-gray-600">
            Accédez à toutes les fonctionnalités premium de Barreau IA
          </p>
        </div>

        <div className="mb-8">
          <SubscriptionStatus />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <AlertCircle className="w-8 h-8 text-gray-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Plan Gratuit
              </h3>

              <p className="text-gray-600 mb-6">
                Accès limité aux fonctionnalités
              </p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  Gratuit
                </span>
              </div>

              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-600 text-xs">3</span>
                  </div>
                  <span className="text-gray-700">3 tests pratiques</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-600 text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Accès aux examens de base</span>
                </div>
                <div className="flex items-center opacity-50">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-400 text-xs">✕</span>
                  </div>
                  <span className="text-gray-500 line-through">Suivi détaillé des progrès</span>
                </div>
                <div className="flex items-center opacity-50">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-400 text-xs">✕</span>
                  </div>
                  <span className="text-gray-500 line-through">Explications détaillées</span>
                </div>
              </div>

              <button
                disabled
                className="w-full py-4 px-6 rounded-lg font-semibold text-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              >
                Plan actuel
              </button>
            </div>
          </div>

          <SubscriptionCard />
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Pourquoi choisir Barreau IA Premium ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Contenu complet
              </h3>
              <p className="text-gray-600 text-sm">
                Accès à tous les examens et questions pratiques pour une préparation optimale
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Suivi personnalisé
              </h3>
              <p className="text-gray-600 text-sm">
                Suivez vos progrès en temps réel et identifiez vos points d'amélioration
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Support dédié
              </h3>
              <p className="text-gray-600 text-sm">
                Bénéficiez d'un support prioritaire pour toutes vos questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}