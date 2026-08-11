"use client";

import React from "react";
import Link from "next/link";

interface EscalationRulesCardProps {
  activeRulesCount: number;
}

export function EscalationRulesCard({ activeRulesCount }: EscalationRulesCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex items-center justify-between gap-4">
      <div>
        <h4 className="text-xs font-bold text-gray-900">
          Escalation Rules Active — <span className="text-[#800020] font-extrabold">{activeRulesCount}</span>
        </h4>
        <p className="text-[11px] text-gray-500 mt-0.5">
          Automatic escalation policies active for overdue approvals, consent violations and critical policy blocks.
        </p>
      </div>

      <Link
        href="/admin/marketing/reports-audit"
        className="px-4 py-1.5 text-xs font-bold text-[#800020] bg-white hover:bg-rose-50 border border-[#800020] rounded-lg transition-colors whitespace-nowrap"
      >
        View Audit Trail
      </Link>
    </div>
  );
}
