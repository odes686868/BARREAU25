/*
  # Fix examen1_12 schema

  1. Changes
    - Convert incorrect_answers column from jsonb to text array in examen1_12 table
    - This ensures consistency with other exam tables
  
  2. Notes
    - Temporarily create a new column, copy data, then swap
*/

-- Add a temporary text array column
ALTER TABLE examen1_12 ADD COLUMN incorrect_answers_temp text[];

-- Copy and convert data from jsonb to text array
UPDATE examen1_12 
SET incorrect_answers_temp = CASE 
  WHEN incorrect_answers IS NULL THEN '{}'::text[]
  WHEN jsonb_typeof(incorrect_answers) = 'array' THEN 
    (SELECT array_agg(value::text) 
     FROM jsonb_array_elements_text(incorrect_answers) AS value)
  ELSE '{}'::text[]
END;

-- Drop the old column
ALTER TABLE examen1_12 DROP COLUMN incorrect_answers;

-- Rename the temp column
ALTER TABLE examen1_12 RENAME COLUMN incorrect_answers_temp TO incorrect_answers;

-- Set default value to match other tables
ALTER TABLE examen1_12 ALTER COLUMN incorrect_answers SET DEFAULT '{}'::text[];
