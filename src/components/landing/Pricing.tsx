import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Essentiel',
    id: 'tier-essential',
    price: '0',
    features: [
      'Accès à toutes les questions',
      'Suivi de progression',
      'Tests chronométrés',
      'Explications détaillées',
      'Support par email',
    ],
    featured: false,
  },
  {
    name: 'Premium',
    id: 'tier-premium',
    price: '19',
    features: [
      'Tout ce qui est inclus dans Essentiel',
      'Questions personnalisées',
      'Mode révision avancé',
      'Analyses détaillées',
      'Support prioritaire',
      'Accès à la communauté',
    ],
    featured: true,
  },
];

export default function Pricing() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#1e2c4f]">Tarification</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Des forfaits adaptés à vos besoins
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-8 ring-1 ring-gray-900/10 ${
                tier.featured
                  ? 'bg-gray-900 text-white shadow-2xl ring-gray-900'
                  : 'bg-white text-gray-900 sm:mx-8 lg:mx-0'
              }`}
            >
              <div className="mb-8">
                <h3
                  className={`text-sm font-semibold leading-6 ${
                    tier.featured ? 'text-white' : 'text-[#1e2c4f]'
                  }`}
                >
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  {tier.price === '0' ? (
                    <div className="flex items-center">
                      <span className="text-3xl font-bold tracking-tight">Gratuit</span>
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Pour toujours
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="text-5xl font-bold tracking-tight">{tier.price}</span>
                      <span className="text-sm font-semibold">$/mois</span>
                    </>
                  )}
                </div>
                {tier.price === '0' && (
                  <p className="mt-2 text-sm text-gray-500">
                    Commencez gratuitement et accédez aux fonctionnalités essentielles
                  </p>
                )}
              </div>
              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle
                      className={`h-5 w-5 ${
                        tier.featured ? 'text-green-400' : 'text-[#1e2c4f]'
                      }`}
                    />
                    <span className="ml-3 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className={`mt-8 block w-full rounded-lg px-6 py-4 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured
                    ? 'bg-white text-gray-900 hover:bg-gray-50 focus-visible:outline-white shadow-sm'
                    : 'bg-[#1e2c4f] text-white hover:bg-[#2a3f6f] focus-visible:outline-[#1e2c4f] transition-colors duration-200'
                }`}
              >
                {tier.price === '0' ? 'Commencer gratuitement' : 'Commencer maintenant'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}