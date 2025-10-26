import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface SubscriptionData {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean | null;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

interface SubscriptionStore {
  subscription: SubscriptionData | null;
  loading: boolean;
  error: string | null;
  fetchSubscription: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  subscription: null,
  loading: false,
  error: null,

  fetchSubscription: async () => {
    set({ loading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      set({ subscription: data || null, loading: false });
    } catch (error) {
      console.error('Error fetching subscription:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch subscription',
        loading: false 
      });
    }
  }
}));