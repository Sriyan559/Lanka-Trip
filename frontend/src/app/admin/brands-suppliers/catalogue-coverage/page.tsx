"use client";

import React, { useState } from 'react';
import { 
  Package, CheckCircle2, Clock, AlertTriangle, ChevronDown, 
  FileText, Layers, AlertCircle, RefreshCw, Eye
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
  { index: 1, title: 'Total Supplier Products', value: '12,840', delta: { value: '2.1%', trend: 'up' as const }, icon: Package, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Active Products', value: '10,962', delta: { value: '4.6%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 3, title: 'Pending Approval', value: '312', delta: { value: '3.2%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 4, title: 'Draft Products', value: '186', delta: { value: '1.4%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
  { index: 5, title: 'Incomplete Products', value: '248', delta: { value: '1.8%', trend: 'down' as const }, icon: AlertTriangle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600' },
  { index: 6, title: 'Products Missing Auth.', value: '29', delta: { value: '1.8%', trend: 'down' as const }, icon: AlertCircle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 7, title: 'Products Missing Inv.', value: '114', delta: { value: '3.5%', trend: 'down' as const }, icon: Package, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 8, title: 'Missing Mandatory Media', value: '150', delta: { value: '6.0%', trend: 'down' as const }, icon: Layers, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 9, title: 'Publication-Ready', value: '9,846', delta: { value: '5.7%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { index: 10, title: 'Publication Blocked', value: '126', delta: { value: '2.4%', trend: 'down' as const }, icon: AlertTriangle, iconBgColor: 'bg-[#7a0023]/10', iconColor: 'text-[#7a0023]', alert: true },
  { index: 11, title: 'Duplicate Product Risks', value: '42', delta: { value: '1.2%', trend: 'down' as const }, icon: RefreshCw, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 12, title: 'Catalogue SLA Breaches', value: '17', delta: { value: '4.5%', trend: 'down' as const }, icon: Clock, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Coverage Scope', value: 'Active Supplier Catalogue Network' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'all', label: 'All Supplier Products' },
  { id: 'ready', label: 'Publication Ready' },
  { id: 'pending', label: 'Pending Approval' },
  { id: 'incomplete', label: 'Incomplete' },
  { id: 'missing-auth', label: 'Missing Authorization' },
  { id: 'missing-inv', label: 'Missing Inventory' },
  { id: 'missing-media', label: 'Missing Media' },
  { id: 'blocked', label: 'Publication Blocked' },
  { id: 'duplicate', label: 'Duplicate Risk' },
  { id: 'breached', label: 'Breached' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'Total Products': Math.floor(Math.random() * 500) + 9000,
  'Publication-Ready': Math.floor(Math.random() * 400) + 7000,
  Blocked: Math.floor(Math.random() * 50) + 100,
  Draft: Math.floor(Math.random() * 30) + 150,
}));

const DONUT_DATA = [
  { name: 'Manufacturers', value: 3842, color: '#0284c7' },
  { name: 'Distributors', value: 3126, color: '#16a34a' },
  { name: 'Importers', value: 2138, color: '#d97706' },
  { name: 'Wholesalers', value: 1784, color: '#9333ea' },
  { name: 'Labs & R&D', value: 1126, color: '#0d9488' },
  { name: 'Service Partners', value: 824, color: '#475569' },
];

const READINESS_SUMMARY_DATA = [
  { label: 'Publication-Ready', count: 9846, percentage: 76.7, color: '#16a34a' },
  { label: 'Pending Approval', count: 312, percentage: 2.4, color: '#d97706' },
  { label: 'Incomplete', count: 248, percentage: 1.9, color: '#eab308' },
  { label: 'Missing Authorization', count: 29, percentage: 0.2, color: '#dc2626' },
  { label: 'Missing Inventory', count: 114, percentage: 0.9, color: '#9333ea' },
  { label: 'Missing Media', count: 150, percentage: 1.2, color: '#2563eb' },
  { label: 'Publication Blocked', count: 126, percentage: 1.0, color: '#7a0023' },
];

const PRODUCTS_TABLE = [
  { name: 'Radiance Vitamin C Serum', ref: 'PRO-2026-00421', sku: 'SKU-RAD-VC-30', supplier: 'Luxe Distribution', brand: 'Luxe', category: 'Skincare', variants: 3, status: 'Published', verification: 'Verified', auth: 'Authorized', content: '94%', attr: '92%', media: '100%', inv: 'Linked', pricing: 'Ready', compliance: 'Compliant', channels: '3/3', pubStatus: 'Published', risk: 'Low', owner: 'Elena Vance', updated: '04 Aug 2026', sla: 92 },
  { name: 'Tokyo Brightening Essence', ref: 'PRO-2026-00387', sku: 'SKU-TOK-BE-50', supplier: 'Tokyo Beauty Dist.', brand: 'Tokyo Beauty', category: 'Skincare', variants: 2, status: 'Pending Approval', verification: 'Verified', auth: 'Pending', content: '78%', attr: '72%', media: '80%', inv: 'Linked', pricing: 'Pending', compliance: 'Compliant', channels: '2/3', pubStatus: 'Pending', risk: 'Medium', owner: 'Marco Lee', updated: '03 Aug 2026', sla: 68 },
  { name: 'Puro Glow Face Mist', ref: 'PRO-2026-00432', sku: 'SKU-POF-MIST-100', supplier: 'Glow Skin Labs', brand: 'Glowskin', category: 'Skincare', variants: 1, status: 'Blocked', verification: 'Verified', auth: 'Missing', content: '60%', attr: '60%', media: '20%', inv: 'Not Linked', pricing: 'Pending', compliance: 'Non-Compliant', channels: '1/3', pubStatus: 'Blocked', risk: 'High', owner: 'Priya Nair', updated: '02 Aug 2026', sla: 34 },
  { name: 'Luxe Silk Lipstick', ref: 'PRO-2024-00124', sku: 'SKU-LUX-LIP-01', supplier: 'Luxe Distribution', brand: 'Luxe', category: 'Makeup', variants: 12, status: 'Published', verification: 'Verified', auth: 'Authorized', content: '95%', attr: '95%', media: '95%', inv: 'Linked', pricing: 'Ready', compliance: 'Compliant', channels: '3/3', pubStatus: 'Published', risk: 'Low', owner: 'Elena Vance', updated: '04 Aug 2026', sla: 96 },
];

export default function SupplierCatalogueCoveragePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Product &amp; Catalogue Coverage</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Product &amp; Catalogue Coverage</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor supplier products, catalogue completeness, authorization, inventory linkage and channel publication readiness across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Coverage Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Import Products</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Bulk Actions v</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ Add Product</button>
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
            <h3 className="text-[13px] font-bold mb-3">Supplier Catalogue Growth &amp; Readiness Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#16a34a', '#dc2626', '#6b7280']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Supplier Catalogue Composition</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total" totalValue="12,840" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Issue Status / Readiness Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={READINESS_SUMMARY_DATA} total={12840} />
            </div>
          </div>
        </div>

        {/* Health Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Content Completeness</span> <span className="font-bold text-gray-900 ml-1">92%</span></div>
          <div><span className="text-gray-500">Brand Authorization</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
          <div><span className="text-gray-500">Media Readiness</span> <span className="font-bold text-gray-900 ml-1">82%</span></div>
          <div><span className="text-gray-500">Inventory Linkage</span> <span className="font-bold text-gray-900 ml-1">84%</span></div>
          <div><span className="text-gray-500">Pricing Readiness</span> <span className="font-bold text-gray-900 ml-1">87%</span></div>
          <div><span className="text-gray-500">Compliance Readiness</span> <span className="font-bold text-gray-900 ml-1">90%</span></div>
          <div><span className="text-gray-500">Channel Eligibility</span> <span className="font-bold text-gray-900 ml-1">85%</span></div>
          <div><span className="text-gray-500">Publication Readiness</span> <span className="font-bold text-gray-900 ml-1">86%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search products by name, SKU or reference..."
          filters={[
            { id: 'supplier', label: 'Supplier', options: [] },
            { id: 'brand', label: 'Brand', options: [] },
            { id: 'category', label: 'Category', options: [] },
            { id: 'status', label: 'Product Status', options: [] },
            { id: 'verification', label: 'Verification', options: [] },
            { id: 'auth', label: 'Authorization', options: [] },
          ]}
          onClearAll={() => {}}
          onSaveView={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1600px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 pl-4">Product / Product Ref</th>
                  <th className="px-3 py-2">SKU</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Brand</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2 text-center">Variants</th>
                  <th className="px-3 py-2">Product Status</th>
                  <th className="px-3 py-2">Verification</th>
                  <th className="px-3 py-2">Authorization</th>
                  <th className="px-3 py-2">Content %</th>
                  <th className="px-3 py-2">Attributes %</th>
                  <th className="px-3 py-2">Media %</th>
                  <th className="px-3 py-2">Inventory Linkage</th>
                  <th className="px-3 py-2">Pricing Readiness</th>
                  <th className="px-3 py-2">Compliance</th>
                  <th className="px-3 py-2">Eligible Channels</th>
                  <th className="px-3 py-2">Publication Status</th>
                  <th className="px-3 py-2">Risk</th>
                  <th className="px-3 py-2">Owner</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {PRODUCTS_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 pl-4 font-bold text-gray-900">{row.name}<div className="text-gray-400 font-normal text-[10px]">{row.ref}</div></td>
                    <td className="px-3 py-2 text-gray-500">{row.sku}</td>
                    <td className="px-3 py-2 font-semibold">{row.supplier}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-gray-600">{row.category}</td>
                    <td className="px-3 py-2 text-center font-bold">{row.variants}</td>
                    <td className="px-3 py-2"><span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.status}</span></td>
                    <td className="px-3 py-2 text-green-600 font-bold">{row.verification}</td>
                    <td className="px-3 py-2 text-green-600 font-bold">{row.auth}</td>
                    <td className="px-3 py-2 font-bold">{row.content}</td>
                    <td className="px-3 py-2">{row.attr}</td>
                    <td className="px-3 py-2">{row.media}</td>
                    <td className="px-3 py-2 text-green-600">{row.inv}</td>
                    <td className="px-3 py-2 text-gray-600">{row.pricing}</td>
                    <td className="px-3 py-2 text-green-600 font-bold">{row.compliance}</td>
                    <td className="px-3 py-2 text-gray-600">{row.channels}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">{row.pubStatus}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.risk}</td>
                    <td className="px-3 py-2 text-gray-500">{row.owner}</td>
                    <td className="px-3 py-2 text-gray-400">{row.updated}</td>
                    <td className="px-3 py-2 font-bold">{row.sla}%</td>
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
        <RailSection title="Catalogue Health">
          <HealthScoreGauge 
            score={89} 
            label="Stable" 
            statusText="Stable"
            statusColor="#16a34a"
            metrics={[
              { label: 'Completeness', value: '92%', progress: 92 },
              { label: 'Authorization', value: '88%', progress: 88 },
              { label: 'Inventory Linkage', value: '84%', progress: 84 },
              { label: 'Media Readiness', value: '82%', progress: 82 },
              { label: 'Publication Readiness', value: '86%', progress: 86 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Missing Authorization</span><span className="font-bold text-red-500">29</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Media Gaps</span><span className="font-bold text-amber-500">18</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Publication Blockers</span><span className="font-bold text-red-500">10</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Pending Approvals</span><span className="font-bold text-gray-900">312</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Missing Media</span><span className="font-bold text-gray-900">18</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Inventory Gaps</span><span className="font-bold text-gray-900">114</span></div>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
