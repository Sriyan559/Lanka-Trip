"use client";

import React from "react";
import { LimitsFrequencyDetails } from "@/data/marketingChannels.mock";

interface LimitsFrequencyCardProps {
  details: LimitsFrequencyDetails;
}

export function LimitsFrequencyCard({ details }: LimitsFrequencyCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Limits & Frequency
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Daily Send Total</span>
            <span className="font-bold text-gray-900">{details.dailySendTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Daily Send (Today)</span>
            <span className="font-semibold text-gray-900">
              {details.dailySendToday} ({details.dailySendPercent})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Healthy Throttle</span>
            <span className="text-gray-700">{details.healthyThrottle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Cooldown Window</span>
            <span className="text-gray-700">{details.cooldownWindow}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Frequency Cap</span>
            <span className="text-gray-700">{details.frequencyCap}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Burst Cap</span>
            <span className="font-semibold text-gray-900">{details.burstCap}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Limits
        </button>
      </div>
    </div>
  );
}
