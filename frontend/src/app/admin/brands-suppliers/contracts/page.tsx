'use client';

import React, { useEffect, useState } from 'react';
import { BrandsSuppliersPageHeader } from '@/components/admin/brands-suppliers/BrandsSuppliersPageHeader';
import { RightInsightRail, RailHealthScore, RailAlertList, RailQueueList, RailSection } from '@/components/admin/brands-suppliers/RightInsightRail';
import { supplierContractsApi } from '@/services/api/supplierContracts';
import { Download, FileText, UserPlus, CheckCircle, Clock, AlertTriangle, AlertCircle, Pause, FileWarning, Search, Filter, SlidersHorizontal, Calendar, Plus, Edit2, ShieldAlert } from 'lucide-react';
import { DonutChartCard } from '@/components/admin/brands-suppliers/charts/DonutChartCard';
import { TrendChartCard } from '@/components/admin/brands-suppliers/charts/TrendChartCard';

export default function ContractsAgreementsPage() {
  const [kpis, setKpis] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);

  useEffect(() => {
    supplierContractsApi.getContractsKPIs().then(setKpis);
    supplierContractsApi.getContracts().then(setContracts);
  }, []);

  const getStatusIcon = (status?: string, id?: string) => {
    if (id === '1') return <FileText size={18} className="text-gray-500" />;
    if (status === 'success') return <CheckCircle size={18} className="text-green-600" />;
    if (status === 'warning') return <Clock size={18} className="text-orange-500" />;
    if (status === 'danger') return <AlertTriangle size={18} className="text-red-500" />;
    if (status === 'info') return <AlertCircle size={18} className="text-blue-500" />;
    if (id === '9') return <FileWarning size={18} className="text-orange-500" />;
    if (id === '12') return <Pause size={18} className="text-gray-500" />;
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

  const trendData = [
    { name: 'Jul 6', draft: 10, approved: 8, active: 100, overdue: 2, renewed: 5 },
    { name: 'Jul 13', draft: 15, approved: 12, active: 120, overdue: 3, renewed: 8 },
    { name: 'Jul 20', draft: 25, approved: 20, active: 150, overdue: 5, renewed: 12 },
    { name: 'Jul 27', draft: 30, approved: 28, active: 160, overdue: 4, renewed: 15 },
    { name: 'Aug 3', draft: 42, approved: 35, active: 180, overdue: 6, renewed: 20 },
  ];

  const trendSeries = [
    { key: 'draft', name: 'Draft', color: '#6b7280', type: 'line' as const },
    { key: 'approved', name: 'Approved', color: '#3b82f6', type: 'line' as const },
    { key: 'active', name: 'Active', color: '#10b981', type: 'line' as const },
    { key: 'overdue', name: 'Overdue', color: '#ef4444', type: 'line' as const },
    { key: 'renewed', name: 'Renewed', color: '#8b5cf6', type: 'line' as const },
  ];

  const composition = [
    { name: 'Active', value: 612, percentage: '72.7%', color: '#10b981' },
    { name: 'Pending Approval', value: 28, percentage: '3.3%', color: '#3b82f6' },
    { name: 'Awaiting Signature', value: 22, percentage: '2.6%', color: '#f59e0b' },
    { name: 'Renewal Due', value: 26, percentage: '3.1%', color: '#f97316' },
    { name: 'Overdue', value: 9, percentage: '1.1%', color: '#ef4444' },
    { name: 'Expired', value: 31, percentage: '3.7%', color: '#dc2626' },
    { name: 'Suspended', value: 60, percentage: '7.1%', color: '#8b5cf6' },
  ];

  const tabs = ['All Contracts', 'Active', 'Draft', 'Pending Approval', 'Awaiting Signature', 'Renewal Due', 'Overdue', 'Expired', 'Suspended'];

  return (
    <div className="flex h-full w-full bg-[#f8fafc]">
      <div className="flex-1 overflow-auto p-6 flex flex-col">
        <BrandsSuppliersPageHeader
          title="Supplier Contracts & Agreements"
          description="Manage supplier contracts, commercial terms, approvals, signatures, renewals and compliance across the beauty marketplace."
          breadcrumbs={[
            { label: 'Brands & Suppliers', href: '/admin/brands-suppliers' },
            { label: 'Contracts & Agreements' }
          ]}
          primaryAction={{ label: 'Create Contract', onClick: () => {}, icon: Plus }}
          secondaryActions={[
            { label: 'Export Contract Report', onClick: () => {}, icon: Download },
            { label: 'Renewal Calendar', onClick: () => {}, icon: Calendar },
            { label: 'Bulk Actions', onClick: () => {} }
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
              className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors ${tab === 'All Contracts' ? 'border-[#7a122e] text-[#7a122e]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2">
            <TrendChartCard
              title="Contract Operations Trend"
              data={trendData}
              series={trendSeries}
              timeRange="Last 30 Days"
            />
          </div>
          <div className="xl:col-span-1">
            <DonutChartCard
              title="Contract Status Distribution"
              data={composition}
              totalLabel="Total"
              totalValue={842}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search contracts..." className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md outline-none focus:border-[#7a122e] focus:ring-1 focus:ring-[#7a122e]" />
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Contract Type</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Supplier</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Brand</option>
            </select>
            
            <div className="flex items-center gap-2 ml-auto">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <SlidersHorizontal size={14} /> More Filters
              </button>
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700">Clear All</button>
            </div>
          </div>
        </div>

        {/* Table Mockup */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto mb-6">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs text-gray-500 border-b border-gray-200 whitespace-nowrap font-medium">
              <tr>
                <th className="px-4 py-3">Supplier Contract Portfolio</th>
                <th className="px-4 py-3">Contract Type</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Renewal Status</th>
                <th className="px-4 py-3 text-center">Signature Status</th>
                <th className="px-4 py-3 text-center">Compliance</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contracts.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{c.supplier}</span>
                      <span className="text-xs text-gray-500">{c.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{c.type}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${c.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs">
                     <span className={`${c.renewalStatus.includes('Due in') ? 'text-orange-600' : 'text-red-600'}`}>{c.renewalStatus}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-gray-700">{c.signatureStatus}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-medium ${c.compliance === 'Compliant' ? 'text-green-600' : c.compliance.includes('Risk') ? 'text-orange-600' : 'text-red-600'}`}>
                      {c.compliance}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-[#7a122e] font-medium text-xs hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom panels for Contracts (BS09) */}
        <div className="flex flex-col gap-6 mt-6">
          
          {/* Row 1: Contract Approval Queue & SLA Obligations */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <ShieldAlert size={16} className="text-[#7a122e]" />
                  Contract Approval Queue
                </h3>
                <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded font-medium border border-red-100">3 Cases Pending</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-medium">
                    <tr>
                      <th className="px-5 py-3">Case ID</th>
                      <th className="px-5 py-3">Supplier</th>
                      <th className="px-5 py-3">Type</th>
                      <th className="px-5 py-3">SLA Status</th>
                      <th className="px-5 py-3 text-center">Status</th>
                      <th className="px-5 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-gray-900">CON-REQ-091</td>
                      <td className="px-5 py-3 font-medium text-gray-800">Serene Botanics Lanka</td>
                      <td className="px-5 py-3 text-gray-500">Distribution Agreement</td>
                      <td className="px-5 py-3 text-orange-600 font-semibold">Warning (4h left)</td>
                      <td className="px-5 py-3 text-center">
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-100 rounded text-[10px]">Pending Approval</span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <button className="text-[#7a122e] font-semibold hover:underline">Review</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-gray-900">CON-REQ-092</td>
                      <td className="px-5 py-3 font-medium text-gray-800">Ceylon Glow Exports</td>
                      <td className="px-5 py-3 text-gray-500">SLA Addendum v2</td>
                      <td className="px-5 py-3 text-green-600 font-medium">On Track</td>
                      <td className="px-5 py-3 text-center">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px]">Under Review</span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <button className="text-[#7a122e] font-semibold hover:underline">Review</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <FileText size={16} className="text-[#7a122e]" />
                  SLA & Performance Obligations
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-medium">
                    <tr>
                      <th className="px-5 py-3">Supplier</th>
                      <th className="px-5 py-3">Obligation</th>
                      <th className="px-5 py-3 text-center">Target SLA</th>
                      <th className="px-5 py-3 text-center">Penalty Clause</th>
                      <th className="px-5 py-3 text-center">Compliance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-gray-900">Velvet Botanics</td>
                      <td className="px-5 py-3 text-gray-600">Dispatch within 24 hours</td>
                      <td className="px-5 py-3 text-center text-gray-800">&gt; 98.5%</td>
                      <td className="px-5 py-3 text-center text-gray-500">2.5% invoice fee</td>
                      <td className="px-5 py-3 text-center">
                        <span className="text-green-600 font-semibold">Compliant (99.4%)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-gray-900">LuxeSkin Wholesale</td>
                      <td className="px-5 py-3 text-gray-600">Order acceptance time</td>
                      <td className="px-5 py-3 text-center text-gray-800">&lt; 2 hours</td>
                      <td className="px-5 py-3 text-center text-gray-500">Warning letter</td>
                      <td className="px-5 py-3 text-center">
                        <span className="text-orange-600 font-semibold">At Risk (91.8%)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Row 2: Signature Operations, Renewal Operations, Contract Documents progress rails */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 text-xs mb-3">Signature Operations</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Awaiting Signature:</span>
                  <span className="font-bold text-gray-900">22</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Partially Signed:</span>
                  <span className="font-bold text-gray-900">14</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Fully Executed:</span>
                  <span className="font-bold text-green-600">612</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 text-red-600 font-medium">Overdue Signature:</span>
                  <span className="font-bold text-red-600">8</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 text-xs mb-3">Renewal Operations</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Overdue Renewals:</span>
                  <span className="font-bold text-red-600">9</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Due in 30 Days:</span>
                  <span className="font-bold text-orange-600">26</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Due in 90 Days:</span>
                  <span className="font-bold text-gray-800">42</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 text-green-600 font-medium">Auto-Renewed this Month:</span>
                  <span className="font-bold text-green-600">20</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between">
              <h3 className="font-semibold text-gray-900 text-xs mb-3">Documents & Evidence Coverage</h3>
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold mb-0.5 uppercase">
                    <span>KYC & Incorporation Certs</span>
                    <span>96%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '96%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold mb-0.5 uppercase">
                    <span>Brand Authorization Letters</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold mb-0.5 uppercase">
                    <span>Financial Performance Bond</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Commercial Terms & Brand Exclusivity */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm">Commercial Terms & Obligations</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-medium">
                    <tr>
                      <th className="px-5 py-3">Supplier Name</th>
                      <th className="px-5 py-3 text-center">Settlement Days</th>
                      <th className="px-5 py-3 text-center">Commission Rate</th>
                      <th className="px-5 py-3 text-center">Return Handling</th>
                      <th className="px-5 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-gray-900">Serene Botanics Lanka</td>
                      <td className="px-5 py-3 text-center">Net 15</td>
                      <td className="px-5 py-3 text-center">15.0%</td>
                      <td className="px-5 py-3 text-center">Supplier returns pool</td>
                      <td className="px-5 py-3 text-center">
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded text-[10px]">Active</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-gray-900">Ceylon Glow Exports</td>
                      <td className="px-5 py-3 text-center">Net 30</td>
                      <td className="px-5 py-3 text-center">12.5%</td>
                      <td className="px-5 py-3 text-center">Refund only</td>
                      <td className="px-5 py-3 text-center">
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded text-[10px]">Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm">Brand Authorization Exclusivity & Linkage</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-medium">
                    <tr>
                      <th className="px-5 py-3">Exclusive Brand</th>
                      <th className="px-5 py-3">Supplier Name</th>
                      <th className="px-5 py-3">Target Territory</th>
                      <th className="px-5 py-3 text-center">Active Products</th>
                      <th className="px-5 py-3 text-center">Linkage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-gray-900">Aurora Skin</td>
                      <td className="px-5 py-3 font-medium text-gray-800">Serene Botanics Lanka</td>
                      <td className="px-5 py-3 text-gray-500">Sri Lanka</td>
                      <td className="px-5 py-3 text-center text-gray-900 font-semibold">24</td>
                      <td className="px-5 py-3 text-center text-green-600 font-medium">✓ Correctly Linked</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-gray-900">Innisfree</td>
                      <td className="px-5 py-3 font-medium text-gray-800">Tokyo Beauty Co.</td>
                      <td className="px-5 py-3 text-gray-500">Sri Lanka, Maldives</td>
                      <td className="px-5 py-3 text-center text-gray-900 font-semibold">12</td>
                      <td className="px-5 py-3 text-center text-green-600 font-medium">✓ Correctly Linked</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Row 4: Amendment Timeline & Recent Contract Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 xl:col-span-1">
              <h3 className="font-semibold text-gray-900 text-xs mb-3">Amendment & Version History</h3>
              <div className="relative border-l border-gray-200 ml-3 pl-4 space-y-4 text-[11px] text-gray-500">
                <div className="relative">
                  <div className="absolute -left-[21px] top-0.5 w-2 h-2 rounded-full bg-green-500" />
                  <span className="font-bold text-gray-800">v2.1 SLA Addendum signed</span>
                  <p className="mt-0.5">04 Aug 2026 • Serene Botanics</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-0.5 w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-bold text-gray-800">v2.0 Term Extension created</span>
                  <p className="mt-0.5">25 Jul 2026 • System Agent</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-0.5 w-2 h-2 rounded-full bg-gray-300" />
                  <span className="font-bold text-gray-800">v1.0 Original Contract executed</span>
                  <p className="mt-0.5">12 Jul 2025 • Elena Vance</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden xl:col-span-2 flex flex-col">
              <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-xs">Recent Contract Activity Log</h3>
              </div>
              <div className="overflow-y-auto max-h-48 text-[11px] text-gray-600 divide-y divide-gray-100">
                <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                  <span>Contract CON-2025-00654 renewed by System Auto-Renew</span>
                  <span className="text-gray-400">04 Aug, 09:15 AM</span>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                  <span>SLA Addendum uploaded for LuxeSkin Wholesale</span>
                  <span className="text-gray-400">03 Aug, 02:40 PM</span>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                  <span>Agreement template updated (v3.2)</span>
                  <span className="text-gray-400">01 Aug, 10:00 AM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <RightInsightRail>
        <RailSection title="Contract Portfolio Health">
          <RailHealthScore 
            score={90} 
            label=""
            status="Stable" 
            metrics={[
              { label: 'Verification Coverage', value: '92%' },
              { label: 'Signature Readiness', value: '88%' },
              { label: 'Commercial Completeness', value: '95%' },
              { label: 'Renewal Readiness', value: '82%' },
            ]} 
          />
        </RailSection>

        <RailSection title="Priority Alerts" action={{ label: 'View all' }}>
          <RailAlertList items={[
            { label: 'Contract renewal overdue', count: 9, critical: true },
            { label: 'Missing primary contract', count: 24, critical: true },
            { label: 'SLA breach (dates list)', count: 12, critical: true },
            { label: 'Signature pending over 7 days', count: 8, critical: false },
          ]} />
        </RailSection>

        <RailSection title="Final Contract Actions">
           <div className="flex flex-col gap-2">
             <div className="grid grid-cols-2 gap-2">
               <button className="flex items-center justify-center gap-1.5 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50">
                 <Edit2 size={14}/> Edit Contract
               </button>
               <button className="flex items-center justify-center gap-1.5 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50">
                 <ShieldAlert size={14}/> Start Approval
               </button>
             </div>
             <button className="w-full py-2 bg-[#7a122e] text-white rounded text-sm font-medium hover:bg-[#5a0d22]">
               Send for Signature
             </button>
             <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50">
               Renew Contract
             </button>
           </div>
        </RailSection>
      </RightInsightRail>
    </div>
  );
}
