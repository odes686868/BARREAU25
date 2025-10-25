/*
  # Cr\u00e9ation de la structure des examens
  
  Ce fichier cr\u00e9e la structure pour g\u00e9rer deux examens distincts :
  1. \u00c9thique et d\u00e9ontologie (7 cat\u00e9gories)
  2. Droit appliqu\u00e9 (plusieurs cat\u00e9gories)
  
  Tables cr\u00e9\u00e9es :
  - exams : Liste des examens disponibles
  - exam_categories : Cat\u00e9gories pour chaque examen
  
  Modifications :
  - Ajout de exam_id aux tables existantes
  - Mise \u00e0 jour des cat\u00e9gories existantes pour l'examen \"\u00c9thique et d\u00e9ontologie\"
  
  S\u00e9curit\u00e9 :
  - RLS activ\u00e9 sur toutes les tables
  - Utilisateurs authentifi\u00e9s peuvent lire les examens et cat\u00e9gories
*/

-- Cr\u00e9ation de la table des examens
CREATE TABLE IF NOT EXISTS exams (
  id integer PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Cr\u00e9ation de la table des cat\u00e9gories d'examen
CREATE TABLE IF NOT EXISTS exam_categories (
  id integer PRIMARY KEY,
  exam_id integer NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  display_order integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(exam_id, display_order)
);

-- Activer RLS
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_categories ENABLE ROW LEVEL SECURITY;

-- Politiques RLS (lecture pour utilisateurs authentifi\u00e9s)
CREATE POLICY "Utilisateurs authentifi\u00e9s peuvent lire les examens"
  ON exams FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Utilisateurs authentifi\u00e9s peuvent lire les cat\u00e9gories"
  ON exam_categories FOR SELECT TO authenticated USING (is_active = true);

-- Ins\u00e9rer les deux examens
INSERT INTO exams (id, name, description, is_active) VALUES
  (1, '\u00c9thique et d\u00e9ontologie', 'Examen sur l\u2019\u00e9thique et la d\u00e9ontologie professionnelle', true),
  (2, 'Droit appliqu\u00e9', 'Examen sur le droit appliqu\u00e9 \u00e0 la pratique', true)
ON CONFLICT (id) DO NOTHING;

-- Ins\u00e9rer les cat\u00e9gories pour l'examen \"\u00c9thique et d\u00e9ontologie\"
INSERT INTO exam_categories (id, exam_id, name, description, display_order, is_active) VALUES
  (1, 1, 'Les r\u00e8gles d\u00e9ontologiques', 'R\u00e8gles de conduite professionnelle', 1, true),
  (2, 1, 'La proc\u00e9dure disciplinaire', 'Processus disciplinaire du Barreau', 2, true),
  (3, 1, 'La pratique professionnelle', 'Exercice de la profession d\u2019avocat', 3, true),
  (4, 1, 'L\u2019exercice ill\u00e9gal', 'Infractions li\u00e9es \u00e0 l\u2019exercice', 4, true),
  (5, 1, 'Le contexte social', 'Contexte social de la profession', 5, true),
  (6, 1, 'L\u2019aide juridique', 'Syst\u00e8me d\u2019aide juridique', 6, true),
  (7, 1, 'L\u2019assurance responsabilit\u00e9', 'Assurance professionnelle', 7, true)
ON CONFLICT (id) DO NOTHING;

-- Ins\u00e9rer les cat\u00e9gories pour l'examen \"Droit appliqu\u00e9\" (exemples - \u00e0 compl\u00e9ter)
INSERT INTO exam_categories (id, exam_id, name, description, display_order, is_active) VALUES
  (8, 2, 'Droit civil', 'Principes du droit civil', 1, true),
  (9, 2, 'Droit criminel', 'Droit p\u00e9nal et proc\u00e9dure criminelle', 2, true),
  (10, 2, 'Droit commercial', 'Droit des affaires et commercial', 3, true),
  (11, 2, 'Droit du travail', 'Relations de travail', 4, true),
  (12, 2, 'Droit administratif', 'Droit public et administratif', 5, true)
ON CONFLICT (id) DO NOTHING;

-- Ajouter exam_id aux tables de cat\u00e9gories existantes
ALTER TABLE category_1 ADD COLUMN IF NOT EXISTS exam_id integer DEFAULT 1 REFERENCES exams(id);
ALTER TABLE category_2 ADD COLUMN IF NOT EXISTS exam_id integer DEFAULT 1 REFERENCES exams(id);
ALTER TABLE category_3 ADD COLUMN IF NOT EXISTS exam_id integer DEFAULT 1 REFERENCES exams(id);
ALTER TABLE category_4 ADD COLUMN IF NOT EXISTS exam_id integer DEFAULT 1 REFERENCES exams(id);
ALTER TABLE category_5 ADD COLUMN IF NOT EXISTS exam_id integer DEFAULT 1 REFERENCES exams(id);
ALTER TABLE category_6 ADD COLUMN IF NOT EXISTS exam_id integer DEFAULT 1 REFERENCES exams(id);
ALTER TABLE category_7 ADD COLUMN IF NOT EXISTS exam_id integer DEFAULT 1 REFERENCES exams(id);

-- Ajouter exam_id \u00e0 la table questions
ALTER TABLE questions ADD COLUMN IF NOT EXISTS exam_id integer DEFAULT 1 REFERENCES exams(id);

-- Ajouter exam_id \u00e0 quiz_results
ALTER TABLE quiz_results ADD COLUMN IF NOT EXISTS exam_id integer;
UPDATE quiz_results SET exam_id = 1 WHERE exam_id IS NULL;
ALTER TABLE quiz_results ALTER COLUMN exam_id SET NOT NULL;
ALTER TABLE quiz_results ADD CONSTRAINT quiz_results_exam_id_fkey 
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE;

-- Cr\u00e9er des index pour am\u00e9liorer les performances
CREATE INDEX IF NOT EXISTS idx_exam_categories_exam_id ON exam_categories(exam_id);
CREATE INDEX IF NOT EXISTS idx_questions_exam_id ON questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_exam_id ON quiz_results(exam_id);

-- Mettre \u00e0 jour les contraintes de quiz_results
ALTER TABLE quiz_results DROP CONSTRAINT IF EXISTS quiz_results_category_id_check;
ALTER TABLE quiz_results ADD CONSTRAINT quiz_results_category_id_check 
  CHECK (category_id >= 1 AND category_id <= 12);
