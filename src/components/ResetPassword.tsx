import { useState, useEffect } from 'react';
import { GraduationCap, ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('Lien invalide. Veuillez demander un nouveau lien de réinitialisation.');
        setVerifying(false);
        return;
      }

      try {
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-reset-token`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.valid) {
          setTokenValid(true);
        } else {
          setError('Ce lien de réinitialisation est invalide ou a expiré. Veuillez demander un nouveau lien.');
        }
      } catch (err) {
        console.error('Token verification error:', err);
        setError('Erreur lors de la vérification du lien. Veuillez réessayer.');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
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

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/reset-password`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

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
          {verifying ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e2c4f] mx-auto mb-4"></div>
              <p className="text-gray-600">Vérification du lien...</p>
            </div>
          ) : (
            <>
              {error && !tokenValid && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-start gap-3">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-2">{error}</p>
                    <Link
                      to="/auth"
                      className="text-sm underline hover:no-underline"
                    >
                      Retour à la page de connexion
                    </Link>
                  </div>
                </div>
              )}

              {tokenValid && (
                <>
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

                  <form className="space-y-6" onSubmit={handleResetPassword}>
                    <h2 className="text-2xl font-bold mb-8">
                      Nouveau mot de passe
                    </h2>

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
                          disabled={loading || success}
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
                          disabled={loading || success}
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
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
