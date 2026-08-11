"use client";

import React from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export function ShipmentLifecycle() {
  const stages = [
    { num: 1, name: "Shipment Eligible", state: "completed", time: "May 25, 08:15 AM" },
    { num: 2, name: "Shipment Created", state: "completed", time: "May 25, 08:30 AM" },
    { num: 3, name: "Packages Validated", state: "completed", time: "May 25, 08:52 AM" },
    { num: 4, name: "Carrier Selected", state: "completed", time: "May 25, 09:12 AM" },
    { num: 5, name: "Carrier Assigned", state: "completed", time: "May 25, 09:30 AM" },
    { num: 6, name: "Pickup Requested", state: "completed", time: "May 25, 09:45 AM" },
    { num: 7, name: "Pickup Scheduled", state: "completed", time: "May 25, 10:00 AM" },
    { num: 8, name: "Carrier Arrived", state: "completed", time: "May 25, 10:30 AM" },
    { num: 9, name: "Handoff Confirmed", state: "completed", time: "May 25, 10:45 AM" },
    { num: 10, name: "Collected", state: "completed", time: "May 25, 11:00 AM" },
    { num: 11, name: "In Transit", state: "current", time: "May 26, 02:15 PM" },
    { num: 12, name: "Delivery Hub", state: "future" },
    { num: 13, name: "Out for Delivery", state: "future" },
    { num: 14, name: "Delivered", state: "future" },
    { num: 15, name: "Proof of Delivery", state: "future" },
    { num: 16, name: "COD Confirmed", state: "future" },
    { num: 17, name: "Reconciled", state: "future" },
    { num: 18, name: "Closed", state: "future" },
    { num: 19, name: "Archived", state: "future" },
  ];

  const exceptions = [
    { label: "Failed Delivery", color: "text-rose-700 bg-rose-50 border-rose-200" },
    { label: "Delivery Retry", color: "text-amber-700 bg-amber-50 border-amber-200" },
    { label: "Return to Origin", color: "text-purple-700 bg-purple-50 border-purple-200" },
    { label: "Lost", color: "text-rose-800 bg-rose-100 border-rose-300 font-bold" },
    { label: "Damaged", color: "text-rose-800 bg-rose-100 border-rose-300 font-bold" },
  ];

  return (
    <div className="space-y-2 text-[10px]">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider">
          Shipment Lifecycle
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

      {/* MAIN CONNECTED TIMELINE */}
      <div className="overflow-x-auto scrollbar-thin pb-2">
        <div className="flex items-start min-w-[1600px] justify-between px-2 pt-2 relative">
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

      {/* EXCEPTION OUTCOME BRANCH ROW AT BOTTOM */}
      <div className="pt-2 border-t border-dashed border-line flex items-center justify-center gap-3">
        <span className="text-[9px] font-bold text-muted uppercase flex items-center gap-1">
          <AlertTriangle size={10} className="text-rose-600" />
          Exception Branch Outcomes:
        </span>
        {exceptions.map((ex, i) => (
          <span key={i} className={`text-[8.5px] px-2 py-0.5 rounded border ${ex.color}`}>
            • {ex.label}
          </span>
        ))}
      </div>
    </div>
  );
}
