import { useState, useEffect } from 'react';
import { GraduationCap, ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setIsValidSession(false);
        setError('Lien invalide ou expiré. Veuillez demander un nouveau lien de réinitialisation.');
      } else {
        setIsValidSession(true);
      }
    };

    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères');
      }
      if (password !== confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e2c4f] to-[#2a3f6f] flex">
      <Link
        to="/auth"
        className="absolute top-6 left-6 flex items-center space-x-2 text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Retour à la connexion</span>
      </Link>

      <div className="flex-1 flex items-center justify-center p-8 text-white">
        <div className="max-w-xl">
          <div className="flex items-center space-x-3 mb-8">
            <GraduationCap size={48} />
            <h1 className="text-4xl font-bold">Barreau IA</h1>
          </div>
          <h2 className="text-2xl font-medium mb-6">
            Réinitialisez votre mot de passe
          </h2>
          <p className="text-lg opacity-90">
            Choisissez un nouveau mot de passe sécurisé pour votre compte.
          </p>
        </div>
      </div>

      <div className="w-[600px] bg-white p-12 flex items-center">
        <div className="w-full max-w-md mx-auto">
          {isValidSession === null ? (
            <div className="text-center py-8">
              <div className="text-xl text-gray-600">Vérification du lien...</div>
            </div>
          ) : isValidSession === false ? (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-100 p-4 rounded-full">
                  <AlertCircle size={48} className="text-red-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Lien invalide ou expiré
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Ce lien de réinitialisation n'est plus valide. Veuillez demander un nouveau lien.
              </p>
              <Link
                to="/auth"
                className="block w-full bg-[#1e2c4f] text-white py-3 rounded-lg font-medium hover:bg-[#2a3f6f] transition-colors text-center"
              >
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-8">
                Nouveau mot de passe
              </h2>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 flex items-center gap-2">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-6 flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span>Mot de passe réinitialisé avec succès ! Redirection...</span>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2">
                Nouveau mot de passe
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
              <p className="mt-1 text-xs text-gray-500">
                Minimum 6 caractères
              </p>
            </div>

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

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-[#1e2c4f] text-white py-3 rounded-lg font-medium hover:bg-[#2a3f6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Chargement...' : 'Réinitialiser le mot de passe'}
            </button>
          </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
