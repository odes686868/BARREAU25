import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { categories, exam1Categories, exam2Categories } from '../data/categories';
import ExamSelector from './ExamSelector';

interface QuizResult {
  id: string;
  exam_id: number;
  category_id: number;
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  unanswered: number;
  created_at: string;
}

interface CategoryStats {
  categoryId: number;
  categoryName: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  successRate: number;
}

interface ResultsTabProps {
  selectedExamId: number;
  setSelectedExamId: (examId: number) => void;
}

export default function ResultsTab({ selectedExamId, setSelectedExamId }: ResultsTabProps) {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  const globalStats = results
    .filter((r) => r.exam_id === selectedExamId)
    .reduce(
      (acc, result) => ({
        total: acc.total + result.total_questions,
        correct: acc.correct + result.correct_answers,
        incorrect: acc.incorrect + result.incorrect_answers,
        unanswered: acc.unanswered + result.unanswered,
      }),
      { total: 0, correct: 0, incorrect: 0, unanswered: 0 }
    );

  const examCategories = selectedExamId === 1 ? exam1Categories : exam2Categories;

  const categoryStats: CategoryStats[] = examCategories.map((category) => {
    const categoryResults = results.filter(
      (r) => r.category_id === category.id && r.exam_id === selectedExamId
    );

    const stats = categoryResults.reduce(
      (acc, result) => ({
        totalQuestions: acc.totalQuestions + result.total_questions,
        correctAnswers: acc.correctAnswers + result.correct_answers,
        incorrectAnswers: acc.incorrectAnswers + result.incorrect_answers,
        unanswered: acc.unanswered + result.unanswered,
      }),
      { totalQuestions: 0, correctAnswers: 0, incorrectAnswers: 0, unanswered: 0 }
    );

    const successRate = stats.totalQuestions > 0
      ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
      : 0;

    return {
      categoryId: category.id,
      categoryName: category.name,
      ...stats,
      successRate,
    };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement des résultats...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ExamSelector
        selectedExamId={selectedExamId}
        onExamChange={setSelectedExamId}
      />
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Statistiques globales</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-2xl">{globalStats.total}</p>
            <p className="text-gray-600">Questions totales</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-medium text-2xl text-green-700">{globalStats.correct}</p>
            <p className="text-green-600">Correctes</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="font-medium text-2xl text-red-700">{globalStats.incorrect}</p>
            <p className="text-red-600">Incorrectes</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-2xl text-gray-700">{globalStats.unanswered}</p>
            <p className="text-gray-600">Sans réponse</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Résultats par catégorie</h2>
        <div className="space-y-6">
          {categoryStats.map((stats) => (
            <div key={stats.categoryId} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-lg">{stats.categoryName}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {stats.totalQuestions} question{stats.totalQuestions > 1 ? 's' : ''} répondue{stats.totalQuestions > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#1e2c4f]">{stats.successRate}%</p>
                  <p className="text-sm text-gray-500">Taux de réussite</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-xl font-semibold text-green-700">{stats.correctAnswers}</p>
                  <p className="text-xs text-green-600">Correctes</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-xl font-semibold text-red-700">{stats.incorrectAnswers}</p>
                  <p className="text-xs text-red-600">Incorrectes</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xl font-semibold text-gray-700">{stats.unanswered}</p>
                  <p className="text-xs text-gray-600">Non répondues</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}