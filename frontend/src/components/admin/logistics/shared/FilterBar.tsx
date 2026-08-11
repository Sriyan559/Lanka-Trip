"use client";

import React from "react";
import { RefreshCw, Save, X } from "lucide-react";
import { ActionButton } from "./ActionButton";

export interface FilterOption {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

interface FilterBarProps {
  filters: FilterOption[];
  onClearAll?: () => void;
  onSaveView?: () => void;
  onRefresh?: () => void;
  className?: string;
}

export function FilterBar({
  filters,
  onClearAll,
  onSaveView,
  onRefresh,
  className = "",
}: FilterBarProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs mb-3 space-y-2 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <div key={f.id} className="flex items-center gap-1 text-[11px]">
            <span className="text-gray-500 font-medium whitespace-nowrap">{f.label}:</span>
            <select
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 text-gray-800 font-semibold focus:outline-none focus:border-rose-700 text-[10.5px]"
            >
              {f.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 ml-auto pt-1 sm:pt-0">
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
          <button
            type="button"
            onClick={onRefresh}
            className="bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}
