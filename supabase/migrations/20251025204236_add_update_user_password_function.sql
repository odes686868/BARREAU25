/*
  # Add function to update user password

  1. New Functions
    - `update_user_password_by_id` - Securely updates user password in auth.users
  
  2. Security
    - Function uses SECURITY DEFINER to access auth.users
    - Updates encrypted password
    - Used for password reset flow
*/

-- Function to update user password
CREATE OR REPLACE FUNCTION update_user_password_by_id(
  user_id uuid,
  new_password text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE auth.users
  SET 
    encrypted_password = crypt(new_password, gen_salt('bf')),
    updated_at = now()
  WHERE id = user_id;
  
  RETURN FOUND;
END;
$$;
