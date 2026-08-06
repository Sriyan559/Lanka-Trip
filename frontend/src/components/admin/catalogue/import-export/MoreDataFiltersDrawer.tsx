"use client";

import React from "react";
import { X, SlidersHorizontal, Check } from "lucide-react";
import { FilterState } from "@/types/importExport";

interface MoreDataFiltersDrawerProps {
  isOpen: boolean;
  filters: FilterState;
  onClose: () => void;
  onApply: (updated: Partial<FilterState>) => void;
}

export function MoreDataFiltersDrawer({
  isOpen,
  filters,
  onClose,
  onApply,
}: MoreDataFiltersDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-line flex flex-col justify-between">
        <div className="p-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold text-[#671021] uppercase tracking-wider">
              Advanced Filter Criteria
            </span>
            <h2 className="text-base font-extrabold text-ink">More Job Filters</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto space-y-4 text-[12px]">
          <div>
            <label className="block font-bold text-ink mb-1">Execution Status</label>
            <select className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none">
              <option value="All">All</option>
              <option value="Queued">Queued</option>
              <option value="Running">Running</option>
              <option value="Reconciled">Reconciled</option>
              <option value="Delivered">Delivered</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Outcome</label>
            <select className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none">
              <option value="All">All</option>
              <option value="In Progress">In Progress</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Record Count Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" placeholder="Min Records" className="h-9 px-3 rounded border border-line text-[12px]" />
              <input type="number" placeholder="Max Records" className="h-9 px-3 rounded border border-line text-[12px]" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Duplicate Conflicts Filter</label>
            <select className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none">
              <option value="All">All Jobs</option>
              <option value="HasDuplicates">Only Jobs with Duplicate Conflicts (&gt;0)</option>
              <option value="NoDuplicates">Jobs with Zero Conflicts</option>
            </select>
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
