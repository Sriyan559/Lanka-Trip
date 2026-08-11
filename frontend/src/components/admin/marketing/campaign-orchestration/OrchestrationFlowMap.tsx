"use client";

import React from "react";
import { Mail, Smartphone, Megaphone } from "lucide-react";

export function OrchestrationFlowMap() {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs font-sans flex flex-col gap-3">
      <h4 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">
        Orchestration Flow Map
      </h4>

      <div className="flex flex-col items-center justify-center py-2 w-full max-w-2xl mx-auto font-sans relative">
        {/* 1. ROOT CAMPAIGN NODE */}
        <div className="bg-[#800020] text-white px-5 py-2 rounded-xl shadow-md text-xs font-extrabold flex items-center gap-2 z-10">
          <span className="w-2 h-2 rounded-full bg-rose-300" />
          <span>Summer Beauty Festival</span>
        </div>

        {/* Vertical connector line */}
        <div className="w-[1.5px] h-6 bg-gray-300 my-0.5" />

        {/* 2. AUDIENCE NODE */}
        <div className="bg-white border border-gray-300 rounded-xl px-6 py-2 shadow-2xs text-center z-10 min-w-[200px]">
          <span className="text-[10px] font-bold text-gray-500 block uppercase tracking-tight">Campaign Audience</span>
          <span className="text-xs font-extrabold text-gray-900">482K Eligible</span>
        </div>

        {/* Vertical connector & horizontal branch bar */}
        <div className="w-[1.5px] h-6 bg-gray-300 my-0.5" />
        <div className="w-[75%] h-[1.5px] bg-gray-300 relative">
          {/* Vertical lines dropping to 3 channels */}
          <div className="absolute left-0 top-0 w-[1.5px] h-6 bg-gray-300" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1.5px] h-6 bg-gray-300" />
          <div className="absolute right-0 top-0 w-[1.5px] h-6 bg-gray-300" />
        </div>

        <div className="h-6" />

        {/* 3. THREE CHANNEL NODES ROW */}
        <div className="grid grid-cols-3 gap-6 w-full z-10">
          {/* Email Channel */}
          <div className="flex flex-col items-center">
            <div className="bg-white border border-emerald-300 rounded-xl p-2.5 shadow-2xs flex items-center justify-center gap-2 w-full max-w-[160px]">
              <Mail className="w-4 h-4 text-emerald-600" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-900">Email</span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded w-fit">
                  Ready
                </span>
              </div>
            </div>

            {/* Vertical connector down to execution node */}
            <div className="w-[1.5px] h-6 bg-gray-300 my-1" />

            {/* Execution node 1 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 text-center w-full max-w-[160px] shadow-2xs relative">
              <div className="w-5 h-5 rounded-full bg-white border border-gray-300 text-gray-700 font-extrabold text-[10px] flex items-center justify-center absolute -top-2.5 left-1/2 -translate-x-1/2 shadow-2xs">
                1
              </div>
              <span className="text-xs font-bold text-gray-900 block mt-1">Email Send</span>
              <span className="text-[10px] text-gray-500 font-mono">Day 1 (09:00 AM)</span>
            </div>
          </div>

          {/* Web/App Channel */}
          <div className="flex flex-col items-center">
            <div className="bg-white border border-emerald-300 rounded-xl p-2.5 shadow-2xs flex items-center justify-center gap-2 w-full max-w-[160px]">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-900">Web/App</span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded w-fit">
                  Ready
                </span>
              </div>
            </div>

            {/* Vertical connector down to execution node */}
            <div className="w-[1.5px] h-6 bg-gray-300 my-1" />

            {/* Execution node 2 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 text-center w-full max-w-[160px] shadow-2xs relative">
              <div className="w-5 h-5 rounded-full bg-white border border-gray-300 text-gray-700 font-extrabold text-[10px] flex items-center justify-center absolute -top-2.5 left-1/2 -translate-x-1/2 shadow-2xs">
                2
              </div>
              <span className="text-xs font-bold text-gray-900 block mt-1">Web/App Live</span>
              <span className="text-[10px] text-gray-500 font-mono">Day 1 (12:00 PM)</span>
            </div>
          </div>

          {/* Paid Social Channel */}
          <div className="flex flex-col items-center">
            <div className="bg-white border border-rose-300 rounded-xl p-2.5 shadow-2xs flex items-center justify-center gap-2 w-full max-w-[160px]">
              <Megaphone className="w-4 h-4 text-rose-600" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-900">Paid Social</span>
                <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded w-fit">
                  Needs Attention
                </span>
              </div>
            </div>

            {/* Vertical connector down to execution node */}
            <div className="w-[1.5px] h-6 bg-gray-300 my-1" />

            {/* Execution node 3 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 text-center w-full max-w-[160px] shadow-2xs relative">
              <div className="w-5 h-5 rounded-full bg-white border border-gray-300 text-gray-700 font-extrabold text-[10px] flex items-center justify-center absolute -top-2.5 left-1/2 -translate-x-1/2 shadow-2xs">
                3
              </div>
              <span className="text-xs font-bold text-gray-900 block mt-1">Paid Social Activation</span>
              <span className="text-[10px] text-gray-500 font-mono">Day 1 (02:00 PM)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
