"use client";

import React from "react";
import { CircularProgress } from "../shared/CircularProgress";
import { ActionButton } from "../shared/ActionButton";
import { Filter, RefreshCw, Save, X } from "lucide-react";

interface CarrierPerformanceIndicatorsProps {
  onRefresh?: () => void;
  onClearAll?: () => void;
  onSaveView?: () => void;
  onMoreFilters?: () => void;
}

export function CarrierPerformanceIndicators({
  onRefresh,
  onClearAll,
  onSaveView,
  onMoreFilters,
}: CarrierPerformanceIndicatorsProps) {
  const scorecardItems = [
    { label: "Carrier Availability", value: 96, trend: "+2%" },
    { label: "Pickup Performance", value: 92, trend: "+3%" },
    { label: "Delivery Performance", value: 91, trend: "+2%" },
    { label: "First-Attempt Delivery", value: 88, trend: "+2%" },
    { label: "Tracking Reliability", value: 98, trend: "+1%" },
    { label: "POD Completeness", value: 89, trend: "+2%" },
    { label: "COD Remittance", value: 96, trend: "+2%" },
    { label: "Claims Performance", value: 87, trend: "-1%", isPositive: false },
    { label: "Compliance Readiness", value: 95, trend: "+2%" },
    { label: "Audit Completeness", value: 93, trend: "+1%" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2 gap-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Carrier Operations Health Scorecard
        </h3>

        {/* Filter / View Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5">
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
          <ActionButton
            label="More Filters"
            icon={<Filter className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onMoreFilters}
          />
        </div>
      </div>

      {/* 10 Circular Scorecards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 pt-1">
        {scorecardItems.map((item, idx) => (
          <CircularProgress
            key={idx}
            value={item.value}
            label={item.label}
            trendText={item.trend}
            isPositive={item.isPositive !== false}
            size={50}
            strokeWidth={4}
          />
        ))}
      </div>
    </div>
  );
}
