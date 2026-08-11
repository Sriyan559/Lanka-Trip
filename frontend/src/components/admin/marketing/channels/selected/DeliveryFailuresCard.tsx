"use client";

import React from "react";
import { DeliveryFailuresDetails } from "@/data/marketingChannels.mock";

interface DeliveryFailuresCardProps {
  details: DeliveryFailuresDetails;
}

export function DeliveryFailuresCard({ details }: DeliveryFailuresCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Delivery Failures — Last 30 Days
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Hard Bounce</span>
            <span className="font-bold text-gray-900">{details.hardBounce}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Soft Bounce</span>
            <span className="font-bold text-gray-900">{details.softBounce}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Suppressed</span>
            <span className="font-bold text-amber-700">{details.suppressed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Blocked</span>
            <span className="font-bold text-gray-900">{details.blocked}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Spam Complaint</span>
            <span className="font-bold text-rose-600">{details.spamComplaint}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Invalid Address</span>
            <span className="font-bold text-gray-900">{details.invalidAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Other</span>
            <span className="font-bold text-gray-700">{details.other}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          Review Failure Details
        </button>
      </div>
    </div>
  );
}
