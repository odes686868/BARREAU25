/*
  # Fix User Tier Insert Policy

  1. Changes
    - Add INSERT policy for user_tiers table to allow authenticated users to create their own tier
    - This ensures the trigger can properly insert data when new users sign up

  2. Security
    - Users can only insert their own tier data (user_id = auth.uid())
*/

-- Add INSERT policy for user_tiers
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_tiers' 
    AND policyname = 'Users can insert their own tier'
  ) THEN
    CREATE POLICY "Users can insert their own tier"
      ON user_tiers
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;
