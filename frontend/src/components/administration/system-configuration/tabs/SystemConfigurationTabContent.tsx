'use client';

import React from 'react';
import { SystemConfigurationOverviewTab } from '../SystemConfigurationOverviewTab';
import { SysConfigFullData, ConfigurationRegistryItem } from '@/lib/administration/system-configuration/sys-config.types';

interface SystemConfigurationTabContentProps {
  activeTab: string;
  data: SysConfigFullData;
  selectedConfigItem: ConfigurationRegistryItem;
  onSelectRegistryItem: (item: ConfigurationRegistryItem) => void;
  onNavigateTab: (tabId: string) => void;
}

export function SystemConfigurationTabContent({
  activeTab,
  data,
  selectedConfigItem,
  onSelectRegistryItem,
  onNavigateTab,
}: SystemConfigurationTabContentProps) {
  switch (activeTab) {
    case 'overview':
      return (
        <SystemConfigurationOverviewTab
          data={data}
          selectedConfigItem={selectedConfigItem}
          onSelectRegistryItem={onSelectRegistryItem}
          onNavigateTab={onNavigateTab}
        />
      );
    default:
      return (
        <div className="bg-white border border-gray-200 rounded p-8 text-center text-gray-500 text-sm shadow-2xs">
          The <span className="font-bold text-gray-700">{activeTab}</span> tab is under construction.
        </div>
      );
  }
}
export default SystemConfigurationTabContent;
