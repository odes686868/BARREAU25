import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useSubscription } from '../../hooks/useSubscription';

interface PaywallRouteProps {
  children: React.ReactNode;
}

export function PaywallRoute({ children }: PaywallRouteProps) {
  const { user, loading: authLoading } = useAuthStore();
  const { subscription, loading: subLoading } = useSubscription();

  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow both free and premium users to access
  return <>{children}</>;
}
