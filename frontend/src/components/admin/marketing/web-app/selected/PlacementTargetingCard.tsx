"use client";

import React from "react";
import Link from "next/link";
import { PlacementTargetingData } from "@/data/marketingWebApp.mock";

interface PlacementTargetingCardProps {
  targeting: PlacementTargetingData;
}

export function PlacementTargetingCard({ targeting }: PlacementTargetingCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Targeting
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Primary Audience</span>
            <span className="font-semibold text-gray-900">{targeting.primaryAudience}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Audience Size</span>
            <span className="font-bold text-gray-900">{targeting.audienceSize}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Eligible Reach</span>
            <span className="font-bold text-emerald-700">{targeting.eligibleReach}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Suppressed</span>
            <span className="font-semibold text-amber-700">{targeting.suppressed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Personalization</span>
            <span className="font-bold text-emerald-700">{targeting.personalization}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Fallback for Anonymous</span>
            <span className="text-gray-700">{targeting.fallbackForAnonymous}</span>
          </div>
          <div className="pt-1 border-t border-gray-100">
            <span className="text-[10px] text-gray-400 font-medium uppercase block mb-0.5">
              Rule Example
            </span>
            <span className="font-mono text-[11px] text-gray-600 bg-gray-50 p-1 rounded block leading-tight">
              {targeting.ruleExample}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href="/admin/marketing/audiences"
          className="block w-full py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          View Audiences
        </Link>
      </div>
    </div>
  );
}
