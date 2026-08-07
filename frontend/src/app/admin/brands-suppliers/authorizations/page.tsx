"use client";

import React, { useState } from 'react';
import { 
  Award, CheckCircle2, Clock, AlertTriangle, ChevronDown, 
  FileText, ShieldAlert, AlertCircle, RefreshCw, Eye, ShieldCheck
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
  { index: 1, title: 'Total Brand Authorizations', value: '486', delta: { value: '5.3%', trend: 'up' as const }, icon: Award, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 2, title: 'Active Authorizations', value: '420', delta: { value: '4.1%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { index: 3, title: 'Pending Review', value: '54', delta: { value: '8.0%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 4, title: 'Legal Review', value: '26', delta: { value: '3.7%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 5, title: 'Expiring in 30 Days', value: '18', delta: { value: '12.5%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 6, title: 'Expired Authorizations', value: '22', delta: { value: '3.1%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 7, title: 'Territory Conflicts', value: '7', delta: { value: '14.2%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 8, title: 'Channel Violations', value: '5', delta: { value: '20.0%', trend: 'down' as const }, icon: AlertTriangle, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 9, title: 'Missing Auth Letters', value: '14', delta: { value: '6.7%', trend: 'down' as const }, icon: FileText, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 10, title: 'Exclusive Rights', value: '86', delta: { value: '2.3%', trend: 'up' as const }, icon: ShieldCheck, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 11, title: 'Non-Exclusive Rights', value: '334', delta: { value: '5.6%', trend: 'up' as const }, icon: Award, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 12, title: 'Authorization SLA Breaches', value: '8', delta: { value: '11.1%', trend: 'down' as const }, icon: Clock, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
];

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

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  Submitted: Math.floor(Math.random() * 20) + 40,
  Approved: Math.floor(Math.random() * 25) + 35,
  'Legal Review': Math.floor(Math.random() * 10) + 15,
  Expired: Math.floor(Math.random() * 5) + 2,
}));

const DONUT_DATA = [
  { name: 'Active', value: 420, color: '#16a34a' },
  { name: 'Pending Review', value: 54, color: '#d97706' },
  { name: 'Legal Review', value: 26, color: '#9333ea' },
  { name: 'Expiring (30d)', value: 18, color: '#eab308' },
  { name: 'Expired', value: 22, color: '#dc2626' },
];

const TERRITORY_SUMMARY_DATA = [
  { label: 'Active Non-Exclusive', count: 334, percentage: 68.7, color: '#16a34a' },
  { label: 'Active Exclusive', count: 86, percentage: 17.7, color: '#0284c7' },
  { label: 'Pending Review', count: 44, percentage: 9.1, color: '#d97706' },
  { label: 'Territory Conflict', count: 12, percentage: 2.5, color: '#dc2626' },
  { label: 'Expired', count: 10, percentage: 2.0, color: '#6b7280' },
];

const CASES_TABLE = [
  { id: 'AUTH-2026-00821', brand: "L'Oréal", supplier: 'Velvet Botanics', type: 'Brand Owner', territory: 'Sri Lanka', channels: 'All Channels', start: '02 Aug 2026', expiry: '02 Aug 2027', exclusivity: 'Exclusive', letter: 'Verified', conflict: 'Clear', reviewer: 'Elena Vance', sla: '18h', status: 'Under Review' },
  { id: 'AUTH-2026-00815', brand: 'The Ordinary', supplier: 'PuroGlow Imports', type: 'Importer', territory: 'Sri Lanka, UAE', channels: 'Marketplace, Mobile', start: '01 Aug 2026', expiry: '01 Aug 2027', exclusivity: 'Non-Exclusive', letter: 'Verified', conflict: 'Potential Overlap', reviewer: 'Marco Lee', sla: '1d', status: 'Legal Review' },
  { id: 'AUTH-2026-00808', brand: 'Estée Lauder', supplier: 'Luxe Distributions', type: 'Distributor', territory: 'Sri Lanka', channels: 'All Channels', start: '31 Jul 2026', expiry: '31 Jul 2027', exclusivity: 'Exclusive', letter: 'Verified', conflict: 'Clear', reviewer: 'Priya Nair', sla: '—', status: 'Approved' },
  { id: 'AUTH-2026-00797', brand: 'COSRX', supplier: 'Glow Labs', type: 'Lab', territory: 'Sri Lanka', channels: 'B2B, Marketplace', start: '30 Jul 2026', expiry: '30 Jul 2027', exclusivity: 'Non-Exclusive', letter: 'Verified', conflict: 'Clear', reviewer: 'Elena Vance', sla: '—', status: 'Approved' },
  { id: 'AUTH-2026-00790', brand: 'Neutrogena', supplier: 'SilkRoad Supplies', type: 'Wholesaler', territory: 'Sri Lanka', channels: 'Retail', start: '28 Jul 2026', expiry: '28 Jul 2027', exclusivity: 'Non-Exclusive', letter: 'Expired', conflict: 'Conflict Detected', reviewer: 'Marco Lee', sla: '—', status: 'Expired' },
];

export default function BrandAuthorizationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Brand Authorizations</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Brand Authorization Management</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor brand rights, authorization letters, distributor channels, territory exclusivity, and authorization cases across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Authorizations Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Review Pending Cases</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ New Authorization Case</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-[13px] font-semibold flex items-center gap-1 hover:bg-gray-50">More Actions <ChevronDown size={14} /></button>
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
            <h3 className="text-[13px] font-bold mb-3">Brand Authorization Operations Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#16a34a', '#9333ea', '#dc2626']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Authorization Status Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Authorizations" totalValue="486" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Territory &amp; Exclusivity Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={TERRITORY_SUMMARY_DATA} total={486} />
            </div>
          </div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search by case ID, brand, supplier, or territory..."
          filters={[
            { id: 'brand', label: 'Brand', options: [] },
            { id: 'supplier', label: 'Supplier', options: [] },
            { id: 'type', label: 'Authorization Type', options: [] },
            { id: 'exclusivity', label: 'Exclusivity', options: [] },
            { id: 'status', label: 'Status', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1500px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 text-center w-8"><input type="checkbox" className="rounded" /></th>
                  <th className="px-3 py-2">Case ID</th>
                  <th className="px-3 py-2 font-bold">Brand</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Authorization Type</th>
                  <th className="px-3 py-2">Territory</th>
                  <th className="px-3 py-2">Channel Scope</th>
                  <th className="px-3 py-2">Start Date</th>
                  <th className="px-3 py-2">Expiry Date</th>
                  <th className="px-3 py-2">Exclusivity</th>
                  <th className="px-3 py-2">Letter Status</th>
                  <th className="px-3 py-2">Conflict Status</th>
                  <th className="px-3 py-2">Reviewer</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {CASES_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 text-center"><input type="checkbox" className="rounded" /></td>
                    <td className="px-3 py-2 font-bold text-rose-800">{row.id}</td>
                    <td className="px-3 py-2 font-bold text-gray-900">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.supplier}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.territory}</td>
                    <td className="px-3 py-2 text-gray-600">{row.channels}</td>
                    <td className="px-3 py-2 text-gray-500">{row.start}</td>
                    <td className="px-3 py-2 text-gray-500">{row.expiry}</td>
                    <td className="px-3 py-2 font-semibold text-blue-600">{row.exclusivity}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">{row.letter}</td>
                    <td className="px-3 py-2 font-semibold">
                      <span className={row.conflict.includes('Conflict') ? 'text-red-600' : row.conflict.includes('Overlap') ? 'text-amber-600' : 'text-green-600'}>
                        {row.conflict}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{row.reviewer}</td>
                    <td className="px-3 py-2 text-gray-500">{row.sla}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        row.status === 'Approved' ? 'bg-green-50 text-green-700' :
                        row.status === 'Under Review' ? 'bg-blue-50 text-blue-700' :
                        row.status === 'Legal Review' ? 'bg-purple-50 text-purple-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button className="bg-[#171717] text-white px-2.5 py-1 rounded text-[10px] font-bold hover:bg-black">Open Case</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Authorization Readiness">
          <HealthScoreGauge 
            score={88} 
            label="Good" 
            statusText="Good"
            statusColor="#16a34a"
            metrics={[
              { label: 'Active Authorizations', value: '86%', progress: 86 },
              { label: 'Exclusivity Compliance', value: '92%', progress: 92 },
              { label: 'Letter Authenticity', value: '90%', progress: 90 },
              { label: 'Territory Coverage', value: '88%', progress: 88 },
              { label: 'Expiry Management', value: '84%', progress: 84 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Territory conflict detected</span><span className="font-bold text-red-500">7</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Expiring in 30 days</span><span className="font-bold text-amber-500">18</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Missing authorization letter</span><span className="font-bold text-red-500">14</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Pending Review</span><span className="font-bold text-gray-900">54</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Legal Review Queue</span><span className="font-bold text-purple-600">26</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">SLA Breaches</span><span className="font-bold text-red-500">8</span></div>
          </div>
        </RailSection>

        <RailSection title="Final Authorization Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">+ New Authorization Case</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Approve Case</button>
            <button className="border border-purple-300 text-purple-900 bg-purple-50 py-1.5 rounded text-[11px] font-semibold hover:bg-purple-100">Send to Legal Review</button>
            <button className="border border-red-300 text-red-900 bg-red-50 py-1.5 rounded text-[11px] font-semibold hover:bg-red-100">Reject Authorization</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
