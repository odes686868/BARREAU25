export const exam1Categories = [
  { id: 1, examId: 1, name: 'Les règles déontologiques', tableName: 'category_1' },
  { id: 2, examId: 1, name: 'La procédure disciplinaire', tableName: 'category_2' },
  { id: 3, examId: 1, name: 'La pratique professionnelle', tableName: 'category_3' },
  { id: 4, examId: 1, name: "L'exercice illégal", tableName: 'category_4' },
  { id: 5, examId: 1, name: 'Le contexte social', tableName: 'category_5' },
  { id: 6, examId: 1, name: "L'aide juridique", tableName: 'category_6' },
  { id: 7, examId: 1, name: "L'assurance responsabilité", tableName: 'category_7' }
];

export const exam2Categories = [
  { id: 8, examId: 2, name: 'Preuves et procédures', tableName: 'examen1_1' },
  { id: 9, examId: 2, name: 'Personnes et successions', tableName: 'examen1_2' },
  { id: 10, examId: 2, name: 'Droit de la famille', tableName: 'examen1_3' },
  { id: 11, examId: 2, name: 'Responsabilité', tableName: 'examen1_4' },
  { id: 12, examId: 2, name: 'Obligations et contrats', tableName: 'examen1_5' },
  { id: 13, examId: 2, name: 'Contrats, sûretés, publicité des droits et droit international privé', tableName: 'examen1_6' },
  { id: 14, examId: 2, name: 'Droit autochtone, droit public et administratif', tableName: 'examen1_7' },
  { id: 15, examId: 2, name: 'Droit du travail', tableName: 'examen1_8' },
  { id: 16, examId: 2, name: 'Entreprises et sociétés', tableName: 'examen1_9' },
  { id: 17, examId: 2, name: 'États financiers, fiscalité corporative, faillite et insolvabilité', tableName: 'examen1_10' },
  { id: 18, examId: 2, name: 'Droit pénal – Procédure et preuve', tableName: 'examen1_11' },
  { id: 19, examId: 2, name: 'Droit pénal – Infractions, moyens de défense et peine', tableName: 'examen1_12' }
];

export const categories = [...exam1Categories, ...exam2Categories];

export function getCategoriesByExam(examId: number) {
  return examId === 1 ? exam1Categories : exam2Categories;
}