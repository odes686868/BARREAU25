/*
  # Add RLS policies for examen1_12

  1. Security
    - Add SELECT policy for authenticated users on examen1_12 table
    - Allows authenticated users to read questions from this category
*/

-- Add policy to allow authenticated users to select from examen1_12
CREATE POLICY "Authenticated users can view examen1_12 questions"
  ON examen1_12
  FOR SELECT
  TO authenticated
  USING (true);
