/*
  # Remove Duplicate Permissive Policies

  Removes duplicate SELECT policies on category and exam tables.
  Keeps only the French-named authenticated policies and removes 
  the redundant "Allow anonymous read access" policies.

  Affected tables:
  - category_1 through category_7
  - examen1_1 through examen1_12
*/

-- Remove duplicate policies on category tables
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.category_1;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.category_2;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.category_3;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.category_4;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.category_5;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.category_6;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.category_7;

-- Remove duplicate policies on examen tables
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_1;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_2;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_3;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_4;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_5;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_6;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_7;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_8;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_9;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_10;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.examen1_11;

-- examen1_12 has different policy name
DROP POLICY IF EXISTS "Authenticated users can view examen1_12 questions" ON public.examen1_12;
