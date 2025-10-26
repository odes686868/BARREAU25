export const exam1Categories = [
  { id: 1, examId: 1, name: 'Titre I - Les règles déontologiques', tableName: 'category_1' },
  { id: 2, examId: 1, name: 'Titre II - La procédure disciplinaire', tableName: 'category_2' },
  { id: 3, examId: 1, name: 'Titre III - La pratique professionnelle', tableName: 'category_3' },
  { id: 4, examId: 1, name: "Titre IV - L'exercice illégal", tableName: 'category_4' },
  { id: 5, examId: 1, name: 'Titre V - Le contexte social', tableName: 'category_5' },
  { id: 6, examId: 1, name: "Titre VI - L'aide juridique", tableName: 'category_6' },
  { id: 7, examId: 1, name: "Titre VII - L'assurance responsabilité", tableName: 'category_7' }
];

export const exam2Categories = [
  { id: 8, examId: 2, name: 'Volume 2 : Preuves et procédures', tableName: 'examen1_1' },
  { id: 9, examId: 2, name: 'Volume 3 : Personnes et successions', tableName: 'examen1_2' },
  { id: 10, examId: 2, name: 'Volume 4 : Droit de la famille', tableName: 'examen1_3' },
  { id: 11, examId: 2, name: 'Volume 5 : Responsabilité', tableName: 'examen1_4' },
  { id: 12, examId: 2, name: 'Volume 6 : Obligations et contrats', tableName: 'examen1_5' },
  { id: 13, examId: 2, name: 'Volume 7 : Contrats, sûretés, publicité des droits et droit international privé', tableName: 'examen1_6' },
  { id: 14, examId: 2, name: 'Volume 8 : Droit autochtone, droit public et administratif', tableName: 'examen1_7' },
  { id: 15, examId: 2, name: 'Volume 9 : Droit du travail', tableName: 'examen1_8' },
  { id: 16, examId: 2, name: 'Volume 10 : Entreprises et sociétés', tableName: 'examen1_9' },
  { id: 17, examId: 2, name: 'Volume 11 : États financiers, fiscalité corporative, faillite et insolvabilité', tableName: 'examen1_10' },
  { id: 18, examId: 2, name: 'Volume 12 : Droit pénal – Procédure et preuve', tableName: 'examen1_11' },
  { id: 19, examId: 2, name: 'Volume 13 : Droit pénal – Infractions, moyens de défense et peine', tableName: 'examen1_12' }
];

export const categories = [...exam1Categories, ...exam2Categories];

export function getCategoriesByExam(examId: number) {
  return examId === 1 ? exam1Categories : exam2Categories;
}