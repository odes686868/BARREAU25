import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export function useQuizLimit() {
  const { user } = useAuthStore();
  const [remainingQuizzes, setRemainingQuizzes] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (user) {
      checkQuizLimit();
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkQuizLimit = async () => {
    try {
      const { data: tierData, error: tierError } = await supabase
        .from('user_tiers')
        .select('tier')
        .single();

      if (tierError) {
        console.error('Error fetching tier:', tierError);
        setRemainingQuizzes(1);
        setIsPremium(false);
        setLoading(false);
        return;
      }

      if (tierData.tier === 'premium') {
        setIsPremium(true);
        setRemainingQuizzes(-1);
        setLoading(false);
        return;
      }

      const { data: attemptsData, error: attemptsError } = await supabase
        .from('quiz_attempts')
        .select('id')
        .eq('completed', true);

      if (attemptsError) {
        console.error('Error fetching quiz attempts:', attemptsError);
        setRemainingQuizzes(1);
      } else {
        const completedCount = attemptsData?.length || 0;
        setRemainingQuizzes(Math.max(1 - completedCount, 0));
      }

      setIsPremium(false);
    } catch (error) {
      console.error('Error checking quiz limit:', error);
      setRemainingQuizzes(1);
      setIsPremium(false);
    } finally {
      setLoading(false);
    }
  };

  const recordQuizAttempt = async (examId: string, categoryId?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          exam_id: examId,
          category_id: categoryId,
          completed: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error recording quiz attempt:', error);
        return null;
      }

      return data.id;
    } catch (error) {
      console.error('Error recording quiz attempt:', error);
      return null;
    }
  };

  const completeQuizAttempt = async (
    attemptId: number,
    score: number,
    totalQuestions: number
  ) => {
    try {
      const { error } = await supabase
        .from('quiz_attempts')
        .update({
          score,
          total_questions: totalQuestions,
          completed: true
        })
        .eq('id', attemptId);

      if (error) {
        console.error('Error completing quiz attempt:', error);
      } else {
        await checkQuizLimit();
      }
    } catch (error) {
      console.error('Error completing quiz attempt:', error);
    }
  };

  return {
    remainingQuizzes,
    loading,
    isPremium,
    canTakeQuiz: isPremium || (remainingQuizzes !== null && remainingQuizzes > 0),
    recordQuizAttempt,
    completeQuizAttempt,
    refetch: checkQuizLimit
  };
}
