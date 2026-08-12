"use client";

import React from "react";
import { PersonalizationData } from "@/data/marketingWebApp.mock";

interface PersonalizationCardProps {
  personalization: PersonalizationData;
}

export function PersonalizationCard({ personalization }: PersonalizationCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Personalization
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Status</span>
            <span className="font-bold text-emerald-700">{personalization.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Audience Variants</span>
            <span className="font-bold text-gray-900">{personalization.audienceVariants}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Default Variant</span>
            <span className="text-gray-800 font-medium">{personalization.defaultVariant}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Enablement</span>
            <span className="font-bold text-emerald-700">{personalization.enablement}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Decision Latency</span>
            <span className="font-mono text-[11px] text-gray-700">{personalization.decisionLatency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Personalization Health</span>
            <span className="font-bold text-emerald-700">{personalization.personalizationHealth}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Personalization Rules
        </button>
      </div>
    </div>
  );
}
