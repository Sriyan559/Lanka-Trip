"use client";

import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Clock, ChevronDown, 
  FileText, Lock, AlertCircle, RefreshCw, Eye, CheckCircle2
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
  { index: 1, title: 'Overall Supplier Risk Score', value: '89 / 100', delta: { value: '1.8%', trend: 'up' as const }, icon: ShieldCheck, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Low-Risk Suppliers', value: '744', delta: { value: '2.4%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 3, title: 'Medium-Risk Suppliers', value: '86', delta: { value: '1.1%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 4, title: 'High-Risk Suppliers', value: '12', delta: { value: '7.7%', trend: 'down' as const }, icon: AlertTriangle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 5, title: 'Critical-Risk Suppliers', value: '4', delta: { value: '20.0%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 6, title: 'Open Compliance Cases', value: '31', delta: { value: '6.9%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 7, title: 'Compliance SLA Breaches', value: '9', delta: { value: '10.0%', trend: 'down' as const }, icon: Clock, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 8, title: 'Expiring Documents', value: '18', delta: { value: '5.3%', trend: 'down' as const }, icon: Clock, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 9, title: 'Authorization Risks', value: '14', delta: { value: '6.7%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 10, title: 'Contract Compliance Issues', value: '22', delta: { value: '10.0%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 11, title: 'Restricted Suppliers', value: '7', delta: { value: '16.7%', trend: 'up' as const }, icon: Lock, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600' },
  { index: 12, title: 'Suspended Suppliers', value: '3', delta: { value: '0.0%', trend: 'neutral' as const }, icon: Lock, iconBgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Risk Scope', value: 'Active Supplier Network' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'cases', label: 'Open Cases' },
  { id: 'critical', label: 'Critical Risk' },
  { id: 'gaps', label: 'Compliance Gaps' },
  { id: 'restrictions', label: 'Restrictions' },
  { id: 'remediation', label: 'Remediation Plans' },
  { id: 'audit', label: 'Audit Trail' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'Overall Risk Score': Math.floor(Math.random() * 10) + 85,
  'Open Cases': Math.floor(Math.random() * 15) + 20,
  'SLA Breaches': Math.floor(Math.random() * 5) + 5,
  'Critical Alerts': Math.floor(Math.random() * 3) + 1,
}));

const DONUT_DATA = [
  { name: 'Low Risk', value: 744, color: '#16a34a' },
  { name: 'Medium Risk', value: 86, color: '#d97706' },
  { name: 'High Risk', value: 12, color: '#dc2626' },
  { name: 'Critical Risk', value: 4, color: '#7a0023' },
  { name: 'Restricted', value: 7, color: '#9333ea' },
  { name: 'Suspended', value: 3, color: '#475569' },
];

const COMPLIANCE_SUMMARY_DATA = [
  { label: 'On Track', count: 542, percentage: 64.4, color: '#16a34a' },
  { label: 'At Risk', count: 148, percentage: 17.6, color: '#eab308' },
  { label: 'Under Review', count: 82, percentage: 9.7, color: '#0284c7' },
  { label: 'Breached', count: 34, percentage: 4.0, color: '#dc2626' },
  { label: 'Escalated', count: 19, percentage: 2.3, color: '#9333ea' },
  { label: 'Restricted', count: 17, percentage: 2.0, color: '#7a0023' },
];

const WORKFLOW_STEPS = [
  { step: 1, label: 'Risk Detected', count: 24 },
  { step: 2, label: 'Case Created', count: 31 },
  { step: 3, label: 'Triaged', count: 18 },
  { step: 4, label: 'Assigned', count: 15 },
  { step: 5, label: 'Evidence Requested', count: 16 },
  { step: 6, label: 'Investigation Active', count: 18 },
  { step: 7, label: 'Finding Confirmed', count: 11 },
  { step: 8, label: 'Corrective Action Required', count: 9 },
  { step: 9, label: 'Remediation Monitoring', count: 12 },
  { step: 10, label: 'Revalidation', count: 8 },
  { step: 11, label: 'Decision', count: 6 },
  { step: 12, label: 'Closed', count: 42 },
];

const RISK_TABLE = [
  { name: 'Luxe Distribution Pvt Ltd', id: 'SUP-1002', type: 'Distributor', ver: 'Verified', status: 'Compliant', score: 92, category: 'Verification', identity: '92%', auth: '90%', contract: '88%', product: '84%', financial: '76%', perf: '88%', privacy: '90%', cases: 2, docs: 5, restrictions: 1, owner: 'Elena Vance', updated: '04 Aug 2026', sla: '92%', action: 'Open Case' },
  { name: 'Velvet Botanics Inc.', id: 'SUP-0845', type: 'Manufacturer', ver: 'Verified', status: 'Compliant', score: 78, category: 'Product Safety', identity: '85%', auth: '82%', contract: '80%', product: '65%', financial: '72%', perf: '82%', privacy: '86%', cases: 1, docs: 3, restrictions: 0, owner: 'Marco Lee', updated: '04 Aug 2026', sla: '95%', action: 'Open Case' },
  { name: 'Tokyo Beauty Dist.', id: 'SUP-2109', type: 'Distributor', ver: 'Under Review', status: 'At Risk', score: 68, category: 'Authorization', identity: '70%', auth: '60%', contract: '64%', product: '80%', financial: '56%', perf: '76%', privacy: '82%', cases: 4, docs: 8, restrictions: 1, owner: 'Priya Nair', updated: '04 Aug 2026', sla: '74%', action: 'Open Case' },
  { name: 'Pure Glow Imports', id: 'SUP-0042', type: 'Importer', ver: 'Verified', status: 'Compliant', score: 56, category: 'Financial', identity: '60%', auth: '58%', contract: '52%', product: '70%', financial: '50%', perf: '60%', privacy: '75%', cases: 3, docs: 6, restrictions: 2, owner: 'Aisha Rahman', updated: '03 Aug 2026', sla: '68%', action: 'Open Case' },
];

export default function SupplierRiskCompliancePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Risk &amp; Compliance</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Risk &amp; Compliance</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor supplier risk, compliance obligations, investigations, restrictions, and remediation across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Risk Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Run Risk Reassessment</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ Create Compliance Case</button>
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
            <h3 className="text-[13px] font-bold mb-3">Supplier Risk &amp; Compliance Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#d97706', '#dc2626', '#7a0023']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Risk Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total" totalValue="842" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Issue Status / Compliance Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={COMPLIANCE_SUMMARY_DATA} total={842} />
            </div>
          </div>
        </div>

        {/* Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Identity &amp; Ownership</span> <span className="font-bold text-gray-900 ml-1">92%</span></div>
          <div><span className="text-gray-500">Verification Coverage</span> <span className="font-bold text-gray-900 ml-1">89%</span></div>
          <div><span className="text-gray-500">Authorization Compliance</span> <span className="font-bold text-gray-900 ml-1">86%</span></div>
          <div><span className="text-gray-500">Contract Compliance</span> <span className="font-bold text-gray-900 ml-1">84%</span></div>
          <div><span className="text-gray-500">Catalogue Readiness</span> <span className="font-bold text-gray-900 ml-1">82%</span></div>
          <div><span className="text-gray-500">Product Safety</span> <span className="font-bold text-gray-900 ml-1">78%</span></div>
          <div><span className="text-gray-500">Financial Control</span> <span className="font-bold text-gray-900 ml-1">74%</span></div>
          <div><span className="text-gray-500">Performance Compliance</span> <span className="font-bold text-gray-900 ml-1">85%</span></div>
          <div><span className="text-gray-500">Data Privacy &amp; Security</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
          <div><span className="text-gray-500">Audit Readiness</span> <span className="font-bold text-gray-900 ml-1">80%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search suppliers by name, ID, or legal entity..."
          filters={[
            { id: 'type', label: 'Supplier Type', options: [] },
            { id: 'status', label: 'Supplier Status', options: [] },
            { id: 'risk', label: 'Risk Level', options: [] },
            { id: 'bu', label: 'Business Unit', options: [] },
            { id: 'category', label: 'Primary Risk Category', options: [] },
            { id: 'compliance', label: 'Compliance Status', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2 mb-6">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1600px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 pl-4">Supplier / Legal Entity</th>
                  <th className="px-3 py-2">Supplier ID</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Verification Status</th>
                  <th className="px-3 py-2">Compliance Status</th>
                  <th className="px-3 py-2 font-bold">Overall Risk Score</th>
                  <th className="px-3 py-2">Primary Risk Category</th>
                  <th className="px-3 py-2">Identity Risk</th>
                  <th className="px-3 py-2">Authorization Risk</th>
                  <th className="px-3 py-2">Contract Risk</th>
                  <th className="px-3 py-2">Product Risk</th>
                  <th className="px-3 py-2">Financial Risk</th>
                  <th className="px-3 py-2">Performance Risk</th>
                  <th className="px-3 py-2">Privacy Risk</th>
                  <th className="px-3 py-2 text-center">Open Cases</th>
                  <th className="px-3 py-2 text-center">Expiring Docs</th>
                  <th className="px-3 py-2 text-center">Restrictions</th>
                  <th className="px-3 py-2">Risk Owner</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {RISK_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 pl-4 font-bold text-gray-900">{row.name}</td>
                    <td className="px-3 py-2 text-gray-500">{row.id}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">{row.ver}</td>
                    <td className="px-3 py-2"><span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.status}</span></td>
                    <td className="px-3 py-2 font-bold text-rose-800 text-sm">{row.score}</td>
                    <td className="px-3 py-2 text-gray-600">{row.category}</td>
                    <td className="px-3 py-2 text-gray-700">{row.identity}</td>
                    <td className="px-3 py-2 text-gray-700">{row.auth}</td>
                    <td className="px-3 py-2 text-gray-700">{row.contract}</td>
                    <td className="px-3 py-2 text-gray-700">{row.product}</td>
                    <td className="px-3 py-2 text-gray-700">{row.financial}</td>
                    <td className="px-3 py-2 text-gray-700">{row.perf}</td>
                    <td className="px-3 py-2 text-gray-700">{row.privacy}</td>
                    <td className="px-3 py-2 text-center font-bold">{row.cases}</td>
                    <td className="px-3 py-2 text-center font-bold">{row.docs}</td>
                    <td className="px-3 py-2 text-center font-bold text-red-600">{row.restrictions}</td>
                    <td className="px-3 py-2 text-gray-500">{row.owner}</td>
                    <td className="px-3 py-2 text-gray-400">{row.updated}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.sla}</td>
                    <td className="px-3 py-2 text-center">
                      <button className="bg-[#171717] text-white px-2.5 py-1 rounded text-[10px] font-bold hover:bg-black">{row.action}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Workflow Strip: Compliance Case Operations */}
        <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
          <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Compliance Case Operations</h3>
          <div className="flex items-center justify-between overflow-x-auto text-center text-[10px]">
            {WORKFLOW_STEPS.map((ws, idx) => (
              <div key={ws.step} className="flex items-center">
                <div className="flex flex-col items-center p-1.5 bg-gray-50 border border-gray-200 rounded min-w-[85px]">
                  <span className="text-gray-400 font-bold">{ws.step}</span>
                  <span className="font-semibold text-gray-800 line-clamp-1">{ws.label}</span>
                  <span className="font-bold text-gray-900 mt-0.5 text-xs">{ws.count}</span>
                </div>
                {idx < WORKFLOW_STEPS.length - 1 && <span className="text-gray-300 mx-1">→</span>}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Supplier Risk Health">
          <HealthScoreGauge 
            score={89} 
            label="Stable" 
            statusText="Stable"
            statusColor="#16a34a"
            metrics={[
              { label: 'Identity', value: '92%', progress: 92 },
              { label: 'Verification', value: '89%', progress: 89 },
              { label: 'Authorization', value: '84%', progress: 84 },
              { label: 'Contract', value: '84%', progress: 84 },
              { label: 'Product Safety', value: '78%', progress: 78 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Critical risk detected</span><span className="font-bold text-red-500">4</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Missing KYC documents</span><span className="font-bold text-amber-500">8</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Insurance expiry in 30 days</span><span className="font-bold text-amber-500">6</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Assigned Reviews</span><span className="font-bold text-gray-900">24</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Critical Cases</span><span className="font-bold text-red-500">4</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Revalidations</span><span className="font-bold text-amber-500">12</span></div>
          </div>
        </RailSection>

        <RailSection title="Final Risk Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">Create Compliance Case</button>
            <button className="border border-amber-300 text-amber-900 bg-amber-50 py-1.5 rounded text-[11px] font-semibold hover:bg-amber-100">Restrict Supplier</button>
            <button className="border border-red-300 text-red-900 bg-red-50 py-1.5 rounded text-[11px] font-semibold hover:bg-red-100">Suspend Supplier</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
