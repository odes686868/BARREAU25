import React from 'react'
import { useSubscription } from '../../hooks/useSubscription'
import { Alert } from '../ui/Alert'
import { CheckCircle, Clock, XCircle } from 'lucide-react'

export const SubscriptionStatus: React.FC = () => {
  const { subscription, loading, error, isActive, isPending, plan } = useSubscription()

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 h-16 rounded-lg"></div>
    )
  }

  if (error) {
    return (
      <Alert type="error">
        Erreur lors du chargement de votre abonnement
      </Alert>
    )
  }

  if (!subscription || !plan) {
    return (
      <Alert type="info">
        Aucun abonnement actif
      </Alert>
    )
  }

  const getStatusIcon = () => {
    if (isActive) return <CheckCircle className="w-5 h-5 text-green-500" />
    if (isPending) return <Clock className="w-5 h-5 text-yellow-500" />
    return <XCircle className="w-5 h-5 text-red-500" />
  }

  const getStatusText = () => {
    if (isActive) return 'Actif'
    if (isPending) return 'En attente'
    return 'Inactif'
  }

  const getStatusColor = () => {
    if (isActive) return 'text-green-600'
    if (isPending) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{plan.name}</h3>
          <p className="text-sm text-gray-500">{plan.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>
      
      {subscription.current_period_end && isActive && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Renouvellement le {new Date(subscription.current_period_end * 1000).toLocaleDateString('fr-FR')}
          </p>
        </div>
      )}
    </div>
  )
}