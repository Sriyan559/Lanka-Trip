"use client";

import React, { useState } from "react";
import { Download, Upload, Plus, ChevronDown, CheckSquare, Trash2, Tag, ShieldCheck, Link2 } from "lucide-react";

interface HeaderProps {
  selectedCount: number;
  onExport: () => void;
  onOpenImport: () => void;
  onOpenUpload: () => void;
  onBulkAction: (action: string) => void;
  canExport: boolean;
  canImport: boolean;
  canManage: boolean;
}

export function MediaManagementHeader({
  selectedCount,
  onExport,
  onOpenImport,
  onOpenUpload,
  onBulkAction,
  canExport,
  canImport,
  canManage,
}: HeaderProps) {
  const [bulkMenuOpen, setBulkMenuOpen] = useState(false);

  const handleBulkClick = (action: string) => {
    onBulkAction(action);
    setBulkMenuOpen(false);
  };

  return (
    <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-3">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
            <span>Catalogue</span>
            <span>/</span>
            <span className="text-ink font-bold">Media Assets</span>
          </div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">
            Media Asset Management
          </h1>
          <p className="text-[13px] text-muted mt-1 max-w-3xl leading-relaxed">
            Manage, validate, approve and distribute product, brand and compliance media assets across the beauty marketplace.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={onExport}
            disabled={!canExport}
            className="h-9 px-3.5 rounded-md bg-white border border-line text-[12px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download size={14} className="text-slate-600" />
            <span>Export Media Report</span>
          </button>

          <button
            onClick={onOpenImport}
            disabled={!canImport}
            className="h-9 px-3.5 rounded-md bg-white border border-line text-[12px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Upload size={14} className="text-slate-600" />
            <span>Import Media</span>
          </button>

          {/* Bulk Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBulkMenuOpen(!bulkMenuOpen)}
              disabled={selectedCount === 0 || !canManage}
              className={`h-9 px-3.5 rounded-md border text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm ${
                selectedCount > 0
                  ? "bg-white border-line text-ink hover:bg-slate-50 cursor-pointer"
                  : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <CheckSquare size={14} />
              <span>Bulk Actions {selectedCount > 0 ? `(${selectedCount})` : ""}</span>
              <ChevronDown size={13} />
            </button>

            {bulkMenuOpen && selectedCount > 0 && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-md border border-line shadow-lg z-30 py-1 text-[12px] font-medium text-ink">
                <button
                  onClick={() => handleBulkClick("Approve Selected")}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-emerald-700 font-semibold"
                >
                  <ShieldCheck size={14} /> Approve Selected ({selectedCount})
                </button>
                <button
                  disabled title="Unavailable — no review-request workflow is installed"
                  className="w-full cursor-not-allowed text-left px-3 py-1.5 flex items-center gap-2 text-slate-400"
                >
                  <Tag size={14} /> Request Changes
                </button>
                <button
                  disabled title="Use per-asset metadata editing for authoritative product linking"
                  className="w-full cursor-not-allowed text-left px-3 py-1.5 flex items-center gap-2 text-slate-400"
                >
                  <Link2 size={14} /> Link to Product / Entity
                </button>
                <div className="border-t border-line my-1" />
                <button
                  onClick={() => handleBulkClick("Archive Selected")}
                  className="w-full text-left px-3 py-1.5 hover:bg-rose-50 flex items-center gap-2 text-rose-600"
                >
                  <Trash2 size={14} /> Archive Selected
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onOpenUpload}
            disabled={!canManage}
            className="h-9 px-4 rounded-md bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520c1a] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus size={16} />
            <span>Upload Media</span>
          </button>
        </div>
      </div>
    </div>
  );
}
