'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOptionalFinanceCommandCenter } from '@/contexts/FinanceCommandCenterContext';

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
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function FinanceSectionTabs({ tabs = TABS, activeTab: externalActive, onTabChange }: Props) {
  const router=useRouter();
  const finance=useOptionalFinanceCommandCenter();
  const [internalActive, setInternalActive] = useState(tabs[0] || 'Executive Overview');
  const activeTab = externalActive || internalActive;

  const handleSelect = (tab: string) => {
    setInternalActive(tab);
    if (onTabChange) onTabChange(tab);
    const routes:Record<string,string>={Revenue:'/admin/finance/revenue-receivables',Payments:'/admin/finance/payments',Refunds:'/admin/finance/refunds-compensation',Receivables:'/admin/finance/revenue-receivables',Payables:'/admin/finance/supplier-payables',Commissions:'/admin/finance/commissions-fees',Settlements:'/admin/finance/settlements-payouts',Payouts:'/admin/finance/settlements-payouts',Invoices:'/admin/finance/invoices-notes',Reconciliation:'/admin/finance/reconciliation-controls',Tax:'/admin/finance/tax-currency-configuration','Audit History':'/admin/finance/reports-import-export-audit'};
    if(routes[tab])router.push(routes[tab]);
  };

  return (
    <div className="border-b border-gray-200 bg-white rounded-t-lg px-2 shadow-sm overflow-x-auto scrollbar-none">
      <nav className="flex items-center gap-1 min-w-max" aria-label="Finance Navigation Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          const unavailable = Boolean(finance && ((tab === 'Exceptions' && !finance.dashboard?.capabilities.financeExceptions) || (tab === 'Approvals' && !finance.dashboard?.permissions.canMutate)));
          return (
            <button
              key={tab}
              onClick={() => handleSelect(tab)}
              disabled={unavailable}
              title={unavailable ? `${tab} workflow is not configured in the finance domain` : undefined}
              className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-[#8f002b] text-[#8f002b] font-bold bg-rose-50/50'
                  : unavailable ? 'border-transparent text-gray-300 cursor-not-allowed' : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
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
