import { useState } from 'react';
import { GraduationCap, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

interface AuthProps {
  onLogin: () => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const validatePasswords = () => {
    if (password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }
    if (!isLogin && password !== confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas');
    }
  };

  const getErrorMessage = (error: any): string => {
    const message = error?.message || '';

    if (message === 'Invalid login credentials') {
      return 'Email ou mot de passe incorrect';
    }
    if (message.includes('User already registered')) {
      return 'Cette adresse email est déjà utilisée';
    }
    if (message.includes('Email not confirmed')) {
      return 'Email non confirmé. Veuillez vérifier votre boîte de réception.';
    }
    if (message.includes('Password should be at least')) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (message.includes('Unable to validate email address')) {
      return 'Adresse email invalide';
    }
    if (message.includes('Failed to fetch') || message.includes('fetch')) {
      return 'Erreur de connexion. Vérifiez votre connexion internet.';
    }

    return message || 'Une erreur est survenue';
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (!email || !email.trim()) {
        throw new Error('Veuillez entrer une adresse email');
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccess('Si votre email existe, vous recevrez un lien de reinitialisation dans quelques instants. Verifiez aussi vos courriers indesirables.');
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Une erreur est survenue. Veuillez reessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      validatePasswords();

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;
        if (!data.user) throw new Error('Erreur lors de la connexion');

        onLogin();
        navigate('/app');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/app`
          }
        });

        if (error) throw error;
        if (!data.user) throw new Error('Erreur lors de l\'inscription');

        setSuccess('Compte créé avec succès ! Redirection...');
        setTimeout(() => {
          onLogin();
          navigate('/app');
        }, 1500);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(getErrorMessage(err));
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
            "La préparation est la clé du succès. Avec Barreau IA, maximisez
            vos chances de réussite."
          </blockquote>
        </div>
      </div>

      <div className="w-[600px] bg-white p-12 flex items-center">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            {isForgotPassword ? 'Réinitialiser le mot de passe' : isLogin ? 'Connexion' : 'Créer un compte'}
          </h2>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-6">
              {success}
            </div>
          )}
          {isForgotPassword ? (
            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Important :</strong> Vous recevrez un email avec un lien sécurisé pour réinitialiser votre mot de passe. Le lien expire après 15 minutes.
                </p>
              </div>
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
                  disabled={loading || !!success}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !!success}
                className="w-full bg-[#1e2c4f] text-white py-3 rounded-lg font-medium hover:bg-[#2a3f6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
              </button>
              {!success && (
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="w-full text-[#1e2c4f] hover:underline font-medium"
                >
                  Retour à la connexion
                </button>
              )}
            </form>
          ) : (
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
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1e2c4f]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 6 caractères
                </p>
              )}
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full px-4 py-2 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1e2c4f]"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e2c4f] text-white py-3 rounded-lg font-medium hover:bg-[#2a3f6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Chargement...'
                : isLogin
                ? 'Se connecter'
                : 'Créer mon compte'}
            </button>

            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(true);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="text-sm text-[#1e2c4f] hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}
          </form>
          )}

          {!isForgotPassword && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                  setSuccess(null);
                }}
                className="text-[#1e2c4f] hover:underline font-medium"
              >
                {isLogin
                  ? "Pas encore de compte ? Créer un compte"
                  : 'Vous avez déjà un compte ? Se connecter'}
              </button>
            </div>
          )}

          <p className="mt-8 text-sm text-gray-500 text-center">
            En vous connectant, vous acceptez nos{' '}
            <Link to="/terms" className="text-[#1e2c4f] hover:underline">
              Conditions d'utilisation
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
