"use client";

import React, { useState } from "react";
import { X, GitMerge, Check, AlertCircle } from "lucide-react";
import { DuplicateProductCandidate } from "@/types/catalogueQuality";

interface DuplicateComparisonModalProps {
  isOpen: boolean;
  candidate: DuplicateProductCandidate | null;
  onClose: () => void;
  onResolve: (action: string) => void;
}

export function DuplicateComparisonModal({
  isOpen,
  candidate,
  onClose,
  onResolve,
}: DuplicateComparisonModalProps) {
  const [selectedSurviving, setSelectedSurviving] = useState<"A" | "B">("A");

  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-line w-full max-w-4xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold text-[#671021] uppercase tracking-wider">
              Duplicate Conflict Review
            </span>
            <h2 className="text-base font-extrabold text-ink">
              Side-by-Side Comparison — {candidate.brand} ({candidate.category})
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-[12px]">
          <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11.5px]">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-600" />
              <span>
                Match Confidence Score: <strong>{candidate.confidenceScore}%</strong>. System recommended action: <strong>{candidate.suggestedAction}</strong>.
              </span>
            </div>
          </div>

          {/* Side-by-Side Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Record A */}
            <div
              onClick={() => setSelectedSurviving("A")}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedSurviving === "A"
                  ? "border-[#671021] bg-red-50/20 ring-2 ring-[#671021]/20 shadow-xs"
                  : "border-line bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-[#671021] uppercase">Record A (Master Candidate)</span>
                {selectedSurviving === "A" && <span className="px-2 py-0.5 rounded bg-[#671021] text-white text-[9px] font-bold">Surviving Record</span>}
              </div>
              <div className="space-y-1.5 font-mono text-[11.5px]">
                <div><span className="text-slate-400 font-sans">Product Name:</span> <strong>{candidate.recordA}</strong></div>
                <div><span className="text-slate-400 font-sans">SKU:</span> {candidate.skuA}</div>
                <div><span className="text-slate-400 font-sans">Brand:</span> {candidate.brand}</div>
                <div><span className="text-slate-400 font-sans">Category:</span> {candidate.category}</div>
                <div><span className="text-slate-400 font-sans">Barcode:</span> EAN-13 7891234567890</div>
                <div><span className="text-slate-400 font-sans">Publication State:</span> <span className="text-emerald-600 font-bold font-sans">Published</span></div>
              </div>
            </div>

            {/* Record B */}
            <div
              onClick={() => setSelectedSurviving("B")}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedSurviving === "B"
                  ? "border-[#671021] bg-red-50/20 ring-2 ring-[#671021]/20 shadow-xs"
                  : "border-line bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-[#671021] uppercase">Record B (Duplicate Candidate)</span>
                {selectedSurviving === "B" && <span className="px-2 py-0.5 rounded bg-[#671021] text-white text-[9px] font-bold">Surviving Record</span>}
              </div>
              <div className="space-y-1.5 font-mono text-[11.5px]">
                <div><span className="text-slate-400 font-sans">Product Name:</span> <strong>{candidate.recordB}</strong></div>
                <div><span className="text-slate-400 font-sans">SKU:</span> {candidate.skuB}</div>
                <div><span className="text-slate-400 font-sans">Brand:</span> {candidate.brand}</div>
                <div><span className="text-slate-400 font-sans">Category:</span> {candidate.category}</div>
                <div><span className="text-slate-400 font-sans">Barcode:</span> EAN-13 7891234567890</div>
                <div><span className="text-slate-400 font-sans">Publication State:</span> <span className="text-amber-600 font-bold font-sans">Draft</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-line bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              onResolve("Ignore Match");
              onClose();
            }}
            className="px-3 py-1.5 rounded border border-line text-[11px] font-bold text-slate-700 hover:bg-slate-100"
          >
            Ignore & Keep Separate
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onResolve(`Merge into Record ${selectedSurviving}`);
                onClose();
              }}
              className="px-4 py-1.5 rounded bg-[#671021] text-white text-[11px] font-bold hover:bg-[#520d1a] flex items-center gap-1.5 shadow-xs"
            >
              <GitMerge size={14} /> Merge into Record {selectedSurviving}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
