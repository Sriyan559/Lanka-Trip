'use client';

import React from 'react';
import { ReportsAuditFullData, AuditRecord } from '@/lib/administration/reports-audit/reports-audit.types';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { BeforeAfterComparison } from '@/components/shared/BeforeAfterComparison/BeforeAfterComparison';

interface ChangeHistoryTabProps {
  data: ReportsAuditFullData;
  selectedRecord: AuditRecord;
  onSelectRecord: (r: AuditRecord) => void;
}

export function ChangeHistoryTab({ data, selectedRecord, onSelectRecord }: ChangeHistoryTabProps) {
  const columns: ColumnDef<AuditRecord>[] = [
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

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Full Change Log Table */}
      <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <div className="flex items-center justify-between mb-2 pb-1 border-b border-gray-100">
          <h3 className="text-xs font-bold text-gray-900">Administration Change History Log</h3>
          <span className="text-[10px] text-gray-500 font-medium">{data.auditRecords.length} records</span>
        </div>
        <DataTable
          columns={columns}
          data={data.auditRecords}
          density="normal"
          pagination={true}
          pageSize={10}
          searchable={true}
          searchPlaceholder="Search change history log..."
          keyExtractor={(r) => r.id}
        />
      </div>

      {/* Selected Audit Record & Diff Details */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-3">
        <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
          <h4 className="text-xs font-bold text-gray-900 mb-2 border-b border-gray-100 pb-1">
            Audit Event Summary
          </h4>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between"><span className="text-gray-400">Audit ID</span><span className="font-mono font-bold">{selectedRecord.auditId}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Timestamp</span><span className="font-medium text-gray-700">{selectedRecord.timestamp}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Actor</span><span className="font-bold text-[#741d35]">{selectedRecord.actor}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Change Area</span><span className="font-semibold text-gray-800">{selectedRecord.changeArea}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Operation</span><span className="font-semibold text-gray-800">{selectedRecord.operation}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Entity</span><span className="font-bold text-gray-900">{selectedRecord.entity}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Result</span><StatusBadge status={selectedRecord.result} size="xs" /></div>
            <div className="flex justify-between"><span className="text-gray-400">Integrity</span><StatusBadge status={selectedRecord.integrity} size="xs" /></div>
          </div>
        </div>

        <BeforeAfterComparison
          title="Field Change Impact"
          fields={data.comparisonFields}
        />
      </div>
    </div>
  );
}

export default ChangeHistoryTab;
