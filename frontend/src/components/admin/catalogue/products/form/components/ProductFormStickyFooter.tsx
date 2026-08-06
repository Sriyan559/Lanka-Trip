"use client";

import React from "react";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { WorkflowStepItem } from "@/types/productForm";

interface ProductFormStickyFooterProps {
  currentStep: WorkflowStepItem;
  totalSteps: number;
  overallPercent: number;
  autosaveText: string;
  blockingIssuesCount: number;
  hasBlockers: boolean;
  onCancel: () => void;
  onSaveDraft: () => void;
  onSaveAndContinue: () => void;
  onValidate: () => void;
  onPreview: () => void;
  onSubmitApproval: () => void;
}

export const ProductFormStickyFooter: React.FC<ProductFormStickyFooterProps> = ({
  currentStep,
  totalSteps,
  overallPercent,
  autosaveText,
  blockingIssuesCount,
  hasBlockers,
  onCancel,
  onSaveDraft,
  onSaveAndContinue,
  onValidate,
  onPreview,
  onSubmitApproval,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-6 py-3 shadow-xl flex flex-wrap items-center justify-between gap-4 sm:ml-64">
      {/* Left Info Group */}
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div>
          <div className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">
            STEP {currentStep.stepNumber} / {totalSteps}
          </div>
          <div className="text-sm font-bold text-gray-900 leading-tight">{currentStep.label}</div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-gray-200" />

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-500">
            Completeness: <span className="text-amber-600">{overallPercent}%</span>
          </span>
          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${overallPercent}%` }} />
          </div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-gray-200" />

        <div className="flex items-center gap-1.5 font-bold text-emerald-700 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{autosaveText}</span>
        </div>

        {blockingIssuesCount > 0 && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[11px]">
            <AlertCircle size={14} className="text-rose-600" />
            <span>{blockingIssuesCount} blocking issues</span>
          </div>
        )}
      </div>

      {/* Right Action Group */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onCancel}
          className="h-9 px-4 rounded bg-white border border-gray-300 text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
        >
          Cancel
        </button>

        <button
          onClick={onSaveDraft}
          className="h-9 px-4 rounded bg-white border border-gray-300 text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
        >
          Save Draft
        </button>

        <button
          onClick={onSaveAndContinue}
          className="h-9 px-5 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a] flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <span>Save & Continue</span>
          <ArrowRight size={14} />
        </button>

        <div className="hidden md:block w-px h-6 bg-gray-200" />

        <button
          onClick={onValidate}
          className="h-9 px-4 rounded bg-white border border-gray-300 text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
        >
          Validate
        </button>

        <button
          onClick={onPreview}
          className="h-9 px-4 rounded bg-white border border-gray-300 text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
        >
          Preview
        </button>

        <button
          onClick={onSubmitApproval}
          disabled={hasBlockers}
          className={`h-9 px-4 rounded text-[12px] font-bold transition-colors shadow-2xs ${
            hasBlockers
              ? "bg-rose-100/70 text-[#741d35]/60 cursor-not-allowed border border-rose-200"
              : "bg-[#741d35] text-white hover:bg-[#5c172a]"
          }`}
        >
          Submit for Approval
        </button>
      </div>
    </div>
  );
};
