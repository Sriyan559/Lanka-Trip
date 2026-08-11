"use client";

import React from "react";

interface TrackingMeasurementCardProps {
  tracking: {
    trackingHealthPercent: number;
    pixelTagStatus: string;
    eventCoverage: string;
    conversionTracking: string;
    utmIntegrity: string;
    eventActivityData: number[];
  };
}

export function TrackingMeasurementCard({ tracking }: TrackingMeasurementCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Tracking & Measurement Health
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Tracking Health</span>
            <span className="text-xl font-extrabold text-emerald-700">
              {tracking.trackingHealthPercent}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Pixel/Tag Status</span>
            <span className="font-bold text-emerald-700">{tracking.pixelTagStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Event Coverage</span>
            <span className="font-bold text-gray-900">{tracking.eventCoverage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Conversion Tracking</span>
            <span className="font-bold text-emerald-700">{tracking.conversionTracking}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">UTM Integrity</span>
            <span className="font-bold text-emerald-700">{tracking.utmIntegrity}</span>
          </div>

          {/* Mini event activity bars */}
          <div className="flex items-end gap-1 h-4 pt-1">
            {tracking.eventActivityData.map((v, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-600/80 rounded-t-xs"
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Tracking Health
        </button>
      </div>
    </div>
  );
}
