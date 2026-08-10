"use client";

import React, { useState, useEffect } from 'react';
import { Layers, RefreshCw } from 'lucide-react';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { verificationComplianceApi } from '@/lib/api/verificationCompliance';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Domain', value: 'Verification & Compliance' },
];

export default function ComplianceImportExportAuditPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await verificationComplianceApi.getImportExportAuditDashboard();
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
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Import, Export &amp; Audit</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Compliance Data Operations &amp; Audit Log</h1>
            <p className="text-xs text-gray-500 mt-1">Execute compliance data imports, export regulatory reports, and inspect audit logs.</p>
          </div>
          <button onClick={fetchDashboard} className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600">
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync Live Data</span>
          </button>
        </div>

        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced={data?.lastSynced || 'Just now'} accessNote="Access limited to assigned business context" />

        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-4">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Compliance Jobs ({jobs.length})</h3>
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
                      No compliance data operations jobs found in database.
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
