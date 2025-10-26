import React from 'react';
import { Crown, AlertCircle } from 'lucide-react';

interface SubscriptionStatusProps {
  planName?: string;
  isActive: boolean;
  className?: string;
}

export function SubscriptionStatus({ planName, isActive, className = '' }: SubscriptionStatusProps) {
  if (!isActive) {
    return (
      <div className={`flex items-center gap-2 text-amber-600 ${className}`}>
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Gratuit</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-indigo-600 ${className}`}>
      <Crown className="w-4 h-4" />
      <span className="text-sm font-medium">{planName || 'Premium'}</span>
    </div>
  );
}