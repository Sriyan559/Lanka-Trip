'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  message?: string;
}

export function FinanceAlertBanner({
  message = 'This record was updated by the payment gateway or another administrator. Refresh before retrying, capturing, voiding, reversing or releasing funds.',
}: Props) {
  return (
    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs font-medium text-amber-800 leading-relaxed">
      <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
