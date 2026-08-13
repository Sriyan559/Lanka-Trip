"use client";

import React from "react";
import { MinusCircle, ShieldCheck, Target, UserCheck, Scale, CheckCircle2, ArrowRight } from "lucide-react";
import { GOVERNANCE_ACCESS_DATA } from "@/data/ecosystem-modules/governanceAccessData";

export function PolicyDecisionFlow() {
  const getStepIcon = (type: string) => {
    switch (type) {
      case "deny":
        return <MinusCircle className="w-5 h-5 text-rose-600" />;
      case "security":
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case "scope":
        return <Target className="w-5 h-5 text-sky-600" />;
      case "role":
        return <UserCheck className="w-5 h-5 text-purple-600" />;
      case "conditional":
        return <Scale className="w-5 h-5 text-amber-600" />;
      case "approval":
        return <UserCheck className="w-5 h-5 text-orange-600" />;
      case "decision":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-slate-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "deny": return "bg-rose-50 border-rose-200";
      case "security": return "bg-emerald-50 border-emerald-200";
      case "scope": return "bg-sky-50 border-sky-200";
      case "role": return "bg-purple-50 border-purple-200";
      case "conditional": return "bg-amber-50 border-amber-200";
      case "approval": return "bg-orange-50 border-orange-200";
      case "decision": return "bg-emerald-50 border-emerald-200";
      default: return "bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
        <h4 className="text-xs font-bold text-slate-800">Policy Decision Flow</h4>
        <span className="text-[10px] text-slate-400 font-medium">Evaluation Pipeline</span>
      </div>

      <div className="flex items-center justify-between gap-1 overflow-x-auto py-2">
        {GOVERNANCE_ACCESS_DATA.decisionFlowSteps.map((step, idx) => (
          <React.Fragment key={step.step}>
            <div className="flex flex-col items-center text-center min-w-[100px] flex-1">
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center mb-1.5 shadow-xs ${getBgColor(step.type)}`}>
                {getStepIcon(step.type)}
              </div>
              <span className="text-[10.5px] font-extrabold text-slate-900 leading-tight block">
                {step.name}
              </span>
              <span className="text-[9px] text-slate-400 leading-tight block mt-0.5 max-w-[95px]">
                {step.description}
              </span>
            </div>

            {idx < GOVERNANCE_ACCESS_DATA.decisionFlowSteps.length - 1 && (
              <div className="shrink-0 text-slate-300 px-0.5">
                <ArrowRight size={12} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
