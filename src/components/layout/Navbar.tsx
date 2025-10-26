import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut } from 'lucide-react';
import { signOut, AuthUser, getCurrentUser } from '../../lib/auth';
import { Button } from '../ui/Button';

interface NavbarProps {
  user: AuthUser | null;
}

export function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ExamPrep</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Tableau de bord
                </Link>
                <Link
                  to="/exams"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Examens
                </Link>
              </>
            )}
            
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Tarifs
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-red-600 p-2 rounded-md transition-colors"
                  title="Se déconnecter"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Inscription
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}