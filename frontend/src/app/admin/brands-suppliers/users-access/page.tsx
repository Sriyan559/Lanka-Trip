"use client";

import React, { useState, useEffect } from 'react';
import { Users, UserCheck, ShieldCheck, Clock, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react';
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
];

const TABS = [
  { id: 'all', label: 'Overview' },
  { id: 'active', label: 'Active Users' },
  { id: 'pending', label: 'Pending Invitations' },
  { id: 'privileged', label: 'Privileged' },
  { id: 'suspended', label: 'Suspended' },
];

const ICON_MAP: Record<string, any> = {
  Users, UserCheck, ShieldCheck, Clock, AlertTriangle, AlertCircle
};

export default function SupplierUsersAccessPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getUsersAccessDashboard({ search, status: activeTab, page, per_page: 15 });
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
  const usersList = data?.users?.data || [];
  const meta = data?.users ? {
    current_page: data.users.current_page || 1,
    per_page: data.users.per_page || 15,
    total: data.users.total || 0,
    last_page: data.users.last_page || 1,
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
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Users &amp; Access</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Users, Roles &amp; Access</h1>
            <p className="text-xs text-gray-500 mt-1">Manage user accounts, assigned roles, permissions, MFA enforcement, and access reviews.</p>
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
            const IconComponent = ICON_MAP[kpi.icon] || Users;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* ACCESS ANALYTICS CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
          <ChartCard title="Supplier Access Activity Trend (30 Days)" subtitle="User logins and active sessions trajectory" loading={loading}>
            <TrendChart data={data?.trend || []} colors={['#2563eb', '#16a34a']} />
          </ChartCard>

          <ChartCard title="User Role Distribution" subtitle="Role breakdown" loading={loading}>
            <DonutDistributionChart 
              data={donutData} 
              totalLabel="Users" 
              totalValue={donutData.reduce((a: any, c: any) => a + (c.value || 0), 0).toLocaleString()} 
            />
          </ChartCard>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setPage(1); }} />
        
        <FilterToolbar 
          searchPlaceholder="Search user name, email..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={() => { setPage(1); fetchDashboard(); }}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('all'); setPage(1); }}
        />

        {/* Supplier Users Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Supplier User Portfolio ({meta.total})</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">User Name</th>
                  <th className="px-3 py-2">Email Address</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Supplier ID</th>
                  <th className="px-3 py-2">MFA Status</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Updated At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {usersList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-gray-400">
                      No supplier users found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  usersList.map((row: any) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-bold text-gray-900">{row.name}</td>
                      <td className="px-3 py-2 text-gray-600 font-mono text-[10px]">{row.email}</td>
                      <td className="px-3 py-2 font-semibold capitalize text-[#7a0023]">{row.role || 'Supplier User'}</td>
                      <td className="px-3 py-2 text-gray-600 font-bold">{row.supplier_id || 'N/A'}</td>
                      <td className="px-3 py-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          row.mfa_enabled ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {row.mfa_enabled ? 'Enforced' : 'Missing'}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-bold text-gray-900 capitalize">{row.status || 'Active'}</td>
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
        <RailSection title="Access Security Health">
          <HealthScoreGauge 
            score={health.score ?? 0} 
            label={health.status} 
            statusText={health.score === null ? 'Not Assessed' : (health.score >= 80 ? 'Secure' : 'At Risk')}
            statusColor={health.score === null ? '#6b7280' : (health.score >= 80 ? '#16a34a' : '#dc2626')}
            metrics={[]} 
          />
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
