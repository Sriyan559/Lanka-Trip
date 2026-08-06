"use client";

import React from "react";
import { Download, Upload, Filter, Plus } from "lucide-react";

interface BrandHeaderProps {
  onExport: () => void;
  onImport: () => void;
  onBulkActions: () => void;
  onCreateBrand: () => void;
  selectedCount: number;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  onExport,
  onImport,
  onBulkActions,
  onCreateBrand,
  selectedCount,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-4">
      {/* Breadcrumb & Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Catalogue &gt; Brands
          </div>
          <h1 className="text-xl font-bold text-gray-900">Brand Management</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 max-w-3xl">
            Manage brand masters, ownership, verification, authorization, supplier relationships and catalogue readiness across the beauty marketplace.
          </p>
        </div>

        {/* Top-Right Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <button
            onClick={onExport}
            className="h-8 px-3 rounded bg-white border border-gray-300 text-[11.5px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download size={13} />
            Export Brand Report
          </button>
          <button
            onClick={onImport}
            className="h-8 px-3 rounded bg-white border border-gray-300 text-[11.5px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Upload size={13} />
            Import Brands
          </button>
          <button
            onClick={onBulkActions}
            disabled={selectedCount === 0}
            className={`h-8 px-3 rounded border text-[11.5px] font-semibold flex items-center gap-1.5 transition-colors shadow-2xs ${
              selectedCount > 0
                ? "bg-white border-gray-300 text-gray-800 hover:bg-gray-50 cursor-pointer"
                : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Filter size={13} />
            Bulk Actions {selectedCount > 0 && `(${selectedCount})`}
          </button>
          <button
            onClick={onCreateBrand}
            className="h-8 px-3.5 rounded bg-[#741d35] text-white text-[11.5px] font-bold hover:bg-[#5c172a] flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus size={14} />
            Create Brand
          </button>
        </div>
      </div>
    </div>
  );
};
