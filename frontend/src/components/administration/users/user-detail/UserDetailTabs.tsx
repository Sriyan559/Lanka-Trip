'use client';

import React from 'react';
import { USER_DETAIL_TABS } from '@/lib/administration/users/user-detail.constants';

interface UserDetailTabsProps {
  activeTab: string;
  onChangeTab: (tabId: string) => void;
}

export function UserDetailTabs({ activeTab, onChangeTab }: UserDetailTabsProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded p-1 mb-3 shadow-2xs overflow-x-auto">
      <div className="flex items-center gap-1 min-w-max">
        {USER_DETAIL_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#741d35] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
