'use client';

import React, { useState } from 'react';
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
    console.log('Apply Filters:', { filters, selectedChips });
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="px-3.5 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow transition-colors"
      >
        + Create User
      </button>
      <button
        type="button"
        className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-sm transition-colors"
      >
        Invite User
      </button>
      <button
        type="button"
        className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-sm transition-colors"
      >
        Review Privileged Users
      </button>
      <button
        type="button"
        className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-sm transition-colors"
      >
        Review Locked Accounts
      </button>
      <button
        type="button"
        className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-sm transition-colors"
      >
        Export User Registry
      </button>
      <button
        type="button"
        className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-sm transition-colors"
      >
        More Actions
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

              {/* Sections 3 & 4 */}
              <AuthAndAdministrators />

              {/* Sections 6 & 7 + User Actions Toolbar */}
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
    </div>
  );
}
