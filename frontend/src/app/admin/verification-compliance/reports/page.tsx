"use client";

import React, { useState } from 'react';
import { 
  Download, Calendar, ChevronDown, CheckCircle2, AlertTriangle, Clock, RefreshCw, FileText, ArrowUpRight
} from 'lucide-react';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';
import { HorizontalStatusChart } from '@/components/admin/shared/HorizontalStatusChart';

const KPI_MINIS = [
  { label: 'Trust Score', value: '89 /100', delta: '▲ 3.8 pts', trend: 'up' },
  { label: 'Entity Risk Exposure', value: 'Medium', delta: '—', trend: 'neutral' },
  { label: 'Audit Readiness', value: '84 /100', delta: '▲ 4 pts', trend: 'up' },
  { label: 'Open Cases', value: '456', delta: '▼ 5.1%', trend: 'down' },
  { label: 'Overdue', value: '18', delta: '▼ 12.5%', trend: 'down' },
  { label: 'Expiring Soon', value: '138', delta: '▲ 8.0%', trend: 'up' },
  { label: 'Documents Verified', value: '91%', delta: '▲ 1.7%', trend: 'up' },
  { label: 'Supplier Compliance', value: '92%', delta: '▲ 1.2%', trend: 'up' },
  { label: 'Aging SLA Breaches', value: '66%', delta: '▲ 3.7%', trend: 'up' },
  { label: 'SLA Adherence', value: '87%', delta: '▲ 2.7%', trend: 'up' },
  { label: 'Rule Effectiveness', value: '87%', delta: '▲ 1.1%', trend: 'up' },
  { label: 'Audit Readiness', value: '84%', delta: '▲ 3 pts', trend: 'up' },
  { label: 'Incident Rate', value: '0.97%', delta: '▼ 1.4%', trend: 'down' },
];

const TABS = [
  { id: 'executive', label: 'Executive Overview' },
  { id: 'verification', label: 'Verification' },
  { id: 'auth', label: 'Brand Authorization' },
  { id: 'cases', label: 'Compliance Cases' },
  { id: 'documents', label: 'Documents' },
  { id: 'safety', label: 'Product Safety' },
  { id: 'authenticity', label: 'Authenticity' },
  { id: 'recalls', label: 'Recalls & Incidents' },
  { id: 'sla', label: 'SLA & Escalations' },
  { id: 'rules', label: 'Rules & Policies' },
  { id: 'suppliers', label: 'Suppliers & Brands' },
  { id: 'channels', label: 'Channels & Regions' },
  { id: 'audit', label: 'Audit Readiness' },
  { id: 'schedules', label: 'Schedules/Exports' },
  { id: 'history', label: 'Report History' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'Active Breaches': Math.floor(Math.random() * 20) + 180,
  Approvals: Math.floor(Math.random() * 30) + 120,
  'Risk Events': Math.floor(Math.random() * 10) + 40,
  'SLA Breaches': Math.floor(Math.random() * 5) + 10,
}));

const DONUT_DATA = [
  { name: 'Supplier Verification', value: 142, color: '#0284c7' },
  { name: 'Brand Authorization', value: 98, color: '#16a34a' },
  { name: 'Product Compliance', value: 81, color: '#9333ea' },
  { name: 'Documents', value: 62, color: '#d97706' },
  { name: 'Authenticity', value: 41, color: '#eab308' },
  { name: 'Recalls & Incidents', value: 21, color: '#dc2626' },
  { name: 'Other', value: 11, color: '#6b7280' },
];

const STATUS_SUMMARY_DATA = [
  { label: 'On Track', count: 241, percentage: 52.6, color: '#16a34a' },
  { label: 'At Risk', count: 118, percentage: 25.8, color: '#eab308' },
  { label: 'Under Review', count: 75, percentage: 16.4, color: '#0284c7' },
  { label: 'Escalated', count: 21, percentage: 4.6, color: '#dc2626' },
  { label: 'Closed', count: 4, percentage: 0.6, color: '#6b7280' },
];

