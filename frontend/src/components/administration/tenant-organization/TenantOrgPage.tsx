'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { TenantOrgFullData, TenantOrgRegistryItem } from '@/lib/administration/tenant-organization/tenant-organization.types';
import { fetchTenantOrgData } from '@/lib/administration/tenant-organization/tenant-organization.api';
import { TENANT_ORG_TABS } from '@/lib/administration/tenant-organization/tenant-organization.constants';
import { TenantOrgHeader } from './TenantOrgHeader';
import { TenantOrgContextBar } from './TenantOrgContextBar';
import { TenantOrgKpiGrid } from './TenantOrgKpiGrid';
import { TenantOrgFilterBar } from './TenantOrgFilterBar';
import { TenantOrgOverviewTab } from './TenantOrgOverviewTab';
import { TenantOrgRightRail } from './TenantOrgRightRail';
import { TenantOrgTabContent } from './tabs/TenantOrgTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';
import toast from 'react-hot-toast';

export function TenantOrgPage() {
  const [data, setData] = useState<TenantOrgFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('all');
  const [selectedEcosystem, setSelectedEcosystem] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  // Selected registry item for detail panel
  const [selectedItem, setSelectedItem] = useState<TenantOrgRegistryItem | null>(null);

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
    fetchTenantOrgData()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setSelectedItem(res.registry[0]);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load tenant and organization data:', err);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleApplyFilters = () => {
    toast.success('Applied tenant & organization filters.');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTenant('all');
    setSelectedEcosystem('all');
    setSelectedStatus('all');
    setActiveQuickFilter(null);
    toast.success('Cleared all filters.');
  };

  const handleToggleQuickFilter = (id: string) => {
    setActiveQuickFilter((prev) => (prev === id ? null : id));
  };

  const handleActionClick = (actionKey: string) => {
    switch (actionKey) {
      case 'create_tenant':
        setActiveModal({
          type: 'create_tenant',
          title: 'Create Enterprise Tenant',
          description: 'Define a new multi-tenant boundary, regional scope, and primary legal entity mapping.',
          confirmLabel: 'Provision Tenant',
          variant: 'primary',
        });
        break;
      case 'create_ecosystem':
        setActiveModal({
          type: 'create_ecosystem',
          title: 'Create Ecosystem',
          description: 'Provision an ecosystem domain, linked channels, and business scope inheritance rules.',
          confirmLabel: 'Provision Ecosystem',
          variant: 'primary',
        });
        break;
      case 'create_organization':
        setActiveModal({
          type: 'create_organization',
          title: 'Create Organization',
          description: 'Add an organizational entity, parent mapping, and legal/operating entity bindings.',
          confirmLabel: 'Create Organization',
          variant: 'primary',
        });
        break;
      case 'review_structure_risks':
        setActiveModal({
          type: 'review_risks',
          title: 'Review Structure Risks',
          description: 'Evaluate 4 structural risk areas (Ownership Gaps, Structure Conflicts, Regional Restrictions, Inactive Structures).',
          confirmLabel: 'Run Risk Audit',
          variant: 'warning',
        });
        break;
      case 'review_ownership':
        setActiveModal({
          type: 'review_ownership',
          title: 'Review Ownership Gaps',
          description: 'Address 3 ownership gaps and reassign unowned organizational nodes to responsible teams.',
          confirmLabel: 'Assign Ownership',
          variant: 'warning',
        });
        break;
      case 'export_registry':
        toast.success('Exporting full Tenant & Organization Registry (CSV/JSON)...');
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

    toast.success('Governed structural change recorded with immutable audit log.');
    setActiveModal(null);
  };

  if (loading || !data || !selectedItem) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50/40 p-4">
        <div className="flex items-center justify-center py-24 text-gray-500 gap-2">
          <div className="w-5 h-5 border-2 border-[#741d35] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Loading tenant, ecosystem & organizational structure...</span>
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
            <span className="text-gray-900 font-bold">Tenant & Organization</span>
          </nav>

          <Link
            href="/admin/administration/business-units-channels"
            className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1"
          >
            <span>Go to Business Units & Channels</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 2. Page Header with Title & Actions */}
        <TenantOrgHeader
          onCreateTenant={() => handleActionClick('create_tenant')}
          onCreateEcosystem={() => handleActionClick('create_ecosystem')}
          onCreateOrganization={() => handleActionClick('create_organization')}
          onReviewRisks={() => handleActionClick('review_structure_risks')}
          onExportRegistry={() => handleActionClick('export_registry')}
        />

        {/* 3. Context & Scope Information Strip (16 metadata items) */}
        <TenantOrgContextBar context={data.context} />

        {/* 4. 20 KPI Summary Cards Grid */}
        <TenantOrgKpiGrid kpis={data.kpis} />

        {/* 5. 16 Tabs Navigation Bar */}
        <div className="w-full bg-white border border-gray-200 rounded p-1 mb-3 shadow-2xs overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {TENANT_ORG_TABS.map((tab) => {
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
        <TenantOrgFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTenant={selectedTenant}
          onTenantChange={setSelectedTenant}
          selectedEcosystem={selectedEcosystem}
          onEcosystemChange={setSelectedEcosystem}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          activeQuickFilter={activeQuickFilter}
          onToggleQuickFilter={handleToggleQuickFilter}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        {/* 7. Main Flex Layout: Left Content + Right Rail */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Left Content Area */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' ? (
              <TenantOrgOverviewTab
                data={data}
                selectedTenantItem={selectedItem}
                onSelectRegistryItem={setSelectedItem}
                onNavigateTab={setActiveTab}
              />
            ) : (
              <TenantOrgTabContent
                activeTab={activeTab}
                data={data}
                onNavigateTab={setActiveTab}
              />
            )}
          </div>

          {/* Right Intelligence Rail */}
          <div className="w-full lg:w-72 shrink-0">
            <TenantOrgRightRail
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
