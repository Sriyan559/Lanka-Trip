"use client";

import React from "react";
import { CustomerFormFullData } from "@/types/customer-form";
import { AlertCircle, AlertTriangle, CheckCircle2, Lock, Save, Eye, ArrowRight, ShieldAlert, History } from "lucide-react";

interface CustomerOnboardingRightRailProps {
  data: CustomerFormFullData;
  showToast: (msg: string) => void;
  onSaveDraft: () => void;
  onValidate: () => void;
  onPreview: () => void;
  onSaveAndContinue: () => void;
  isSaving?: boolean;
}

export function CustomerOnboardingRightRail({
  data,
  showToast,
  onSaveDraft,
  onValidate,
  onPreview,
  onSaveAndContinue,
  isSaving = false,
}: CustomerOnboardingRightRailProps) {
  const { onboardingHealth, completenessMetrics, draftId, version, createdBy, lastAutosave } = data;

  const handleAction = (name: string) => {
    showToast(`Executed action: ${name}`);
  };

  return (
    <div className="flex flex-col gap-3.5 text-[11px] w-full">
      {/* SECTION A: Customer Onboarding Health */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Customer Onboarding Health
        </h4>

        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-100 mb-2.5">
          <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="18" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke="#d97706"
                strokeWidth="4"
                strokeDasharray="113"
                strokeDashoffset="20"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[13px] font-black text-ink font-mono">{onboardingHealth.score}</span>
          </div>

          <div className="flex flex-col text-[10px]">
            <span className="font-bold text-slate-800 text-[11.5px]">{onboardingHealth.score} / 100</span>
            <span className="font-bold text-amber-700">{onboardingHealth.statusText}</span>
          </div>
        </div>

        <div className="space-y-1 text-[9.5px]">
          {onboardingHealth.progressList.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">{item.label}</span>
              <div className="flex items-center gap-2 w-28">
                <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.pct >= 90 ? "bg-emerald-500" : item.pct >= 70 ? "bg-amber-500" : "bg-rose-500"}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="font-mono font-bold text-slate-800 text-[9px] w-6 text-right">{item.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION B: Required Fields */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Required Fields
        </h4>
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
          <div className="p-1.5 bg-emerald-50 rounded border border-emerald-200">
            <span className="text-emerald-800 font-bold block text-[12px]">{onboardingHealth.requiredCompleted}</span>
            <span className="text-emerald-700 font-sans text-[8.5px]">Completed</span>
          </div>
          <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-800 font-bold block text-[12px]">{onboardingHealth.requiredRemaining}</span>
            <span className="text-slate-600 font-sans text-[8.5px]">Remaining</span>
          </div>
          <div className="p-1.5 bg-rose-50 rounded border border-rose-200">
            <span className="text-rose-700 font-bold block text-[12px]">{onboardingHealth.requiredMissing}</span>
            <span className="text-rose-700 font-sans text-[8.5px]">Required Missing</span>
          </div>
        </div>
      </div>

      {/* SECTION C: Blocking Issues (3) */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[10.5px] font-bold text-rose-700 uppercase tracking-wider font-mono">
            Blocking Issues ({onboardingHealth.blockingIssuesList.length})
          </h4>
          <button onClick={() => handleAction("View All Blocking Issues")} className="text-[9px] font-bold text-[#671021] hover:underline cursor-pointer">View all</button>
        </div>
        <div className="space-y-1.5 text-[10px]">
          {onboardingHealth.blockingIssuesList.map((issue, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-rose-700 bg-rose-50/70 p-1.5 rounded border border-rose-200/60">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-200 text-rose-800 text-[8.5px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="font-semibold leading-tight">{issue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION D: Warnings (6) */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[10.5px] font-bold text-amber-800 uppercase tracking-wider font-mono">
            Warnings ({onboardingHealth.warningsList.length})
          </h4>
          <button onClick={() => handleAction("View All Warnings")} className="text-[9px] font-bold text-[#671021] hover:underline cursor-pointer">View all</button>
        </div>
        <div className="space-y-1 text-[10px]">
          {onboardingHealth.warningsList.map((warn, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-amber-900">
              <span className="text-amber-500 font-bold">•</span>
              <span>{warn}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION E: Duplicate Risk */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Duplicate Risk
        </h4>
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {onboardingHealth.duplicateRisk}
          </span>
          <button
            type="button"
            onClick={() => showToast("Duplicate comparison is not yet available.")}
            className="px-2.5 py-1 bg-white border border-line rounded text-[10px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            Compare
          </button>
        </div>
      </div>

      {/* SECTION F: Approval Readiness */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Approval Readiness
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Status</span>
            <span className="font-bold text-rose-600">{onboardingHealth.approvalReadiness.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Reviewer</span>
            <span className="font-semibold text-slate-800">{onboardingHealth.approvalReadiness.reviewer}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Approval Path</span>
            <span className="font-semibold text-slate-800 text-[9.5px]">{onboardingHealth.approvalReadiness.approvalPath}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Estimated SLA</span>
            <span className="font-mono text-slate-700">{onboardingHealth.approvalReadiness.estimatedSla}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Required documents</span>
            <span className="font-bold text-rose-600 font-mono">{onboardingHealth.approvalReadiness.requiredDocumentsMissing} missing</span>
          </div>
        </div>
      </div>

      {/* SECTION G: Autosave & Version */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Autosave & Version
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Draft ID</span>
            <span className="font-mono font-bold text-slate-800">{draftId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Last Autosave</span>
            <span className="font-mono text-slate-700">{lastAutosave}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Version</span>
            <span className="font-mono text-slate-700">{version}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Created By</span>
            <span className="font-bold text-slate-800">{createdBy}</span>
          </div>
        </div>
      </div>

      {/* SECTION H: Final Actions */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-2xs flex flex-col gap-1.5">
        <h4 className="text-[10.5px] font-bold text-ink uppercase tracking-wider font-mono mb-1">
          Final Actions
        </h4>

        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isSaving}
          className="w-full py-1.5 bg-white border border-line rounded text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-center disabled:opacity-50"
        >
          Save Draft
        </button>

        <button
          type="button"
          onClick={onValidate}
          className="w-full py-1.5 bg-white border border-line rounded text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-center"
        >
          Validate Customer
        </button>

        <button
          type="button"
          onClick={onPreview}
          className="w-full py-1.5 bg-white border border-line rounded text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-center"
        >
          Preview Customer
        </button>

        <button
          type="button"
          onClick={onSaveAndContinue}
          disabled={isSaving}
          className="w-full py-1.5 bg-[#671021] text-white rounded text-[11px] font-bold hover:bg-[#520d1a] transition-colors cursor-pointer text-center disabled:opacity-50"
        >
          Save & Continue
        </button>

        <button
          type="button"
          disabled
          className="w-full py-1.5 bg-slate-100 text-slate-400 border border-slate-200 rounded text-[11px] font-bold text-center cursor-not-allowed"
          title="Resolve blocking issues before submitting for approval"
        >
          Submit for Approval
        </button>
      </div>
    </div>
  );
}
