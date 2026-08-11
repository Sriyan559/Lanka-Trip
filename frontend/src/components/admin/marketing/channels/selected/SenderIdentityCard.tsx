"use client";

import React from "react";
import { SenderIdentityDetails } from "@/data/marketingChannels.mock";

interface SenderIdentityCardProps {
  details: SenderIdentityDetails;
}

export function SenderIdentityCard({ details }: SenderIdentityCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Sender Identity
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">From Name</span>
            <span className="font-semibold text-gray-900">{details.fromName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">From Domain</span>
            <span className="font-mono text-[11px] text-gray-700">{details.fromDomain}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">From Email</span>
            <span className="font-mono text-[11px] text-gray-700">{details.fromEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Reply-To</span>
            <span className="font-mono text-[11px] text-gray-700">{details.replyTo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Return-Path Domain</span>
            <span className="font-mono text-[11px] text-gray-700">{details.returnPathDomain}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">SPF</span>
            <span className="font-bold text-emerald-700">{details.spf}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">DKIM</span>
            <span className="font-bold text-emerald-700">{details.dkim}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">DMARC</span>
            <span className="font-bold text-emerald-700">{details.dmarc}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Domain Reputation</span>
            <span className="font-bold text-emerald-700">{details.domainReputation}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Sender Verification
        </button>
      </div>
    </div>
  );
}
