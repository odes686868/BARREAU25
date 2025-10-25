import { useState } from 'react';
import { GraduationCap, ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || '';
  const codeFromState = location.state?.code || '';

  const [email, setEmail] = useState(emailFromState);
  const [code, setCode] = useState(codeFromState);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<'code' | 'password'>(emailFromState ? 'code' : 'code');

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email || !email.trim()) {
        throw new Error('Veuillez entrer une adresse email');
      }

      if (!code || code.length !== 6) {
        throw new Error('Veuillez entrer un code à 6 chiffres');
      }

      const { data: resetCodes, error: fetchError } = await supabase
        .from('password_reset_codes')
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('code', code)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      if (!resetCodes || resetCodes.length === 0) {
        throw new Error('Code invalide ou expiré');
      }

      setStep('password');
    } catch (err: any) {
      console.error('Code verification error:', err);
      setError(err.message || 'Code invalide ou expiré');
    } finally {
      setLoading(false);
    }
  };

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
          email: email.toLowerCase(),
          code: code,
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
            {step === 'code'
              ? 'Entrez le code de vérification à 6 chiffres que vous avez reçu par email.'
              : 'Choisissez un nouveau mot de passe sécurisé pour votre compte.'
            }
          </p>
        </div>
      </div>

      <div className="w-[600px] bg-white p-12 flex items-center">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center ${step === 'code' ? 'text-[#1e2c4f]' : 'text-green-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'code' ? 'bg-[#1e2c4f]' : 'bg-green-600'} text-white font-bold mr-2`}>
                  {step === 'password' ? '✓' : '1'}
                </div>
                <span className="font-medium">Code</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <div className={`flex items-center ${step === 'password' ? 'text-[#1e2c4f]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'password' ? 'bg-[#1e2c4f]' : 'bg-gray-300'} text-white font-bold mr-2`}>
                  2
                </div>
                <span className="font-medium">Mot de passe</span>
              </div>
            </div>
          </div>

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

          {step === 'code' ? (
            <form className="space-y-6" onSubmit={handleVerifyCode}>
              <h2 className="text-2xl font-bold mb-8">
                Vérification du code
              </h2>

              {codeFromState && (
                <div className="bg-gradient-to-r from-[#1e2c4f] to-[#2a3f6f] text-white p-6 rounded-lg mb-6">
                  <p className="text-sm mb-2 opacity-90">Votre code de réinitialisation :</p>
                  <div className="text-5xl font-bold tracking-widest text-center font-mono">
                    {codeFromState}
                  </div>
                  <p className="text-xs mt-3 opacity-75 text-center">
                    Ce code expire dans 15 minutes
                  </p>
                </div>
              )}

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
                  disabled={!!emailFromState}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Code de vérification
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1e2c4f] text-center text-2xl tracking-widest font-mono"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  {codeFromState ? 'Le code est affiché ci-dessus' : 'Entrez le code à 6 chiffres'}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full bg-[#1e2c4f] text-white py-3 rounded-lg font-medium hover:bg-[#2a3f6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Vérification...' : 'Vérifier le code'}
              </button>
            </form>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
