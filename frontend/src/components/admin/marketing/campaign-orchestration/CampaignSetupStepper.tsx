"use client";

import React from "react";
import { StepperItem, OrchestrationStepId } from "@/data/campaignOrchestration.mock";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCw,
  MinusCircle,
} from "lucide-react";

export function CampaignSetupStepper({
  steps,
  activeStep,
  readinessScore = 82,
  onStepSelect,
}: {
  steps: StepperItem[];
  activeStep: OrchestrationStepId;
  readinessScore?: number;
  onStepSelect: (stepId: OrchestrationStepId) => void;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs font-sans flex flex-col justify-between h-full min-h-[580px]">
      <div>
        <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2">
          Campaign Setup
        </h3>

        <div className="flex flex-col gap-1">
          {steps.map((st) => {
            const isActive = activeStep === st.id;

            return (
              <button
                key={st.id}
                onClick={() => onStepSelect(st.id)}
                className={`flex items-center justify-between p-2 rounded-lg text-xs font-medium transition-all text-left group ${
                  isActive
                    ? "bg-rose-50/70 border-l-3 border-[#800020] text-[#800020] font-bold shadow-2xs"
                    : "hover:bg-gray-50 text-gray-700 border-l-3 border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isActive
                        ? "bg-[#800020] text-white"
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                    }`}
                  >
                    {st.stepNumber}
                  </span>
                  <span className="truncate text-[11px] leading-tight">{st.label}</span>
                </div>

                {/* Status Badge */}
                <div className="shrink-0 ml-1">
                  {st.status === "Complete" && (
                    <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-emerald-700">
                      <span>Complete</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  )}

                  {st.status === "In Progress" && (
                    <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-[#800020]">
                      <span>In Progress</span>
                      <RotateCw className="w-3 h-3 text-[#800020] animate-spin" />
                    </span>
                  )}

                  {st.status === "Needs Attention" && (
                    <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-amber-700">
                      <span>Needs Attention</span>
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    </span>
                  )}

                  {st.status === "Optional" && (
                    <span className="inline-flex items-center gap-1 text-[9.5px] font-medium text-gray-400">
                      <span>Optional</span>
                      <MinusCircle className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  )}

                  {st.status === "Blocked" && (
                    <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-rose-700">
                      <span>Blocked</span>
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Readiness Progress Bar at Bottom */}
      <div className="border-t border-gray-100 pt-3 mt-3">
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="text-gray-700 font-bold">Campaign Readiness:</span>
          <span className="font-extrabold text-[#800020]">{readinessScore}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#800020] h-full rounded-full transition-all"
            style={{ width: `${readinessScore}%` }}
          />
        </div>
      </div>
    </div>
  );
}
