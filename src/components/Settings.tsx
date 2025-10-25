import { useState } from 'react';
import { X, ChevronDown, ChevronUp, LogOut, RotateCcw, Key, BookOpen } from 'lucide-react';
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
    setIsResetting(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      setSuccess('Progression réinitialisée avec succès');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError('Erreur lors de la réinitialisation');
    } finally {
      setIsResetting(false);
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

          {/* Questions Section */}
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('questions')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BookOpen size={20} className="text-gray-600" />
                <span className="font-medium">Questions de la base de données</span>
              </div>
              {expandedSection === 'questions' ? (
                <ChevronUp size={20} className="text-gray-600" />
              ) : (
                <ChevronDown size={20} className="text-gray-600" />
              )}
            </button>
            {expandedSection === 'questions' && (
              <div className="p-4 border-t max-h-[60vh] overflow-y-auto">
                {loading ? (
                  <div className="text-center py-4">Chargement des questions...</div>
                ) : (
                  <div className="space-y-6">
                    {categories.map(category => {
                      const categoryQuestions = questions.filter(q => q.category_id === category.id);
                      if (categoryQuestions.length === 0) return null;

                      return (
                        <div key={category.id} className="space-y-4">
                          <h3 className="font-medium text-lg text-[#1e2c4f]">
                            {category.name} ({categoryQuestions.length} questions)
                          </h3>
                          <div className="space-y-4">
                            {categoryQuestions.map(question => (
                              <div key={question.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
                                <p className="font-medium">{question.question_text}</p>
                                <div className="pl-4 space-y-2">
                                  <p className="text-green-600">✓ {question.correct_answer}</p>
                                  {question.incorrect_answers.map((answer, index) => (
                                    <p key={index} className="text-red-600">✗ {answer}</p>
                                  ))}
                                </div>
                                <div className="text-sm text-gray-600 mt-2 pt-2 border-t">
                                  <strong>Explication:</strong> {question.explanation}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

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
    </div>
  );
}