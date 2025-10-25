/*
  # Créer les tables examen1_* pour le deuxième examen (Droit appliqué)
  
  Crée 12 tables pour stocker les questions du deuxième examen.
  Structure identique aux tables category_*.
  
  Tables créées :
  - examen1_1 à examen1_12 (catégories du deuxième examen)
  
  Sécurité :
  - RLS activé sur toutes les tables
  - Lecture pour utilisateurs authentifiés
  - Écriture pour utilisateurs authentifiés
*/

-- Créer les 12 tables pour l'examen "Droit appliqué"
CREATE TABLE IF NOT EXISTS examen1_1 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 8,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_2 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 9,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_3 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 10,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_4 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 11,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_5 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 12,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_6 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 8,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_7 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 9,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_8 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 10,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_9 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 11,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_10 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 12,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_11 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 8,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

CREATE TABLE IF NOT EXISTS examen1_12 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 9,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now(),
  exam_id integer DEFAULT 2
);

-- Activer RLS sur toutes les tables
ALTER TABLE examen1_1 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_3 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_4 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_5 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_6 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_7 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_8 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_10 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_11 ENABLE ROW LEVEL SECURITY;
ALTER TABLE examen1_12 ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_1"
  ON examen1_1 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_2"
  ON examen1_2 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_3"
  ON examen1_3 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_4"
  ON examen1_4 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_5"
  ON examen1_5 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_6"
  ON examen1_6 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_7"
  ON examen1_7 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_8"
  ON examen1_8 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_9"
  ON examen1_9 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_10"
  ON examen1_10 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_11"
  ON examen1_11 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Utilisateurs authentifiés peuvent lire examen1_12"
  ON examen1_12 FOR SELECT TO authenticated USING (true);

-- Politiques d'écriture (pour permettre l'import de données)
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_1"
  ON examen1_1 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_2"
  ON examen1_2 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_3"
  ON examen1_3 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_4"
  ON examen1_4 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_5"
  ON examen1_5 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_6"
  ON examen1_6 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_7"
  ON examen1_7 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_8"
  ON examen1_8 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_9"
  ON examen1_9 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_10"
  ON examen1_10 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_11"
  ON examen1_11 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Utilisateurs authentifiés peuvent insérer dans examen1_12"
  ON examen1_12 FOR INSERT TO authenticated WITH CHECK (true);
