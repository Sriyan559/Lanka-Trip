'use client';

import React from 'react';
import type { CaseTabType } from '@/types/customerSupportDetail';

interface CaseTabsBarProps {
  activeTab: CaseTabType;
  onSelectTab: (tab: CaseTabType) => void;
  counts?: {
    messages?: number;
    internalNotes?: number;
    attachments?: number;
    blockingIssues?: number;
    auditEvents?: number;
  };
}

export function CaseTabsBar({ activeTab, onSelectTab, counts }: CaseTabsBarProps) {
  const tabs: { id: CaseTabType; label: string; count?: number }[] = [
    { id: 'overview', label: 'Case Overview' },
    { id: 'conversation', label: 'Conversation', count: counts?.messages },
    { id: 'customer-context', label: 'Customer Context' },
    { id: 'related-records', label: 'Related Records' },
    { id: 'evidence', label: 'Evidence & Attachments', count: counts?.attachments },
    { id: 'investigation', label: 'Investigation' },
    { id: 'sla-escalation', label: 'SLA & Escalation' },
    { id: 'resolution', label: 'Resolution Workspace' },
    { id: 'internal-notes', label: 'Internal Notes', count: counts?.internalNotes },
    { id: 'communications', label: 'Communications' },
    { id: 'operational-issues', label: 'Operational Issues', count: counts?.blockingIssues },
    { id: 'audit-history', label: 'Audit History', count: counts?.auditEvents },
  ];

  return (
    <div className="w-full overflow-x-auto bg-white border-t border-line custom-scrollbar" role="tablist" aria-label="Support Case Workspace Tabs">
      <div className="flex w-max min-w-full px-2 pt-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              className={`flex items-center justify-center px-4 py-2.5 text-[12px] font-bold border-b-2 transition-colors whitespace-nowrap outline-none ${
                isActive
                  ? 'border-primary-900 text-primary-900 bg-slate-50 rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-ink hover:bg-slate-50 rounded-t-lg'
              }`}
              onClick={() => onSelectTab(tab.id)}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && tab.count > 0 && (
                <span className={`ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                  isActive ? 'bg-primary-100 text-primary-900' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
