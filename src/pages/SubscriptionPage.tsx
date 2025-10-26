import React from 'react';
import { SubscriptionCard } from '../components/subscription/SubscriptionCard';
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus';
import { ArrowLeft } from 'lucide-react';
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

        <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto">
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