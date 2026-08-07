'use client';

import React, { useEffect, useState } from 'react';
import { BrandsSuppliersPageHeader } from '@/components/admin/brands-suppliers/BrandsSuppliersPageHeader';
import { RightInsightRail, RailHealthScore, RailAlertList, RailQueueList, RailSection } from '@/components/admin/brands-suppliers/RightInsightRail';
import { SupplierDataTable } from '@/components/admin/brands-suppliers/SupplierDataTable';
import { DonutChartCard } from '@/components/admin/brands-suppliers/charts/DonutChartCard';
import { TrendChartCard } from '@/components/admin/brands-suppliers/charts/TrendChartCard';
import { suppliersApi } from '@/services/api/suppliers';
import { brandsSuppliersApi } from '@/services/api/brandsSuppliers';
import { Download, FileText, UserPlus, CheckCircle, Clock, AlertTriangle, AlertCircle, Pause, FileWarning, Search, Filter, SlidersHorizontal, User, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BrandsSuppliersBottomPanels } from '@/components/admin/brands-suppliers/BrandsSuppliersBottomPanels';
import { getSupplierDirectoryBottomPanelConfig } from '@/features/brands-suppliers/config/brandsSuppliersCommandCenter.config';

export default function SupplierManagementPage() {
  const router = useRouter();
  const [kpis, setKpis] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [composition, setComposition] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('All Suppliers');
  // Pagination state — page-local, resets on tab change
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const PAGE_TOTAL = 842; // Replace with real API total when available

  useEffect(() => {
    brandsSuppliersApi.getCommandCenterKPIs().then(setKpis);
    suppliersApi.getSuppliers().then(setSuppliers);
    brandsSuppliersApi.getSupplierComposition().then(setComposition);
    brandsSuppliersApi.getRecentActivity().then(setActivity);
  }, []);

  const tabs = ['All Suppliers', 'Active', 'Pending Verification', 'Information Requested', 'Restricted', 'Suspended', 'Archived', 'High Risk'];

  const getStatusIcon = (status?: string, id?: string) => {
    if (id === '1') return <UserPlus size={18} className="text-gray-500" />;
    if (status === 'success') return <CheckCircle size={18} className="text-green-600" />;
    if (status === 'warning') return <Clock size={18} className="text-orange-500" />;
    if (status === 'danger') return <AlertTriangle size={18} className="text-red-500" />;
    if (status === 'info') return <AlertCircle size={18} className="text-blue-500" />;
    if (id === '9') return <Pause size={18} className="text-purple-500" />;
    if (id === '11') return <FileWarning size={18} className="text-orange-500" />;
    return <AlertCircle size={18} className="text-gray-500" />;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'danger': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-900';
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`/admin/brands-suppliers/suppliers/${id}`);
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === suppliers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(suppliers.map(s => s.id));
    }
  };

  // Reset selection and page when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(1);
    setSelectedIds([]);
  };

  const trendData = [
    { name: 'Jul 6', new: 10, approved: 8, rejected: 2 },
    { name: 'Jul 13', new: 15, approved: 12, rejected: 3 },
    { name: 'Jul 20', new: 25, approved: 20, rejected: 5 },
    { name: 'Jul 27', new: 30, approved: 28, rejected: 4 },
    { name: 'Aug 3', new: 42, approved: 35, rejected: 6 },
  ];

  const trendSeries = [
    { key: 'new', name: 'New Applications', color: '#3b82f6', type: 'line' as const },
    { key: 'approved', name: 'Approved', color: '#10b981', type: 'line' as const },
    { key: 'rejected', name: 'Rejected', color: '#ef4444', type: 'bar' as const },
  ];

  return (
    <div className="flex h-full w-full bg-[#f8fafc]">
      <div className="flex-1 overflow-auto p-6 flex flex-col">
        <BrandsSuppliersPageHeader
          title="Supplier Management"
          description="Manage supplier relationships, monitor compliance, verify readiness, track performance and control supplier network operations across the beauty marketplace."
          breadcrumbs={[
            { label: 'Brands & Suppliers', href: '/admin/brands-suppliers' },
            { label: 'Suppliers' }
          ]}
        />

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
          {kpis.map((kpi) => (
            <div key={kpi.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">{kpi.id} {kpi.label}</span>
                <div className="p-1.5 rounded-full bg-gray-50 border border-gray-100">
                  {getStatusIcon(kpi.status, kpi.id)}
                </div>
              </div>
              <div className="flex items-end gap-2 mt-auto">
                <span className={`text-2xl font-bold ${getStatusColor(kpi.status)}`}>{kpi.value}</span>
                {kpi.trend && (
                  <span className={`text-xs font-medium mb-1 ${kpi.trendDirection === 'down' ? 'text-red-500' : 'text-green-500'}`}>
                    {kpi.trendDirection === 'down' ? '↓' : '↑'} {kpi.trend}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-4 px-2 overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-[#7a122e] text-[#7a122e]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search suppliers..." className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md outline-none focus:border-[#7a122e] focus:ring-1 focus:ring-[#7a122e]" />
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Supplier Type</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Supplier Status</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Verification Status</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Compliance Status</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Authorization Status</option>
            </select>
            
            <div className="flex items-center gap-2 ml-auto">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <SlidersHorizontal size={14} /> More Filters
              </button>
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700">Clear All</button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#7a122e] bg-white border border-[#7a122e] rounded-md hover:bg-red-50">
                Save View
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Channel Eligibility</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Risk Level</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Country / Region</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Business Unit</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Owner</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Updated Date</option>
            </select>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2">
            <TrendChartCard
              title="Supplier Onboarding Trend"
              data={trendData}
              series={trendSeries}
              timeRange="Last 30 Days"
            />
          </div>
          <div className="xl:col-span-1">
            <DonutChartCard
              title="Supplier Composition"
              data={composition}
              totalLabel="Total"
              totalValue={842}
            />
          </div>
        </div>
        
        {/* Verification & Auth Summaries Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Supplier Verification Operations</h3>
             </div>
             <div className="grid grid-cols-5 gap-4 divide-x divide-gray-100">
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Submitted</span>
                 <span className="text-xl font-bold text-gray-900">142</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 5.9%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Under Review</span>
                 <span className="text-xl font-bold text-gray-900">98</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 3.2%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">KYC Check</span>
                 <span className="text-xl font-bold text-gray-900">76</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 5.1%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Commercial Review</span>
                 <span className="text-xl font-bold text-gray-900">64</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 6.7%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Approved</span>
                 <span className="text-xl font-bold text-gray-900">512</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 4.3%</span>
               </div>
             </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Brand Authorization Operations</h3>
             </div>
             <div className="grid grid-cols-4 gap-4 divide-x divide-gray-100">
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Submitted</span>
                 <span className="text-xl font-bold text-gray-900">68</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 7.9%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Legal Review</span>
                 <span className="text-xl font-bold text-gray-900">44</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 6.6%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Approved</span>
                 <span className="text-xl font-bold text-gray-900">486</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 5.3%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Rejected</span>
                 <span className="text-xl font-bold text-gray-900">12</span>
                 <span className="text-[10px] text-red-500 font-medium">↓ 2.3%</span>
               </div>
             </div>
          </div>
        </div>

        {/* Supplier Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Suppliers (842)</h3>
            {selectedIds.length > 0 && (
               <div className="flex items-center gap-3">
                 <span className="text-sm text-gray-500">{selectedIds.length} selected</span>
                 <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded px-3 py-1 hover:bg-gray-50">Bulk Actions</button>
               </div>
            )}
          </div>
          <SupplierDataTable 
            data={suppliers} 
            onRowClick={handleRowClick}
            selectedIds={selectedIds}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
            page={page}
            pageSize={pageSize}
            totalItems={PAGE_TOTAL}
            onPageChange={setPage}
            onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
          />
        </div>

        {/* Bottom Panels — Supplier Directory specific config */}
        <div className="mb-6">
          <BrandsSuppliersBottomPanels {...getSupplierDirectoryBottomPanelConfig()} />
        </div>

      </div>

      <RightInsightRail>
        <RailSection title="Brands & Suppliers Health" action={{ label: 'View health dashboard' }}>
          <RailHealthScore 
            score={89} 
            label=""
            status="Stable" 
            metrics={[
              { label: 'Verification Coverage', value: '92%' },
              { label: 'Authorization Readiness', value: '88%' },
              { label: 'Contract Compliance', value: '85%' },
              { label: 'Catalogue Coverage', value: '91%' },
              { label: 'Supplier Performance', value: '86%' },
              { label: 'SLA Health', value: '84%' },
              { label: 'Risk Control', value: '82%' },
              { label: 'Audit Readiness', value: '94%' },
            ]} 
          />
        </RailSection>

        {selectedIds.length === 1 && (
          <RailSection title="Selected Supplier Preview">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 truncate">LVMH Beauty Mfg.</span>
                <span className="text-xs text-gray-500">LVMH Beauty Manufacturing SAS</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                 <div className="flex flex-col">
                   <span className="text-gray-500 mb-0.5">Reg. No.</span>
                   <span className="font-medium text-gray-900">FR123456789</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-gray-500 mb-0.5">Type</span>
                   <span className="font-medium text-gray-900">Manufacturer</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-gray-500 mb-0.5">Business Unit</span>
                   <span className="font-medium text-gray-900">Fragrance / Skincare</span>
                 </div>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-3 mt-1">
                 <div className="flex flex-col items-center">
                   <span className="text-gray-500 mb-1">Active Brands</span>
                   <span className="font-semibold text-gray-900 text-lg">24</span>
                 </div>
                 <div className="flex flex-col items-center">
                   <span className="text-gray-500 mb-1">Authorizations</span>
                   <span className="font-semibold text-gray-900 text-lg">12</span>
                 </div>
                 <div className="flex flex-col items-center">
                   <span className="text-gray-500 mb-1">Active Products</span>
                   <span className="font-semibold text-gray-900 text-lg">186</span>
                 </div>
              </div>
              <button 
                className="mt-2 w-full flex items-center justify-center py-1.5 border border-[#7a122e] text-[#7a122e] text-sm font-medium rounded hover:bg-red-50 transition-colors"
                onClick={() => handleRowClick(selectedIds[0])}
              >
                Open Supplier Detail
              </button>
            </div>
          </RailSection>
        )}

        <RailSection title="Priority Alerts" action={{ label: 'View all' }}>
          <RailAlertList items={[
            { label: 'High-risk supplier application', count: 12, critical: true },
            { label: 'Expiring authorizations (30 days)', count: 18, critical: true },
            { label: 'SLA breach - verification', count: 7, critical: true },
            { label: 'Unauthorized brand use detected', count: 5, critical: true },
            { label: 'Missing KYC documents', count: 14, critical: false },
            { label: 'Contract renewal overdue', count: 9, critical: true },
          ]} />
        </RailSection>

        <RailSection title="Verification Status Summary">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-green-500 rounded-full" />
                <span className="text-gray-700">Verified</span>
              </div>
              <span className="text-gray-500">612 <span className="text-gray-400 text-[10px]">(72.7%)</span></span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1.5 bg-orange-400 rounded-full" />
                <span className="text-gray-700">Pending</span>
              </div>
              <span className="text-gray-500">128 <span className="text-gray-400 text-[10px]">(15.2%)</span></span>
            </div>
          </div>
        </RailSection>
        
        <RailSection title="Quick Queues">
          <RailQueueList items={[
            { label: 'My Reviews', count: 24, icon: <UserPlus size={16} /> },
            { label: 'Pending Verification', count: 128, icon: <Clock size={16} /> },
            { label: 'High-Risk Cases', count: 12, icon: <AlertTriangle size={16} /> },
            { label: 'Expiring Authorizations', count: 18, icon: <FileWarning size={16} /> },
            { label: 'Contract Renewals', count: 26, icon: <FileText size={16} /> },
            { label: 'Catalogue Gaps', count: 42, icon: <AlertCircle size={16} /> },
          ]} />
        </RailSection>
      </RightInsightRail>
    </div>
  );
}
