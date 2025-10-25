import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getCategoriesByExam } from '../lib/exams';
import ExamSelector from './ExamSelector';
import type { Question, Category } from '../types';

export default function QuestionBank() {
  const [selectedExamId, setSelectedExamId] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    question_text: '',
    correct_answer: '',
    incorrect_answer_1: '',
    incorrect_answer_2: '',
    incorrect_answer_3: '',
    explanation: '',
    category_id: 1
  });

  useEffect(() => {
    loadCategories();
    loadQuestions();
  }, [selectedExamId]);

  const loadCategories = async () => {
    const data = await getCategoriesByExam(selectedExamId);
    setCategories(data);
    if (data.length > 0) {
      setFormData(prev => ({ ...prev, category_id: data[0].id }));
    }
  };

  const loadQuestions = async () => {
    setLoading(true);
    const allQuestions: Question[] = [];

    try {
      if (selectedExamId === 1) {
        for (let catId = 1; catId <= 7; catId++) {
          const { data } = await supabase.from(`category_${catId}`).select('*');
          if (data) {
            const mapped = data.map(q => ({
              id: q.id,
              exam_id: selectedExamId,
              category_id: catId,
              question_text: q.question_text,
              correct_answer: q.correct_answer,
              incorrect_answers: Array.isArray(q.incorrect_answers)
                ? q.incorrect_answers
                : [q['incorrect_answers/0'], q['incorrect_answers/1'], q['incorrect_answers/2']].filter(Boolean),
              explanation: q.explanation || ''
            }));
            allQuestions.push(...mapped);
          }
        }
      } else {
        for (let i = 1; i <= 12; i++) {
          const { data } = await supabase.from(`examen1_${i}`).select('*');
          if (data) {
            const catId = 7 + i;
            const mapped = data.map(q => ({
              id: q.id,
              exam_id: selectedExamId,
              category_id: catId,
              question_text: q.question_text,
              correct_answer: q.correct_answer,
              incorrect_answers: Array.isArray(q.incorrect_answers)
                ? q.incorrect_answers
                : [q['incorrect_answers/0'], q['incorrect_answers/1'], q['incorrect_answers/2']].filter(Boolean),
              explanation: q.explanation || ''
            }));
            allQuestions.push(...mapped);
          }
        }
      }
      setQuestions(allQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tableName = selectedExamId === 1
      ? `category_${formData.category_id}`
      : `examen1_${formData.category_id - 7}`;

    const questionData = {
      id: editingId || `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      category_id: formData.category_id,
      question_text: formData.question_text,
      correct_answer: formData.correct_answer,
      incorrect_answers: [
        formData.incorrect_answer_1,
        formData.incorrect_answer_2,
        formData.incorrect_answer_3
      ].filter(Boolean),
      explanation: formData.explanation || null,
      exam_id: selectedExamId
    };

    if (editingId) {
      const { error } = await supabase
        .from(tableName)
        .update(questionData)
        .eq('id', editingId);

      if (error) {
        console.error('Error updating question:', error);
        alert('Erreur lors de la mise à jour de la question');
      } else {
        alert('Question mise à jour avec succès !');
        setEditingId(null);
      }
    } else {
      const { error } = await supabase
        .from(tableName)
        .insert([questionData]);

      if (error) {
        console.error('Error adding question:', error);
        alert('Erreur lors de l\'ajout de la question');
      } else {
        alert('Question ajoutée avec succès !');
        setShowAddForm(false);
      }
    }

    resetForm();
    loadQuestions();
    setLoading(false);
  };

  const handleEdit = (question: Question) => {
    setEditingId(question.id);
    setFormData({
      question_text: question.question_text,
      correct_answer: question.correct_answer,
      incorrect_answer_1: question.incorrect_answers[0] || '',
      incorrect_answer_2: question.incorrect_answers[1] || '',
      incorrect_answer_3: question.incorrect_answers[2] || '',
      explanation: question.explanation || '',
      category_id: question.category_id
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) return;

    setLoading(true);

    const question = questions.find(q => q.id === id);
    if (!question) {
      alert('Question introuvable');
      setLoading(false);
      return;
    }

    const tableName = selectedExamId === 1
      ? `category_${question.category_id}`
      : `examen1_${question.category_id - 7}`;

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting question:', error);
      alert('Erreur lors de la suppression de la question');
    } else {
      alert('Question supprimée avec succès !');
      loadQuestions();
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      question_text: '',
      correct_answer: '',
      incorrect_answer_1: '',
      incorrect_answer_2: '',
      incorrect_answer_3: '',
      explanation: '',
      category_id: categories[0]?.id || 1
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <ExamSelector
        selectedExamId={selectedExamId}
        onExamChange={(examId) => {
          setSelectedExamId(examId);
          setShowAddForm(false);
          setEditingId(null);
        }}
      />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Banque de questions</h2>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              resetForm();
            }}
            className="flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            {showAddForm ? (
              <>
                <X className="w-4 h-4" />
                Annuler
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Ajouter une question
              </>
            )}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <textarea
                value={formData.question_text}
                onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                rows={3}
                required
                placeholder="Entrez la question..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Réponse correcte
              </label>
              <input
                type="text"
                value={formData.correct_answer}
                onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                required
                placeholder="La bonne réponse..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Réponses incorrectes
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={formData.incorrect_answer_1}
                  onChange={(e) => setFormData({ ...formData, incorrect_answer_1: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  required
                  placeholder="Réponse incorrecte 1..."
                />
                <input
                  type="text"
                  value={formData.incorrect_answer_2}
                  onChange={(e) => setFormData({ ...formData, incorrect_answer_2: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  required
                  placeholder="Réponse incorrecte 2..."
                />
                <input
                  type="text"
                  value={formData.incorrect_answer_3}
                  onChange={(e) => setFormData({ ...formData, incorrect_answer_3: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  required
                  placeholder="Réponse incorrecte 3..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Explication
              </label>
              <textarea
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                rows={3}
                placeholder="Explication de la réponse correcte..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {loading && !showAddForm ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Chargement des questions...</div>
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucune question pour cet examen. Ajoutez-en une pour commencer !
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => {
              const categoryQuestions = questions.filter(q => q.category_id === category.id);
              if (categoryQuestions.length === 0) return null;

              return (
                <div key={category.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-slate-800 mb-4">
                    {category.name} ({categoryQuestions.length} questions)
                  </h3>
                  <div className="space-y-3">
                    {categoryQuestions.map((question) => (
                      <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-gray-900 flex-1">{question.question_text}</p>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleEdit(question)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Modifier"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(question.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-green-700">✓ {question.correct_answer}</p>
                          {question.incorrect_answers.map((ans, idx) => (
                            <p key={idx} className="text-gray-600">✗ {ans}</p>
                          ))}
                        </div>
                        {question.explanation && (
                          <p className="text-sm text-gray-600 mt-2 italic">
                            Explication : {question.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}