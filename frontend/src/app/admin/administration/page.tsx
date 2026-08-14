'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { AdministrationContextStrip } from '@/components/admin/administration/AdministrationContextStrip';
import { AdministrationKpiGrid } from '@/components/admin/administration/AdministrationKpiGrid';
import { AdministrationTabs } from '@/components/admin/administration/AdministrationTabs';
import { AdministrationFilters } from '@/components/admin/administration/AdministrationFilters';
import { AdministrationQuickFilters } from '@/components/admin/administration/AdministrationQuickFilters';
import { AdministrationHealthOverview } from '@/components/admin/administration/AdministrationHealthOverview';
import { AdministrativeIdentityTable } from '@/components/admin/administration/AdministrativeIdentityTable';
import { SummaryCardsRow } from '@/components/admin/administration/SummaryCardsRow';
import { PlatformConfigurationHealth } from '@/components/admin/administration/PlatformConfigurationHealth';
import { LocalizationReadiness } from '@/components/admin/administration/LocalizationReadiness';
import { SecurityAndWorkflowPosture } from '@/components/admin/administration/SecurityAndWorkflowPosture';
import { GovernanceAndJobs } from '@/components/admin/administration/GovernanceAndJobs';
import { RiskAndTrends } from '@/components/admin/administration/RiskAndTrends';
import { InputFeedsAndActivity } from '@/components/admin/administration/InputFeedsAndActivity';
import { AdministrationOperationalRail } from '@/components/admin/administration/AdministrationOperationalRail';

const initialFilters = {
  tenant: 'all',
  ecosystem: 'all',
  businessUnit: 'all',
  region: 'all',
  environment: 'all',
  domain: 'all',
  status: 'all',
  risk: 'all',
  timeRange: '7d'
};

export default function AdministrationCommandCenterPage() {
  const [activeTab, setActiveTab] = useState('overview');
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
    // Functional placeholder to represent applying filters in frontend state
    console.log('Applying Filters:', { filters, selectedChips });
  };

  // Render primary actions for PageHeader
  const headerActions = (
    <div className="flex items-center gap-2">
      <Link
        href="/admin/administration"
        className="px-3.5 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow transition-colors"
      >
        Review Administration Health
      </Link>
      <Link
        href="/admin/administration/users"
        className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-sm transition-colors"
      >
        Create Administrator
      </Link>
      <Link
        href="/admin/administration"
        className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-sm transition-colors"
      >
        Review Security Risks
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/40 p-4">
      {/* Title block */}
      <PageHeader
        title="Administration Command Center"
        description="A central administration command center for system administration health, identities, organization, configuration, security controls, workflows, communications, governance, maintenance, and audit across the retail ecosystem."
        crumbs={['Admin', 'Administration', 'Command Center']}
        actions={headerActions}
      />

      {/* Context Strip */}
      <AdministrationContextStrip />

      {/* KPI Grid */}
      <AdministrationKpiGrid />

      {/* Tabs */}
      <AdministrationTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Filter Toolbar */}
      <AdministrationFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {/* Quick Filter Chips */}
      <AdministrationQuickFilters
        selectedChips={selectedChips}
        onToggleChip={handleToggleChip}
      />

      {/* Two column layout: Main Content + Right operational rail */}
      <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
        {/* Main content - Left Column (flex-grow) */}
        <div className="flex-1 w-full lg:max-w-[calc(100%-316px)]">
          {activeTab === 'overview' ? (
            <>
              {/* Tables */}
              <AdministrationHealthOverview />
              <AdministrativeIdentityTable />
              
              {/* Summary Cards Row */}
              <SummaryCardsRow />
              
              {/* Platform Config panels */}
              <PlatformConfigurationHealth />
              
              {/* Localization / Readiness */}
              <LocalizationReadiness />
              
              {/* Security and Workflow widgets */}
              <SecurityAndWorkflowPosture />
              
              {/* Jobs and governance */}
              <GovernanceAndJobs />
              
              {/* Trends and Risks */}
              <RiskAndTrends />
              
              {/* Input feeds and activities */}
              <InputFeedsAndActivity />
            </>
          ) : (
            <div className="bg-white border border-gray-200 rounded p-8 text-center text-gray-500 font-semibold shadow-sm">
              Tab view &quot;{activeTab.toUpperCase()}&quot; is ready. Switch back to &quot;Administration Overview&quot; to view the main Command Center metrics.
            </div>
          )}
        </div>

        {/* Operational Rail - Right Column */}
        <AdministrationOperationalRail />
      </div>
    </div>
  );
}
