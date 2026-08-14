'use client';

import React, { useState, useEffect } from 'react';
import { fetchSystemConfigurationData, requestConfigurationChange, reviewConfigurationDrift } from '@/lib/administration/system-configuration/sys-config.api';
import { SysConfigFullData, ConfigurationRegistryItem } from '@/lib/administration/system-configuration/sys-config.types';
import { SYS_CONFIG_TABS } from '@/lib/administration/system-configuration/sys-config.constants';

import { SystemConfigurationHeader } from './SystemConfigurationHeader';
import { SystemConfigurationContextBar } from './SystemConfigurationContextBar';
import { SystemConfigurationKpiGrid } from './SystemConfigurationKpiGrid';
import { SystemConfigurationFilterBar } from './SystemConfigurationFilterBar';
import { SystemConfigurationRightRail } from './SystemConfigurationRightRail';
import { SystemConfigurationTabContent } from './tabs/SystemConfigurationTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';

export function SystemConfigurationPage() {
  const [data, setData] = useState<SysConfigFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  
  const [selectedConfigItem, setSelectedConfigItem] = useState<ConfigurationRegistryItem | null>(null);

  // Dialog State
  const [isChangeRequestOpen, setIsChangeRequestOpen] = useState(false);
  const [isDriftReviewOpen, setIsDriftReviewOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await fetchSystemConfigurationData();
      setData(result);
      if (result.registry && result.registry.length > 0) {
        // default select the first one related to order.processing.timeout
        const defaultItem = result.registry.find(r => r.configKey.includes('order')) || result.registry[0];
        setSelectedConfigItem(defaultItem);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleRequestChange = async () => {
    if (selectedConfigItem) {
      await requestConfigurationChange(selectedConfigItem.id, 'new_value');
    }
    setIsChangeRequestOpen(false);
    alert('Change request submitted for approval.');
  };

  const handleReviewDrift = async () => {
    await reviewConfigurationDrift();
    setIsDriftReviewOpen(false);
    alert('Configuration drift audit initiated.');
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50/50">
        <div className="w-8 h-8 border-4 border-[#741d35] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        <SystemConfigurationHeader
          onCreateConfiguration={() => alert('Navigate to create configuration')}
          onRequestChange={() => setIsChangeRequestOpen(true)}
          onReviewDrift={() => setIsDriftReviewOpen(true)}
          onCompareEnvironments={() => setActiveTab('environment-values')}
          onExportRegistry={() => alert('Exporting registry...')}
        />

        <SystemConfigurationContextBar context={data.context} />
        
        <SystemConfigurationKpiGrid kpis={data.kpis} />

        <div className="flex flex-col lg:flex-row gap-3">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <SystemConfigurationFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeQuickFilter={activeQuickFilter}
              onToggleQuickFilter={(id) => setActiveQuickFilter(prev => prev === id ? null : id)}
              onApplyFilters={() => alert('Filters applied')}
              onClearFilters={() => { setSearchQuery(''); setActiveQuickFilter(null); }}
            />

            {/* Tabs Header */}
            <div className="bg-white border-b border-x border-gray-200 rounded-t pt-1 px-2 flex gap-4 overflow-x-auto min-w-0">
              {SYS_CONFIG_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-1 text-[11px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#741d35] text-[#741d35]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white border-b border-x border-gray-200 rounded-b p-3 shadow-2xs min-w-0">
              <SystemConfigurationTabContent
                activeTab={activeTab}
                data={data}
                selectedConfigItem={selectedConfigItem!}
                onSelectRegistryItem={setSelectedConfigItem}
                onNavigateTab={setActiveTab}
              />
            </div>
          </div>

          {/* Right Rail Intelligence Area */}
          <div className="w-full lg:w-72 shrink-0">
            <SystemConfigurationRightRail
              onNavigateTab={setActiveTab}
              onActionClick={(action) => {
                if (action === 'request_change') setIsChangeRequestOpen(true);
                else if (action === 'review_drift') setIsDriftReviewOpen(true);
                else alert(`Action triggered: ${action}`);
              }}
            />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ConfirmDialog
        isOpen={isChangeRequestOpen}
        title="Request Configuration Change"
        description={`Are you sure you want to request a value change for ${selectedConfigItem?.configKey}? This will require owner approval and security review.`}
        confirmLabel="Submit Change Request"
        cancelLabel="Cancel"
        onConfirm={handleRequestChange}
        onCancel={() => setIsChangeRequestOpen(false)}
      />

      <ConfirmDialog
        isOpen={isDriftReviewOpen}
        title="Review Configuration Drift"
        description="Initiate an automated drift analysis across all environments to detect manual out-of-band changes."
        confirmLabel="Initiate Drift Audit"
        cancelLabel="Cancel"
        onConfirm={handleReviewDrift}
        onCancel={() => setIsDriftReviewOpen(false)}
      />
    </div>
  );
}
export default SystemConfigurationPage;
