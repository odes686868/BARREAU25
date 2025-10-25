/*
  # Update user progress table policies

  1. Changes
    - Add ON DELETE CASCADE to user_id foreign key
    - Drop existing policies if they exist
    - Recreate policies with proper checks
    - Add composite index for performance

  2. Security
    - Maintain RLS
    - Ensure proper policy isolation
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can read own progress" ON user_progress;
  DROP POLICY IF EXISTS "Users can create own progress" ON user_progress;
  DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
END $$;

-- Add ON DELETE CASCADE to user_id foreign key
ALTER TABLE user_progress DROP CONSTRAINT IF EXISTS user_progress_user_id_fkey;
ALTER TABLE user_progress ADD CONSTRAINT user_progress_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create policies with proper checks
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

-- Add composite index for better performance
CREATE INDEX IF NOT EXISTS user_progress_user_question_idx ON user_progress(user_id, question_id);