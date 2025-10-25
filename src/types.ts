export type Category = {
  id: number;
  examId: number;
  name: string;
  tableName: string;
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

export type Exam = {
  id: number;
  name: string;
  description: string;
};