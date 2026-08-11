"use client";

import React from "react";
import Link from "next/link";
import { BudgetExceptionItem } from "@/data/marketingBudgets.mock";
import { AlertTriangle } from "lucide-react";

interface ActiveBudgetExceptionsCardProps {
  exceptions: BudgetExceptionItem[];
}

export function ActiveBudgetExceptionsCard({ exceptions }: ActiveBudgetExceptionsCardProps) {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "Critical":
      case "High":
        return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
      case "Medium":
        return "bg-amber-50 text-amber-800 border-amber-200 font-semibold";
      default:
        return "bg-emerald-50 text-emerald-800 border-emerald-200 font-medium";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>Active Budget Exceptions</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Exception</th>
                <th className="py-1 text-center">Severity</th>
                <th className="py-1">Detected</th>
                <th className="py-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {exceptions.map((ex) => (
                <tr key={ex.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{ex.exception}</td>
                  <td className="py-1.5 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] border ${getSeverityBadge(ex.severity)}`}>
                      {ex.severity}
                    </span>
                  </td>
                  <td className="py-1.5 text-gray-500 font-mono text-[10px]">{ex.detected}</td>
                  <td className="py-1.5 text-center">
                    <Link
                      href="/admin/marketing/governance"
                      className="text-[10px] font-bold text-[#800020] hover:underline"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
