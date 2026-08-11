"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { verificationComplianceApi } from '@/lib/api/verificationCompliance';

// ── Recall & Safety components ────────────────────────────────────────────────
import { RecallSafetyHeader }            from '@/components/admin/verification/recall-safety/RecallSafetyHeader';
import { RecallKpiGrid }                 from '@/components/admin/verification/recall-safety/RecallKpiGrid';
import { RecallTrendChart }              from '@/components/admin/verification/recall-safety/RecallTrendChart';
import { IncidentTypeDonut }             from '@/components/admin/verification/recall-safety/IncidentTypeDonut';
import { IncidentStatusChart }           from '@/components/admin/verification/recall-safety/IncidentStatusChart';
import { RecallReadinessScorecard }      from '@/components/admin/verification/recall-safety/RecallReadinessScorecard';
import { RecallTabs }                    from '@/components/admin/verification/recall-safety/RecallTabs';
import { RecallFilters }                 from '@/components/admin/verification/recall-safety/RecallFilters';
import { IncidentPortfolioTable }        from '@/components/admin/verification/recall-safety/IncidentPortfolioTable';
import { OperationalSummaryGrid }        from '@/components/admin/verification/recall-safety/OperationalSummaryGrid';
import { RecallClassificationReference } from '@/components/admin/verification/recall-safety/RecallClassificationReference';
import { RecallLifecycleWorkflow }       from '@/components/admin/verification/recall-safety/RecallLifecycleWorkflow';
import { RecallSafetyIntelligencePanel } from '@/components/admin/verification/recall-safety/RecallSafetyIntelligencePanel';

// ── Context scope bar config ──────────────────────────────────────────────────
const CONTEXT_ITEMS = [
  { label: 'Tenant',         value: 'SL Beauty' },
  { label: 'Ecosystem',      value: 'Beauty Marketplace' },
  { label: 'Business Unit',  value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region',         value: 'Sri Lanka' },
  { label: 'Currency',       value: 'LKR' },
  { label: 'Incident Scope', value: 'Active Product & Batch Network' },
  { label: 'Date Range',     value: 'Last 30 Days' },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RecallCommandCenterPage() {
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
      const res = await verificationComplianceApi.getRecallsDashboard();
      setData(res);
    } catch (err: any) {
      console.error('[Recalls] Dashboard fetch error:', err);
      setError(err?.message ?? 'Failed to load recall dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // ── Derived data (safe defaults) ───────────────────────────────────────────
  const kpis              = data?.kpis              ?? {};
  const tabCounts         = data?.tab_counts        ?? {};
  const trendData         = data?.trend             ?? [];
  const donutData         = data?.donut             ?? [];
  const statusData        = data?.status_summary    ?? [];
  const scorecard         = data?.scorecard         ?? {};
  const incidents         = data?.recalls?.data     ?? [];
  const incidentsTotal    = data?.recalls?.total    ?? 0;
  const operationalData   = data?.operational       ?? {};
  const intelligenceData  = data?.intelligence      ?? {};

  const handleToggleChip = (id: string) => {
    setActiveChips((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  };

  const handleClearAll = () => {
    setSearchValue('');
    setActiveChips([]);
    setPage(1);
  };

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-16">

      {/* ── MAIN CONTENT ───────────────────────────────────────────────────── */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4 overflow-hidden">

        {/* 1. Page Header */}
        <RecallSafetyHeader
          onExportReport={() => {}}
          onReviewCritical={() => {}}
          onStartAssessment={() => {}}
          onCreateIncident={() => {}}
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
        <RecallKpiGrid liveKpis={kpis} />

        {/* 4. Main Analytics Row: Trend (2 cols) | Donut (1 col) | Status (hidden on small) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RecallTrendChart
            data={trendData}
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
          />
          <IncidentTypeDonut
            data={donutData}
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
          />
        </div>

        {/* 5. Incident Status Chart (full-width 2-col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <IncidentStatusChart
            data={statusData}
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
          />
          {/* Placeholder for a future 3rd chart or leave intentionally visible */}
          <div className="hidden lg:block" />
        </div>

        {/* 6. Recall Readiness Health Scorecard */}
        <RecallReadinessScorecard data={scorecard} />

        {/* 7. Operational Tabs */}
        <RecallTabs activeTab={activeTab} onChange={setActiveTab} counts={tabCounts} />

        {/* 8. Advanced Filters */}
        <RecallFilters
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onClearAll={handleClearAll}
          onSaveView={() => {}}
          activeChips={activeChips}
          onToggleChip={handleToggleChip}
        />

        {/* 9. Incident Portfolio Table */}
        <IncidentPortfolioTable
          data={incidents}
          total={incidentsTotal}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          loading={loading}
        />

        {/* 10. 12 Operational Summary Panels */}
        <OperationalSummaryGrid liveData={operationalData} />

        {/* 11. Recall Classification Reference */}
        <RecallClassificationReference />

        {/* 12. Recall Lifecycle Workflow */}
        <RecallLifecycleWorkflow currentStep={0} />

      </div>

      {/* ── RIGHT INTELLIGENCE RAIL ─────────────────────────────────────────── */}
      <RecallSafetyIntelligencePanel data={intelligenceData} />

    </div>
  );
}
