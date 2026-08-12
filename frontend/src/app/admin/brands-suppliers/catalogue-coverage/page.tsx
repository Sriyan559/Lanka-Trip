"use client";

import React, { useState, useEffect } from 'react';
import { 
  Package, CheckCircle2, Clock, AlertTriangle, 
  FileText, Layers, AlertCircle, RefreshCw
} from 'lucide-react';
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
  { id: 'overview', label: 'Overview' },
  { id: 'all', label: 'All Supplier Products' },
  { id: 'ready', label: 'Publication Ready' },
  { id: 'pending', label: 'Pending Approval' },
];

const ICON_MAP: Record<string, any> = {
  Package, CheckCircle2, Clock, FileText, AlertTriangle, AlertCircle, Layers, RefreshCw
};

export default function SupplierCatalogueCoveragePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);



  const [page, setPage] = useState(1);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getCatalogueCoverageDashboard({ search, status: activeTab, page, per_page: 15 });
      setDashboardData(res);
    } catch (err) {
      console.error("Failed to load catalogue coverage dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [activeTab, page]);

  const kpis = dashboardData?.kpis || [];
  const productsList = dashboardData?.products?.data || [];
  const meta = dashboardData?.products ? {
    current_page: dashboardData.products.current_page || 1,
    per_page: dashboardData.products.per_page || 15,
    total: dashboardData.products.total || 0,
    last_page: dashboardData.products.last_page || 1,
  } : { current_page: 1, per_page: 15, total: 0, last_page: 1 };
  const health = dashboardData?.health || { score: null, status: 'Not Assessed' };

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Catalogue Coverage</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Product &amp; Catalogue Coverage</h1>
            <p className="text-xs text-gray-500 mt-1">Track supplier product catalogue completeness, authorization readiness, inventory status and publication state.</p>
          </div>
          <button 
            onClick={fetchDashboard} 
            className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600 hover:text-gray-900"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync Live Data</span>
          </button>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced={dashboardData?.lastSynced || 'Just now'} accessNote="Access limited to assigned business context" />

        {/* KPI Grid */}
        <DashboardGrid>
          {kpis.map((kpi: any) => {
            const IconComponent = ICON_MAP[kpi.icon] || Package;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* CATALOGUE COVERAGE CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
          <ChartCard title="Supplier Catalogue Growth &amp; Readiness Trend (30 Days)" subtitle="Historical SKU additions and publication readiness" loading={loading}>
            <TrendChart data={dashboardData?.trend || []} colors={['#2563eb', '#16a34a', '#dc2626']} />
          </ChartCard>

          <ChartCard title="Supplier Catalogue Composition" subtitle="Product breakdown by category &amp; brand" loading={loading}>
            <DonutDistributionChart data={dashboardData?.donut || []} totalLabel="SKUs" totalValue={(dashboardData?.donut || []).reduce((a: any, c: any) => a + (c.value || 0), 0).toLocaleString()} />
          </ChartCard>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setPage(1); }} />
        
        <FilterToolbar 
          searchPlaceholder="Search product name, SKU..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={() => { setPage(1); fetchDashboard(); }}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('overview'); setPage(1); }}
        />

        {/* Product Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Supplier Products ({meta.total})</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">Product Name</th>
                  <th className="px-3 py-2">SKU / Code</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Brand</th>
                  <th className="px-3 py-2">Stock</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Updated At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {productsList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-gray-400">
                      No supplier products found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  productsList.map((row: any) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-bold text-gray-900">{row.name}</td>
                      <td className="px-3 py-2 text-gray-600 font-mono text-[10px]">{row.sku || 'N/A'}</td>
                      <td className="px-3 py-2 text-gray-600">{row.supplier?.company_name || 'N/A'}</td>
                      <td className="px-3 py-2 text-gray-600">{row.brand?.name || 'N/A'}</td>
                      <td className="px-3 py-2 font-bold text-gray-900">{row.stock_quantity ?? 0}</td>
                      <td className="px-3 py-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize ${
                          row.status === 'published' || row.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
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
        <RailSection title="Catalogue Health">
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
