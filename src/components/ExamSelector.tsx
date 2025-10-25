import { useEffect, useState } from 'react';
import { BookOpen, Check } from 'lucide-react';
import { getExams } from '../lib/exams';
import type { Exam } from '../types';

interface ExamSelectorProps {
  selectedExamId: number;
  onExamChange: (examId: number) => void;
}

export default function ExamSelector({ selectedExamId, onExamChange }: ExamSelectorProps) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    setLoading(true);
    const data = await getExams();
    setExams(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center mb-4">
        <BookOpen className="w-5 h-5 text-slate-600 mr-2" />
        <h2 className="text-lg font-semibold text-slate-800">Sélectionner un examen</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => onExamChange(exam.id)}
            className={`relative p-4 rounded-lg border-2 transition-all text-left ${
              selectedExamId === exam.id
                ? 'border-slate-600 bg-slate-50'
                : 'border-gray-200 hover:border-slate-400 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 mb-1">{exam.name}</h3>
                {exam.description && (
                  <p className="text-sm text-gray-600">{exam.description}</p>
                )}
              </div>
              {selectedExamId === exam.id && (
                <div className="ml-3 flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
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
