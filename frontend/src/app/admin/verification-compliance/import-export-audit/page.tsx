"use client";

import React, { useState } from 'react';
import { 
  Download, Upload, CheckCircle2, Clock, AlertTriangle, ChevronDown, 
  FileText, Layers, AlertCircle, RefreshCw, Eye
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';

const KPI_DATA = [
  { index: 1, title: 'Imports This Period', value: '1,248', delta: { value: '12.4%', trend: 'up' as const }, icon: Upload, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Successful Imports', value: '1,102', delta: { value: '9.8%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 3, title: 'Partial Imports', value: '96', delta: { value: '4.3%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 4, title: 'Failed Imports', value: '50', delta: { value: '18.1%', trend: 'down' as const }, icon: AlertTriangle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 5, title: 'Records Processed', value: '4.2M', delta: { value: '22.6%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 6, title: 'Records Rejected', value: '31,240', delta: { value: '15.7%', trend: 'down' as const }, icon: AlertCircle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600' },
  { index: 7, title: 'Mapping Issues', value: '128', delta: { value: '6.2%', trend: 'up' as const }, icon: Layers, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 8, title: 'Duplicate Conflicts', value: '76', delta: { value: '3.1%', trend: 'down' as const }, icon: RefreshCw, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 9, title: 'Exports Generated', value: '842', delta: { value: '11.3%', trend: 'up' as const }, icon: Download, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { index: 10, title: 'Scheduled Exports', value: '34', delta: { value: '6.3%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 11, title: 'Export Failures', value: '9', delta: { value: '28.6%', trend: 'down' as const }, icon: AlertTriangle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 12, title: 'Pending Review Jobs', value: '18', delta: { value: '5.9%', trend: 'up' as const }, icon: Eye, iconBgColor: 'bg-teal-50', iconColor: 'text-teal-600' },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Data Scope', value: 'Compliance Data Operations' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  Imports: Math.floor(Math.random() * 50) + 120,
  Exports: Math.floor(Math.random() * 40) + 90,
  'Processed Records': Math.floor(Math.random() * 200) + 600,
  'Failed Records': Math.floor(Math.random() * 10) + 2,
}));

const DONUT_DATA = [
  { name: 'Completed', value: 872, color: '#16a34a' },
  { name: 'Pending Review', value: 198, color: '#0284c7' },
  { name: 'Failed', value: 92, color: '#dc2626' },
  { name: 'Scheduled', value: 156, color: '#9333ea' },
  { name: 'Running', value: 78, color: '#d97706' },
  { name: 'Draft', value: 56, color: '#6b7280' },
];

const JOBS_TABLE = [
  { id: 'IMP-8902', type: 'Import', domain: 'Supplier Data', file: 'Supplier_Master_v3.2.xlsx', source: 'SFTP', scope: 'All BUs', user: 'Amanda R.', records: '125,430', mapping: 'In Progress', validation: 'In Progress', duplicates: '76 Conflicts', approval: 'Pending', exec: '—', recon: '—', outcome: 'In Progress', updated: '20 May 2025 1:15 PM' },
  { id: 'IMP-8896', type: 'Import', domain: 'Product Compliance', file: 'Prod_Compliance_0518.csv', source: 'Portal', scope: 'All BUs', user: 'Rohan M.', records: '98,765', mapping: 'Success', validation: 'Success', duplicates: '2 Conflicts', approval: 'Approved', exec: 'Queued', recon: '—', outcome: 'Queued', updated: '20 May 2025 11:42 AM' },
  { id: 'IMP-8891', type: 'Import', domain: 'Document Data', file: 'Docs_Batch_52025.zip', source: 'Portal', scope: 'All BUs', user: 'Nimal P.', records: '76,120', mapping: 'Success', validation: 'Success', duplicates: '0', approval: 'Approved', exec: 'Success', recon: 'Reconciled', outcome: 'Success', updated: '20 May 2025 10:28 AM' },
  { id: 'EXP-2216', type: 'Export', domain: 'Compliance Reports', file: 'Compliance_Feed_May20.csv', source: 'System', scope: 'All BUs', user: 'Elena V.', records: '512,340', mapping: '—', validation: '—', duplicates: '—', approval: 'Approved', exec: 'Running', recon: '—', outcome: 'Running', updated: '20 May 2025 1:05 PM' },
];

const WORKFLOW_STEPS = [
  { step: 1, label: 'Select Type' },
  { step: 2, label: 'Upload File' },
  { step: 3, label: 'File Inspection' },
  { step: 4, label: 'Field Mapping', active: true },
  { step: 5, label: 'Validation' },
  { step: 6, label: 'Duplicate Review' },
  { step: 7, label: 'Change Preview' },
  { step: 8, label: 'Approval' },
  { step: 9, label: 'Execute' },
  { step: 10, label: 'Reconcile' },
];

export default function ComplianceImportExportAuditPage() {
  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Import, Export &amp; Audit</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Compliance Import, Export &amp; Audit</h1>
            <p className="text-xs text-gray-500 mt-1">Manage governed compliance data exchange, validation, reconciliation, export security, retention controls, and immutable audit history across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Operations Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Schedule Export</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ New Import</button>
          </div>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar 
          items={CONTEXT_ITEMS} 
          lastSynced="May 20, 2025 1:32 PM" 
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
          <div className="col-span-8 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Compliance Data Operations Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#16a34a', '#9333ea', '#dc2626']} />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Job Status Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total Jobs" totalValue="1,452" />
            </div>
          </div>
        </div>

        {/* Health Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">File Validation</span> <span className="font-bold text-gray-900 ml-1">96/100</span></div>
          <div><span className="text-gray-500">Mapping Accuracy</span> <span className="font-bold text-gray-900 ml-1">92/100</span></div>
          <div><span className="text-gray-500">Approval Readiness</span> <span className="font-bold text-gray-900 ml-1">90/100</span></div>
          <div><span className="text-gray-500">Execution Control</span> <span className="font-bold text-gray-900 ml-1">93/100</span></div>
          <div><span className="text-gray-500">Reconciliation</span> <span className="font-bold text-gray-900 ml-1">88/100</span></div>
          <div><span className="text-gray-500">Audit Completeness</span> <span className="font-bold text-gray-900 ml-1">95/100</span></div>
        </div>

        {/* Filters */}
        <FilterToolbar 
          searchPlaceholder="Search jobs, files, templates, sources..."
          filters={[
            { id: 'type', label: 'Job Type', options: [] },
            { id: 'source', label: 'Source', options: [] },
            { id: 'bu', label: 'Business Unit', options: [] },
            { id: 'template', label: 'Template', options: [] },
            { id: 'status', label: 'Approval Status', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2 mb-6">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1600px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">Job ID</th>
                  <th className="px-3 py-2">Operation Type</th>
                  <th className="px-3 py-2">Data Domain</th>
                  <th className="px-3 py-2">File / Template</th>
                  <th className="px-3 py-2">Source</th>
                  <th className="px-3 py-2">Scope</th>
                  <th className="px-3 py-2">Submitted By</th>
                  <th className="px-3 py-2 font-bold">Records</th>
                  <th className="px-3 py-2">Mapping</th>
                  <th className="px-3 py-2">Validation</th>
                  <th className="px-3 py-2 text-center">Duplicates</th>
                  <th className="px-3 py-2">Approval</th>
                  <th className="px-3 py-2">Execution</th>
                  <th className="px-3 py-2">Reconciliation</th>
                  <th className="px-3 py-2">Outcome</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {JOBS_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 font-bold text-gray-900">{row.id}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 font-semibold text-gray-900">{row.domain}</td>
                    <td className="px-3 py-2 text-gray-600">{row.file}</td>
                    <td className="px-3 py-2 text-gray-500">{row.source}</td>
                    <td className="px-3 py-2 text-gray-500">{row.scope}</td>
                    <td className="px-3 py-2 text-gray-600">{row.user}</td>
                    <td className="px-3 py-2 font-bold text-gray-900">{row.records}</td>
                    <td className="px-3 py-2 text-blue-600 font-bold">{row.mapping}</td>
                    <td className="px-3 py-2 font-semibold text-blue-600">{row.validation}</td>
                    <td className="px-3 py-2 text-center font-bold text-amber-600">{row.duplicates}</td>
                    <td className="px-3 py-2 text-gray-600">{row.approval}</td>
                    <td className="px-3 py-2 text-gray-600">{row.exec}</td>
                    <td className="px-3 py-2 text-gray-600">{row.recon}</td>
                    <td className="px-3 py-2"><span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.outcome}</span></td>
                    <td className="px-3 py-2 text-gray-400">{row.updated}</td>
                    <td className="px-3 py-2 text-center"><button className="text-gray-400 hover:text-gray-900">⋮</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Workflow Component: Active Compliance Import Workflow — IMP-8902 */}
        <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
          <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Active Compliance Import Workflow — IMP-8902</h3>
          <div className="flex items-center justify-between overflow-x-auto text-center text-[10px]">
            {WORKFLOW_STEPS.map((ws) => (
              <div key={ws.step} className="flex items-center">
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded border ${ws.active ? 'bg-[#7a0023] text-white border-[#7a0023] font-bold' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  <span>{ws.step}.</span>
                  <span>{ws.label}</span>
                </div>
                {ws.step < 10 && <span className="text-gray-300 mx-1">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Operational Panels (5 Panels) */}
        <div className="grid grid-cols-5 gap-3 text-[11px] mb-6">
          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">Field Mapping &amp; Transformation</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Matched Fields</span><span className="font-bold text-gray-900">1,248</span></div>
              <div className="flex justify-between"><span>Unmapped Fields</span><span className="font-bold text-amber-600">42</span></div>
              <div className="flex justify-between"><span>Transformed Fields</span><span className="font-bold text-blue-600">86</span></div>
              <div className="flex justify-between"><span>Schema Compliance</span><span className="font-bold text-green-600">96%</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">Import Validation Summary</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Passed Checks</span><span className="font-bold text-green-600">1,142</span></div>
              <div className="flex justify-between"><span>Warnings</span><span className="font-bold text-amber-600">32</span></div>
              <div className="flex justify-between"><span>Blocking Errors</span><span className="font-bold text-red-600">18</span></div>
              <div className="flex justify-between"><span>Rejected Records</span><span className="font-bold text-rose-600">76</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">Duplicate Conflict Review</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Conflicts Detected</span><span className="font-bold text-red-600">76</span></div>
              <div className="flex justify-between"><span>Auto-Merged</span><span className="font-bold text-green-600">34</span></div>
              <div className="flex justify-between"><span>Requires Review</span><span className="font-bold text-amber-600">42</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">Change Preview Summary</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Inserts</span><span className="font-bold text-green-600">980</span></div>
              <div className="flex justify-between"><span>Updates</span><span className="font-bold text-blue-600">210</span></div>
              <div className="flex justify-between"><span>Deletions</span><span className="font-bold text-red-600">18</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">Compliance Export Operations</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Running Today</span><span className="font-bold text-gray-900">18</span></div>
              <div className="flex justify-between"><span>Scheduled</span><span className="font-bold text-sky-600">34</span></div>
              <div className="flex justify-between"><span>Avg Runtime</span><span className="font-bold text-gray-900 font-mono">00:18:24</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Operational Panels (5 Panels) */}
        <div className="grid grid-cols-5 gap-3 text-[11px] mb-6">
          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">Scheduled Compliance Exports</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Compliance Summary Feed</span><span className="text-gray-400">Daily</span></div>
              <div className="flex justify-between"><span>Audit Trail Extract</span><span className="text-gray-400">Daily</span></div>
              <div className="flex justify-between"><span>Regulatory Compliance Report</span><span className="text-gray-400">Weekly</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">Import Templates &amp; Profiles</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Supplier Master v3.2</span><span className="text-green-600 font-bold">Active</span></div>
              <div className="flex justify-between"><span>Product Compliance v2.1</span><span className="text-green-600 font-bold">Active</span></div>
              <div className="flex justify-between"><span>Brand Authorization v1.4</span><span className="text-green-600 font-bold">Active</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">Reconciliation &amp; Audit Summary</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Matched Records</span><span className="font-bold text-gray-900">4.1M</span></div>
              <div className="flex justify-between"><span>Exceptions</span><span className="font-bold text-amber-600">22.1K</span></div>
              <div className="flex justify-between"><span>Open Variances</span><span className="font-bold text-red-600">142</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">Recent Import/Export Activity</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>IMP-8891 Success</span><span className="text-gray-400">10:28 AM</span></div>
              <div className="flex justify-between"><span>EXP-2212 Success</span><span className="text-gray-400">08:55 AM</span></div>
              <div className="flex justify-between"><span>IMP-8885 Failed</span><span className="text-red-600 font-bold">Failed</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">Data Controls &amp; Governance</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>File Validation</span><span className="text-green-600 font-bold">Passed</span></div>
              <div className="flex justify-between"><span>Malware Scan</span><span className="text-green-600 font-bold">Clean</span></div>
              <div className="flex justify-between"><span>Audit Encryption</span><span className="text-green-600 font-bold">AES-256</span></div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Compliance Data Operations Health">
          <HealthScoreGauge 
            score={94} 
            label="Excellent" 
            statusText="Excellent"
            statusColor="#16a34a"
            metrics={[
              { label: 'File Validation', value: '96%', progress: 96 },
              { label: 'Mapping Accuracy', value: '92%', progress: 92 },
              { label: 'Approval Readiness', value: '90%', progress: 90 },
              { label: 'Execution Control', value: '93%', progress: 93 },
              { label: 'Reconciliation', value: '88%', progress: 88 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Data Alerts (6)">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">76 duplicate conflicts in IMP-8902</span><span className="font-bold text-red-500">Critical</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">12 unmapped mandatory fields</span><span className="font-bold text-amber-500">High</span></div>
          </div>
        </RailSection>

        <RailSection title="Processing Queue">
          <div className="grid grid-cols-3 gap-1 text-center text-[10px] my-1">
            <div className="bg-gray-50 p-2 rounded border border-gray-100"><div className="text-gray-400">Running</div><div className="font-bold text-gray-900 text-xs">32</div></div>
            <div className="bg-gray-50 p-2 rounded border border-gray-100"><div className="text-gray-400">Waiting</div><div className="font-bold text-gray-900 text-xs">18</div></div>
            <div className="bg-gray-50 p-2 rounded border border-gray-100"><div className="text-gray-400">Avg Runtime</div><div className="font-bold text-gray-900 text-[10px]">00:18:24</div></div>
          </div>
        </RailSection>

        <RailSection title="Data Operations Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">+ New Import</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Schedule Export</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Open Review Queue</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">View Audit Trail</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
