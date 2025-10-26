import { useState, useEffect } from 'react';

const EXAM_STORAGE_KEY = 'selectedExamId';
const DEFAULT_EXAM_ID = 2;

export function useExamSelection() {
  const [selectedExamId, setSelectedExamId] = useState<number>(() => {
    const stored = localStorage.getItem(EXAM_STORAGE_KEY);
    return stored ? parseInt(stored, 10) : DEFAULT_EXAM_ID;
  });

  useEffect(() => {
    localStorage.setItem(EXAM_STORAGE_KEY, selectedExamId.toString());
  }, [selectedExamId]);

  return { selectedExamId, setSelectedExamId };
}
