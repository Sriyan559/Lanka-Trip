"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { verificationComplianceApi } from '@/lib/api/verificationCompliance';

// Authenticity-specific components
import { AuthenticityPageHeader }        from '@/components/admin/verification/authenticity/AuthenticityPageHeader';
import { AuthenticityKpiGrid }           from '@/components/admin/verification/authenticity/AuthenticityKpiGrid';
import { AuthenticityTabs }              from '@/components/admin/verification/authenticity/AuthenticityTabs';
import { InvestigationTrendChart }       from '@/components/admin/verification/authenticity/InvestigationTrendChart';
import { IssueDistributionChart }        from '@/components/admin/verification/authenticity/IssueDistributionChart';
import { InvestigationStatusChart }      from '@/components/admin/verification/authenticity/InvestigationStatusChart';
import { IntelligenceHealthPanel }       from '@/components/admin/verification/authenticity/IntelligenceHealthPanel';
import { AuthenticityHealthScorecard }   from '@/components/admin/verification/authenticity/AuthenticityHealthScorecard';
import { InvestigationFilters }          from '@/components/admin/verification/authenticity/InvestigationFilters';
import { AuthenticityInvestigationTable }from '@/components/admin/verification/authenticity/AuthenticityInvestigationTable';
import { DetectionSourcesCard }          from '@/components/admin/verification/authenticity/DetectionSourcesCard';
import { ProductIdentityValidation }     from '@/components/admin/verification/authenticity/ProductIdentityValidation';
import { BrandAuthorizationSummary }     from '@/components/admin/verification/authenticity/BrandAuthorizationSummary';
import { PackagingComparison }           from '@/components/admin/verification/authenticity/PackagingComparison';
import { IdentifierIntegrity }           from '@/components/admin/verification/authenticity/IdentifierIntegrity';
import { SerialBatchAuthenticity }       from '@/components/admin/verification/authenticity/SerialBatchAuthenticity';
import { AuthenticityFindings }          from '@/components/admin/verification/authenticity/AuthenticityFindings';
import { RestrictionBusinessImpact }     from '@/components/admin/verification/authenticity/RestrictionBusinessImpact';
import { AuthenticityDecisionQueue }     from '@/components/admin/verification/authenticity/AuthenticityDecisionQueue';
import { CorrectiveActionsRevalidation } from '@/components/admin/verification/authenticity/CorrectiveActionsRevalidation';
import { AuthenticitySlaAgeing }         from '@/components/admin/verification/authenticity/AuthenticitySlaAgeing';
import { RecentAuthenticityActivity }    from '@/components/admin/verification/authenticity/RecentAuthenticityActivity';

// ── Context bar items (Section 2) ────────────────────────────────────────────
const CONTEXT_ITEMS = [
  { label: 'Tenant',              value: 'SL Beauty' },
  { label: 'Ecosystem',           value: 'Beauty Marketplace' },
  { label: 'Business Unit',       value: 'All Business Units' },
  { label: 'Sales Channels',      value: 'All Channels' },
  { label: 'Region',              value: 'Sri Lanka' },
  { label: 'Currency',            value: 'LKR' },
  { label: 'Investigation Scope', value: 'Active Authenticity Network' },
  { label: 'Date Range',          value: 'Last 30 Days' },
];

