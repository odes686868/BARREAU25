/*
  # Create user progress table

  1. New Tables
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `question_id` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `user_progress` table
    - Add policies for authenticated users to:
      - Read their own progress
      - Create their own progress
      - Update their own progress
*/

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  question_id text NOT NULL,
  status text CHECK (status IN ('correct', 'incorrect', 'unanswered')) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user_progress
CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS user_progress_user_id_idx ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS user_progress_question_id_idx ON user_progress(question_id);
CREATE INDEX IF NOT EXISTS user_progress_created_at_idx ON user_progress(created_at);