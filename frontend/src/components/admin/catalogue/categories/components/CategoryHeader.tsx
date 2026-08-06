"use client";

import React from "react";
import { Download, Upload, Filter, Plus } from "lucide-react";
import toast from "react-hot-toast";

interface CategoryHeaderProps {
  selectedCount: number;
  onExportReport: () => void;
  onImportMapping: () => void;
  onBulkActions: () => void;
  onCreateCategory: () => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  selectedCount,
  onExportReport,
  onImportMapping,
  onBulkActions,
  onCreateCategory,
}) => {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Breadcrumb */}
      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        Catalogue &nbsp;/&nbsp; <span className="text-gray-800">Categories</span>
      </div>

      {/* Title & Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Category Management</h1>
          <p className="text-[12px] text-gray-500 mt-0.5">
            Manage taxonomy hierarchy, required attributes, product mapping, compliance rules and publication governance across the catalogue.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={onExportReport}
            className="h-9 px-3.5 rounded bg-white border border-gray-300 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download size={14} className="text-gray-500" />
            <span>Export Category Report</span>
          </button>

          <button
            onClick={onImportMapping}
            className="h-9 px-3.5 rounded bg-white border border-gray-300 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Upload size={14} className="text-gray-500" />
            <span>Import Mapping</span>
          </button>

          <button
            onClick={onBulkActions}
            disabled={selectedCount === 0}
            className={`h-9 px-3.5 rounded border text-[12px] font-bold flex items-center gap-1.5 transition-colors shadow-2xs ${
              selectedCount > 0
                ? "bg-white border-gray-300 text-gray-800 hover:bg-gray-50 cursor-pointer"
                : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Bulk Actions ({selectedCount})</span>
            <Filter size={14} />
          </button>

          <button
            onClick={onCreateCategory}
            className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a] flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus size={15} />
            <span>Create Category</span>
          </button>
        </div>
      </div>
    </div>
  );
};
