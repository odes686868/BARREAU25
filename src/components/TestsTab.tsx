import { Clock, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAvailableQuestions, submitQuizAnswer, saveQuizResult } from '../lib/quiz';
import { getCategoriesByExam } from '../data/categories';
import ExamSelector from './ExamSelector';
import type { Question, Category } from '../types';

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, 'correct' | 'incorrect' | 'unanswered'>;
  examId: number;
  categoryId?: number;
}

export default function TestsTab() {
  const [selectedExamId, setSelectedExamId] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    loadCategories();
  }, [selectedExamId]);

  const loadCategories = () => {
    const data = getCategoriesByExam(selectedExamId);
    setCategories(data);
  };

  const startQuiz = async (numQuestions: number, categoryId?: number) => {
    setLoading(true);
    try {
      const questions = await getAvailableQuestions(selectedExamId, categoryId);
      const selectedQuestions = questions.slice(0, numQuestions);

      setQuizState({
        questions: selectedQuestions,
        currentQuestionIndex: 0,
        answers: {},
        examId: selectedExamId,
        categoryId
      });
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
    setLoading(false);
  };

  const handleAnswer = async (answer: string) => {
    if (!quizState || showExplanation) return;

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const status = answer === 'skip' ? 'unanswered' :
      answer === currentQuestion.correct_answer ? 'correct' : 'incorrect';

    await submitQuizAnswer(currentQuestion.id, status, currentQuestion.category_id);

    setQuizState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: status
        }
      };
    });

    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const finishQuiz = async () => {
    if (!quizState) return;

    const questionsByCategory: Record<number, { correct: number; incorrect: number; unanswered: number }> = {};

    quizState.questions.forEach((question) => {
      const categoryId = question.category_id;
      if (!questionsByCategory[categoryId]) {
        questionsByCategory[categoryId] = { correct: 0, incorrect: 0, unanswered: 0 };
      }

      const status = quizState.answers[question.id];
      if (status === 'correct') questionsByCategory[categoryId].correct++;
      else if (status === 'incorrect') questionsByCategory[categoryId].incorrect++;
      else if (status === 'unanswered') questionsByCategory[categoryId].unanswered++;
    });

    try {
      for (const [categoryId, stats] of Object.entries(questionsByCategory)) {
        const result = {
          examId: quizState.examId,
          categoryId: parseInt(categoryId),
          totalQuestions: stats.correct + stats.incorrect + stats.unanswered,
          correctAnswers: stats.correct,
          incorrectAnswers: stats.incorrect,
          unanswered: stats.unanswered
        };
        await saveQuizResult(result);
      }

      setQuizState(null);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  const nextQuestion = () => {
    if (!quizState) return;

    if (quizState.currentQuestionIndex >= quizState.questions.length - 1) {
      finishQuiz();
    } else {
      setQuizState(prev => ({
        ...prev!,
        currentQuestionIndex: prev!.currentQuestionIndex + 1
      }));
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement du quiz...</div>
      </div>
    );
  }

  if (selectedCategory === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Choisissez une catégorie</h2>
        <div className="grid gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                startQuiz(10, category.id);
              }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-left"
            >
              <h3 className="font-medium text-lg">{category.name}</h3>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (quizState) {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Question {quizState.currentQuestionIndex + 1}/{quizState.questions.length}
          </h2>
          {quizState.categoryId && (
            <div className="text-sm text-gray-500">
              {categories.find(c => c.id === quizState.categoryId)?.name}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-lg mb-6">{currentQuestion.question_text}</p>

          <div className="space-y-4">
            {[currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]
              .sort()
              .map((answer) => (
                <button
                  key={answer}
                  onClick={() => handleAnswer(answer)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showExplanation
                      ? answer === currentQuestion.correct_answer
                        ? 'bg-green-50 border-green-500'
                        : answer === selectedAnswer
                        ? 'bg-red-50 border-red-500'
                        : 'bg-gray-50 border-gray-200 opacity-50'
                      : 'hover:bg-gray-50 hover:border-[#1e2c4f] border-gray-200'
                  }`}
                >
                  {answer}
                </button>
              ))}

            {!showExplanation && (
              <button
                onClick={() => handleAnswer('skip')}
                className="w-full text-center p-2 text-gray-500 hover:text-gray-700"
              >
                Passer la question
              </button>
            )}
          </div>

          {showExplanation && (
            <div className="mt-8">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 mb-3">
                  Explication
                </h3>
                <p className="text-blue-800">{currentQuestion.explanation}</p>
              </div>
              <button
                onClick={nextQuestion}
                className="mt-6 w-full bg-[#1e2c4f] text-white py-3 rounded-lg hover:bg-[#2a3f6f] transition-colors"
              >
                {quizState.currentQuestionIndex >= quizState.questions.length - 1
                  ? 'Terminer le quiz'
                  : 'Question suivante'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ExamSelector
        selectedExamId={selectedExamId}
        onExamChange={(examId) => {
          setSelectedExamId(examId);
          setQuizState(null);
          setSelectedCategory(null);
        }}
      />
      <h2 className="text-2xl font-bold mb-6">Tests disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'Quiz Rapide',
            description: '10 questions aléatoires de toutes les catégories',
            time: '15 minutes',
            icon: Clock,
            onClick: () => startQuiz(10)
          },
          {
            title: 'Quiz Standard',
            description: '20 questions aléatoires de toutes les catégories',
            time: '30 minutes',
            icon: Clock,
            onClick: () => startQuiz(20)
          },
          {
            title: 'Quiz Complet',
            description: '30 questions aléatoires de toutes les catégories',
            time: '45 minutes',
            icon: Clock,
            onClick: () => startQuiz(30)
          },
          {
            title: 'Quiz Personnalisé',
            description: 'Questions basées sur la catégorie de votre choix',
            icon: Brain,
            onClick: () => setSelectedCategory(0)
          }
        ].map((quiz, index) => (
          <button
            key={index}
            onClick={quiz.onClick}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-left"
          >
            <div
              className="flex items-start space-x-4"
            >
              <quiz.icon size={24} className="text-[#1e2c4f] flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg mb-2">{quiz.title}</h3>
                <p className="text-gray-600">
                  {quiz.description}
                  {quiz.time && ` • ${quiz.time}`}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}