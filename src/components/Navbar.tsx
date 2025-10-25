import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Home, Settings } from 'lucide-react';

interface NavbarProps {
  onSettingsClick: () => void;
}

export default function Navbar({ onSettingsClick }: NavbarProps) {
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
          <div className="flex items-center space-x-2">
            <GraduationCap size={32} />
            <span className="text-xl font-bold">Barreau IA</span>
          </div>
        </div>
        <button
          onClick={onSettingsClick}
          className="hover:bg-white/10 p-2 rounded-lg transition-colors"
          title="Paramètres"
        >
          <Settings size={24} />
        </button>
      </div>
    </nav>
  );
}