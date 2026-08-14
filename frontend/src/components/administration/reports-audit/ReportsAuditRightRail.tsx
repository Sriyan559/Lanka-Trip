'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, FileText, Download, ShieldAlert, Archive, Settings, ChevronRight } from 'lucide-react';

interface ReportsAuditRightRailProps {
  healthScore: number;
  summaryStats: {
    totalChanges: string;
    successRate: string;
    highRiskChanges: number;
    reportsGenerated: number;
    exportsCompleted: number;
    failedExports: number;
    exportsAwaitingApproval: number;
    riskyAuthEvents: number;
    policyViolations: number;
    openAuditExceptions: number;
  };
  quickQueues: {
    pendingApprovals: number;
    exportsAwaitingReview: number;
    failedExports: number;
    unreviewedHighRisk: number;
  };
  onNavigateTab: (tab: string) => void;
  onActionClick: (action: string) => void;
}

export function ReportsAuditRightRail({
  healthScore = 98,
  summaryStats,
  quickQueues,
  onNavigateTab,
  onActionClick,
}: ReportsAuditRightRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Audit Health */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Audit Health
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={healthScore} max={100} label="Healthy" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Status</span>
            <span className="text-xs font-bold text-emerald-700">Healthy</span>
          </div>
        </div>

        {/* Small Audit Integrity Summary */}
        <div className="space-y-1 text-[9px] mt-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Integrity Verified</span>
            <span className="font-bold text-emerald-700">320.3K (98%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Integrity Warning</span>
            <span className="font-bold text-amber-700">3.2K (1%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Integrity Failed</span>
            <span className="font-bold text-rose-700">3.1K (1%)</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-100 pt-1">
            <span className="text-gray-700 font-semibold">Total Records</span>
            <span className="font-bold text-gray-900">326.4K</span>
          </div>
        </div>
      </div>

      {/* 2. Change Summary (Last 30 Days) */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Change Summary (Last 30 Days)
        </h4>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Total Changes</span>
            <span className="font-extrabold text-gray-900">{summaryStats?.totalChanges || '8,742'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Success Rate</span>
            <span className="font-extrabold text-emerald-700">{summaryStats?.successRate || '97.7%'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">High-Risk Changes</span>
            <span className="font-extrabold text-rose-700">{summaryStats?.highRiskChanges || 14}</span>
          </div>
        </div>
      </div>

      {/* 3. Reports & Exports Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Reports & Exports Summary
        </h4>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Reports Generated</span>
            <span className="font-bold text-gray-900">{summaryStats?.reportsGenerated || 524}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Exports Completed</span>
            <span className="font-bold text-gray-900">{summaryStats?.exportsCompleted || 312}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Failed Exports</span>
            <span className="font-bold text-rose-700">{summaryStats?.failedExports || 34}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Exports Awaiting Approval</span>
            <span className="font-bold text-amber-700">{summaryStats?.exportsAwaitingApproval || 12}</span>
          </div>
        </div>
      </div>

      {/* 4. Audit Risk */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Audit Risk
        </h4>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">High-Risk Changes</span>
            <span className="font-bold text-rose-700">{summaryStats?.highRiskChanges || 14}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Risky Auth Events</span>
            <span className="font-bold text-amber-700">{summaryStats?.riskyAuthEvents || 6}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Policy Violations</span>
            <span className="font-bold text-rose-700">{summaryStats?.policyViolations || 3}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Open Audit Exceptions</span>
            <span className="font-bold text-amber-700">{summaryStats?.openAuditExceptions || 22}</span>
          </div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[10px]">
          <button
            type="button"
            onClick={() => onActionClick('pending_approvals')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left transition-colors"
          >
            <span className="text-gray-600">Pending Approvals</span>
            <span className="font-bold text-purple-700 bg-purple-50 px-1.5 py-0.25 rounded text-[9px]">
              {quickQueues?.pendingApprovals || 12}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onActionClick('exports_awaiting_review')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left transition-colors"
          >
            <span className="text-gray-600">Exports Awaiting Review</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.25 rounded text-[9px]">
              {quickQueues?.exportsAwaitingReview || 8}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onActionClick('failed_exports')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left transition-colors"
          >
            <span className="text-gray-600">Failed Exports</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">
              {quickQueues?.failedExports || 14}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onActionClick('unreviewed_high_risk')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left transition-colors"
          >
            <span className="text-gray-600">Unreviewed High-Risk</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">
              {quickQueues?.unreviewedHighRisk || 14}
            </span>
          </button>
        </div>
      </div>

      {/* 6. Recommended Next Action */}
      <div className="bg-[#741d35] text-white rounded p-3 shadow-sm border border-[#5d172a] flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Recommended Next Action</span>
        </div>
        <p className="text-[10px] text-rose-100 leading-relaxed font-medium">
          Review 22 audit exceptions before the upcoming compliance review cycle.
        </p>
        <button
          type="button"
          onClick={() => onActionClick('review_exceptions')}
          className="w-full mt-1 py-1.5 bg-[#5d172a] hover:bg-[#471120] text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-900 shadow-xs"
        >
          Review 22 Audit Exceptions
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Final Actions
        </h4>
        <div className="flex flex-col gap-1 text-[10px]">
          <button
            type="button"
            onClick={() => onActionClick('generate_report')}
            className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Generate Full Audit Report</span>
            <FileText className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('export_audit')}
            className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Export Administration Audit</span>
            <Download className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('archive_evidence')}
            className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Archive Evidence Packages</span>
            <Archive className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('configure_retention')}
            className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Configure Audit Retention</span>
            <Settings className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportsAuditRightRail;
