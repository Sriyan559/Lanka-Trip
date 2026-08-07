"use client";

import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, Clock, AlertTriangle, ChevronDown, 
  FilePlus, ShieldAlert, AlertCircle, RefreshCw, Layers
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';
import { HorizontalStatusChart } from '@/components/admin/shared/HorizontalStatusChart';

const KPI_DATA = [
  { index: 1, title: 'Total Contracts', value: '842', delta: { value: '2.1%', trend: 'down' as const }, icon: FileText, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Active Contracts', value: '612', delta: { value: '4.4%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 3, title: 'Draft Contracts', value: '54', delta: { value: '3.2%', trend: 'up' as const }, icon: FilePlus, iconBgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
  { index: 4, title: 'Pending Approval', value: '28', delta: { value: '5.7%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 5, title: 'Awaiting Signature', value: '22', delta: { value: '7.7%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 6, title: 'Renewals Due (30 Days)', value: '26', delta: { value: '4.0%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 7, title: 'Renewals Overdue', value: '9', delta: { value: '1.8%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 8, title: 'Expired Contracts', value: '31', delta: { value: '6.6%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600' },
  { index: 9, title: 'Missing Primary Contracts', value: '24', delta: { value: '2.7%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 10, title: 'Contract Compliance Issues', value: '18', delta: { value: '3.1%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 11, title: 'SLA Breaches', value: '12', delta: { value: '9.1%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 12, title: 'Terminated / Suspended', value: '14', delta: { value: '0.7%', trend: 'down' as const }, icon: FileText, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Contract Scope', value: 'Active Contract Portfolio' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'all', label: 'All Contracts' },
  { id: 'active', label: 'Active' },
  { id: 'draft', label: 'Draft' },
  { id: 'pending', label: 'Pending Approval' },
  { id: 'awaiting', label: 'Awaiting Signature' },
  { id: 'renewal', label: 'Renewal Due' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'expired', label: 'Expired' },
  { id: 'suspended', label: 'Suspended' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  Draft: Math.floor(Math.random() * 20) + 30,
  Approved: Math.floor(Math.random() * 25) + 40,
  Active: Math.floor(Math.random() * 30) + 60,
  Overdue: Math.floor(Math.random() * 5) + 2,
  Renewed: Math.floor(Math.random() * 15) + 10,
}));

const DONUT_DATA = [
  { name: 'Active', value: 612, color: '#16a34a' },
  { name: 'Draft', value: 54, color: '#6b7280' },
  { name: 'Pending Approval', value: 28, color: '#d97706' },
  { name: 'Awaiting Signature', value: 22, color: '#2563eb' },
  { name: 'Renewal Due', value: 26, color: '#eab308' },
  { name: 'Overdue', value: 9, color: '#dc2626' },
  { name: 'Expired', value: 31, color: '#9333ea' },
  { name: 'Suspended', value: 60, color: '#475569' },
];

const SIGNATURE_STATUS_DATA = [
  { label: 'Active', count: 612, percentage: 72.7, color: '#16a34a' },
  { label: 'Pending Signature', count: 22, percentage: 2.6, color: '#2563eb' },
  { label: 'Renewal Review', count: 48, percentage: 5.7, color: '#d97706' },
  { label: 'Expiring Soon (30 Days)', count: 26, percentage: 3.1, color: '#eab308' },
  { label: 'Expired', count: 31, percentage: 3.7, color: '#dc2626' },
  { label: 'Suspended', count: 60, percentage: 7.1, color: '#6b7280' },
];

const CONTRACTS_TABLE = [
  { title: 'Luxe Distribution Master Supply Agreement', id: 'CON-2026-0042', supplier: 'Luxe Distribution', type: 'Master Supply', bu: 'Consumer Beauty', brands: 6, territory: 'Sri Lanka', start: '01 Jan 2026', expiry: '31 Dec 2026', renewal: 'Due in 45 Days', signature: 'Signed', approval: 'Approved', terms: 'Net 30', commission: '15.5%', sla: 'Premium', compliance: 'Compliant', risk: 'Low', owner: 'Priya Nair', updated: '04 Aug 2026' },
  { title: 'Tokyo Beauty Distribution Agreement', id: 'CON-2026-0031', supplier: 'Tokyo Beauty', type: 'Distribution', bu: 'All Business Units', brands: 2, territory: 'Sri Lanka', start: '15 Oct 2025', expiry: '14 Oct 2026', renewal: 'Due in 112 Days', signature: 'Awaiting Signature', approval: 'Legal Review', terms: 'Net 45', commission: '12%', sla: 'Standard', compliance: 'Compliant', risk: 'Low', owner: 'Marco Lee', updated: '03 Aug 2026' },
  { title: 'PuroGlow Import Contract', id: 'CON-2026-0028', supplier: 'PuroGlow Imports', type: 'Importer', bu: 'Consumer Beauty', brands: 8, territory: 'Sri Lanka', start: '01 Nov 2025', expiry: '01 Aug 2026', renewal: 'Overdue (3 Days)', signature: 'Signed', approval: 'Approved', terms: 'Net 60', commission: '10%', sla: 'Standard', compliance: 'Compliant', risk: 'Medium', owner: 'Elena Vance', updated: '03 Aug 2026' },
  { title: 'Velvet Botanics Channel Supply MSA', id: 'CON-2026-0019', supplier: 'Velvet Botanics', type: 'Master Supply', bu: 'Consumer Beauty', brands: 3, territory: 'Sri Lanka', start: '05 Jan 2026', expiry: '05 Jan 2027', renewal: 'Due in 60 Days', signature: 'Signed', approval: 'Approved', terms: 'Net 30', commission: '18%', sla: 'Premium', compliance: 'Compliant', risk: 'Low', owner: 'Priya Nair', updated: '02 Aug 2026' },
  { title: 'SilkRoad Regional Supplier Contract', id: 'CON-2026-0012', supplier: 'SilkRoad Supplies', type: 'Re-seller', bu: 'Consumer Beauty', brands: 5, territory: 'Sri Lanka', start: '01 Aug 2025', expiry: '31 Aug 2026', renewal: 'Due in 27 Days', signature: 'Signed', approval: 'Approved', terms: 'Net 30', commission: '14%', sla: 'Standard', compliance: 'Compliant', risk: 'Low', owner: 'Priya Nair', updated: '01 Aug 2026' },
];

export default function SupplierContractsPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Contracts &amp; Agreements</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Contracts &amp; Agreements</h1>
            <p className="text-xs text-gray-500 mt-1">Manage supplier contracts, commercial terms, approvals, signatures, renewals and compliance across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Contract Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Renewal Calendar</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Bulk Actions v</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ Create Contract</button>
          </div>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar 
          items={CONTEXT_ITEMS} 
          lastSynced="04 Aug 2026, 12:57 AM" 
          accessNote="Access limited to assigned business context"
        />

        {/* 12 KPI Grid */}
        <DashboardGrid>
          {KPI_DATA.map((kpi) => (
            <KpiCard key={kpi.index} {...kpi} />
          ))}
        </DashboardGrid>

        {/* Charts Section */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-5 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Contract Operations Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#6b7280', '#16a34a', '#0284c7', '#dc2626', '#9333ea']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Contract Status Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total" totalValue="842" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Signature &amp; Renewal Status Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={SIGNATURE_STATUS_DATA} total={842} />
            </div>
          </div>
        </div>

        {/* Health Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Contract Completion</span> <span className="font-bold text-gray-900 ml-1">86%</span></div>
          <div><span className="text-gray-500">Signature Readiness</span> <span className="font-bold text-gray-900 ml-1">87%</span></div>
          <div><span className="text-gray-500">Renewal Readiness</span> <span className="font-bold text-gray-900 ml-1">81%</span></div>
          <div><span className="text-gray-500">Commercial Accuracy</span> <span className="font-bold text-gray-900 ml-1">89%</span></div>
          <div><span className="text-gray-500">Compliance Coverage</span> <span className="font-bold text-gray-900 ml-1">91%</span></div>
          <div><span className="text-gray-500">Authorization Linkage</span> <span className="font-bold text-gray-900 ml-1">85%</span></div>
          <div><span className="text-gray-500">SLA Readiness</span> <span className="font-bold text-gray-900 ml-1">84%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search contracts / suppliers / brands / ID..."
          filters={[
            { id: 'approval', label: 'Approval Status', options: [] },
            { id: 'signature', label: 'Signature Status', options: [] },
            { id: 'renewal', label: 'Renewal Status', options: [] },
            { id: 'compliance', label: 'Compliance Status', options: [] },
            { id: 'risk', label: 'Risk Level', options: [] },
            { id: 'updated', label: 'Updated Date', options: [] },
            { id: 'expiry', label: 'Expiry Date', options: [] },
          ]}
          onClearAll={() => {}}
          onSaveView={() => {}}
        />

        {/* Dense Contract Portfolio Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1600px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 pl-4">Contract Title</th>
                  <th className="px-3 py-2">Contract ID</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Contract Type</th>
                  <th className="px-3 py-2">Business Unit</th>
                  <th className="px-3 py-2 text-center">Linked Brands</th>
                  <th className="px-3 py-2">Territory</th>
                  <th className="px-3 py-2">Start Date</th>
                  <th className="px-3 py-2">Expiry Date</th>
                  <th className="px-3 py-2">Renewal Status</th>
                  <th className="px-3 py-2">Signature Status</th>
                  <th className="px-3 py-2">Approval Status</th>
                  <th className="px-3 py-2">Payment Terms</th>
                  <th className="px-3 py-2">Commission Rate</th>
                  <th className="px-3 py-2">SLA Tier</th>
                  <th className="px-3 py-2">Compliance Status</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Contract Owner</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {CONTRACTS_TABLE.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 pl-4 font-bold text-rose-800">{row.title}</td>
                    <td className="px-3 py-2 text-gray-500">{row.id}</td>
                    <td className="px-3 py-2 font-semibold text-gray-900">{row.supplier}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.bu}</td>
                    <td className="px-3 py-2 text-center font-bold text-gray-900">{row.brands}</td>
                    <td className="px-3 py-2 text-gray-600">{row.territory}</td>
                    <td className="px-3 py-2 text-gray-500">{row.start}</td>
                    <td className="px-3 py-2 text-gray-500">{row.expiry}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        row.renewal.includes('Overdue') ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {row.renewal}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        row.signature === 'Signed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {row.signature}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        row.approval === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'
                      }`}>
                        {row.approval}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-600">{row.terms}</td>
                    <td className="px-3 py-2 text-gray-600 font-bold">{row.commission}</td>
                    <td className="px-3 py-2 text-gray-600">{row.sla}</td>
                    <td className="px-3 py-2 text-green-600 font-bold">{row.compliance}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.risk}</td>
                    <td className="px-3 py-2 text-gray-500">{row.owner}</td>
                    <td className="px-3 py-2 text-gray-400">{row.updated}</td>
                    <td className="px-3 py-2 text-center"><button className="text-gray-400 hover:text-gray-900">⋮</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Contract Portfolio Health">
          <HealthScoreGauge 
            score={90} 
            label="Stable" 
            statusText="Stable"
            statusColor="#16a34a"
            metrics={[
              { label: 'Verification Coverage', value: '92%', progress: 92 },
              { label: 'Signature Readiness', value: '87%', progress: 87 },
              { label: 'Commercial Completeness', value: '89%', progress: 89 },
              { label: 'Renewal Readiness', value: '81%', progress: 81 },
              { label: 'Compliance Coverage', value: '91%', progress: 91 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700 flex items-center gap-1"><AlertTriangle size={12} className="text-red-500" /> Contract renewal overdue</span><span className="font-bold text-red-500">9</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700 flex items-center gap-1"><AlertTriangle size={12} className="text-amber-500" /> Missing primary contract</span><span className="font-bold text-amber-500">24</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700 flex items-center gap-1"><AlertTriangle size={12} className="text-red-500" /> SLA breach - contract terms</span><span className="font-bold text-red-500">12</span></div>
          </div>
        </RailSection>

        <RailSection title="Final Contract Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">+ Create Contract</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Start Approval Review</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Send for Signature</button>
            <button className="border border-amber-300 text-amber-900 bg-amber-50 py-1.5 rounded text-[11px] font-semibold hover:bg-amber-100">Renew Contract</button>
            <button className="border border-red-300 text-red-900 bg-red-50 py-1.5 rounded text-[11px] font-semibold hover:bg-red-100">Suspend Contract</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
