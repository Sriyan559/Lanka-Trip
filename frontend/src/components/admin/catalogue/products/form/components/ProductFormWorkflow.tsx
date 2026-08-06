"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { ProductStepId, WorkflowStepItem } from "@/types/productForm";

interface ProductFormWorkflowProps {
  steps: WorkflowStepItem[];
  activeStepId: ProductStepId;
  onSelectStep: (stepId: ProductStepId) => void;
}

export const ProductFormWorkflow: React.FC<ProductFormWorkflowProps> = ({
  steps,
  activeStepId,
  onSelectStep,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-2xs mb-4">
      {steps.map((step) => {
        const isActive = activeStepId === step.id;
        const isComplete = step.status === "complete";

        return (
          <button
            key={step.id}
            onClick={() => onSelectStep(step.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11.5px] font-bold shrink-0 transition-all ${
              isActive
                ? "bg-[#741d35] text-white shadow-2xs"
                : isComplete
                ? "text-emerald-700 hover:bg-emerald-50"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            {isComplete && !isActive ? (
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
            ) : (
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                  isActive
                    ? "bg-white text-[#741d35]"
                    : "border border-gray-400 text-gray-600"
                }`}
              >
                {step.stepNumber}
              </div>
            )}
            <span>{step.label}</span>
          </button>
        );
      })}
    </div>
  );
};
