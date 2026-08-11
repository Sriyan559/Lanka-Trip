"use client";

import React from "react";

interface PaidCampaignDetailsCardProps {
  details: {
    status: string;
    platform: string;
    objective: string;
    mediaId: string;
    adAccount: string;
    startDate: string;
    endDate: string;
  };
}

export function PaidCampaignDetailsCard({ details }: PaidCampaignDetailsCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Paid Campaign Details</span>
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Status</span>
            <span className="font-bold text-emerald-700">{details.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Platform</span>
            <span className="font-semibold text-gray-900">{details.platform}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Objective</span>
            <span className="text-gray-700">{details.objective}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Media ID</span>
            <span className="font-mono text-[11px] text-gray-700">{details.mediaId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Ad Account</span>
            <span className="text-gray-700">{details.adAccount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Start – End</span>
            <span className="font-mono text-[11px] text-gray-700">
              {details.startDate} – {details.endDate}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
}
