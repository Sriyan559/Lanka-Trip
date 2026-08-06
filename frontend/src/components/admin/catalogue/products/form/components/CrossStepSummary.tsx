"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { ProductStepId, WorkflowStepItem } from "@/types/productForm";

interface CrossStepSummaryProps {
  steps: WorkflowStepItem[];
  onSelectStep: (stepId: ProductStepId) => void;
}

export const CrossStepSummary: React.FC<CrossStepSummaryProps> = ({
  steps,
  onSelectStep,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-gray-900">Cross-Step Summary</h3>
        <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
          <span>View all step details</span>
          <ChevronRight size={12} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-3">
        {steps.map((step) => {
          const isComplete = step.completionPercent >= 88;
          const isBlocked = step.id === "review-readiness" && step.completionPercent < 60;
          const statusText = isBlocked ? "Blocked" : isComplete ? "Complete" : "Partial";

          return (
            <div
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className="border border-gray-200 rounded p-2.5 bg-gray-50/50 hover:border-gray-400 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-bold text-gray-500 truncate mb-1">{step.label}</div>
                <div
                  className={`text-[11px] font-bold mb-1.5 ${
                    isBlocked
                      ? "text-rose-600"
                      : isComplete
                      ? "text-emerald-700"
                      : "text-amber-600"
                  }`}
                >
                  {statusText}
                </div>
              </div>

              <div>
                <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden mb-1">
                  <div
                    className={`h-full rounded-full ${
                      isBlocked
                        ? "bg-rose-500"
                        : isComplete
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                    style={{ width: `${step.completionPercent}%` }}
                  />
                </div>
                <div className="text-[9.5px] font-bold text-gray-700 text-right">
                  {step.completionPercent}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
