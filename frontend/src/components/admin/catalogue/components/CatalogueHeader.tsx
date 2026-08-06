"use client";

import React from "react";
import { Download, Upload, Settings, Plus } from "lucide-react";

interface CatalogueHeaderProps {
  onExport: () => void;
  onImportClick: () => void;
  onSettingsClick: () => void;
  onCreateClick: () => void;
}

export const CatalogueHeader: React.FC<CatalogueHeaderProps> = ({
  onExport,
  onImportClick,
  onSettingsClick,
  onCreateClick,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
          Catalogue &nbsp;/&nbsp; <span className="text-gray-700">Command Center</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Catalogue Command Center</h1>
        <p className="text-[12.5px] text-gray-500 mt-0.5">
          Monitor product masters, approvals, catalogue quality, publication readiness, inventory availability and expiry risk.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={onExport}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
          title="Export displayed catalogue data as CSV"
        >
          <Download size={14} className="text-gray-500" />
          <span>Export Catalogue Report</span>
        </button>

        <button
          onClick={onImportClick}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
        >
          <Upload size={14} className="text-gray-500" />
          <span>Import Catalogue</span>
        </button>

        <button
          onClick={onSettingsClick}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
        >
          <Settings size={14} className="text-gray-500" />
          <span>Catalogue Settings</span>
        </button>

        <button
          onClick={onCreateClick}
          className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a] flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={15} />
          <span>Create Product Master</span>
        </button>
      </div>
    </div>
  );
};
