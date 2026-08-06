"use client";

import React, { useState } from "react";
import { Download, Upload, Plus, ChevronDown } from "lucide-react";

interface ProductMasterHeaderProps {
  onExport: () => void;
  onImportClick: () => void;
  selectedCount: number;
  onBulkAction: (action: string) => void;
  onCreateClick: () => void;
}

export const ProductMasterHeader: React.FC<ProductMasterHeaderProps> = ({
  onExport,
  onImportClick,
  selectedCount,
  onBulkAction,
  onCreateClick,
}) => {
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const bulkOptions = [
    { label: "Assign Reviewer", action: "assign-reviewer" },
    { label: "Change Status", action: "change-status" },
    { label: "Request Information", action: "request-info" },
    { label: "Link Inventory", action: "link-inventory" },
    { label: "Publish Products", action: "publish" },
    { label: "Export Selected", action: "export-selected" },
    { label: "Archive Products", action: "archive", danger: true },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
          Catalogue &nbsp;/&nbsp; <span className="text-gray-700">Product Masters</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Product Master Management</h1>
        <p className="text-[12.5px] text-gray-500 mt-0.5">
          Manage master product records, variants, compliance, inventory linkage and publication readiness.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Export Products */}
        <button
          onClick={onExport}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-xs"
          title="Export products to CSV"
        >
          <Download size={14} className="text-gray-500" />
          <span>Export Products</span>
        </button>

        {/* Import Products */}
        <button
          onClick={onImportClick}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-xs"
        >
          <Upload size={14} className="text-gray-500" />
          <span>Import Products</span>
        </button>

        {/* Bulk Actions Dropdown */}
        <div className="relative">
          <button
            disabled={selectedCount === 0}
            onClick={() => setIsBulkOpen((prev) => !prev)}
            className={`h-9 px-3.5 rounded border text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
              selectedCount > 0
                ? "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Bulk Actions {selectedCount > 0 && `(${selectedCount})`}</span>
            <ChevronDown size={14} />
          </button>

          {isBulkOpen && selectedCount > 0 && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded border border-gray-200 shadow-lg py-1 z-30 text-[12px]">
              {bulkOptions.map((opt) => (
                <button
                  key={opt.action}
                  onClick={() => {
                    onBulkAction(opt.action);
                    setIsBulkOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 hover:bg-gray-50 font-medium ${
                    opt.danger ? "text-rose-600 hover:bg-rose-50" : "text-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Create Product Master */}
        <button
          onClick={onCreateClick}
          className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a] flex items-center gap-2 transition-colors shadow-xs"
        >
          <Plus size={15} />
          <span>Create Product Master</span>
        </button>
      </div>
    </div>
  );
};
