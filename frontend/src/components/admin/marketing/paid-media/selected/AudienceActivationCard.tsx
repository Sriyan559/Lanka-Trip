"use client";

import React from "react";

interface AudienceActivationCardProps {
  activation: {
    matchRatePercent: number;
    activationStatus: string;
    audienceSync: string;
    sparkData: number[];
  };
}

export function AudienceActivationCard({ activation }: AudienceActivationCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Audience Activation
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Match Rate</span>
            <span className="text-xl font-extrabold text-gray-900">
              {activation.matchRatePercent}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Activation Status</span>
            <span className="font-bold text-emerald-700">{activation.activationStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Audience Sync</span>
            <span className="font-bold text-emerald-700">{activation.audienceSync}</span>
          </div>

          {/* Sparkline mini bars */}
          <div className="flex items-end gap-1 h-5 pt-1">
            {activation.sparkData.map((v, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-500/80 rounded-t-xs"
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Activation
        </button>
      </div>
    </div>
  );
}
