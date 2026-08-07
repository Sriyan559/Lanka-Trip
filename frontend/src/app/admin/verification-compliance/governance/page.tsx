"use client";

import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, Clock, AlertTriangle, ChevronDown, 
  ShieldCheck, AlertCircle, RefreshCw, Eye, Lock, Sliders, ShieldAlert
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
  { index: 1, title: 'Total Compliance Rules', value: '428', delta: { value: '8.1%', trend: 'up' as const }, icon: Sliders, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Active Rules', value: '362', delta: { value: '6.4%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 3, title: 'Draft Rules', value: '24', delta: { value: '9.1%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 4, title: 'Pending Approval', value: '18', delta: { value: '12.8%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 5, title: 'Scheduled Rules', value: '14', delta: { value: '3.7%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 6, title: 'Rule Conflicts', value: '9', delta: { value: '18.2%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 7, title: 'Policy Versions Active', value: '18', delta: { value: '5.6%', trend: 'up' as const }, icon: ShieldCheck, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 8, title: 'SLA Definitions', value: '36', delta: { value: '6.7%', trend: 'up' as const }, icon: Sliders, iconBgColor: 'bg-teal-50', iconColor: 'text-teal-600' },
  { index: 9, title: 'Escalation Paths', value: '12', delta: { value: '9.1%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 10, title: 'Exceptions Active', value: '7', delta: { value: '7.7%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  { index: 11, title: 'Rules Revalidation Due', value: '26', delta: { value: '14.3%', trend: 'up' as const }, icon: RefreshCw, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { index: 12, title: 'Governance SLA Breaches', value: '5', delta: { value: '25.0%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Governance Scope', value: 'Active Controls' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'rules', label: 'Compliance Rules' },
  { id: 'policies', label: 'Policies' },
  { id: 'drafts', label: 'Drafts' },
  { id: 'pending', label: 'Pending Approval' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'active', label: 'Active' },
  { id: 'conflicts', label: 'Conflicts' },
  { id: 'sla', label: 'SLA Definitions' },
  { id: 'escalations', label: 'Escalation Paths' },
  { id: 'exceptions', label: 'Exceptions & Waivers' },
  { id: 'revalidation', label: 'Revalidation' },
  { id: 'retired', label: 'Retired' },
  { id: 'audit', label: 'Audit History' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'Active Rules': Math.floor(Math.random() * 20) + 340,
  Approvals: Math.floor(Math.random() * 15) + 30,
  Conflicts: Math.floor(Math.random() * 5) + 5,
  Escalations: Math.floor(Math.random() * 8) + 10,
  Revalidations: Math.floor(Math.random() * 10) + 20,
}));

const DONUT_DATA = [
  { name: 'Product Safety', value: 128, color: '#0284c7' },
  { name: 'Supplier Verification', value: 92, color: '#16a34a' },
  { name: 'Brand Authorization', value: 68, color: '#9333ea' },
  { name: 'Documents', value: 56, color: '#d97706' },
  { name: 'Authenticity', value: 36, color: '#eab308' },
  { name: 'Recall', value: 28, color: '#dc2626' },
  { name: 'Marketplace Policy', value: 20, color: '#6b7280' },
];

const STATUS_SUMMARY_DATA = [
  { label: 'Draft', count: 24, percentage: 5.6, color: '#eab308' },
  { label: 'Pending Approval', count: 18, percentage: 4.2, color: '#d97706' },
  { label: 'Active', count: 362, percentage: 84.6, color: '#16a34a' },
  { label: 'Scheduled', count: 14, percentage: 3.3, color: '#0284c7' },
  { label: 'Conflict Review', count: 9, percentage: 2.1, color: '#dc2626' },
  { label: 'Escalated', count: 7, percentage: 1.6, color: '#9333ea' },
  { label: 'Retired', count: 12, percentage: 2.8, color: '#6b7280' },
];

const RULES_TABLE = [
  { name: 'High-Concentration Active Ingredient Safety Evidence', id: 'RULE-SAFETY-0015', domain: 'Product Safety', type: 'Validation', trigger: 'Product Onboard', summary: 'Active ingredient > defined threshold', control: 'Block / Escalate', scope: 'Products, Suppliers', severity: 'Critical', conflict: 'None', version: 'v3.2', owner: 'Elena Vance', effective: '06 Aug 2025', expiry: '06 Aug 2026', status: 'Active', updated: '04 Aug 2026' },
  { name: 'Vendor Certification Expiry Warning', id: 'RULE-VENDOR-0042', domain: 'Supplier Verification', type: 'Monitoring', trigger: 'Cert Expiry', summary: 'Certificated expires within 30 days', control: 'Notify / Escalate', scope: 'Suppliers', severity: 'High', conflict: 'None', version: 'v2.1', owner: 'Marco Lee', effective: '01 Aug 2025', expiry: '01 Aug 2026', status: 'Active', updated: '04 Aug 2026' },
  { name: 'Unauthorized Claim Publication Block', id: 'RULE-CLAIMS-0031', domain: 'Brand Authorization', type: 'Prevention', trigger: 'Content Publish', summary: 'Claims not in approved list', control: 'Block Publication', scope: 'Listings, Brands', severity: 'Medium', conflict: 'Moderate', version: 'v1.8', owner: 'Priya Kapoor', effective: '15 Jul 2025', expiry: '15 Jul 2026', status: 'Active', updated: '03 Aug 2026' },
  { name: 'Mobile App Recall Escalation Threshold', id: 'RULE-RECALL-0008', domain: 'Recall', type: 'Escalation', trigger: 'Recall Reported', summary: 'Impact score > 70 / Critical', control: 'Escalate to Level 1', scope: 'Products, Batches', severity: 'Critical', conflict: 'None', version: 'v2.5', owner: 'Elena Vance', effective: '10 Jul 2025', expiry: '10 Jul 2026', status: 'Active', updated: '04 Aug 2026' },
];

const WORKFLOW_STEPS = [
  { step: 1, label: 'Draft Created' },
  { step: 2, label: 'Rule Defined' },
  { step: 3, label: 'Scope Configured' },
  { step: 4, label: 'Simulation Run' },
  { step: 5, label: 'Conflict Review' },
  { step: 6, label: 'Peer Review' },
  { step: 7, label: 'Approval Requested' },
  { step: 8, label: 'Approved' },
  { step: 9, label: 'Approved', active: true },
  { step: 10, label: 'Scheduled' },
  { step: 11, label: 'Active' },
  { step: 12, label: 'Monitored' },
  { step: 13, label: 'Revalidation' },
  { step: 14, label: 'Suspended' },
  { step: 15, label: 'Retired' },
  { step: 16, label: 'Rolled Back' },
];

export default function ComplianceGovernancePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Rules &amp; Policies</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Compliance Rules, Policies, SLA &amp; Escalations</h1>
            <p className="text-xs text-gray-500 mt-1">Manage compliance rules, policy governance, SLA controls, escalations, exceptions, revalidation and audit-ready publishing across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Governance Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Review Rule Conflicts</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ Create Compliance Rule</button>
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
            <h3 className="text-[13px] font-bold mb-3">Governance Activity Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#16a34a', '#0284c7', '#dc2626', '#d97706', '#9333ea']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Rule Domain Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total Rules" totalValue="428" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Governance Status Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={STATUS_SUMMARY_DATA} total={428} />
            </div>
          </div>
        </div>

        {/* Health Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Triage Readiness</span> <span className="font-bold text-gray-900 ml-1">92%</span></div>
          <div><span className="text-gray-500">Policy Coverage</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
          <div><span className="text-gray-500">Rule Accuracy</span> <span className="font-bold text-gray-900 ml-1">90%</span></div>
          <div><span className="text-gray-500">SLA Compliance</span> <span className="font-bold text-gray-900 ml-1">86%</span></div>
          <div><span className="text-gray-500">Escalation Control</span> <span className="font-bold text-gray-900 ml-1">84%</span></div>
          <div><span className="text-gray-500">Conflict Resolution</span> <span className="font-bold text-gray-900 ml-1">78%</span></div>
          <div><span className="text-gray-500">Exception Governance</span> <span className="font-bold text-gray-900 ml-1">81%</span></div>
          <div><span className="text-gray-500">Approval Governance</span> <span className="font-bold text-gray-900 ml-1">87%</span></div>
          <div><span className="text-gray-500">Revalidation Readiness</span> <span className="font-bold text-gray-900 ml-1">79%</span></div>
          <div><span className="text-gray-500">Audit Readiness</span> <span className="font-bold text-gray-900 ml-1">85%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search rule, policy, SLA, escalation or owner..."
          filters={[
            { id: 'domain', label: 'Rule Domain', options: [] },
            { id: 'status', label: 'Status', options: [] },
            { id: 'severity', label: 'Severity', options: [] },
            { id: 'bu', label: 'Business Unit', options: [] },
            { id: 'channel', label: 'Channel', options: [] },
            { id: 'region', label: 'Region', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Split Workspace */}
        <div className="grid grid-cols-12 gap-4 mt-2 mb-6">
          
          {/* Table */}
          <div className="col-span-8 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1200px]">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-3 py-2 pl-4">Rule Name</th>
                    <th className="px-3 py-2">Rule ID</th>
                    <th className="px-3 py-2">Rule Domain</th>
                    <th className="px-3 py-2">Rule Type</th>
                    <th className="px-3 py-2">Severity</th>
                    <th className="px-3 py-2">Conflict Status</th>
                    <th className="px-3 py-2">Version</th>
                    <th className="px-3 py-2">Rule Owner</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {RULES_TABLE.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-3 py-2 pl-4 font-bold text-gray-900">{row.name}</td>
                      <td className="px-3 py-2 text-rose-800 font-bold">{row.id}</td>
                      <td className="px-3 py-2 text-gray-600">{row.domain}</td>
                      <td className="px-3 py-2 text-gray-600">{row.type}</td>
                      <td className="px-3 py-2 font-bold text-red-600">{row.severity}</td>
                      <td className="px-3 py-2 text-green-600 font-semibold">{row.conflict}</td>
                      <td className="px-3 py-2 text-gray-500">{row.version}</td>
                      <td className="px-3 py-2 text-gray-600">{row.owner}</td>
                      <td className="px-3 py-2"><span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.status}</span></td>
                      <td className="px-3 py-2 text-center"><button className="text-gray-400 hover:text-gray-900">⋮</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Rule Preview */}
          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col text-[11px]">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Selected Rule Preview</span>
                <h4 className="font-bold text-gray-900 text-xs mt-0.5">High-Concentration Active Ingredient Safety Evidence</h4>
              </div>
              <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded font-bold text-[10px]">Active</span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-2 bg-gray-50 p-2 rounded border border-gray-100">
              <div><span className="text-gray-400">Rule ID:</span> <span className="font-bold text-gray-800">RULE-SAFETY-0015</span></div>
              <div><span className="text-gray-400">Severity:</span> <span className="font-bold text-red-600">CRITICAL</span></div>
              <div><span className="text-gray-400">Domain:</span> <span className="font-semibold text-gray-800">Product Safety</span></div>
              <div><span className="text-gray-400">Version:</span> <span className="font-semibold text-gray-800">v3.2</span></div>
            </div>

            <div className="space-y-1.5 my-2 text-gray-700">
              <div><span className="font-bold text-gray-900">Trigger Summary:</span> Product onboarding with active ingredient concentration &gt; defined threshold.</div>
              <div><span className="font-bold text-gray-900">Outcome / Control:</span> Block product onboarding and escalate to Product Safety team.</div>
              <div><span className="font-bold text-gray-900">Scope &amp; Eligibility:</span> All Business Units, All Channels, Sri Lanka Region.</div>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
              <button className="bg-[#7a0023] text-white px-3 py-1.5 rounded font-semibold hover:bg-[#a0002b] flex-1">Edit Rule</button>
              <button className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded font-semibold hover:bg-gray-50 flex-1">Run Simulation</button>
              <button className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded font-semibold hover:bg-gray-50 flex-1">View Policy</button>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Lifecycle Workflow */}
        <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
          <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Compliance Rule Lifecycle / Workflow</h3>
          <div className="flex items-center justify-between overflow-x-auto text-center text-[10px]">
            {WORKFLOW_STEPS.map((ws) => (
              <div key={ws.step} className="flex items-center">
                <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded border ${ws.active ? 'bg-[#7a0023] text-white border-[#7a0023] font-bold' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  <span>{ws.step}.</span>
                  <span>{ws.label}</span>
                </div>
                {ws.step < 16 && <span className="text-gray-300 mx-0.5">→</span>}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Governance Intelligence Health">
          <HealthScoreGauge 
            score={88} 
            label="Good / Stable" 
            statusText="Good / Stable"
            statusColor="#16a34a"
            metrics={[
              { label: 'Rule Coverage', value: '90%', progress: 90 },
              { label: 'Policy Accuracy', value: '88%', progress: 88 },
              { label: 'SLA Health', value: '86%', progress: 86 },
              { label: 'Escalation Readiness', value: '85%', progress: 85 },
              { label: 'Conflict Control', value: '78%', progress: 78 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Critical rule conflict detected</span><span className="font-bold text-red-500">9</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">SLA breach for 5 owners</span><span className="font-bold text-amber-500">5</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Revalidation due for 26 rules</span><span className="font-bold text-amber-500">26</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Assigned to Me</span><span className="font-bold text-gray-900">18</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Critical Conflicts</span><span className="font-bold text-red-500">6</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Pending Approval</span><span className="font-bold text-amber-500">18</span></div>
          </div>
        </RailSection>

        <RailSection title="Final Governance Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">Publish Rule Changes</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Bulk Revalidation</button>
            <button className="border border-red-300 text-red-900 bg-red-50 py-1.5 rounded text-[11px] font-semibold hover:bg-red-100">Review Conflicts</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Export Governance Report</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
