export interface Exam {
  id: number;
  name: string;
  description: string;
}

export const exams: Exam[] = [
  {
    id: 2,
    name: 'Droit appliqué',
    description: '12 catégories - Procédures, droits des familles, contrats et plus'
  },
  {
    id: 1,
    name: 'Éthique et déontologie',
    description: '7 catégories - Les règles déontologiques, procédures et pratiques professionnelles'
  }
];

export function getExamById(examId: number): Exam | undefined {
  return exams.find(exam => exam.id === examId);
}
