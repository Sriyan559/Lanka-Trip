"use client";

import React from "react";

export function AttributionModelCard() {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Attribution Model
        </h4>

        <div className="mt-2 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Model</span>
            <span className="font-bold text-[#800020]">Data-Driven Attribution</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Lookback Window</span>
            <span className="font-semibold text-gray-800">30 Days</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Cross-Device</span>
            <span className="font-bold text-emerald-700">Enabled</span>
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-500 font-medium">Identity Resolution</span>
              <span className="font-bold text-gray-900">94%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: "94%" }} />
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-500 font-medium">Conversion Deduplication</span>
              <span className="font-bold text-gray-900">99.2%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: "99.2%" }} />
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-500 font-medium">Revenue Coverage</span>
              <span className="font-bold text-gray-900">90%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: "90%" }} />
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-500 font-medium">Model Confidence</span>
              <span className="font-bold text-gray-900">91%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: "91%" }} />
            </div>
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="text-gray-500 font-medium">Status</span>
            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200">
              ● Healthy
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          Open Attribution Model
        </button>
      </div>
    </div>
  );
}
