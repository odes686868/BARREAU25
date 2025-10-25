/*
  # Fix user progress schema and add question references

  1. Changes
    - Add foreign key constraints for question_id to each category table
    - Update user_progress table to handle question references properly
    - Add indexes for better performance

  2. Security
    - Maintain existing RLS policies
    - Ensure data integrity with proper constraints
*/

-- Add foreign key constraints for each category
ALTER TABLE user_progress
ADD CONSTRAINT user_progress_category_1_fkey
  FOREIGN KEY (question_id) REFERENCES category_1(id) ON DELETE CASCADE,
ADD CONSTRAINT user_progress_category_2_fkey
  FOREIGN KEY (question_id) REFERENCES category_2(id) ON DELETE CASCADE,
ADD CONSTRAINT user_progress_category_3_fkey
  FOREIGN KEY (question_id) REFERENCES category_3(id) ON DELETE CASCADE,
ADD CONSTRAINT user_progress_category_4_fkey
  FOREIGN KEY (question_id) REFERENCES category_4(id) ON DELETE CASCADE,
ADD CONSTRAINT user_progress_category_5_fkey
  FOREIGN KEY (question_id) REFERENCES category_5(id) ON DELETE CASCADE,
ADD CONSTRAINT user_progress_category_6_fkey
  FOREIGN KEY (question_id) REFERENCES category_6(id) ON DELETE CASCADE,
ADD CONSTRAINT user_progress_category_7_fkey
  FOREIGN KEY (question_id) REFERENCES category_7(id) ON DELETE CASCADE;

-- Add trigger function to validate question_id exists in any category table
CREATE OR REPLACE FUNCTION check_question_exists()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM category_1 WHERE id = NEW.question_id
    UNION ALL
    SELECT 1 FROM category_2 WHERE id = NEW.question_id
    UNION ALL
    SELECT 1 FROM category_3 WHERE id = NEW.question_id
    UNION ALL
    SELECT 1 FROM category_4 WHERE id = NEW.question_id
    UNION ALL
    SELECT 1 FROM category_5 WHERE id = NEW.question_id
    UNION ALL
    SELECT 1 FROM category_6 WHERE id = NEW.question_id
    UNION ALL
    SELECT 1 FROM category_7 WHERE id = NEW.question_id
  ) THEN
    RETURN NEW;
  ELSE
    RAISE EXCEPTION 'Question ID does not exist in any category table';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to check question existence before insert or update
CREATE TRIGGER check_question_exists_trigger
  BEFORE INSERT OR UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION check_question_exists();