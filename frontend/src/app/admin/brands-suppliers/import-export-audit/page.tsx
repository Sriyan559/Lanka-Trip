'use client';

import React, { useState } from 'react';
import { BrandsSuppliersPageHeader } from '@/components/admin/brands-suppliers/BrandsSuppliersPageHeader';
import { RightInsightRail, RailHealthScore, RailAlertList, RailSection, RailQueueList } from '@/components/admin/brands-suppliers/RightInsightRail';
import { TrendChartCard } from '@/components/admin/brands-suppliers/charts/TrendChartCard';
import { DonutChartCard } from '@/components/admin/brands-suppliers/charts/DonutChartCard';
import { Download, Upload, SlidersHorizontal, Search, Settings, FileSpreadsheet, AlertTriangle, AlertCircle, Play, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImportExportAuditPage() {
  const [activeTab, setActiveTab] = useState('All Jobs');
  const [executingJobId, setExecutingJobId] = useState<string | null>(null);

  const trendData = [
    { name: 'Jul 6', imports: 42, exports: 30, failures: 1 },
    { name: 'Jul 13', imports: 48, exports: 35, failures: 2 },
    { name: 'Jul 20', imports: 55, exports: 40, failures: 0 },
    { name: 'Jul 27', imports: 60, exports: 48, failures: 3 },
    { name: 'Aug 3', imports: 68, exports: 51, failures: 1 },
  ];

  const trendSeries = [
    { key: 'imports', name: 'Imports Run', color: '#3b82f6', type: 'line' as const },
    { key: 'exports', name: 'Exports Run', color: '#10b981', type: 'line' as const },
    { key: 'failures', name: 'Failed Jobs', color: '#ef4444', type: 'bar' as const },
  ];

  const composition = [
    { name: 'Product Catalog', value: 142, percentage: '58.7%', color: '#2563eb' },
    { name: 'Brand Authorizations', value: 54, percentage: '22.3%', color: '#f59e0b' },
    { name: 'Verification KYC', value: 28, percentage: '11.6%', color: '#10b981' },
    { name: 'Commercial Contracts', value: 18, percentage: '7.4%', color: '#8b5cf6' },
  ];

  const kpis = [
    { label: 'Imports Run', value: '242', trend: '+12', color: 'text-gray-900' },
    { label: 'Exports Run', value: '184', trend: '+8', color: 'text-gray-900' },
    { label: 'Average Mapping Accuracy', value: '99.4%', trend: '+0.2%', color: 'text-green-600' },
    { label: 'Active Templates', value: '12', trend: 'Stable', color: 'text-blue-600' },
    { label: 'Queue Length', value: '3', trend: '-1', color: 'text-green-600' },
    { label: 'Audit Trail Records', value: '1,424', trend: '+114', color: 'text-gray-900' }
  ];

  const handleExecuteImport = (jobId: string) => {
    // Sensitive Action Confirmation check
    if (!confirm(`Are you sure you want to execute import job ${jobId}? This will update live database records.`)) {
      return;
    }
    
    setExecutingJobId(jobId);
    toast.loading(`Processing mapping and duplicate checks for ${jobId}...`, { id: 'import-job' });

    setTimeout(() => {
      setExecutingJobId(null);
      toast.success(`Import Job ${jobId} successfully executed! 142 records updated, 0 duplicates.`, { id: 'import-job' });
    }, 2000);
  };

  return (
    <div className="flex h-full w-full bg-[#f8fafc]">
      <div className="flex-1 overflow-auto p-6 flex flex-col">
        <BrandsSuppliersPageHeader
          title="Supplier Import, Export & Audit"
          description="Schedule automated data migrations, configure CSV mapping templates, resolve duplicate entity matches and review system operations logs."
          breadcrumbs={[
            { label: 'Brands & Suppliers', href: '/admin/brands-suppliers' },
            { label: 'Import, Export & Audit' }
          ]}
          primaryAction={{ label: 'Upload Data File', onClick: () => {}, icon: Upload }}
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
              title="Import / Export Activity Trend"
              data={trendData}
              series={trendSeries}
              timeRange="Last 30 Days"
            />
          </div>
          <div className="xl:col-span-1">
            <DonutChartCard
              title="Job Type Distribution"
              data={composition}
              totalLabel="Total Jobs"
              totalValue={242}
            />
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-4 px-2 overflow-x-auto">
          {['All Jobs', 'Imports', 'Exports', 'Failed Jobs', 'Mapping Templates'].map(tab => (
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
              <input type="text" placeholder="Search data jobs..." className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md outline-none" />
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Format</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>Job Status</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <SlidersHorizontal size={14} /> More Filters
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-sm">Import / Export Operations Queue</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-medium">
                <tr>
                  <th className="px-5 py-3">Job ID</th>
                  <th className="px-5 py-3 text-center">Type</th>
                  <th className="px-5 py-3">Entity Type</th>
                  <th className="px-5 py-3">File Name</th>
                  <th className="px-5 py-3 text-center">Success Rate</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">JOB-2026-901</td>
                  <td className="px-5 py-3 text-center font-bold text-blue-700">IMPORT</td>
                  <td className="px-5 py-3 text-gray-600">Product Catalogue</td>
                  <td className="px-5 py-3 text-gray-500 font-medium">luxe_skincare_v2_import.csv</td>
                  <td className="px-5 py-3 text-center font-bold text-green-700">99.8%</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded text-[10px] font-semibold">Ready</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button 
                      onClick={() => handleExecuteImport('JOB-2026-901')}
                      disabled={executingJobId === 'JOB-2026-901'}
                      className="text-[#7a122e] hover:underline font-semibold disabled:opacity-50"
                    >
                      Execute Import
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">JOB-2026-902</td>
                  <td className="px-5 py-3 text-center font-bold text-green-700">EXPORT</td>
                  <td className="px-5 py-3 text-gray-600">Corporate Directory</td>
                  <td className="px-5 py-3 text-gray-500 font-medium">brand_suppliers_directory_export.csv</td>
                  <td className="px-5 py-3 text-center font-bold text-green-700">100%</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px] font-semibold">Completed</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <a href="#" className="text-[#7a122e] hover:underline font-semibold flex items-center justify-center gap-1">
                      <Download size={13} /> Download File
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">JOB-2026-903</td>
                  <td className="px-5 py-3 text-center font-bold text-blue-700">IMPORT</td>
                  <td className="px-5 py-3 text-gray-600">Brand Authorizations</td>
                  <td className="px-5 py-3 text-gray-500 font-medium">innisfree_maldives_auth.csv</td>
                  <td className="px-5 py-3 text-center font-bold text-red-600">64.5%</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded text-[10px] font-semibold">Failed</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button onClick={() => alert('Opening error matching logs...')} className="text-[#7a122e] hover:underline font-semibold">Review Conflicts</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <RightInsightRail>
        <RailSection title="Operations Health">
          <RailHealthScore 
            score={94} 
            label="Optimal" 
            status="Stable" 
            metrics={[
              { label: 'Import Success Rate', value: '99.2%' },
              { label: 'Mapping Quality', value: '99.4%' },
              { label: 'Duplicate Resolves', value: '100%' },
              { label: 'Daily Data Volume', value: '12.4 MB' },
            ]} 
          />
        </RailSection>

        <RailSection title="Mapping Templates" action={{ label: 'Manage' }}>
          <div className="bg-white border border-gray-200 rounded p-3 flex flex-col gap-2.5 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="font-semibold text-gray-800">LVMH Standard CSV v2</span>
              <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100 font-medium">Active</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="font-semibold text-gray-800">Cosmax Catalog JSON</span>
              <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100 font-medium">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Boutique XML Template</span>
              <span className="text-[10px] bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded border border-orange-100 font-medium">Awaiting Update</span>
            </div>
          </div>
        </RailSection>

        <RailSection title="Recent Audit Logs">
          <div className="flex flex-col gap-2 text-[11px] text-gray-500">
            <div className="p-2 bg-gray-50 border border-gray-100 rounded flex flex-col">
              <span className="font-semibold text-gray-800">Import Job JOB-901 Executed</span>
              <span>04 Aug, 12:57 AM • System Admin</span>
            </div>
            <div className="p-2 bg-gray-50 border border-gray-100 rounded flex flex-col">
              <span className="font-semibold text-gray-800">Duplicate Check: Luxe Distributors</span>
              <span>03 Aug, 04:30 PM • Compliance Eng</span>
            </div>
          </div>
        </RailSection>
      </RightInsightRail>
    </div>
  );
}
