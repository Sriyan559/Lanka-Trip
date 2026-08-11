"use client";

import React from "react";
import { CircularProgress } from "../shared/CircularProgress";
import { ActionButton } from "../shared/ActionButton";
import { RefreshCw, Save, X } from "lucide-react";

interface ExceptionHealthScorecardProps {
  onRefresh?: () => void;
  onClearAll?: () => void;
  onSaveView?: () => void;
}

export function ExceptionHealthScorecard({
  onRefresh,
  onClearAll,
  onSaveView,
}: ExceptionHealthScorecardProps) {
  const scorecardItems = [
    { label: "Exception Detection Accuracy", value: 94, trend: "+2%" },
    { label: "Claims Governance", value: 92, trend: "+2%" },
    { label: "Carrier Charge Accuracy", value: 91, trend: "+1%" },
    { label: "Warehouse Charge Accuracy", value: 92, trend: "+1%" },
    { label: "Reverse Cost Accuracy", value: 92, trend: "+1%" },
    { label: "COD Linkage Accuracy", value: 92, trend: "+1%" },
    { label: "Reconciliation Match Rate", value: 92, trend: "+2%" },
    { label: "Recovery Effectiveness", value: 91, trend: "+2%" },
    { label: "SLA Control", value: 93, trend: "+1%" },
    { label: "Audit Completeness", value: 93, trend: "+1%" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2 gap-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Logistics Control Health Scorecard
        </h3>

        <div className="flex items-center gap-1.5">
          <ActionButton
            label="Clear All"
            icon={<X className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onClearAll}
          />
          <ActionButton
            label="Save View"
            icon={<Save className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onSaveView}
          />
          <ActionButton
            label="Refresh"
            icon={<RefreshCw className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onRefresh}
          />
        </div>
      </div>

      {/* 10 Circular Progress Scorecards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 pt-1">
        {scorecardItems.map((item, idx) => (
          <CircularProgress
            key={idx}
            value={item.value}
            label={item.label}
            trendText={item.trend}
            size={50}
            strokeWidth={4}
          />
        ))}
      </div>
    </div>
  );
}
