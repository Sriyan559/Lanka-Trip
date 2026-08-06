"use client";

import React from "react";
import { X } from "lucide-react";
import { QuickFilterChip } from "@/types/productMaster";

interface ProductQuickFiltersProps {
  chips: QuickFilterChip[];
  activeChips: string[];
  onToggleChip: (chipId: string) => void;
  onClearAll: () => void;
}

export const ProductQuickFilters: React.FC<ProductQuickFiltersProps> = ({
  chips,
  activeChips,
  onToggleChip,
  onClearAll,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-white rounded border border-gray-200 px-3 py-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-bold text-gray-700 mr-1">Quick Filters:</span>
        {chips.map((chip) => {
          const isActive = activeChips.includes(chip.id);
          return (
            <button
              key={chip.id}
              onClick={() => onToggleChip(chip.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1 border ${
                isActive
                  ? "bg-[#741d35] text-white border-[#741d35]"
                  : "bg-[#f5ebed]/70 text-[#741d35] border-[#f5ebed] hover:bg-[#741d35] hover:text-white"
              }`}
            >
              <span>{chip.label}</span>
              <X size={12} className="opacity-80 hover:opacity-100" />
            </button>
          );
        })}
      </div>

      {activeChips.length > 0 && (
        <button
          onClick={onClearAll}
          className="text-[11px] font-bold text-[#741d35] hover:underline"
        >
          Clear All
        </button>
      )}
    </div>
  );
};
