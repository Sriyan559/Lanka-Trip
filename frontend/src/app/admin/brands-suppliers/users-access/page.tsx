"use client";

import React, { useState } from 'react';
import { 
  Users, UserCheck, ShieldCheck, Hourglass, UserPlus, AlertTriangle, 
  PauseCircle, Award, Key, AlertCircle, ShieldAlert, ChevronDown, CheckCircle2
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
  { index: 1, title: 'Total Supplier Users', value: '1,842', delta: { value: '2.1%', trend: 'up' as const }, icon: Users, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Active Users', value: '1,526', delta: { value: '1.6%', trend: 'up' as const }, icon: UserCheck, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 3, title: 'Pending Invitations', value: '64', delta: { value: '12.5%', trend: 'up' as const }, icon: UserPlus, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 4, title: 'Suspended Users', value: '18', delta: { value: '10.0%', trend: 'down' as const }, icon: PauseCircle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600' },
  { index: 5, title: 'Privileged Users', value: '126', delta: { value: '3.2%', trend: 'up' as const }, icon: Key, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 6, title: 'MFA Enforced', value: '1,438', delta: { value: '2.4%', trend: 'up' as const }, icon: ShieldCheck, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { index: 7, title: 'MFA Missing', value: '88', delta: { value: '4.3%', trend: 'down' as const }, icon: AlertTriangle, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
  { index: 8, title: 'Dormant Accounts', value: '42', delta: { value: '5.0%', trend: 'up' as const }, icon: Hourglass, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 9, title: 'Access Reviews Due', value: '36', delta: { value: '20.0%', trend: 'up' as const }, icon: Award, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 10, title: 'Excessive Access Risks', value: '18', delta: { value: '5.3%', trend: 'down' as const }, icon: AlertCircle, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 11, title: 'Service Principals', value: '24', delta: { value: '9.1%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 12, title: 'Expired Access Assignments', value: '31', delta: { value: '6.1%', trend: 'down' as const }, icon: AlertCircle, iconBgColor: 'bg-[#7a0023]/10', iconColor: 'text-[#7a0023]' },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Access Scope', value: 'Active Supplier Identity Network' },
  { label: 'Identity Provider', value: 'Enterprise Auth' },
  { label: 'Review Period', value: 'Current Quarter' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'all', label: 'All Users' },
  { id: 'active', label: 'Active' },
  { id: 'pending', label: 'Pending Invitations' },
  { id: 'privileged', label: 'Privileged' },
  { id: 'mfa', label: 'MFA Issues' },
  { id: 'dormant', label: 'Dormant Accounts' },
  { id: 'reviews', label: 'Access Reviews' },
  { id: 'conflicts', label: 'Role Conflicts' },
  { id: 'principals', label: 'Service Principals' },
  { id: 'suspended', label: 'Suspended' },
  { id: 'revoked', label: 'Revoked' },
  { id: 'audit', label: 'Audit History' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'Invited Users': Math.floor(Math.random() * 50) + 200,
  'Active Users': Math.floor(Math.random() * 100) + 1200,
  'Access Reviews Completed': Math.floor(Math.random() * 80) + 400,
  'Flagged Risks': Math.floor(Math.random() * 10) + 5,
}));

const DONUT_DATA = [
  { name: 'Brand Owners', value: 542, color: '#0284c7' },
  { name: 'Distributors', value: 462, color: '#16a34a' },
  { name: 'Importers', value: 318, color: '#d97706' },
  { name: 'Wholesalers', value: 246, color: '#9333ea' },
  { name: 'Labs', value: 154, color: '#0d9488' },
  { name: 'Service Partners', value: 120, color: '#475569' },
];

const ACCESS_SUMMARY_DATA = [
  { label: 'On Track', count: 1102, percentage: 59.8, color: '#16a34a' },
  { label: 'At Risk', count: 362, percentage: 19.6, color: '#eab308' },
  { label: 'Under Review', count: 196, percentage: 10.6, color: '#0284c7' },
  { label: 'Breached', count: 82, percentage: 4.5, color: '#dc2626' },
  { label: 'Escalated', count: 48, percentage: 2.6, color: '#9333ea' },
  { label: 'Revoked', count: 52, percentage: 2.8, color: '#475569' },
];

const USERS_TABLE = [
  { name: 'Sarah Fernando', email: 's.fernando@loreal.lk', id: 'USR-1001', supplier: 'LVMH Beauty Mfg.', role: 'Catalogue Manager', bu: 2, channels: 3, regions: 'Sri Lanka', profile: 'Catalogue Manager', privilege: 'Standard', mfa: 'Verified', identity: 'Active', invite: 'Accepted', lastLogin: '04 Aug 2026 09:10 AM', review: '04 Aug 2027', risk: 'Low', owner: 'Elena Vance', updated: '04 Aug 2026', sla: '98%' },
  { name: 'Rajiv Perera', email: 'r.perera@luxe.lk', id: 'USR-1002', supplier: 'Luxe Distribution', role: 'Distributor Admin', bu: 4, channels: 4, regions: 'Sri Lanka', profile: 'Distributor Admin', privilege: 'Privileged', mfa: 'Verified', identity: 'Active', invite: 'Accepted', lastLogin: '04 Aug 2026 08:22 AM', review: '04 Feb 2027', risk: 'Overdue', owner: 'Marco Lee', updated: '04 Aug 2026', sla: '84%' },
  { name: 'Nadeesha Silva', email: 'n.silva@tokyo.lk', id: 'USR-1003', supplier: 'Tokyo Beauty Dist.', role: 'Procurement Lead', bu: 3, channels: 2, regions: 'Sri Lanka, India', profile: 'Procurement Lead', privilege: 'Standard', mfa: 'MFA Missing', identity: 'Active', invite: 'Accepted', lastLogin: '31 Jul 2026 05:40 PM', review: '31 Jan 2027', risk: 'Medium', owner: 'Priya Nair', updated: '03 Aug 2026', sla: '91%' },
  { name: 'Priya Kapoor', email: 'p.kapoor@puroglow.ae', id: 'USR-1004', supplier: 'Glow Global Exports', role: 'Quality Manager', bu: 1, channels: 2, regions: 'Sri Lanka, UAE', profile: 'Quality Manager', privilege: 'Standard', mfa: 'Verified', identity: 'Active', invite: 'Accepted', lastLogin: '02 Aug 2026 10:05 AM', review: '02 Nov 2026', risk: 'Overdue', owner: 'Marco Lee', updated: '02 Aug 2026', sla: '96%' },
];

export default function SupplierUsersAccessPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Supplier Users, Roles &amp; Access</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Users, Roles &amp; Access</h1>
            <p className="text-xs text-gray-500 mt-1">Manage supplier identities, roles, permissions, access scope, MFA, service principals, and periodic access reviews across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Export Access Report</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Start Access Review</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">+ Invite Supplier User</button>
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
            <h3 className="text-[13px] font-bold mb-3">Supplier Access Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#16a34a', '#9333ea', '#dc2626']} />
            </div>
          </div>

          <div className="col-span-3 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Access Distribution</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total Users" totalValue="1,842" />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Issue Status / Access Summary</h3>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <HorizontalStatusChart data={ACCESS_SUMMARY_DATA} total={1842} />
            </div>
          </div>
        </div>

        {/* Scorecard Strip */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 flex justify-between text-[11px]">
          <div><span className="text-gray-500">Identity Verification</span> <span className="font-bold text-gray-900 ml-1">94%</span></div>
          <div><span className="text-gray-500">MFA Coverage</span> <span className="font-bold text-gray-900 ml-1">93%</span></div>
          <div><span className="text-gray-500">Permission Accuracy</span> <span className="font-bold text-gray-900 ml-1">88%</span></div>
          <div><span className="text-gray-500">Role Hygiene</span> <span className="font-bold text-gray-900 ml-1">85%</span></div>
          <div><span className="text-gray-500">Review Readiness</span> <span className="font-bold text-gray-900 ml-1">86%</span></div>
          <div><span className="text-gray-500">Privileged Access Control</span> <span className="font-bold text-gray-900 ml-1">82%</span></div>
          <div><span className="text-gray-500">Service Principal Security</span> <span className="font-bold text-gray-900 ml-1">90%</span></div>
          <div><span className="text-gray-500">Regional Scope Control</span> <span className="font-bold text-gray-900 ml-1">91%</span></div>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterToolbar 
          searchPlaceholder="Search users, roles, suppliers or ID..."
          filters={[
            { id: 'type', label: 'Supplier Type', options: [] },
            { id: 'status', label: 'User Status', options: [] },
            { id: 'role', label: 'Role Type', options: [] },
            { id: 'bu', label: 'Business Unit', options: [] },
            { id: 'mfa', label: 'MFA Status', options: [] },
          ]}
          onClearAll={() => {}}
        />

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-2">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1600px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 text-center w-8"><input type="checkbox" className="rounded" /></th>
                  <th className="px-3 py-2">User Name / Legal Entity</th>
                  <th className="px-3 py-2">User ID</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2 text-center">Business Units</th>
                  <th className="px-3 py-2 text-center">Sales Channels</th>
                  <th className="px-3 py-2">Regions</th>
                  <th className="px-3 py-2">Permission Profile</th>
                  <th className="px-3 py-2">Privilege Level</th>
                  <th className="px-3 py-2">MFA</th>
                  <th className="px-3 py-2">Identity Status</th>
                  <th className="px-3 py-2">Invitation Status</th>
                  <th className="px-3 py-2">Last Login</th>
                  <th className="px-3 py-2">Access Review</th>
                  <th className="px-3 py-2">Risk</th>
                  <th className="px-3 py-2">Owner / Reviewer</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {USERS_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-3 py-2 text-center"><input type="checkbox" className="rounded" /></td>
                    <td className="px-3 py-2 flex items-center gap-2">
                      <div className="w-7 h-7 bg-[#7a0023] text-white rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        {row.name.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{row.name}</div>
                        <div className="text-[10px] text-gray-400">{row.email}</div>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{row.id}</td>
                    <td className="px-3 py-2 font-semibold text-gray-900">{row.supplier}</td>
                    <td className="px-3 py-2 text-gray-600">{row.role}</td>
                    <td className="px-3 py-2 text-center font-bold">{row.bu}</td>
                    <td className="px-3 py-2 text-center font-bold">{row.channels}</td>
                    <td className="px-3 py-2 text-gray-600">{row.regions}</td>
                    <td className="px-3 py-2 text-gray-600">{row.profile}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${row.privilege === 'Privileged' ? 'bg-purple-50 text-purple-700' : 'bg-gray-50 text-gray-700'}`}>
                        {row.privilege}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`font-semibold ${row.mfa === 'Verified' ? 'text-green-600' : 'text-red-600'}`}>
                        {row.mfa}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.identity}</td>
                    <td className="px-3 py-2 text-gray-600">{row.invite}</td>
                    <td className="px-3 py-2 text-gray-400">{row.lastLogin}</td>
                    <td className="px-3 py-2 text-gray-600 font-semibold">{row.review}</td>
                    <td className="px-3 py-2">
                      <span className={`font-bold ${row.risk === 'Low' ? 'text-green-600' : 'text-amber-600'}`}>{row.risk}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{row.owner}</td>
                    <td className="px-3 py-2 text-gray-400">{row.updated}</td>
                    <td className="px-3 py-2 font-bold text-green-600">{row.sla}</td>
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
        <RailSection title="Supplier Access Health">
          <HealthScoreGauge 
            score={89} 
            label="Stable" 
            statusText="Stable"
            statusColor="#16a34a"
            metrics={[
              { label: 'Identity', value: '94%', progress: 94 },
              { label: 'MFA', value: '93%', progress: 93 },
              { label: 'Permission Accuracy', value: '88%', progress: 88 },
              { label: 'Role Hygiene', value: '85%', progress: 85 },
              { label: 'Access Review', value: '86%', progress: 86 },
            ]}
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Excessive-access conflict</span><span className="font-bold text-red-500">18</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">MFA missing for privileged users</span><span className="font-bold text-red-500">12</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Dormant admin account (90 days)</span><span className="font-bold text-amber-500">7</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">Access Reviews Due</span><span className="font-bold text-gray-900">36</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">MFA Missing Users</span><span className="font-bold text-red-500">88</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Excessive Access Risks</span><span className="font-bold text-amber-500">18</span></div>
          </div>
        </RailSection>

        <RailSection title="Final Access Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">Edit User Access</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Start Access Review</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Invite Supplier User</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Reset MFA</button>
            <button className="border border-amber-300 text-amber-900 bg-amber-50 py-1.5 rounded text-[11px] font-semibold hover:bg-amber-100">Restrict Access</button>
            <button className="border border-red-300 text-red-900 bg-red-50 py-1.5 rounded text-[11px] font-semibold hover:bg-red-100">Suspend User</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
