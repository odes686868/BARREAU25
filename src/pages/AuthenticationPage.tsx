import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Key, Lock, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Step = 'email' | 'token' | 'password' | 'success';

export function AuthenticationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
      setStep('token');
    }
  }, [searchParams]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setMessage('Si un compte existe avec cet email, vous recevrez un lien de reinitialisation.');
      setStep('token');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token.trim()) {
      setError('Veuillez entrer le token de reinitialisation');
      return;
    }

    setStep('password');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ token, newPassword: password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const extractTokenFromUrl = () => {
    const url = window.prompt('Collez le lien complet de reinitialisation recu par email:');
    if (url) {
      try {
        const urlObj = new URL(url);
        const tokenFromUrl = urlObj.searchParams.get('token');
        if (tokenFromUrl) {
          setToken(tokenFromUrl);
          setError('');
        } else {
          setError('Token non trouve dans le lien. Verifiez que vous avez copie le lien complet.');
        }
      } catch {
        if (url.length > 20) {
          setToken(url);
          setError('');
        } else {
          setError('Lien invalide');
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour a l'accueil
        </button>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {step === 'success' ? (
                <CheckCircle className="w-8 h-8 text-white" />
              ) : (
                <Lock className="w-8 h-8 text-white" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">
              {step === 'email' && 'Reinitialiser le mot de passe'}
              {step === 'token' && 'Entrer le token'}
              {step === 'password' && 'Nouveau mot de passe'}
              {step === 'success' && 'Mot de passe modifie'}
            </h1>
            <p className="text-slate-400 mt-2">
              {step === 'email' && 'Entrez votre email pour recevoir un lien de reinitialisation'}
              {step === 'token' && 'Collez le token recu dans votre email'}
              {step === 'password' && 'Choisissez votre nouveau mot de passe'}
              {step === 'success' && 'Vous pouvez maintenant vous connecter'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {message && step === 'token' && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <p className="text-green-400 text-sm">{message}</p>
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={handleRequestReset} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer le lien de reinitialisation'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('token')}
                  className="text-sky-400 hover:text-sky-300 text-sm transition-colors"
                >
                  J'ai deja un token de reinitialisation
                </button>
              </div>
            </form>
          )}

          {step === 'token' && (
            <form onSubmit={handleVerifyToken} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Token de reinitialisation
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                  <textarea
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none font-mono text-sm"
                    placeholder="Collez le token ici..."
                    rows={3}
                    required
                  />
                </div>
                <p className="text-slate-500 text-xs mt-2">
                  Copiez le token depuis le lien recu par email (la partie apres "token=")
                </p>
              </div>

              <button
                type="button"
                onClick={extractTokenFromUrl}
                className="w-full py-2 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors text-sm"
              >
                Ou coller le lien complet de l'email
              </button>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Continuer
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setMessage('');
                  }}
                  className="text-sky-400 hover:text-sky-300 text-sm transition-colors"
                >
                  Demander un nouveau lien
                </button>
              </div>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="Minimum 6 caracteres"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="Repetez le mot de passe"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Reinitialisation...
                  </>
                ) : (
                  'Reinitialiser le mot de passe'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('token')}
                  className="text-sky-400 hover:text-sky-300 text-sm transition-colors"
                >
                  Retour
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-400 font-medium">Mot de passe modifie avec succes!</p>
                  <p className="text-green-400/70 text-sm mt-1">
                    Toutes vos sessions ont ete deconnectees pour des raisons de securite.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all"
              >
                Se connecter
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Besoin d'aide?{' '}
          <a href="mailto:support@barreauia.com" className="text-sky-400 hover:text-sky-300">
            Contactez le support
          </a>
        </p>
      </div>
    </div>
  );
}
