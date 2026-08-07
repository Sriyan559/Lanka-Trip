"use client";

import React, { useState } from 'react';
import { 
  Users, UserCheck, ShieldCheck, Hourglass, FilePlus, AlertTriangle, 
  PauseCircle, Award, Clock, AlertCircle, FileText, ShieldAlert, 
  ChevronDown, Search, CheckCircle2, RefreshCw, Eye, MoreVertical
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
  { index: 1, title: 'Total Suppliers', value: '842', delta: { value: '2.1%', trend: 'up' as const }, icon: Users, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Active Suppliers', value: '768', delta: { value: '4.6%', trend: 'up' as const }, icon: UserCheck, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 3, title: 'Verified Suppliers', value: '612', delta: { value: '3.2%', trend: 'up' as const }, icon: ShieldCheck, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { index: 4, title: 'Pending Verification', value: '128', delta: { value: '5.7%', trend: 'up' as const }, icon: Hourglass, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 5, title: 'New Applications', value: '42', delta: { value: '7.7%', trend: 'up' as const }, icon: FilePlus, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 6, title: 'Information Requested', value: '31', delta: { value: '9.1%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 7, title: 'High-Risk Suppliers', value: '12', delta: { value: '8.1%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 8, title: 'Restricted Suppliers', value: '16', delta: { value: '3.4%', trend: 'up' as const }, icon: PauseCircle, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 9, title: 'Suspended Suppliers', value: '9', delta: { value: '0.0%', trend: 'neutral' as const }, icon: PauseCircle, iconBgColor: 'bg-[#7a0023]/10', iconColor: 'text-[#7a0023]' },
  { index: 10, title: 'Missing Primary Contracts', value: '26', delta: { value: '5.7%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 11, title: 'Expiring Documents', value: '18', delta: { value: '12.5%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 12, title: 'Archived Suppliers', value: '24', delta: { value: '7.2%', trend: 'up' as const }, icon: Users, iconBgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
];

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

const SUPPLIERS_TABLE = [
  { id: 'SUP-1002', name: 'LVMH Beauty Mfg.', legalName: 'LVMH Beauty Manufacturing SAS', type: 'Manufacturer', country: 'France', bu: 'F&S', activeBrands: 24, activeProducts: 186, verification: 'Verified', compliance: 'Compliant', coverage: '92%', status: 'Active', catalogue: 'Complete', channel: 'All', region: 'Global', perf: '92/100', risk: 'Low', owner: 'Elena Vance', updated: '04 Aug 2026 11:45 AM' },
  { id: 'SUP-2845', name: 'Estée Lauder Dist. APAC', legalName: 'Estée Lauder Companies Inc.', type: 'Distributor', country: 'USA', bu: 'MUP', activeBrands: 18, activeProducts: 142, verification: 'Verified', compliance: 'Compliant', coverage: '88%', status: 'Active', catalogue: 'Complete', channel: 'All', region: 'APAC', perf: '88/100', risk: 'Low', owner: 'Marco Lee', updated: '04 Aug 2026 10:30 AM' },
  { id: 'SUP-2109', name: 'Cosmax Labs Korea', legalName: 'COSMAX Co., Ltd.', type: 'Contract Mfg.', country: 'South Korea', bu: 'R&D', activeBrands: 12, activeProducts: 96, verification: 'Verified', compliance: 'Compliant', coverage: '85%', status: 'Active', catalogue: 'Complete', channel: 'All', region: 'Asia', perf: '86/100', risk: 'Low', owner: 'Priya Nair', updated: '04 Aug 2026 09:50 AM' },
  { id: 'SUP-3042', name: 'Boutique Retailers Inc.', legalName: 'Boutique Retailers Inc.', type: 'Wholesaler', country: 'USA', bu: 'RIT', activeBrands: 35, activeProducts: 312, verification: 'Suspended', compliance: 'Non-Compliant', coverage: '45%', status: 'Restricted', catalogue: 'Partial', channel: 'Retail', region: 'NA', perf: '56/100', risk: 'High', owner: 'David Kim', updated: '03 Aug 2026 04:22 PM' },
  { id: 'SUP-3305', name: 'Glow Global Exports', legalName: 'Glow Global Exports Pvt Ltd', type: 'Exporter', country: 'India', bu: 'MUP', activeBrands: 16, activeProducts: 128, verification: 'Pending', compliance: 'Needs Review', coverage: '60%', status: 'Active', catalogue: 'Partial', channel: 'Global', region: 'MENA', perf: '72/100', risk: 'Medium', owner: 'Aisha Rahman', updated: '03 Aug 2026 02:10 PM' },
  { id: 'SUP-4201', name: 'Velvet Botanics', legalName: 'Velvet Botanics (Pvt) Ltd', type: 'Manufacturer', country: 'Sri Lanka', bu: 'F&S', activeBrands: 10, activeProducts: 78, verification: 'Verified', compliance: 'Compliant', coverage: '90%', status: 'Active', catalogue: 'Complete', channel: 'All', region: 'SA', perf: '91/100', risk: 'Low', owner: 'Elena Vance', updated: '03 Aug 2026 11:30 AM' },
];

export default function SupplierManagementPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState(SUPPLIERS_TABLE[0]);

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

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search suppliers..."
          filters={[
            { id: 'type', label: 'Supplier Type', options: [] },
            { id: 'status', label: 'Supplier Status', options: [] },
            { id: 'verification', label: 'Verification Status', options: [] },
            { id: 'compliance', label: 'Compliance Status', options: [] },
            { id: 'authorization', label: 'Authorization Status', options: [] },
            { id: 'channel', label: 'Channel Eligibility', options: [] },
            { id: 'risk', label: 'Risk Level', options: [] },
            { id: 'country', label: 'Country / Region', options: [] },
            { id: 'bu', label: 'Business Unit', options: [] },
            { id: 'owner', label: 'Owner', options: [] },
            { id: 'updated', label: 'Updated Date', options: [] },
          ]}
          onClearAll={() => {}}
          onSaveView={() => {}}
        />

        {/* Supplier Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Suppliers ({SUPPLIERS_TABLE.length})</h3>
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
                {SUPPLIERS_TABLE.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedSupplier(row)}
                    className={`hover:bg-gray-50 cursor-pointer ${selectedSupplier.id === row.id ? 'bg-[#7a0023]/5' : ''}`}
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
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 flex items-center justify-between border-t border-gray-200 text-[11px] text-gray-500 bg-gray-50 rounded-b-md">
            <div>Showing 1 to 6 of 842 entries</div>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50">&lt;</button>
              <button className="px-2 py-1 border border-[#7a0023] text-white bg-[#7a0023] rounded">1</button>
              <button className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50">2</button>
              <button className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50">3</button>
              <span>...</span>
              <button className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50">141</button>
              <button className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50">&gt;</button>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Brands &amp; Suppliers Health">
          <HealthScoreGauge 
            score={89} 
            label="Good" 
            statusText="Stable"
            statusColor="#16a34a"
            metrics={[
              { label: 'Verification Coverage', value: '92%', progress: 92 },
              { label: 'Authorization Readiness', value: '88%', progress: 88 },
              { label: 'Contract Compliance', value: '85%', progress: 85 },
              { label: 'Catalogue Coverage', value: '91%', progress: 91 },
              { label: 'Supplier Performance', value: '86%', progress: 86 },
              { label: 'SLA Health', value: '84%', progress: 84 },
              { label: 'Risk Control', value: '82%', progress: 82 },
              { label: 'Audit Readiness', value: '94%', progress: 94 },
            ]}
          />
          <div className="text-right text-[10px] text-[#7a0023] font-semibold cursor-pointer hover:underline mt-1">View health dashboard →</div>
        </RailSection>

        {/* Selected Supplier Preview Card */}
        <RailSection title="Selected Supplier Preview">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex flex-col gap-2">
            <div className="font-bold text-gray-900 text-xs">{selectedSupplier.name}</div>
            <div className="text-[10px] text-gray-500">{selectedSupplier.legalName}</div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] border-t border-gray-200 pt-2 mt-1">
              <div><span className="text-gray-400">Reg. No:</span> <span className="font-semibold">FR123456789</span></div>
              <div><span className="text-gray-400">Type:</span> <span className="font-semibold">{selectedSupplier.type}</span></div>
              <div><span className="text-gray-400">Country:</span> <span className="font-semibold">{selectedSupplier.country}</span></div>
              <div><span className="text-gray-400">BU:</span> <span className="font-semibold">{selectedSupplier.bu}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] border-t border-gray-200 pt-2">
              <div><span className="text-gray-400">Verification:</span> <span className="font-semibold text-green-600">{selectedSupplier.verification}</span></div>
              <div><span className="text-gray-400">Lifecycle:</span> <span className="font-semibold text-blue-600">Active</span></div>
              <div><span className="text-gray-400">Risk Level:</span> <span className="font-semibold text-green-600">{selectedSupplier.risk}</span></div>
              <div><span className="text-gray-400">Perf Score:</span> <span className="font-semibold text-gray-900">{selectedSupplier.perf}</span></div>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center border-t border-gray-200 pt-2 text-[10px]">
              <div className="bg-white p-1 rounded border border-gray-100"><div className="text-gray-400">Brands</div><div className="font-bold">{selectedSupplier.activeBrands}</div></div>
              <div className="bg-white p-1 rounded border border-gray-100"><div className="text-gray-400">Auths</div><div className="font-bold">22</div></div>
              <div className="bg-white p-1 rounded border border-gray-100"><div className="text-gray-400">Products</div><div className="font-bold">{selectedSupplier.activeProducts}</div></div>
            </div>
            <a href={`/admin/brands-suppliers/suppliers/${selectedSupplier.id}`} className="mt-2 text-center bg-[#7a0023] text-white font-semibold py-1 rounded text-[11px] hover:bg-[#a0002b] transition-colors">
              Open Supplier Workspace →
            </a>
          </div>
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700 flex items-center gap-1"><AlertTriangle size={12} className="text-red-500" /> High-risk supplier application</span><span className="font-bold text-red-500">12</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700 flex items-center gap-1"><AlertTriangle size={12} className="text-amber-500" /> Expiring authorizations</span><span className="font-bold text-amber-500">18</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700 flex items-center gap-1"><AlertTriangle size={12} className="text-red-500" /> SLA breach - verification</span><span className="font-bold text-red-500">7</span></div>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
