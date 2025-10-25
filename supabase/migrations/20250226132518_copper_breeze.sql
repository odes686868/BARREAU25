/*
  # Add quiz results table

  1. New Tables
    - `quiz_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `category_id` (integer)
      - `total_questions` (integer)
      - `correct_answers` (integer)
      - `incorrect_answers` (integer)
      - `unanswered` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `quiz_results` table
    - Add policies for users to manage their own results
*/

-- Create quiz results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id integer NOT NULL,
  total_questions integer NOT NULL,
  correct_answers integer NOT NULL,
  incorrect_answers integer NOT NULL,
  unanswered integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  CHECK (total_questions = correct_answers + incorrect_answers + unanswered)
);

-- Enable RLS
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own results"
  ON quiz_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own results"
  ON quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX quiz_results_user_id_idx ON quiz_results(user_id);
CREATE INDEX quiz_results_category_id_idx ON quiz_results(category_id);
CREATE INDEX quiz_results_created_at_idx ON quiz_results(created_at);