'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { FinanceDataOperationRow } from '@/types/finance';

interface Props {
  rows: FinanceDataOperationRow[];
  selectedRowId?: string;
  onSelectRow?: (row: FinanceDataOperationRow) => void;
}

export function FinanceDataOperationsPortfolioTable({ rows, selectedRowId, onSelectRow }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSelectAll = () => {
    if (selectedIds.size === rows.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(rows.map((r) => r.id)));
    }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'Completed':
      case 'Passed':
      case 'Delivered':
      case 'Approved':
      case 'Aligned':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Running':
      case 'Pending Approval':
      case 'Pending Review':
      case 'Pending':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Failed':
      case 'Quarantined':
      case 'Rejected':
      case 'Exceptions':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
      {/* Header Bar */}
      <div className="p-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
            Finance Reports, Import, Export &amp; Audit Portfolio
          </h2>
          <span className="text-[10px] bg-rose-100 text-[#8f002b] font-bold px-2 py-0.5 rounded-full">
            Showing 1 to 6 of 6 records
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <span>Columns ▼</span>
          <span>Export ▼</span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[10px]">
          <thead>
            <tr className="bg-gray-100/70 border-b border-gray-200 font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
              <th className="p-2 text-center w-8">
                <input
                  type="checkbox"
                  checked={selectedIds.size === rows.length && rows.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-[#8f002b] focus:ring-[#8f002b]"
                />
              </th>
              <th className="p-2">Operation Ref</th>
              <th className="p-2">Operation Type</th>
              <th className="p-2">Finance Domain</th>
              <th className="p-2">Report / Template / File Name</th>
              <th className="p-2">Source System</th>
              <th className="p-2">Destination</th>
              <th className="p-2">BU</th>
              <th className="p-2">Channel</th>
              <th className="p-2">Region</th>
              <th className="p-2">Currency</th>
              <th className="p-2">Accounting Period</th>
              <th className="p-2">File Type</th>
              <th className="p-2 text-right">File Size</th>
              <th className="p-2 text-right">Total Records</th>
              <th className="p-2 text-right">Processed</th>
              <th className="p-2 text-right">Successful</th>
              <th className="p-2 text-right">Rejected</th>
              <th className="p-2 text-right">Duplicates</th>
              <th className="p-2 text-right">Quarantined</th>
              <th className="p-2 text-center">Validation</th>
              <th className="p-2 text-center">Approval</th>
              <th className="p-2 text-center">Processing</th>
              <th className="p-2 text-center">Delivery</th>
              <th className="p-2 text-center">Reconciled</th>
              <th className="p-2">Export Purpose</th>
              <th className="p-2">Classification</th>
              <th className="p-2">Encryption</th>
              <th className="p-2">Retention</th>
              <th className="p-2 text-center">Legal Hold</th>
              <th className="p-2">Owner</th>
              <th className="p-2">Reviewer</th>
              <th className="p-2">Approver</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Completed At</th>
              <th className="p-2">SLA</th>
              <th className="p-2 text-center w-10">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => {
              const isSelected = selectedRowId === row.id || selectedIds.has(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectRow && onSelectRow(row)}
                  className={[
                    'hover:bg-gray-50 transition-colors cursor-pointer text-gray-800 font-medium',
                    isSelected ? 'bg-red-50/40' : '',
                  ].join(' ')}
                >
                  <td className="p-2 text-center" onClick={(e) => toggleSelectOne(row.id, e)}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={() => {}}
                      className="rounded border-gray-300 text-[#8f002b] focus:ring-[#8f002b]"
                    />
                  </td>
                  <td className="p-2 font-mono font-bold text-[#8f002b]">
                    <div className="flex items-center gap-1">
                      <span>{row.id}</span>
                      <ExternalLink size={10} className="text-gray-400" />
                    </div>
                  </td>
                  <td className="p-2 text-gray-800 font-semibold">{row.operationType}</td>
                  <td className="p-2 text-gray-700">{row.financeDomain}</td>
                  <td className="p-2 font-bold text-gray-900 truncate max-w-[180px]">{row.reportOrTemplateName}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.sourceSystem}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.destination}</td>
                  <td className="p-2 text-gray-700">{row.businessUnit}</td>
                  <td className="p-2 text-gray-700">{row.channel}</td>
                  <td className="p-2 text-gray-700">{row.region}</td>
                  <td className="p-2 font-mono text-gray-500 text-[10px]">{row.currency}</td>
                  <td className="p-2 text-gray-700">{row.accountingPeriod}</td>
                  <td className="p-2 font-mono text-gray-700">{row.fileType}</td>
                  <td className="p-2 text-right font-mono text-gray-700">{row.fileSize}</td>
                  <td className="p-2 text-right font-mono font-bold text-gray-900">{row.totalRecords.toLocaleString()}</td>
                  <td className="p-2 text-right font-mono text-gray-800">{row.processedRecords.toLocaleString()}</td>
                  <td className="p-2 text-right font-mono font-bold text-emerald-700">{row.successfulRecords.toLocaleString()}</td>
                  <td className={`p-2 text-right font-mono font-bold ${row.rejectedRecords > 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {row.rejectedRecords.toLocaleString()}
                  </td>
                  <td className="p-2 text-right font-mono text-gray-600">{row.duplicateRecords.toLocaleString()}</td>
                  <td className={`p-2 text-right font-mono font-bold ${row.quarantinedRecords > 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {row.quarantinedRecords}
                  </td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getStatusBadge(row.validationStatus)}`}>
                      {row.validationStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.approvalStatus}</td>
                  <td className="p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getStatusBadge(row.processingStatus)}`}>
                      {row.processingStatus}
                    </span>
                  </td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.deliveryStatus}</td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.reconciliationStatus}</td>
                  <td className="p-2 text-gray-600 text-[9px] truncate max-w-[120px]">{row.exportQueryOrPurpose}</td>
                  <td className="p-2 font-semibold text-gray-700">{row.dataClassification}</td>
                  <td className="p-2 font-mono text-gray-600 text-[10px]">{row.encryption}</td>
                  <td className="p-2 text-gray-700">{row.retention}</td>
                  <td className="p-2 text-center font-semibold text-gray-700">{row.legalHold}</td>
                  <td className="p-2 text-gray-700">{row.owner}</td>
                  <td className="p-2 text-gray-700">{row.reviewer}</td>
                  <td className="p-2 text-gray-700">{row.approver}</td>
                  <td className="p-2 text-gray-700 text-[10px]">{row.createdAt}</td>
                  <td className="p-2 text-gray-700 text-[10px]">{row.completedAt}</td>
                  <td className="p-2 font-mono font-bold text-emerald-700">{row.sla}</td>
                  <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toast(`Options for ${row.id}`)}
                      className="p-1 hover:bg-gray-200 rounded text-gray-500"
                    >
                      <MoreHorizontal size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 bg-gray-50/50 text-xs font-medium text-gray-600">
        <div>Showing 1 to 6 of 6 records</div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1 border border-gray-300 rounded hover:bg-white disabled:opacity-40"
          >
            <ChevronLeft size={13} />
          </button>
          {[1].map((p, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(p)}
              className={`px-2 py-0.5 rounded text-xs font-bold ${
                currentPage === p ? 'bg-[#8f002b] text-white' : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            disabled
            className="p-1 border border-gray-300 rounded hover:bg-white disabled:opacity-40"
          >
            <ChevronRight size={13} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>10 / page</span>
        </div>
      </div>
    </div>
  );
}
