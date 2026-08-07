"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, Clock, AlertTriangle, ChevronDown, 
  FileText, ShieldAlert, AlertCircle, RefreshCw, Eye, Lock, Award
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
  { index: 1, title: 'Overall Compliance Health', value: '89 / 100', delta: { value: '2.4%', trend: 'up' as const }, icon: ShieldCheck, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 2, title: 'Pending Document Verifications', value: '286', delta: { value: '18.7%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 3, title: 'Active Product Safety Cases', value: '38', delta: { value: '5.6%', trend: 'down' as const }, icon: ShieldCheck, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 4, title: 'Open Authenticity Investigations', value: '156', delta: { value: '12.4%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 5, title: 'Active Recall Cases', value: '4', delta: { value: '33.0%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 6, title: 'Rule Conflicts', value: '9', delta: { value: '18.2%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 7, title: 'Compliance SLA Breaches', value: '16', delta: { value: '23.1%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 8, title: 'Expiring Documents (30d)', value: '248', delta: { value: '9.1%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 9, title: 'Missing Mandatory Docs', value: '124', delta: { value: '17.8%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  { index: 10, title: 'Restricted Suppliers', value: '7', delta: { value: '16.7%', trend: 'up' as const }, icon: Lock, iconBgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
  { index: 11, title: 'Active Compliance Rules', value: '362', delta: { value: '6.4%', trend: 'up' as const }, icon: Award, iconBgColor: 'bg-teal-50', iconColor: 'text-teal-600' },
  { index: 12, title: 'Audit Readiness Score', value: '88 / 100', delta: { value: '1.2%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Command Scope', value: 'All Compliance Operations' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'documents', label: 'Documents' },
  { id: 'safety', label: 'Product Safety' },
  { id: 'authenticity', label: 'Authenticity' },
  { id: 'recalls', label: 'Recalls' },
  { id: 'governance', label: 'Governance' },
  { id: 'reports', label: 'Reports' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'Verified Documents': Math.floor(Math.random() * 50) + 200,
  'Open Cases': Math.floor(Math.random() * 30) + 120,
  'Resolved Incidents': Math.floor(Math.random() * 20) + 80,
  'SLA Breaches': Math.floor(Math.random() * 5) + 5,
}));

const DONUT_DATA = [
  { name: 'Document Verification', value: 286, color: '#0284c7' },
  { name: 'Authenticity Investigations', value: 156, color: '#9333ea' },
  { name: 'Product Safety', value: 38, color: '#16a34a' },
  { name: 'Recalls & Incidents', value: 18, color: '#dc2626' },
  { name: 'Rule Conflicts', value: 9, color: '#d97706' },
];

const SUMMARY_DATA = [
  { label: 'On Track', count: 482, percentage: 61.2, color: '#16a34a' },
  { label: 'Under Review', count: 184, percentage: 23.4, color: '#0284c7' },
  { label: 'At Risk', count: 68, percentage: 8.6, color: '#eab308' },
  { label: 'Breached', count: 32, percentage: 4.1, color: '#dc2626' },
  { label: 'Escalated', count: 21, percentage: 2.7, color: '#9333ea' },
];

const OPERATIONS_TABLE = [
  { id: 'DOC-2026-08421', domain: 'Document Verification', type: 'Certificate', name: 'ISO 9001 Certificate', entity: 'Luxe Distribution Pvt Ltd', risk: 'Low', severity: 'Low', owner: 'Aruna Silva', sla: '92%', status: 'Verified' },
  { id: 'CASE-SAFETY-0042', domain: 'Product Safety', type: 'Safety Review', name: 'Radiance Vitamin C Serum', entity: 'Luxe Botanicals', risk: 'Medium', severity: 'Medium', owner: 'Elena Vance', sla: '86%', status: 'Under Review' },
  { id: 'AUTH-INV-00458', domain: 'Authenticity', type: 'Counterfeit', name: 'Radiance Vitamin C Serum', entity: 'Luxe Distribution Pvt Ltd', risk: 'Critical', severity: 'High', owner: 'Elena Vance', sla: '82%', status: 'Under Review' },
  { id: 'RCL-2025-00891', domain: 'Recall', type: 'Adverse Reaction', name: 'Radiance Vitamin C Serum', entity: 'Glow Labs Pvt Ltd', risk: 'Critical', severity: 'High', owner: 'Meera Silva', sla: '-2d', status: 'Active Recall' },
];

export default function VerificationComplianceCommandCenterPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Command Center</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Verification &amp; Compliance Command Center</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor supplier verification, document compliance, product safety, authenticity investigations, recalls, governance, and audit readiness across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Overview Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Review Pending Cases</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ Create Compliance Case</button>
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
            <h3 className="text-[13px] font-bold mb-3">Compliance Activity Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#16a34a', '#0284c7', '#d97706', '#dc2626']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Domain &amp; Risk Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Active Cases" totalValue="507" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Operational Status Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={SUMMARY_DATA} total={787} />
            </div>
          </div>
        </div>

        {/* Health Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Document Verification</span> <span className="font-bold text-gray-900 ml-1">92%</span></div>
          <div><span className="text-gray-500">Product Safety</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
          <div><span className="text-gray-500">Authenticity Control</span> <span className="font-bold text-gray-900 ml-1">91%</span></div>
          <div><span className="text-gray-500">Recall Containment</span> <span className="font-bold text-gray-900 ml-1">84%</span></div>
          <div><span className="text-gray-500">Governance Coverage</span> <span className="font-bold text-gray-900 ml-1">90%</span></div>
          <div><span className="text-gray-500">Audit Readiness</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search cases by ID, domain, supplier, brand or product..."
          filters={[
            { id: 'domain', label: 'Compliance Domain', options: [] },
            { id: 'status', label: 'Status', options: [] },
            { id: 'risk', label: 'Risk Level', options: [] },
            { id: 'owner', label: 'Owner', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2 mb-6">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1200px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 pl-4">Case / Entity ID</th>
                  <th className="px-3 py-2 font-bold">Domain</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2 font-bold">Entity Name</th>
                  <th className="px-3 py-2">Supplier / Brand</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Severity</th>
                  <th className="px-3 py-2">Owner</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {OPERATIONS_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 pl-4 font-bold text-rose-800">{row.id}</td>
                    <td className="px-3 py-2 font-bold text-gray-900">{row.domain}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 font-bold text-gray-900">{row.name}</td>
                    <td className="px-3 py-2 text-gray-600">{row.entity}</td>
                    <td className="px-3 py-2 font-bold text-red-600">{row.risk}</td>
                    <td className="px-3 py-2 font-bold text-red-600">{row.severity}</td>
                    <td className="px-3 py-2 text-gray-500">{row.owner}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.sla}</td>
                    <td className="px-3 py-2"><span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.status}</span></td>
                    <td className="px-3 py-2 text-center"><button className="bg-[#171717] text-white px-2.5 py-1 rounded text-[10px] font-bold hover:bg-black">Open Case</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Overall Compliance Health">
          <HealthScoreGauge 
            score={89} 
            label="Stable" 
            statusText="Stable"
            statusColor="#16a34a"
            metrics={[
              { label: 'Document Verification', value: '92%', progress: 92 },
              { label: 'Product Safety', value: '88%', progress: 88 },
              { label: 'Authenticity Control', value: '91%', progress: 91 },
              { label: 'Recall Containment', value: '84%', progress: 84 },
              { label: 'Governance', value: '90%', progress: 90 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Critical recall active</span><span className="font-bold text-red-500">4</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Rule conflicts detected</span><span className="font-bold text-red-500">9</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">SLA breaches pending review</span><span className="font-bold text-amber-500">16</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Pending Documents</span><span className="font-bold text-gray-900">286</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Authenticity Cases</span><span className="font-bold text-purple-600">156</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Safety Cases</span><span className="font-bold text-blue-600">38</span></div>
          </div>
        </RailSection>

        <RailSection title="Command Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">+ Create Compliance Case</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Run Audit Assessment</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">View System Log</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
