'use client';

import React from 'react';

interface QuickFilterChip {
  id: string;
  label: string;
  count: number;
  isSpecial?: boolean;
  specialTone?: 'danger' | 'warning';
}

const CHIPS: QuickFilterChip[] = [
  { id: 'unassigned', label: 'Unassigned', count: 46 },
  { id: 'new-today', label: 'New Today', count: 84 },
  { id: 'urgent', label: 'Urgent', count: 31 },
  { id: 'critical', label: 'Critical', count: 12, isSpecial: true, specialTone: 'danger' },
  { id: 'sla-at-risk', label: 'SLA At Risk', count: 29, isSpecial: true, specialTone: 'warning' },
  { id: 'sla-breach', label: 'SLA Breach', count: 12, isSpecial: true, specialTone: 'danger' },
  { id: 'waiting-customer', label: 'Waiting Customer', count: 128 },
  { id: 'waiting-supplier', label: 'Waiting Supplier', count: 74 },
  { id: 'waiting-logistics', label: 'Waiting Logistics', count: 38 },
  { id: 'waiting-finance', label: 'Waiting Finance', count: 21 },
  { id: 'payment-issue', label: 'Payment Issue', count: 217 },
  { id: 'delivery-issue', label: 'Delivery Issue', count: 346 },
  { id: 'return-issue', label: 'Return Issue', count: 264 },
  { id: 'safety-complaint', label: 'Safety Complaint', count: 4, isSpecial: true, specialTone: 'danger' },
  { id: 'authenticity-complaint', label: 'Authenticity Complaint', count: 9 },
  { id: 'refund-request', label: 'Refund Request', count: 156 },
  { id: 'repeat-contact', label: 'Repeat Contact', count: 68 },
  { id: 'negative-sentiment', label: 'Negative Sentiment', count: 121 },
  { id: 'escalated', label: 'Escalated', count: 17 },
  { id: 'reopened', label: 'Reopened', count: 23 },
];

interface SupportQuickFiltersProps {
  activeQuickFilter?: string;
  onSelectQuickFilter: (filterId: string) => void;
}

export function SupportQuickFilters({
  activeQuickFilter,
  onSelectQuickFilter,
}: SupportQuickFiltersProps) {
  return (
    <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-line">
      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
        QUICK FILTERS:
      </div>
      <div className="flex flex-wrap gap-2.5">
        {CHIPS.map((chip) => {
          const isActive = activeQuickFilter === chip.id;
          
          let baseClass = "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors border cursor-pointer select-none ";
          
          if (isActive) {
            if (chip.specialTone === 'danger') {
              baseClass += "bg-red-50 border-red-300 text-red-800 shadow-sm";
            } else if (chip.specialTone === 'warning') {
              baseClass += "bg-amber-50 border-amber-300 text-amber-800 shadow-sm";
            } else {
              baseClass += "bg-primary-900 border-primary-900 text-white shadow-sm";
            }
          } else {
            if (chip.specialTone === 'danger') {
              baseClass += "bg-white border-red-200 text-red-600 hover:bg-red-50";
            } else if (chip.specialTone === 'warning') {
              baseClass += "bg-white border-amber-200 text-amber-600 hover:bg-amber-50";
            } else {
              baseClass += "bg-white border-line text-slate-600 hover:bg-slate-50";
            }
          }

          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => onSelectQuickFilter(isActive ? 'all' : chip.id)}
              className={baseClass}
            >
              <span>{chip.label}</span>
              <span className={`font-bold ${isActive && !chip.specialTone ? 'text-white' : (chip.specialTone === 'danger' ? 'text-red-700' : (chip.specialTone === 'warning' ? 'text-amber-700' : 'text-slate-800'))}`}>
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
