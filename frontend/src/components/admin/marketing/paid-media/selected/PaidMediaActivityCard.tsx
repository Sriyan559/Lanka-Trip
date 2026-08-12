"use client";

import React from "react";

interface PaidMediaActivityCardProps {
  activity: {
    activityCountLabel: string;
    latestActivity: string;
    timestamp: string;
    actor: string;
  };
}

export function PaidMediaActivityCard({ activity }: PaidMediaActivityCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Recent Paid Media Activity
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Activity Log</span>
            <span className="text-sm font-extrabold text-blue-700">
              {activity.activityCountLabel}
            </span>
          </div>

          <div className="pt-1 text-[11px]">
            <div className="text-gray-400 font-mono">{activity.timestamp}</div>
            <div className="text-gray-800 font-medium">{activity.latestActivity}</div>
          </div>
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
