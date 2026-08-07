"use client";

import React, { useState } from "react";
import { CustomerSegment, SelectedSegmentDetails } from "@/types/customer-segments";
import { Edit2, Users, AlertTriangle, Eye, ShieldCheck, CheckCircle2 } from "lucide-react";

interface SegmentSelectedPreviewPanelProps {
  details: SelectedSegmentDetails;
  showToast: (msg: string) => void;
}

export function SegmentSelectedPreviewPanel({ details, showToast }: SegmentSelectedPreviewPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const { segment, score, scoreStatus, ruleDetails, linkedGroups, consentRequirement, riskNote, nextRecalculation } = details;

  const subTabs = [
    { id: "overview", label: "Overview" },
    { id: "rules", label: "Rules" },
    { id: "members", label: "Members" },
    { id: "overlaps", label: "Overlaps" },
    { id: "conflicts", label: "Conflicts" },
    { id: "performance", label: "Performance" },
    { id: "consent", label: "Consent" },
    { id: "schedule", label: "Schedule" },
    { id: "versions", label: "Versions" },
    { id: "audit-history", label: "Audit History" },
  ];

  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs space-y-3">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-line">
        <div className="flex items-center gap-2">
          <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
            Selected Segment / <span className="text-[#671021]">Custom Preview</span>
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="text-slate-500 font-medium">Custom Preview Mode</span>
          <div className="w-8 h-4 bg-[#671021] rounded-full relative p-0.5 cursor-pointer">
            <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5" />
          </div>
        </div>
      </div>

      {/* Main Segment Identity Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-md border border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-ink">{segment.name}</h2>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono font-bold text-[10px] border border-emerald-200">
              Score {scoreStatus}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 mt-0.5">
            <span className="font-bold text-slate-700">{segment.type}</span>
            <span>Owner: <strong className="text-slate-800">{segment.owner}</strong></span>
            <span>Last Refreshed: {segment.lastRecalculated}</span>
            <span>Version: <strong className="font-mono text-slate-800">{segment.version}</strong></span>
            <span>Status: <strong className="text-emerald-600 font-bold">{segment.status}</strong></span>
          </div>
        </div>
      </div>

      {/* 6 Key Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        <div className="bg-slate-50 p-2 rounded border border-slate-100">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase block font-mono">Customers</span>
          <span className="text-sm font-black font-mono text-ink block mt-0.5">{segment.customerCount.toLocaleString()}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded border border-slate-100">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase block font-mono">New Members (30D)</span>
          <span className="text-sm font-black font-mono text-emerald-600 block mt-0.5">+{segment.newMembersCount.toLocaleString()}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded border border-slate-100">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase block font-mono">Removed Members (30D)</span>
          <span className="text-sm font-black font-mono text-rose-600 block mt-0.5">-{segment.removedMembersCount.toLocaleString()}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded border border-slate-100">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase block font-mono">Avg. LTV</span>
          <span className="text-sm font-black font-mono text-ink block mt-0.5">{segment.avgLtvFormatted}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded border border-slate-100">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase block font-mono">Order Frequency</span>
          <span className="text-sm font-black font-mono text-ink block mt-0.5">{segment.orderFrequency}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded border border-slate-100">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase block font-mono">Retention Rate</span>
          <span className="text-sm font-black font-mono text-slate-800 block mt-0.5">{segment.retentionRatePct}%</span>
        </div>
      </div>

      {/* Rules & Governance Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[10px] pt-1 border-t border-line/60">
        <div>
          <span className="font-bold text-slate-400 uppercase font-mono block mb-0.5">Rule Summary</span>
          <p className="text-slate-800 font-mono text-[10px] leading-relaxed">{ruleDetails}</p>
        </div>

        <div>
          <span className="font-bold text-slate-400 uppercase font-mono block mb-0.5">Linked Groups</span>
          <div className="flex flex-wrap gap-1">
            {linkedGroups.map((g) => (
              <span key={g} className="px-1.5 py-0.5 rounded bg-rose-50 text-[#671021] font-bold text-[9px] border border-rose-200">
                {g}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="font-bold text-slate-400 uppercase font-mono block mb-0.5">Consent Requirement</span>
          <span className="font-semibold text-emerald-700">{consentRequirement}</span>
        </div>

        <div>
          <span className="font-bold text-slate-400 uppercase font-mono block mb-0.5">Risk Note / Next Recalc</span>
          <span className="text-slate-700 block">{riskNote}</span>
          <span className="text-slate-400 font-mono text-[9px] block mt-0.5">Next: {nextRecalculation}</span>
        </div>
      </div>

      {/* Sub Tabs Bar */}
      <div className="border-b border-line flex items-center gap-1 overflow-x-auto scrollbar-thin pt-2">
        {subTabs.map((st) => (
          <button
            key={st.id}
            type="button"
            onClick={() => setActiveSubTab(st.id)}
            className={`px-2.5 py-1 text-[10px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeSubTab === st.id
                ? "text-[#671021] border-b-2 border-[#671021] bg-rose-50/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Action Footer Bar */}
      <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={() => showToast(`Editing rules for ${segment.name}...`)}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#671021] text-white rounded text-[11px] font-bold hover:bg-[#520d1a] transition-colors cursor-pointer"
        >
          <Edit2 className="w-3 h-3" />
          <span>Edit Rule</span>
        </button>

        <button
          type="button"
          onClick={() => showToast(`Viewing members of ${segment.name}...`)}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-line rounded text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Users className="w-3 h-3 text-slate-500" />
          <span>View Members</span>
        </button>

        <button
          type="button"
          onClick={() => showToast(`Resolving conflicts for ${segment.name}...`)}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-line rounded text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          <span>Resolve Conflict</span>
        </button>

        <button
          type="button"
          onClick={() => showToast(`Opening full segment workspace for ${segment.name}...`)}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-line rounded text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Eye className="w-3 h-3 text-slate-500" />
          <span>View Full Segment</span>
        </button>
      </div>
    </div>
  );
}
