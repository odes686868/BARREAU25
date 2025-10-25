import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { exam1Categories, exam2Categories } from '../data/categories';
import ExamSelector from './ExamSelector';

interface CategoryProgress {
  categoryId: number;
  categoryName: string;
  totalAttempted: number;
  correctAnswers: number;
  progressPercentage: number;
}

export default function ProgressTab() {
  const [progress, setProgress] = useState<CategoryProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExamId, setSelectedExamId] = useState<number>(1);

  useEffect(() => {
    loadProgress();
  }, [selectedExamId]);

  const loadProgress = async () => {
    try {
      const { data: progressData, error } = await supabase
        .from('user_progress')
        .select('question_id, status, category_id');

      if (error) throw error;

      const examCategories = selectedExamId === 1 ? exam1Categories : exam2Categories;

      const categoryProgress = examCategories.map((category) => {
        const categoryQuestions = progressData?.filter(
          (p) => p.category_id === category.id
        ) || [];

        const correctAnswers = categoryQuestions.filter((p) => p.status === 'correct').length;
        const totalAttempted = categoryQuestions.length;
        const progressPercentage = totalAttempted > 0
          ? Math.round((correctAnswers / totalAttempted) * 100)
          : 0;

        return {
          categoryId: category.id,
          categoryName: category.name,
          totalAttempted,
          correctAnswers,
          progressPercentage,
        };
      });

      setProgress(categoryProgress);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement de la progression...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ExamSelector
        selectedExamId={selectedExamId}
        onExamChange={setSelectedExamId}
      />
      <div>
        <h2 className="text-2xl font-bold mb-6">Progression par catégorie</h2>
        <div className="grid gap-6">
          {progress.map((categoryProgress) => (
            <div
              key={categoryProgress.categoryId}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-lg">{categoryProgress.categoryName}</h3>
                <span className="text-sm text-gray-500">
                  {categoryProgress.totalAttempted > 0
                    ? `${categoryProgress.correctAnswers}/${categoryProgress.totalAttempted} correctes`
                    : 'Aucune question répondue'}
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1e2c4f] to-[#2a3f6f] transition-all duration-500"
                  style={{ width: `${categoryProgress.progressPercentage}%` }}
                />
              </div>
              <div className="mt-2 text-right">
                <span className="text-sm font-medium text-[#1e2c4f]">
                  {categoryProgress.progressPercentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}