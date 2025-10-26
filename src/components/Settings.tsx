import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, LogOut, RotateCcw, Key, BookOpen, Crown, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Question } from '../lib/quiz';
import { categories } from '../data/categories';

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoadingSubscription(false);
    }
  };

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('category_id', { ascending: true });

      if (error) throw error;
      setQuestions(data || []);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('Erreur lors du chargement des questions');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
    setError(null);
    setSuccess(null);
    if (section === 'questions' && questions.length === 0) {
      loadQuestions();
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      navigate('/');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || '',
        password: currentPassword,
      });

      if (signInError) {
        setError('Mot de passe actuel incorrect');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      setSuccess('Mot de passe modifié avec succès');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Erreur lors du changement de mot de passe');
    }
  };

  const handleResetProgress = async () => {
    if (!confirm('Êtes-vous sûr de vouloir réinitialiser toute votre progression ? Cette action est irréversible.')) {
      return;
    }

    setIsResetting(true);
    setError(null);
    setSuccess(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non connecté');

      const { error: progressError } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      const { error: resultsError } = await supabase
        .from('quiz_results')
        .delete()
        .eq('user_id', user.id);

      if (resultsError) throw resultsError;

      setSuccess('Progression réinitialisée avec succès');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      console.error('Reset progress error:', err);
      setError(err.message || 'Erreur lors de la réinitialisation');
    } finally {
      setIsResetting(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelling(true);
    setError(null);
    setSuccess(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Veuillez vous reconnecter');
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cancel-subscription`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to cancel subscription');
      }

      setSuccess('Votre abonnement sera annulé à la fin de la période de facturation actuelle.');
      await fetchSubscription();
      setShowCancelConfirm(false);
    } catch (error: any) {
      console.error('Error cancelling subscription:', error);
      setError(error.message || 'Erreur lors de l\'annulation de l\'abonnement');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Paramètres</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Password Change Section */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('password')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Key size={20} className="text-gray-600" />
                <span className="font-medium">Changer le mot de passe</span>
              </div>
              {expandedSection === 'password' ? (
                <ChevronUp size={20} className="text-gray-600" />
              ) : (
                <ChevronDown size={20} className="text-gray-600" />
              )}
            </button>
            {expandedSection === 'password' && (
              <div className="p-4 border-t">
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Mot de passe actuel
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e2c4f]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e2c4f]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Confirmer le nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e2c4f]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1e2c4f] text-white py-2 rounded-lg hover:bg-[#2a3f6f] transition-colors"
                  >
                    Changer le mot de passe
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Subscription Management Section */}
          {!loadingSubscription && subscription && subscription.subscription_status === 'active' && (
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('subscription')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Crown size={20} className="text-yellow-500" />
                  <span className="font-medium">Gérer l'abonnement</span>
                </div>
                {expandedSection === 'subscription' ? (
                  <ChevronUp size={20} className="text-gray-600" />
                ) : (
                  <ChevronDown size={20} className="text-gray-600" />
                )}
              </button>
              {expandedSection === 'subscription' && (
                <div className="p-4 border-t">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Statut:</strong> {subscription.cancel_at_period_end ? 'Annulation prévue' : 'Actif'}
                    </p>
                    {subscription.current_period_end && (
                      <p className="text-sm text-gray-600">
                        <strong>{subscription.cancel_at_period_end ? 'Se termine le' : 'Renouvelle le'}:</strong>{' '}
                        {new Date(subscription.current_period_end * 1000).toLocaleDateString('fr-CA')}
                      </p>
                    )}
                  </div>

                  {subscription.cancel_at_period_end ? (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-800">
                        Votre abonnement sera annulé à la fin de la période de facturation.
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Annuler l'abonnement
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Reset Progress Section */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('reset')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <RotateCcw size={20} className="text-gray-600" />
                <span className="font-medium">Réinitialiser la progression</span>
              </div>
              {expandedSection === 'reset' ? (
                <ChevronUp size={20} className="text-gray-600" />
              ) : (
                <ChevronDown size={20} className="text-gray-600" />
              )}
            </button>
            {expandedSection === 'reset' && (
              <div className="p-4 border-t">
                <p className="text-gray-600 mb-4">
                  Cette action effacera toute votre progression et vos résultats.
                  Cette action est irréversible.
                </p>
                <button
                  onClick={handleResetProgress}
                  disabled={isResetting}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isResetting ? 'Réinitialisation...' : 'Réinitialiser la progression'}
                </button>
              </div>
            )}
          </div>

          {/* Questions Section - Hidden */}

          {/* Logout Section */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <LogOut size={20} />
            <span>Se déconnecter</span>
          </button>

          {/* Error/Success Messages */}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 text-green-600 rounded-lg">
              {success}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Subscription Confirmation Modal */}
      {showCancelConfirm && subscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Annuler l'abonnement
              </h3>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir annuler votre abonnement premium ?
              Vous conserverez l'accès à toutes les fonctionnalités premium jusqu'à la fin de votre période de facturation actuelle
              {subscription.current_period_end && (
                <> ({new Date(subscription.current_period_end * 1000).toLocaleDateString('fr-CA')})</>
              )}.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                disabled={cancelling}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Garder l'abonnement
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={cancelling}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {cancelling ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Annulation...
                  </>
                ) : (
                  'Confirmer l\'annulation'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}