import { useState } from 'react';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

interface AuthProps {
  onLogin: () => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePasswords = () => {
    if (password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }
    if (!isLogin && password !== confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas');
    }
  };

  const getErrorMessage = (error: any): string => {
    if (error.message === 'Invalid login credentials') {
      return 'Email ou mot de passe incorrect';
    }
    if (error.message?.includes('Email already registered')) {
      return 'Cette adresse email est déjà utilisée';
    }
    if (error.message?.includes('Email not confirmed')) {
      return 'Email non confirmé. Veuillez vérifier votre boîte de réception.';
    }
    if (error.message?.includes('Password should be at least 6 characters')) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    return error.message || 'Une erreur est survenue';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      validatePasswords();

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          throw new Error(getErrorMessage(error));
        }
        if (!data.user) throw new Error('Erreur lors de la connexion');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              email_confirmed: true
            }
          }
        });
        if (error) {
          throw new Error(getErrorMessage(error));
        }
        if (!data.user) throw new Error('Erreur lors de l\'inscription');
      }
      
      onLogin();
      navigate('/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e2c4f] to-[#2a3f6f] flex">
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center space-x-2 text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Retour à l'accueil</span>
      </Link>

      {/* Left side - Hero */}
      <div className="flex-1 flex items-center justify-center p-8 text-white">
        <div className="max-w-xl">
          <div className="flex items-center space-x-3 mb-8">
            <GraduationCap size={48} />
            <h1 className="text-4xl font-bold">Barreau IA</h1>
          </div>
          <h2 className="text-2xl font-medium mb-6">
            Préparez-vous efficacement à l'examen du Barreau du Québec
          </h2>
          <blockquote className="text-lg italic opacity-90 bg-white/10 p-6 rounded-lg">
            "La préparation est la clé du succès. Avec Barreau Study, maximisez
            vos chances de réussite."
          </blockquote>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-[600px] bg-white p-12 flex items-center">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h2>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2">
                Adresse courriel
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1e2c4f]"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1e2c4f]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 6 caractères
                </p>
              )}
              </div>
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1e2c4f]"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e2c4f] text-white py-3 rounded-lg font-medium hover:bg-[#2a3f6f] transition-colors"
            >
              {loading
                ? 'Chargement...'
                : isLogin
                ? 'Se connecter'
                : "S'inscrire"}
            </button>
          </form>

          <div className="mt-8">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#1e2c4f] hover:underline"
            >
              {isLogin
                ? "Pas encore de compte ? S'inscrire"
                : 'Déjà un compte ? Se connecter'}
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-500 text-center">
            En vous connectant, vous acceptez nos{' '}
            <a href="#" className="text-[#1e2c4f] hover:underline">
              Conditions d'utilisation
            </a>{' '}
            et notre{' '}
            <a href="#" className="text-[#1e2c4f] hover:underline">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}