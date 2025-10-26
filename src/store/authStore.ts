import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';

interface AuthState {
  user: User | null;
  loading: boolean;
  subscription: any | null;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
  fetchSubscription: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  subscription: null,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ user: session?.user ?? null, loading: false });

      if (session?.user) {
        get().fetchSubscription();
      }

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null });
        if (session?.user) {
          get().fetchSubscription();
        } else {
          set({ subscription: null });
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ loading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, subscription: null });
  },

  fetchSubscription: async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error fetching subscription:', error);
        return;
      }

      set({ subscription: data });
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  },
}));
