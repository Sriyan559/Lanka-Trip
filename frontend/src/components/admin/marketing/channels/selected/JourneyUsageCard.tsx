"use client";

import React from "react";
import Link from "next/link";
import { JourneyUsageDetails } from "@/data/marketingChannels.mock";

interface JourneyUsageCardProps {
  details: JourneyUsageDetails;
}

export function JourneyUsageCard({ details }: JourneyUsageCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Journey Usage
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Active Journeys</span>
            <span className="font-bold text-gray-900">{details.activeJourneys}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Messages Today</span>
            <span className="font-bold text-gray-900">{details.messagesToday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Top Journey</span>
            <span className="font-semibold text-gray-900">{details.topJourney}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Enrolment Rate</span>
            <span className="text-gray-700">{details.enrolmentRate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Next Scheduled</span>
            <span className="font-mono text-[11px] text-gray-700">{details.nextScheduled}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href="/admin/marketing/journeys"
          className="block w-full py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          View Journeys
        </Link>
      </div>
    </div>
  );
}
