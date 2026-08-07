"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, Clock, ChevronDown, 
  FileText, FlaskConical, AlertCircle, RefreshCw, Eye, CheckCircle2, Package
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
  { index: 1, title: 'Products Under Safety Review', value: '312', delta: { value: '8.4%', trend: 'down' as const }, icon: ShieldCheck, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Publication Blockers', value: '29', delta: { value: '12.5%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 3, title: 'Missing Safety Evidence', value: '24', delta: { value: '9.1%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 4, title: 'Restricted Ingredient Findings', value: '8', delta: { value: '14.3%', trend: 'up' as const }, icon: FlaskConical, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 5, title: 'Unsupported Product Claims', value: '18', delta: { value: '6.2%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 6, title: 'Regulatory Registration Missing', value: '12', delta: { value: '11.8%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 7, title: 'Packaging Compliance Issues', value: '16', delta: { value: '7.7%', trend: 'up' as const }, icon: Package, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 8, title: 'Laboratory Evidence Pending', value: '42', delta: { value: '10.2%', trend: 'up' as const }, icon: FlaskConical, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 9, title: 'High-Risk Products', value: '9', delta: { value: '4.3%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 10, title: 'Active Safety Cases', value: '38', delta: { value: '5.6%', trend: 'down' as const }, icon: ShieldCheck, iconBgColor: 'bg-teal-50', iconColor: 'text-teal-600' },
  { index: 11, title: 'Products Revalidation Due', value: '26', delta: { value: '8.3%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  { index: 12, title: 'Safety SLA Breaches', value: '14', delta: { value: '16.7%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Safety Scope', value: 'Active Product Catalogue' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'under-review', label: 'Under Review' },
  { id: 'blockers', label: 'Publication Blockers' },
  { id: 'missing', label: 'Missing Evidence' },
  { id: 'restricted', label: 'Restricted Ingredients' },
  { id: 'claims', label: 'Claims Review' },
  { id: 'registrations', label: 'Registrations' },
  { id: 'batches', label: 'Batches' },
  { id: 'revalidation', label: 'Revalidation' },
  { id: 'audit', label: 'Audit Trail' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'Open Safety Reviews': Math.floor(Math.random() * 50) + 200,
  'Publication Blockers': Math.floor(Math.random() * 20) + 30,
  'Missing Evidence': Math.floor(Math.random() * 25) + 60,
  'Safety SLA Breaches': Math.floor(Math.random() * 10) + 10,
}));

const DONUT_DATA = [
  { name: 'Safety Evidence', value: 36, color: '#0284c7' },
  { name: 'Ingredient Compliance', value: 32, color: '#16a34a' },
  { name: 'Regulatory Registration', value: 25, color: '#9333ea' },
  { name: 'Packaging', value: 20, color: '#d97706' },
  { name: 'Claims', value: 18, color: '#eab308' },
  { name: 'Batch Safety', value: 10, color: '#dc2626' },
  { name: 'Lab Validation', value: 8, color: '#6b7280' },
];

const SAFETY_SUMMARY_DATA = [
  { label: 'On Track', count: 112, percentage: 29.8, color: '#16a34a' },
  { label: 'Under Review', count: 96, percentage: 25.5, color: '#0284c7' },
  { label: 'At Risk', count: 68, percentage: 18.1, color: '#eab308' },
  { label: 'Blocked', count: 38, percentage: 10.1, color: '#dc2626' },
  { label: 'Restricted', count: 24, percentage: 6.4, color: '#7a0023' },
  { label: 'Resolved', count: 38, percentage: 10.1, color: '#475569' },
];

const PRODUCTS_TABLE = [
  { name: 'Radiance Vitamin C Serum', id: 'PRO-VC-0001', sku: 'VC-SER-30ML', supplier: 'Luxe Botanicals', brand: 'Radiance', category: 'Skincare', type: 'Serum', evidence: 'Verified', ingredient: 'Verified', validation: 'Verified', claims: 'Verified', reg: 'Registered', pkg: 'Compliant', lab: 'Completed', batch: '5', recalls: '0', pub: 'Published', channels: '5', risk: 'Low', severity: 'Low', reviewer: 'Elena Vance', regReviewer: 'Nadia Desai', due: '15 Aug 2026', sla: '96%', updated: '04 Aug 2026' },
  { name: 'Glow Repair Night Cream', id: 'PRO-GR-0002', sku: 'GR-NC-50ML', supplier: 'Luxe Botanicals', brand: 'Glow', category: 'Skincare', type: 'Cream', evidence: 'Verified', ingredient: 'Verified', validation: 'Verified', claims: 'Pending', reg: 'Registered', pkg: 'Compliant', lab: 'Completed', batch: '5', recalls: '0', pub: 'Review', channels: '5', risk: 'Low', severity: 'Low', reviewer: 'Priya Kapoor', regReviewer: 'Marco Lee', due: '20 Aug 2026', sla: '92%', updated: '04 Aug 2026' },
  { name: 'Pure Sunscreen Gel SPF 50', id: 'PRO-SG-0003', sku: 'SS-GEL-50', supplier: 'SunCare Labs', brand: 'Pure', category: 'Sun Care', type: 'Gel', evidence: 'Pending', ingredient: 'Verified', validation: 'Pending', claims: 'Pending', reg: 'Pending', pkg: 'Pending', lab: 'Under Review', batch: '5', recalls: '0', pub: 'Under Review', channels: '4', risk: 'Medium', severity: 'Medium', reviewer: 'Marco Lee', regReviewer: 'Elena Vance', due: '10 Aug 2026', sla: '72%', updated: '04 Aug 2026' },
  { name: 'Herbal Essence Hair Oil', id: 'PRO-HE-0004', sku: 'HE-OIL-100', supplier: 'GreenHerb Co.', brand: 'Herbal', category: 'Hair Care', type: 'Oil', evidence: 'Verified', ingredient: 'Restricted', validation: 'Verified', claims: 'Verified', reg: 'Registered', pkg: 'Compliant', lab: 'Completed', batch: '3', recalls: '0', pub: 'Restricted', channels: '3', risk: 'High', severity: 'High', reviewer: 'Nadia Desai', regReviewer: 'Priya Kapoor', due: '08 Aug 2026', sla: '64%', updated: '04 Aug 2026' },
];

export default function ProductSafetyRegulatoryPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Product Safety &amp; Regulatory</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Product Safety &amp; Regulatory Oversight</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor product safety evidence, ingredient compliance, regulatory registration, claims, packaging, laboratory validation, batch safety and publication controls across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Safety Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Review Publication Blockers</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Bulk Actions v</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">Review Next Safety Case →</button>
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
            <h3 className="text-[13px] font-bold mb-3">Product Safety &amp; Regulatory Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#dc2626', '#d97706', '#9333ea']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Safety Issue Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total Issues" totalValue="149" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Safety Status Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={SAFETY_SUMMARY_DATA} total={376} />
            </div>
          </div>
        </div>

        {/* Health Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Identity Completeness</span> <span className="font-bold text-gray-900 ml-1">96%</span></div>
          <div><span className="text-gray-500">Evidence Coverage</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
          <div><span className="text-gray-500">Ingredient Compliance</span> <span className="font-bold text-gray-900 ml-1">84%</span></div>
          <div><span className="text-gray-500">Claims Accuracy</span> <span className="font-bold text-gray-900 ml-1">86%</span></div>
          <div><span className="text-gray-500">Registration Readiness</span> <span className="font-bold text-gray-900 ml-1">82%</span></div>
          <div><span className="text-gray-500">Packaging Compliance</span> <span className="font-bold text-gray-900 ml-1">89%</span></div>
          <div><span className="text-gray-500">Laboratory Readiness</span> <span className="font-bold text-gray-900 ml-1">85%</span></div>
          <div><span className="text-gray-500">Batch Safety Control</span> <span className="font-bold text-gray-900 ml-1">91%</span></div>
          <div><span className="text-gray-500">Publication Readiness</span> <span className="font-bold text-gray-900 ml-1">83%</span></div>
          <div><span className="text-gray-500">Audit Readiness</span> <span className="font-bold text-gray-900 ml-1">90%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search products, SKU, brand, supplier..."
          filters={[
            { id: 'product', label: 'Product', options: [] },
            { id: 'supplier', label: 'Supplier', options: [] },
            { id: 'brand', label: 'Brand', options: [] },
            { id: 'category', label: 'Category', options: [] },
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
                  <th className="px-3 py-2 pl-4">Product</th>
                  <th className="px-3 py-2">Product ID</th>
                  <th className="px-3 py-2">SKU</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Brand</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Product Type</th>
                  <th className="px-3 py-2">Safety Evidence</th>
                  <th className="px-3 py-2">Ingredient Compliance</th>
                  <th className="px-3 py-2">Ingredient Validation</th>
                  <th className="px-3 py-2">Claims Compliance</th>
                  <th className="px-3 py-2">Registration Status</th>
                  <th className="px-3 py-2">Packaging Status</th>
                  <th className="px-3 py-2">Lab Evidence</th>
                  <th className="px-3 py-2 text-center">Batch Safety</th>
                  <th className="px-3 py-2 text-center">Recalls</th>
                  <th className="px-3 py-2">Publication Status</th>
                  <th className="px-3 py-2 text-center">Eligible Channels</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Severity</th>
                  <th className="px-3 py-2">Safety Reviewer</th>
                  <th className="px-3 py-2">Regulatory Reviewer</th>
                  <th className="px-3 py-2">Due Date</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {PRODUCTS_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 pl-4 font-bold text-gray-900">{row.name}</td>
                    <td className="px-3 py-2 text-gray-500">{row.id}</td>
                    <td className="px-3 py-2 text-gray-500">{row.sku}</td>
                    <td className="px-3 py-2 font-semibold text-gray-900">{row.supplier}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.category}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">{row.evidence}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">{row.ingredient}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">{row.validation}</td>
                    <td className="px-3 py-2 font-semibold text-amber-600">{row.claims}</td>
                    <td className="px-3 py-2 text-green-600">{row.reg}</td>
                    <td className="px-3 py-2 text-green-600">{row.pkg}</td>
                    <td className="px-3 py-2 text-green-600">{row.lab}</td>
                    <td className="px-3 py-2 text-center font-bold">{row.batch}</td>
                    <td className="px-3 py-2 text-center font-bold text-gray-500">{row.recalls}</td>
                    <td className="px-3 py-2"><span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.pub}</span></td>
                    <td className="px-3 py-2 text-center font-bold">{row.channels}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.risk}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.severity}</td>
                    <td className="px-3 py-2 text-gray-500">{row.reviewer}</td>
                    <td className="px-3 py-2 text-gray-500">{row.regReviewer}</td>
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

        {/* 12 Operational Sub-Panels (Matching VC09 Screenshot) */}
        <div className="grid grid-cols-6 gap-3 text-[11px] mb-6">
          
          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">1. Product Safety Evidence Operations</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Submitted</span><span className="font-bold text-gray-900">186</span></div>
              <div className="flex justify-between"><span>Pending Review</span><span className="font-bold text-amber-600">124</span></div>
              <div className="flex justify-between"><span>Verified</span><span className="font-bold text-green-600">312</span></div>
              <div className="flex justify-between"><span>Rejected</span><span className="font-bold text-red-600">34</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">2. Ingredient Safety &amp; Restriction</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Restricted Ingredients</span><span className="font-bold text-red-600">8</span></div>
              <div className="flex justify-between"><span>Under Review</span><span className="font-bold text-amber-600">22</span></div>
              <div className="flex justify-between"><span>Ingredient Complaints</span><span className="font-bold text-gray-900">1,246</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">3. Product Claims Compliance</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Unsupported Claims</span><span className="font-bold text-amber-600">18</span></div>
              <div className="flex justify-between"><span>Approved Claims</span><span className="font-bold text-green-600">130</span></div>
              <div className="flex justify-between"><span>Revoked Claims</span><span className="font-bold text-red-600">36</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">4. Product Regulatory Registration</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Active Registrations</span><span className="font-bold text-green-600">412</span></div>
              <div className="flex justify-between"><span>Pending Registrations</span><span className="font-bold text-amber-600">54</span></div>
              <div className="flex justify-between"><span>Expired Registrations</span><span className="font-bold text-red-600">14</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">5. Packaging &amp; Labelling</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Packaging Warnings</span><span className="font-bold text-amber-600">18</span></div>
              <div className="flex justify-between"><span>Non-Compliant</span><span className="font-bold text-red-600">16</span></div>
              <div className="flex justify-between"><span>Compliant Items</span><span className="font-bold text-green-600">618</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="font-bold text-gray-900 text-xs mb-2">6. Laboratory Evidence &amp; Validation</h4>
            <div className="space-y-1 text-gray-600 text-[10px]">
              <div className="flex justify-between"><span>Lab Reports Verified</span><span className="font-bold text-green-600">146</span></div>
              <div className="flex justify-between"><span>Pending Tests</span><span className="font-bold text-amber-600">42</span></div>
              <div className="flex justify-between"><span>Failed Validations</span><span className="font-bold text-red-600">8</span></div>
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="A. Product Safety Intelligence Health">
          <HealthScoreGauge 
            score={86} 
            label="Needs Attention" 
            statusText="Needs Attention"
            statusColor="#d97706"
            metrics={[
              { label: 'Identity Completeness', value: '96%', progress: 96 },
              { label: 'Evidence Coverage', value: '88%', progress: 88 },
              { label: 'Ingredient Compliance', value: '84%', progress: 84 },
              { label: 'Claims Accuracy', value: '86%', progress: 86 },
              { label: 'Registration Readiness', value: '82%', progress: 82 },
            ]}
          />
        </RailSection>

        <RailSection title="B. Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Critical product safety issue</span><span className="font-bold text-red-500">3</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Missing clinical safety evidence</span><span className="font-bold text-amber-500">24</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Unsupported anti-aging claim</span><span className="font-bold text-amber-500">18</span></div>
          </div>
        </RailSection>

        <RailSection title="G. Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Assigned to Me</span><span className="font-bold text-gray-900">24</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">High Risk</span><span className="font-bold text-red-500">9</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Claims Review</span><span className="font-bold text-amber-500">18</span></div>
          </div>
        </RailSection>

        <RailSection title="H. Final Safety Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">Review Next Safety Case</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Open Safety Queue</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Create Compliance Case</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Review Publication Blockers</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">View Audit Trail</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
