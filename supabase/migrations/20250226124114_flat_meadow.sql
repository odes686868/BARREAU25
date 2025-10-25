/*
  # Fix user progress foreign key constraints

  1. Changes
    - Drop existing foreign key constraints that are causing issues
    - Add a new trigger-based validation approach
    - Maintain data integrity without strict foreign keys

  2. Security
    - Maintain existing RLS policies
    - Ensure data integrity through triggers
*/

-- Drop existing foreign key constraints
ALTER TABLE user_progress
DROP CONSTRAINT IF EXISTS user_progress_category_1_fkey,
DROP CONSTRAINT IF EXISTS user_progress_category_2_fkey,
DROP CONSTRAINT IF EXISTS user_progress_category_3_fkey,
DROP CONSTRAINT IF EXISTS user_progress_category_4_fkey,
DROP CONSTRAINT IF EXISTS user_progress_category_5_fkey,
DROP CONSTRAINT IF EXISTS user_progress_category_6_fkey,
DROP CONSTRAINT IF EXISTS user_progress_category_7_fkey;

-- Create or replace the function to check question existence
CREATE OR REPLACE FUNCTION check_question_exists()
RETURNS TRIGGER AS $$
DECLARE
  question_exists BOOLEAN;
BEGIN
  -- Check if the question exists in any category table
  SELECT EXISTS (
    SELECT 1 FROM (
      SELECT id FROM category_1
      UNION ALL
      SELECT id FROM category_2
      UNION ALL
      SELECT id FROM category_3
      UNION ALL
      SELECT id FROM category_4
      UNION ALL
      SELECT id FROM category_5
      UNION ALL
      SELECT id FROM category_6
      UNION ALL
      SELECT id FROM category_7
    ) AS all_questions
    WHERE id = NEW.question_id
  ) INTO question_exists;

  IF question_exists THEN
    RETURN NEW;
  ELSE
    RAISE EXCEPTION 'Question ID % does not exist in any category table', NEW.question_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate the trigger
DROP TRIGGER IF EXISTS check_question_exists_trigger ON user_progress;

CREATE TRIGGER check_question_exists_trigger
  BEFORE INSERT OR UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION check_question_exists();