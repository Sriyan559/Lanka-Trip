"use client";

import React from "react";

interface PaidCampaignConfigurationCardProps {
  configuration: {
    version: string;
    configStatus: string;
    lastModified: string;
    publishedBy: string;
  };
}

export function PaidCampaignConfigurationCard({ configuration }: PaidCampaignConfigurationCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Paid Campaign Configuration
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Version</span>
            <span className="text-xl font-extrabold text-gray-900">
              {configuration.version}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Config Status</span>
            <span className="font-bold text-emerald-700">{configuration.configStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Last Modified</span>
            <span className="font-mono text-[11px] text-gray-700">{configuration.lastModified}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Published By</span>
            <span className="text-gray-800 font-medium">{configuration.publishedBy}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Configuration
        </button>
      </div>
    </div>
  );
}
