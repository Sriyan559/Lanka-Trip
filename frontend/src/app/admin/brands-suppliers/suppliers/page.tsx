"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, ShieldCheck, Hourglass, FilePlus, AlertTriangle, 
  PauseCircle, Clock, AlertCircle, FileText, MoreVertical, RefreshCw
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';
import { HorizontalStatusChart } from '@/components/admin/shared/HorizontalStatusChart';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Supplier Scope', value: 'Active Supplier Network' },
];

const TABS = [
  { id: 'all', label: 'All Suppliers' },
  { id: 'active', label: 'Active' },
  { id: 'pending', label: 'Pending Verification' },
  { id: 'info', label: 'Information Requested' },
  { id: 'restricted', label: 'Restricted' },
  { id: 'suspended', label: 'Suspended' },
  { id: 'archived', label: 'Archived' },
  { id: 'high-risk', label: 'High Risk' },
];

const ICON_MAP: Record<string, any> = {
  Users, UserCheck, ShieldCheck, Hourglass, FilePlus, AlertCircle, AlertTriangle, PauseCircle, FileText, Clock
};

export default function SupplierManagementPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getSuppliersDashboard({
        search,
        status: activeTab,
        page,
        per_page: 15,
      });
      setDashboardData(res);
      if (res?.suppliers?.data && res.suppliers.data.length > 0) {
        setSelectedSupplier(res.suppliers.data[0]);
      } else {
        setSelectedSupplier(null);
      }
    } catch (err) {
      console.error("Failed to load supplier dashboard:", err);
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

  const kpis = dashboardData?.kpis || [];
  const suppliersTable = dashboardData?.suppliers?.data || [];
  const meta = dashboardData?.suppliers?.meta || { current_page: 1, per_page: 15, total: 0, last_page: 1 };
  const health = dashboardData?.health || { score: null, status: 'Not Assessed' };
  const lastSynced = dashboardData?.lastSynced || 'Just now';

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Suppliers</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Management</h1>
            <p className="text-xs text-gray-500 mt-1">Manage supplier relationships, monitor compliance, verify readiness, track performance and control supplier network operations across the beauty marketplace.</p>
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
        <ContextScopeBar 
          items={CONTEXT_ITEMS} 
          lastSynced={lastSynced} 
          accessNote="Access limited to assigned business context"
        />

        {/* 12 KPI Grid */}
        <DashboardGrid>
          {kpis.map((kpi: any) => {
            const IconComponent = ICON_MAP[kpi.icon] || Users;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setPage(1); }} />
        
        <FilterToolbar 
          searchPlaceholder="Search suppliers..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={handleSearchSubmit}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('all'); setPage(1); }}
        />

        {/* Supplier Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Suppliers ({meta.total})</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1500px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 text-center w-8"><input type="checkbox" className="rounded border-gray-300 text-[#7a0023]" /></th>
                  <th className="px-3 py-2">Supplier Name / Legal Entity</th>
                  <th className="px-3 py-2">Supplier ID</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Country</th>
                  <th className="px-3 py-2">BU</th>
                  <th className="px-3 py-2 text-center">Active Brands</th>
                  <th className="px-3 py-2 text-center">Active Products</th>
                  <th className="px-3 py-2">Verification Status</th>
                  <th className="px-3 py-2">Compliance</th>
                  <th className="px-3 py-2">Authorization Coverage</th>
                  <th className="px-3 py-2">Contract Status</th>
                  <th className="px-3 py-2">Catalogue Readiness</th>
                  <th className="px-3 py-2">Channel Eligibility</th>
                  <th className="px-3 py-2">Region Coverage</th>
                  <th className="px-3 py-2">Performance Score</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Owner / Reviewer</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {suppliersTable.length === 0 ? (
                  <tr>
                    <td colSpan={20} className="px-3 py-8 text-center text-gray-400">
                      No supplier records found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  suppliersTable.map((row: any) => (
                    <tr 
                      key={row.id} 
                      onClick={() => setSelectedSupplier(row)}
                      className={`hover:bg-gray-50 cursor-pointer ${selectedSupplier?.id === row.id ? 'bg-[#7a0023]/5' : ''}`}
                    >
                      <td className="px-3 py-2 text-center" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-gray-300 text-[#7a0023]" /></td>
                      <td className="px-3 py-2">
                        <div className="text-gray-900 font-bold">{row.name}</div>
                        <div className="text-gray-400 text-[10px]">{row.legalName}</div>
                      </td>
                      <td className="px-3 py-2 text-gray-500 font-medium">{row.id}</td>
                      <td className="px-3 py-2 text-gray-600">{row.type}</td>
                      <td className="px-3 py-2 text-gray-600">{row.country}</td>
                      <td className="px-3 py-2 text-gray-600">{row.bu}</td>
                      <td className="px-3 py-2 text-center font-semibold text-gray-900">{row.activeBrands}</td>
                      <td className="px-3 py-2 text-center font-semibold text-gray-900">{row.activeProducts}</td>
                      <td className="px-3 py-2 font-semibold">
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                          row.verification === 'Verified' ? 'text-green-700 bg-green-50' : 
                          row.verification === 'Suspended' ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50'
                        }`}>
                          {row.verification}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-semibold">
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                          row.compliance === 'Compliant' ? 'text-green-700 bg-green-50' : 
                          row.compliance === 'Non-Compliant' ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50'
                        }`}>
                          {row.compliance}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-700 font-semibold">{row.coverage}</td>
                      <td className="px-3 py-2 font-semibold">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          row.status === 'Active' ? 'text-green-700 bg-green-50 border border-green-200' : 'text-red-700 bg-red-50 border border-red-200'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-600">{row.catalogue}</td>
                      <td className="px-3 py-2 text-gray-600">{row.channel}</td>
                      <td className="px-3 py-2 text-gray-600">{row.region}</td>
                      <td className="px-3 py-2 font-bold text-green-600">{row.perf}</td>
                      <td className="px-3 py-2">
                        <span className={`font-bold ${row.risk === 'Low' ? 'text-green-600' : 'text-red-600'}`}>{row.risk}</span>
                      </td>
                      <td className="px-3 py-2 text-gray-500">{row.owner}</td>
                      <td className="px-3 py-2 text-gray-400">{row.updated}</td>
                      <td className="px-3 py-2 text-center" onClick={(e) => e.stopPropagation()}>
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

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Brands &amp; Suppliers Health">
          <HealthScoreGauge 
            score={health.score ?? 0} 
            label={health.status} 
            statusText={health.score === null ? 'Not Assessed' : (health.score >= 80 ? 'Healthy' : 'At Risk')}
            statusColor={health.score === null ? '#6b7280' : (health.score >= 80 ? '#16a34a' : '#dc2626')}
            metrics={[
              { label: 'Verification Coverage', value: health.score !== null ? `${health.score}%` : 'N/A', progress: health.score ?? 0 },
              { label: 'Authorization Readiness', value: '100%', progress: 100 },
              { label: 'Contract Compliance', value: '100%', progress: 100 },
              { label: 'Catalogue Coverage', value: '100%', progress: 100 },
            ]}
          />
        </RailSection>

        {/* Selected Supplier Preview Card */}
        <RailSection title="Selected Supplier Preview">
          {selectedSupplier ? (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex flex-col gap-2">
              <div className="font-bold text-gray-900 text-xs">{selectedSupplier.name}</div>
              <div className="text-[10px] text-gray-500">{selectedSupplier.legalName}</div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] border-t border-gray-200 pt-2 mt-1">
                <div><span className="text-gray-400">ID:</span> <span className="font-semibold">{selectedSupplier.id}</span></div>
                <div><span className="text-gray-400">Type:</span> <span className="font-semibold">{selectedSupplier.type}</span></div>
                <div><span className="text-gray-400">Country:</span> <span className="font-semibold">{selectedSupplier.country}</span></div>
                <div><span className="text-gray-400">BU:</span> <span className="font-semibold">{selectedSupplier.bu}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] border-t border-gray-200 pt-2">
                <div><span className="text-gray-400">Verification:</span> <span className="font-semibold text-green-600">{selectedSupplier.verification}</span></div>
                <div><span className="text-gray-400">Lifecycle:</span> <span className="font-semibold text-blue-600">{selectedSupplier.status}</span></div>
                <div><span className="text-gray-400">Risk Level:</span> <span className="font-semibold text-green-600">{selectedSupplier.risk}</span></div>
                <div><span className="text-gray-400">Perf Score:</span> <span className="font-semibold text-gray-900">{selectedSupplier.perf}</span></div>
              </div>
              <a href={`/admin/brands-suppliers/suppliers/${selectedSupplier.raw_id || selectedSupplier.id}`} className="mt-2 text-center bg-[#7a0023] text-white font-semibold py-1 rounded text-[11px] hover:bg-[#a0002b] transition-colors">
                Open Supplier Workspace →
              </a>
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded">
              No supplier selected
            </div>
          )}
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700 flex items-center gap-1"><AlertTriangle size={12} className="text-red-500" /> High-risk suppliers</span><span className="font-bold text-red-500">{kpis.find((k: any) => k.title === 'High-Risk Suppliers')?.value || '0'}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700 flex items-center gap-1"><AlertTriangle size={12} className="text-amber-500" /> Pending verification</span><span className="font-bold text-amber-500">{kpis.find((k: any) => k.title === 'Pending Verification')?.value || '0'}</span></div>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
