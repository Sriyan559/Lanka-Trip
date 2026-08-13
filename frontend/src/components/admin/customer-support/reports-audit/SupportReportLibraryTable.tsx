'use client';

import React from 'react';
import { SupportReportItem } from '@/types/reportsAudit';
import { MoreVertical } from 'lucide-react';

interface SupportReportLibraryTableProps {
  reports: SupportReportItem[];
  selectedReportId: string;
  onSelectReport: (id: string) => void;
  onActionClick?: (reportId: string) => void;
}

export function SupportReportLibraryTable({
  reports,
  selectedReportId,
  onSelectReport,
  onActionClick,
}: SupportReportLibraryTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800';
      case 'Warning':
        return 'bg-amber-100 text-amber-800';
      case 'Failed':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
      case 'Critical':
        return 'text-rose-600 font-bold';
      case 'Low':
        return 'text-slate-500 font-normal';
      default:
        return 'text-slate-800 font-medium';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-1.5">
      <h4 className="font-bold text-slate-900 text-xs">Customer Support Report Library</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[10px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
              <th className="py-1 px-1.5 w-6 text-center">#</th>
              <th className="py-1 px-1.5">Report Name</th>
              <th className="py-1 px-1.5">Report ID</th>
              <th className="py-1 px-1.5">Report Type</th>
              <th className="py-1 px-1.5">Support Domain</th>
              <th className="py-1 px-1.5">Scope</th>
              <th className="py-1 px-1.5">Format</th>
              <th className="py-1 px-1.5">Schedule</th>
              <th className="py-1 px-1.5">Last Generated</th>
              <th className="py-1 px-1.5">Date Range</th>
              <th className="py-1 px-1.5 text-center">Status</th>
              <th className="py-1 px-1.5 text-center">Priority</th>
              <th className="py-1 px-1.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {reports.map((r) => {
              const isSelected = selectedReportId === r.id;
              return (
                <tr
                  key={r.id}
                  onClick={() => onSelectReport(r.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-rose-50/70 font-semibold' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-1 px-1.5 text-center text-slate-400 font-mono">{r.number}</td>
                  <td className="py-1 px-1.5 font-bold text-slate-900 whitespace-nowrap">{r.reportName}</td>
                  <td className="py-1 px-1.5 font-mono text-slate-700 whitespace-nowrap">{r.reportId}</td>
                  <td className="py-1 px-1.5 text-slate-600 whitespace-nowrap">{r.reportType}</td>
                  <td className="py-1 px-1.5 text-slate-600 whitespace-nowrap">{r.supportDomain}</td>
                  <td className="py-1 px-1.5 text-slate-600 whitespace-nowrap">{r.scope}</td>
                  <td className="py-1 px-1.5 font-mono text-slate-800 font-bold whitespace-nowrap">{r.format}</td>
                  <td className="py-1 px-1.5 text-slate-700 whitespace-nowrap">{r.schedule}</td>
                  <td className="py-1 px-1.5 text-slate-500 whitespace-nowrap">{r.lastGenerated}</td>
                  <td className="py-1 px-1.5 text-slate-500 whitespace-nowrap">{r.dateRange}</td>
                  <td className="py-1 px-1.5 text-center">
                    <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${getStatusBadge(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className={`py-1 px-1.5 text-center ${getPriorityBadge(r.priority)}`}>
                    {r.priority}
                  </td>
                  <td className="py-1 px-1.5 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onActionClick && onActionClick(r.id);
                      }}
                      className="p-0.5 hover:bg-slate-200 rounded text-slate-500"
                    >
                      <MoreVertical size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
