/*
  # Add categories 2 and 3 tables

  1. New Tables
    - `category_2` (La procédure disciplinaire)
      - Same structure as category_1
    - `category_3` (La pratique professionnelle)
      - Same structure as category_1

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read questions
*/

-- Create category_2 table
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

-- Enable RLS for category_2
ALTER TABLE category_2 ENABLE ROW LEVEL SECURITY;

-- Create policy for category_2
CREATE POLICY "Allow authenticated users to read questions"
  ON category_2
  FOR SELECT
  TO authenticated
  USING (true);

-- Create category_3 table
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

-- Enable RLS for category_3
ALTER TABLE category_3 ENABLE ROW LEVEL SECURITY;

-- Create policy for category_3
CREATE POLICY "Allow authenticated users to read questions"
  ON category_3
  FOR SELECT
  TO authenticated
  USING (true);