"use client";

import React from "react";
import { ReportSchedule } from "@/data/marketingReportsAudit.mock";

interface ReportScheduleCardProps {
  schedule: ReportSchedule;
}

export function ReportScheduleCard({ schedule }: ReportScheduleCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          4. Schedule
        </h4>

        <div className="mt-2 space-y-1 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Frequency</span>
            <span className="font-bold text-gray-900">{schedule.frequency}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Day / Time</span>
            <span className="font-mono text-gray-700">{schedule.dayTime}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Timezone</span>
            <span className="text-gray-700">{schedule.timezone}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Next Run</span>
            <span className="font-mono text-[10px] text-gray-700">{schedule.nextRun}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Last Run</span>
            <span className="font-mono text-[10px] text-gray-700">{schedule.lastRun}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Last Status</span>
            <span className="font-bold text-emerald-700">{schedule.lastStatus}</span>
          </div>
          <div className="flex justify-between text-[11px] items-center pt-1 border-t border-gray-100">
            <span className="text-gray-500 font-medium">Schedule Health</span>
            <span className="font-bold text-emerald-700">{schedule.scheduleHealth}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
