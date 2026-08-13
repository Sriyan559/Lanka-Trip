'use client';

import React from 'react';

interface ReportsAuditTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ReportsAuditTabs({ activeTab, onTabChange }: ReportsAuditTabsProps) {
  const tabs = [
    { id: 'reports', label: 'Reports' },
    { id: 'scheduled', label: 'Scheduled Reports' },
    { id: 'exports', label: 'Exports' },
    { id: 'imports', label: 'Imports' },
    { id: 'transfers', label: 'Transfers' },
    { id: 'data-mappings', label: 'Data Mappings' },
    { id: 'transfer-jobs', label: 'Transfer Jobs' },
    { id: 'exceptions', label: 'Exceptions' },
    { id: 'audit-trail', label: 'Audit Trail' },
    { id: 'access-evidence', label: 'Access & Evidence' },
    { id: 'retention', label: 'Retention' },
    { id: 'metrics', label: 'Metrics' },
  ];

  return (
    <div className="border-b border-slate-200 bg-white px-2 pt-1">
      <div className="flex items-center gap-5 overflow-x-auto scrollbar-none text-xs">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`pb-2 pt-0.5 px-1 font-semibold whitespace-nowrap border-b-2 transition-colors ${
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
