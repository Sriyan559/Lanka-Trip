"use client";

import React from "react";
import { ProviderHealthDetails } from "@/data/marketingChannels.mock";

interface ProviderHealthCardProps {
  details: ProviderHealthDetails;
}

export function ProviderHealthCard({ details }: ProviderHealthCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Provider Health
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">API Health</span>
            <span className="font-bold text-emerald-700">{details.apiHealth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Latency (p95)</span>
            <span className="font-bold text-emerald-700">{details.latencyP95}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Uptime (30 Days)</span>
            <span className="font-bold text-emerald-700">{details.uptime30D}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Incidents (30 Days)</span>
            <span className="font-bold text-gray-900">{details.incidents30D}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Provider Health
        </button>
      </div>
    </div>
  );
}
