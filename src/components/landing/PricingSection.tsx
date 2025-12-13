import { Check, Crown, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingSection() {
  return (
    <div className="py-24 bg-gray-50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#1e2c4f]">Tarification</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choisissez le forfait qui vous convient
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Commencez gratuitement ou accédez à toutes les fonctionnalités avec Premium
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <Gift className="w-8 h-8 text-gray-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Plan Gratuit
              </h3>

              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">Gratuit</span>
              </div>

              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">3 tests gratuits par jour</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Accès aux 12 examens</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Suivi de base de la progression</span>
                </div>
              </div>

              <Link
                to="/auth"
                className="w-full block text-center px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium transition-colors"
              >
                Commencer gratuitement
              </Link>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#1e2c4f] to-[#2a3f6f] rounded-2xl shadow-xl border-2 border-[#1e2c4f] p-8">
            <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 rounded-bl-lg text-sm font-medium">
              Recommandé
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Crown className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Forfait Premium
              </h3>

              <div className="mb-8">
                <span className="text-5xl font-bold text-white">42$</span>
                <span className="text-gray-300 ml-2">/mois</span>
              </div>

              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white">Tests illimités</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white">Accès complet aux 12 examens</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white">Suivi détaillé de la progression</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white">Explications détaillées</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white">Historique complet des résultats</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white">Support prioritaire</span>
                </div>
              </div>

              <Link
                to="/auth"
                className="w-full block text-center px-6 py-3 bg-white text-[#1e2c4f] rounded-lg hover:bg-gray-100 font-medium transition-colors"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
