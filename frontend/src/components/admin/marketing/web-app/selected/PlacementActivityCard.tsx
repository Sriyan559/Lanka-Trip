"use client";

import React from "react";
import { PlacementActivityItem } from "@/data/marketingWebApp.mock";

interface PlacementActivityCardProps {
  activities: PlacementActivityItem[];
}

export function PlacementActivityCard({ activities }: PlacementActivityCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Recent Activity
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          {activities.map((act) => (
            <div key={act.id} className="text-[11px] pb-1 border-b border-gray-50 last:border-0">
              <div className="text-gray-400 font-mono">{act.time}</div>
              <div className="text-gray-800 font-medium">{act.activity}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Activity Log
        </button>
      </div>
    </div>
  );
}
