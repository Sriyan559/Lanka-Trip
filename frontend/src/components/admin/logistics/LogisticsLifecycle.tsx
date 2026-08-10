"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function LogisticsLifecycle() {
  const stages = [
    { num: 1, name: "Fulfilment Order Created", state: "completed", time: "May 25 18:36" },
    { num: 2, name: "Inventory Validated", state: "completed", time: "May 25 18:37" },
    { num: 3, name: "Inventory Allocated", state: "completed", time: "May 25 18:38" },
    { num: 4, name: "Warehouse Assigned", state: "completed", time: "May 25 18:40" },
    { num: 5, name: "Picking Started", state: "completed", time: "May 25 08:45" },
    { num: 6, name: "Picking Completed", state: "completed", time: "May 25 09:32" },
    { num: 7, name: "Packing Started", state: "completed", time: "May 25 09:55" },
    { num: 8, name: "Packing Completed", state: "completed", time: "May 25 10:15" },
    { num: 9, name: "Quality Check Passed", state: "completed", time: "May 25 10:30" },
    { num: 10, name: "Ready for Dispatch", state: "completed", time: "May 25 11:00" },
    { num: 11, name: "Carrier Pickup", state: "completed", time: "May 25 11:45" },
    { num: 12, name: "Pickup Scheduled", state: "completed", time: "May 25 12:00" },
    { num: 13, name: "Fulfilment to Carrier", state: "completed", time: "May 25 12:30" },
    { num: 14, name: "In Transit", state: "current", time: "May 26 08:00" },
    { num: 15, name: "Arrived at Delivery Hub", state: "future" },
    { num: 16, name: "Out for Delivery", state: "future" },
    { num: 17, name: "Delivered", state: "future" },
    { num: 18, name: "Proof of Delivery Captured", state: "future" },
    { num: 19, name: "Reconciled", state: "future" },
    { num: 20, name: "Closed", state: "future" },
    { num: 21, name: "Archived", state: "future" },
  ];

  return (
    <div className="space-y-2 text-[10px]">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider">
          Customer Fulfilment / Logistics Lifecycle
        </h4>
        <div className="flex items-center gap-3 text-[9px] text-muted font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" /> Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> In Progress
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-200 border border-gray-400" /> Pending
          </span>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin pb-2">
        <div className="flex items-start min-w-[1650px] justify-between px-2 pt-2 relative">
          {/* Connecting Line */}
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 z-0" />

          {stages.map((stage, idx) => {
            const isCompleted = stage.state === "completed";
            const isCurrent = stage.state === "current";

            return (
              <div key={idx} className="flex flex-col items-center z-10 w-[76px] flex-shrink-0 text-center space-y-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] shadow-xs transition-transform hover:scale-110 ${
                    isCompleted
                      ? "bg-emerald-600 text-white ring-2 ring-emerald-100"
                      : isCurrent
                      ? "bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse font-extrabold"
                      : "bg-gray-100 text-gray-400 border border-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={12} />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  ) : (
                    stage.num
                  )}
                </div>

                <div className="w-full px-0.5">
                  <span className={`text-[8.5px] leading-tight block truncate ${
                    isCompleted ? "text-emerald-800 font-semibold" : isCurrent ? "text-amber-800 font-bold" : "text-muted"
                  }`} title={stage.name}>
                    {stage.name}
                  </span>
                  {stage.time && (
                    <span className="text-[7.5px] text-muted font-mono block whitespace-nowrap mt-0.5">
                      {stage.time}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
