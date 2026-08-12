"use client";

import React from "react";
import { ReallocationImpactData } from "@/data/marketingBudgets.mock";

interface ReallocationImpactCardProps {
  impact: ReallocationImpactData;
}

export function ReallocationImpactCard({ impact }: ReallocationImpactCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Reallocation Impact <span className="text-gray-400 font-normal">({impact.reallocationId})</span>
        </h4>

        <div className="mt-2 space-y-2 text-xs">
          <div className="p-2 bg-gray-50 rounded-lg space-y-1">
            <div className="flex justify-between font-semibold text-gray-800">
              <span>From ({impact.fromName})</span>
              <span className="text-rose-700 font-bold">After {impact.fromAfter}</span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-500">
              <span>Before: {impact.fromBefore}</span>
              <span>Reduced</span>
            </div>
          </div>

          <div className="p-2 bg-gray-50 rounded-lg space-y-1">
            <div className="flex justify-between font-semibold text-gray-800">
              <span>To ({impact.toName})</span>
              <span className="text-emerald-700 font-bold">After {impact.toAfter}</span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-500">
              <span>Before: {impact.toBefore}</span>
              <span>Increased</span>
            </div>
          </div>

          <div className="flex justify-between pt-1 text-[11px]">
            <span className="text-gray-500 font-medium">Residual Headroom After</span>
            <span className="font-bold text-emerald-700">{impact.residualHeadroom}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Approval Required</span>
            <span className="font-bold text-amber-700">{impact.approvalRequired ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
