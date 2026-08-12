"use client";

import React from "react";
import { RoutingFallbackDetails } from "@/data/marketingChannels.mock";

interface RoutingFallbackCardProps {
  details: RoutingFallbackDetails;
}

export function RoutingFallbackCard({ details }: RoutingFallbackCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Routing & Fallback
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Primary Channel</span>
            <span className="font-semibold text-gray-900">{details.primaryChannel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Fallback 1</span>
            <span className="text-gray-700">{details.fallback1}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Fallback 2</span>
            <span className="text-gray-700">{details.fallback2}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Fallback 3</span>
            <span className="text-gray-700">{details.fallback3}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Routing Policy</span>
            <span className="font-semibold text-gray-900">{details.routingPolicy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Auto Failover</span>
            <span className="font-bold text-emerald-700">{details.autoFailover}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Routing Rules
        </button>
      </div>
    </div>
  );
}
