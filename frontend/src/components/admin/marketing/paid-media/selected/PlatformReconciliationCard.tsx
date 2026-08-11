"use client";

import React from "react";

interface PlatformReconciliationCardProps {
  reconciliation: {
    spendVariancePercent: string;
    impressionVariancePercent: string;
    conversionVariancePercent: string;
    lastReconciled: string;
    reconciliationHealth: string;
  };
}

export function PlatformReconciliationCard({ reconciliation }: PlatformReconciliationCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Platform Reconciliation
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Spend Variance</span>
            <span className="text-xl font-extrabold text-emerald-700">
              {reconciliation.spendVariancePercent}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Impression Variance</span>
            <span className="font-mono text-[11px] text-gray-700">{reconciliation.impressionVariancePercent}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Conversion Variance</span>
            <span className="font-mono text-[11px] text-gray-700">{reconciliation.conversionVariancePercent}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Last Reconciled</span>
            <span className="text-gray-600 font-mono text-[11px]">{reconciliation.lastReconciled}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Reconciliation Health</span>
            <span className="font-bold text-emerald-700">{reconciliation.reconciliationHealth}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          Open Platform Reconciliation
        </button>
      </div>
    </div>
  );
}
