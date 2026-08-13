import React from 'react';

interface AdministrationTabsProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export function AdministrationTabs({ activeTab, onChangeTab }: AdministrationTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Administration Overview' },
    { id: 'identity', label: 'Identity' },
    { id: 'roles', label: 'Roles & Permissions' },
    { id: 'organization', label: 'Organization' },
    { id: 'configuration', label: 'Configuration' },
    { id: 'localization', label: 'Localization' },
    { id: 'communications', label: 'Communications' },
    { id: 'security', label: 'Security' },
    { id: 'workflows', label: 'Workflows' },
    { id: 'governance', label: 'Data Governance' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'exceptions', label: 'Exceptions' }
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
