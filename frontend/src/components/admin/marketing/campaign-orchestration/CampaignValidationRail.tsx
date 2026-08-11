"use client";

import React, { useState } from "react";
import { ValidationRailData, OrchestrationStepId } from "@/data/campaignOrchestration.mock";
import { ChevronDown, ChevronUp, AlertCircle, AlertTriangle, Clock } from "lucide-react";

export function CampaignValidationRail({
  validation,
  onTargetStepSelect,
}: {
  validation: ValidationRailData;
  onTargetStepSelect: (stepId: OrchestrationStepId) => void;
}) {
  const [openBlockers, setOpenBlockers] = useState(true);
  const [openWarnings, setOpenWarnings] = useState(true);
  const [openPending, setOpenPending] = useState(true);

  const { readinessScore, readinessLabel, statusText, summary, blockers, warnings, pending } =
    validation;

  return (
    <aside className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs font-sans flex flex-col gap-3 h-full min-h-[580px]">
      <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">
        Campaign Validation
      </h3>

      {/* Donut Score & Status Header */}
      <div className="flex items-center gap-3 bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
        <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-200"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-500"
              strokeDasharray={`${readinessScore}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xs font-extrabold text-gray-900 leading-none">
              {readinessScore}
            </span>
            <span className="text-[7px] font-bold text-gray-400">/100</span>
          </div>
        </div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-extrabold text-gray-900">{readinessLabel}</span>
            <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              Needs Attention
            </span>
          </div>
          <p className="text-[10px] text-gray-500 font-medium leading-tight">{statusText}</p>
        </div>
      </div>

      {/* KPI Summary Boxes Grid */}
      <div className="grid grid-cols-4 gap-1 text-center font-sans text-xs">
        <div className="bg-emerald-50/70 border border-emerald-100 p-1.5 rounded-lg flex flex-col items-center">
          <span className="text-emerald-800 font-extrabold text-xs">{summary.passed}</span>
          <span className="text-emerald-600 text-[9px] font-bold">Passed</span>
        </div>

        <div className="bg-amber-50/70 border border-amber-100 p-1.5 rounded-lg flex flex-col items-center">
          <span className="text-amber-800 font-extrabold text-xs">{summary.warnings}</span>
          <span className="text-amber-600 text-[9px] font-bold">Warnings</span>
        </div>

        <div className="bg-rose-50/70 border border-rose-100 p-1.5 rounded-lg flex flex-col items-center">
          <span className="text-rose-800 font-extrabold text-xs">{summary.blocker}</span>
          <span className="text-rose-600 text-[9px] font-bold">Blocker</span>
        </div>

        <div className="bg-sky-50/70 border border-sky-100 p-1.5 rounded-lg flex flex-col items-center">
          <span className="text-sky-800 font-extrabold text-xs">{summary.pending}</span>
          <span className="text-sky-600 text-[9px] font-bold">Pending</span>
        </div>
      </div>

      {/* ISSUES ACCORDION LIST */}
      <div className="flex flex-col gap-2 overflow-y-auto pr-0.5">
        {/* 1. BLOCKER SECTION */}
        {blockers.length > 0 && (
          <div className="border border-rose-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => setOpenBlockers(!openBlockers)}
              className="w-full bg-rose-50 px-2.5 py-1.5 flex items-center justify-between text-xs font-bold text-rose-800 border-b border-rose-200"
            >
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                <span className="uppercase text-[10px] tracking-tight">{blockers.length} BLOCKER</span>
              </div>
              {openBlockers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {openBlockers && (
              <div className="p-2.5 bg-rose-50/30 flex flex-col gap-2">
                {blockers.map((b) => (
                  <div key={b.id} className="flex flex-col gap-1 text-xs">
                    <span className="font-bold text-gray-900 text-[11px]">{b.title}</span>
                    <p className="text-[10.5px] text-gray-600 leading-snug">{b.description}</p>
                    <button
                      onClick={() => onTargetStepSelect(b.targetStep)}
                      className="text-[10.5px] font-bold text-rose-700 hover:underline text-left mt-0.5"
                    >
                      {b.actionText}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. WARNINGS SECTION */}
        {warnings.length > 0 && (
          <div className="border border-amber-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => setOpenWarnings(!openWarnings)}
              className="w-full bg-amber-50 px-2.5 py-1.5 flex items-center justify-between text-xs font-bold text-amber-800 border-b border-amber-200"
            >
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span className="uppercase text-[10px] tracking-tight">{warnings.length} WARNINGS</span>
              </div>
              {openWarnings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {openWarnings && (
              <div className="p-2.5 bg-amber-50/30 flex flex-col gap-2.5 divide-y divide-amber-100">
                {warnings.map((w, idx) => (
                  <div key={w.id} className={`flex flex-col gap-1 text-xs ${idx > 0 ? "pt-2" : ""}`}>
                    <span className="font-bold text-gray-900 text-[11px]">{w.title}</span>
                    <p className="text-[10.5px] text-gray-600 leading-snug">{w.description}</p>
                    <button
                      onClick={() => onTargetStepSelect(w.targetStep)}
                      className="text-[10.5px] font-bold text-amber-700 hover:underline text-left mt-0.5"
                    >
                      {w.actionText}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. PENDING SECTION */}
        {pending.length > 0 && (
          <div className="border border-sky-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => setOpenPending(!openPending)}
              className="w-full bg-sky-50 px-2.5 py-1.5 flex items-center justify-between text-xs font-bold text-sky-800 border-b border-sky-200"
            >
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span className="uppercase text-[10px] tracking-tight">{pending.length} PENDING</span>
              </div>
              {openPending ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {openPending && (
              <div className="p-2.5 bg-sky-50/30 flex flex-col gap-2">
                {pending.map((p) => (
                  <div key={p.id} className="flex flex-col gap-1 text-xs">
                    <span className="font-bold text-gray-900 text-[11px]">{p.title}</span>
                    <p className="text-[10.5px] text-gray-600 leading-snug">{p.description}</p>
                    <button
                      onClick={() => onTargetStepSelect(p.targetStep)}
                      className="text-[10.5px] font-bold text-sky-700 hover:underline text-left mt-0.5"
                    >
                      {p.actionText}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
