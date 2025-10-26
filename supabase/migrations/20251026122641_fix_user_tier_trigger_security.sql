/*
  # Fix User Tier Trigger Security

  1. Changes
    - Drop the INSERT policy that was conflicting with the trigger
    - Update the trigger function to properly bypass RLS using SECURITY DEFINER
    - Add proper error handling to the trigger function

  2. Security
    - The trigger runs with elevated privileges (SECURITY DEFINER)
    - Users can only read/update their own tier data via RLS policies
*/

-- Drop the INSERT policy (not needed because trigger uses SECURITY DEFINER)
DROP POLICY IF EXISTS "Users can insert their own tier" ON user_tiers;

-- Recreate the trigger function with better error handling
CREATE OR REPLACE FUNCTION create_user_tier()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_tiers (user_id, tier, free_tests_remaining)
  VALUES (NEW.id, 'free', 3)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Failed to create user tier for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ensure trigger is properly set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_tier();
