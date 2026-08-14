'use client';

import React from 'react';
import { SelectedAuditDetail } from '@/lib/administration/reports-audit/reports-audit.types';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { Download } from 'lucide-react';

interface SelectedAuditRecordPanelProps {
  record: SelectedAuditDetail;
  onViewFullDetails?: () => void;
  onDownloadJson?: () => void;
  className?: string;
}

export function SelectedAuditRecordPanel({
  record,
  onViewFullDetails,
  onDownloadJson,
  className = '',
}: SelectedAuditRecordPanelProps) {
  if (!record) return null;

  return (
    <div className={`bg-white border border-gray-200 rounded p-3 shadow-2xs flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900">Selected Audit Record</h3>
          <span className="text-[10px] font-mono font-bold text-[#741d35]">{record.auditId}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[10px]">
          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Audit ID</span>
            <span className="font-mono font-bold text-gray-800">{record.auditId}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Timestamp (UTC)</span>
            <span className="font-semibold text-gray-700">{record.timestamp}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Actor</span>
            <span className="font-semibold text-[#741d35] truncate block">{record.actor}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Actor Type</span>
            <span className="font-semibold text-gray-700">{record.actorType}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Change Area</span>
            <span className="font-semibold text-gray-800">{record.changeArea}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Operation</span>
            <span className="font-semibold text-gray-800">{record.operation}</span>
          </div>

          <div className="col-span-2">
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Entity</span>
            <span className="font-bold text-gray-900">{record.entity}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Result</span>
            <StatusBadge status={record.result} size="xs" />
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Integrity</span>
            <StatusBadge status={record.integrity} size="xs" />
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Risk Level</span>
            <StatusBadge status={record.riskLevel} size="xs" />
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Business Unit</span>
            <span className="font-semibold text-gray-700">{record.businessUnit}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Channel / Region</span>
            <span className="font-semibold text-gray-700">{record.channelRegion}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Source IP</span>
            <span className="font-mono text-gray-700">{record.sourceIP}</span>
          </div>

          <div className="col-span-2">
            <span className="text-gray-400 block text-[9px] uppercase font-medium">Session ID</span>
            <span className="font-mono text-gray-600 text-[9px]">{record.sessionId}</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 mt-2 flex items-center justify-between">
        {onViewFullDetails && (
          <button
            type="button"
            onClick={onViewFullDetails}
            className="text-[10px] font-bold text-gray-600 hover:text-[#741d35] transition-colors"
          >
            View full details →
          </button>
        )}
        {onDownloadJson && (
          <button
            type="button"
            onClick={onDownloadJson}
            className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            <span>Download JSON</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SelectedAuditRecordPanel;
