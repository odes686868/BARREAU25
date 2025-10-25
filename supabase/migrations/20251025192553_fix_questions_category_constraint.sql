/*
  # Corriger la contrainte de category_id dans questions
  
  Modifications :
  - Supprimer l'ancienne contrainte limitant category_id à 1-7
  - Ajouter une nouvelle contrainte permettant category_id de 1 à 12
  
  Sécurité :
  - Maintenir l'intégrité des données
*/

-- Supprimer l'ancienne contrainte
ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_category_id_check;

-- Ajouter la nouvelle contrainte permettant les catégories 1-12
ALTER TABLE questions ADD CONSTRAINT questions_category_id_check 
  CHECK (category_id >= 1 AND category_id <= 12);
