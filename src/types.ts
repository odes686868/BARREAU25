export type Exam = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
};

export type Category = {
  id: number;
  exam_id: number;
  name: string;
  description?: string;
  display_order: number;
  is_active: boolean;
};

export type Question = {
  id: string;
  exam_id: number;
  category_id: number;
  question_text: string;
  correct_answer: string;
  incorrect_answers: string[];
  explanation: string;
};