'use client';

import React, { useState } from 'react';

const TABS = [
  'Executive Overview',
  'Revenue',
  'Payments',
  'Refunds',
  'Receivables',
  'Payables',
  'Commissions',
  'Settlements',
  'Payouts',
  'Invoices',
  'Reconciliation',
  'Exceptions',
  'Approvals',
  'Tax',
  'Audit History',
];

interface Props {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function FinanceSectionTabs({ activeTab: externalActive, onTabChange }: Props) {
  const [internalActive, setInternalActive] = useState('Executive Overview');
  const activeTab = externalActive || internalActive;

  const handleSelect = (tab: string) => {
    setInternalActive(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="border-b border-gray-200 bg-white rounded-t-lg px-2 shadow-sm overflow-x-auto scrollbar-none">
      <nav className="flex items-center gap-1 min-w-max" aria-label="Finance Navigation Tabs">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleSelect(tab)}
              className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-[#8f002b] text-[#8f002b] font-bold bg-rose-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
