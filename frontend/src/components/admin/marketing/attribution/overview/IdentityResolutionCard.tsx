"use client";

import React from "react";
import { IdentityResolutionData } from "@/data/marketingAttribution.mock";

interface IdentityResolutionCardProps {
  identity: IdentityResolutionData;
}

export function IdentityResolutionCard({ identity }: IdentityResolutionCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Identity Resolution
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Known Customer Coverage</span>
            <span className="font-bold text-gray-900">{identity.knownCustomerCoverage}%</span>
          </div>

          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Cross-Device Match Rate</span>
            <span className="font-bold text-gray-900">{identity.crossDeviceMatchRate}%</span>
          </div>

          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Anonymous to Known Resolution</span>
            <span className="font-bold text-gray-900">{identity.anonymousToKnownResolution}%</span>
          </div>

          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Duplicate Rate</span>
            <span className="font-mono text-[10px] text-gray-700">{identity.duplicateRate}%</span>
          </div>

          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Unresolved Sessions</span>
            <span className="font-mono text-[10px] text-gray-700">{identity.unresolvedSessions}%</span>
          </div>

          <div className="space-y-0.5 pt-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-500 font-medium">Identity Health</span>
              <span className="font-bold text-emerald-700">{identity.identityHealthScore}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${identity.identityHealthScore}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
