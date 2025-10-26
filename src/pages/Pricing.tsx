import React from 'react'
import { SubscriptionCard } from '../components/subscription/SubscriptionCard'
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus'
import { useAuth } from '../hooks/useAuth'
import { useSubscription } from '../hooks/useSubscription'
import { Link } from 'react-router-dom'

export const Pricing: React.FC = () => {
  const { user } = useAuth()
  const { isActive } = useSubscription()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre forfait
          </h1>
          <p className="text-xl text-gray-600">
            Accédez à tous nos examens de préparation au Barreau
          </p>
        </div>

        {user && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Votre abonnement actuel
            </h2>
            <SubscriptionStatus />
          </div>
        )}

        {!user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800 text-center">
              <Link to="/login" className="font-medium underline">
                Connectez-vous
              </Link>
              {' '}ou{' '}
              <Link to="/signup" className="font-medium underline">
                créez un compte
              </Link>
              {' '}pour vous abonner
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {user && !isActive ? (
              <SubscriptionCard />
            ) : user && isActive ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Vous êtes déjà abonné !
                </h3>
                <p className="text-gray-600 mb-4">
                  Profitez de votre accès illimité à tous nos examens.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Commencer un examen
                </Link>
              </div>
            ) : (
              <SubscriptionCard />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}