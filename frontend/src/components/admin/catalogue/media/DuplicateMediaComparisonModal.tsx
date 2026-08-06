"use client";

import React from "react";
import { X, Copy, CheckCircle, ArrowRightLeft } from "lucide-react";
import { MediaDuplicateCandidate } from "@/types/mediaManagement";

interface CompareModalProps {
  isOpen: boolean;
  candidate: MediaDuplicateCandidate | null;
  onClose: () => void;
  onResolve: (action: string) => void;
}

export function DuplicateMediaComparisonModal({
  isOpen,
  candidate,
  onClose,
  onResolve,
}: CompareModalProps) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl border border-line overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-rose-700">
              <Copy size={14} />
              <span>Duplicate Candidate Similarity Score: {candidate.confidenceScore}%</span>
            </div>
            <h2 className="text-base font-extrabold text-ink tracking-tight">Compare Duplicate Assets</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-ink rounded-md hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="p-6 grid grid-cols-2 gap-6 text-[12px]">
          {/* Left: Original Asset */}
          <div className="border border-line rounded-lg p-4 bg-slate-50/50 flex flex-col gap-3">
            <div className="flex items-center justify-between font-bold">
              <span className="text-[#671021] font-mono">{candidate.originalId}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">Original</span>
            </div>
            <div className="w-full h-40 rounded border border-line bg-white overflow-hidden">
              <img src={candidate.originalThumbnail} alt={candidate.originalName} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1 text-[11px]">
              <span className="font-bold text-ink">{candidate.originalName}</span>
              <span className="text-muted">{candidate.linkedEntity}</span>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-line font-mono text-[10px]">
                <div><span className="text-muted font-sans block">Size</span><span className="font-bold">{candidate.originalSize}</span></div>
                <div><span className="text-muted font-sans block">Res</span><span className="font-bold">{candidate.originalRes}</span></div>
                <div><span className="text-muted font-sans block">Quality</span><span className="font-bold text-emerald-600">{candidate.qualityScore}/100</span></div>
              </div>
            </div>
          </div>

          {/* Right: Duplicate Candidate */}
          <div className="border border-line rounded-lg p-4 bg-rose-50/20 flex flex-col gap-3">
            <div className="flex items-center justify-between font-bold">
              <span className="text-rose-700 font-mono">{candidate.id}</span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px]">Duplicate</span>
            </div>
            <div className="w-full h-40 rounded border border-line bg-white overflow-hidden">
              <img src={candidate.duplicateThumbnail} alt={candidate.duplicateName} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1 text-[11px]">
              <span className="font-bold text-ink">{candidate.duplicateName}</span>
              <span className="text-muted">{candidate.linkedEntity}</span>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-line font-mono text-[10px]">
                <div><span className="text-muted font-sans block">Size</span><span className="font-bold">{candidate.duplicateSize}</span></div>
                <div><span className="text-muted font-sans block">Res</span><span className="font-bold">{candidate.duplicateRes}</span></div>
                <div><span className="text-muted font-sans block">Quality</span><span className="font-bold text-amber-600">{candidate.duplicateQualityScore}/100</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="px-6 py-4 border-t border-line bg-slate-50 flex items-center justify-between gap-3 text-[12px]">
          <button
            onClick={() => { onResolve("Keep Both"); onClose(); }}
            className="h-9 px-4 rounded border border-line bg-white font-semibold text-slate-700 hover:bg-slate-100"
          >
            Keep Both
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { onResolve("Merge Metadata"); onClose(); }}
              className="h-9 px-4 rounded border border-line bg-white font-bold text-sky-700 hover:bg-sky-50 flex items-center gap-1.5"
            >
              <ArrowRightLeft size={14} /> Merge Metadata
            </button>
            <button
              onClick={() => { onResolve("Archive Duplicate"); onClose(); }}
              className="h-9 px-5 rounded bg-[#671021] text-white font-bold hover:bg-[#520c1a] flex items-center gap-1.5"
            >
              <CheckCircle size={14} /> Keep Original & Archive Duplicate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
