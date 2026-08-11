"use client";

import React from "react";
import { CircularProgress } from "../shared/CircularProgress";
import { ActionButton } from "../shared/ActionButton";
import { LogisticsControlIntelligence } from "@/types/logistics/exceptionsReconciliation";
import { AlertCircle, ShieldAlert, ArrowUpRight, CheckCircle2, ChevronRight, FileText } from "lucide-react";

interface ExceptionRightRailProps {
  data: LogisticsControlIntelligence;
  onSelectAction?: (actionName: string) => void;
}

export function ExceptionRightRail({ data, onSelectAction }: ExceptionRightRailProps) {
  return (
    <aside className="w-full xl:w-[320px] shrink-0 space-y-3">
      {/* 1. Header Card with Health Score */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs text-center space-y-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Logistics Control Intelligence
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
          Reverse &amp; Logistics Control Health Score
        </p>
      </div>

      {/* 2. Priority Control Alerts */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Priority Control Alerts ({data.priorityAlerts.length})
          </h4>
        </div>

        <div className="space-y-1 text-[11px]">
          {data.priorityAlerts.map((alert, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-1.5 rounded bg-gray-50 hover:bg-rose-50/50 cursor-pointer transition-colors border border-gray-100"
              onClick={() => onSelectAction?.(alert.title)}
            >
              <span className="text-gray-800 font-semibold flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    alert.severity === "critical"
                      ? "bg-rose-600"
                      : alert.severity === "warning"
                      ? "bg-amber-500"
                      : "bg-blue-500"
                  }`}
                />
                {alert.title}
              </span>
              <span
                className={`font-mono font-bold text-xs ${
                  alert.severity === "critical"
                    ? "text-rose-700"
                    : alert.severity === "warning"
                    ? "text-amber-700"
                    : "text-blue-700"
                }`}
              >
                {alert.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Summaries */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-3 text-[11px]">
        {/* Exception Summary */}
        <div className="space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block border-b border-gray-100 pb-1">
            Exception Summary
          </span>
          <div className="flex justify-between pt-0.5">
            <span className="text-gray-500">Open Exceptions:</span>
            <span className="font-bold text-gray-900">{data.exceptionsSummary.totalOpen}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Critical / High:</span>
            <span className="font-bold text-rose-700">
              {data.exceptionsSummary.critical} Critical / {data.exceptionsSummary.high} High
            </span>
          </div>
        </div>

        {/* Claims Summary */}
        <div className="space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block border-b border-gray-100 pb-1">
            Claims Summary
          </span>
          <div className="flex justify-between pt-0.5">
            <span className="text-gray-500">Open Claims:</span>
            <span className="font-bold text-gray-900">{data.claimsSummary.open}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Pending Carrier Resp:</span>
            <span className="font-bold text-amber-700">{data.claimsSummary.pendingCarrierResponse}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Overdue Claims:</span>
            <span className="font-bold text-rose-700">{data.claimsSummary.overdue}</span>
          </div>
        </div>

        {/* Cost Summary */}
        <div className="space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block border-b border-gray-100 pb-1">
            Cost Summary
          </span>
          <div className="flex justify-between pt-0.5">
            <span className="text-gray-500">Cost Variances:</span>
            <span className="font-bold text-gray-900">{data.costSummary.variancesCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Unreconciled Cost:</span>
            <span className="font-mono font-bold text-rose-700">
              LKR {(data.costSummary.unreconciledCost / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>

        {/* Recovery Summary */}
        <div className="space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block border-b border-gray-100 pb-1">
            Recovery Summary
          </span>
          <div className="flex justify-between pt-0.5">
            <span className="text-gray-500">Pending Recoveries:</span>
            <span className="font-bold text-gray-900">{data.recoverySummary.pendingRecoveriesCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Recovered Amount:</span>
            <span className="font-mono font-bold text-emerald-700">
              LKR {(data.recoverySummary.recoveredAmount / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>

        {/* Control Summary */}
        <div className="space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block border-b border-gray-100 pb-1">
            Control Summary
          </span>
          <div className="flex justify-between pt-0.5">
            <span className="text-gray-500">Control Breaches:</span>
            <span className="font-bold text-rose-700">{data.controlSummary.breaches}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">SLA Breaches:</span>
            <span className="font-bold text-rose-700">{data.controlSummary.slaBreaches}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Holds Active:</span>
            <span className="font-bold text-amber-700">{data.controlSummary.holdsActive}</span>
          </div>
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
            onClick={() => onSelectAction?.("Exceptions Queue")}
            className="flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-rose-50 border border-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-800">Exceptions</span>
            <span className="font-mono font-bold text-rose-700">{data.quickQueues.exceptionsQueue}</span>
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
