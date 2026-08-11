"use client";

import React from "react";
import { ChannelExceptionsDetails } from "@/data/marketingChannels.mock";

interface ChannelExceptionsCardProps {
  details: ChannelExceptionsDetails;
}

export function ChannelExceptionsCard({ details }: ChannelExceptionsCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Active Channel Exceptions
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Open Exceptions</span>
            <span className="font-bold text-rose-600 text-sm">{details.openExceptions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Severity</span>
            <span className="font-semibold text-amber-700">{details.severity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Last Exception</span>
            <span className="font-mono text-[11px] text-gray-700">{details.lastException}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Exceptions
        </button>
      </div>
    </div>
  );
}
