'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
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
import { useAdministrationCommandCenter } from '@/hooks/useAdministrationCommandCenter';

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

  // Build clean params for the API — exclude defaults
  const apiParams = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v && v !== 'all')
  );

  const { data, loading, error, lastUpdated, refresh } = useAdministrationCommandCenter(apiParams);

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
        title="Refresh dashboard"
      >
        <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
      </button>
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
        href="/admin/administration/security-authentication"
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

      {/* Error banner */}
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

      {/* Context Strip */}
      <AdministrationContextStrip overview={data?.overview} loading={loading} />

      {/* KPI Grid */}
      <AdministrationKpiGrid kpis={data?.kpis} loading={loading} />

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
        {/* Main content - Left Column */}
        <div className="flex-1 w-full lg:max-w-[calc(100%-316px)]">
          {activeTab === 'overview' ? (
            <>
              <AdministrationHealthOverview overview={data?.overview} loading={loading} />
              <AdministrativeIdentityTable
                administrativeIdentities={data?.administrative_identities}
                privilegedAdmins={data?.privileged_admins}
                loading={loading}
              />
              <SummaryCardsRow overview={data?.overview} loading={loading} />
              <PlatformConfigurationHealth platformConfigs={data?.platform_configs} loading={loading} />
              <LocalizationReadiness localizationReadiness={data?.localization_readiness} loading={loading} />
              <SecurityAndWorkflowPosture securityPosture={data?.security_posture} loading={loading} />
              <GovernanceAndJobs governanceJobs={data?.governance_jobs} loading={loading} />
              <RiskAndTrends charts={data?.charts} loading={loading} />
              <InputFeedsAndActivity recentActivity={data?.recent_activity} loading={loading} />
            </>
          ) : (
            <div className="bg-white border border-gray-200 rounded p-8 text-center text-gray-500 font-semibold shadow-sm">
              Tab view &quot;{activeTab.toUpperCase()}&quot; is ready. Switch back to &quot;Administration Overview&quot; to view the main Command Center metrics.
            </div>
          )}
        </div>

        {/* Operational Rail - Right Column */}
        <AdministrationOperationalRail
          overview={data?.overview}
          serverInfo={data?.server_info}
          loading={loading}
        />
      </div>
    </div>
  );
}
