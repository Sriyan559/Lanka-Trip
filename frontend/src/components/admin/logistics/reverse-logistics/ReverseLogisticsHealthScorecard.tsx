"use client";

import React from "react";
import { CircularProgress } from "../shared/CircularProgress";
import { ActionButton } from "../shared/ActionButton";
import { Filter, RefreshCw, Save, X } from "lucide-react";

interface ReverseLogisticsHealthScorecardProps {
  onRefresh?: () => void;
  onClearAll?: () => void;
  onSaveView?: () => void;
}

export function ReverseLogisticsHealthScorecard({
  onRefresh,
  onClearAll,
  onSaveView,
}: ReverseLogisticsHealthScorecardProps) {
  const scorecardItems = [
    { label: "Return Eligibility Integrity", value: 94, trend: "+2%" },
    { label: "Collection Performance", value: 92, trend: "+2%" },
    { label: "Reverse Tracking Completeness", value: 91, trend: "+1%" },
    { label: "Warehouse Receipt Performance", value: 93, trend: "+1%" },
    { label: "Inspection Accuracy", value: 90, trend: "+2%" },
    { label: "Disposition Accuracy", value: 92, trend: "+1%" },
    { label: "Restock Integrity", value: 94, trend: "+2%" },
    { label: "Refund Dependency Readiness", value: 91, trend: "+1%" },
    { label: "Reverse SLA", value: 92, trend: "+1%" },
    { label: "Audit Completeness", value: 93, trend: "+1%" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2 gap-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Reverse Logistics Operations Health Scorecard
        </h3>

        <div className="flex items-center gap-1.5">
          <ActionButton
            label="Save View"
            icon={<Save className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onSaveView}
          />
          <ActionButton
            label="Clear All"
            icon={<X className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onClearAll}
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

      {/* 10 Circular Health Scorecards Row */}
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
