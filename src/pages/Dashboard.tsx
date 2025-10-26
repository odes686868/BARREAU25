import React from 'react';
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus';
import { BookOpen, Target, TrendingUp, Award } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>

        <div className="mb-8">
          <SubscriptionStatus />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Questions répondues</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux de réussite</p>
                <p className="text-2xl font-bold text-gray-900">0%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progression</p>
                <p className="text-2xl font-bold text-gray-900">0%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tests complétés</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Commencer à pratiquer</h2>
          <p className="text-gray-600 mb-4">
            Choisissez un test dans le menu de gauche pour commencer à pratiquer.
          </p>
        </div>
      </div>
    </div>
  );
}
