"use client";

import React from "react";
import { CircularProgress } from "../shared/CircularProgress";
import { ActionButton } from "../shared/ActionButton";
import { Filter, RefreshCw, Save, X, Calendar } from "lucide-react";

interface DeliveryConfigurationHealthScorecardProps {
  onRefresh?: () => void;
  onClearAll?: () => void;
  onSaveView?: () => void;
  onMoreFilters?: () => void;
}

export function DeliveryConfigurationHealthScorecard({
  onRefresh,
  onClearAll,
  onSaveView,
  onMoreFilters,
}: DeliveryConfigurationHealthScorecardProps) {
  const scorecardItems = [
    { label: "Zone Coverage Accuracy", value: 95, trend: "+2%" },
    { label: "Carrier Eligibility", value: 92, trend: "+2%" },
    { label: "Rate Rule Accuracy", value: 94, trend: "+1%" },
    { label: "Capacity Rule Accuracy", value: 90, trend: "+2%" },
    { label: "Cut-Off Integrity", value: 93, trend: "+1%" },
    { label: "SLA Rule Health", value: 94, trend: "+1%" },
    { label: "Calendar Consistency", value: 91, trend: "+1%" },
    { label: "Conflict Resolution", value: 89, trend: "+2%" },
    { label: "Dependency Integrity", value: 92, trend: "+2%" },
    { label: "Audit Completeness", value: 93, trend: "+1%" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2 gap-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Delivery Configuration Operations Health Scorecard
        </h3>

        {/* Date Pickers & Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-[10.5px]">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-gray-500">Created:</span>
            <span className="font-semibold text-gray-800">Select date</span>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-[10.5px]">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-gray-500">Expiry:</span>
            <span className="font-semibold text-gray-800">Select date</span>
          </div>

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
          <ActionButton
            label="More Filters (+28)"
            icon={<Filter className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onMoreFilters}
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
