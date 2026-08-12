"use client";

import React from "react";
import { PlacementScheduleData } from "@/data/marketingWebApp.mock";

interface PlacementScheduleCardProps {
  schedule: PlacementScheduleData;
}

export function PlacementScheduleCard({ schedule }: PlacementScheduleCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Schedule
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Start Date</span>
            <span className="font-mono text-[11px] text-gray-700">{schedule.startDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">End Date</span>
            <span className="font-mono text-[11px] text-gray-700">{schedule.endDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Time Zone</span>
            <span className="text-gray-700">{schedule.timeZone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Activation Mode</span>
            <span className="font-semibold text-gray-900">{schedule.activationMode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Fallback After</span>
            <span className="font-semibold text-emerald-700">{schedule.fallbackAfter}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Fallback After Expiry</span>
            <span className="text-gray-700">{schedule.fallbackAfterExpiry}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Schedule Valid</span>
            <span className="font-bold text-emerald-700">
              {schedule.scheduleValid ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
