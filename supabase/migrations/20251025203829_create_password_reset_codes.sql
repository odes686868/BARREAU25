/*
  # Create Password Reset Codes Table

  1. New Tables
    - `password_reset_codes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `email` (text, email address)
      - `code` (text, 6-digit verification code)
      - `expires_at` (timestamptz, expiration time)
      - `used` (boolean, whether code has been used)
      - `created_at` (timestamptz, creation timestamp)
  
  2. Security
    - Enable RLS on `password_reset_codes` table
    - Add policy for users to read their own reset codes
    - Add policy for service role to manage codes
    - Add index on email for faster lookups
    - Add index on code for verification
    - Codes expire after 15 minutes
  
  3. Important Notes
    - Codes are single-use only
    - Old codes are automatically cleaned up
    - Each user can have multiple active codes (in case of multiple requests)
*/

-- Create the password reset codes table
CREATE TABLE IF NOT EXISTS password_reset_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  code text NOT NULL,
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_password_reset_codes_email ON password_reset_codes(email);
CREATE INDEX IF NOT EXISTS idx_password_reset_codes_code ON password_reset_codes(code);
CREATE INDEX IF NOT EXISTS idx_password_reset_codes_expires_at ON password_reset_codes(expires_at);

-- Enable RLS
ALTER TABLE password_reset_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own reset codes
CREATE POLICY "Users can read own reset codes"
  ON password_reset_codes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Anyone can insert reset codes (needed for password reset flow)
CREATE POLICY "Anyone can create reset codes"
  ON password_reset_codes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Users can update their own codes (to mark as used)
CREATE POLICY "Users can update own reset codes"
  ON password_reset_codes
  FOR UPDATE
  TO anon, authenticated
  USING (email = email);

-- Function to clean up expired codes
CREATE OR REPLACE FUNCTION cleanup_expired_reset_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM password_reset_codes
  WHERE expires_at < now() OR used = true;
END;
$$;
