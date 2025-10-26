import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Success() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Paiement réussi !
          </h1>
          
          <p className="text-gray-600 mb-8">
            Votre abonnement a été activé avec succès. Vous pouvez maintenant accéder à tous nos examens de préparation.
          </p>
          
          <div className="space-y-4">
            <Link to="/dashboard">
              <Button className="w-full">
                Accéder au tableau de bord
              </Button>
            </Link>
            
            <Link to="/exams">
              <Button variant="outline" className="w-full">
                Commencer un examen
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}