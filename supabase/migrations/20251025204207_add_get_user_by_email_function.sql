/*
  # Add function to get user ID by email

  1. New Functions
    - `get_user_id_by_email` - Securely retrieves user ID from auth.users by email
  
  2. Security
    - Function uses SECURITY DEFINER to access auth.users
    - Only returns user ID, no sensitive data
    - Used for password reset flow
*/

-- Function to get user ID by email from auth.users
CREATE OR REPLACE FUNCTION get_user_id_by_email(user_email text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id uuid;
BEGIN
  SELECT id INTO user_id
  FROM auth.users
  WHERE email = user_email
  LIMIT 1;
  
  RETURN user_id;
END;
$$;
