/*
  # Cr\u00e9ation du sch\u00e9ma initial pour Barreau IA
  
  Ce fichier cr\u00e9e toutes les tables n\u00e9cessaires pour l'application :
  
  1. Tables de cat\u00e9gories (category_1 \u00e0 category_7)
     - Stockent les questions pour chaque domaine d'examen
     - Structure : id, category_id, question_text, correct_answer, incorrect_answers, explanation
  
  2. Table questions
     - Table unifi\u00e9e pour toutes les questions
     - Utilise un array pour incorrect_answers
  
  3. Table user_progress
     - Suit les r\u00e9ponses de chaque utilisateur
     - user_id, question_id, status (correct/incorrect/unanswered)
  
  4. Table quiz_results
     - Stocke les r\u00e9sultats de chaque test
     - user_id, category_id, scores, date
  
  S\u00e9curit\u00e9 :
  - RLS activ\u00e9 sur toutes les tables
  - Politiques restrictives : utilisateurs authentifi\u00e9s seulement
  - Les utilisateurs ne peuvent acc\u00e9der qu'\u00e0 leurs propres donn\u00e9es
*/

-- Cr\u00e9ation des 7 tables de cat\u00e9gories
CREATE TABLE IF NOT EXISTS category_1 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 1,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  "incorrect_answers/0" text,
  "incorrect_answers/1" text,
  "incorrect_answers/2" text,
  explanation text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS category_2 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 2,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  "incorrect_answers/0" text,
  "incorrect_answers/1" text,
  "incorrect_answers/2" text,
  explanation text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS category_3 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 3,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  "incorrect_answers/0" text,
  "incorrect_answers/1" text,
  "incorrect_answers/2" text,
  explanation text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS category_4 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 4,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  "incorrect_answers/0" text,
  "incorrect_answers/1" text,
  "incorrect_answers/2" text,
  explanation text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS category_5 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 5,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  "incorrect_answers/0" text,
  "incorrect_answers/1" text,
  "incorrect_answers/2" text,
  explanation text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS category_6 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 6,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  "incorrect_answers/0" text,
  "incorrect_answers/1" text,
  "incorrect_answers/2" text,
  explanation text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS category_7 (
  id text PRIMARY KEY,
  category_id int8 DEFAULT 7,
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  "incorrect_answers/0" text,
  "incorrect_answers/1" text,
  "incorrect_answers/2" text,
  explanation text,
  created_at timestamptz DEFAULT now()
);

-- Table unifi\u00e9e des questions
CREATE TABLE IF NOT EXISTS questions (
  id text PRIMARY KEY,
  category_id integer NOT NULL CHECK (category_id BETWEEN 1 AND 7),
  question_text text NOT NULL,
  correct_answer text NOT NULL,
  incorrect_answers text[] NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now()
);

-- Table de progression utilisateur
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id text NOT NULL,
  status text NOT NULL CHECK (status IN ('correct', 'incorrect', 'unanswered')),
  answered_at timestamptz DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Table des r\u00e9sultats de quiz
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id integer NOT NULL CHECK (category_id BETWEEN 1 AND 7),
  total_questions integer NOT NULL DEFAULT 0,
  correct_answers integer NOT NULL DEFAULT 0,
  incorrect_answers integer NOT NULL DEFAULT 0,
  unanswered integer NOT NULL DEFAULT 0,
  completed_at timestamptz DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE category_1 ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_3 ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_4 ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_5 ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_6 ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_7 ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les cat\u00e9gories (lecture seule pour utilisateurs authentifi\u00e9s)
CREATE POLICY "Utilisateurs authentifi\u00e9s peuvent lire category_1"
  ON category_1 FOR SELECT TO authenticated USING (true);

CREATE POLICY "Utilisateurs authentifi\u00e9s peuvent lire category_2"
  ON category_2 FOR SELECT TO authenticated USING (true);

CREATE POLICY "Utilisateurs authentifi\u00e9s peuvent lire category_3"
  ON category_3 FOR SELECT TO authenticated USING (true);

CREATE POLICY "Utilisateurs authentifi\u00e9s peuvent lire category_4"
  ON category_4 FOR SELECT TO authenticated USING (true);

CREATE POLICY "Utilisateurs authentifi\u00e9s peuvent lire category_5"
  ON category_5 FOR SELECT TO authenticated USING (true);

CREATE POLICY "Utilisateurs authentifi\u00e9s peuvent lire category_6"
  ON category_6 FOR SELECT TO authenticated USING (true);

CREATE POLICY "Utilisateurs authentifi\u00e9s peuvent lire category_7"
  ON category_7 FOR SELECT TO authenticated USING (true);

-- Politiques RLS pour questions (lecture seule)
CREATE POLICY "Utilisateurs authentifi\u00e9s peuvent lire questions"
  ON questions FOR SELECT TO authenticated USING (true);

-- Politiques RLS pour user_progress (acc\u00e8s complet \u00e0 ses propres donn\u00e9es)
CREATE POLICY "Utilisateurs peuvent lire leur propre progression"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Utilisateurs peuvent ins\u00e9rer leur propre progression"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateurs peuvent modifier leur propre progression"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateurs peuvent supprimer leur propre progression"
  ON user_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Politiques RLS pour quiz_results (acc\u00e8s complet \u00e0 ses propres r\u00e9sultats)
CREATE POLICY "Utilisateurs peuvent lire leurs propres r\u00e9sultats"
  ON quiz_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Utilisateurs peuvent ins\u00e9rer leurs propres r\u00e9sultats"
  ON quiz_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateurs peuvent modifier leurs propres r\u00e9sultats"
  ON quiz_results FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Cr\u00e9er des index pour am\u00e9liorer les performances
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_question_id ON user_progress(question_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_category_id ON quiz_results(category_id);
CREATE INDEX IF NOT EXISTS idx_questions_category_id ON questions(category_id);
