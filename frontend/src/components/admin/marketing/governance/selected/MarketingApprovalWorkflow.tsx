"use client";

import React from "react";
import { ApprovalWorkflowStep } from "@/data/marketingGovernance.mock";
import { CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";

interface MarketingApprovalWorkflowProps {
  workflowSteps: ApprovalWorkflowStep[];
}

export function MarketingApprovalWorkflow({ workflowSteps }: MarketingApprovalWorkflowProps) {
  const getStepIcon = (state: string) => {
    switch (state) {
      case "Approved":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "Not Required":
        return <Circle className="w-4 h-4 text-gray-300" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStepTextStyle = (state: string) => {
    switch (state) {
      case "Approved":
        return "text-emerald-700 font-bold";
      case "Pending":
        return "text-amber-700 font-bold";
      case "Not Required":
        return "text-gray-400 font-medium";
      default:
        return "text-gray-600 font-medium";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Marketing Approval Workflow
        </h4>

        {/* Stepper with arrows */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 overflow-x-auto py-2">
          {workflowSteps.map((step, idx) => {
            const isLast = idx === workflowSteps.length - 1;
            return (
              <React.Fragment key={step.role}>
                <div className="flex flex-col items-center text-center min-w-[90px]">
                  <span className="text-[11px] font-bold text-gray-900 mb-1">{step.role}</span>
                  <div className="flex items-center gap-1">
                    {getStepIcon(step.state)}
                    <span className={`text-[10px] ${getStepTextStyle(step.state)}`}>{step.state}</span>
                  </div>
                </div>
                {!isLast && <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
