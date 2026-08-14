'use client';

import React from 'react';
import { ReportsAuditFullData, AuditRecord } from '@/lib/administration/reports-audit/reports-audit.types';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { SelectedAuditRecordPanel } from '../SelectedAuditRecordPanel';
import { BeforeAfterComparison } from '@/components/shared/BeforeAfterComparison/BeforeAfterComparison';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { ReusableBarChart } from '@/components/admin/logistics/charts/ReusableBarChart';
import { OperatingHealthHeatmap } from '@/components/shared/Chart/OperatingHealthHeatmap';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { CheckCircle2 } from 'lucide-react';

interface AuditOverviewTabProps {
  data: ReportsAuditFullData;
  selectedRecord: AuditRecord;
  onSelectRecord: (record: AuditRecord) => void;
  onNavigateTab: (tab: string) => void;
}

export function AuditOverviewTab({
  data,
  selectedRecord,
  onSelectRecord,
  onNavigateTab,
}: AuditOverviewTabProps) {
  // Columns for Main Audit & Change Registry
  const auditRegistryColumns: ColumnDef<AuditRecord>[] = [
    {
      key: 'auditId',
      header: 'Audit ID',
      cell: (row) => (
        <span
          className={`font-mono text-[10px] font-bold cursor-pointer hover:underline ${
            selectedRecord?.auditId === row.auditId ? 'text-[#741d35]' : 'text-gray-800'
          }`}
          onClick={() => onSelectRecord(row)}
        >
          {row.auditId}
        </span>
      ),
    },
    { key: 'timestamp', header: 'Timestamp (UTC)' },
    { key: 'actor', header: 'Actor', cell: (row) => <span className="text-[#741d35] font-semibold">{row.actor}</span> },
    { key: 'actorType', header: 'Actor Type' },
    { key: 'changeArea', header: 'Change Area' },
    { key: 'operation', header: 'Operation' },
    { key: 'entity', header: 'Entity' },
    { key: 'result', header: 'Result', cell: (row) => <StatusBadge status={row.result} size="xs" /> },
    { key: 'integrity', header: 'Integrity', cell: (row) => <StatusBadge status={row.integrity} size="xs" /> },
    { key: 'risk', header: 'Risk', cell: (row) => <StatusBadge status={row.risk} size="xs" /> },
  ];

  // Columns for Change Summary by Area
  const changeSummaryColumns: ColumnDef<any>[] = [
    { key: 'changeArea', header: 'Change Area', cell: (row) => <span className="font-bold text-gray-800">{row.changeArea}</span> },
    { key: 'changes', header: 'Changes', align: 'right' },
    { key: 'success', header: 'Success', align: 'right', cell: (row) => <span className="text-emerald-700 font-semibold">{row.success}</span> },
    { key: 'failed', header: 'Failed', align: 'right', cell: (row) => <span className="text-rose-700 font-semibold">{row.failed}</span> },
    { key: 'partial', header: 'Partial', align: 'right' },
    { key: 'cancelled', header: 'Cancelled', align: 'right' },
    { key: 'successRate', header: 'Success Rate', align: 'right', cell: (row) => <span className="font-bold text-emerald-700">{row.successRate}</span> },
    { key: 'highRisk', header: 'High Risk', align: 'right', cell: (row) => <span className="font-bold text-rose-700">{row.highRisk}</span> },
  ];

  // Columns for High Risk Changes
  const highRiskColumns: ColumnDef<any>[] = [
    { key: 'auditId', header: 'Audit ID', cell: (row) => <span className="font-mono text-[10px] font-bold text-[#741d35]">{row.auditId}</span> },
    { key: 'changeArea', header: 'Change Area' },
    { key: 'entity', header: 'Entity' },
    { key: 'operation', header: 'Operation' },
    { key: 'actor', header: 'Actor', cell: (row) => <span className="text-gray-700 font-medium">{row.actor}</span> },
    { key: 'risk', header: 'Risk', cell: (row) => <StatusBadge status={row.risk} size="xs" /> },
    { key: 'result', header: 'Result', cell: (row) => <StatusBadge status={row.result} size="xs" /> },
    { key: 'time', header: 'Time (UTC)' },
  ];

  // Columns for Approval Trace
  const approvalTraceColumns: ColumnDef<any>[] = [
    { key: 'step', header: 'Step', cell: (row) => <span className="font-bold text-gray-800">{row.step}</span> },
    { key: 'approver', header: 'Approver', cell: (row) => <span className="text-gray-700 font-medium">{row.approver}</span> },
    { key: 'decision', header: 'Decision', cell: (row) => row.decision !== '—' ? <StatusBadge status={row.decision} size="xs" /> : <span className="text-gray-400">—</span> },
    { key: 'time', header: 'Time (UTC)' },
  ];

  // Columns for Report Catalogue
  const reportCatalogueColumns: ColumnDef<any>[] = [
    { key: 'reportName', header: 'Report Name', cell: (row) => <span className="font-bold text-gray-800">{row.reportName}</span> },
    { key: 'category', header: 'Category' },
    { key: 'frequency', header: 'Frequency' },
    { key: 'lastRun', header: 'Last Run' },
    { key: 'status', header: 'Status', cell: (row) => <StatusBadge status={row.status} size="xs" /> },
  ];

  // Columns for Scheduled Reports
  const scheduledReportsColumns: ColumnDef<any>[] = [
    { key: 'report', header: 'Report', cell: (row) => <span className="font-bold text-gray-800">{row.report}</span> },
    { key: 'frequency', header: 'Frequency' },
    { key: 'nextRun', header: 'Next Run (UTC)' },
    { key: 'owner', header: 'Owner' },
    { key: 'status', header: 'Status', cell: (row) => <StatusBadge status={row.status} size="xs" /> },
  ];

  // Columns for Export Jobs
  const exportJobsColumns: ColumnDef<any>[] = [
    { key: 'exportName', header: 'Export Name', cell: (row) => <span className="font-bold text-gray-800">{row.exportName}</span> },
    { key: 'status', header: 'Status', cell: (row) => <StatusBadge status={row.status} size="xs" /> },
    { key: 'requested', header: 'Requested' },
    { key: 'completed', header: 'Completed' },
    { key: 'size', header: 'Size' },
    { key: 'requestedBy', header: 'Requested By' },
  ];

  // Columns for Sensitive Export Review
  const sensitiveExportsColumns: ColumnDef<any>[] = [
    { key: 'exportName', header: 'Export Name', cell: (row) => <span className="font-bold text-gray-800">{row.exportName}</span> },
    { key: 'status', header: 'Status', cell: (row) => <StatusBadge status={row.status} size="xs" /> },
    { key: 'risk', header: 'Risk', cell: (row) => <StatusBadge status={row.risk} size="xs" /> },
    { key: 'reviewer', header: 'Reviewer' },
    { key: 'due', header: 'Due (UTC)' },
  ];

  // Columns for Failed Exports
  const failedExportsColumns: ColumnDef<any>[] = [
    { key: 'exportName', header: 'Export Name', cell: (row) => <span className="font-bold text-gray-800">{row.exportName}</span> },
    { key: 'reason', header: 'Reason', cell: (row) => <span className="text-rose-700 font-semibold">{row.reason}</span> },
    { key: 'failed', header: 'Failed (UTC)' },
  ];

  // Columns for Evidence Activity
  const evidenceActivityColumns: ColumnDef<any>[] = [
    { key: 'timestamp', header: 'Timestamp (UTC)' },
    { key: 'activity', header: 'Activity', cell: (row) => <span className="font-bold text-gray-800">{row.activity}</span> },
    { key: 'entity', header: 'Entity' },
    { key: 'actor', header: 'Actor' },
    { key: 'size', header: 'Size' },
    { key: 'requestedBy', header: 'Requested By' },
  ];

  // Columns for Recent Audit Activity
  const recentAuditActivityColumns: ColumnDef<any>[] = [
    { key: 'timestamp', header: 'Timestamp (UTC)' },
    { key: 'activity', header: 'Activity', cell: (row) => <span className="font-bold text-gray-800">{row.activity}</span> },
    { key: 'actor', header: 'Actor' },
    { key: 'actorType', header: 'Actor Type' },
    { key: 'result', header: 'Result', cell: (row) => <StatusBadge status={row.result} size="xs" /> },
    { key: 'integrity', header: 'Integrity', cell: (row) => <StatusBadge status={row.integrity} size="xs" /> },
  ];

  const selectedDetail = {
    auditId: selectedRecord?.auditId || data.selectedRecord.auditId,
    timestamp: selectedRecord?.timestamp || data.selectedRecord.timestamp,
    actor: selectedRecord?.actor || data.selectedRecord.actor,
    actorType: selectedRecord?.actorType || data.selectedRecord.actorType,
    changeArea: selectedRecord?.changeArea || data.selectedRecord.changeArea,
    operation: selectedRecord?.operation || data.selectedRecord.operation,
    entity: selectedRecord?.entity || data.selectedRecord.entity,
    result: selectedRecord?.result || data.selectedRecord.result,
    integrity: selectedRecord?.integrity || data.selectedRecord.integrity,
    riskLevel: selectedRecord?.risk || data.selectedRecord.riskLevel,
    businessUnit: selectedRecord?.businessUnit || data.selectedRecord.businessUnit,
    channelRegion: selectedRecord?.channelRegion || data.selectedRecord.channelRegion,
    sourceIP: selectedRecord?.sourceIP || data.selectedRecord.sourceIP,
    sessionId: selectedRecord?.sessionId || data.selectedRecord.sessionId,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Primary Row: Main Audit Registry Table + Selected Record Panel + Before/After Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left Column: Administration Audit & Change Registry */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-900">Administration Audit & Change Registry</h3>
            </div>
            <DataTable
              columns={auditRegistryColumns}
              data={data.auditRecords}
              density="compact"
              pagination={false}
              keyExtractor={(r) => r.id}
            />
          </div>
          <div className="pt-2 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={() => onNavigateTab('change-history')}
              className="text-[10px] font-bold text-gray-600 hover:text-[#741d35] transition-colors"
            >
              View all audit records →
            </button>
          </div>
        </div>

        {/* Middle Column: Selected Audit Record Panel */}
        <SelectedAuditRecordPanel
          record={selectedDetail}
          onViewFullDetails={() => alert(`Details for ${selectedDetail.auditId}`)}
          onDownloadJson={() => alert(`Downloading JSON for ${selectedDetail.auditId}`)}
        />

        {/* Right Column: Before / After Comparison */}
        <BeforeAfterComparison
          title="Before / After Comparison"
          fields={data.comparisonFields}
          onViewFullComparison={() => alert('View full comparison')}
        />
      </div>

      {/* 2. Middle Row 1: Change Summary + High Risk Changes + Approval Trace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Change Summary by Area */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-900">
                Change Summary by Administration Area <span className="text-gray-400 font-normal">(Last 30 Days)</span>
              </h3>
            </div>
            <DataTable
              columns={changeSummaryColumns}
              data={data.changeSummaries}
              density="compact"
              pagination={false}
              keyExtractor={(r) => r.id}
            />
          </div>
          <div className="pt-2 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={() => alert('Full change summary')}
              className="text-[10px] font-bold text-gray-600 hover:text-[#741d35] transition-colors"
            >
              View full change summary →
            </button>
          </div>
        </div>

        {/* High-Risk Changes Table */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-900">
                High-Risk Administrative Changes <span className="text-gray-400 font-normal">(Last 30 Days)</span>
              </h3>
            </div>
            <DataTable
              columns={highRiskColumns}
              data={data.highRiskChanges}
              density="compact"
              pagination={false}
              keyExtractor={(r) => r.id}
            />
          </div>
          <div className="pt-2 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={() => alert('Full high-risk changes')}
              className="text-[10px] font-bold text-gray-600 hover:text-[#741d35] transition-colors"
            >
              View full high-risk changes →
            </button>
          </div>
        </div>

        {/* Approval & Governance Trace */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-900">Approval & Governance Trace</h3>
            </div>
            <DataTable
              columns={approvalTraceColumns}
              data={data.approvalTrace}
              density="compact"
              pagination={false}
              keyExtractor={(r, i) => i}
            />
          </div>
          <div className="pt-2 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={() => alert('Full trace')}
              className="text-[10px] font-bold text-gray-600 hover:text-[#741d35] transition-colors"
            >
              View full trace →
            </button>
          </div>
        </div>
      </div>

      {/* 3. Middle Row 2: Report Catalogue + Scheduled Reports + Export Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Report Catalogue */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-900">
                Report Catalogue <span className="text-gray-400 font-normal">(Last 30 Days)</span>
              </h3>
            </div>
            <DataTable
              columns={reportCatalogueColumns}
              data={data.reportCatalogue}
              density="compact"
              pagination={false}
              keyExtractor={(r) => r.id}
            />
          </div>
          <div className="pt-2 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={() => alert('View full reports')}
              className="text-[10px] font-bold text-gray-600 hover:text-[#741d35] transition-colors"
            >
              View full reports →
            </button>
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-900">Scheduled Reports</h3>
            </div>
            <DataTable
              columns={scheduledReportsColumns}
              data={data.scheduledReports}
              density="compact"
              pagination={false}
              keyExtractor={(r) => r.id}
            />
          </div>
          <div className="pt-2 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={() => alert('Manage scheduled reports')}
              className="text-[10px] font-bold text-gray-600 hover:text-[#741d35] transition-colors"
            >
              Manage scheduled reports →
            </button>
          </div>
        </div>

        {/* Export Jobs / Sensitive Exports / Failed Exports */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1 pb-1 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-900">Export Jobs</h3>
              <button onClick={() => alert('View all exports')} className="text-[10px] text-gray-500 hover:text-[#741d35]">
                View all export jobs →
              </button>
            </div>
            <DataTable
              columns={exportJobsColumns}
              data={data.exportJobs}
              density="compact"
              pagination={false}
              keyExtractor={(r) => r.id}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1 pb-1 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-900">Sensitive Export Review</h3>
              <button onClick={() => alert('Review sensitive exports')} className="text-[10px] text-gray-500 hover:text-[#741d35]">
                Review sensitive exports →
              </button>
            </div>
            <DataTable
              columns={sensitiveExportsColumns}
              data={data.sensitiveExports}
              density="compact"
              pagination={false}
              keyExtractor={(r) => r.id}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1 pb-1 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-900">
                Failed Exports <span className="text-gray-400 font-normal">(Last 30 Days)</span>
              </h3>
              <button onClick={() => alert('View failed exports')} className="text-[10px] text-gray-500 hover:text-[#741d35]">
                View all failed exports →
              </button>
            </div>
            <DataTable
              columns={failedExportsColumns}
              data={data.failedExports}
              density="compact"
              pagination={false}
              keyExtractor={(r) => r.id}
            />
          </div>
        </div>
      </div>

      {/* 4. Lower Charts & Visualizations Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Chart 1: Administrative Change Volume — Last 90 Days */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-xs font-bold text-gray-900 mb-2">
            Administrative Change Volume <span className="text-gray-400 font-normal">— Last 90 Days</span>
          </h4>
          <ResponsiveLineChart
            data={data.changeVolumeData}
            series={[{ key: 'volume', label: 'Changes', color: '#3b82f6' }]}
            xAxisKey="date"
            height={160}
          />
        </div>

        {/* Chart 2: High-Risk Changes — Last 90 Days */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-xs font-bold text-gray-900 mb-2">
            High-Risk Changes <span className="text-gray-400 font-normal">— Last 90 Days</span>
          </h4>
          <ReusableBarChart
            data={data.highRiskTrendData}
            layout="vertical"
            height={160}
            barColor="#dc2626"
          />
        </div>

        {/* Chart 3: Reports & Exports — Last 90 Days */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-xs font-bold text-gray-900 mb-2">
            Reports & Exports <span className="text-gray-400 font-normal">— Last 90 Days</span>
          </h4>
          <ResponsiveLineChart
            data={data.reportsExportsTrendData}
            series={[
              { key: 'reports', label: 'Reports Generated', color: '#3b82f6' },
              { key: 'exports', label: 'Exports Completed', color: '#10b981' },
            ]}
            xAxisKey="date"
            height={160}
          />
        </div>

        {/* Chart 4: Administration Audit Health Matrix */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-xs font-bold text-gray-900 mb-2">
            Administration Audit Health Matrix
          </h4>
          <OperatingHealthHeatmap data={data.healthMatrixData} />
        </div>

        {/* Chart 5: Audit Integrity */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-xs font-bold text-gray-900 mb-2">
            Audit Integrity
          </h4>
          <div className="flex flex-col gap-2">
            <ReusableDonutChart
              data={data.auditIntegrityDonut}
              totalLabel="Success Rate"
              totalValue={data.auditIntegrityMetrics.successRate}
              height={130}
            />
            <div className="grid grid-cols-4 gap-1 text-[9px] text-center border-t border-gray-100 pt-2">
              <div>
                <span className="text-gray-400 block uppercase">Verified</span>
                <span className="font-extrabold text-emerald-700">{data.auditIntegrityMetrics.verified}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase">Warning</span>
                <span className="font-extrabold text-amber-700">{data.auditIntegrityMetrics.warning}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase">Failed</span>
                <span className="font-extrabold text-rose-700">{data.auditIntegrityMetrics.failed}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase">Total</span>
                <span className="font-extrabold text-gray-900">{data.auditIntegrityMetrics.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Administration Audit Governance Gates */}
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-xs font-bold text-gray-900 mb-2">
            Administration Audit Governance Gates
          </h4>
          <div className="space-y-1 text-[10px]">
            {data.governanceGates.map((gate) => (
              <div key={gate.id} className="flex items-center justify-between py-0.5 border-b border-gray-50">
                <span className="font-medium text-gray-700">{gate.title}</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.25 rounded text-[9px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{gate.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Activity Row: Recent Administration Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-2 pb-1 border-b border-gray-100">
              Recent Administration Activity <span className="text-gray-400 font-normal">(Evidence & Export)</span>
            </h4>
            <DataTable
              columns={evidenceActivityColumns}
              data={data.recentEvidenceActivity}
              density="compact"
              pagination={false}
              keyExtractor={(r) => r.id}
            />
          </div>
          <div className="pt-2 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={() => alert('View all activity')}
              className="text-[10px] font-bold text-gray-600 hover:text-[#741d35] transition-colors"
            >
              View all evidence activity →
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-2 pb-1 border-b border-gray-100">
              Recent Administration Activity <span className="text-gray-400 font-normal">(Audit Events)</span>
            </h4>
            <DataTable
              columns={recentAuditActivityColumns}
              data={data.recentAuditActivity}
              density="compact"
              pagination={false}
              keyExtractor={(r) => r.id}
            />
          </div>
          <div className="pt-2 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={() => alert('View all audit activity')}
              className="text-[10px] font-bold text-gray-600 hover:text-[#741d35] transition-colors"
            >
              View all audit activity →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditOverviewTab;
