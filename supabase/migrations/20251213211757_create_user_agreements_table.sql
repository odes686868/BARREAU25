/*
  # Create user agreements table

  1. New Tables
    - `user_agreements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `disclaimer_accepted` (boolean)
      - `accepted_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `user_agreements` table
    - Add policies for authenticated users to read and insert their own agreements
*/

CREATE TABLE IF NOT EXISTS user_agreements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  disclaimer_accepted boolean DEFAULT false NOT NULL,
  accepted_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE user_agreements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own agreement"
  ON user_agreements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own agreement"
  ON user_agreements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agreement"
  ON user_agreements
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);