const DOMAIN_TABLE = [
  { id: 1, name: 'Supplier Verification', records: '2,653', highRisk: 134, critical: 22, resolved: '2,289', rate: '86.3%', sla: '91.1%', score: 99, target: 90 },
  { id: 2, name: 'Brand Authorization', records: '1,842', highRisk: 98, critical: 18, resolved: '1,612', rate: '87.5%', sla: '93.2%', score: 91, target: 90 },
  { id: 3, name: 'Product Compliance', records: '3,756', highRisk: 176, critical: 31, resolved: '3,192', rate: '85.0%', sla: '89.4%', score: 87, target: 90 },
  { id: 4, name: 'Document Verification', records: '4,218', highRisk: 121, critical: 15, resolved: '3,842', rate: '91.1%', sla: '94.0%', score: 93, target: 90 },
  { id: 5, name: 'Authenticity Investigations', records: '1,395', highRisk: 78, critical: 12, resolved: '1,205', rate: '86.4%', sla: '88.7%', score: 88, target: 90 },
  { id: 6, name: 'Recalls & Safety Incidents', records: '256', highRisk: 42, critical: 9, resolved: '187', rate: '73.0%', sla: '76.3%', score: 74, target: 90 },
  { id: 7, name: 'SLA & Escalations', records: '1,112', highRisk: 56, critical: 8, resolved: '967', rate: '87.0%', sla: '92.6%', score: 90, target: 90 },
  { id: 8, name: 'Rules & Policies', records: '187', highRisk: 12, critical: 3, resolved: '162', rate: '86.6%', sla: '89.5%', score: 88, target: 90 },
];

const MINI_CARDS = [
  { title: 'Supplier & Brand Compliance', score: '91 /100', delta: '▲ 3.4 pts' },
  { title: 'Verification & Auth Trend', score: '91%', delta: '▲ 2.1%' },
  { title: 'Incidents & Recalls', score: '24', delta: '▼ 11%' },
  { title: 'Compliance Cases Analytics', score: '456', delta: '▲ 5.1%' },
  { title: 'SLA Violation Trend', score: '2,314', delta: '▼ 8.4%' },
  { title: 'Audit Readiness', score: '84%', delta: '▲ 3.0%' },
  { title: 'Product Safety & Regulatory', score: '88%', delta: '▲ 2.7%' },
  { title: 'Authenticity & Counterfeits', score: '96%', delta: '▲ 2.6%' },
  { title: 'Recall & Safety Incidents', score: '22', delta: '▼ 8%' },
];

