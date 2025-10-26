import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Alert } from '../components/ui/Alert'

export const Success: React.FC = () => {
  useEffect(() => {
    // Clear any checkout-related data from localStorage if needed
    localStorage.removeItem('checkout-session-id')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Paiement réussi !
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Votre abonnement a été activé avec succès.
          </p>
        </div>

        <Alert type="success">
          <div className="space-y-2">
            <p className="font-medium">Félicitations !</p>
            <p>
              Vous avez maintenant accès à tous nos examens de préparation au Barreau.
              Vous pouvez commencer à étudier dès maintenant.
            </p>
          </div>
        </Alert>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Commencer un examen
          </Link>
          
          <Link
            to="/pricing"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voir mon abonnement
          </Link>
        </div>
      </div>
    </div>
  )
}