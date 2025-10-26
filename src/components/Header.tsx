import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, User, LogOut, Settings, Crown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useSubscription } from '../hooks/useSubscription';
import { SubscriptionStatus } from './SubscriptionStatus';

export function Header() {
  const { user, signOut } = useAuthStore();
  const { subscription } = useSubscription();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-2">
          <Scale className="w-8 h-8 text-indigo-600" />
          <span className="text-xl font-bold text-gray-900">LegalAI</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <SubscriptionStatus 
                  planName={subscription.planName}
                  isActive={subscription.isActive}
                />
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors">
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">{user.email}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Profil
                    </Link>
                    <Link
                      to="/pricing"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Abonnement
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth"
                  className="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/pricing"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  Premium
                </Link>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}