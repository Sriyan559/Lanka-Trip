"use client";

import React from "react";
import { CircularProgress } from "../shared/CircularProgress";
import { ActionButton } from "../shared/ActionButton";
import { GovernanceIntelligence } from "@/types/logistics/reportsImportExportAudit";
import { AlertCircle, ShieldCheck, FileSpreadsheet, CheckCircle2 } from "lucide-react";

interface ReportRightRailProps {
  data: GovernanceIntelligence;
  onSelectAction?: (actionName: string) => void;
}

export function ReportRightRail({ data, onSelectAction }: ReportRightRailProps) {
  return (
    <aside className="w-full xl:w-[320px] shrink-0 space-y-3">
      {/* 1. Header Card with Health Score */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs text-center space-y-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Logistics Data Governance Health
        </h3>
        <div className="flex justify-center py-1">
          <CircularProgress
            value={data.healthScore}
            label=""
            size={70}
            strokeWidth={6}
            color="#10b981"
          />
        </div>
        <p className="text-[11px] font-bold text-gray-800">
          Governance &amp; Retention Health Score
        </p>
      </div>

      {/* 2. Governance Scorecard Rows */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-2 text-[11px]">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight border-b border-gray-100 pb-1.5 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Governance Scorecard
        </h4>

        <div className="space-y-1.5 pt-0.5">
          {data.governanceScorecards.map((sc, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-600">{sc.label}:</span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-gray-900">
                <span>{sc.value}%</span>
                <span className="text-[9.5px] text-emerald-700 font-semibold">{sc.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recent Data Reconciliation Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-2 text-[11px]">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight border-b border-gray-100 pb-1.5 flex items-center gap-1">
          <FileSpreadsheet className="w-3.5 h-3.5 text-rose-700" />
          Recent Data Reconciliation
        </h4>

        <div className="space-y-1.5 pt-0.5">
          {data.recentReconciliationSummary.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-1 rounded bg-gray-50 hover:bg-rose-50/50 cursor-pointer transition-colors border border-gray-100"
            >
              <span className="text-gray-800 font-semibold truncate max-w-[170px]">{item.title}</span>
              <div className="flex items-center gap-1 font-mono font-bold text-[10.5px]">
                <span className="text-gray-900">LKR {(item.actualAmount / 1000000).toFixed(1)}M</span>
                <span className="text-[9.5px] text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                  {item.matchRate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-2">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight border-b border-gray-100 pb-1.5">
          Quick Queues
        </h4>

        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => onSelectAction?.("Exports Queue")}
            className="flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-rose-50 border border-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-800">Exports</span>
            <span className="font-mono font-bold text-rose-700">{data.quickQueues.exportsQueue}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectAction?.("Claims Queue")}
            className="flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-rose-50 border border-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-800">Claims</span>
            <span className="font-mono font-bold text-amber-700">{data.quickQueues.claimsQueue}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectAction?.("Reconciliation Queue")}
            className="flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-rose-50 border border-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-800">Reconcile</span>
            <span className="font-mono font-bold text-blue-700">{data.quickQueues.reconciliationQueue}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectAction?.("Recoveries Queue")}
            className="flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-rose-50 border border-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-800">Recoveries</span>
            <span className="font-mono font-bold text-emerald-700">{data.quickQueues.recoveriesQueue}</span>
          </button>
        </div>
      </div>

      {/* 5. Final Control Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-1.5 text-center">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight text-left mb-1">
          Final Control Actions
        </h4>

        <ActionButton
          label="Review Critical Exceptions"
          variant="primary"
          size="sm"
          className="w-full justify-center"
          onClick={() => onSelectAction?.("Review Critical Exceptions")}
        />
        <ActionButton
          label="Open Claims Queue"
          variant="outline"
          size="sm"
          className="w-full justify-center"
          onClick={() => onSelectAction?.("Open Claims Queue")}
        />
        <ActionButton
          label="Run Reconciliation"
          variant="outline"
          size="sm"
          className="w-full justify-center"
          onClick={() => onSelectAction?.("Run Reconciliation")}
        />
        <ActionButton
          label="Review Recoveries"
          variant="outline"
          size="sm"
          className="w-full justify-center"
          onClick={() => onSelectAction?.("Review Recoveries")}
        />
        <ActionButton
          label="Review Financial Holds"
          variant="outline"
          size="sm"
          className="w-full justify-center"
          onClick={() => onSelectAction?.("Review Financial Holds")}
        />
        <ActionButton
          label="View Audit Trail"
          variant="outline"
          size="sm"
          className="w-full justify-center"
          onClick={() => onSelectAction?.("View Audit Trail")}
        />
      </div>
    </aside>
  );
}
