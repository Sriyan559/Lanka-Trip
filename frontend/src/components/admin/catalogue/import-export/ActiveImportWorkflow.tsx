"use client";

import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { CatalogueDataJob } from "@/types/importExport";

interface ActiveImportWorkflowProps {
  job: CatalogueDataJob | null;
  activeStage: number;
  onSelectStage: (stage: number) => void;
}

export function ActiveImportWorkflow({
  job,
  activeStage,
}: ActiveImportWorkflowProps) {
  const steps = [
    { num: 1, label: "Select Import Type" },
    { num: 2, label: "Upload File" },
    { num: 3, label: "File Inspection" },
    { num: 4, label: "Field Mapping" },
    { num: 5, label: "Validation" },
    { num: 6, label: "Duplicate Review" },
    { num: 7, label: "Change Preview" },
    { num: 8, label: "Approval" },
    { num: 9, label: "Execute" },
    { num: 10, label: "Reconcile" },
  ];

  if (!job) return <div className="bg-white border border-line rounded-lg p-4 shadow-sm mb-6"><h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">Active Import / Export Pipeline</h3><p className="mt-3 text-[11px] text-muted">No active operations.</p></div>;

  return (
    <div className="bg-white border border-line rounded-lg p-4 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
            Active Import Workflow [{job.id}]
          </h3>
          <p className="text-[11px] text-muted font-medium mt-0.5">
            Step {activeStage} of 10 — {steps[activeStage - 1]?.label}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-bold text-[#671021]">
          <span>Source: {job.source}</span>
          <span>•</span>
          <span>Records: {job.recordsFormatted}</span>
        </div>
      </div>

      {/* 10-step Horizontal Stepper */}
      <div className="overflow-x-auto scrollbar-thin py-2">
        <div className="flex items-center min-w-[850px] justify-between relative px-2">
          {/* Connector Bar Behind */}
          <div className="absolute left-6 right-6 top-3 h-0.5 bg-slate-200 z-0" />

          {steps.map((step) => {
            const isCompleted = step.num < activeStage;
            const isActive = step.num === activeStage;

            return (
              <div
                key={step.num}
                className="flex flex-col items-center gap-1.5 relative z-10 group"
              >
                {/* Circle Icon */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shadow-xs ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isActive
                      ? "bg-[#671021] text-white ring-4 ring-red-100"
                      : "bg-white border border-slate-300 text-slate-500 hover:border-slate-400"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={13} /> : step.num}
                </div>

                {/* Step Label */}
                <span
                  className={`text-[10px] font-bold max-w-[75px] text-center leading-tight transition-colors ${
                    isActive
                      ? "text-[#671021]"
                      : isCompleted
                      ? "text-slate-700 font-semibold"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
