'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import type { PriorityAlertData } from '@/types/customerSupport';

interface PriorityAlertsProps {
  alerts: PriorityAlertData[];
  onNavigateToCase?: (caseId: string) => void;
}

export function PriorityAlerts({ alerts, onNavigateToCase }: PriorityAlertsProps) {
  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
          Priority Alerts
        </h3>
        <button type="button" className="text-[11px] font-semibold text-slate-400 hover:text-primary-900 transition-colors">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {alerts.map((alert) => {
          const detailUrl = `/admin/customer-support/cases/${alert.caseId}`;
          let borderClass = 'border-l-red-500';
          let iconColor = 'text-red-500';
          
          if (alert.tone === 'warning') {
            borderClass = 'border-l-amber-500';
            iconColor = 'text-amber-500';
          }
          if (alert.tone === 'info') {
            borderClass = 'border-l-blue-500';
            iconColor = 'text-blue-500';
          }

          return (
            <div
              key={alert.id}
              className={`flex items-center justify-between py-2 border-l-2 pl-3 ${borderClass}`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[12px] font-bold text-ink mb-0.5">
                  <AlertCircle size={12} strokeWidth={3} className={iconColor} />
                  <span>{alert.alertTitle}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {alert.caseReference}
                </div>
              </div>

              <Link
                href={detailUrl}
                onClick={() => onNavigateToCase?.(alert.caseId)}
                className="text-[11px] font-bold text-ink hover:text-primary-900 transition-colors whitespace-nowrap"
              >
                {alert.actionLabel || 'Open Case'}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
