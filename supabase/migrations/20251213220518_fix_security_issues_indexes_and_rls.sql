/*
  # Security Fixes - Indexes and RLS Performance

  1. Add Missing Indexes
    - Add index on password_reset_codes.user_id for foreign key
    - Add index on quiz_attempts.user_id for foreign key

  2. Fix RLS Policies Performance
    - Replace auth.uid() with (select auth.uid()) for better query planning

  3. Remove Duplicate Policies
    - Remove redundant policies on quiz_results, user_progress

  4. Add Primary Key to category_2
    - Add id column as primary key if missing

  5. Add Policies to password_reset_tokens
    - Table has RLS enabled but no policies
*/

-- 1. Add missing indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_password_reset_codes_user_id ON public.password_reset_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON public.quiz_attempts(user_id);

-- 2. Fix category_2 primary key (if needed)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'category_2' 
    AND constraint_type = 'PRIMARY KEY'
    AND table_schema = 'public'
  ) THEN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'category_2' 
      AND column_name = 'id'
      AND table_schema = 'public'
    ) THEN
      ALTER TABLE public.category_2 ADD PRIMARY KEY (id);
    END IF;
  END IF;
END $$;

-- 3. Fix RLS policies on quiz_results
DROP POLICY IF EXISTS "Users can view own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Users can insert own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Users can delete own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Utilisateurs peuvent lire leurs propres résultats" ON public.quiz_results;
DROP POLICY IF EXISTS "Utilisateurs peuvent insérer leurs propres résultats" ON public.quiz_results;
DROP POLICY IF EXISTS "Utilisateurs peuvent modifier leurs propres résultats" ON public.quiz_results;

CREATE POLICY "Users can view own quiz results"
  ON public.quiz_results FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own quiz results"
  ON public.quiz_results FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own quiz results"
  ON public.quiz_results FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- 4. Fix RLS policies on user_progress
DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can delete own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Utilisateurs peuvent lire leur propre progression" ON public.user_progress;
DROP POLICY IF EXISTS "Utilisateurs peuvent insérer leur propre progression" ON public.user_progress;
DROP POLICY IF EXISTS "Utilisateurs peuvent modifier leur propre progression" ON public.user_progress;
DROP POLICY IF EXISTS "Utilisateurs peuvent supprimer leur propre progression" ON public.user_progress;

CREATE POLICY "Users can view own progress"
  ON public.user_progress FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own progress"
  ON public.user_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own progress"
  ON public.user_progress FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- 5. Fix RLS policies on user_tiers
DROP POLICY IF EXISTS "Users can view their own tier" ON public.user_tiers;
DROP POLICY IF EXISTS "Users can update their own tier" ON public.user_tiers;

CREATE POLICY "Users can view their own tier"
  ON public.user_tiers FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own tier"
  ON public.user_tiers FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- 6. Fix RLS policies on quiz_attempts
DROP POLICY IF EXISTS "Users can view their own quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Users can insert their own quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Users can update their own quiz attempts" ON public.quiz_attempts;

CREATE POLICY "Users can view their own quiz attempts"
  ON public.quiz_attempts FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert their own quiz attempts"
  ON public.quiz_attempts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own quiz attempts"
  ON public.quiz_attempts FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- 7. Fix RLS policies on stripe_customers
DROP POLICY IF EXISTS "Users can view their own customer data" ON public.stripe_customers;

CREATE POLICY "Users can view their own customer data"
  ON public.stripe_customers FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- 8. Fix RLS policies on stripe_subscriptions (uses customer_id, needs join)
DROP POLICY IF EXISTS "Users can view their own subscription data" ON public.stripe_subscriptions;

CREATE POLICY "Users can view their own subscription data"
  ON public.stripe_subscriptions FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id FROM public.stripe_customers 
      WHERE user_id = (select auth.uid())
    )
  );

-- 9. Fix RLS policies on stripe_orders (uses customer_id, needs join)
DROP POLICY IF EXISTS "Users can view their own order data" ON public.stripe_orders;

CREATE POLICY "Users can view their own order data"
  ON public.stripe_orders FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id FROM public.stripe_customers 
      WHERE user_id = (select auth.uid())
    )
  );

-- 10. Fix RLS policies on password_reset_codes
DROP POLICY IF EXISTS "Users can read own reset codes" ON public.password_reset_codes;

CREATE POLICY "Users can read own reset codes"
  ON public.password_reset_codes FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- 11. Fix RLS policies on user_agreements
DROP POLICY IF EXISTS "Users can read own agreement" ON public.user_agreements;
DROP POLICY IF EXISTS "Users can insert own agreement" ON public.user_agreements;
DROP POLICY IF EXISTS "Users can update own agreement" ON public.user_agreements;

CREATE POLICY "Users can read own agreement"
  ON public.user_agreements FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own agreement"
  ON public.user_agreements FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own agreement"
  ON public.user_agreements FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- 12. Add policies to password_reset_tokens (has RLS but no policies)
DROP POLICY IF EXISTS "Service role can manage reset tokens" ON public.password_reset_tokens;
DROP POLICY IF EXISTS "Users can view own reset tokens" ON public.password_reset_tokens;

CREATE POLICY "Service role can manage reset tokens"
  ON public.password_reset_tokens FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own reset tokens"
  ON public.password_reset_tokens FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));
