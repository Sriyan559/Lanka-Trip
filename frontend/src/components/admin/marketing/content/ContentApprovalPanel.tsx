"use client";

import React from "react";
import { ApprovalStep, PendingApprovalItem } from "@/data/marketingContent.mock";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { CheckCircle2 } from "lucide-react";

export function ContentApprovalPanel({
  steps = [],
  approvedBy = "Marketing Director",
  approvedOn = "12 Aug 2026",
  pendingQueue = [],
}: {
  steps: ApprovalStep[];
  approvedBy?: string;
  approvedOn?: string;
  pendingQueue?: PendingApprovalItem[];
}) {
  return (
    <MarketingSectionCard title="8. Content Approval" className="h-full">
      <div className="flex flex-col gap-2 font-sans text-xs">
        {/* Horizontal 5-Step Progress Diagram */}
        <div className="flex items-center justify-between relative px-1 py-1 border-b border-gray-100">
          <div className="absolute left-3 right-3 top-3.5 h-0.5 bg-emerald-500 z-0" />
          {steps.map((s, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[8px] font-bold text-gray-900 mt-0.5 max-w-[55px] truncate">
                {s.step}
              </span>
              <span className="text-[7.5px] font-mono text-gray-500">{s.date}</span>
            </div>
          ))}
        </div>

        {/* Approved Metadata */}
        <div className="flex justify-between items-center text-[10px] text-gray-700 font-medium">
          <div>
            <span className="text-gray-400 text-[8.5px] font-bold uppercase block">APPROVED BY</span>
            <span className="font-bold text-gray-900">{approvedBy}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 text-[8.5px] font-bold uppercase block">APPROVED ON</span>
            <span className="font-mono text-gray-700 text-[9px]">{approvedOn}</span>
          </div>
        </div>

        {/* Pending Queue */}
        {pendingQueue.length > 0 && (
          <div className="pt-1.5 border-t border-gray-100 flex flex-col gap-1">
            <span className="text-[8.5px] font-bold text-gray-400 uppercase">Pending Approval Queue</span>
            {pendingQueue.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[9.5px]">
                <span className="font-bold text-gray-900 truncate max-w-[130px]">{item.name}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[8px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                    {item.status}
                  </span>
                  <span className="text-[8.5px] font-mono text-gray-400">{item.time}</span>
                  <button className="text-[9px] font-bold text-[#800020] hover:underline">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MarketingSectionCard>
  );
}

export function ContentRightsPanel({
  rights,
}: {
  rights: {
    state: string;
    type: string;
    scope: string;
    markets: string;
    channels: string;
    startDate: string;
    expiryDate: string;
    talent: string;
    musicLicense: string;
    restrictions: string;
  };
}) {
  return (
    <MarketingSectionCard title="9. Rights & Usage Restrictions" className="h-full">
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-sans">
        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">RIGHTS STATE</span>
          <span className="font-bold text-emerald-700 text-[10px]">{rights.state}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">RIGHTS TYPE</span>
          <span className="font-semibold text-gray-800 text-[10px]">{rights.type}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">USAGE SCOPE</span>
          <span className="text-gray-700 text-[9.5px] truncate block">{rights.scope}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">MARKETS</span>
          <span className="text-gray-700 text-[9.5px]">{rights.markets}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CHANNELS</span>
          <span className="text-gray-700 text-[9.5px]">{rights.channels}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">START DATE</span>
          <span className="font-mono text-gray-700 text-[9px]">{rights.startDate}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">EXPIRY DATE</span>
          <span className="font-mono text-gray-700 text-[9px]">{rights.expiryDate}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">THIRD-PARTY TALENT</span>
          <span className="font-semibold text-gray-800 text-[10px]">{rights.talent}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">MUSIC LICENSE</span>
          <span className="text-gray-600 text-[9.5px]">{rights.musicLicense}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">USAGE RESTRICTIONS</span>
          <span className="font-semibold text-emerald-700 text-[10px]">{rights.restrictions}</span>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
