'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { BuChannelsFullData, BuChannelRegistryItem } from '@/lib/administration/business-units-channels/bu-channels.types';
import { fetchBuChannelsData } from '@/lib/administration/business-units-channels/bu-channels.api';
import { BU_CHANNELS_TABS } from '@/lib/administration/business-units-channels/bu-channels.constants';
import { BuChannelsHeader } from './BuChannelsHeader';
import { BuChannelsContextBar } from './BuChannelsContextBar';
import { BuChannelsKpiGrid } from './BuChannelsKpiGrid';
import { BuChannelsFilterBar } from './BuChannelsFilterBar';
import { BuChannelsOverviewTab } from './BuChannelsOverviewTab';
import { BuChannelsRightRail } from './BuChannelsRightRail';
import { BuChannelsTabContent } from './tabs/BuChannelsTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';
import toast from 'react-hot-toast';

export function BuChannelsPage() {
  const [data, setData] = useState<BuChannelsFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBu, setSelectedBu] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  // Selected registry item for detail panel
  const [selectedItem, setSelectedItem] = useState<BuChannelRegistryItem | null>(null);

  // Modal dialog state
  const [activeModal, setActiveModal] = useState<{
    type: string;
    title: string;
    description: string;
    confirmLabel?: string;
    variant?: 'danger' | 'warning' | 'primary';
  } | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchBuChannelsData()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setSelectedItem(res.registry[0]);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load business units and channels data:', err);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleApplyFilters = () => {
    toast.success('Applied business unit & channel filters.');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedBu('all');
    setSelectedChannel('all');
    setSelectedStatus('all');
    setActiveQuickFilter(null);
    toast.success('Cleared all filters.');
  };

  const handleToggleQuickFilter = (id: string) => {
    setActiveQuickFilter((prev) => (prev === id ? null : id));
  };

  const handleActionClick = (actionKey: string) => {
    switch (actionKey) {
      case 'create_bu':
        setActiveModal({
          type: 'create_bu',
          title: 'Create Business Unit',
          description: 'Initiate a new business unit workspace, assigning operational group scopes and default environment mappings.',
          confirmLabel: 'Provision BU',
          variant: 'primary',
        });
        break;
      case 'create_channel':
        setActiveModal({
          type: 'create_channel',
          title: 'Create Channel',
          description: 'Add a new operating channel, defining sharing options and mapping it to active business units.',
          confirmLabel: 'Provision Channel',
          variant: 'primary',
        });
        break;
      case 'review_scope_conflicts':
        setActiveModal({
          type: 'review_conflicts',
          title: 'Review Scope Conflicts',
          description: 'Resolve 3 overlapping scope issues and verify environment compatibility rules.',
          confirmLabel: 'Launch Conflict Wizard',
          variant: 'warning',
        });
        break;
      case 'review_readiness':
        setActiveModal({
          type: 'review_readiness',
          title: 'Review Operating Readiness',
          description: 'Trigger readiness checks across 16 active units to verify regional compliance and ownership validation.',
          confirmLabel: 'Run Readiness Evaluation',
          variant: 'primary',
        });
        break;
      case 'review_ownership':
        setActiveModal({
          type: 'review_ownership',
          title: 'Review Ownership Gaps',
          description: 'Address 2 ownership gaps and reassign unowned channels to primary operational roles.',
          confirmLabel: 'Reassign Owners',
          variant: 'warning',
        });
        break;
      case 'export_registry':
        toast.success('Exporting full operating structure registry (CSV/JSON)...');
        break;
      default:
        console.log('Action triggered:', actionKey);
    }
  };

  const handleConfirmModal = async () => {
    if (!activeModal) return;
    setModalLoading(true);
    await new Promise((r) => setTimeout(r, 350));
    setModalLoading(false);

    toast.success('Governed change successfully recorded in the central audit system.');
    setActiveModal(null);
  };

  if (loading || !data || !selectedItem) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50/40 p-4">
        <div className="flex items-center justify-center py-24 text-gray-500 gap-2">
          <div className="w-5 h-5 border-2 border-[#741d35] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Loading business units, channels & operating scope...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        {/* 1. Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <nav className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
            <Link href="/admin/administration" className="hover:text-gray-900 transition-colors">
              Administration
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-bold">Business Units & Channels</span>
          </nav>

          <Link
            href="/admin/administration/system-configuration"
            className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1"
          >
            <span>Go to System Configuration</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 2. Page Header with Title & Actions */}
        <BuChannelsHeader
          onCreateBusinessUnit={() => handleActionClick('create_bu')}
          onCreateChannel={() => handleActionClick('create_channel')}
          onReviewConflicts={() => handleActionClick('review_scope_conflicts')}
          onReviewReadiness={() => handleActionClick('review_readiness')}
          onExportRegistry={() => handleActionClick('export_registry')}
        />

        {/* 3. Context & System Status Bar (16 metadata items) */}
        <BuChannelsContextBar context={data.context} />

        {/* 4. 20 KPI Summary Cards Grid with sparklines */}
        <BuChannelsKpiGrid kpis={data.kpis} />

        {/* 5. 15 Tabs Navigation Bar */}
        <div className="w-full bg-white border border-gray-200 rounded p-1 mb-3 shadow-2xs overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {BU_CHANNELS_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
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

        {/* 6. Filter Bar with Search, Dropdowns and Quick Filters */}
        <BuChannelsFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedBu={selectedBu}
          onBuChange={setSelectedBu}
          selectedChannel={selectedChannel}
          onChannelChange={setSelectedChannel}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          activeQuickFilter={activeQuickFilter}
          onToggleQuickFilter={handleToggleQuickFilter}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        {/* 7. Main Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Left Content Column */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' ? (
              <BuChannelsOverviewTab
                data={data}
                selectedBuItem={selectedItem}
                onSelectRegistryItem={setSelectedItem}
                onNavigateTab={setActiveTab}
              />
            ) : (
              <BuChannelsTabContent
                activeTab={activeTab}
                data={data}
                onNavigateTab={setActiveTab}
              />
            )}
          </div>

          {/* Right Health & Action Summary Rail */}
          <div className="w-full lg:w-72 shrink-0">
            <BuChannelsRightRail
              onNavigateTab={setActiveTab}
              onActionClick={handleActionClick}
            />
          </div>
        </div>
      </div>

      {/* Confirmation & Action Modal */}
      {activeModal && (
        <ConfirmDialog
          isOpen={true}
          title={activeModal.title}
          description={activeModal.description}
          confirmLabel={activeModal.confirmLabel}
          variant={activeModal.variant}
          isLoading={modalLoading}
          onConfirm={handleConfirmModal}
          onCancel={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
export default BuChannelsPage;
