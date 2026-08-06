"use client";

import React from "react";
import {
  ShieldAlert,
  AlertTriangle,
  ChevronRight,
  Save,
  CheckCircle,
  Play,
  Send,
  X,
  FileCheck,
} from "lucide-react";
import { ProductFormMode, ProductStepId, FormBlockingIssue } from "@/types/productForm";
import { CATEGORY_READINESS_METRICS } from "@/data/productForm.mock";

interface ProductReadinessSidebarProps {
  mode: ProductFormMode;
  readinessScore: number;
  completedFields: number;
  remainingFields: number;
  missingRequired: number;
  blockingIssues: FormBlockingIssue[];
  draftId: string;
  recordVersion: string;
  lastAutosavedTime: string;
  createdBy: string;
  onSelectStep: (stepId: ProductStepId) => void;
  onFixIssue: (stepId: ProductStepId) => void;
  onCompareCandidates: () => void;
  onSaveDraft: () => void;
  onValidate: () => void;
  onPreview: () => void;
  onSubmitApproval: () => void;
  onCancel: () => void;
}

export const ProductReadinessSidebar: React.FC<ProductReadinessSidebarProps> = ({
  mode,
  readinessScore,
  completedFields,
  remainingFields,
  missingRequired,
  blockingIssues,
  draftId,
  recordVersion,
  lastAutosavedTime,
  createdBy,
  onSelectStep,
  onFixIssue,
  onCompareCandidates,
  onSaveDraft,
  onValidate,
  onPreview,
  onSubmitApproval,
  onCancel,
}) => {
  const hasBlockers = blockingIssues.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {/* A. Product Readiness Score Card */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-3">Validation & Readiness</h3>

        <div className="flex items-center justify-around py-2 border-b border-gray-100 mb-3">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-500"
                strokeDasharray={`${readinessScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-black text-gray-900 leading-none">{readinessScore}</span>
              <span className="text-[9px] text-gray-400 font-semibold">/100</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Product Readiness</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 w-fit">
              Incomplete
            </span>
          </div>
        </div>

        {/* Category progress metrics */}
        <div className="space-y-1.5 mb-3">
          {CATEGORY_READINESS_METRICS.map((m, i) => (
            <div
              key={i}
              onClick={() => onSelectStep(m.stepId)}
              className="flex items-center justify-between text-[10.5px] cursor-pointer hover:bg-gray-50 p-0.5 rounded transition-colors"
            >
              <span className="text-gray-600 truncate max-w-[110px]">{m.category}</span>
              <div className="flex-1 h-1 bg-gray-100 rounded mx-2 overflow-hidden">
                <div
                  className={`h-full rounded ${
                    m.percent >= 90 ? "bg-emerald-500" : m.percent >= 70 ? "bg-amber-500" : "bg-rose-500"
                  }`}
                  style={{ width: `${m.percent}%` }}
                />
              </div>
              <span className="font-bold text-gray-900 text-[10px]">{m.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* B. Required Fields Summary */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2.5">Required Fields</h3>
        <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 p-2 rounded text-[10.5px]">
          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-semibold">Completed</span>
            <span className="font-extrabold text-emerald-600 text-sm">{completedFields}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-semibold">Remaining</span>
            <span className="font-extrabold text-blue-600 text-sm">{remainingFields}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-semibold">Missing</span>
            <span className="font-extrabold text-rose-600 text-sm">{missingRequired}</span>
          </div>
        </div>
      </div>

      {/* C. Blocking Issues */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-gray-900">Blocking Issues ({blockingIssues.length})</h3>
          <button className="text-[11px] font-semibold text-[#741d35] hover:underline">View all &rarr;</button>
        </div>

        <div className="space-y-2 text-[11px]">
          {blockingIssues.map((issue) => (
            <div key={issue.id} className="p-2 rounded bg-rose-50/70 border border-rose-100 flex items-start justify-between gap-1">
              <div className="flex items-start gap-1.5">
                {issue.severity === "High" ? (
                  <ShieldAlert size={14} className="text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-gray-900">{issue.description}</div>
                  <span
                    className={`text-[9px] font-bold px-1 rounded ${
                      issue.severity === "High" ? "bg-rose-200 text-rose-800" : "bg-amber-200 text-amber-800"
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onFixIssue(issue.targetStep)}
                className="px-2 py-0.5 rounded bg-white border border-rose-300 text-[#741d35] font-bold text-[10px] hover:bg-rose-50 shrink-0"
              >
                {issue.actionLabel}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* D. Duplicate Risk */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-gray-900">Duplicate Risk</h3>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            Low Risk
          </span>
        </div>
        <div className="flex justify-between text-[11px] text-gray-600 mb-2">
          <span>Barcode Match</span>
          <span className="font-bold text-gray-900">None</span>
        </div>
        <button
          onClick={onCompareCandidates}
          className="w-full py-1.5 rounded border border-gray-300 text-center font-bold text-[#741d35] text-[11px] hover:bg-gray-50"
        >
          Compare Candidates
        </button>
      </div>

      {/* E. Approval Readiness */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Approval Readiness</h3>
        <div className="space-y-1.5 text-[11.5px]">
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="font-bold text-rose-600">Not ready for submission</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Reviewer</span>
            <span className="text-gray-700">Not assigned</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Approval Path</span>
            <span className="text-gray-800 font-semibold">Standard Product Approval</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated SLA</span>
            <span className="text-gray-800">2 business days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Required Documents</span>
            <span className="font-bold text-rose-600">2 missing</span>
          </div>
        </div>
      </div>

      {/* F. Autosave & Version */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Autosave & Version</h3>
        <div className="space-y-1.5 text-[11.5px]">
          <div className="flex justify-between">
            <span className="text-gray-500">Draft ID</span>
            <span className="font-mono font-bold text-gray-800">{draftId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Record Version</span>
            <span className="font-bold text-gray-800">{recordVersion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Autosaved</span>
            <span className="text-gray-700 text-[10.5px]">{lastAutosavedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Created By</span>
            <span className="font-semibold text-gray-800">{createdBy}</span>
          </div>
        </div>
      </div>

      {/* G. Final Actions */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col gap-2">
        <h3 className="text-xs font-bold text-gray-900 mb-1">Final Actions</h3>

        <button
          onClick={onSaveDraft}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Save size={14} className="text-gray-500" />
          <span>Save Draft</span>
        </button>

        <button
          onClick={onValidate}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
        >
          <CheckCircle size={14} className="text-gray-500" />
          <span>Validate Product</span>
        </button>

        <button
          onClick={onPreview}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Play size={14} className="text-gray-500" />
          <span>Preview Product</span>
        </button>

        <button
          onClick={onSubmitApproval}
          disabled={hasBlockers}
          className={`h-9 px-3.5 rounded text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors ${
            hasBlockers
              ? "bg-rose-100/70 text-[#741d35]/60 cursor-not-allowed border border-rose-200"
              : "bg-[#741d35] text-white hover:bg-[#5c172a]"
          }`}
        >
          <Send size={14} />
          <span>Submit for Approval</span>
        </button>

        {hasBlockers && (
          <div className="text-[10.5px] text-center text-rose-600 font-semibold italic mt-0.5">
            Resolve {blockingIssues.length} blocking issues before submission.
          </div>
        )}

        <button
          onClick={onCancel}
          className="h-9 px-3.5 rounded border border-rose-200 bg-rose-50 text-[12px] font-semibold text-rose-700 hover:bg-rose-100 flex items-center justify-center gap-1.5 transition-colors mt-1"
        >
          <X size={14} />
          <span>Cancel Changes</span>
        </button>
      </div>
    </div>
  );
};
