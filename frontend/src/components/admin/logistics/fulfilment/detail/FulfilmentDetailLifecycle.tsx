"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function FulfilmentDetailLifecycle() {
  const stages = [
    { num: 1, name: "Fulfilment Created", state: "completed", time: "May 25 18:35" },
    { num: 2, name: "Order Validated", state: "completed", time: "May 25 18:37" },
    { num: 3, name: "Inventory Checked", state: "completed", time: "May 25 18:38" },
    { num: 4, name: "Reservation Created", state: "completed", time: "May 25 18:39" },
    { num: 5, name: "Allocation Completed", state: "completed", time: "May 25 18:40" },
    { num: 6, name: "Warehouse Confirmed", state: "completed", time: "May 25 18:42" },
    { num: 7, name: "Picking Started", state: "completed", time: "May 25 08:45" },
    { num: 8, name: "Picking Completed", state: "completed", time: "May 25 11:35" },
    { num: 9, name: "Packing Started", state: "completed", time: "May 25 11:40" },
    { num: 10, name: "Packing Completed", state: "completed", time: "May 25 12:05" },
    { num: 11, name: "Quality Check", state: "current", time: "May 25 12:15" },
    { num: 12, name: "Ready for Dispatch", state: "pending" },
    { num: 13, name: "Shipment Created", state: "pending" },
    { num: 14, name: "Handoff Ready", state: "pending" },
    { num: 15, name: "Fulfilment Completed", state: "pending" },
    { num: 16, name: "Closed", state: "pending" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line p-2.5 sm:p-3 shadow-xs space-y-2 text-[10px]">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider">
          Customer Fulfilment / Logistics Lifecycle
        </h4>
        <div className="flex items-center gap-3 text-[9px] text-muted font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" /> Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-600" /> In Progress
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-200 border border-gray-400" /> Pending
          </span>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin pb-2">
        <div className="flex items-start min-w-[1500px] justify-between px-2 pt-2 relative">
          {/* Connecting Line */}
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 z-0" />

          {stages.map((stage, idx) => {
            const isCompleted = stage.state === "completed";
            const isCurrent = stage.state === "current";

            return (
              <div key={idx} className="flex flex-col items-center z-10 w-[82px] flex-shrink-0 text-center space-y-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] shadow-xs transition-transform hover:scale-110 ${
                    isCompleted
                      ? "bg-emerald-600 text-white ring-2 ring-emerald-100"
                      : isCurrent
                      ? "bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse font-extrabold"
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
                    isCompleted ? "text-emerald-800 font-semibold" : isCurrent ? "text-blue-800 font-bold" : "text-muted"
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
