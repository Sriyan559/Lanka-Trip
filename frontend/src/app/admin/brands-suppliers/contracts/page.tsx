"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, CheckCircle2, Clock, AlertTriangle, 
  FilePlus, ShieldAlert, AlertCircle, RefreshCw, MoreVertical
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
];

const TABS = [
  { id: 'all', label: 'All Contracts' },
  { id: 'active', label: 'Active' },
  { id: 'draft', label: 'Draft' },
  { id: 'pending', label: 'Pending Approval' },
  { id: 'awaiting', label: 'Awaiting Signature' },
  { id: 'expired', label: 'Expired' },
];

const ICON_MAP: Record<string, any> = {
  FileText, CheckCircle2, FilePlus, Clock, AlertCircle, AlertTriangle, ShieldAlert
};

export default function SupplierContractsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getContractsDashboard({
        search,
        status: activeTab,
        page,
        per_page: 15,
      });
      setDashboardData(res);
    } catch (err) {
      console.error("Failed to load contracts dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [activeTab, page]);

  const kpis = dashboardData?.kpis || [];
  const contractsList = dashboardData?.contracts?.data || [];
  const meta = dashboardData?.contracts ? {
    current_page: dashboardData.contracts.current_page || 1,
    per_page: dashboardData.contracts.per_page || 15,
    total: dashboardData.contracts.total || 0,
    last_page: dashboardData.contracts.last_page || 1,
  } : { current_page: 1, per_page: 15, total: 0, last_page: 1 };

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Contracts</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Contracts &amp; Agreements</h1>
            <p className="text-xs text-gray-500 mt-1">Manage supplier contracts, monitor renewals, track obligations and ensure legal compliance.</p>
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
            const IconComponent = ICON_MAP[kpi.icon] || FileText;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setPage(1); }} />
        
        <FilterToolbar 
          searchPlaceholder="Search contracts..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={() => { setPage(1); fetchDashboard(); }}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('all'); setPage(1); }}
        />

        {/* Contracts Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Contract Portfolio ({meta.total})</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1200px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">Contract Title / Ref</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Start Date</th>
                  <th className="px-3 py-2">End Date</th>
                  <th className="px-3 py-2">Value Amount</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {contractsList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-3 py-8 text-center text-gray-400">
                      No contract records found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  contractsList.map((row: any) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <div className="text-gray-900 font-bold">{row.contract_name}</div>
                        <div className="text-gray-400 text-[10px]">{row.contract_number}</div>
                      </td>
                      <td className="px-3 py-2 text-gray-600">{row.supplier?.company_name || 'N/A'}</td>
                      <td className="px-3 py-2 text-gray-600 capitalize">{row.contract_type}</td>
                      <td className="px-3 py-2 font-semibold">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          row.status === 'active' ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-600">{row.start_date || 'N/A'}</td>
                      <td className="px-3 py-2 text-gray-600">{row.end_date || 'N/A'}</td>
                      <td className="px-3 py-2 font-bold text-gray-900">{row.currency} {number_format(row.value_amount || 0)}</td>
                      <td className="px-3 py-2 text-center">
                        <button className="text-gray-400 hover:text-gray-900"><MoreVertical size={14} /></button>
                      </td>
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
        <RailSection title="Contract Health">
          <HealthScoreGauge score={100} label="Healthy" statusText="Compliant" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}

function number_format(num: number) {
  return new Intl.NumberFormat().format(num);
}
