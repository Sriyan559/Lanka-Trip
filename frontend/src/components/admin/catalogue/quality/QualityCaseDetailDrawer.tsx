"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertTriangle, Clock, GitMerge, Send, ShieldAlert } from "lucide-react";
import { CatalogueQualityIssue } from "@/types/catalogueQuality";

interface QualityCaseDetailDrawerProps {
  isOpen: boolean;
  issue: CatalogueQualityIssue | null;
  onClose: () => void;
  onOpenCompareDuplicate: () => void;
  showToast: (msg: string) => void;
}

export function QualityCaseDetailDrawer({
  isOpen,
  issue,
  onClose,
  onOpenCompareDuplicate,
  showToast,
}: QualityCaseDetailDrawerProps) {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<string[]>([
    "Initial automated quality scanner flagged 96% similarity score.",
    "Assigned to Elena Vance for manual review.",
  ]);

  if (!isOpen || !issue) return null;

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    setNotes((prev) => [...prev, noteText]);
    setNoteText("");
    showToast("Added note to quality case.");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl border-l border-line flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-[#671021] text-[13px]">{issue.caseId}</span>
              <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold text-[9.5px] border border-rose-200">
                {issue.severity} Severity
              </span>
            </div>
            <h2 className="text-base font-extrabold text-ink">{issue.entityName}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-500">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 text-[12px]">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div><span className="text-slate-400 font-medium">Issue Type:</span> <strong className="text-slate-800 block">{issue.issueType}</strong></div>
            <div><span className="text-slate-400 font-medium">Status:</span> <strong className="text-amber-700 block">{issue.status}</strong></div>
            <div><span className="text-slate-400 font-medium">SKU / Public ID:</span> <strong className="font-mono text-slate-800 block">{issue.sku} / {issue.publicId}</strong></div>
            <div><span className="text-slate-400 font-medium">Brand & Category:</span> <strong className="text-slate-800 block">{issue.brand} ({issue.category})</strong></div>
            <div><span className="text-slate-400 font-medium">Assigned Owner:</span> <strong className="text-slate-800 block">{issue.owner}</strong></div>
            <div><span className="text-slate-400 font-medium">SLA Timer:</span> <strong className="font-mono text-rose-600 block">{issue.sla}</strong></div>
          </div>

          {/* Description & Evidence */}
          <div className="space-y-2">
            <h4 className="font-bold text-ink text-[12px]">Issue Description & Evidence</h4>
            <p className="p-3 bg-white border border-line rounded text-slate-700 leading-relaxed">
              {issue.description || "High similarity candidate detected against primary catalog."}
            </p>
            {issue.evidence && (
              <div className="p-3 bg-amber-50/50 border border-amber-200 rounded text-amber-900 text-[11.5px]">
                <strong>Evidence Payload:</strong> {issue.evidence}
              </div>
            )}
          </div>

          {/* Timeline & Notes */}
          <div className="space-y-2">
            <h4 className="font-bold text-ink text-[12px]">Activity Notes</h4>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {notes.map((n, idx) => (
                <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-100 text-[11px] text-slate-700">
                  {n}
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Add audit note or comment..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="flex-1 h-8 px-3 rounded border border-line text-[11.5px]"
              />
              <button
                onClick={handleAddNote}
                className="h-8 px-3 rounded bg-[#671021] text-white font-bold text-[11px] flex items-center gap-1 shadow-xs"
              >
                <Send size={12} /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-line bg-slate-50 flex items-center justify-between">
          {issue.issueType.includes("Duplicate") ? (
            <button
              onClick={() => {
                onOpenCompareDuplicate();
                onClose();
              }}
              className="h-9 px-4 rounded bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520d1a] flex items-center gap-1.5 shadow-sm"
            >
              <GitMerge size={14} /> Compare & Merge
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                showToast(`Escalated case ${issue.caseId}`);
                onClose();
              }}
              className="h-9 px-3 rounded border border-rose-200 text-rose-700 text-[12px] font-bold hover:bg-rose-50"
            >
              Escalate Case
            </button>
            <button
              onClick={() => {
                showToast(`Resolved quality case ${issue.caseId}`);
                onClose();
              }}
              className="h-9 px-4 rounded bg-emerald-600 text-white text-[12px] font-bold hover:bg-emerald-700 flex items-center gap-1 shadow-xs"
            >
              <CheckCircle2 size={14} /> Mark Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
