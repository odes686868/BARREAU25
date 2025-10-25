import { Check } from 'lucide-react';
import { exams } from '../data/exams';
import type { Exam } from '../data/exams';

interface ExamSelectorProps {
  selectedExamId: number;
  onExamChange: (examId: number) => void;
}

export default function ExamSelector({ selectedExamId, onExamChange }: ExamSelectorProps) {

  return null;
}
