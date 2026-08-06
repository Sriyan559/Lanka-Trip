"use client";

import React from "react";
import { AlertCircle, Send, CheckCircle2 } from "lucide-react";
import { FormBlockingIssue } from "@/types/productForm";

interface Step10ReviewReadinessProps {
  blockingIssues: FormBlockingIssue[];
  onSubmitApproval: () => void;
}

export const Step10ReviewReadiness: React.FC<Step10ReviewReadinessProps> = ({
  blockingIssues,
  onSubmitApproval,
}) => {
  const hasBlockers = blockingIssues.length > 0;

  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs space-y-4">
      <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">
        Step 10 — Review Readiness & Final Approval Checklist
      </h3>

      {hasBlockers ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded text-rose-900 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
            <AlertCircle size={18} className="text-rose-600" />
            <span>Product Master is Not Ready for Submission</span>
          </div>
          <p className="text-[11.5px] text-rose-800">
            There are {blockingIssues.length} unresolved blocking issues preventing approval submission. Please navigate to the indicated steps to resolve all blockers.
          </p>
        </div>
      ) : (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>All Readiness Checks Passed!</span>
          </div>
          <p className="text-[11.5px] text-emerald-800">
            This product master record satisfies all mandatory identity, compliance, and formulation requirements.
          </p>
          <button
            onClick={onSubmitApproval}
            className="h-9 px-4 rounded bg-[#741d35] text-white font-bold text-xs hover:bg-[#5c172a] flex items-center gap-1.5 shadow-2xs"
          >
            <Send size={14} />
            <span>Submit for Final Approval</span>
          </button>
        </div>
      )}
    </div>
  );
};
