import { GraduationCap, Home, Settings, User, LogOut, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { SubscriptionStatus } from './SubscriptionStatus';

interface NavbarProps {
  onSettingsClick: () => void;
}

export default function Navbar({ onSettingsClick }: NavbarProps) {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#1e2c4f] text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors group"
            title="Retour à l'accueil"
          >
            <Home size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Accueil</span>
          </Link>
          <Link to="/pricing" className="text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
            Tarifs
          </Link>
          <div className="flex items-center space-x-2">
            <GraduationCap size={32} />
            <span className="text-xl font-bold">Barreau IA</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <SubscriptionStatus />
          <button
            onClick={onSettingsClick}
            className="hover:bg-white/10 p-2 rounded-lg transition-colors"
            title="Paramètres"
          >
            <Settings size={24} />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <User size={20} />
              <span className="font-medium">Mon compte</span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  to="/pricing"
                  className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 text-left text-gray-700"
                >
                  <CreditCard size={18} />
                  <span>Tarifs</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 text-left text-red-600"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}