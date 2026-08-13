'use client';

import React from 'react';

interface PolicyGovernanceTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function PolicyGovernanceTabs({ activeTab, onTabChange }: PolicyGovernanceTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Governance Overview' },
    { id: 'sla-policies', label: 'SLA Policies' },
    { id: 'routing-rules', label: 'Routing Rules' },
    { id: 'escalation-rules', label: 'Escalation Rules' },
    { id: 'queue-policies', label: 'Queue Policies' },
    { id: 'service-policies', label: 'Service Policies' },
    { id: 'policy-exceptions', label: 'Policy Exceptions' },
    { id: 'versions', label: 'Versions' },
    { id: 'audit', label: 'Audit' },
  ];

  return (
    <div className="border-b border-slate-200 bg-white px-2 pt-1">
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-none text-xs">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`pb-2.5 pt-1 px-1 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-[#881337] text-[#881337]'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
