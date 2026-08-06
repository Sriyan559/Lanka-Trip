"use client";

import React from "react";
import { X, SlidersHorizontal, Check } from "lucide-react";
import { QualityFilterState } from "@/types/catalogueQuality";

interface MoreQualityFiltersDrawerProps {
  isOpen: boolean;
  filters: QualityFilterState;
  onClose: () => void;
  onApply: (updated: Partial<QualityFilterState>) => void;
}

export function MoreQualityFiltersDrawer({
  isOpen,
  filters,
  onClose,
  onApply,
}: MoreQualityFiltersDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-line flex flex-col justify-between">
        <div className="p-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold text-[#671021] uppercase tracking-wider">
              Advanced Filter Criteria
            </span>
            <h2 className="text-base font-extrabold text-ink">More Quality Filters</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto space-y-4 text-[12px]">
          <div>
            <label className="block font-bold text-ink mb-1">Business Impact</label>
            <select className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none">
              <option value="All">All</option>
              <option value="Customer confusion">Customer confusion</option>
              <option value="Wrong fulfilment">Wrong fulfilment</option>
              <option value="Poor conversion">Poor conversion</option>
              <option value="Not publishable">Not publishable</option>
              <option value="Compliance risk">Compliance risk</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">SLA State</label>
            <select className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none">
              <option value="All">All Cases</option>
              <option value="Breached">Only SLA Breached</option>
              <option value="At Risk">At Risk (Next 24h)</option>
              <option value="Within SLA">Within SLA</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Duplicate Confidence Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" placeholder="Min Score %" className="h-9 px-3 rounded border border-line text-[12px]" />
              <input type="number" placeholder="Max Score %" className="h-9 px-3 rounded border border-line text-[12px]" />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-line bg-slate-50 flex items-center justify-end gap-2">
          <button onClick={onClose} className="h-9 px-4 rounded border border-line text-[12px] font-bold text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button
            onClick={() => {
              onApply({});
              onClose();
            }}
            className="h-9 px-5 rounded bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520d1a] flex items-center gap-1.5 shadow-sm"
          >
            <Check size={14} /> Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
