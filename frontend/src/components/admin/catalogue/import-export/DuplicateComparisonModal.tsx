"use client";

import React from "react";
import { X, GitMerge, Check, AlertCircle } from "lucide-react";
import { DuplicateConflictItem } from "@/types/importExport";

interface DuplicateComparisonModalProps {
  isOpen: boolean;
  conflict: DuplicateConflictItem | null;
  onClose: () => void;
  onResolve: (action: string) => void;
}

export function DuplicateComparisonModal({
  isOpen,
  conflict,
  onClose,
  onResolve,
}: DuplicateComparisonModalProps) {
  if (!isOpen || !conflict) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-line w-full max-w-3xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold text-[#671021] uppercase tracking-wider">
              Conflict Resolution
            </span>
            <h2 className="text-base font-extrabold text-ink">
              Duplicate Review — {conflict.sku}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-[12px]">
          <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px]">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-600" />
              <span>
                Match Confidence Score: <strong>{conflict.confidenceScore}%</strong>. System recommends action: <strong>{conflict.suggestedAction}</strong>.
              </span>
            </div>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* Existing Record */}
            <div className="border border-line rounded-lg p-3 bg-slate-50">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-2">
                Existing Record in Catalogue
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div><span className="text-slate-400 font-sans">SKU:</span> <strong>{conflict.sku}</strong></div>
                <div><span className="text-slate-400 font-sans">Name:</span> {conflict.existingRecord}</div>
                <div><span className="text-slate-400 font-sans">Brand:</span> {conflict.brand || "Estée Lauder"}</div>
                <div><span className="text-slate-400 font-sans">Category:</span> {conflict.category || "Skincare"}</div>
              </div>
            </div>

            {/* Incoming Record */}
            <div className="border border-red-200 rounded-lg p-3 bg-red-50/30">
              <span className="text-[10px] font-bold text-[#671021] uppercase block mb-2">
                Incoming Record from Import File
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div><span className="text-slate-400 font-sans">SKU:</span> <strong>{conflict.sku}</strong></div>
                <div><span className="text-slate-400 font-sans">Name:</span> {conflict.incomingRecord}</div>
                <div><span className="text-slate-400 font-sans">Brand:</span> {conflict.brand || "Estée Lauder"}</div>
                <div><span className="text-slate-400 font-sans">Category:</span> {conflict.category || "Skincare"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-line bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              onResolve("Keep Existing");
              onClose();
            }}
            className="px-3 py-1.5 rounded border border-line text-[11px] font-bold text-slate-700 hover:bg-slate-100"
          >
            Keep Existing Only
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onResolve("Use Incoming");
                onClose();
              }}
              className="px-3 py-1.5 rounded border border-line text-[11px] font-bold text-slate-700 hover:bg-slate-100"
            >
              Overwrite with Incoming
            </button>
            <button
              onClick={() => {
                onResolve("Merge");
                onClose();
              }}
              className="px-4 py-1.5 rounded bg-[#671021] text-white text-[11px] font-bold hover:bg-[#520d1a] flex items-center gap-1 shadow-xs"
            >
              <GitMerge size={13} /> Merge Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
