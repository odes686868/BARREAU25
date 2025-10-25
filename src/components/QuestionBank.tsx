import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Question } from '../types';
import { categories } from '../data/categories';

export default function QuestionBank() {
  const [questionsByCategory, setQuestionsByCategory] = useState<Record<number, Question[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        const maxRetries = 3;
        const allQuestions: Record<number, Question[]> = {};

        // Load questions from all categories
        for (const catId of [1, 2, 3, 4, 5, 6, 7]) {
          let retries = 0;
          while (retries < maxRetries) {
            try {
              const { data, error } = await supabase
                .from(`category_${catId}`)
                .select('*');

              if (error) throw error;

              if (data) {
                allQuestions[catId] = data.map(q => ({
                  id: q.id,
                  category_id: catId,
                  question_text: q.question_text,
                  correct_answer: q.correct_answer,
                  incorrect_answers: [
                    q['incorrect_answers/0'],
                    q['incorrect_answers/1'],
                    q['incorrect_answers/2']
                  ].filter(Boolean),
                  explanation: q.explanation
                }));
                console.log(`Loaded ${allQuestions[catId].length} questions from category ${catId}`);
                break;
              }
              break;
            } catch (error) {
              console.error(`Error loading category ${catId} (attempt ${retries + 1}):`, error);
              retries++;
              if (retries < maxRetries) {
                await delay(1000 * retries); // Exponential backoff
              }
            }
          }
        }

        setQuestionsByCategory(allQuestions);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Une erreur est survenue lors du chargement des questions. Veuillez rafraîchir la page.');
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-lg">Chargement des questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  const totalQuestions = Object.values(questionsByCategory).reduce(
    (sum, questions) => sum + questions.length,
    0
  );

  if (totalQuestions === 0) {
    return (
      <div className="text-center text-gray-600">
        Aucune question disponible.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {categories.map(category => {
        const questions = questionsByCategory[category.id] || [];
        if (questions.length === 0) return null;

        return (
          <div key={category.id} className="space-y-4">
            <h2 className="text-2xl font-bold">
              {category.name} ({questions.length} questions)
            </h2>
            <div className="space-y-6">
              {questions.map(question => (
                <div key={question.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <h3 className="font-medium text-lg mb-4">{question.question_text}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p>{question.correct_answer}</p>
              </div>
              {question.incorrect_answers.map((answer, i) => (
                <div key={i} className="flex items-center space-x-2 text-red-600">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <p>{answer}</p>
                </div>
              ))}
              {question.explanation && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm">{question.explanation}</p>
                </div>
              )}
            </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}