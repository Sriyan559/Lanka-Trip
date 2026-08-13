'use client';

import React from 'react';

interface KnowledgeGovernanceTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function KnowledgeGovernanceTabs({ activeTab, onTabChange }: KnowledgeGovernanceTabsProps) {
  const tabs = [
    { id: 'search', label: 'Knowledge Search' },
    { id: 'articles', label: 'Articles' },
    { id: 'playbooks', label: 'Playbooks' },
    { id: 'guided', label: 'Guided Resolution' },
    { id: 'decision-trees', label: 'Decision Trees' },
    { id: 'templates', label: 'Response Templates' },
    { id: 'agent-assistance', label: 'Agent Assistance' },
    { id: 'gaps', label: 'Knowledge Gaps' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'governance', label: 'Content Governance' },
    { id: 'versions', label: 'Versions' },
    { id: 'audit', label: 'Audit' },
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
