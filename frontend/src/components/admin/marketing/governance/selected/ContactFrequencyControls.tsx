"use client";

import React from "react";
import { FrequencyControlItem } from "@/data/marketingGovernance.mock";

interface ContactFrequencyControlsProps {
  frequency: FrequencyControlItem;
}

export function ContactFrequencyControls({ frequency }: ContactFrequencyControlsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Contact Frequency Controls
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Policy</span>
            <span className="font-bold text-gray-900">{frequency.policy}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Cross Channel Cap</span>
            <span className="font-semibold text-gray-800">{frequency.crossChannelCap}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Email</span>
            <span className="font-mono text-gray-700">{frequency.emailLimit}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">SMS</span>
            <span className="font-mono text-gray-700">{frequency.smsLimit}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Push</span>
            <span className="font-mono text-gray-700">{frequency.pushLimit}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Per-Market Suppression Window</span>
            <span className="text-gray-700 font-medium">{frequency.suppressionWindow}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Time Hours</span>
            <span className="font-mono text-gray-600">{frequency.timeHours}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Time Zone</span>
            <span className="text-gray-700">{frequency.timeZone}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Consent Violations</span>
            <span className="font-bold text-emerald-700">{frequency.consentViolations}</span>
          </div>
          <div className="flex justify-between text-[11px] items-center pt-1 border-t border-gray-100">
            <span className="text-gray-500 font-medium">Status</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {frequency.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
