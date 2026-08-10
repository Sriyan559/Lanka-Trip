"use client";

import React, { useState, useEffect } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock, RefreshCw, MoreVertical } from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { verificationComplianceApi } from '@/lib/api/verificationCompliance';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Domain', value: 'Product Recalls & Incidents' },
];

export default function RecallCommandCenterPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await verificationComplianceApi.getRecallsDashboard();
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

  const kpis = data?.kpis || [];
  const recallsList = data?.recalls?.data || [];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Product Recalls</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Recall &amp; Safety Incident Command Center</h1>
            <p className="text-xs text-gray-500 mt-1">Initiate and monitor product recalls, quarantine affected inventory units, and issue regulatory notifications.</p>
          </div>
          <button onClick={fetchDashboard} className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600">
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync Live Data</span>
          </button>
        </div>

        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced={data?.lastSynced || 'Just now'} accessNote="Access limited to assigned business context" />

        <DashboardGrid>
          {kpis.map((kpi: any) => (
            <KpiCard key={kpi.index} {...kpi} />
          ))}
        </DashboardGrid>

        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col mt-4">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Active Recall Campaigns ({recallsList.length})</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[900px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase">
                <tr>
                  <th className="px-3 py-2">Recall Code</th>
                  <th className="px-3 py-2">Campaign Title</th>
                  <th className="px-3 py-2">Class / Severity</th>
                  <th className="px-3 py-2">Quarantined Units</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recallsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-gray-400">
                      No active product recall campaigns found in database.
                    </td>
                  </tr>
                ) : (
                  recallsList.map((row: any) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-mono font-bold text-gray-900">{row.recall_code}</td>
                      <td className="px-3 py-2 font-bold text-gray-900">{row.title}</td>
                      <td className="px-3 py-2 text-gray-600 uppercase">{row.recall_class} / {row.severity}</td>
                      <td className="px-3 py-2 font-bold text-red-600">{row.quarantined_units_count}</td>
                      <td className="px-3 py-2 font-semibold">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-50 text-red-700">{row.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <RightIntelligenceRail>
        <RailSection title="Incident Response Health">
          <HealthScoreGauge score={100} label="Clear" statusText="No Active Critical Recalls" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
