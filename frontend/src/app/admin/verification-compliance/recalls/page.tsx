"use client";

import React, { useState } from 'react';
import { 
  AlertOctagon, AlertTriangle, Clock, ChevronDown, 
  FileText, ShieldCheck, AlertCircle, RefreshCw, Eye, CheckCircle2, Lock, ShoppingBag, Users
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
  { index: 1, title: 'Active Safety Incidents', value: '18', delta: { value: '12%', trend: 'down' as const }, icon: AlertOctagon, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Active Recall Cases', value: '4', delta: { value: '33%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 3, title: 'Critical Incidents', value: '3', delta: { value: '50%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 4, title: 'Products Under Recall', value: '29', delta: { value: '16%', trend: 'up' as const }, icon: ShoppingBag, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 5, title: 'Quarantined Batches', value: '14', delta: { value: '27%', trend: 'up' as const }, icon: Lock, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 6, title: 'Quarantined Inventory Units', value: '3,480', delta: { value: '21%', trend: 'up' as const }, icon: Lock, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 7, title: 'Orders Affected', value: '428', delta: { value: '18%', trend: 'up' as const }, icon: ShoppingBag, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 8, title: 'Customers Affected', value: '106', delta: { value: '14%', trend: 'up' as const }, icon: Users, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 9, title: 'Suppliers Awaiting Response', value: '6', delta: { value: '20%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  { index: 10, title: 'Customer Notifications Pending', value: '42', delta: { value: '24%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-[#7a0023]/10', iconColor: 'text-[#7a0023]' },
  { index: 11, title: 'Recovery Rate', value: '68%', delta: { value: '9%', trend: 'up' as const }, icon: CheckCircle2, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { index: 12, title: 'Recall SLA Breaches', value: '9', delta: { value: '29%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Incident Scope', value: 'Active Product & Batch Network' },
  { label: 'Date Range', value: 'Last 30 Days' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'incidents', label: 'Active Incidents' },
  { id: 'recalls', label: 'Active Recalls' },
  { id: 'quarantined', label: 'Quarantined' },
  { id: 'notifications', label: 'Customer Notifications' },
  { id: 'regulatory', label: 'Regulatory Reporting' },
  { id: 'recovery', label: 'Recovery & Returns' },
  { id: 'audit', label: 'Audit Trail' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'Open Incidents': Math.floor(Math.random() * 20) + 100,
  'Active Recalls': Math.floor(Math.random() * 10) + 20,
  'Quarantined Batches': Math.floor(Math.random() * 15) + 40,
  'Resolved Cases': Math.floor(Math.random() * 30) + 60,
  'SLA Breaches': Math.floor(Math.random() * 5) + 5,
}));

const DONUT_DATA = [
  { name: 'Adverse Reaction', value: 42, color: '#dc2626' },
  { name: 'Contamination', value: 38, color: '#d97706' },
  { name: 'Packaging Failure', value: 28, color: '#0284c7' },
  { name: 'Labelling Error', value: 18, color: '#9333ea' },
  { name: 'Foreign Matter', value: 16, color: '#16a34a' },
  { name: 'Other', value: 14, color: '#6b7280' },
];

const STATUS_SUMMARY_DATA = [
  { label: 'New', count: 24, percentage: 15.4, color: '#0284c7' },
  { label: 'Under Review', count: 32, percentage: 20.5, color: '#16a34a' },
  { label: 'Quarantined', count: 28, percentage: 17.9, color: '#9333ea' },
  { label: 'Investigating', count: 26, percentage: 16.7, color: '#d97706' },
  { label: 'Customer Notified', count: 18, percentage: 11.5, color: '#059669' },
  { label: 'Regulatory Filed', count: 12, percentage: 7.7, color: '#7a0023' },
  { label: 'Recovering', count: 10, percentage: 6.4, color: '#2563eb' },
  { label: 'Resolved', count: 6, percentage: 3.8, color: '#475569' },
];

const WORKFLOW_STEPS = [
  { step: 1, label: 'Signal Detected' },
  { step: 2, label: 'Case Created' },
  { step: 3, label: 'Initial Triage' },
  { step: 4, label: 'Risk Assessment' },
  { step: 5, label: 'Classification' },
  { step: 6, label: 'Quarantine Applied', active: true },
  { step: 7, label: 'Customer Notification' },
  { step: 8, label: 'Regulatory Filing' },
  { step: 9, label: 'Recovery Active' },
  { step: 10, label: 'CAPA / Corrective Action' },
  { step: 11, label: 'Revalidation' },
  { step: 12, label: 'Closed' },
];

const RECALLS_TABLE = [
  { id: 'RCL-2025-00891', type: 'Adverse Reaction', class: 'Class I', source: 'Customer Complaint', product: 'Radiance Vitamin C Serum', supplier: 'Glow Labs Pvt Ltd', brand: 'Radiance', batches: 3, units: '1,250', orders: 156, customers: 68, pub: 'Active Recall', supplierResp: 'Pending', customerNotif: 'Pending', regStatus: 'Filed', recovery: '12%', owner: 'Meera Silva', due: '06 Aug 2026', sla: '-2d', status: 'Active' },
  { id: 'RCL-2025-00877', type: 'Contamination', class: 'Class I', source: 'Lab Test', product: 'Luxe Night Cream', supplier: 'PureFormulations SL', brand: 'Luxe', batches: 5, units: '980', orders: 112, customers: 54, pub: 'Active Recall', supplierResp: 'Responded', customerNotif: 'In Progress', regStatus: 'Filed', recovery: '25%', owner: 'Nimal Perera', due: '07 Aug 2026', sla: '-1d', status: 'Active' },
  { id: 'RCL-2025-00854', type: 'Packaging Failure', class: 'Class II', source: 'QC Inspection', product: 'Pure Sunscreen Gel SPF50', supplier: 'SunCare SL Ltd', brand: 'Pure', batches: 4, units: '760', orders: 96, customers: 40, pub: 'Active Recall', supplierResp: 'Responded', customerNotif: 'Notified', regStatus: 'In Progress', recovery: '48%', owner: 'Shalini Jayawardena', due: '09 Aug 2026', sla: '+1d', status: 'Active' },
  { id: 'RCL-2025-00848', type: 'Labelling Error', class: 'Class III', source: 'Internal Audit', product: 'Aqua Soft Cleanser', supplier: 'AquaCare Pvt Ltd', brand: 'Aqua', batches: 2, units: '420', orders: 64, customers: 28, pub: 'Safety Advisory', supplierResp: 'Pending', customerNotif: 'Pending', regStatus: 'Not Filed', recovery: '10%', owner: 'Meera Silva', due: '08 Aug 2026', sla: '-2d', status: 'Advisory' },
];

export default function RecallSafetyIncidentPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Recall &amp; Safety Incidents / Command Center</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Recall &amp; Safety Incident Command Center</h1>
            <p className="text-xs text-gray-500 mt-1">Coordinate safety investigations, product recalls, inventory quarantine, customer communications, regulatory reporting and recovery operations across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Recall Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Review Critical</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Start Recall Assessment</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ Create Safety Incident</button>
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
            <h3 className="text-[13px] font-bold mb-3">Recall &amp; Safety Incident Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#dc2626', '#9333ea', '#16a34a', '#d97706']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Incident Type Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total Incidents" totalValue="156" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Incident Status Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={STATUS_SUMMARY_DATA} total={156} />
            </div>
          </div>
        </div>

        {/* Health Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Detection Readiness</span> <span className="font-bold text-gray-900 ml-1">84%</span></div>
          <div><span className="text-gray-500">Classification Quality</span> <span className="font-bold text-gray-900 ml-1">79%</span></div>
          <div><span className="text-gray-500">Traceability Coverage</span> <span className="font-bold text-gray-900 ml-1">99%</span></div>
          <div><span className="text-gray-500">Inventory Containment</span> <span className="font-bold text-gray-900 ml-1">26%</span></div>
          <div><span className="text-gray-500">Customer Notification</span> <span className="font-bold text-gray-900 ml-1">72%</span></div>
          <div><span className="text-gray-500">Regulatory Readiness</span> <span className="font-bold text-gray-900 ml-1">81%</span></div>
          <div><span className="text-gray-500">Recovery Readiness</span> <span className="font-bold text-gray-900 ml-1">68%</span></div>
          <div><span className="text-gray-500">Supplier Response</span> <span className="font-bold text-gray-900 ml-1">77%</span></div>
          <div><span className="text-gray-500">Closure Readiness</span> <span className="font-bold text-gray-900 ml-1">74%</span></div>
          <div><span className="text-gray-500">Audit Readiness</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search case / incident ID, product, supplier, brand..."
          filters={[
            { id: 'type', label: 'Incident Type', options: [] },
            { id: 'class', label: 'Recall Class', options: [] },
            { id: 'status', label: 'Status', options: [] },
            { id: 'priority', label: 'Priority', options: [] },
            { id: 'supplier', label: 'Supplier', options: [] },
            { id: 'brand', label: 'Brand', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2 mb-4">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1700px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 pl-4">Case / Recall ID</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Recall Class</th>
                  <th className="px-3 py-2">Detection Source</th>
                  <th className="px-3 py-2 font-bold">Product / SKU</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Brand</th>
                  <th className="px-3 py-2 text-center">Affected Batches</th>
                  <th className="px-3 py-2 text-center">Inventory Units</th>
                  <th className="px-3 py-2 text-center">Orders Affected</th>
                  <th className="px-3 py-2 text-center">Customers Affected</th>
                  <th className="px-3 py-2">Publication Status</th>
                  <th className="px-3 py-2">Supplier Response</th>
                  <th className="px-3 py-2">Customer Notification</th>
                  <th className="px-3 py-2">Regulatory Status</th>
                  <th className="px-3 py-2 font-bold">Recovery Rate</th>
                  <th className="px-3 py-2">Incident Owner</th>
                  <th className="px-3 py-2">Due Date</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {RECALLS_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 pl-4 font-bold text-rose-800">{row.id}</td>
                    <td className="px-3 py-2 font-semibold text-gray-900">{row.type}</td>
                    <td className="px-3 py-2"><span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-[10px] font-bold">{row.class}</span></td>
                    <td className="px-3 py-2 text-gray-500">{row.source}</td>
                    <td className="px-3 py-2 font-bold text-gray-900">{row.product}</td>
                    <td className="px-3 py-2 text-gray-600">{row.supplier}</td>
                    <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                    <td className="px-3 py-2 text-center font-bold">{row.batches}</td>
                    <td className="px-3 py-2 text-center font-bold">{row.units}</td>
                    <td className="px-3 py-2 text-center font-bold text-sky-600">{row.orders}</td>
                    <td className="px-3 py-2 text-center font-bold text-amber-600">{row.customers}</td>
                    <td className="px-3 py-2 font-semibold text-red-600">{row.pub}</td>
                    <td className="px-3 py-2 text-gray-600">{row.supplierResp}</td>
                    <td className="px-3 py-2 text-gray-600">{row.customerNotif}</td>
                    <td className="px-3 py-2 text-gray-600">{row.regStatus}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.recovery}</td>
                    <td className="px-3 py-2 text-gray-500">{row.owner}</td>
                    <td className="px-3 py-2 text-gray-400">{row.due}</td>
                    <td className="px-3 py-2 font-bold text-red-600">{row.sla}</td>
                    <td className="px-3 py-2"><span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{row.status}</span></td>
                    <td className="px-3 py-2 text-center"><button className="text-gray-400 hover:text-gray-900">⋮</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Classification Reference Strip */}
        <div className="bg-white border border-gray-200 rounded-md p-3 mb-4 flex items-center justify-between text-[10px] font-medium">
          <div className="flex items-center gap-1.5"><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">Class I</span><span>Risk of serious adverse health consequences</span></div>
          <div className="flex items-center gap-1.5"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Class II</span><span>Temporary or medically reversible</span></div>
          <div className="flex items-center gap-1.5"><span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">Class III</span><span>Unlikely to cause adverse health</span></div>
          <div className="flex items-center gap-1.5"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Market Withdrawal</span><span>From market, not consumer</span></div>
          <div className="flex items-center gap-1.5"><span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">Safety Advisory</span><span>Informational guidance</span></div>
        </div>

        {/* Bottom Horizontal Lifecycle Workflow */}
        <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
          <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Recall &amp; Incident Lifecycle / Workflow</h3>
          <div className="flex items-center justify-between overflow-x-auto text-center text-[10px]">
            {WORKFLOW_STEPS.map((ws) => (
              <div key={ws.step} className="flex items-center">
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded border ${ws.active ? 'bg-[#7a0023] text-white border-[#7a0023] font-bold' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  <span>{ws.step}.</span>
                  <span>{ws.label}</span>
                </div>
                {ws.step < 12 && <span className="text-gray-300 mx-1">→</span>}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Recall &amp; Safety Intelligence Center">
          <HealthScoreGauge 
            score={88} 
            label="Good / Stable" 
            statusText="Good / Stable"
            statusColor="#16a34a"
            metrics={[
              { label: 'Detection Readiness', value: '84%', progress: 84 },
              { label: 'Classification Quality', value: '79%', progress: 79 },
              { label: 'Traceability Coverage', value: '99%', progress: 99 },
              { label: 'Inventory Containment', value: '26%', progress: 26 },
              { label: 'Customer Notification', value: '72%', progress: 72 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Class I recall active</span><span className="font-bold text-red-500">2</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Supplier response overdue</span><span className="font-bold text-amber-500">6</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Customer notifications pending</span><span className="font-bold text-red-500">42</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Active Incidents</span><span className="font-bold text-gray-900">18</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Active Recalls</span><span className="font-bold text-red-500">4</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Quarantined Batches</span><span className="font-bold text-purple-600">14</span></div>
          </div>
        </RailSection>

        <RailSection title="Final Recall Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">+ Create Safety Incident</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Start Recall Assessment</button>
            <button className="border border-purple-300 text-purple-900 bg-purple-50 py-1.5 rounded text-[11px] font-semibold hover:bg-purple-100">Quarantine Inventory</button>
            <button className="border border-red-300 text-red-900 bg-red-50 py-1.5 rounded text-[11px] font-semibold hover:bg-red-100">Issue Customer Notice</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
