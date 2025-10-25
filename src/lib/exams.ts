import { supabase } from './supabase';
import type { Exam, Category } from '../types';

export async function getExams(): Promise<Exam[]> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('is_active', true)
    .order('id');

  if (error) {
    console.error('Error fetching exams:', error);
    return [];
  }

  return data || [];
}

export async function getCategoriesByExam(examId: number): Promise<Category[]> {
  const { data, error } = await supabase
    .from('exam_categories')
    .select('*')
    .eq('exam_id', examId)
    .eq('is_active', true)
    .order('display_order');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

export async function getExamById(examId: number): Promise<Exam | null> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('id', examId)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching exam:', error);
    return null;
  }

  return data;
}
