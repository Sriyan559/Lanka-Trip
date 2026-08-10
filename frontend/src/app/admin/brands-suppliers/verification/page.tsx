"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, Clock, AlertTriangle, ChevronDown, 
  FileText, ShieldAlert, AlertCircle, RefreshCw, Eye, Lock
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
  { index: 1, title: 'Total Verification Applications', value: '1,142', delta: { value: '5.2%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Verified Suppliers', value: '612', delta: { value: '3.2%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 3, title: 'Pending Initial Triage', value: '142', delta: { value: '5.9%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 4, title: 'Under Legal Review', value: '98', delta: { value: '3.2%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 5, title: 'KYC Checks Pending', value: '76', delta: { value: '5.1%', trend: 'up' as const }, icon: Eye, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 6, title: 'Commercial Review Pending', value: '64', delta: { value: '6.7%', trend: 'up' as const }, icon: ShieldCheck, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 7, title: 'Approved This Month', value: '512', delta: { value: '4.3%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { index: 8, title: 'Rejected Applications', value: '18', delta: { value: '4.1%', trend: 'down' as const }, icon: AlertCircle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 9, title: 'Conditional Approvals', value: '24', delta: { value: '2.1%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  { index: 10, title: 'Revalidation Queue', value: '36', delta: { value: '7.8%', trend: 'up' as const }, icon: RefreshCw, iconBgColor: 'bg-teal-50', iconColor: 'text-teal-600' },
  { index: 11, title: 'Restricted Suppliers', value: '7', delta: { value: '16.7%', trend: 'up' as const }, icon: Lock, iconBgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
  { index: 12, title: 'Verification SLA Breaches', value: '7', delta: { value: '12.5%', trend: 'down' as const }, icon: Clock, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Verification Scope', value: 'Active Supplier Network' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'all', label: 'All Applications' },
  { id: 'triage', label: 'Pending Triage' },
  { id: 'kyc', label: 'KYC Checks' },
  { id: 'legal', label: 'Legal Review' },
  { id: 'commercial', label: 'Commercial Review' },
  { id: 'approved', label: 'Approved' },
  { id: 'conditional', label: 'Conditional' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'revalidation', label: 'Revalidation' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  Submitted: 100 + ((i * 17 + 7) % 30),
  Verified: 80 + ((i * 13 + 5) % 25),
  'Under Review': 30 + ((i * 7 + 3) % 15),
  Rejected: 2 + ((i * 3 + 1) % 5),
}));

const DONUT_DATA = [
  { name: 'Verified', value: 612, color: '#16a34a' },
  { name: 'Pending Triage', value: 142, color: '#d97706' },
  { name: 'Legal Review', value: 98, color: '#9333ea' },
  { name: 'KYC Checks', value: 76, color: '#0284c7' },
  { name: 'Commercial Review', value: 64, color: '#eab308' },
  { name: 'Rejected', value: 18, color: '#dc2626' },
];

const SUMMARY_DATA = [
  { label: 'Verified', count: 612, percentage: 72.7, color: '#16a34a' },
  { label: 'Pending', count: 128, percentage: 15.2, color: '#d97706' },
  { label: 'Under Review', count: 90, percentage: 10.7, color: '#0284c7' },
  { label: 'Rejected', count: 12, percentage: 1.4, color: '#dc2626' },
];

const VERIFICATION_TABLE = [
  { id: 'SUP-2026-004582', name: 'Velvet Botanics', type: 'Manufacturer', country: 'Sri Lanka', submitted: '04 Aug 2026', docProgress: '6/6', lines: 6, risk: 'High', owner: 'Elena Vance', status: 'Under Review', step: 'Under Review', sla: '16h' },
  { id: 'SUP-2026-004571', name: 'Luxe Distributions', type: 'Distributor', country: 'India', submitted: '03 Aug 2026', docProgress: '12/12', lines: 12, risk: 'Medium', owner: 'Marco Lee', status: 'KYC Check', step: 'KYC Check', sla: '1d' },
  { id: 'SUP-2026-004566', name: 'PuroGlow Imports', type: 'Importer', country: 'UAE', submitted: '02 Aug 2026', docProgress: '8/8', lines: 8, risk: 'Medium', owner: 'Priya Nair', status: 'KYC Check', step: 'KYC Check', sla: '1d' },
  { id: 'SUP-2026-004501', name: 'SilkRoad Supplies', type: 'Wholesaler', country: 'China', submitted: '01 Aug 2026', docProgress: '5/5', lines: 5, risk: 'High', owner: 'Marco Lee', status: 'Legal Review', step: 'Legal Review', sla: '2d' },
];

export default function SupplierVerificationPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Supplier Verification</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Verification &amp; Eligibility</h1>
            <p className="text-xs text-gray-500 mt-1">Review supplier applications, validate legal and commercial documentation, assess brand authorization and manage marketplace eligibility.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Assign Cases</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">Review Next Application →</button>
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
            <h3 className="text-[13px] font-bold mb-3">Supplier Verification Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#16a34a', '#9333ea', '#dc2626']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Verification Breakdown</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Applications" totalValue="1,142" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Verification Status Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={SUMMARY_DATA} total={842} />
            </div>
          </div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search applications by ID, supplier, country..."
          filters={[
            { id: 'type', label: 'Supplier Type', options: [] },
            { id: 'country', label: 'Country', options: [] },
            { id: 'risk', label: 'Risk Level', options: [] },
            { id: 'status', label: 'Verification Status', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2 mb-6">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1300px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 pl-4">Application ID</th>
                  <th className="px-3 py-2 font-bold">Supplier Name</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Country</th>
                  <th className="px-3 py-2">Submitted</th>
                  <th className="px-3 py-2 text-center">Doc Progress</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Assigned Reviewer</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2">Current Step</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {VERIFICATION_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 pl-4 font-bold text-rose-800">{row.id}</td>
                    <td className="px-3 py-2 font-bold text-gray-900">{row.name}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-gray-600">{row.country}</td>
                    <td className="px-3 py-2 text-gray-400">{row.submitted}</td>
                    <td className="px-3 py-2 text-center font-bold text-green-600">{row.docProgress}</td>
                    <td className="px-3 py-2 font-bold text-red-600">{row.risk}</td>
                    <td className="px-3 py-2 text-gray-500">{row.owner}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.sla}</td>
                    <td className="px-3 py-2"><span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.step}</span></td>
                    <td className="px-3 py-2 text-center"><button className="bg-[#171717] text-white px-2.5 py-1 rounded text-[10px] font-bold hover:bg-black">Review Case</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Verification Intelligence Health">
          <HealthScoreGauge 
            score={92} 
            label="Verified" 
            statusText="Verified"
            statusColor="#16a34a"
            metrics={[
              { label: 'Identity Verification', value: '96%', progress: 96 },
              { label: 'Tax Registration', value: '94%', progress: 94 },
              { label: 'Business License', value: '92%', progress: 92 },
              { label: 'KYC Assessment', value: '90%', progress: 90 },
              { label: 'Bank Verification', value: '88%', progress: 88 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">High-risk supplier application</span><span className="font-bold text-red-500">12</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Missing KYC documents</span><span className="font-bold text-amber-500">14</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">SLA breach - verification</span><span className="font-bold text-red-500">7</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Pending Triage</span><span className="font-bold text-gray-900">142</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">KYC Checks</span><span className="font-bold text-sky-600">76</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Legal Review Queue</span><span className="font-bold text-purple-600">98</span></div>
          </div>
        </RailSection>

        <RailSection title="Verification Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">Review Next Application</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Approve Application</button>
            <button className="border border-amber-300 text-amber-900 bg-amber-50 py-1.5 rounded text-[11px] font-semibold hover:bg-amber-100">Request Information</button>
            <button className="border border-red-300 text-red-900 bg-red-50 py-1.5 rounded text-[11px] font-semibold hover:bg-red-100">Reject Application</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
