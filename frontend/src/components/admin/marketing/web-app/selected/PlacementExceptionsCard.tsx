"use client";

import React from "react";
import { PlacementExceptionItem } from "@/data/marketingWebApp.mock";

interface PlacementExceptionsCardProps {
  exceptions: PlacementExceptionItem[];
}

export function PlacementExceptionsCard({ exceptions }: PlacementExceptionsCardProps) {
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
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Placement Exceptions
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          {exceptions.map((ex) => (
            <div key={ex.id} className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">{ex.exception}</span>
              <span
                className={`inline-block px-1.5 py-0.5 rounded text-[10px] border ${getSeverityBadge(
                  ex.severity
                )}`}
              >
                {ex.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View All Exceptions
        </button>
      </div>
    </div>
  );
}
