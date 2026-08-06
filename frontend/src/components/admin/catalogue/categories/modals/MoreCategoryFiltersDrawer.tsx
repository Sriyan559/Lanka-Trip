"use client";

import React from "react";
import { X, Filter, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface MoreCategoryFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const MoreCategoryFiltersDrawer: React.FC<MoreCategoryFiltersDrawerProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <Filter size={15} className="text-[#741d35]" /> Advanced Category Filters
          </h2>
          <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Product Count Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min (e.g. 0)"
                className="h-8 px-2 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none"
              />
              <input
                type="number"
                placeholder="Max (e.g. 2000)"
                className="h-8 px-2 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Min Attribute Coverage %</label>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={50}
              className="w-full accent-[#741d35]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">SEO Readiness Min %</label>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={60}
              className="w-full accent-[#741d35]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Hierarchy Depth</label>
            <select className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none">
              <option value="all">All Depths</option>
              <option value="leaf">Leaf Categories Only (Level 4/5)</option>
              <option value="parent">Parent Nodes Only</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Risk Level</label>
            <select className="w-full h-8 px-2 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none">
              <option value="all">All Risk Levels</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>
        </div>

        <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="h-8 px-3 rounded border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onApply();
              toast.success("Advanced category filters applied!");
              onClose();
            }}
            className="h-8 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a] flex items-center gap-1.5 shadow-2xs"
          >
            <Filter size={13} />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
