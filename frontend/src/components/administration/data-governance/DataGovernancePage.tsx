'use client';

import React, { useState, useEffect } from 'react';
import { fetchDataGovernanceData, registerDataAsset, createRetentionPolicy, reviewRetentionBreaches } from '@/lib/administration/data-governance/data-governance.api';
import { DataGovernanceFullData, DataAssetRecord } from '@/lib/administration/data-governance/data-governance.types';
import { DATA_GOVERNANCE_TABS } from '@/lib/administration/data-governance/data-governance.constants';

import { DataGovernanceHeader } from './DataGovernanceHeader';
import { GovernanceRegistryStatus } from './GovernanceRegistryStatus';
import { GovernanceKpiGrid } from './GovernanceKpiGrid';
import { GovernanceFilterBar } from './GovernanceFilterBar';
import { GovernanceRightRail } from './GovernanceRightRail';
import { DataGovernanceTabContent } from './tabs/DataGovernanceTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';

export function DataGovernancePage() {
  const [data, setData] = useState<DataGovernanceFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  const [selectedAssetItem, setSelectedAssetItem] = useState<DataAssetRecord | null>(null);

  // Dialog States
  const [isRegisterAssetOpen, setIsRegisterAssetOpen] = useState(false);
  const [isCreatePolicyOpen, setIsCreatePolicyOpen] = useState(false);
  const [isReviewBreachesOpen, setIsReviewBreachesOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await fetchDataGovernanceData();
      setData(result);
      if (result.dataAssets && result.dataAssets.length > 0) {
        setSelectedAssetItem(result.dataAssets[0]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleRegisterAsset = async () => {
    await registerDataAsset('New Data Asset', 'Customer Orders');
    setIsRegisterAssetOpen(false);
    alert('Data asset registered.');
  };

  const handleCreatePolicy = async () => {
    await createRetentionPolicy('New Retention Policy', '7 Years');
    setIsCreatePolicyOpen(false);
    alert('Retention policy created.');
  };

  const handleReviewBreaches = async () => {
    await reviewRetentionBreaches();
    setIsReviewBreachesOpen(false);
    alert('Retention breaches audit initiated.');
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
        <DataGovernanceHeader
          onRegisterAsset={() => setIsRegisterAssetOpen(true)}
          onCreateRetentionPolicy={() => setIsCreatePolicyOpen(true)}
          onReviewHighRiskData={() => setActiveTab('data-assets')}
          onReviewRetentionActions={() => setActiveTab('retention-schedule')}
          onExportRegistry={() => alert('Exporting data governance registry...')}
        />

        <GovernanceRegistryStatus context={data.context} />

        <GovernanceKpiGrid kpis={data.kpis} />

        <div className="flex flex-col lg:flex-row gap-3">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <GovernanceFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeQuickFilter={activeQuickFilter}
              onToggleQuickFilter={(id) => setActiveQuickFilter(prev => prev === id ? null : id)}
              onApplyFilters={() => alert('Filters applied')}
              onClearFilters={() => { setSearchQuery(''); setActiveQuickFilter(null); }}
            />

            {/* Tabs Header */}
            <div className="bg-white border-b border-x border-gray-200 rounded-t pt-1 px-2 flex gap-4 overflow-x-auto min-w-0">
              {DATA_GOVERNANCE_TABS.map((tab) => (
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
              <DataGovernanceTabContent
                activeTab={activeTab}
                data={data}
                selectedAssetItem={selectedAssetItem!}
                onSelectAssetItem={setSelectedAssetItem}
                onNavigateTab={setActiveTab}
              />
            </div>
          </div>

          {/* Right Rail Panel */}
          <div className="w-full lg:w-72 shrink-0">
            <GovernanceRightRail
              onNavigateTab={setActiveTab}
              onActionClick={(action) => {
                if (action === 'register_asset') setIsRegisterAssetOpen(true);
                else if (action === 'create_retention_policy') setIsCreatePolicyOpen(true);
                else if (action === 'review_retention_breaches') setIsReviewBreachesOpen(true);
                else alert(`Action triggered: ${action}`);
              }}
            />
          </div>
        </div>
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={isRegisterAssetOpen}
        title="Register Data Asset"
        description="Register a new enterprise data asset and assign default ownership, sensitivity classification, and retention policy."
        confirmLabel="Register Asset"
        cancelLabel="Cancel"
        onConfirm={handleRegisterAsset}
        onCancel={() => setIsRegisterAssetOpen(false)}
      />

      <ConfirmDialog
        isOpen={isCreatePolicyOpen}
        title="Create Retention Policy"
        description="Define a lifecycle data retention rule with automated archival, legal hold checks, and disposal workflows."
        confirmLabel="Create Policy"
        cancelLabel="Cancel"
        onConfirm={handleCreatePolicy}
        onCancel={() => setIsCreatePolicyOpen(false)}
      />

      <ConfirmDialog
        isOpen={isReviewBreachesOpen}
        title="Review Retention Breaches"
        description="Initiate compliance audit and flag overdue data assets across all operational domains."
        confirmLabel="Initiate Review"
        cancelLabel="Cancel"
        onConfirm={handleReviewBreaches}
        onCancel={() => setIsReviewBreachesOpen(false)}
      />
    </div>
  );
}
export default DataGovernancePage;
