export type Category = {
  id: number;
  name: string;
};

export type Question = {
  id: string;
  category_id: number;
  question_text: string;
  correct_answer: string;
  incorrect_answers: string[];
  explanation: string;
};