import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <GraduationCap size={32} className="text-[#1e2c4f]" />
            <span className="text-xl font-bold text-[#1e2c4f]">Barreau IA</span>
          </div>

          <Link
            to="/auth"
            className="rounded-lg bg-[#1e2c4f] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2a3f6f] transition-colors"
          >
            Connexion
          </Link>
        </div>
      </div>
    </header>
  );
}
