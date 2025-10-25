/*
  # Password Reset Tokens Table

  1. New Tables
    - `password_reset_tokens`
      - `id` (uuid, primary key) - Unique identifier for the token
      - `user_id` (uuid, foreign key) - References auth.users
      - `token_hash` (text) - Hashed token for security
      - `expires_at` (timestamptz) - Token expiration time
      - `used` (boolean) - Whether token has been used
      - `created_at` (timestamptz) - When token was created

  2. Security
    - Enable RLS on `password_reset_tokens` table
    - No public access to tokens (server-side only via service role)
    - Tokens are hashed before storage
    - Automatic cleanup of expired tokens

  3. Notes
    - Tokens expire after 15 minutes
    - Single-use tokens (marked as used after password reset)
    - Service role required to read/write tokens
*/

-- Create password_reset_tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- No policies - service role only access
-- This ensures tokens can only be managed by backend edge functions

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);

-- Function to clean up expired tokens (optional, can be called periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_reset_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM password_reset_tokens
  WHERE expires_at < now();
END;
$$;
