"use client";

import React, { useState, useEffect } from 'react';
import { 
  Award, CheckCircle2, Clock, AlertTriangle, ChevronDown, 
  FileText, ShieldAlert, AlertCircle, RefreshCw, Eye, ShieldCheck, FilePlus
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';
import { HorizontalStatusChart } from '@/components/admin/shared/HorizontalStatusChart';
import { ChartCard } from '@/components/admin/shared/ChartCard';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Scope', value: 'Active Brand Authorizations' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'all', label: 'All Authorizations' },
  { id: 'active', label: 'Active' },
  { id: 'pending', label: 'Pending Review' },
  { id: 'legal', label: 'Legal Review' },
  { id: 'expiring', label: 'Expiring Soon' },
  { id: 'expired', label: 'Expired' },
  { id: 'conflicts', label: 'Territory Conflicts' },
  { id: 'violations', label: 'Channel Violations' },
];

const ICON_MAP: Record<string, any> = {
  Award, CheckCircle2, Clock, FileText, AlertCircle, AlertTriangle, ShieldAlert, ShieldCheck, FilePlus
};

export default function AuthorizationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await brandsSuppliersApi.getContractsDashboard({
        search,
        status: activeTab,
        page,
        per_page: 15,
      });
      setDashboardData(res);
    } catch (err: any) {
      console.error("Failed to load authorizations dashboard:", err);
      setError(err?.message || "Failed to connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [activeTab, page]);

  const handleSearchSubmit = () => {
    setPage(1);
    fetchDashboard();
  };

  const kpis = dashboardData?.kpis || [
    { index: 1, title: 'Total Brand Authorizations', value: '0', icon: 'Award', iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
    { index: 2, title: 'Active Authorizations', value: '0', icon: 'CheckCircle2', iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { index: 3, title: 'Pending Review', value: '0', icon: 'Clock', iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
    { index: 4, title: 'Legal Review', value: '0', icon: 'FileText', iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
    { index: 5, title: 'Expiring in 30 Days', value: '0', icon: 'AlertCircle', iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
    { index: 6, title: 'Expired Authorizations', value: '0', icon: 'AlertTriangle', iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
    { index: 7, title: 'Territory Conflicts', value: '0', icon: 'ShieldAlert', iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
    { index: 8, title: 'Channel Violations', value: '0', icon: 'AlertTriangle', iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
    { index: 9, title: 'Missing Auth Letters', value: '0', icon: 'FileText', iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    { index: 10, title: 'Exclusive Rights', value: '0', icon: 'ShieldCheck', iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    { index: 11, title: 'Non-Exclusive Rights', value: '0', icon: 'Award', iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
    { index: 12, title: 'Authorization SLA Breaches', value: '0', icon: 'Clock', iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  ];

  const trendData = dashboardData?.trend || [];
  const compositionData = dashboardData?.composition || [];
  const statusSummaryData = dashboardData?.statusSummary || [];
  const casesTable = dashboardData?.contracts?.data || [];
  const meta = dashboardData?.contracts?.meta || { current_page: 1, per_page: 15, total: 0, last_page: 1 };
  const healthScore = dashboardData?.health?.score ?? null;

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Authorizations</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Brand Authorization Management</h1>
            <p className="text-xs text-gray-500 mt-1">Manage brand authorizations, verify authorization letters, monitor exclusivity rights, handle territory conflicts, and enforce channel compliance.</p>
          </div>
          <button 
            onClick={fetchDashboard} 
            className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600 hover:text-gray-900 shadow-sm"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync Live Data</span>
          </button>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar 
          items={CONTEXT_ITEMS} 
          lastSynced="Just now" 
          accessNote="Access limited to assigned business context"
        />

        {/* ERROR BANNER */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-xs flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchDashboard} className="font-bold underline">Retry</button>
          </div>
        )}

        {/* 12 KPI Grid */}
        <DashboardGrid>
          {kpis.map((kpi: any) => {
            const IconComponent = ICON_MAP[kpi.icon] || Award;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard
            title="Brand Authorization Operations Trend"
            subtitle="30-day operational submission and review trajectory"
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
            className="lg:col-span-2 min-h-[280px]"
          >
            <TrendChart 
              data={trendData} 
              colors={['#16a34a', '#0284c7', '#9333ea', '#dc2626']} 
            />
          </ChartCard>

          <ChartCard
            title="Authorization Status Distribution"
            subtitle="Current active authorization state breakdown"
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
            className="min-h-[280px]"
          >
            <DonutDistributionChart 
              data={compositionData} 
              totalLabel="Authorizations" 
              totalValue={compositionData.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0).toLocaleString()} 
            />
          </ChartCard>
        </div>

        <ChartCard
          title="Territory & Exclusivity Summary"
          subtitle="Distribution of rights and territory compliance"
          loading={loading}
          error={error}
          onRetry={fetchDashboard}
        >
          <HorizontalStatusChart 
            data={statusSummaryData} 
            total={statusSummaryData.reduce((acc: number, curr: any) => acc + (curr.count || 0), 0)} 
          />
        </ChartCard>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setPage(1); }} />
        
        <FilterToolbar 
          searchPlaceholder="Search by case ID, brand, supplier, or territory..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={handleSearchSubmit}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('all'); setPage(1); }}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Brand Authorizations ({meta.total})</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1400px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 text-center w-8"><input type="checkbox" className="rounded" /></th>
                  <th className="px-3 py-2">Case ID</th>
                  <th className="px-3 py-2 font-bold">Brand</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Authorization Type</th>
                  <th className="px-3 py-2">Territory</th>
                  <th className="px-3 py-2">Start Date</th>
                  <th className="px-3 py-2">Expiry Date</th>
                  <th className="px-3 py-2">Exclusivity</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {casesTable.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-3 py-8 text-center text-gray-400">
                      No authorization records found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  casesTable.map((row: any, i: number) => (
                    <tr key={row.id || i} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-3 py-2 text-center"><input type="checkbox" className="rounded" /></td>
                      <td className="px-3 py-2 font-bold text-rose-800">{row.id}</td>
                      <td className="px-3 py-2 font-bold text-gray-900">{row.brand || 'N/A'}</td>
                      <td className="px-3 py-2 text-gray-600">{row.supplier || 'N/A'}</td>
                      <td className="px-3 py-2 text-gray-600">{row.type || 'Standard'}</td>
                      <td className="px-3 py-2 text-gray-600">{row.country || 'Sri Lanka'}</td>
                      <td className="px-3 py-2 text-gray-500">{row.start || 'N/A'}</td>
                      <td className="px-3 py-2 text-gray-500">{row.expiry || 'N/A'}</td>
                      <td className="px-3 py-2 font-semibold text-blue-600">{row.exclusivity || 'Non-Exclusive'}</td>
                      <td className="px-3 py-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          row.status === 'active' || row.status === 'Approved' ? 'bg-green-50 text-green-700' :
                          row.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {row.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button className="bg-[#171717] text-white px-2.5 py-1 rounded text-[10px] font-bold hover:bg-black">Open Case</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Authorization Readiness">
          <HealthScoreGauge 
            score={healthScore ?? 0} 
            label={healthScore === null ? "Not Assessed" : (healthScore >= 80 ? "Healthy" : "Needs Attention")} 
            statusText={healthScore === null ? "N/A" : `${healthScore}%`}
            statusColor={healthScore !== null && healthScore >= 80 ? "#16a34a" : "#d97706"}
            metrics={[
              { label: 'Active Authorizations', value: healthScore !== null ? `${healthScore}%` : 'N/A', progress: healthScore ?? 0 },
              { label: 'Exclusivity Compliance', value: '100%', progress: 100 },
              { label: 'Letter Authenticity', value: '100%', progress: 100 },
              { label: 'Territory Coverage', value: '100%', progress: 100 },
              { label: 'Expiry Management', value: '100%', progress: 100 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="text-xs text-gray-500 py-2">No active priority alerts present.</div>
        </RailSection>

        <RailSection title="Quick Queue">
          <div className="flex flex-col gap-1.5 text-xs text-gray-600">
            <div className="flex justify-between p-2 rounded bg-gray-50"><span>Pending Review</span><span className="font-bold">0</span></div>
            <div className="flex justify-between p-2 rounded bg-gray-50"><span>Legal Review Queue</span><span className="font-bold">0</span></div>
            <div className="flex justify-between p-2 rounded bg-gray-50"><span>SLA Breaches</span><span className="font-bold text-red-600">0</span></div>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
