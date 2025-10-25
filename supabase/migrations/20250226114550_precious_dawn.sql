/*
  # Create category_1 table for Les règles déontologiques

  1. New Tables
    - `category_1`
      - `id` (text, primary key)
      - `category_id` (int8, default 1)
      - `question_text` (text)
      - `correct_answer` (text)
      - `incorrect_answers/0` (text)
      - `incorrect_answers/1` (text)
      - `incorrect_answers/2` (text)
      - `explanation` (text)

  2. Security
    - Enable RLS on `category_1` table
    - Add policy for authenticated users to read questions
*/

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

-- Enable Row Level Security
ALTER TABLE category_1 ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read questions
CREATE POLICY "Allow authenticated users to read questions"
  ON category_1
  FOR SELECT
  TO authenticated
  USING (true);