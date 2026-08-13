import React from 'react';

interface IdentityTabsProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export function IdentityTabs({ activeTab, onChangeTab }: IdentityTabsProps) {
  const tabs = [
    { id: 'registry', label: 'User Registry' },
    { id: 'admins', label: 'Administrators' },
    { id: 'privileged', label: 'Privileged Users' },
    { id: 'invitations', label: 'Invitations' },
    { id: 'memberships', label: 'Memberships' },
    { id: 'auth', label: 'Authentication' },
    { id: 'mfa_sso', label: 'MFA & SSO' },
    { id: 'temp_access', label: 'Temporary Access' },
    { id: 'locked_suspended', label: 'Locked & Suspended' },
    { id: 'dormant', label: 'Dormant Accounts' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'exceptions', label: 'Exceptions' },
    { id: 'activity', label: 'Activity' },
    { id: 'audit_history', label: 'Audit History' }
  ];

  return (
    <div className="border-b border-gray-200 mb-4 overflow-x-auto scrollbar-none">
      <div className="flex space-x-6 min-w-max pb-0.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`py-2 text-[11px] font-bold border-b-2 transition-colors duration-200 outline-none ${
                isActive
                  ? 'border-[#741d35] text-[#741d35]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
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
