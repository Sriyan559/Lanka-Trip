'use client';

import React from 'react';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const FN02_TABS = [
  { id: 'Revenue Overview', label: 'Revenue Overview' },
  { id: 'Receivables & Ageing', label: 'Receivables & Ageing' },
  { id: 'Collections & Disputes', label: 'Collections & Disputes' },
  { id: 'Adjustments & Deferred', label: 'Adjustments & Deferred' },
];

export function RevenueReceivablesTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm text-xs font-semibold w-fit">
      {FN02_TABS.map((tab, i) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 transition-colors whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-[#8f002b] text-white'
              : 'text-gray-600 hover:bg-gray-50'
          } ${i < FN02_TABS.length - 1 ? 'border-r border-gray-200' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
