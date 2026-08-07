'use client';

import React, { useState } from 'react';
import { BrandsSuppliersPageHeader } from '@/components/admin/brands-suppliers/BrandsSuppliersPageHeader';
import { RightInsightRail, RailHealthScore, RailAlertList, RailSection, RailQueueList } from '@/components/admin/brands-suppliers/RightInsightRail';
import { TrendChartCard } from '@/components/admin/brands-suppliers/charts/TrendChartCard';
import { DonutChartCard } from '@/components/admin/brands-suppliers/charts/DonutChartCard';
import { Download, SlidersHorizontal, Search, ShieldCheck, AlertTriangle, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import Link from 'next/link';

export default function RiskCompliancePage() {
  const [activeTab, setActiveTab] = useState('All Domains');

  const trendData = [
    { name: 'Jul 6', audit: 12, warnings: 5, resolved: 3 },
    { name: 'Jul 13', audit: 15, warnings: 6, resolved: 4 },
    { name: 'Jul 20', audit: 14, warnings: 8, resolved: 5 },
    { name: 'Jul 27', audit: 16, warnings: 7, resolved: 6 },
    { name: 'Aug 3', audit: 18, warnings: 8, resolved: 7 },
  ];

  const trendSeries = [
    { key: 'audit', name: 'Compliance Audits', color: '#3b82f6', type: 'line' as const },
    { key: 'warnings', name: 'Active Warnings', color: '#f59e0b', type: 'line' as const },
    { key: 'resolved', name: 'Cases Resolved', color: '#10b981', type: 'bar' as const },
  ];

  const composition = [
    { name: 'Low Risk', value: 512, percentage: '61.0%', color: '#10b981' },
    { name: 'Medium Risk', value: 248, percentage: '29.5%', color: '#f59e0b' },
    { name: 'High Risk', value: 82, percentage: '9.5%', color: '#ef4444' },
  ];

  const kpis = [
    { label: 'Overall Compliance Rate', value: '92.4%', trend: '+1.0%', color: 'text-green-600' },
    { label: 'Audits Scheduled', value: '14', trend: '+2', color: 'text-blue-600' },
    { label: 'Active Warnings Issued', value: '8', trend: '+1', color: 'text-orange-600' },
    { label: 'Open Compliance Cases', value: '2', trend: '-1', color: 'text-green-600' },
    { label: 'Sanctions Checked Rate', value: '100%', trend: 'Stable', color: 'text-green-600' },
    { label: 'High Risk Partners', value: '12', trend: '+2', color: 'text-red-600' }
  ];

  return (
    <div className="flex h-full w-full bg-[#f8fafc]">
      <div className="flex-1 overflow-auto p-6 flex flex-col">
        <BrandsSuppliersPageHeader
          title="Supplier Risk & Compliance"
          description="Evaluate corporate risk parameters, monitor anti-money laundering compliance, analyze PEP screening results and manage entity remediation workflows."
          breadcrumbs={[
            { label: 'Brands & Suppliers', href: '/admin/brands-suppliers' },
            { label: 'Risk & Compliance' }
          ]}
          primaryAction={{ label: 'Schedule Corporate Audit', onClick: () => {}, icon: ShieldCheck }}
        />

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] text-gray-400 font-semibold uppercase truncate">{kpi.label}</span>
              <div className="flex items-end gap-2 mt-3">
                <span className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</span>
                <span className="text-[10px] text-green-500 font-medium">{kpi.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2">
            <TrendChartCard
              title="Audit & Compliance Risk Trend"
              data={trendData}
              series={trendSeries}
              timeRange="Last 30 Days"
            />
          </div>
          <div className="xl:col-span-1">
            <DonutChartCard
              title="Supplier Risk Segments"
              data={composition}
              totalLabel="Total Partners"
              totalValue={842}
            />
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-4 px-2 overflow-x-auto">
          {['All Domains', 'KYC & Legal', 'Tax Audits', 'Safety Licences', 'AML / Sanctions', 'Remediation Plans'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-[#7a122e] text-[#7a122e]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search compliance logs..." className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md outline-none" />
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Risk Threshold</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Status</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <SlidersHorizontal size={14} /> More Filters
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-sm">Risk Categories & Assessments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-medium">
                <tr>
                  <th className="px-5 py-3">Compliance Domain</th>
                  <th className="px-5 py-3 text-center">Issues Detected</th>
                  <th className="px-5 py-3 text-center">Risk Level</th>
                  <th className="px-5 py-3 text-center">Assessment Status</th>
                  <th className="px-5 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">Legal & Commercial</td>
                  <td className="px-5 py-3 text-center font-bold">8</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded text-[10px] font-semibold">Low</span>
                  </td>
                  <td className="px-5 py-3 text-center text-gray-700 font-medium">Stable</td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[#7a122e] hover:underline font-semibold">Audit Domain</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">Tax & Financial Audit</td>
                  <td className="px-5 py-3 text-center font-bold">14</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-100 rounded text-[10px] font-semibold">Medium</span>
                  </td>
                  <td className="px-5 py-3 text-center text-gray-700 font-medium">Audit Scheduled</td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[#7a122e] hover:underline font-semibold">Audit Domain</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">Product Safety & Licences</td>
                  <td className="px-5 py-3 text-center font-bold">3</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded text-[10px] font-semibold">High</span>
                  </td>
                  <td className="px-5 py-3 text-center text-gray-700 font-medium">Action Required</td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[#7a122e] hover:underline font-semibold">View Issues</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <RightInsightRail>
        <RailSection title="Compliance Health">
          <RailHealthScore 
            score={82} 
            label="Attention" 
            status="Needs Attention" 
            metrics={[
              { label: 'AML Scans Done', value: '100%' },
              { label: 'PEP Match Clear', value: '98.2%' },
              { label: 'Financial Security', value: '92.4%' },
              { label: 'Licence Validation', value: '88.5%' },
            ]} 
          />
        </RailSection>

        <RailSection title="Security Alerts" action={{ label: 'View all' }}>
          <RailAlertList items={[
            { label: 'Sanctions screening match (High)', count: 2, critical: true },
            { label: 'Tax audit documentation overdue', count: 14, critical: true },
            { label: 'Safety license expiry (30 days)', count: 3, critical: false },
          ]} />
        </RailSection>

        <RailSection title="Risk Interventions">
          <div className="flex flex-col gap-2">
            <button className="w-full py-2 bg-[#7a122e] text-white rounded text-sm font-medium hover:bg-[#5a0d22] transition-colors">
              Execute PEP Scan override
            </button>
            <button className="w-full py-2 bg-white border border-red-300 text-red-600 rounded text-sm font-medium hover:bg-red-50 transition-colors">
              Initiate Partner Demotion / Hold
            </button>
          </div>
        </RailSection>
      </RightInsightRail>
    </div>
  );
}
