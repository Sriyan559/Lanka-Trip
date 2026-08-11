"use client";

import React from "react";
import { PolicyCheckResult } from "@/data/marketingGovernance.mock";

interface PolicyEvaluationCardProps {
  evaluations: PolicyCheckResult[];
}

export function PolicyEvaluationCard({ evaluations }: PolicyEvaluationCardProps) {
  const getResultStyle = (st: string) => {
    switch (st) {
      case "Pass":
        return "text-emerald-700 font-extrabold";
      case "Warn":
        return "text-amber-700 font-extrabold";
      case "Fail":
        return "text-rose-700 font-extrabold";
      case "Review":
      default:
        return "text-orange-700 font-extrabold";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Policy Evaluation
        </h4>

        <div className="mt-2 space-y-1 text-xs">
          {evaluations.map((item) => (
            <div key={item.ruleName} className="flex justify-between items-center text-[11px]">
              <span className="text-gray-600 font-medium">{item.ruleName}</span>
              <span className={getResultStyle(item.status)}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
