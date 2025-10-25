import { Check } from 'lucide-react';
import { exams } from '../data/exams';
import type { Exam } from '../data/exams';

interface ExamSelectorProps {
  selectedExamId: number;
  onExamChange: (examId: number) => void;
}

export default function ExamSelector({ selectedExamId, onExamChange }: ExamSelectorProps) {

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-3">
        {exams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => onExamChange(exam.id)}
            className={`relative p-6 rounded-xl border-2 transition-all text-center ${
              selectedExamId === exam.id
                ? 'border-blue-600 bg-blue-600 shadow-lg transform scale-[1.02]'
                : 'border-gray-300 bg-white hover:border-blue-500 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center">
              <h3 className={`text-xl font-bold mb-2 ${
                selectedExamId === exam.id ? 'text-white' : 'text-gray-900'
              }`}>
                {exam.name}
              </h3>
              {selectedExamId === exam.id && (
                <div className="mt-2">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white text-blue-600 text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Sélectionné
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
