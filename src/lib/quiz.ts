import { supabase } from './supabase';
import type { Question } from '../types';

export interface QuizResult {
  examId: number;
  categoryId: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
}

export async function saveQuizResult(result: QuizResult): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase
    .from('quiz_results')
    .insert({
      user_id: (await supabase.auth.getUser()).data.user?.id,
      exam_id: result.examId,
      category_id: result.categoryId,
      total_questions: result.totalQuestions,
      correct_answers: result.correctAnswers,
      incorrect_answers: result.incorrectAnswers,
      unanswered: result.unanswered
    });

  if (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
}

export async function getAvailableQuestions(examId: number, categoryId?: number): Promise<Question[]> {
  if (!supabase) return [];

  try {
    let query = supabase
      .from('questions')
      .select('*')
      .eq('exam_id', examId);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data: questions, error } = await query;

    if (error) {
      console.error('Error fetching questions:', error);
      return [];
    }

    if (!questions || questions.length === 0) {
      console.log('No questions found for exam', examId, 'category', categoryId);
      return [];
    }

    // Shuffle the questions
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  } catch (error) {
    console.error('Error in getAvailableQuestions:', error);
    return [];
  }
}

export async function submitQuizAnswer(
  questionId: string,
  status: 'correct' | 'incorrect' | 'unanswered'
): Promise<void> {
  if (!supabase) return;
  
  const user = await supabase.auth.getUser();
  if (!user.data.user?.id) return;

  try {
    const { error } = await supabase
      .from('user_progress')
      .insert({
        user_id: user.data.user.id,
        question_id: questionId,
        status
      })
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        // Update existing record
        const { error: updateError } = await supabase
          .from('user_progress')
          .update({ status })
          .eq('user_id', user.data.user.id)
          .eq('question_id', questionId);

        if (updateError) throw updateError;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
}