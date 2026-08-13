"use client";

import React, { useState } from "react";
import { CustomerSegment, SelectedSegmentDetails } from "@/types/customer-segments";
import { Edit2, Users, AlertTriangle, Eye, ShieldCheck, CheckCircle2, Layers } from "lucide-react";

interface SegmentSelectedPreviewPanelProps {
  details: SelectedSegmentDetails | null;
  showToast: (msg: string) => void;
  onActionClick?: (action: string, segment: CustomerSegment) => void;
}

export function SegmentSelectedPreviewPanel({ details, showToast, onActionClick }: SegmentSelectedPreviewPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState("overview");

  if (!details || !details.segment) {
    return (
      <div className="bg-white border border-line rounded-lg p-6 shadow-2xs text-center flex flex-col items-center justify-center min-h-[300px] mb-4">

        <Layers size={36} className="text-slate-300 mb-2" />
        <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono mb-1">
          Selected Segment / Custom Preview
        </h3>
        <p className="text-[11px] text-slate-400 font-mono">
          No segments available to preview
        </p>
      </div>
    );
  }

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
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs space-y-3 mb-4">
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
              Score {scoreStatus !== null ? scoreStatus : "—"} ({score !== null ? score : "—"}/100)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 mt-0.5">
            <span className="font-bold text-slate-700">{segment.type !== null ? segment.type : "Uncategorized"}</span>
            <span>Owner: <strong className="text-slate-800">{segment.owner !== null ? segment.owner : "Unassigned"}</strong></span>
            <span>Last Refreshed: {segment.lastRecalculated !== null ? segment.lastRecalculated : "—"}</span>
            <span>Version: <strong className="font-mono text-slate-800">{segment.version !== null ? segment.version : "—"}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10.5px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {segment.status}
          </span>
        </div>
      </div>

      {/* 6 Preview Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        <div className="bg-slate-50 border border-slate-200/60 p-2 rounded text-center">
          <span className="text-[9.5px] font-bold text-slate-500 block uppercase font-mono">Customers</span>
          <span className="text-sm font-black text-ink font-mono">{segment.customerCount.toLocaleString()}</span>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 p-2 rounded text-center">
          <span className="text-[9.5px] font-bold text-slate-500 block uppercase font-mono">New Members</span>
          <span className="text-sm font-black text-emerald-700 font-mono">+{segment.newMembersCount}</span>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 p-2 rounded text-center">
          <span className="text-[9.5px] font-bold text-slate-500 block uppercase font-mono">Removed</span>
          <span className="text-sm font-black text-rose-700 font-mono">-{segment.removedMembersCount}</span>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 p-2 rounded text-center">
          <span className="text-[9.5px] font-bold text-slate-500 block uppercase font-mono">Avg. LTV</span>
          <span className="text-sm font-black text-ink font-mono">{segment.avgLtvFormatted}</span>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 p-2 rounded text-center">
          <span className="text-[9.5px] font-bold text-slate-500 block uppercase font-mono">Order Freq</span>
          <span className="text-sm font-black text-ink font-mono">{segment.orderFrequency}x</span>
        </div>
        <div className="bg-slate-50 border border-slate-200/60 p-2 rounded text-center">
          <span className="text-[9.5px] font-bold text-slate-500 block uppercase font-mono">Retention Rate</span>
          <span className="text-sm font-black text-emerald-700 font-mono">{segment.retentionRatePct}%</span>
        </div>
      </div>

      {/* Sub-tabs Row */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-line pb-1 text-[10.5px]">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-2.5 py-1 font-bold rounded-t-md transition-colors ${
              activeSubTab === tab.id
                ? "bg-[#671021] text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeSubTab === "overview" && (
        <>
          {/* Header Info */}
          <div className="mb-4">
            <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-1.5">
              Segment Overview
            </h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {details.description !== null ? details.description : "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10.5px] bg-slate-50/50 p-2.5 rounded-md border border-line">
            <div>
              <span className="font-bold text-slate-700 block uppercase font-mono mb-0.5">RULE SUMMARY</span>
              <p className="text-slate-600 leading-relaxed font-mono">{ruleDetails !== null ? ruleDetails : "—"}</p>
            </div>

            <div>
              <span className="font-bold text-slate-700 block uppercase font-mono mb-0.5">CONSENT REQUIREMENT</span>
              <p className="text-slate-600 leading-relaxed">{consentRequirement !== null ? consentRequirement : "Not configured"}</p>
            </div>

        <div>
          <span className="font-bold text-slate-700 block uppercase font-mono mb-0.5">LINKED GROUPS</span>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {linkedGroups.length > 0 ? (
              linkedGroups.map((g, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white border border-line text-slate-700 font-semibold">
                  {g}
                </span>
              ))
            ) : (
              <span className="text-slate-500 font-mono">No linked groups</span>
            )}
          </div>
        </div>

        <div>
          <span className="font-bold text-slate-700 block uppercase font-mono mb-0.5">RISK NOTE / NEXT RECALC</span>
          <p className="text-slate-600 leading-relaxed">
            {riskNote !== null ? riskNote : "—"} <br/>
            <span className="text-slate-400">Next Recalc: {nextRecalculation !== null ? nextRecalculation : "—"}</span>
          </p>
        </div>
      </div>
      </>
      )}

      {/* Bottom Actions Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-line">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (onActionClick) onActionClick("Edit", segment);
              else showToast(`Editing rules for ${segment.name}`);
            }}
            className="h-8 px-3 rounded bg-[#671021] hover:bg-[#520d1a] text-white font-bold text-[10.5px] flex items-center gap-1.5"
          >
            <Edit2 size={13} /> Edit Rule
          </button>
          <button
            onClick={() => showToast(`Viewing members for segment ${segment.name}`)}
            className="h-8 px-3 rounded bg-white border border-line text-slate-700 hover:bg-slate-50 font-bold text-[10.5px] flex items-center gap-1.5"
          >
            <Users size={13} /> View Members ({segment.customerCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast(`Resolving conflict for segment ${segment.name}`)}
            className="h-8 px-3 rounded bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 font-bold text-[10.5px] flex items-center gap-1.5"
          >
            <AlertTriangle size={13} /> Resolve Conflict
          </button>
          <button
            onClick={() => showToast(`Viewing full segment details for ${segment.name}`)}
            className="h-8 px-3 rounded bg-white border border-line text-slate-700 hover:bg-slate-50 font-bold text-[10.5px] flex items-center gap-1.5"
          >
            <Eye size={13} /> View Full Segment
          </button>
        </div>
      </div>
    </div>
  );
}
