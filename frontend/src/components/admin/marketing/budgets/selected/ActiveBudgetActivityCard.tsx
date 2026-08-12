"use client";

import React from "react";

interface ActiveBudgetActivityCardProps {
  activityList: Array<{ id: string; time: string; event: string }>;
}

export function ActiveBudgetActivityCard({ activityList }: ActiveBudgetActivityCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Active Budget Activity
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          {activityList.map((item) => (
            <div key={item.id} className="text-[11px] pb-1 border-b border-gray-50 last:border-0">
              <div className="text-gray-700 font-semibold">{item.event}</div>
              <div className="text-gray-400 font-mono text-[10px]">{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100 text-left">
        <button className="text-xs font-bold text-[#800020] hover:underline cursor-pointer">
          View All Activity →
        </button>
      </div>
    </div>
  );
}