export default function ComplianceReportsAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('executive');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Reports &amp; Analytics</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Compliance Reports &amp; Analytics</h1>
            <p className="text-xs text-gray-500 mt-1">Analyze compliance performance, risk exposure, escalations, SLA adherence, recalls, rule effectiveness, and audit readiness.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold flex items-center gap-1 hover:bg-gray-50"><Download size={14} /> Export</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold flex items-center gap-1 hover:bg-gray-50"><Calendar size={14} /> Schedule</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ Create Custom Report</button>
          </div>
        </div>

        {/* Executive KPI Strip */}
        <div className="grid grid-cols-13 gap-2 mb-4 overflow-x-auto text-[10px]">
          {KPI_MINIS.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded p-2 flex flex-col min-w-[95px]">
              <span className="text-gray-400 font-medium truncate">{item.label}</span>
              <span className="text-xs font-bold text-gray-900 mt-0.5">{item.value}</span>
              <span className={`text-[9px] font-semibold mt-1 ${item.trend === 'up' ? 'text-green-600' : item.trend === 'down' ? 'text-red-600' : 'text-gray-400'}`}>{item.delta}</span>
            </div>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        {/* Charts Section */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-5 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Compliance Health Trend <span className="text-gray-400 font-normal">(Last 90 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#16a34a', '#0284c7', '#d97706', '#dc2626']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Compliance Risk Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total Risks" totalValue="456" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Operational Status Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={STATUS_SUMMARY_DATA} total={459} />
            </div>
          </div>
        </div>

        {/* Domain Score Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Verification Effectiveness</span> <span className="font-bold text-gray-900 ml-1">89/100</span></div>
          <div><span className="text-gray-500">Supplier Compliance</span> <span className="font-bold text-gray-900 ml-1">91/100</span></div>
          <div><span className="text-gray-500">Brand Authorization</span> <span className="font-bold text-gray-900 ml-1">87/100</span></div>
          <div><span className="text-gray-500">Risk Compliance</span> <span className="font-bold text-gray-900 ml-1">84/100</span></div>
          <div><span className="text-gray-500">Evaluation Coverage</span> <span className="font-bold text-gray-900 ml-1">82/100</span></div>
          <div><span className="text-gray-500">Document Compliance</span> <span className="font-bold text-gray-900 ml-1">95/100</span></div>
          <div><span className="text-gray-500">Incident Response</span> <span className="font-bold text-gray-900 ml-1">86/100</span></div>
          <div><span className="text-gray-500">SLA Adherence</span> <span className="font-bold text-gray-900 ml-1">93/100</span></div>
          <div><span className="text-gray-500">Due Diligence</span> <span className="font-bold text-gray-900 ml-1">92/100</span></div>
          <div><span className="text-gray-500">Regulatory Compliance</span> <span className="font-bold text-gray-900 ml-1">89/100</span></div>
        </div>

        {/* Filter Toolbar */}
        <FilterToolbar 
          searchPlaceholder="Search brands, suppliers, cases..."
          filters={[
            { id: 'category', label: 'Business Category', options: [] },
            { id: 'marketplace', label: 'Marketplace', options: [] },
            { id: 'region', label: 'Region', options: [] },
            { id: 'owner', label: 'Brand Owner', options: [] },
            { id: 'tier', label: 'Supplier Tier', options: [] },
            { id: 'status', label: 'Compliance Status', options: [] },
            { id: 'risk', label: 'Risk Level', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Split Table & Selected Report Preview */}
        <div className="grid grid-cols-12 gap-4 mt-2 mb-6">
          <div className="col-span-8 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[900px]">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-3 py-2 pl-4">#</th>
                    <th className="px-3 py-2">Compliance Domain</th>
                    <th className="px-3 py-2 text-center">Total Records</th>
                    <th className="px-3 py-2 text-center text-amber-600">High Risk</th>
                    <th className="px-3 py-2 text-center text-red-600">Critical Issues</th>
                    <th className="px-3 py-2 text-center">Resolved</th>
                    <th className="px-3 py-2 text-center font-bold">Resolution Rate</th>
                    <th className="px-3 py-2 text-center font-bold">SLA Compliance</th>
                    <th className="px-3 py-2 text-center font-bold text-green-600">Current Score</th>
                    <th className="px-3 py-2 text-center">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {DOMAIN_TABLE.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-3 py-2 pl-4 text-gray-400 font-normal">{row.id}</td>
                      <td className="px-3 py-2 font-bold text-gray-900">{row.name}</td>
                      <td className="px-3 py-2 text-center font-semibold">{row.records}</td>
                      <td className="px-3 py-2 text-center font-bold text-amber-600">{row.highRisk}</td>
                      <td className="px-3 py-2 text-center font-bold text-red-600">{row.critical}</td>
                      <td className="px-3 py-2 text-center">{row.resolved}</td>
                      <td className="px-3 py-2 text-center font-bold">{row.rate}</td>
                      <td className="px-3 py-2 text-center font-bold">{row.sla}</td>
                      <td className="px-3 py-2 text-center font-bold text-green-600 text-sm">{row.score}<span className="text-[9px] text-gray-400 font-normal"> /100</span></td>
                      <td className="px-3 py-2 text-center text-gray-400">{row.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col text-[11px]">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Selected Report / Custom Preview</span>
            <h4 className="font-bold text-gray-900 text-sm mt-1">Product Safety &amp; Regulatory</h4>
            
            <div className="grid grid-cols-2 gap-2 my-3 bg-gray-50 p-2.5 rounded border border-gray-100">
              <div><span className="text-gray-400">Data Source:</span> <span className="font-semibold text-gray-800">Product Safety &amp; Compliance</span></div>
              <div><span className="text-gray-400">Date Range:</span> <span className="font-semibold text-gray-800">May 20, 2025 – Aug 20, 2025</span></div>
              <div><span className="text-gray-400">Last Run:</span> <span className="font-semibold text-gray-800">May 20, 2025 1:17 PM</span></div>
              <div><span className="text-gray-400">Report Type:</span> <span className="font-semibold text-gray-800">Operational</span></div>
            </div>

            <div className="space-y-1 my-2">
              <span className="font-bold text-gray-900">Top Insights:</span>
              <ul className="list-disc pl-4 text-gray-600 space-y-1 text-[10px]">
                <li>Expired SDS submissions decreased by 14%</li>
                <li>High-risk chemical alerts reduced by 9%</li>
                <li>Unapproved claims increased by 6%</li>
              </ul>
            </div>

            <button className="bg-[#7a0023] text-white py-1.5 rounded font-semibold mt-auto hover:bg-[#a0002b]">View Full Report →</button>
          </div>
        </div>

        {/* Mini Sparklines Row (9 Cards) */}
        <div className="grid grid-cols-9 gap-3 mb-6">
          {MINI_CARDS.map((card, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-md p-2.5 flex flex-col justify-between shadow-sm">
              <span className="text-[10px] text-gray-500 font-semibold truncate mb-1">{card.title}</span>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-sm font-bold text-gray-900">{card.score}</div>
                  <div className={`text-[9px] font-bold ${card.delta.includes('▲') ? 'text-green-600' : 'text-red-600'}`}>{card.delta}</div>
                </div>
                <div className="h-6 w-12 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-[9px] text-gray-400 font-mono">
                  📊
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lower Report Management Panels (5 Grid Columns) */}
        <div className="grid grid-cols-5 gap-4 text-[11px] mb-6">
          
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-900 text-xs">Compliance Report Library</h4>
              <span className="text-[10px] text-[#7a0023] font-bold cursor-pointer">View all</span>
            </div>
            <div className="space-y-2 text-gray-700 mt-2 text-[10px]">
              <div className="hover:text-gray-900 cursor-pointer font-medium">📄 Executive Compliance Overview</div>
              <div className="hover:text-gray-900 cursor-pointer font-medium">📄 Supplier Verification Summary</div>
              <div className="hover:text-gray-900 cursor-pointer font-medium">📄 Brand Authorization Report</div>
              <div className="hover:text-gray-900 cursor-pointer font-medium">📄 Product Compliance Dashboard</div>
              <div className="hover:text-gray-900 cursor-pointer font-medium">📄 SLA &amp; Escalation Tracker</div>
              <div className="hover:text-gray-900 cursor-pointer font-medium">📄 Audit Readiness Report</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-900 text-xs">Scheduled Compliance Reports</h4>
              <span className="text-[10px] text-[#7a0023] font-bold cursor-pointer">View all</span>
            </div>
            <div className="space-y-2 text-gray-700 mt-2 text-[10px]">
              <div className="flex justify-between"><span>Executive Compliance Overview</span><span className="text-gray-400">Weekly</span></div>
              <div className="flex justify-between"><span>Supplier Verification Summary</span><span className="text-gray-400">Weekly</span></div>
              <div className="flex justify-between"><span>Product Compliance Dashboard</span><span className="text-gray-400">Daily</span></div>
              <div className="flex justify-between"><span>SLA &amp; Escalation Tracker</span><span className="text-gray-400">Weekly</span></div>
              <div className="flex justify-between"><span>Audit Readiness Report</span><span className="text-gray-400">Monthly</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-900 text-xs">Custom Report Builder Summary</h4>
              <span className="text-[10px] text-[#7a0023] font-bold cursor-pointer">View all</span>
            </div>
            <div className="space-y-2 text-gray-700 mt-2 text-[10px]">
              <div className="flex justify-between"><span>Draft Reports</span><span className="font-bold text-gray-900">8</span></div>
              <div className="flex justify-between"><span>Saved Reports</span><span className="font-bold text-gray-900">14</span></div>
              <div className="flex justify-between"><span>Shared Reports</span><span className="font-bold text-gray-900">6</span></div>
              <div className="flex justify-between"><span>Recently Updated</span><span className="font-bold text-gray-900">5</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-900 text-xs">Report Exports &amp; Export History</h4>
              <span className="text-[10px] text-[#7a0023] font-bold cursor-pointer">View all</span>
            </div>
            <div className="space-y-2 text-gray-700 mt-2 text-[10px]">
              <div className="flex justify-between"><span>Executive Compliance Overview</span><span className="text-green-600 font-bold">Completed</span></div>
              <div className="flex justify-between"><span>Supplier Verification Summary</span><span className="text-green-600 font-bold">Completed</span></div>
              <div className="flex justify-between"><span>Product Compliance Dashboard</span><span className="text-green-600 font-bold">Completed</span></div>
              <div className="flex justify-between"><span>Audit Readiness Report</span><span className="text-green-600 font-bold">Completed</span></div>
              <div className="flex justify-between"><span>SLA &amp; Escalation Tracker</span><span className="text-green-600 font-bold">Completed</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-900 text-xs">Saved Reports / Subscriptions</h4>
              <span className="text-[10px] text-[#7a0023] font-bold cursor-pointer">View all</span>
            </div>
            <div className="space-y-2 text-gray-700 mt-2 text-[10px]">
              <div className="flex justify-between"><span>Executive Compliance Overview</span><span className="text-gray-400">Daily</span></div>
              <div className="flex justify-between"><span>Supplier Verification Summary</span><span className="text-gray-400">Weekly</span></div>
              <div className="flex justify-between"><span>Product Compliance Dashboard</span><span className="text-gray-400">Daily</span></div>
              <div className="flex justify-between"><span>Audit Readiness Report</span><span className="text-gray-400">Monthly</span></div>
              <div className="flex justify-between"><span>SLA &amp; Escalation Tracker</span><span className="text-gray-400">Weekly</span></div>
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Compliance Analytics Health">
          <HealthScoreGauge 
            score={88} 
            label="Good" 
            statusText="Good"
            statusColor="#16a34a"
            metrics={[
              { label: 'Data Completeness', value: '98%', progress: 98 },
              { label: 'Accuracy', value: '96%', progress: 96 },
              { label: 'Timeliness', value: '95%', progress: 95 },
              { label: 'Consistency', value: '93%', progress: 93 },
              { label: 'Coverage', value: '92%', progress: 92 },
              { label: 'Uniqueness', value: '90%', progress: 90 },
              { label: 'Processing Integrity', value: '90%', progress: 90 },
              { label: 'Freshness', value: '88%', progress: 88 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts (6)">
          <div className="flex flex-col gap-1.5 text-[11px]">
            <div className="flex justify-between items-center bg-red-50 p-1.5 rounded border border-red-100"><span className="text-red-900 font-semibold">18 verified findings require review</span><span className="font-bold text-red-600">Critical</span></div>
            <div className="flex justify-between items-center bg-amber-50 p-1.5 rounded border border-amber-100"><span className="text-amber-900 font-semibold">24 SLA breaches at risk</span><span className="font-bold text-amber-600">High</span></div>
            <div className="flex justify-between items-center bg-yellow-50 p-1.5 rounded border border-yellow-100"><span className="text-yellow-900 font-semibold">Product Safety review below target (84%)</span><span className="font-bold text-yellow-700">Medium</span></div>
            <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded border border-gray-200"><span className="text-gray-700">Document verification delays in 6 suppliers</span><span className="font-bold text-gray-600">Low</span></div>
          </div>
        </RailSection>

        <RailSection title="Compliance Domain Summary">
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] my-1">
            <div className="bg-gray-50 p-1.5 rounded border border-gray-100"><div className="text-gray-400">Domains</div><div className="font-bold text-gray-900 text-xs">12</div></div>
            <div className="bg-gray-50 p-1.5 rounded border border-gray-100"><div className="text-gray-400">High Risk</div><div className="font-bold text-amber-600 text-xs">89</div></div>
            <div className="bg-gray-50 p-1.5 rounded border border-gray-100"><div className="text-gray-400">Cases</div><div className="font-bold text-gray-900 text-xs">456</div></div>
            <div className="bg-gray-50 p-1.5 rounded border border-gray-100"><div className="text-gray-400">Compliance</div><div className="font-bold text-green-600 text-xs">68%</div></div>
          </div>
        </RailSection>

        <RailSection title="Filter &amp; Analytics Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">View Board Report</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Save As View</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Generate Executive Pack</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Open Report Library</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
