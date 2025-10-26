/*
  # Add User Tier System

  1. New Tables
    - `user_tiers`: Tracks user subscription tier (free or premium)
      - `user_id` (uuid, references auth.users)
      - `tier` (enum: 'free' or 'premium')
      - `free_tests_remaining` (integer, default 3)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_tiers` table
    - Add policies for users to read and update their own tier data

  3. Functions
    - Trigger to create free tier on user signup
*/

-- Create tier enum
CREATE TYPE user_tier_type AS ENUM ('free', 'premium');

-- Create user_tiers table
CREATE TABLE IF NOT EXISTS user_tiers (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) NOT NULL UNIQUE,
  tier user_tier_type NOT NULL DEFAULT 'free',
  free_tests_remaining integer NOT NULL DEFAULT 3,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_tiers ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own tier"
  ON user_tiers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own tier"
  ON user_tiers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to create free tier on signup
CREATE OR REPLACE FUNCTION create_user_tier()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_tiers (user_id, tier, free_tests_remaining)
  VALUES (NEW.id, 'free', 3);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_tier();

-- Create tiers for existing users
INSERT INTO user_tiers (user_id, tier, free_tests_remaining)
SELECT id, 'free', 3
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM user_tiers)
ON CONFLICT (user_id) DO NOTHING;
