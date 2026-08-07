"use client";

import React, { useState } from 'react';
import { 
  FileCheck, CheckCircle2, Clock, AlertTriangle, ChevronDown, 
  FileText, ShieldCheck, AlertCircle, RefreshCw, Eye, Download, ExternalLink, ShieldAlert
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
  { index: 1, title: 'Total Documents', value: '18,420', delta: { value: '12.4%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Pending Verification', value: '286', delta: { value: '18.7%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 3, title: 'Under Review', value: '124', delta: { value: '5.6%', trend: 'up' as const }, icon: Eye, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 4, title: 'Verified Documents', value: '16,842', delta: { value: '15.3%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 5, title: 'Conditional Verification', value: '68', delta: { value: '6.2%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 6, title: 'Rejected Documents', value: '34', delta: { value: '13.3%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 7, title: 'Expiring in 30 Days', value: '248', delta: { value: '9.1%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  { index: 8, title: 'Expired Documents', value: '74', delta: { value: '22.5%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 9, title: 'Missing Mandatory Docs', value: '124', delta: { value: '17.8%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 10, title: 'Integrity Alerts', value: '18', delta: { value: '20.6%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 11, title: 'Replacement Requested', value: '42', delta: { value: '11.4%', trend: 'up' as const }, icon: RefreshCw, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 12, title: 'Verification SLA Breaches', value: '16', delta: { value: '23.1%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Verification Scope', value: 'Active Verification Network' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'all', label: 'All Documents' },
  { id: 'pending', label: 'Pending Verification' },
  { id: 'review', label: 'Under Review' },
  { id: 'verified', label: 'Verified' },
  { id: 'conditional', label: 'Conditional' },
  { id: 'expiring', label: 'Expiring' },
  { id: 'expired', label: 'Expired' },
  { id: 'missing', label: 'Missing' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'integrity', label: 'Integrity Alerts' },
  { id: 'replacement', label: 'Replacement Requested' },
  { id: 'revalidation', label: 'Revalidation' },
  { id: 'audit', label: 'Audit History' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  Submitted: Math.floor(Math.random() * 50) + 180,
  Verified: Math.floor(Math.random() * 40) + 140,
  Conditional: Math.floor(Math.random() * 10) + 20,
  'SLA Breaches': Math.floor(Math.random() * 5) + 5,
}));

const DONUT_DATA = [
  { name: 'Certificates', value: 6842, color: '#0284c7' },
  { name: 'Legal Docs', value: 4125, color: '#16a34a' },
  { name: 'Safety Docs', value: 2980, color: '#9333ea' },
  { name: 'Brand Docs', value: 1945, color: '#d97706' },
  { name: 'Product Docs', value: 1620, color: '#eab308' },
  { name: 'Commercial Docs', value: 908, color: '#6b7280' },
];

const STATUS_SUMMARY_DATA = [
  { label: 'Verified', count: 16842, percentage: 91.4, color: '#16a34a' },
  { label: 'Pending', count: 286, percentage: 1.6, color: '#d97706' },
  { label: 'Under Review', count: 124, percentage: 0.7, color: '#0284c7' },
  { label: 'Conditional', count: 68, percentage: 0.4, color: '#eab308' },
  { label: 'Rejected', count: 34, percentage: 0.2, color: '#dc2626' },
  { label: 'Missing', count: 124, percentage: 0.7, color: '#7a0023' },
];

const DOCUMENTS_TABLE = [
  { name: 'ISO 9001 Certificate', id: 'DOC-2026-08421', category: 'Certificate', type: 'Supplier', entity: 'Luxe Distribution Pvt Ltd', issuer: 'Lloyds Register', country: 'UK', issueDate: '10 Jun 2024', expiryDate: '09 Jun 2027', mandatory: 'Yes', metadata: 'Complete', match: '98%', issuerVal: 'Verified', authVal: 'Genuine', integrity: 'Secure', status: 'Verified', risk: 'Low', reviewer: 'Aruna Silva', submitted: '04 Aug 2026 10:32 AM', due: '11 Aug 2026', sla: '92%', updated: '04 Aug 2026' },
  { name: 'GMP Certificate', id: 'DOC-2026-08312', category: 'Certificate', type: 'Supplier', entity: 'Luxe Distribution Pvt Ltd', issuer: 'SGS Lanka', country: 'LK', issueDate: '15 May 2024', expiryDate: '14 May 2027', mandatory: 'Yes', metadata: 'Complete', match: '96%', issuerVal: 'Verified', authVal: 'Genuine', integrity: 'Secure', status: 'Pending', risk: 'Medium', reviewer: 'Nadeesha Perera', submitted: '03 Aug 2026 03:20 PM', due: '10 Aug 2026', sla: '88%', updated: '04 Aug 2026' },
  { name: 'Product Safety Assessment', id: 'DOC-2026-08204', category: 'Safety Doc', type: 'Product', entity: 'Radiance Vitamin C Serum', issuer: 'Eurofins Scientific', country: 'FR', issueDate: '12 May 2024', expiryDate: '11 May 2027', mandatory: 'Yes', metadata: 'Partial', match: '92%', issuerVal: 'Verified', authVal: 'Genuine', integrity: 'Secure', status: 'Conditional', risk: 'Medium', reviewer: 'Vihangi Jayasuriya', submitted: '02 Aug 2026 11:08 AM', due: '09 Aug 2026', sla: '70%', updated: '04 Aug 2026' },
  { name: 'Brand Authorization Letter', id: 'DOC-2026-08156', category: 'Legal Doc', type: 'Brand', entity: 'LOréal Cosmetics', issuer: 'LOréal S.A.', country: 'FR', issueDate: '01 Jun 2024', expiryDate: '31 May 2027', mandatory: 'Yes', metadata: 'Complete', match: '100%', issuerVal: 'Verified', authVal: 'Genuine', integrity: 'Secure', status: 'Verified', risk: 'Low', reviewer: 'Elena Vance', submitted: '01 Aug 2026 09:45 AM', due: '08 Aug 2026', sla: '95%', updated: '04 Aug 2026' },
];

export default function DocumentVerificationPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Document Verification</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Document Verification Management</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor document intake, verification quality, issuer validation, integrity checks, expiry control, replacements, revalidation and audit-ready document operations across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">Review Next Document</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Audit</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Approve Batch</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-[13px] font-semibold flex items-center gap-1 hover:bg-gray-50">More Actions <ChevronDown size={14} /></button>
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
            <h3 className="text-[13px] font-bold mb-3">Document Verification Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#16a34a', '#d97706', '#dc2626']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Document Category Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total Docs" totalValue="18,420" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Verification Status Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={STATUS_SUMMARY_DATA} total={18420} />
            </div>
          </div>
        </div>

        {/* Health Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Identity Completeness</span> <span className="font-bold text-gray-900 ml-1">92%</span></div>
          <div><span className="text-gray-500">Issuer Validation</span> <span className="font-bold text-gray-900 ml-1">92%</span></div>
          <div><span className="text-gray-500">Authenticity Control</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
          <div><span className="text-gray-500">Integrity Monitoring</span> <span className="font-bold text-gray-900 ml-1">86%</span></div>
          <div><span className="text-gray-500">Mandatory Coverage</span> <span className="font-bold text-gray-900 ml-1">91%</span></div>
          <div><span className="text-gray-500">Metadata Accuracy</span> <span className="font-bold text-gray-900 ml-1">89%</span></div>
          <div><span className="text-gray-500">Expiry Control</span> <span className="font-bold text-gray-900 ml-1">87%</span></div>
          <div><span className="text-gray-500">Replacement Handling</span> <span className="font-bold text-gray-900 ml-1">84%</span></div>
          <div><span className="text-gray-500">Revalidation Readiness</span> <span className="font-bold text-gray-900 ml-1">82%</span></div>
          <div><span className="text-gray-500">Audit Completeness</span> <span className="font-bold text-gray-900 ml-1">90%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search documents by ID/name/entity..."
          filters={[
            { id: 'category', label: 'Category', options: [] },
            { id: 'status', label: 'Verification Status', options: [] },
            { id: 'risk', label: 'Risk Level', options: [] },
            { id: 'entity', label: 'Entity Type', options: [] },
            { id: 'supplier', label: 'Supplier / Brand', options: [] },
            { id: 'issuer', label: 'Issuer', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2 mb-6">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1700px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 pl-4">Document / ID</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Entity Type</th>
                  <th className="px-3 py-2">Supplier / Brand / Product</th>
                  <th className="px-3 py-2">Issuer</th>
                  <th className="px-3 py-2">Country</th>
                  <th className="px-3 py-2">Issue Date</th>
                  <th className="px-3 py-2">Expiry Date</th>
                  <th className="px-3 py-2">Mandatory</th>
                  <th className="px-3 py-2">Metadata</th>
                  <th className="px-3 py-2">Identity Match</th>
                  <th className="px-3 py-2">Issuer Validation</th>
                  <th className="px-3 py-2">Authenticity</th>
                  <th className="px-3 py-2">Integrity</th>
                  <th className="px-3 py-2">Verification Status</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Reviewer</th>
                  <th className="px-3 py-2">Submitted At</th>
                  <th className="px-3 py-2">Due Date</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {DOCUMENTS_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 pl-4 font-bold text-gray-900">{row.name}<div className="text-[10px] text-gray-400 font-normal">{row.id}</div></td>
                    <td className="px-3 py-2 text-gray-600">{row.category}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 font-semibold text-gray-900">{row.entity}</td>
                    <td className="px-3 py-2 text-gray-600">{row.issuer}</td>
                    <td className="px-3 py-2 text-gray-500">{row.country}</td>
                    <td className="px-3 py-2 text-gray-400">{row.issueDate}</td>
                    <td className="px-3 py-2 text-gray-400">{row.expiryDate}</td>
                    <td className="px-3 py-2 text-gray-600">{row.mandatory}</td>
                    <td className="px-3 py-2 text-gray-600">{row.metadata}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.match}</td>
                    <td className="px-3 py-2 text-green-600 font-semibold">{row.issuerVal}</td>
                    <td className="px-3 py-2 text-green-600 font-semibold">{row.authVal}</td>
                    <td className="px-3 py-2 text-green-600 font-semibold">{row.integrity}</td>
                    <td className="px-3 py-2"><span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.status}</span></td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.risk}</td>
                    <td className="px-3 py-2 text-gray-500">{row.reviewer}</td>
                    <td className="px-3 py-2 text-gray-400">{row.submitted}</td>
                    <td className="px-3 py-2 text-gray-400">{row.due}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.sla}</td>
                    <td className="px-3 py-2 text-gray-400">{row.updated}</td>
                    <td className="px-3 py-2 text-center"><button className="text-gray-400 hover:text-gray-900">⋮</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Document Detail Bottom Split View */}
        <div className="grid grid-cols-12 gap-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 mb-4 text-[11px]">
          <div className="col-span-3 border-r border-gray-100 pr-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-gray-900 text-xs">ISO 9001 Certificate</h4>
              <span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">Verified</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-3">DOC-2026-08421 • Luxe Distribution Pvt Ltd</p>
            <div className="space-y-1.5 text-gray-600">
              <div><span className="text-gray-400">Category:</span> Certificate</div>
              <div><span className="text-gray-400">Entity:</span> Supplier</div>
              <div><span className="text-gray-400">Issuer:</span> Lloyds Register</div>
              <div><span className="text-gray-400">Submitted:</span> 04 Aug 2026 10:32 AM</div>
              <div><span className="text-gray-400">Verification SLA:</span> <span className="font-bold text-green-600">92%</span></div>
            </div>
          </div>

          <div className="col-span-6 border-r border-gray-100 px-4 flex flex-col">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-2 mb-3 text-[11px]">
              <span className="font-bold text-[#7a0023] border-b-2 border-[#7a0023] pb-2">Preview</span>
              <span className="text-gray-500 cursor-pointer hover:text-gray-900">Metadata</span>
              <span className="text-gray-500 cursor-pointer hover:text-gray-900">Extracted Fields</span>
              <span className="text-gray-500 cursor-pointer hover:text-gray-900">Entity Match</span>
              <span className="text-gray-500 cursor-pointer hover:text-gray-900">Issuer Validation</span>
            </div>
            <div className="flex-grow bg-gray-50 border border-gray-200 rounded p-4 flex flex-col items-center justify-center min-h-[140px]">
              <FileText size={32} className="text-gray-400 mb-2" />
              <span className="font-bold text-gray-800">ISO 9001:2015 Quality Management System</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Certificate No: LRQA1234567 • Scope: Distribution of Cosmetic Products</span>
            </div>
          </div>

          <div className="col-span-3 pl-4 flex flex-col justify-between">
            <div>
              <h5 className="font-bold text-gray-900 mb-2">Document Details</h5>
              <div className="space-y-1 text-gray-600">
                <div><span className="text-gray-400">File Name:</span> iso9001_luxedist_2026.pdf</div>
                <div><span className="text-gray-400">File Size:</span> 642 KB</div>
                <div><span className="text-gray-400">Digital Signature:</span> <span className="text-green-600 font-bold">Valid</span></div>
                <div><span className="text-gray-400">Tamper Status:</span> <span className="text-green-600 font-bold">Clean</span></div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button className="bg-[#7a0023] text-white py-1.5 px-3 rounded font-semibold text-[11px] flex-1 flex items-center justify-center gap-1 hover:bg-[#a0002b]"><ExternalLink size={12} /> View Full</button>
              <button className="border border-gray-300 text-gray-700 py-1.5 px-3 rounded font-semibold text-[11px] flex-1 flex items-center justify-center gap-1 hover:bg-gray-50"><Download size={12} /> Download</button>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Document Verification Health">
          <HealthScoreGauge 
            score={89} 
            label="Good Health" 
            statusText="Good Health"
            statusColor="#16a34a"
            metrics={[
              { label: 'Identity Completeness', value: '92%', progress: 92 },
              { label: 'Issuer Validation', value: '92%', progress: 92 },
              { label: 'Authenticity Control', value: '88%', progress: 88 },
              { label: 'Integrity Monitoring', value: '86%', progress: 86 },
              { label: 'Mandatory Coverage', value: '91%', progress: 91 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Critical safety doc missing</span><span className="font-bold text-red-500">28</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Expired mandatory documents</span><span className="font-bold text-amber-500">74</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Issuer mismatch detected</span><span className="font-bold text-red-500">18</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Assigned to Me</span><span className="font-bold text-gray-900">12</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">SLA Breached</span><span className="font-bold text-red-500">16</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Revalidation Due</span><span className="font-bold text-amber-500">42</span></div>
          </div>
        </RailSection>

        <RailSection title="Final Document Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">Verify</button>
            <button className="border border-amber-300 text-amber-900 bg-amber-50 py-1.5 rounded text-[11px] font-semibold hover:bg-amber-100">Verify with Conditions</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Request Replacement</button>
            <button className="border border-red-300 text-red-900 bg-red-50 py-1.5 rounded text-[11px] font-semibold hover:bg-red-100">Reject</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
