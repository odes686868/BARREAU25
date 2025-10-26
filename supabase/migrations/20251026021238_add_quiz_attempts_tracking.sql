/*
  # Add Quiz Attempts Tracking

  1. New Tables
    - `quiz_attempts`: Tracks each quiz attempt by users
      - `id` (bigint, primary key)
      - `user_id` (uuid, references auth.users)
      - `exam_id` (text)
      - `category_id` (text, nullable)
      - `score` (integer, nullable)
      - `total_questions` (integer, nullable)
      - `completed` (boolean, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `quiz_attempts` table
    - Add policies for users to read and insert their own attempts

  3. Functions
    - Function to get remaining free quizzes
*/

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  exam_id text NOT NULL,
  category_id text DEFAULT NULL,
  score integer DEFAULT NULL,
  total_questions integer DEFAULT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own quiz attempts"
  ON quiz_attempts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts"
  ON quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz attempts"
  ON quiz_attempts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to get remaining free quizzes for a user
CREATE OR REPLACE FUNCTION get_remaining_free_quizzes(p_user_id uuid)
RETURNS integer AS $$
DECLARE
  v_tier user_tier_type;
  v_attempts_count integer;
BEGIN
  -- Get user tier
  SELECT tier INTO v_tier
  FROM user_tiers
  WHERE user_id = p_user_id;

  -- If premium, return unlimited (-1)
  IF v_tier = 'premium' THEN
    RETURN -1;
  END IF;

  -- Count completed quiz attempts
  SELECT COUNT(*) INTO v_attempts_count
  FROM quiz_attempts
  WHERE user_id = p_user_id AND completed = true;

  -- Return remaining (1 free quiz)
  RETURN GREATEST(1 - v_attempts_count, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_remaining_free_quizzes(uuid) TO authenticated;
