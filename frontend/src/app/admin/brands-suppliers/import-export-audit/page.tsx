"use client";

import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, Clock, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

import { ChartCard } from '@/components/admin/shared/ChartCard';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Domain', value: 'Brands & Suppliers' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Data Scope', value: 'Supplier Data Operations' },
];

const TABS = [
  { id: 'all', label: 'Overview' },
  { id: 'completed', label: 'Completed Jobs' },
  { id: 'failed', label: 'Failed Jobs' },
  { id: 'scheduled', label: 'Scheduled Exports' },
];

const ICON_MAP: Record<string, any> = {
  Layers, CheckCircle2, Clock, AlertTriangle, AlertCircle
};

const WORKFLOW_STEPS = [
  'Select Type', 'Upload File', 'Inspection', 'Field Mapping', 'Validation', 'Duplicate Review', 'Execute', 'Reconcile', 'Complete'
];

export default function SupplierImportExportAuditPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getImportExportAuditDashboard({ search, status: activeTab, page, per_page: 15 });
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [activeTab, page]);

  const kpis = data?.kpis || [];
  const jobsList = data?.jobs?.data || [];
  const meta = data?.jobs ? {
    current_page: data.jobs.current_page || 1,
    per_page: data.jobs.per_page || 15,
    total: data.jobs.total || 0,
    last_page: data.jobs.last_page || 1,
  } : { current_page: 1, per_page: 15, total: 0, last_page: 1 };
  const health = data?.health || { score: null, status: 'Not Assessed' };
  const donutData = data?.donut || [];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Import, Export &amp; Audit</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Import, Export &amp; Audit</h1>
            <p className="text-xs text-gray-500 mt-1">Manage supplier data imports, exports, validation workflows, reconciliation and audit-ready data exchange.</p>
          </div>
          <button onClick={fetchDashboard} className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600 hover:text-gray-900">
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync Live Data</span>
          </button>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced={data?.lastSynced || 'Just now'} accessNote="Access limited to assigned business context" />

        {/* KPI Grid */}
        <DashboardGrid>
          {kpis.map((kpi: any) => {
            const IconComponent = ICON_MAP[kpi.icon] || Layers;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* DATA OPS ANALYTICS CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
          <ChartCard title="Supplier Data Operations Trend (30 Days)" subtitle="Historical bulk imports, exports &amp; audit events" loading={loading}>
            <TrendChart data={data?.trend || []} colors={['#2563eb', '#16a34a', '#dc2626']} />
          </ChartCard>

          <ChartCard title="Job Status Distribution" subtitle="Distribution by execution status" loading={loading}>
            <DonutDistributionChart 
              data={donutData} 
              totalLabel="Jobs" 
              totalValue={donutData.reduce((a: any, c: any) => a + (c.value || 0), 0).toLocaleString()} 
            />
          </ChartCard>
        </div>

        {/* Active Import Workflow Preview (Kept Mounted) */}
        <div className="bg-white border border-gray-200 rounded-md p-4 mb-3 shadow-sm">
          <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">Active Import Workflow Stages</h3>
          <div className="flex items-center justify-between overflow-x-auto gap-2 py-1">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] whitespace-nowrap">
                <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300 text-gray-600 flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span className="text-gray-600 font-medium">{step}</span>
                {idx < WORKFLOW_STEPS.length - 1 && <span className="text-gray-300 ml-1">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setPage(1); }} />
        
        <FilterToolbar 
          searchPlaceholder="Search job code, title..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={() => { setPage(1); fetchDashboard(); }}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('all'); setPage(1); }}
        />

        {/* Data Jobs Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Supplier Data Jobs ({meta.total})</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">Job Code</th>
                  <th className="px-3 py-2">Title / Type</th>
                  <th className="px-3 py-2">Domain</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Records Processed</th>
                  <th className="px-3 py-2">Date Executed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {jobsList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-8 text-center text-gray-400">
                      No supplier data jobs found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  jobsList.map((job: any) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-mono font-bold text-gray-900">{job.job_code}</td>
                      <td className="px-3 py-2">
                        <div className="font-bold text-gray-900">{job.title}</div>
                        <div className="text-gray-400 text-[10px] capitalize">{job.job_type}</div>
                      </td>
                      <td className="px-3 py-2 text-gray-600 font-semibold uppercase">{job.domain || 'brands_suppliers'}</td>
                      <td className="px-3 py-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize ${
                          job.status === 'completed' ? 'bg-green-50 text-green-700' : (job.status === 'failed' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700')
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-bold text-gray-900">{job.processed_records ?? 0} / {job.total_records ?? 0}</td>
                      <td className="px-3 py-2 text-gray-500">{job.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-3 flex items-center justify-between border-t border-gray-200 text-[11px] text-gray-500 bg-gray-50 rounded-b-md">
            <div>Showing page {meta.current_page} of {meta.last_page} ({meta.total} total records)</div>
            <div className="flex items-center gap-1">
              <button 
                disabled={meta.current_page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-40"
              >
                &lt;
              </button>
              <span className="px-2 font-semibold text-gray-700">{meta.current_page}</span>
              <button 
                disabled={meta.current_page >= meta.last_page}
                onClick={() => setPage(p => Math.min(meta.last_page, p + 1))}
                className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-40"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Data Ops Health">
          <HealthScoreGauge 
            score={health.score ?? 0} 
            label={health.status} 
            statusText={health.score === null ? 'Not Assessed' : (health.score >= 80 ? 'Operational' : 'At Risk')}
            statusColor={health.score === null ? '#6b7280' : (health.score >= 80 ? '#16a34a' : '#dc2626')}
            metrics={[]} 
          />
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
