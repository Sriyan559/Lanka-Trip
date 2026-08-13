'use client';

import React from 'react';
import { SupportReportItem } from '@/types/reportsAudit';

interface SelectedReportWorkspaceProps {
  selectedReport?: SupportReportItem;
}

export function SelectedReportWorkspace({ selectedReport }: SelectedReportWorkspaceProps) {
  const report = selectedReport || {
    reportName: 'Customer Support Executive Dashboard Report',
    reportId: 'RPT-ESP-001',
    format: 'PDF',
    schedule: 'Daily 09:00 AM',
    lastGenerated: 'Jul 22, 2026 10:00 AM',
    dateRange: 'Jul 21 – Jul 22, 2026',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-1 text-xs">
      <h4 className="font-bold text-slate-900 text-xs">
        Selected Report: <span className="text-[#881337]">{report.reportName} ({report.reportId})</span>
      </h4>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100">
        <div><span className="text-slate-400">Created:</span> <strong className="text-slate-800">System</strong></div>
        <div><span className="text-slate-400">Schedule:</span> <strong className="text-slate-800">{report.schedule}</strong></div>
        <div><span className="text-slate-400">Format:</span> <strong className="text-slate-800">{report.format}</strong></div>
        <div><span className="text-slate-400">Recipients:</span> <strong className="text-slate-800">12</strong></div>
        <div><span className="text-slate-400">Audience:</span> <strong className="text-slate-800">Executives</strong></div>
        <div><span className="text-slate-400">Last Generated:</span> <span className="text-slate-700">{report.lastGenerated}</span></div>
        <div><span className="text-slate-400">Date Range:</span> <span className="text-slate-700">{report.dateRange}</span></div>
        <div><span className="text-slate-400">Records:</span> <strong className="text-slate-900 font-bold">2.64M</strong></div>
      </div>
    </div>
  );
}
