"use client";

import React from "react";
import { CustomerFormFullData } from "@/types/customer-form";
import { ShieldCheck, AlertCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { CrossStepSummary } from "./CrossStepSummary";

interface BottomCardProps {
  data: CustomerFormFullData;
  showToast: (msg: string) => void;
}

/* 1. Business Context Assignment Card */
export function CustomerBusinessContextCard({ data }: BottomCardProps) {
  const { businessContext } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#671021]" />
          <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Business Context Assignment
          </h4>
        </div>
        <div className="space-y-2 text-[10.5px]">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Business Unit</span>
            <span className="font-bold text-[#671021] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {businessContext.businessUnit}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Sales Channels</span>
            <span className="font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-[10px]">
              {businessContext.salesChannels}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Region</span>
            <span className="font-semibold text-slate-800">{businessContext.region}</span>
          </div>
          <div className="pt-1.5 border-t border-line/60">
            <span className="text-slate-400 font-mono text-[9.5px] uppercase block mb-1">Eligible Programs</span>
            <div className="flex flex-wrap gap-1.5 font-bold text-[9.5px]">
              {businessContext.eligiblePrograms.map((p) => (
                <span key={p} className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2. Validation & Duplicate Intelligence Card (100% Contained Layout) */
export function CustomerDuplicateIntelligenceCard({ data }: BottomCardProps) {
  const { duplicateIntelligence } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between overflow-hidden relative">
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <AlertCircle className="w-3.5 h-3.5 text-emerald-600" />
          <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Validation & Duplicate Intelligence
          </h4>
        </div>
        <div className="grid grid-cols-12 gap-3 items-center w-full">
          {/* Left Column: Circular Match Score Gauge (Fixed Containment) */}
          <div className="col-span-4 flex items-center justify-center min-w-0">
            <div className="validation-score-ring relative w-[76px] h-[76px] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 76 76" className="w-[76px] h-[76px] transform -rotate-90 block">
                <circle cx="38" cy="38" r="28" stroke="#e2e8f0" strokeWidth="5" fill="transparent" />
                <circle
                  cx="38"
                  cy="38"
                  r="28"
                  stroke="#059669"
                  strokeWidth="5"
                  strokeDasharray="176"
                  strokeDashoffset="25"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[14px] font-black text-ink font-mono block leading-none">
                  {duplicateIntelligence.matchScore}%
                </span>
                <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-tighter mt-0.5 block whitespace-nowrap">
                  Match Score
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Key-Value Findings List */}
          <div className="col-span-8 space-y-1.5 text-[10px] min-w-0">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Legal Name Match</span>
              <span className="font-bold text-emerald-600">{duplicateIntelligence.legalNameMatch}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Email Match</span>
              <span className="font-bold text-emerald-600">{duplicateIntelligence.emailMatch}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Phone Match</span>
              <span className="font-bold text-amber-600">{duplicateIntelligence.phoneMatch}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Risk Level</span>
              <span className="font-bold text-emerald-600">{duplicateIntelligence.riskLevel}</span>
            </div>
            <div className="flex justify-between items-center pt-1.5 border-t border-line/60">
              <span className="text-slate-500 font-medium">Validation Findings</span>
              <span className="font-mono font-bold text-slate-800">
                {duplicateIntelligence.validationFindingsPassed} of {duplicateIntelligence.validationFindingsTotal} passed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 3. Top Corrective Actions Card */
export function CustomerCorrectiveActionsCard({ data, showToast }: BottomCardProps) {
  const { correctiveActions } = data;
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono">
            Top Corrective Actions
          </h4>
        </div>
        <div className="space-y-2 text-[10.5px]">
          {correctiveActions.map((action) => (
            <div key={action.id} className="flex items-center justify-between p-1.5 bg-slate-50 rounded border border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[9.5px] font-bold flex items-center justify-center flex-shrink-0">
                  {action.id}
                </span>
                <span className="font-bold text-slate-800 text-[10px] truncate">{action.description}</span>
              </div>
              <button
                type="button"
                onClick={() => showToast(`Executing action: ${action.description}`)}
                className="text-[9.5px] font-bold text-amber-700 hover:underline cursor-pointer flex-shrink-0 ml-1"
              >
                Action
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => showToast("Opening All Validation Findings...")}
        className="mt-2 pt-1.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>View all findings</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

/* 4. Re-export Cross-Step Summary Card */
export function CustomerCrossStepSummary({ data }: { data: CustomerFormFullData }) {
  return <CrossStepSummary steps={data.workflowSteps} />;
}
