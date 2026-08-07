"use client";

import React, { useState } from 'react';
import { 
  ShieldAlert, AlertTriangle, Clock, ChevronDown, 
  FileText, ShieldCheck, AlertCircle, RefreshCw, Eye, CheckCircle2, Lock, Tag
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
  { index: 1, title: 'Open Authenticity Investigations', value: '156', delta: { value: '12.4%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Suspected Counterfeit Products', value: '18', delta: { value: '8.7%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 3, title: 'Confirmed Counterfeit Products', value: '4', delta: { value: '33.3%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 4, title: 'Unauthorized Brand Use Cases', value: '9', delta: { value: '12.5%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 5, title: 'Brand Relationship Conflicts', value: '18', delta: { value: '5.9%', trend: 'up' as const }, icon: Tag, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 6, title: 'Packaging Authenticity Issues', value: '42', delta: { value: '9.3%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 7, title: 'Barcode / GTIN Conflicts', value: '29', delta: { value: '7.4%', trend: 'up' as const }, icon: RefreshCw, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 8, title: 'Serial / Batch Conflicts', value: '24', delta: { value: '9.1%', trend: 'up' as const }, icon: Tag, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 9, title: 'Duplicate Listing Clusters', value: '31', delta: { value: '6.4%', trend: 'up' as const }, icon: RefreshCw, iconBgColor: 'bg-teal-50', iconColor: 'text-teal-600' },
  { index: 10, title: 'Evidence Requests Pending', value: '54', delta: { value: '8.0%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  { index: 11, title: 'Restricted Products', value: '10', delta: { value: '4.7%', trend: 'down' as const }, icon: Lock, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600' },
  { index: 12, title: 'Investigation SLA Breaches', value: '14', delta: { value: '3.4%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Investigation Scope', value: 'Active Authenticity Network' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'all', label: 'All Investigations' },
  { id: 'new', label: 'New', count: 24 },
  { id: 'under-investigation', label: 'Under Investigation', count: 38 },
  { id: 'awaiting-evidence', label: 'Awaiting Evidence', count: 31 },
  { id: 'suspected', label: 'Suspected Counterfeit', count: 18 },
  { id: 'confirmed', label: 'Confirmed Counterfeit', count: 4 },
  { id: 'unauthorized', label: 'Unauthorized Brand Use', count: 9 },
  { id: 'packaging', label: 'Packaging Conflicts', count: 42 },
  { id: 'gtin', label: 'Identifier Conflicts', count: 29 },
  { id: 'duplicate', label: 'Duplicate Listings', count: 31 },
  { id: 'restricted', label: 'Restricted', count: 10 },
  { id: 'audit', label: 'Audit History' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'Open Investigations': Math.floor(Math.random() * 50) + 150,
  Resolved: Math.floor(Math.random() * 30) + 70,
  'Confirmed Counterfeit': Math.floor(Math.random() * 5) + 2,
  'SLA Breaches': Math.floor(Math.random() * 8) + 5,
}));

const DONUT_DATA = [
  { name: 'Counterfeit', value: 4, color: '#dc2626' },
  { name: 'Unauthorized Brand Use', value: 9, color: '#d97706' },
  { name: 'Packaging', value: 42, color: '#0284c7' },
  { name: 'Identifier', value: 29, color: '#9333ea' },
  { name: 'Duplicate Listing', value: 31, color: '#16a34a' },
  { name: 'Other', value: 11, color: '#6b7280' },
];

const STATUS_SUMMARY_DATA = [
  { label: 'New', count: 24, percentage: 15.4, color: '#0284c7' },
  { label: 'Under Review', count: 38, percentage: 24.4, color: '#16a34a' },
  { label: 'Awaiting Evidence', count: 31, percentage: 19.9, color: '#d97706' },
  { label: 'Restricted', count: 14, percentage: 9.0, color: '#dc2626' },
  { label: 'Revalidation', count: 16, percentage: 10.3, color: '#9333ea' },
  { label: 'Resolved', count: 22, percentage: 14.1, color: '#059669' },
  { label: 'Closed', count: 11, percentage: 7.1, color: '#475569' },
];

const INVESTIGATIONS_TABLE = [
  { id: 'AUTH-INV-2026-00458', type: 'Counterfeit', source: 'Consumer Report', product: 'Radiance Vitamin C Serum', supplier: 'Luxe Distribution Pvt Ltd', brand: 'Radiance', auth: 'Verified', identity: 'Match', pkg: 'Conflict', gtin: 'Conflict', serial: 'Unique', evidence: 'Received', pub: 'Published', restriction: 'None', risk: 'Critical', severity: 'High', owner: 'Elena Vance', due: '06 Aug 2026', sla: '82%', status: 'Under Review', updated: '04 Aug 2026' },
  { id: 'AUTH-INV-2026-00441', type: 'Unauthorized Brand Use', source: 'Monitoring', product: 'Lumière Night Repair', supplier: 'Glow Labs', brand: 'Lumière', auth: 'Conflict', identity: 'Match', pkg: 'Match', gtin: 'Valid', serial: 'Unique', evidence: 'Requested', pub: 'Published', restriction: 'None', risk: 'High', severity: 'High', owner: 'Priya Kapoor', due: '05 Aug 2026', sla: '68%', status: 'Awaiting Evidence', updated: '04 Aug 2026' },
  { id: 'AUTH-INV-2026-00432', type: 'Packaging Conflict', source: 'Image Scanner', product: 'Aura Hydra Moisturizer', supplier: 'Pure Glow Imports', brand: 'Aura Cosmetics', auth: 'Verified', identity: 'Match', pkg: 'Conflict', gtin: 'Valid', serial: 'Unique', evidence: 'Received', pub: 'Published', restriction: 'None', risk: 'High', severity: 'Medium', owner: 'Marco Lee', due: '07 Aug 2026', sla: '91%', status: 'Under Review', updated: '04 Aug 2026' },
  { id: 'AUTH-INV-2026-00429', type: 'Identifier Conflict', source: 'GTIN Monitor', product: 'Radiance Vitamin C Serum', supplier: 'Luxe Distribution Pvt Ltd', brand: 'Radiance', auth: 'Verified', identity: 'Match', pkg: 'Match', gtin: 'Conflict', serial: 'Unique', evidence: 'Received', pub: 'Not Published', restriction: 'Restricted', risk: 'High', severity: 'High', owner: 'Elena Vance', due: '04 Aug 2026', sla: '63%', status: 'Restricted', updated: '03 Aug 2026' },
];

export default function AuthenticityInvestigationsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Authenticity Investigations</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Authenticity &amp; Counterfeit Investigations</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor, investigate, and resolve supply-chain authenticity risks including unauthorized sellers, counterfeit products, packaging conflicts, identifier conflicts, and brand infringements.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Authenticity Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Review Critical Investigations</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Bulk Actions v</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">Review Next Investigation →</button>
          </div>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar 
          items={CONTEXT_ITEMS} 
          lastSynced="04 Aug 2026, 12:57 AM" 
          accessNote="Access limited to assigned business units"
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
            <h3 className="text-[13px] font-bold mb-3">Authenticity Investigation Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#16a34a', '#dc2626', '#d97706']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Issue Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total Issues" totalValue="156" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Investigation Status Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={STATUS_SUMMARY_DATA} total={156} />
            </div>
          </div>
        </div>

        {/* Health Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Brand Authorization</span> <span className="font-bold text-gray-900 ml-1">87%</span></div>
          <div><span className="text-gray-500">Product Identity Match</span> <span className="font-bold text-gray-900 ml-1">91%</span></div>
          <div><span className="text-gray-500">Packaging Authenticity</span> <span className="font-bold text-gray-900 ml-1">84%</span></div>
          <div><span className="text-gray-500">Identifier Integrity</span> <span className="font-bold text-gray-900 ml-1">89%</span></div>
          <div><span className="text-gray-500">Seller Compliance</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
          <div><span className="text-gray-500">Evidence Readiness</span> <span className="font-bold text-gray-900 ml-1">76%</span></div>
          <div><span className="text-gray-500">Restriction Control</span> <span className="font-bold text-gray-900 ml-1">90%</span></div>
          <div><span className="text-gray-500">Revalidation Readiness</span> <span className="font-bold text-gray-900 ml-1">82%</span></div>
          <div><span className="text-gray-500">SLA Compliance</span> <span className="font-bold text-gray-900 ml-1">86%</span></div>
          <div><span className="text-gray-500">Audit Readiness</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search by case, product, supplier, brand, or GTIN..."
          filters={[
            { id: 'type', label: 'Investigation Type', options: [] },
            { id: 'supplier', label: 'Supplier', options: [] },
            { id: 'brand', label: 'Brand', options: [] },
            { id: 'source', label: 'Detection Source', options: [] },
            { id: 'risk', label: 'Risk Level', options: [] },
            { id: 'status', label: 'Status', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2 mb-6">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1700px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 pl-4">Investigation ID</th>
                  <th className="px-3 py-2">Investigation Type</th>
                  <th className="px-3 py-2">Detection Source</th>
                  <th className="px-3 py-2 font-bold">Product</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Brand</th>
                  <th className="px-3 py-2">Brand Auth</th>
                  <th className="px-3 py-2">Product Identity</th>
                  <th className="px-3 py-2">Packaging Match</th>
                  <th className="px-3 py-2">Barcode / GTIN</th>
                  <th className="px-3 py-2">Serial / Batch</th>
                  <th className="px-3 py-2">Evidence Status</th>
                  <th className="px-3 py-2">Publication Status</th>
                  <th className="px-3 py-2">Restriction Status</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Severity</th>
                  <th className="px-3 py-2">Investigator</th>
                  <th className="px-3 py-2">Due Date</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2">Current Status</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {INVESTIGATIONS_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 pl-4 font-bold text-rose-800">{row.id}</td>
                    <td className="px-3 py-2 font-semibold text-gray-900">{row.type}</td>
                    <td className="px-3 py-2 text-gray-500">{row.source}</td>
                    <td className="px-3 py-2 font-bold text-gray-900">{row.product}</td>
                    <td className="px-3 py-2 text-gray-600">{row.supplier}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-green-600 font-bold">{row.auth}</td>
                    <td className="px-3 py-2 text-green-600">{row.identity}</td>
                    <td className="px-3 py-2 text-amber-600 font-semibold">{row.pkg}</td>
                    <td className="px-3 py-2 text-amber-600 font-semibold">{row.gtin}</td>
                    <td className="px-3 py-2 text-gray-500">{row.serial}</td>
                    <td className="px-3 py-2 text-blue-600 font-semibold">{row.evidence}</td>
                    <td className="px-3 py-2 text-gray-600">{row.pub}</td>
                    <td className="px-3 py-2 text-gray-500">{row.restriction}</td>
                    <td className="px-3 py-2 font-bold text-red-600">{row.risk}</td>
                    <td className="px-3 py-2 font-bold text-red-600">{row.severity}</td>
                    <td className="px-3 py-2 text-gray-500">{row.owner}</td>
                    <td className="px-3 py-2 text-gray-400">{row.due}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.sla}</td>
                    <td className="px-3 py-2"><span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.status}</span></td>
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
        <RailSection title="Authenticity Intelligence Health">
          <HealthScoreGauge 
            score={88} 
            label="Good / Stable" 
            statusText="Good / Stable"
            statusColor="#16a34a"
            metrics={[
              { label: 'Brand Auth Coverage', value: '88%', progress: 88 },
              { label: 'Packaging Authenticity', value: '86%', progress: 86 },
              { label: 'Identifier Integrity', value: '89%', progress: 89 },
              { label: 'Seller Compliance', value: '87%', progress: 87 },
              { label: 'Evidence Readiness', value: '82%', progress: 82 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Confirmed counterfeit: Radiance Vit C</span><span className="font-bold text-red-500">4</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Unauthorized brand use detected</span><span className="font-bold text-amber-500">9</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Packaging mismatch cluster</span><span className="font-bold text-amber-500">8</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Assigned to Me</span><span className="font-bold text-gray-900">16</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Critical Risk</span><span className="font-bold text-red-500">10</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Evidence Pending</span><span className="font-bold text-amber-500">54</span></div>
          </div>
        </RailSection>

        <RailSection title="Final Authenticity Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">Open Investigation Queue</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Review Packaging Conflicts</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Review Identifier Conflicts</button>
            <button className="border border-amber-300 text-amber-900 bg-amber-50 py-1.5 rounded text-[11px] font-semibold hover:bg-amber-100">Restrict Product</button>
            <button className="border border-red-300 text-red-900 bg-red-50 py-1.5 rounded text-[11px] font-semibold hover:bg-red-100">Restrict Supplier</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
