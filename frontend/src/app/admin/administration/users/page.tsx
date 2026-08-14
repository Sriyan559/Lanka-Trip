'use client';

import React, { useState } from 'react';
import { RefreshCw, Download, UserPlus, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { IdentityContextStrip } from '@/components/admin/administration/users/IdentityContextStrip';
import { IdentityKpiGrid } from '@/components/admin/administration/users/IdentityKpiGrid';
import { IdentityTabs } from '@/components/admin/administration/users/IdentityTabs';
import { IdentityFilters } from '@/components/admin/administration/users/IdentityFilters';
import { IdentityQuickFilters } from '@/components/admin/administration/users/IdentityQuickFilters';
import { RegistryAndHealthScorecard } from '@/components/admin/administration/users/RegistryAndHealthScorecard';
import { AuthAndAdministrators } from '@/components/admin/administration/users/AuthAndAdministrators';
import { IdentityRisksAndLockedAccounts } from '@/components/admin/administration/users/IdentityRisksAndLockedAccounts';
import { MfaAccessAndReadiness } from '@/components/admin/administration/users/MfaAccessAndReadiness';
import { GrantsMembershipsAndCertifications } from '@/components/admin/administration/users/GrantsMembershipsAndCertifications';
import { ActivityAndTrends } from '@/components/admin/administration/users/ActivityAndTrends';
import { GovernanceMatrixAndExceptions } from '@/components/admin/administration/users/GovernanceMatrixAndExceptions';
import { RiskReviewsAndSessions } from '@/components/admin/administration/users/RiskReviewsAndSessions';
import { IdentityOperationalRail } from '@/components/admin/administration/users/IdentityOperationalRail';

import { useIdentityManagement } from '@/hooks/useIdentityManagement';
import { UserFormModal } from '@/components/admin/administration/users/UserFormModal';
import { StatusChangeModal } from '@/components/admin/administration/users/StatusChangeModal';
import { ResetPasswordModal } from '@/components/admin/administration/users/ResetPasswordModal';
import { IdentityUser } from '@/services/api/administrationService';

const initialFilters = {
  search: '',
  accountType: 'all',
  tenant: 'all',
  ecosystem: 'all',
  businessUnit: 'all',
  role: 'all',
  privilege: 'all',
  state: 'all',
  authMethod: 'all',
  mfaStatus: 'all',
  reviewStatus: 'all',
  riskLevel: 'all',
  owner: 'all',
  lastActivity: 'all'
};

export default function UsersAndIdentityManagementPage() {
  const [activeTab, setActiveTab] = useState('registry');
  const [filters, setFilters] = useState(initialFilters);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IdentityUser | null>(null);

  const [statusUser, setStatusUser] = useState<IdentityUser | null>(null);
  const [targetStatus, setTargetStatus] = useState<'active' | 'suspended' | 'locked' | null>(null);

  const [resetPasswordUser, setResetPasswordUser] = useState<IdentityUser | null>(null);

  // Hook connection to backend
  const {
    users,
    pagination,
    loading,
    error,
    scorecard,
    scorecardLoading,
    page,
    setPage,
    refresh,
    lastUpdated,
    createUser,
    updateUser,
    updateStatus,
    resetPassword,
    exportUsers,
    mutationLoading,
  } = useIdentityManagement(filters);

  const handleFilterChange = (key: keyof typeof initialFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleChip = (chipId: string) => {
    setSelectedChips((prev) =>
      prev.includes(chipId) ? prev.filter((id) => id !== chipId) : [...prev, chipId]
    );
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setSelectedChips([]);
  };

  const handleApplyFilters = () => {
    refresh();
  };

  // Quick Action handlers
  const handleOpenCreate = () => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (user: IdentityUser) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  };

  const handleOpenStatus = (user: IdentityUser, status: 'active' | 'suspended' | 'locked') => {
    setStatusUser(user);
    setTargetStatus(status);
  };

  const handleOpenResetPassword = (user: IdentityUser) => {
    setResetPasswordUser(user);
  };

  const handleReviewPrivileged = () => {
    handleFilterChange('role', 'super_admin');
  };

  const handleReviewLocked = () => {
    handleFilterChange('state', 'locked');
  };

  const handleFormSubmit = async (payload: any) => {
    if (editingUser) {
      await updateUser(editingUser.id, payload);
    } else {
      await createUser(payload);
    }
  };

  const lastUpdatedLabel = lastUpdated
    ? `Updated ${Math.round((Date.now() - lastUpdated.getTime()) / 1000)}s ago`
    : 'Loading…';

  const headerActions = (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-gray-400 font-medium">{lastUpdatedLabel}</span>
      <button
        type="button"
        onClick={refresh}
        className="p-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded shadow-sm transition-colors"
        title="Refresh identity registry"
      >
        <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
      </button>

      <button
        type="button"
        onClick={handleOpenCreate}
        className="px-3.5 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow transition-colors flex items-center gap-1"
      >
        <UserPlus size={12} />
        <span>+ Create User</span>
      </button>

      <button
        type="button"
        onClick={handleReviewPrivileged}
        className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-sm transition-colors"
      >
        Review Privileged Users
      </button>

      <button
        type="button"
        onClick={handleReviewLocked}
        className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-sm transition-colors flex items-center gap-1"
      >
        <ShieldAlert size={12} className="text-amber-600" />
        <span>Review Locked Accounts</span>
      </button>

      <button
        type="button"
        onClick={() => exportUsers()}
        className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-sm transition-colors flex items-center gap-1"
      >
        <Download size={12} />
        <span>Export User Registry</span>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/40 p-4">
      {/* Header Block */}
      <PageHeader
        title="Users, Accounts & Identity Management"
        description="A central administration workspace for user lifecycle management, administrative assignments, account access lifecycle, restrictions, reviews, and identity governance."
        crumbs={['Administration', 'Users & Identity']}
        actions={headerActions}
      />

      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded flex items-center justify-between">
          <span className="text-xs text-red-700 font-semibold">{error}</span>
          <button
            type="button"
            onClick={refresh}
            className="text-xs text-red-600 underline hover:text-red-800 font-bold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Registry Status Strip */}
      <IdentityContextStrip />

      {/* KPI double-row Grid */}
      <IdentityKpiGrid />

      {/* Tabs */}
      <IdentityTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Primary Filters */}
      <IdentityFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {/* Quick Filter Chips */}
      <IdentityQuickFilters
        selectedChips={selectedChips}
        onToggleChip={handleToggleChip}
      />

      {/* Workspace content grid */}
      <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
        {/* Main Column */}
        <div className="flex-grow w-full lg:max-w-[calc(100%-316px)]">
          {activeTab === 'registry' ? (
            <>
              {/* Sections 1 & 2 */}
              <RegistryAndHealthScorecard />

              {/* Sections 3 & 4 - Real User Account Table */}
              <AuthAndAdministrators
                users={users}
                loading={loading}
                onEditUser={handleOpenEdit}
                onStatusUser={handleOpenStatus}
                onResetPasswordUser={handleOpenResetPassword}
              />

              {/* Sections 6 & 7 */}
              <IdentityRisksAndLockedAccounts />

              {/* Sections 8, 9 & 10 */}
              <MfaAccessAndReadiness />

              {/* Sections 11, 12 & 13 */}
              <GrantsMembershipsAndCertifications />

              {/* Section 14, 20B & Donut */}
              <ActivityAndTrends />

              {/* Governance gates & Matrix & Exception */}
              <GovernanceMatrixAndExceptions />

              {/* Section 18, 19, reviews & sessions */}
              <RiskReviewsAndSessions />
            </>
          ) : (
            <div className="bg-white border border-gray-200 rounded p-8 text-center text-gray-500 font-semibold shadow-sm">
              Tab view &quot;{activeTab.toUpperCase()}&quot; is ready. Switch back to &quot;User Registry&quot; to view the main Identity metrics.
            </div>
          )}
        </div>

        {/* Right Operational Rail */}
        <IdentityOperationalRail />
      </div>

      {/* ─── CRUD Modals ─── */}
      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        user={editingUser}
        loading={mutationLoading}
      />

      <StatusChangeModal
        isOpen={Boolean(statusUser && targetStatus)}
        user={statusUser}
        targetStatus={targetStatus}
        onClose={() => {
          setStatusUser(null);
          setTargetStatus(null);
        }}
        onConfirm={async (id, status, reason) => {
          await updateStatus(id, status, reason);
        }}
        loading={mutationLoading}
      />

      <ResetPasswordModal
        isOpen={Boolean(resetPasswordUser)}
        user={resetPasswordUser}
        onClose={() => setResetPasswordUser(null)}
        onConfirm={async (id) => {
          return await resetPassword(id);
        }}
        loading={mutationLoading}
      />
    </div>
  );
}
