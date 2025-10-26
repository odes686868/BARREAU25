/*
  # Add DELETE policies for progress reset

  1. Changes
    - Add DELETE policy for user_progress table
    - Add DELETE policy for quiz_results table
    - Allow users to delete their own progress and results

  2. Security
    - Users can only delete their own data (user_id = auth.uid())
    - Policies are restrictive and check authentication
*/

-- Add DELETE policy for user_progress
CREATE POLICY "Users can delete own progress"
  ON user_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add DELETE policy for quiz_results
CREATE POLICY "Users can delete own quiz results"
  ON quiz_results
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
