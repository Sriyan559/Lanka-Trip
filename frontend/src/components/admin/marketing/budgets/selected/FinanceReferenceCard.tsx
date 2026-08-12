"use client";

import React from "react";

interface FinanceReferenceCardProps {
  financeRef: {
    status: string;
    spendIntegration: string;
    reconciliation: string;
    workingCapitalImpact: string;
    cashFlowImpact: string;
  };
}

export function FinanceReferenceCard({ financeRef }: FinanceReferenceCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Finance Reference</span>
          <span className="flex items-center gap-1 font-bold text-emerald-700 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {financeRef.status}
          </span>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Marketing Spend Integration</span>
            <span className="font-bold text-emerald-700">{financeRef.spendIntegration}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Planning Finance Reconciliation</span>
            <span className="font-bold text-emerald-700">{financeRef.reconciliation}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Working Capital Impact</span>
            <span className="font-bold text-emerald-700">{financeRef.workingCapitalImpact}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Cash Flow Impact</span>
            <span className="font-bold text-emerald-700">{financeRef.cashFlowImpact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
