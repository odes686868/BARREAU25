/*
  # Update category tables structure

  1. New Tables
    - `category_4` through `category_7` for remaining categories
    - Same structure as existing category tables 1-3

  2. Security
    - Enable RLS on all new tables
    - Add read-only policies for authenticated users
*/

-- Create category_4 table (L'exercice illégal)
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

ALTER TABLE category_4 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read questions"
  ON category_4
  FOR SELECT
  TO authenticated
  USING (true);

-- Create category_5 table (Le contexte social)
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

ALTER TABLE category_5 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read questions"
  ON category_5
  FOR SELECT
  TO authenticated
  USING (true);

-- Create category_6 table (L'aide juridique)
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

ALTER TABLE category_6 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read questions"
  ON category_6
  FOR SELECT
  TO authenticated
  USING (true);

-- Create category_7 table (L'assurance responsabilité)
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

ALTER TABLE category_7 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read questions"
  ON category_7
  FOR SELECT
  TO authenticated
  USING (true);