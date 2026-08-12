"use client";

import React from "react";
import Link from "next/link";

interface AuditSummaryCardProps {
  audit: {
    period: string;
    budgetChanges: number;
    reallocations: number;
    exceptionsDetected: number;
    commitments: number;
    approvals: number;
  };
}

export function AuditSummaryCard({ audit }: AuditSummaryCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Audit Summary</span>
          <span className="text-[10px] text-gray-400 font-medium">({audit.period})</span>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Budget Changes</span>
            <span className="font-bold text-gray-900 font-mono">{audit.budgetChanges}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Reallocations</span>
            <span className="font-bold text-gray-900 font-mono">{audit.reallocations}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Exceptions Detected</span>
            <span className="font-bold text-rose-700 font-mono">{audit.exceptionsDetected}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Commitments</span>
            <span className="font-bold text-gray-900 font-mono">{audit.commitments}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Approvals</span>
            <span className="font-bold text-emerald-700 font-mono">{audit.approvals}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100 text-left">
        <Link
          href="/admin/marketing/reports-audit"
          className="text-xs font-bold text-[#800020] hover:underline cursor-pointer"
        >
          View Audit Trail →
        </Link>
      </div>
    </div>
  );
}
