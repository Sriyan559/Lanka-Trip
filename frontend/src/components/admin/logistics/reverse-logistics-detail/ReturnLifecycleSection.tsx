"use client";

import React from "react";
import { StatusTimeline, TimelineStep } from "../shared/StatusTimeline";
import { ReturnCase } from "@/types/logistics/reverseLogistics";
import { AlertCircle } from "lucide-react";

interface ReturnLifecycleSectionProps {
  returnCase: ReturnCase;
}

const EXCEPTION_BRANCHES = [
  { id: "EX-1", label: "Collection Failed" },
  { id: "EX-2", label: "Customer Unavailable" },
  { id: "EX-3", label: "Carrier Failure" },
  { id: "EX-4", label: "Lost in Reverse Transit" },
  { id: "EX-5", label: "Damaged in Reverse Transit" },
  { id: "EX-6", label: "Authenticity Review" },
  { id: "EX-7", label: "Compliance Escalation" },
  { id: "EX-8", label: "Supplier Dispute" },
];

export function ReturnLifecycleSection({ returnCase }: ReturnLifecycleSectionProps) {
  const steps: TimelineStep[] = (returnCase.lifecycleTimeline || []).map((st) => ({
    label: st.stage,
    timestamp: st.timestamp,
    status: st.completed ? (st.current ? "current" : "completed") : "pending",
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-3">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
          Return / Reverse Logistics Lifecycle
        </h3>
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
          Current State: In Transit
        </span>
      </div>

      {/* Main 20 Workflow Stages Timeline */}
      <StatusTimeline steps={steps} />

      {/* Exception Branches (Potential) Row */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1.5">
        <div className="flex items-center gap-1 text-rose-700 font-bold text-[10.5px]">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Exception Branches (Potential):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {EXCEPTION_BRANCHES.map((ex) => (
            <span
              key={ex.id}
              className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-medium px-2 py-0.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              {ex.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
