"use client";

import React, { useState } from "react";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

interface MoreBrandFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const MoreBrandFiltersDrawer: React.FC<MoreBrandFiltersDrawerProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [minProducts, setMinProducts] = useState("");
  const [maxProducts, setMaxProducts] = useState("");
  const [minReadiness, setMinReadiness] = useState("");
  const [complianceState, setComplianceState] = useState("All");

  if (!isOpen) return null;

  const handleApplyFilters = () => {
    toast.success("Applied advanced brand filters!");
    onApply();
    onClose();
  };

  const handleReset = () => {
    setMinProducts("");
    setMaxProducts("");
    setMinReadiness("");
    setComplianceState("All");
    toast.success("Reset advanced filters.");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-[#741d35]" />
              <h3 className="text-sm font-bold text-gray-900">Advanced Brand Filters</h3>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 rounded">
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col gap-4 text-xs">
            {/* Product Count Range */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Active Product Count Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min (e.g. 10)"
                  value={minProducts}
                  onChange={(e) => setMinProducts(e.target.value)}
                  className="px-2.5 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                />
                <input
                  type="number"
                  placeholder="Max (e.g. 500)"
                  value={maxProducts}
                  onChange={(e) => setMaxProducts(e.target.value)}
                  className="px-2.5 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                />
              </div>
            </div>

            {/* Catalogue Readiness Minimum */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Minimum Catalogue Readiness (%)</label>
              <input
                type="number"
                placeholder="e.g. 75"
                value={minReadiness}
                onChange={(e) => setMinReadiness(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>

            {/* Compliance State */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Compliance State</label>
              <select
                value={complianceState}
                onChange={(e) => setComplianceState(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              >
                <option value="All">All States</option>
                <option value="Compliant">Compliant</option>
                <option value="Needs Review">Needs Review</option>
                <option value="Non-Compliant">Non-Compliant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded border border-gray-300 bg-white text-xs font-bold text-gray-600 hover:bg-gray-100 flex items-center gap-1"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-1.5 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
