'use client';

import React, { useState } from 'react';
import { BrandsSuppliersPageHeader } from '@/components/admin/brands-suppliers/BrandsSuppliersPageHeader';
import { RightInsightRail, RailHealthScore, RailAlertList, RailSection, RailQueueList } from '@/components/admin/brands-suppliers/RightInsightRail';
import { TrendChartCard } from '@/components/admin/brands-suppliers/charts/TrendChartCard';
import { DonutChartCard } from '@/components/admin/brands-suppliers/charts/DonutChartCard';
import { Download, SlidersHorizontal, Search, Star, Clock, AlertTriangle, AlertCircle, RefreshCw, Activity } from 'lucide-react';
import Link from 'next/link';

export default function PerformancePage() {
  const [activeTab, setActiveTab] = useState('All Suppliers');

  const trendData = [
    { name: 'Jul 6', target: 95, actual: 92, breaches: 15 },
    { name: 'Jul 13', target: 95, actual: 93, breaches: 12 },
    { name: 'Jul 20', target: 95, actual: 94.6, breaches: 8 },
    { name: 'Jul 27', target: 95, actual: 93.8, breaches: 10 },
    { name: 'Aug 3', target: 95, actual: 95.1, breaches: 6 },
  ];

  const trendSeries = [
    { key: 'target', name: 'SLA Target', color: '#9ca3af', type: 'line' as const },
    { key: 'actual', name: 'Actual SLA Compliance', color: '#10b981', type: 'line' as const },
    { key: 'breaches', name: 'SLA Breaches', color: '#ef4444', type: 'bar' as const },
  ];

  const composition = [
    { name: 'On-Time Dispatch', value: 712, percentage: '84.6%', color: '#10b981' },
    { name: 'Delayed Dispatch', value: 98, percentage: '11.6%', color: '#f59e0b' },
    { name: 'Order Cancellations', value: 20, percentage: '2.4%', color: '#ef4444' },
    { name: 'Return Disputes', value: 12, percentage: '1.4%', color: '#dc2626' },
  ];

  const kpis = [
    { label: 'Avg SLA Compliance', value: '94.6%', trend: '+1.2%', color: 'text-green-600' },
    { label: 'Order Fulfilment Accuracy', value: '98.2%', trend: '+0.8%', color: 'text-green-600' },
    { label: 'Return Defect Rate', value: '1.1%', trend: '-0.3%', color: 'text-green-600' },
    { label: 'Total SLA Breaches', value: '12', trend: '-4', color: 'text-red-600' },
    { label: 'Avg Dispatch Time', value: '4.8h', trend: '-0.5h', color: 'text-blue-600' },
    { label: 'Average Customer Rating', value: '4.5/5', trend: '+0.1', color: 'text-gray-900' }
  ];

  return (
    <div className="flex h-full w-full bg-[#f8fafc]">
      <div className="flex-1 overflow-auto p-6 flex flex-col">
        <BrandsSuppliersPageHeader
          title="Supplier Performance & SLA"
          description="Track supplier performance metrics, audit SLA compliance, monitor dispatch delays and analyze order fulfillment logs."
          breadcrumbs={[
            { label: 'Brands & Suppliers', href: '/admin/brands-suppliers' },
            { label: 'Performance & SLA' }
          ]}
          primaryAction={{ label: 'Generate SLA Report', onClick: () => {}, icon: Download }}
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
              title="SLA Compliance & Breaches"
              data={trendData}
              series={trendSeries}
              timeRange="Last 30 Days"
            />
          </div>
          <div className="xl:col-span-1">
            <DonutChartCard
              title="SLA Distribution Overview"
              data={composition}
              totalLabel="Total Actions"
              totalValue={842}
            />
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-4 px-2 overflow-x-auto">
          {['All Suppliers', 'SLA Breached', 'Under Performing', 'Top Performers', 'SLA Escalations'].map(tab => (
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
              <input type="text" placeholder="Search supplier performance..." className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md outline-none" />
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Risk Group</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Tier</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <SlidersHorizontal size={14} /> More Filters
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-sm">SLA Compliance Leaderboard</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-medium">
                <tr>
                  <th className="px-5 py-3">Supplier</th>
                  <th className="px-5 py-3 text-center">Average Rating</th>
                  <th className="px-5 py-3 text-center">SLA Compliance</th>
                  <th className="px-5 py-3 text-center">Dispatch Accuracy</th>
                  <th className="px-5 py-3 text-center">Rating Class</th>
                  <th className="px-5 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">Serene Botanics Lanka</td>
                  <td className="px-5 py-3 text-center font-bold text-gray-700">4.8 / 5.0</td>
                  <td className="px-5 py-3 text-center text-green-700 font-semibold">98.5%</td>
                  <td className="px-5 py-3 text-center">99.1%</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded text-[10px]">Excellent</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[#7a122e] hover:underline font-semibold">View Detail</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">Ceylon Glow Exports</td>
                  <td className="px-5 py-3 text-center font-bold text-gray-700">3.9 / 5.0</td>
                  <td className="px-5 py-3 text-center text-orange-600 font-semibold">88.2%</td>
                  <td className="px-5 py-3 text-center">90.5%</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-100 rounded text-[10px]">Needs Attention</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[#7a122e] hover:underline font-semibold">View Detail</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">Ceylon Botanicals</td>
                  <td className="px-5 py-3 text-center font-bold text-gray-700">2.5 / 5.0</td>
                  <td className="px-5 py-3 text-center text-red-600 font-semibold">64.5%</td>
                  <td className="px-5 py-3 text-center">70.2%</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded text-[10px]">Critical</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[#7a122e] hover:underline font-semibold">Restrict Supplier</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <RightInsightRail>
        <RailSection title="Performance Health">
          <RailHealthScore 
            score={86} 
            label="Good" 
            status="Stable" 
            metrics={[
              { label: 'Dispatch Accuracy', value: '94.2%' },
              { label: 'SLA Target Rate', value: '93.8%' },
              { label: 'Return Defect SLA', value: '98.9%' },
              { label: 'Incident Resolution', value: '91.2%' },
            ]} 
          />
        </RailSection>

        <RailSection title="SLA Breaches" action={{ label: 'View all' }}>
          <RailAlertList items={[
            { label: 'Incident delay case VER-321', count: 1, critical: true },
            { label: 'Return processing delay overdue', count: 3, critical: true },
            { label: 'Order Acceptance SLA breach', count: 12, critical: false },
            { label: 'Escalated penalty dispute', count: 2, critical: true },
          ]} />
        </RailSection>

        <RailSection title="Performance Actions">
          <div className="flex flex-col gap-2">
            <button className="w-full py-2 bg-[#7a122e] text-white rounded text-sm font-medium hover:bg-[#5a0d22] transition-colors">
              Issue SLA Violation Warning
            </button>
            <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
              Request Performance Recovery Plan
            </button>
          </div>
        </RailSection>
      </RightInsightRail>
    </div>
  );
}
