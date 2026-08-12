"use client";

import React from "react";
import { TrackingQualityData } from "@/data/marketingAttribution.mock";

interface TrackingDataQualityCardProps {
  tracking: TrackingQualityData;
}

export function TrackingDataQualityCard({ tracking }: TrackingDataQualityCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Tracking & Data Quality
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Campaign Tracking</span>
            <span className="font-bold text-gray-900">{tracking.campaignTracking}%</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Paid Media Tracking</span>
            <span className="font-bold text-gray-900">{tracking.paidMediaTracking}%</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Identity Resolution</span>
            <span className="font-bold text-gray-900">{tracking.identityResolution}%</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Journey Tracking</span>
            <span className="font-bold text-gray-900">{tracking.journeyTracking}%</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Conversion Event Coverage</span>
            <span className="font-bold text-emerald-700">{tracking.conversionEventCoverage}%</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Revenue Sync</span>
            <span className="font-bold text-emerald-700">{tracking.revenueSync}%</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Data Completeness</span>
            <span className="font-bold text-gray-900">{tracking.dataCompleteness}%</span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
        <div className="flex justify-between text-[11px]">
          <span className="text-gray-500 font-medium">Data Quality Score</span>
          <span className="font-extrabold text-emerald-700">{tracking.dataQualityScore}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${tracking.dataQualityScore}%` }} />
        </div>
      </div>
    </div>
  );
}
