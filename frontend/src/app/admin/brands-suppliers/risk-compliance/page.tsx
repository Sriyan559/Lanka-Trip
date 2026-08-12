"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Clock, RefreshCw } from 'lucide-react';
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
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
];

const TABS = [
  { id: 'all', label: 'Overview' },
  { id: 'open_cases', label: 'Open Cases' },
  { id: 'critical_risk', label: 'Critical Risk' },
  { id: 'gaps', label: 'Compliance Gaps' },
  { id: 'restrictions', label: 'Restrictions' },
];

const ICON_MAP: Record<string, any> = {
  AlertTriangle, ShieldCheck, Clock
};

export default function SupplierRiskCompliancePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getRiskComplianceDashboard({ search, status: activeTab, page, per_page: 15 });
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
  const suppliersList = data?.suppliers?.data || [];
  const meta = data?.suppliers ? {
    current_page: data.suppliers.current_page || 1,
    per_page: data.suppliers.per_page || 15,
    total: data.suppliers.total || 0,
    last_page: data.suppliers.last_page || 1,
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
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Risk &amp; Compliance</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Risk &amp; Compliance</h1>
            <p className="text-xs text-gray-500 mt-1">Assess risk exposure, audit compliance posture, track remediations, and manage restrictions.</p>
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
            const IconComponent = ICON_MAP[kpi.icon] || AlertTriangle;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* RISK ANALYTICS CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
          <ChartCard title="Supplier Risk &amp; Compliance Trajectory (30 Days)" subtitle="Historical risk case trends &amp; compliance scores" loading={loading}>
            <TrendChart data={data?.trend || []} colors={['#dc2626', '#f59e0b', '#16a34a']} />
          </ChartCard>

          <ChartCard title="Supplier Risk Level Distribution" subtitle="Risk tier breakdown" loading={loading}>
            <DonutDistributionChart 
              data={donutData} 
              totalLabel="Risk Profiles" 
              totalValue={donutData.reduce((a: any, c: any) => a + (c.value || 0), 0).toLocaleString()} 
            />
          </ChartCard>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setPage(1); }} />
        
        <FilterToolbar 
          searchPlaceholder="Search supplier name, ref..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={() => { setPage(1); fetchDashboard(); }}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('all'); setPage(1); }}
        />

        {/* Supplier Risk Portfolio Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Supplier Risk Portfolio ({meta.total})</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">Supplier Name / Entity</th>
                  <th className="px-3 py-2">Supplier ID</th>
                  <th className="px-3 py-2">Business Type</th>
                  <th className="px-3 py-2">Verification State</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Updated At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {suppliersList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-gray-400">
                      No supplier risk records found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  suppliersList.map((row: any) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-bold text-gray-900">{row.company_name || row.store_name}</td>
                      <td className="px-3 py-2 text-rose-800 font-bold">{row.id}</td>
                      <td className="px-3 py-2 text-gray-600 capitalize">{row.business_type || 'N/A'}</td>
                      <td className="px-3 py-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 capitalize">
                          {row.verification_status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize ${
                          row.risk_level === 'low' ? 'bg-green-50 text-green-700' : (row.risk_level === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700')
                        }`}>
                          {row.risk_level} Risk
                        </span>
                      </td>
                      <td className="px-3 py-2 font-bold text-gray-900 capitalize">{row.status}</td>
                      <td className="px-3 py-2 text-gray-500">{row.updated_at ? new Date(row.updated_at).toLocaleDateString() : 'N/A'}</td>
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
        <RailSection title="Risk Health">
          <HealthScoreGauge 
            score={health.score ?? 0} 
            label={health.status} 
            statusText={health.score === null ? 'Not Assessed' : (health.score >= 80 ? 'Healthy' : 'At Risk')}
            statusColor={health.score === null ? '#6b7280' : (health.score >= 80 ? '#16a34a' : '#dc2626')}
            metrics={[]} 
          />
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
