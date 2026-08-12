"use client";

import React from "react";
import { DeliveryQueueDetails } from "@/data/marketingChannels.mock";

interface DeliveryQueueCardProps {
  details: DeliveryQueueDetails;
}

export function DeliveryQueueCard({ details }: DeliveryQueueCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Delivery Queue (Real-time)
        </h4>
        <div className="mt-2 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Waiting</span>
            <span className="font-bold text-blue-600 text-sm">{details.waiting}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Processing</span>
            <span className="font-bold text-blue-600 text-sm">{details.processing}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Delayed</span>
            <span className="font-bold text-amber-600 text-sm">{details.delayed}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Failed</span>
            <span className="font-bold text-rose-600 text-sm">{details.failed}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          Open Delivery Queue
        </button>
      </div>
    </div>
  );
}
