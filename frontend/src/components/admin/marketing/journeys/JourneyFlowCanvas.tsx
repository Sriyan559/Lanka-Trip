"use client";

import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

export function JourneyFlowCanvas() {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs font-sans overflow-x-auto no-scrollbar">
      {/* Flow Canvas Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-1 mb-2">
        <h3 className="text-[10.5px] font-bold text-gray-900 uppercase tracking-tight">
          JOURNEY FLOW
        </h3>
        <span className="text-[9.5px] text-emerald-700 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          System Status: Optimal
        </span>
      </div>

      {/* Shallow Bounded Flow Canvas */}
      <div className="min-w-[950px] py-0.5 px-0.5 flex flex-col justify-center gap-1.5 relative text-sans">
        {/* ROW 1: ENTRY -> ELIGIBILITY -> WAIT 30m -> PUSH -> WAIT 6h -> DECISION 1 -> SUCCESS 1 */}
        <div className="flex items-center gap-1.5">
          {/* Node 1: ENTRY */}
          <div className="flex flex-col items-center justify-center px-1.5 py-1 rounded border border-emerald-500 bg-emerald-50/50 text-center min-w-[80px] shadow-2xs">
            <span className="text-[7px] font-black text-emerald-800 uppercase tracking-wider">ENTRY</span>
            <span className="text-[9.5px] font-extrabold text-gray-900 leading-none mt-0.5">Cart Abandoned</span>
            <span className="text-[7.5px] font-medium text-gray-400">0–40 min</span>
            <div className="mt-0.5 bg-emerald-600 text-white text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded-full leading-none">
              5,214
            </div>
          </div>

          <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />

          {/* Node 2: ELIGIBILITY CHECK */}
          <div className="relative flex flex-col items-center">
            <div className="flex flex-col items-center justify-center px-1.5 py-1 rounded border border-blue-500 bg-blue-50/50 text-center min-w-[85px] shadow-2xs">
              <span className="text-[9.5px] font-extrabold text-gray-900 leading-none">Eligibility Check</span>
              <span className="text-[8.5px] font-mono font-bold text-gray-700 mt-0.5">5,214</span>
              <div className="w-full bg-gray-200 h-0.5 rounded-full my-0.5 overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: "100%" }} />
              </div>
              <span className="text-[8px] font-mono font-bold text-emerald-700">Eligible Pass 5,214</span>
            </div>

            {/* Exit Net Eligible Box */}
            <div className="absolute top-[48px] flex flex-col items-center z-10">
              <ArrowDown className="w-2.5 h-2.5 text-rose-400" />
              <div className="px-1 py-0.5 rounded border border-rose-400 bg-rose-50 text-center min-w-[65px] shadow-2xs">
                <span className="text-[7px] font-black text-rose-800 uppercase block leading-none">EXIT</span>
                <span className="text-[8px] font-bold text-gray-900 leading-none">Net Eligible</span>
                <span className="text-[8px] font-mono font-extrabold text-rose-700 block leading-none mt-0.5">609</span>
              </div>
            </div>
          </div>

          <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />

          {/* Node 3: WAIT 30m */}
          <div className="flex flex-col items-center justify-center px-1.5 py-1 rounded border border-amber-400 bg-amber-50/50 text-center min-w-[70px] shadow-2xs">
            <span className="text-[7.5px] font-bold text-amber-800 uppercase leading-none">WAIT</span>
            <span className="text-[9.5px] font-extrabold text-gray-900 leading-none mt-0.5">30 min</span>
            <span className="text-[8.5px] font-mono font-bold text-gray-700 mt-0.5">5,214</span>
          </div>

          <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />

          {/* Node 4: PUSH REMINDER */}
          <div className="flex flex-col items-center justify-center px-1.5 py-1 rounded border border-blue-500 bg-blue-50/50 text-center min-w-[80px] shadow-2xs">
            <span className="text-[7.5px] font-bold text-blue-800 uppercase leading-none">PUSH</span>
            <span className="text-[9.5px] font-extrabold text-gray-900 leading-none mt-0.5">Reminder</span>
            <span className="text-[8.5px] font-mono font-bold text-gray-700 mt-0.5">5,056</span>
          </div>

          <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />

          {/* Node 5: WAIT 6h */}
          <div className="flex flex-col items-center justify-center px-1.5 py-1 rounded border border-amber-400 bg-amber-50/50 text-center min-w-[70px] shadow-2xs">
            <span className="text-[7.5px] font-bold text-amber-800 uppercase leading-none">WAIT</span>
            <span className="text-[9.5px] font-extrabold text-gray-900 leading-none mt-0.5">6h</span>
            <span className="text-[8.5px] font-mono font-bold text-gray-700 mt-0.5">4,612</span>
          </div>

          <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />

          {/* Node 6: DECISION 1 (Purchased?) */}
          <div className="relative flex items-center justify-center shrink-0 mx-1">
            <div className="w-9 h-9 bg-purple-50 border border-purple-500 rotate-45 flex items-center justify-center shadow-2xs">
              <span className="-rotate-45 text-[7.5px] font-extrabold text-purple-900 text-center leading-none">
                Purchased?
              </span>
            </div>

            <span className="text-[8px] font-extrabold text-emerald-700 absolute -top-3 right-0">Yes</span>
            <span className="text-[8px] font-extrabold text-rose-700 absolute -bottom-3 left-0">No</span>
          </div>

          {/* YES Branch -> SUCCESS 1 */}
          <div className="flex items-center shrink-0 ml-1">
            <ArrowRight className="w-3 h-3 text-emerald-500 mr-1" />
            <div className="px-1.5 py-1 rounded border-2 border-emerald-600 bg-emerald-100/70 text-center min-w-[95px] shadow-2xs">
              <span className="text-[7.5px] font-black text-emerald-800 uppercase block leading-none">SUCCESS</span>
              <span className="text-[9.5px] font-extrabold text-gray-900 leading-none mt-0.5">Purchase Completed</span>
              <span className="text-[8.5px] font-mono font-extrabold text-emerald-800 block mt-0.5">4,264</span>
            </div>
          </div>
        </div>

        {/* ROW 2: NO Branch -> EMAIL REMINDER -> WAIT 20h -> SMS FINAL REMINDER -> DECISION 2 -> SUCCESS 2 / EXIT */}
        <div className="flex items-center gap-1.5 pl-[430px]">
          {/* Connector down from Decision 1 */}
          <ArrowDown className="w-3 h-3 text-rose-500 shrink-0 -ml-8" />

          {/* Node 8: EMAIL REMINDER */}
          <div className="flex flex-col items-center justify-center px-1.5 py-1 rounded border border-blue-500 bg-blue-50/50 text-center min-w-[80px] shadow-2xs">
            <span className="text-[7.5px] font-bold text-blue-800 uppercase leading-none">EMAIL</span>
            <span className="text-[9.5px] font-extrabold text-gray-900 leading-none mt-0.5">Reminder</span>
            <span className="text-[8.5px] font-mono font-bold text-gray-700 mt-0.5">3,400</span>
          </div>

          <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />

          {/* Node 9: WAIT 20h */}
          <div className="flex flex-col items-center justify-center px-1.5 py-1 rounded border border-amber-400 bg-amber-50/50 text-center min-w-[70px] shadow-2xs">
            <span className="text-[7.5px] font-bold text-amber-800 uppercase leading-none">WAIT</span>
            <span className="text-[9.5px] font-extrabold text-gray-900 leading-none mt-0.5">20h</span>
            <span className="text-[8.5px] font-mono font-bold text-gray-700 mt-0.5">3,002</span>
          </div>

          <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />

          {/* Node 10: SMS FINAL REMINDER */}
          <div className="flex flex-col items-center justify-center px-1.5 py-1 rounded border border-blue-500 bg-blue-50/50 text-center min-w-[85px] shadow-2xs">
            <span className="text-[7.5px] font-bold text-blue-800 uppercase leading-none">SMS</span>
            <span className="text-[9.5px] font-extrabold text-gray-900 leading-none mt-0.5">Final Reminder</span>
            <span className="text-[8.5px] font-mono font-bold text-gray-700 mt-0.5">2,800</span>
          </div>

          <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />

          {/* Node 11: DECISION 2 (Purchased?) */}
          <div className="relative flex items-center justify-center shrink-0 mx-1">
            <div className="w-9 h-9 bg-purple-50 border border-purple-500 rotate-45 flex items-center justify-center shadow-2xs">
              <span className="-rotate-45 text-[7.5px] font-extrabold text-purple-900 text-center leading-none">
                Purchased?
              </span>
            </div>

            <span className="text-[8px] font-extrabold text-emerald-700 absolute -top-3 right-0">Yes</span>
            <span className="text-[8px] font-extrabold text-rose-700 absolute -bottom-3 left-0">No</span>
          </div>

          {/* Decision 2 Branches */}
          <div className="flex flex-col gap-1 shrink-0 ml-1">
            {/* YES -> SUCCESS 2 */}
            <div className="flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-emerald-500" />
              <div className="px-1.5 py-0.5 rounded border-2 border-emerald-600 bg-emerald-100/70 text-center min-w-[90px] shadow-2xs">
                <span className="text-[7px] font-black text-emerald-800 uppercase block leading-none">SUCCESS</span>
                <span className="text-[9px] font-extrabold text-gray-900 leading-none">Purchase Completed</span>
                <span className="text-[8px] font-mono font-extrabold text-emerald-800 block">2,412</span>
              </div>
            </div>

            {/* NO -> EXIT */}
            <div className="flex items-center gap-1">
              <ArrowDown className="w-3 h-3 text-rose-500" />
              <div className="px-1.5 py-0.5 rounded border border-rose-500 bg-rose-100/70 text-center min-w-[90px] shadow-2xs">
                <span className="text-[7px] font-black text-rose-800 uppercase block leading-none">EXIT</span>
                <span className="text-[9px] font-extrabold text-gray-900 leading-none">No Conversion</span>
                <span className="text-[8px] font-mono font-extrabold text-rose-800 block">388</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Legend Footer */}
      <div className="flex items-center justify-center gap-4 mt-1.5 pt-1.5 border-t border-gray-100 text-[9.5px] font-semibold text-gray-600">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Success</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Action</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Wait</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          <span>Decision</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>Exit</span>
        </div>
      </div>
    </div>
  );
}
