"use client";

import React, { useState, useEffect } from 'react';
import { Layers, RefreshCw } from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

import { ChartCard } from '@/components/admin/shared/ChartCard';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Domain', value: 'Brands & Suppliers' },
];

export default function SupplierImportExportAuditPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getImportExportAuditDashboard();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const jobs = data?.jobs?.data || [];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Import, Export &amp; Audit</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Data Operations &amp; Audit Log</h1>
            <p className="text-xs text-gray-500 mt-1">Execute bulk data imports, schedule data exports, review mapping validations, and inspect system audit events.</p>
          </div>
          <button onClick={fetchDashboard} className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600">
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync Live Data</span>
          </button>
        </div>

        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced={data?.lastSynced || 'Just now'} accessNote="Access limited to assigned business context" />

        {/* DATA OPS ANALYTICS CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
          <ChartCard title="Supplier Data Operations Trend (30 Days)" subtitle="Historical bulk imports, exports &amp; audit events" loading={loading}>
            <TrendChart data={data?.trend || []} colors={['#2563eb', '#16a34a', '#dc2626']} />
          </ChartCard>

          <ChartCard title="Job Status Distribution" subtitle="Distribution by execution status" loading={loading}>
            <DonutDistributionChart data={data?.donut || []} totalLabel="Jobs" totalValue={(data?.donut || []).reduce((a: any, c: any) => a + (c.value || 0), 0).toLocaleString()} />
          </ChartCard>
        </div>

        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-4">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Import &amp; Export Jobs ({jobs.length})</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase">
                <tr>
                  <th className="px-3 py-2">Job Code</th>
                  <th className="px-3 py-2">Title / Type</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Records Processed</th>
                  <th className="px-3 py-2">Date Executed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-gray-400">
                      No data operations jobs found in database.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job: any) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-mono font-bold text-gray-900">{job.job_code}</td>
                      <td className="px-3 py-2">
                        <div className="font-bold text-gray-900">{job.title}</div>
                        <div className="text-gray-400 text-[10px] capitalize">{job.job_type}</div>
                      </td>
                      <td className="px-3 py-2 font-semibold">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-50 text-green-700">{job.status}</span>
                      </td>
                      <td className="px-3 py-2 text-gray-600">{job.processed_records} / {job.total_records}</td>
                      <td className="px-3 py-2 text-gray-400">{job.created_at || 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <RightIntelligenceRail>
        <RailSection title="Data Ops Health">
          <HealthScoreGauge score={100} label="Operational" statusText="Active" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
