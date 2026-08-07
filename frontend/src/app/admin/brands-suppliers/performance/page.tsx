"use client";

import React, { useState } from 'react';
import { 
  Award, CheckCircle2, AlertTriangle, Clock, ChevronDown, 
  TrendingUp, Truck, RotateCcw, AlertCircle, ShieldAlert, DollarSign
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
  { index: 1, title: 'Average Supplier Score', value: '89 / 100', delta: { value: '2.1%', trend: 'up' as const }, icon: Award, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Suppliers Meeting SLA', value: '768', delta: { value: '4.6%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 3, title: 'Suppliers At Risk', value: '86', delta: { value: '5.2%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 4, title: 'Suppliers Breaching SLA', value: '24', delta: { value: '12.5%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 5, title: 'Avg Confirmation Rate', value: '96.2%', delta: { value: '1.1%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { index: 6, title: 'Avg Fulfilment Rate', value: '94.2%', delta: { value: '0.9%', trend: 'up' as const }, icon: TrendingUp, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 7, title: 'On-Time Dispatch', value: '92.8%', delta: { value: '1.4%', trend: 'up' as const }, icon: Truck, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 8, title: 'Cancellation Rate', value: '1.8%', delta: { value: '0.3%', trend: 'down' as const }, icon: AlertTriangle, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 9, title: 'Return Rate', value: '2.6%', delta: { value: '0.2%', trend: 'down' as const }, icon: RotateCcw, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 10, title: 'Open Improvement Plans', value: '42', delta: { value: '7.7%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-teal-50', iconColor: 'text-teal-600' },
  { index: 11, title: 'Performance Escalations', value: '12', delta: { value: '9.1%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 12, title: 'Service Credits at Risk', value: 'LKR 2.4M', delta: { value: '4.8%', trend: 'up' as const }, icon: DollarSign, iconBgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Performance Scope', value: 'Active Supplier Network' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'at-risk', label: 'At Risk' },
  { id: 'breached', label: 'SLA Breached' },
  { id: 'plans', label: 'Improvement Plans' },
  { id: 'escalations', label: 'Escalations' },
  { id: 'penalties', label: 'Contract Penalties' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'Performance Score': Math.floor(Math.random() * 15) + 80,
  'SLA Compliance': Math.floor(Math.random() * 10) + 85,
  'Fulfilment Rate': Math.floor(Math.random() * 10) + 88,
  'On-Time Dispatch': Math.floor(Math.random() * 12) + 82,
}));

const DONUT_DATA = [
  { name: 'On Track (>=90)', value: 382, color: '#16a34a' },
  { name: 'Good (80-89)', value: 214, color: '#0284c7' },
  { name: 'At Risk (70-79)', value: 128, color: '#eab308' },
  { name: 'SLA Breached (<70)', value: 86, color: '#dc2626' },
  { name: 'Not Assessed', value: 32, color: '#6b7280' },
];

const PERFORMANCE_SUMMARY_DATA = [
  { label: 'On Track', count: 482, percentage: 57.3, color: '#16a34a' },
  { label: 'At Risk', count: 128, percentage: 15.2, color: '#eab308' },
  { label: 'SLA Breached', count: 86, percentage: 10.2, color: '#dc2626' },
  { label: 'Escalated', count: 42, percentage: 5.0, color: '#9333ea' },
  { label: 'Improvement Plan', count: 42, percentage: 5.0, color: '#2563eb' },
  { label: 'Under Review', count: 62, percentage: 7.3, color: '#475569' },
];

const PERFORMANCE_TABLE = [
  { name: 'LVMH Beauty Mfg.', id: 'SUP-1002', type: 'Manufacturer', orders: 186, score: 92, sla: '92%', confirm: '97%', fulfil: '95%', dispatch: '93%', accuracy: '98%', cancel: '1.2%', return: '2.1%', complaint: '88%', plan: 'Yes', tier: 'Gold', risk: 'Low', owner: 'Elena Vance', updated: '04 Aug 2026', status: 'Compliant' },
  { name: 'Estée Lauder Dist. APAC', id: 'SUP-0845', type: 'Distributor', orders: 154, score: 87, sla: '88%', confirm: '95%', fulfil: '92%', dispatch: '90%', accuracy: '96%', cancel: '1.5%', return: '2.3%', complaint: '85%', plan: 'Yes', tier: 'Gold', risk: 'Medium', owner: 'Marco Lee', updated: '04 Aug 2026', status: 'Compliant' },
  { name: 'Cosmax Labs Korea', id: 'SUP-2109', type: 'Contract Mfg.', orders: 128, score: 76, sla: '76%', confirm: '92%', fulfil: '85%', dispatch: '78%', accuracy: '94%', cancel: '2.6%', return: '3.8%', complaint: '72%', plan: 'Yes', tier: 'Silver', risk: 'Medium', owner: 'Priya Nair', updated: '04 Aug 2026', status: 'At Risk' },
  { name: 'Boutique Retailers Inc.', id: 'SUP-0042', type: 'Wholesaler', orders: 112, score: 68, sla: '68%', confirm: '88%', fulfil: '78%', dispatch: '70%', accuracy: '91%', cancel: '3.2%', return: '4.1%', complaint: '65%', plan: 'Yes', tier: 'Silver', risk: 'High', owner: 'David Kim', updated: '03 Aug 2026', status: 'At Risk' },
];

export default function SupplierPerformancePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Performance &amp; SLA</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Performance &amp; SLA</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor supplier operations, service-level agreement compliance, performance improvement initiatives, commercial exposure, and supplier health across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Performance Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Review SLA Breaches</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ Create Improvement Plan</button>
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
            <h3 className="text-[13px] font-bold mb-3">Supplier Performance Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#16a34a', '#d97706', '#9333ea']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Supplier Performance Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Suppliers" totalValue="842" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Issue Status / Performance Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={PERFORMANCE_SUMMARY_DATA} total={842} />
            </div>
          </div>
        </div>

        {/* Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">SLA Compliance</span> <span className="font-bold text-gray-900 ml-1">89%</span></div>
          <div><span className="text-gray-500">Confirmation Rate</span> <span className="font-bold text-gray-900 ml-1">96.2%</span></div>
          <div><span className="text-gray-500">Fulfilment</span> <span className="font-bold text-gray-900 ml-1">94.2%</span></div>
          <div><span className="text-gray-500">Dispatch Timeliness</span> <span className="font-bold text-gray-900 ml-1">92.8%</span></div>
          <div><span className="text-gray-500">Order Accuracy</span> <span className="font-bold text-gray-900 ml-1">97.1%</span></div>
          <div><span className="text-gray-500">Catalogue Responsiveness</span> <span className="font-bold text-gray-900 ml-1">88.6%</span></div>
          <div><span className="text-gray-500">Inventory Accuracy</span> <span className="font-bold text-gray-900 ml-1">91.3%</span></div>
          <div><span className="text-gray-500">Complaint Resolution</span> <span className="font-bold text-gray-900 ml-1">86.2%</span></div>
          <div><span className="text-gray-500">Returns Control</span> <span className="font-bold text-gray-900 ml-1">87.4%</span></div>
          <div><span className="text-gray-500">Commercial Compliance</span> <span className="font-bold text-gray-900 ml-1">90.1%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search suppliers by name, ref, or ID..."
          filters={[
            { id: 'supplier', label: 'Supplier', options: [] },
            { id: 'type', label: 'Supplier Type', options: [] },
            { id: 'bu', label: 'Business Unit', options: [] },
            { id: 'tier', label: 'Performance Tier', options: [] },
            { id: 'sla', label: 'SLA Status', options: [] },
            { id: 'risk', label: 'Risk Level', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1600px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 pl-4">Supplier / Supplier Ref</th>
                  <th className="px-3 py-2">Supplier ID</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2 text-center">Orders</th>
                  <th className="px-3 py-2 font-bold">Performance Score</th>
                  <th className="px-3 py-2">SLA Compliance</th>
                  <th className="px-3 py-2">Confirmation Rate</th>
                  <th className="px-3 py-2">Fulfilment Rate</th>
                  <th className="px-3 py-2">On-Time Dispatch</th>
                  <th className="px-3 py-2">Order Accuracy</th>
                  <th className="px-3 py-2">Cancellation Rate</th>
                  <th className="px-3 py-2">Return Rate</th>
                  <th className="px-3 py-2">Complaint Resolution</th>
                  <th className="px-3 py-2">Improvement Plan</th>
                  <th className="px-3 py-2">Tier</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Owner</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {PERFORMANCE_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 pl-4 font-bold text-gray-900">{row.name}</td>
                    <td className="px-3 py-2 text-gray-500">{row.id}</td>
                    <td className="px-3 py-2 text-gray-600">{row.type}</td>
                    <td className="px-3 py-2 text-center font-bold">{row.orders}</td>
                    <td className="px-3 py-2 font-bold text-green-600 text-sm">{row.score}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">{row.sla}</td>
                    <td className="px-3 py-2 text-gray-700">{row.confirm}</td>
                    <td className="px-3 py-2 text-gray-700">{row.fulfil}</td>
                    <td className="px-3 py-2 text-gray-700">{row.dispatch}</td>
                    <td className="px-3 py-2 text-gray-700">{row.accuracy}</td>
                    <td className="px-3 py-2 text-gray-500">{row.cancel}</td>
                    <td className="px-3 py-2 text-gray-500">{row.return}</td>
                    <td className="px-3 py-2 text-gray-700">{row.complaint}</td>
                    <td className="px-3 py-2 font-semibold text-blue-600">{row.plan}</td>
                    <td className="px-3 py-2 font-bold">{row.tier}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.risk}</td>
                    <td className="px-3 py-2 text-gray-500">{row.owner}</td>
                    <td className="px-3 py-2 text-gray-400">{row.updated}</td>
                    <td className="px-3 py-2"><span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.status}</span></td>
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
        <RailSection title="Supplier Performance Health">
          <HealthScoreGauge 
            score={89} 
            label="Good" 
            statusText="Good"
            statusColor="#16a34a"
            metrics={[
              { label: 'SLA Compliance', value: '89%', progress: 89 },
              { label: 'Confirmation', value: '96%', progress: 96 },
              { label: 'Fulfilment', value: '94%', progress: 94 },
              { label: 'Dispatch', value: '92%', progress: 92 },
              { label: 'Inventory Accuracy', value: '91%', progress: 91 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Critical SLA breach - fulfilment</span><span className="font-bold text-red-500">24</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">High cancellation rate trend</span><span className="font-bold text-amber-500">18</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Service credit at risk</span><span className="font-bold text-red-500">18</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Open Improvement Plans</span><span className="font-bold text-gray-900">42</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">SLA Breaches</span><span className="font-bold text-red-500">24</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Supplier Escalations</span><span className="font-bold text-amber-500">12</span></div>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
