"use client";

import React from "react";
import { ConflictAnalysisData } from "@/data/marketingWebApp.mock";
import { AlertTriangle } from "lucide-react";

interface PlacementConflictCardProps {
  conflict: ConflictAnalysisData;
}

export function PlacementConflictCard({ conflict }: PlacementConflictCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>Placement Priority & Conflict Analysis</span>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Zone Hierarchy</span>
            <span className="font-mono text-[11px] text-gray-800">{conflict.zoneHierarchy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Highest Priority</span>
            <span className="font-bold text-gray-900">{conflict.highestPriority}</span>
          </div>

          {conflict.hasConflict && conflict.conflictWarning ? (
            <div className="mt-2 p-2 bg-rose-50 border border-rose-200/80 rounded-lg text-rose-800 text-[11px] font-medium leading-tight">
              {conflict.conflictWarning}
            </div>
          ) : (
            <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200/80 rounded-lg text-emerald-800 text-[11px] font-medium">
              No active placement conflicts
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button
          onClick={() => {}}
          className="w-full py-1 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          Resolve Conflict
        </button>
      </div>
    </div>
  );
}
