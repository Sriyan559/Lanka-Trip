'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { RolesPermissionsFullData, RoleRegistryItem } from '@/lib/administration/roles-permissions/roles-permissions.types';
import { fetchRolesPermissionsData } from '@/lib/administration/roles-permissions/roles-permissions.api';
import { ROLES_PERMISSIONS_TABS } from '@/lib/administration/roles-permissions/roles-permissions.constants';
import { RolesPermissionsHeader } from './RolesPermissionsHeader';
import { RolesPermissionsKpiGrid } from './RolesPermissionsKpiGrid';
import { RolesPermissionsFilterBar } from './RolesPermissionsFilterBar';
import { RolesPermissionsOverviewTab } from './RolesPermissionsOverviewTab';
import { RolesPermissionsRightRail } from './RolesPermissionsRightRail';
import { RolesPermissionsTabContent } from './tabs/RolesPermissionsTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';
import toast from 'react-hot-toast';

export function RolesPermissionsPage() {
  const [data, setData] = useState<RolesPermissionsFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedPrivilege, setSelectedPrivilege] = useState('all');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  // Selected role for detail panel
  const [selectedRole, setSelectedRole] = useState<RoleRegistryItem | null>(null);

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
    fetchRolesPermissionsData()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setSelectedRole(res.selectedRole);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load roles and permissions data:', err);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleApplyFilters = () => {
    toast.success('Applied role & permission filters.');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRisk('all');
    setSelectedPrivilege('all');
    setActiveQuickFilter(null);
    toast.success('Cleared all filters.');
  };

  const handleToggleQuickFilter = (id: string) => {
    setActiveQuickFilter((prev) => (prev === id ? null : id));
  };

  const handleActionClick = (actionKey: string) => {
    switch (actionKey) {
      case 'create_role':
        setActiveModal({
          type: 'create_role',
          title: 'Create Enterprise Role',
          description: 'Initiate role creation wizard with scope templates and least privilege boundary policies.',
          confirmLabel: 'Launch Role Wizard',
          variant: 'primary',
        });
        break;
      case 'create_permission_set':
        setActiveModal({
          type: 'create_permission_set',
          title: 'Create Permission Set',
          description: 'Define an atomic permission set and bind required microservice actions and scope boundaries.',
          confirmLabel: 'Create Permission Set',
          variant: 'primary',
        });
        break;
      case 'create_access_profile':
        setActiveModal({
          type: 'create_access_profile',
          title: 'Create Access Profile',
          description: 'Bundle linked roles and baseline permissions into a reusable organizational access profile.',
          confirmLabel: 'Create Profile',
          variant: 'primary',
        });
        break;
      case 'review_privileged':
        setActiveTab('privileged-roles');
        break;
      case 'run_review_campaign':
        setActiveModal({
          type: 'run_campaign',
          title: 'Run Access Review Campaign',
          description: 'Trigger an automated 30-day certification campaign across all 344 roles and notify assigned role owners.',
          confirmLabel: 'Launch Review Campaign',
          variant: 'primary',
        });
        break;
      case 'export_role_registry':
        toast.success('Exporting full roles and permissions registry (CSV/JSON)...');
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

    if (activeModal.type === 'run_campaign') {
      toast.success('Access review campaign initiated. Audit event recorded.');
    } else {
      toast.success('Governed action completed successfully.');
    }
    setActiveModal(null);
  };

  if (loading || !data || !selectedRole) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50/40 p-4">
        <div className="flex items-center justify-center py-24 text-gray-500 gap-2">
          <div className="w-5 h-5 border-2 border-[#741d35] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Loading roles, permissions & access profiles...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 pb-16">
      <div className="w-full max-w-[1780px] mx-auto px-3 sm:px-4 py-3.5">
        {/* 1. Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <nav className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
            <Link href="/admin/administration" className="hover:text-gray-900 transition-colors">
              Administration
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-bold">Roles & Permissions</span>
          </nav>

          <Link
            href="/admin/administration/users"
            className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Users & Identity</span>
          </Link>
        </div>

        {/* 2. Top Page Header with Title & Action Buttons */}
        <RolesPermissionsHeader
          onCreateRole={() => handleActionClick('create_role')}
          onCreatePermissionSet={() => handleActionClick('create_permission_set')}
          onCreateAccessProfile={() => handleActionClick('create_access_profile')}
          onReviewPrivileged={() => handleActionClick('review_privileged')}
          onExportRegistry={() => handleActionClick('export_role_registry')}
        />

        {/* 3. 11 KPI Summary Cards across top */}
        <RolesPermissionsKpiGrid kpis={data.kpis} healthMetrics={data.healthMetrics} />

        {/* 4. Tabs Navigation Bar */}
        <div className="w-full bg-white border border-gray-200 rounded p-1 mb-3 shadow-2xs overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {ROLES_PERMISSIONS_TABS.map((tab) => {
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

        {/* 5. Filter Toolbar with Search, Dropdowns and Quick Filters */}
        <RolesPermissionsFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedRisk={selectedRisk}
          onRiskChange={setSelectedRisk}
          selectedPrivilege={selectedPrivilege}
          onPrivilegeChange={setSelectedPrivilege}
          activeQuickFilter={activeQuickFilter}
          onToggleQuickFilter={handleToggleQuickFilter}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        {/* 6. Main Content Area */}
        {activeTab === 'overview' ? (
          <div className="w-full">
            <RolesPermissionsOverviewTab
              data={data}
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
              onNavigateTab={setActiveTab}
            />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 min-w-0">
              <RolesPermissionsTabContent
                activeTab={activeTab}
                data={data}
                onNavigateTab={setActiveTab}
              />
            </div>
            <div className="w-full lg:w-72 shrink-0">
              <RolesPermissionsRightRail
                onNavigateTab={setActiveTab}
                onActionClick={handleActionClick}
              />
            </div>
          </div>
        )}
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
