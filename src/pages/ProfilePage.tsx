import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, BarChart3, Trophy, Target, Crown, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { SubscriptionStatus } from '../components/SubscriptionStatus';

interface UserStats {
  totalExams: number;
  averageScore: number;
  bestScore: number;
  totalQuestions: number;
}

export default function Profile() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<UserStats>({
    totalExams: 0,
    averageScore: 0,
    bestScore: 0,
    totalQuestions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const { data: results, error } = await supabase
        .from('exam_results')
        .select('score, total_questions')
        .eq('user_id', user?.id);

      if (error) throw error;

      if (results && results.length > 0) {
        const totalExams = results.length;
        const scores = results.map(r => (r.score / r.total_questions) * 100);
        const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        const bestScore = Math.max(...scores);
        const totalQuestions = results.reduce((sum, r) => sum + r.total_questions, 0);

        setStats({
          totalExams,
          averageScore: Math.round(averageScore),
          bestScore: Math.round(bestScore),
          totalQuestions
        });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h2>
          <p className="text-gray-600">Veuillez vous connecter pour accéder à votre profil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.email}</h1>
              <p className="text-gray-600">Membre depuis {formatDate(user.created_at)}</p>
              <div className="mt-2">
                <SubscriptionStatus />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Inscrit le {formatDate(user.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Statistiques
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Chargement des statistiques...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalExams}</div>
                <div className="text-sm text-gray-600">Examens passés</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{stats.averageScore}%</div>
                <div className="text-sm text-gray-600">Score moyen</div>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-yellow-600">{stats.bestScore}%</div>
                <div className="text-sm text-gray-600">Meilleur score</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{stats.totalQuestions}</div>
                <div className="text-sm text-gray-600">Questions répondues</div>
              </div>
            </div>
          )}
        </div>

        {/* Subscription Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Crown className="w-5 h-5 mr-2 text-yellow-500" />
              Gestion de l'abonnement
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Forfait actuel</h3>
                <SubscriptionStatus />
              </div>
              <Link
                to="/pricing"
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span>Voir les forfaits</span>
              </Link>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>
                Avec le forfait Premium, profitez d'un accès illimité à tous nos examens de pratique 
                et maximisez vos chances de réussite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}