'use client';

import React, { useState } from 'react';
import { BrandsSuppliersPageHeader } from '@/components/admin/brands-suppliers/BrandsSuppliersPageHeader';
import { RightInsightRail, RailHealthScore, RailAlertList, RailSection, RailQueueList } from '@/components/admin/brands-suppliers/RightInsightRail';
import { TrendChartCard } from '@/components/admin/brands-suppliers/charts/TrendChartCard';
import { DonutChartCard } from '@/components/admin/brands-suppliers/charts/DonutChartCard';
import { Download, Upload, Boxes, Plus, Search, SlidersHorizontal, AlertTriangle, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function CatalogueCoveragePage() {
  const [activeTab, setActiveTab] = useState('All Gaps');

  const trendData = [
    { name: 'Jul 6', listed: 1200, published: 1100, rejected: 10 },
    { name: 'Jul 13', listed: 1350, published: 1250, rejected: 20 },
    { name: 'Jul 20', listed: 1420, published: 1380, rejected: 15 },
    { name: 'Jul 27', listed: 1510, published: 1480, rejected: 30 },
    { name: 'Aug 3', listed: 1680, published: 1600, rejected: 25 },
  ];

  const trendSeries = [
    { key: 'listed', name: 'Total Listed', color: '#3b82f6', type: 'line' as const },
    { key: 'published', name: 'Ready / Live', color: '#10b981', type: 'line' as const },
    { key: 'rejected', name: 'Blocked / Rejected', color: '#ef4444', type: 'bar' as const },
  ];

  const composition = [
    { name: 'Skincare', value: 3412, percentage: '41.8%', color: '#2563eb' },
    { name: 'Makeup', value: 2108, percentage: '25.8%', color: '#f59e0b' },
    { name: 'Haircare', value: 1205, percentage: '14.8%', color: '#10b981' },
    { name: 'Fragrance', value: 842, percentage: '10.3%', color: '#6366f1' },
    { name: 'Personal Care', value: 612, percentage: '7.5%', color: '#0ea5e9' },
  ];

  const kpis = [
    { label: 'Total Active SKUs', value: '8,179', trend: '+4.2%', color: 'text-gray-900' },
    { label: 'Ready for Publication', value: '7,472', trend: '+5.7%', color: 'text-green-600' },
    { label: 'Missing Assets / Images', value: '322', trend: '-8.0%', color: 'text-orange-600' },
    { label: 'Missing Barcodes / EAN', value: '124', trend: '-12.5%', color: 'text-orange-600' },
    { label: 'Catalogue Quality Score', value: '94.2%', trend: '+1.5%', color: 'text-blue-600' },
    { label: 'Content Gaps Detected', value: '61', trend: '+3.4%', color: 'text-red-600' }
  ];

  return (
    <div className="flex h-full w-full bg-[#f8fafc]">
      <div className="flex-1 overflow-auto p-6 flex flex-col">
        <BrandsSuppliersPageHeader
          title="Supplier Product & Catalogue Coverage"
          description="Monitor catalogue coverage, publication readiness, asset completeness, inventory gaps and product compliance across suppliers."
          breadcrumbs={[
            { label: 'Brands & Suppliers', href: '/admin/brands-suppliers' },
            { label: 'Catalogue Coverage' }
          ]}
          primaryAction={{ label: 'Add Product Listing', onClick: () => {}, icon: Plus }}
          secondaryActions={[
            { label: 'Export Coverage Report', onClick: () => {}, icon: Download },
            { label: 'Import Products Catalog', onClick: () => {}, icon: Upload }
          ]}
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
              title="Catalogue Growth Trend"
              data={trendData}
              series={trendSeries}
              timeRange="Last 30 Days"
            />
          </div>
          <div className="xl:col-span-1">
            <DonutChartCard
              title="Category Distribution"
              data={composition}
              totalLabel="Total SKUs"
              totalValue={8179}
            />
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-4 px-2 overflow-x-auto">
          {['All Gaps', 'Missing Images', 'Barcode Issues', 'Category Mismatch', 'Awaiting Price'].map(tab => (
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
              <input type="text" placeholder="Search catalog SKUs..." className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md outline-none" />
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Supplier</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Brand</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Compliance Status</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <SlidersHorizontal size={14} /> More Filters
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-sm">Category Coverage Gaps</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-medium">
                <tr>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3 text-center">Active Brands</th>
                  <th className="px-5 py-3 text-center">Missing Variants</th>
                  <th className="px-5 py-3 text-center">Average Fill Rate</th>
                  <th className="px-5 py-3 text-center">Priority</th>
                  <th className="px-5 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">Skincare &gt; Serums</td>
                  <td className="px-5 py-3 text-center">14 Brands</td>
                  <td className="px-5 py-3 text-center text-red-600 font-semibold">12 Variants Missing</td>
                  <td className="px-5 py-3 text-center font-bold">91.4%</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded text-[10px]">High</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[#7a122e] hover:underline font-semibold">Request Linkage</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">Makeup &gt; Foundations</td>
                  <td className="px-5 py-3 text-center">8 Brands</td>
                  <td className="px-5 py-3 text-center text-orange-600 font-medium">32 Variants Missing</td>
                  <td className="px-5 py-3 text-center font-bold">87.7%</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-100 rounded text-[10px]">Medium</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[#7a122e] hover:underline font-semibold">Request Linkage</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">Haircare &gt; Conditioners</td>
                  <td className="px-5 py-3 text-center">12 Brands</td>
                  <td className="px-5 py-3 text-center text-gray-500">8 Variants Missing</td>
                  <td className="px-5 py-3 text-center font-bold">91.4%</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded text-[10px]">Low</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button className="text-[#7a122e] hover:underline font-semibold">Request Linkage</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <RightInsightRail>
        <RailSection title="Catalogue Health">
          <RailHealthScore 
            score={91} 
            label="Good" 
            status="Stable" 
            metrics={[
              { label: 'Category Match Rate', value: '98.5%' },
              { label: 'Asset Completeness', value: '96.1%' },
              { label: 'Barcode Coverage', value: '98.4%' },
              { label: 'Brand Alignment', value: '92.7%' },
            ]} 
          />
        </RailSection>

        <RailSection title="Priority Gaps" action={{ label: 'View all' }}>
          <RailAlertList items={[
            { label: 'Unlinked product variant (Aurora Skin)', count: 12, critical: true },
            { label: 'Missing barcode SKU (Ceylon Glow)', count: 8, critical: true },
            { label: 'Unapproved brand assets detected', count: 4, critical: false },
            { label: 'Price verification pending over 3 days', count: 7, critical: true },
          ]} />
        </RailSection>

        <RailSection title="Active Approval Queues">
          <RailQueueList items={[
            { label: 'Awaiting Brand Authorization', count: 12, icon: <FileText size={15} /> },
            { label: 'Asset Completeness Verification', count: 24, icon: <Boxes size={15} /> },
            { label: 'SLA Breach Review', count: 3, icon: <AlertCircle size={15} /> },
          ]} />
        </RailSection>
      </RightInsightRail>
    </div>
  );
}
