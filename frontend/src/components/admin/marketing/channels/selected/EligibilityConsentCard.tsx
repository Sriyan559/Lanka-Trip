"use client";

import React from "react";
import { EligibilityConsentDetails } from "@/data/marketingChannels.mock";

interface EligibilityConsentCardProps {
  details: EligibilityConsentDetails;
}

export function EligibilityConsentCard({ details }: EligibilityConsentCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Eligibility & Consent
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Consent Model</span>
            <span className="font-bold text-emerald-700">{details.consentModel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Consent Method</span>
            <span className="text-gray-700">{details.consentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Last Consent Sync</span>
            <span className="font-mono text-[11px] text-gray-700">{details.lastConsentSync}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Eligible Audience</span>
            <span className="font-bold text-gray-900">{details.eligibleAudience}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Suppressed Audience</span>
            <span className="font-semibold text-amber-700">{details.suppressedAudience}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Consent Compliance</span>
            <span className="font-bold text-emerald-700">{details.consentCompliance}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Consent Report
        </button>
      </div>
    </div>
  );
}
