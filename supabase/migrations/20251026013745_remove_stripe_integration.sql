/*
  # Remove Stripe Integration

  1. Cleanup Actions
    - Drop views: stripe_user_subscriptions, stripe_user_orders
    - Drop tables: stripe_orders, stripe_subscriptions, stripe_customers
    - Drop enum types: stripe_order_status, stripe_subscription_status
  
  2. Notes
    - This migration safely removes all Stripe-related database objects
    - Uses IF EXISTS to prevent errors if objects don't exist
*/

-- Drop views
DROP VIEW IF EXISTS stripe_user_orders;
DROP VIEW IF EXISTS stripe_user_subscriptions;

-- Drop tables
DROP TABLE IF EXISTS stripe_orders;
DROP TABLE IF EXISTS stripe_subscriptions;
DROP TABLE IF EXISTS stripe_customers;

-- Drop enum types
DROP TYPE IF EXISTS stripe_order_status;
DROP TYPE IF EXISTS stripe_subscription_status;
