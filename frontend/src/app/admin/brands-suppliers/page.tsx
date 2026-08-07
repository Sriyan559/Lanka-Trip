"use client";

import React, { useState } from 'react';
import { 
  Users, UserCheck, ShieldCheck, Hourglass, FilePlus, AlertTriangle, 
  PauseCircle, Award, Clock, AlertCircle, FileText, ShieldAlert, 
  ChevronDown, Search, CheckCircle2, RefreshCw, Layers, Building2, 
  ArrowUpRight, ExternalLink, Filter
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';
import { HorizontalStatusChart } from '@/components/admin/shared/HorizontalStatusChart';

const KPI_DATA = [
  { index: 1, title: 'Total Suppliers', value: '842', delta: { value: '2.1%', trend: 'down' as const }, icon: Users, iconBgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { index: 2, title: 'Active Suppliers', value: '768', delta: { value: '4.6%', trend: 'up' as const }, icon: UserCheck, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 3, title: 'Verified Suppliers', value: '612', delta: { value: '3.2%', trend: 'up' as const }, icon: ShieldCheck, iconBgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { index: 4, title: 'Pending Verification', value: '128', delta: { value: '5.7%', trend: 'up' as const }, icon: Hourglass, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 5, title: 'New Applications', value: '42', delta: { value: '7.7%', trend: 'up' as const }, icon: FilePlus, iconBgColor: 'bg-sky-50', iconColor: 'text-sky-600' },
  { index: 6, title: 'High-Risk Suppliers', value: '12', delta: { value: '9.1%', trend: 'up' as const }, icon: AlertTriangle, iconBgColor: 'bg-rose-50', iconColor: 'text-rose-600', alert: true },
  { index: 7, title: 'Suspended Suppliers', value: '9', delta: { value: '0.0%', trend: 'neutral' as const }, icon: PauseCircle, iconBgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { index: 8, title: 'Active Brand Authorizations', value: '486', delta: { value: '5.3%', trend: 'up' as const }, icon: Award, iconBgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { index: 9, title: 'Pending Authorizations', value: '54', delta: { value: '8.0%', trend: 'up' as const }, icon: Clock, iconBgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { index: 10, title: 'Expiring Authorizations', value: '18', delta: { value: '12.5%', trend: 'up' as const }, icon: AlertCircle, iconBgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { index: 11, title: 'Contract Renewals Due', value: '26', delta: { value: '4.0%', trend: 'up' as const }, icon: FileText, iconBgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { index: 12, title: 'Compliance Issues', value: '31', delta: { value: '6.9%', trend: 'up' as const }, icon: ShieldAlert, iconBgColor: 'bg-red-50', iconColor: 'text-red-600', alert: true },
];

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
];

const TREND_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 6}`,
  'New Applications': Math.floor(Math.random() * 25) + 20,
  Approved: Math.floor(Math.random() * 20) + 15,
  Rejected: Math.floor(Math.random() * 8) + 2,
}));

const DONUT_DATA = [
  { name: 'Brand Owners', value: 248, color: '#0284c7' },
  { name: 'Distributors', value: 214, color: '#16a34a' },
  { name: 'Importers', value: 138, color: '#d97706' },
  { name: 'Wholesalers', value: 112, color: '#9333ea' },
  { name: 'Labs', value: 72, color: '#0d9488' },
  { name: 'Service Partners', value: 58, color: '#475569' },
];

const VERIFICATION_STATUS_DATA = [
  { label: 'Verified', count: 612, percentage: 72.7, color: '#16a34a' },
  { label: 'Pending', count: 128, percentage: 15.2, color: '#d97706' },
  { label: 'Under Review', count: 90, percentage: 10.7, color: '#2563eb' },
  { label: 'Rejected', count: 12, percentage: 1.4, color: '#dc2626' },
];

const AUTHORIZATION_STATUS_DATA = [
  { label: 'Active', count: 486, percentage: 68.8, color: '#16a34a' },
  { label: 'Pending', count: 54, percentage: 7.6, color: '#d97706' },
  { label: 'Expiring (30 days)', count: 18, percentage: 2.5, color: '#eab308' },
  { label: 'Expired', count: 22, percentage: 3.1, color: '#dc2626' },
];

const RISK_SUMMARY_DATA = [
  { label: 'High Risk', count: 12, percentage: 1.4, color: '#dc2626' },
  { label: 'Medium Risk', count: 86, percentage: 10.2, color: '#d97706' },
  { label: 'Low Risk', count: 744, percentage: 88.4, color: '#16a34a' },
];

const CONTRACT_SUMMARY_DATA = [
  { label: 'Active', count: 612, percentage: 72.7, color: '#16a34a' },
  { label: 'Renewals Due (30d)', count: 26, percentage: 3.1, color: '#d97706' },
  { label: 'Expired', count: 31, percentage: 3.7, color: '#dc2626' },
];

const PRIORITY_APPLICATIONS = [
  { id: 'SUP-2026-004582', name: 'Velvet Botanics', type: 'Brand Owner', country: 'Sri Lanka', date: '04 Aug 2026', brands: 6, risk: 'High', reviewer: 'Elena Vance', sla: '16h', status: 'Under Review' },
  { id: 'SUP-2026-004571', name: 'Luxe Distributions', type: 'Distributor', country: 'India', date: '03 Aug 2026', brands: 12, risk: 'Medium', reviewer: 'Marco Lee', sla: '22h', status: 'KYC Check' },
  { id: 'SUP-2026-004566', name: 'PuroGlow Imports', type: 'Importer', country: 'UAE', date: '02 Aug 2026', brands: 8, risk: 'High', reviewer: 'Priya Kapoor', sla: '14h', status: 'Under Review' },
  { id: 'SUP-2026-004551', name: 'SilkRoad Supplies', type: 'Wholesaler', country: 'China', date: '01 Aug 2026', brands: 5, risk: 'Medium', reviewer: 'Mada Aludeni', sla: '1d 2h', status: 'KYC Check' },
  { id: 'SUP-2026-004540', name: 'Glow Labs Pvt Ltd', type: 'Lab', country: 'Sri Lanka', date: '31 Jul 2026', brands: 3, risk: 'Low', reviewer: 'Elena Vance', sla: '10h', status: 'Commercial Review' },
];

const PRIORITY_AUTHORIZATIONS = [
  { id: 'AUTH-2026-00821', brand: "L'Oréal", supplier: 'Velvet Botanics', type: 'Brand Owner', submitted: '02 Aug 2026', expiry: '02 Aug 2027', status: 'Under Review', sla: '18h' },
  { id: 'AUTH-2026-00815', brand: 'The Ordinary', supplier: 'PuroGlow Imports', type: 'Importer', submitted: '01 Aug 2026', expiry: '01 Aug 2027', status: 'Legal Review', sla: '1d' },
  { id: 'AUTH-2026-00808', brand: 'Estée Lauder', supplier: 'Luxe Distributions', type: 'Distributor', submitted: '31 Jul 2026', expiry: '31 Jul 2027', status: 'Approved', sla: '—' },
  { id: 'AUTH-2026-00797', brand: 'COSRX', supplier: 'Glow Labs', type: 'Lab', submitted: '30 Jul 2026', expiry: '30 Jul 2027', status: 'Approved', sla: '—' },
  { id: 'AUTH-2026-00790', brand: 'Neutrogena', supplier: 'SilkRoad Supplies', type: 'Wholesaler', submitted: '28 Jul 2026', expiry: '28 Jul 2027', status: 'Expired', sla: '—' },
];

const RECENT_ACTIVITY = [
  { date: '04 Aug 2026, 11:35 AM', activity: 'Supplier application submitted', entityType: 'Supplier', entityName: 'Velvet Botanics', refId: 'SUP-2026-004582', actor: 'Elena Vance', status: 'New', details: 'New supplier application received' },
  { date: '04 Aug 2026, 10:58 AM', activity: 'Brand authorization approved', entityType: 'Authorization', entityName: "L'Oréal", refId: 'AUTH-2026-00621', actor: 'Elena Vance', status: 'Approved', details: 'Brand authorization approved' },
  { date: '04 Aug 2026, 10:30 AM', activity: 'KYC documents uploaded', entityType: 'Supplier', entityName: 'Luxe Distributions', refId: 'SUP-2026-004571', actor: 'Marco Lee', status: 'Updated', details: 'KYC and tax documents uploaded' },
  { date: '04 Aug 2026, 09:45 AM', activity: 'Contract renewal reminder sent', entityType: 'Contract', entityName: 'PuroGlow Imports', refId: 'CON-2025-00654', actor: 'System', status: 'Info', details: 'Renewal reminder sent (30 days)' },
  { date: '04 Aug 2026, 09:12 AM', activity: 'SLA breach recorded', entityType: 'Verification', entityName: 'SilkRoad Supplies', refId: 'VER-2026-00321', actor: 'System', status: 'Alert', details: 'Verification SLA breached' },
];

export default function BrandsSuppliersCommandCenter() {
  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Command Center</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Brands &amp; Suppliers Command Center</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor supplier onboarding, verification, brand authorization, contracts, catalogue coverage, performance, risk and compliance across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-1.5">
              Export Operations Report
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-1.5">
              Review Pending Applications
            </button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b] transition-colors shadow-sm flex items-center gap-1.5">
              <span className="text-base leading-none">+</span> Add Supplier
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-[13px] font-semibold flex items-center gap-1 hover:bg-gray-50 transition-colors shadow-sm">
              More Actions <ChevronDown size={14} />
            </button>
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

        {/* Middle Charts Grid (Trend & Composition) */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-8 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13px] font-bold">Supplier Onboarding Trend <span className="text-gray-400 font-normal">(Last 30 Days)</span></h3>
              <div className="flex items-center gap-2">
                <select className="border border-gray-200 rounded px-2 py-0.5 text-[11px] bg-white text-gray-600 outline-none">
                  <option>Last 30 Days</option>
                </select>
              </div>
            </div>
            <div className="flex-grow">
              <TrendChart data={TREND_DATA} colors={['#0284c7', '#16a34a', '#dc2626']} />
            </div>
          </div>

          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 h-[280px] flex flex-col">
            <h3 className="text-[13px] font-bold mb-3">Supplier Composition</h3>
            <div className="flex-grow">
              <DonutDistributionChart data={DONUT_DATA} totalLabel="Total" totalValue="842" />
            </div>
          </div>
        </div>

        {/* Operations Strip */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Supplier Verification Operations */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
            <h3 className="text-[13px] font-bold mb-3 text-gray-900">Supplier Verification Operations</h3>
            <div className="grid grid-cols-6 gap-2 text-center">
              {[
                { label: 'Submitted', count: 142, delta: '↑ 8.5%', color: 'text-blue-600' },
                { label: 'Under Review', count: 98, delta: '↑ 3.2%', color: 'text-amber-600' },
                { label: 'KYC Check', count: 76, delta: '↑ 5.1%', color: 'text-orange-600' },
                { label: 'Commercial Review', count: 64, delta: '↑ 6.7%', color: 'text-purple-600' },
                { label: 'Approved', count: 512, delta: '↑ 4.3%', color: 'text-green-600' },
                { label: 'Rejected', count: 18, delta: '↑ 4.1%', color: 'text-rose-600' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col p-2 bg-gray-50 border border-gray-100 rounded">
                  <span className="text-[10px] text-gray-500 font-medium truncate">{item.label}</span>
                  <span className="text-base font-bold text-gray-900 mt-0.5">{item.count}</span>
                  <span className={`text-[9px] font-bold ${item.color}`}>{item.delta}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Authorization Operations */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
            <h3 className="text-[13px] font-bold mb-3 text-gray-900">Brand Authorization Operations</h3>
            <div className="grid grid-cols-6 gap-2 text-center">
              {[
                { label: 'Submitted', count: 68, delta: '↑ 7.9%', color: 'text-blue-600' },
                { label: 'Under Review', count: 44, delta: '↑ 6.8%', color: 'text-amber-600' },
                { label: 'Legal Review', count: 26, delta: '↑ 3.7%', color: 'text-purple-600' },
                { label: 'Approved', count: 486, delta: '↑ 5.3%', color: 'text-green-600' },
                { label: 'Rejected', count: 12, delta: '↓ 2.3%', color: 'text-rose-600' },
                { label: 'Expired', count: 18, delta: '↑ 8.0%', color: 'text-gray-600' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col p-2 bg-gray-50 border border-gray-100 rounded">
                  <span className="text-[10px] text-gray-500 font-medium truncate">{item.label}</span>
                  <span className="text-base font-bold text-gray-900 mt-0.5">{item.count}</span>
                  <span className={`text-[9px] font-bold ${item.color}`}>{item.delta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Tables Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Priority Supplier Applications */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13px] font-bold text-gray-900">Priority Supplier Applications</h3>
              <span className="text-[10px] font-semibold text-[#7a0023] cursor-pointer hover:underline">View all</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-semibold">
                  <tr>
                    <th className="py-1.5 px-2">Application ID</th>
                    <th className="py-1.5 px-2">Supplier Name</th>
                    <th className="py-1.5 px-2">Type</th>
                    <th className="py-1.5 px-2">Country</th>
                    <th className="py-1.5 px-2">Submitted</th>
                    <th className="py-1.5 px-2">Doc Progress</th>
                    <th className="py-1.5 px-2 text-center">Brand Links</th>
                    <th className="py-1.5 px-2">Risk Level</th>
                    <th className="py-1.5 px-2">Assigned Reviewer</th>
                    <th className="py-1.5 px-2">SLA</th>
                    <th className="py-1.5 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {PRIORITY_APPLICATIONS.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="py-1.5 px-2 text-rose-800 font-bold">{app.id}</td>
                      <td className="py-1.5 px-2 font-bold text-gray-900">{app.name}</td>
                      <td className="py-1.5 px-2 text-gray-500">{app.type}</td>
                      <td className="py-1.5 px-2 text-gray-500">{app.country}</td>
                      <td className="py-1.5 px-2 text-gray-500">{app.date}</td>
                      <td className="py-1.5 px-2">
                        <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full w-3/4"></div>
                        </div>
                      </td>
                      <td className="py-1.5 px-2 text-center font-bold">{app.brands}</td>
                      <td className="py-1.5 px-2">
                        <span className={`font-bold ${app.risk === 'High' ? 'text-red-600' : app.risk === 'Medium' ? 'text-amber-600' : 'text-green-600'}`}>
                          {app.risk}
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-gray-500">{app.reviewer}</td>
                      <td className="py-1.5 px-2 text-gray-500">{app.sla}</td>
                      <td className="py-1.5 px-2">
                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-blue-100">
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Priority Brand Authorization Cases */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13px] font-bold text-gray-900">Priority Brand Authorization Cases</h3>
              <span className="text-[10px] font-semibold text-[#7a0023] cursor-pointer hover:underline">View all</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-semibold">
                  <tr>
                    <th className="py-1.5 px-2">Case ID</th>
                    <th className="py-1.5 px-2">Brand</th>
                    <th className="py-1.5 px-2">Supplier</th>
                    <th className="py-1.5 px-2">Type</th>
                    <th className="py-1.5 px-2">Submitted</th>
                    <th className="py-1.5 px-2">Expiry</th>
                    <th className="py-1.5 px-2">Status</th>
                    <th className="py-1.5 px-2">SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {PRIORITY_AUTHORIZATIONS.map((auth) => (
                    <tr key={auth.id} className="hover:bg-gray-50">
                      <td className="py-1.5 px-2 text-rose-800 font-bold">{auth.id}</td>
                      <td className="py-1.5 px-2 font-bold text-gray-900">{auth.brand}</td>
                      <td className="py-1.5 px-2 text-gray-500">{auth.supplier}</td>
                      <td className="py-1.5 px-2 text-gray-500">{auth.type}</td>
                      <td className="py-1.5 px-2 text-gray-500">{auth.submitted}</td>
                      <td className="py-1.5 px-2 text-gray-500">{auth.expiry}</td>
                      <td className="py-1.5 px-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                          auth.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-100' :
                          auth.status === 'Under Review' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          auth.status === 'Legal Review' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                          'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          {auth.status}
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-gray-500">{auth.sla}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 8 Lower Operational Mini Cards */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="text-[12px] font-bold text-gray-900 mb-2 flex items-center justify-between">
              Supplier Master Overview <Users size={14} className="text-gray-400" />
            </h4>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between"><span className="text-gray-500">Total Suppliers</span><span className="font-semibold text-gray-900">842</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Active</span><span className="font-semibold text-gray-900">768</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Verified</span><span className="font-semibold text-gray-900">612</span></div>
              <div className="flex justify-between"><span className="text-gray-500">New</span><span className="font-semibold text-gray-900">24</span></div>
              <div className="flex justify-between border-t pt-1"><span className="text-gray-500">Avg. Onboarding Time</span><span className="font-semibold text-gray-900">6.2 days</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="text-[12px] font-bold text-gray-900 mb-2 flex items-center justify-between">
              Brand &amp; Supplier Matrix <Layers size={14} className="text-gray-400" />
            </h4>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between"><span className="text-gray-500">Brands</span><span className="font-semibold text-gray-900">186</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Authorized Relationships</span><span className="font-semibold text-gray-900">664</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Active Relationships</span><span className="font-semibold text-gray-900">486</span></div>
              <div className="flex justify-between border-t pt-1"><span className="text-gray-500">Pending Relationships</span><span className="font-semibold text-gray-900">54</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="text-[12px] font-bold text-gray-900 mb-2 flex items-center justify-between">
              Product &amp; Catalogue Coverage <Building2 size={14} className="text-gray-400" />
            </h4>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between"><span className="text-gray-500">Total SKUs Supplied</span><span className="font-semibold text-gray-900">18,420</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Catalogue Coverage</span><span className="font-semibold text-green-600">84%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Categories Covered</span><span className="font-semibold text-gray-900">126 / 148</span></div>
              <div className="flex justify-between border-t pt-1"><span className="text-gray-500">Gaps Identified</span><span className="font-semibold text-gray-900">42</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
            <h4 className="text-[12px] font-bold text-gray-900 mb-2 flex items-center justify-between">
              Supplier Contracts &amp; Agreements <FileText size={14} className="text-gray-400" />
            </h4>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between"><span className="text-gray-500">Active Contracts</span><span className="font-semibold text-gray-900">612</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Renewals Due (30d)</span><span className="font-semibold text-gray-900">26</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Expired Contracts</span><span className="font-semibold text-gray-900">31</span></div>
              <div className="flex justify-between border-t pt-1"><span className="text-gray-500">Avg. Contract Tenure</span><span className="font-semibold text-gray-900">28.6 months</span></div>
            </div>
          </div>
        </div>

        {/* Recent Brands & Suppliers Activity */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[13px] font-bold text-gray-900">Recent Brands &amp; Suppliers Activity</h3>
            <span className="text-[10px] font-semibold text-[#7a0023] cursor-pointer hover:underline">View all</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-semibold">
                <tr>
                  <th className="py-1.5 px-3">Date &amp; Time</th>
                  <th className="py-1.5 px-3">Activity</th>
                  <th className="py-1.5 px-3">Entity Type</th>
                  <th className="py-1.5 px-3">Entity Name</th>
                  <th className="py-1.5 px-3">Reference ID</th>
                  <th className="py-1.5 px-3">Performed By</th>
                  <th className="py-1.5 px-3">Status</th>
                  <th className="py-1.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {RECENT_ACTIVITY.map((act, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 px-3 text-gray-500">{act.date}</td>
                    <td className="py-2 px-3 font-bold text-gray-900">{act.activity}</td>
                    <td className="py-2 px-3 text-gray-500">{act.entityType}</td>
                    <td className="py-2 px-3 text-gray-900 font-medium">{act.entityName}</td>
                    <td className="py-2 px-3 text-rose-800 font-bold">{act.refId}</td>
                    <td className="py-2 px-3 text-gray-500">{act.actor}</td>
                    <td className="py-2 px-3">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                        act.status === 'New' ? 'bg-green-50 text-green-700 border-green-100' :
                        act.status === 'Approved' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        act.status === 'Updated' ? 'bg-sky-50 text-sky-700 border-sky-100' :
                        act.status === 'Alert' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-gray-50 text-gray-700 border-gray-100'
                      }`}>
                        {act.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-500">{act.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Brands &amp; Suppliers Health">
          <HealthScoreGauge 
            score={89} 
            label="Good" 
            statusText="Stable"
            statusColor="#16a34a"
            metrics={[
              { label: 'Verification Coverage', value: '92%', progress: 92 },
              { label: 'Authorization Readiness', value: '88%', progress: 88 },
              { label: 'Contract Compliance', value: '85%', progress: 85 },
              { label: 'Catalogue Coverage', value: '91%', progress: 91 },
              { label: 'Supplier Performance', value: '86%', progress: 86 },
              { label: 'SLA Health', value: '84%', progress: 84 },
              { label: 'Risk Control', value: '82%', progress: 82 },
              { label: 'Audit Readiness', value: '94%', progress: 94 },
            ]}
          />
          <div className="text-right text-[10px] text-[#7a0023] font-semibold cursor-pointer hover:underline mt-1">View health dashboard →</div>
        </RailSection>

        <RailSection title="Priority Alerts" action={<span className="text-[10px] text-[#7a0023] cursor-pointer hover:underline">View all</span>}>
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex justify-between items-center text-[11px]"><span className="flex items-center gap-1.5 text-gray-700"><AlertTriangle size={12} className="text-red-500" /> High-risk supplier application</span><span className="font-bold text-red-500">12</span></div>
            <div className="flex justify-between items-center text-[11px]"><span className="flex items-center gap-1.5 text-gray-700"><AlertTriangle size={12} className="text-amber-500" /> Expiring authorizations (30 days)</span><span className="font-bold text-amber-500">18</span></div>
            <div className="flex justify-between items-center text-[11px]"><span className="flex items-center gap-1.5 text-gray-700"><AlertTriangle size={12} className="text-red-500" /> SLA breach - verification</span><span className="font-bold text-red-500">7</span></div>
            <div className="flex justify-between items-center text-[11px]"><span className="flex items-center gap-1.5 text-gray-700"><AlertTriangle size={12} className="text-red-500" /> Unauthorized brand use detected</span><span className="font-bold text-red-500">5</span></div>
            <div className="flex justify-between items-center text-[11px]"><span className="flex items-center gap-1.5 text-gray-700"><AlertTriangle size={12} className="text-amber-500" /> Missing KYC documents</span><span className="font-bold text-amber-500">14</span></div>
            <div className="flex justify-between items-center text-[11px]"><span className="flex items-center gap-1.5 text-gray-700"><AlertTriangle size={12} className="text-red-500" /> Contract renewal overdue</span><span className="font-bold text-red-500">9</span></div>
          </div>
        </RailSection>

        <RailSection title="Verification Status Summary">
          <HorizontalStatusChart data={VERIFICATION_STATUS_DATA} total={612} />
        </RailSection>

        <RailSection title="Authorization Status Summary">
          <HorizontalStatusChart data={AUTHORIZATION_STATUS_DATA} total={486} />
        </RailSection>

        <RailSection title="Supplier Risk Summary">
          <HorizontalStatusChart data={RISK_SUMMARY_DATA} total={744} />
        </RailSection>

        <RailSection title="Contract Summary">
          <HorizontalStatusChart data={CONTRACT_SUMMARY_DATA} total={612} />
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1.5 mt-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-600">My Reviews</span><span className="font-bold text-gray-900">24</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Pending Verification</span><span className="font-bold text-gray-900">128</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">High-Risk Cases</span><span className="font-bold text-red-500">12</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Expiring Authorizations</span><span className="font-bold text-amber-500">18</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Contract Renewals</span><span className="font-bold text-gray-900">26</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-600">Catalogue Gaps</span><span className="font-bold text-gray-900">42</span></div>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
