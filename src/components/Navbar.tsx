import { GraduationCap, Settings, User, LogOut, CreditCard, Crown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useState } from 'react';

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
        <div className="flex items-center space-x-3">
          <GraduationCap size={32} />
          <span className="text-xl font-bold">Barreau IA</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <User size={20} />
              <span className="font-medium">Mon compte</span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  to="/subscription"
                  className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 text-left text-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Crown size={18} />
                  <span>Premium Test</span>
                </Link>
                <Link
                  to="/pricing"
                  className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 text-left text-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <CreditCard size={18} />
                  <span>Tarifs</span>
                </Link>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onSettingsClick();
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 text-left text-gray-700"
                >
                  <Settings size={18} />
                  <span>Paramètres</span>
                </button>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 text-left text-red-600"
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