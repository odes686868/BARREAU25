/*
  # Fix create_user_tier function search_path

  1. Changes
    - Recreate the create_user_tier function with explicit search_path
    - This ensures the function can find the user_tiers table in the public schema

  2. Problem
    - The function was missing search_path, causing table lookup issues
*/

CREATE OR REPLACE FUNCTION public.create_user_tier()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_tiers (user_id, tier, free_tests_remaining)
  VALUES (NEW.id, 'free', 3);
  RETURN NEW;
END;
$$;