// ── Page component ────────────────────────────────────────────────────────────
export default function AuthenticityInvestigationsPage() {
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [data, setData]             = useState<any>(null);
  const [activeTab, setActiveTab]   = useState('overview');
  const [searchValue, setSearchValue] = useState('');
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [page, setPage]             = useState(1);
  const [pageSize, setPageSize]     = useState(25);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await verificationComplianceApi.getAuthenticityDashboard({
        status: activeTab,
        search: searchValue || undefined,
        page,
        per_page: pageSize,
      });
      setData(res);
    } catch (err: any) {
      console.error('[Authenticity] Dashboard fetch error:', err);
      setError(err?.message || 'Failed to load authenticity dashboard');
    } finally {
      setLoading(false);
    }
  }, [activeTab, page, pageSize, searchValue]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Derived data — all default to safe empty shapes
  const kpis                 = data?.kpis                  ?? {};
  const tabCounts            = data?.tab_counts             ?? {};
  const trendData            = data?.trend                  ?? [];
  const issueDistribution    = data?.issue_distribution     ?? [];
  const statusSummary        = data?.status_summary         ?? [];
  const scorecard            = data?.scorecard              ?? {};
  const investigations       = data?.investigations?.data   ?? [];
  const investigationsTotal  = data?.investigations?.total  ?? 0;
  const detectionSources     = data?.detection_sources      ?? [];
  const productIdentity      = data?.product_identity       ?? [];
  const brandAuthorization   = data?.brand_authorization    ?? [];
  const packagingData        = data?.packaging              ?? {};
  const identifierData       = data?.identifier_integrity   ?? {};
  const serialBatch          = data?.serial_batch           ?? [];
  const findings             = data?.findings               ?? [];
  const restrictionImpact    = data?.restriction_impact     ?? {};
  const decisionQueue        = data?.decision_queue         ?? [];
  const correctiveActions    = data?.corrective_actions     ?? [];
  const slaAgeing            = data?.sla_ageing             ?? {};
  const recentActivity       = data?.recent_activity        ?? [];

  const handleToggleChip = (id: string) => {
    setActiveChips((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleClearAll = () => {
    setSearchValue('');
    setActiveChips([]);
    setPage(1);
  };

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4 overflow-hidden">

        {/* 1. Page Header */}
        <AuthenticityPageHeader
          onExport={() => {}}
          onReviewCritical={() => {}}
          onReviewNext={() => {}}
          loading={loading}
        />

        {/* 2. Context Scope Bar */}
        <ContextScopeBar
          items={CONTEXT_ITEMS}
          lastSynced={data?.lastSynced ?? 'Just now'}
          accessNote="Access limited to assigned business units"
        />

        {/* Error banner */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2.5 rounded text-[12px] flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchDashboard} className="font-bold underline ml-4">Retry</button>
          </div>
        )}

        {/* 3. KPI Grid — 12 cards */}
        <AuthenticityKpiGrid data={kpis} />

        {/* 4. Navigation Tabs */}
        <AuthenticityTabs activeTab={activeTab} onChange={setActiveTab} counts={tabCounts} />

        {/* 5. Top Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 5A: Trend Chart (2 cols) */}
          <InvestigationTrendChart
            data={trendData}
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
          />
          {/* 5B: Issue Distribution donut (1 col) */}
          <IssueDistributionChart
            data={issueDistribution}
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
          />
        </div>

        {/* 5C: Investigation Status Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <InvestigationStatusChart
            data={statusSummary}
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
          />
          {/* Spacer card — can be used for extra KPI/chart later */}
          <div className="lg:col-span-1" />
        </div>

        {/* 7. Authenticity Control Health Scorecard */}
        <AuthenticityHealthScorecard data={scorecard} />

        {/* 8. Investigation Filters */}
        <InvestigationFilters
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onClearAll={handleClearAll}
          onSaveView={() => {}}
          activeChips={activeChips}
          onToggleChip={handleToggleChip}
        />

        {/* 9. Investigation Table */}
        <AuthenticityInvestigationTable
          data={investigations}
          total={investigationsTotal}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          loading={loading}
        />

        {/* 10. Lower Analytics Grid ─────────────────────────────────────── */}
        {/* Row 1: Detection Sources | Product Identity | Brand Authorization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DetectionSourcesCard data={detectionSources} />
          <ProductIdentityValidation data={productIdentity} />
          <BrandAuthorizationSummary data={brandAuthorization} />
        </div>

        {/* Row 2: Packaging Comparison | Identifier Integrity | Serial & Batch | Findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PackagingComparison data={packagingData} />
          <IdentifierIntegrity data={identifierData} />
          <SerialBatchAuthenticity data={serialBatch} />
          <AuthenticityFindings data={findings} />
        </div>

        {/* Row 3: Restriction Impact (full width) */}
        <RestrictionBusinessImpact data={restrictionImpact} />

        {/* Row 4: Decision Queue | Corrective Actions | SLA Ageing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AuthenticityDecisionQueue data={decisionQueue} />
          <CorrectiveActionsRevalidation data={correctiveActions} />
          <AuthenticitySlaAgeing data={slaAgeing} />
        </div>

        {/* Row 5: Recent Activity (full width) */}
        <RecentAuthenticityActivity data={recentActivity} />

      </div>

      {/* ── RIGHT INTELLIGENCE RAIL (Section 6) ──────────────────────────── */}
      <IntelligenceHealthPanel data={data?.intelligence} />

    </div>
  );
}
