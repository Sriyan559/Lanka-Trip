"use client";

import React from "react";
import { ContentVariantItem, ChannelReadinessItem, UsagePlacementItem } from "@/data/marketingContent.mock";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { Plus } from "lucide-react";

export function ContentVariantsPanel({
  variants = [],
}: {
  variants: ContentVariantItem[];
}) {
  return (
    <MarketingSectionCard
      title="3. Variants"
      headerActions={
        <button className="text-[9.5px] font-bold text-[#800020] hover:underline flex items-center gap-0.5">
          <Plus className="w-3 h-3" />
          <span>Create Variant</span>
        </button>
      }
      className="h-full"
    >
      <div className="w-full font-sans text-[10px]">
        <div className="grid grid-cols-[1.2fr_0.4fr_0.7fr_0.7fr] items-center gap-1 bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight py-1 px-1 text-[8.5px]">
          <span className="truncate">NAME</span>
          <span className="truncate">VER</span>
          <span className="truncate">STATUS</span>
          <span className="truncate text-right">DIMENSIONS</span>
        </div>

        <div className="divide-y divide-gray-100 font-medium text-[10px]">
          {variants.map((v) => (
            <div
              key={v.name}
              className="grid grid-cols-[1.2fr_0.4fr_0.7fr_0.7fr] items-center gap-1 py-1 px-1 hover:bg-gray-50/50"
            >
              <span className="font-bold text-gray-900 truncate" title={v.name}>
                {v.name}
              </span>
              <span className="font-mono text-gray-700 text-[9px]">{v.version}</span>
              <span>
                <span
                  className={`text-[8px] font-bold px-1.5 py-0.2 rounded ${
                    v.status === "Approved"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {v.status}
                </span>
              </span>
              <span className="text-right font-mono text-gray-600 text-[9px]">
                {v.dimensions}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}

export function ContentChannelReadinessPanel({
  channelReadiness = [],
  overallPct = 96,
}: {
  channelReadiness: ChannelReadinessItem[];
  overallPct?: number;
}) {
  return (
    <MarketingSectionCard title="4. Channel Readiness" className="h-full">
      <div className="flex flex-col gap-1.5 font-sans text-xs">
        <div className="divide-y divide-gray-100 text-[10px]">
          {channelReadiness.map((cr) => (
            <div key={cr.channel} className="flex justify-between items-center py-1">
              <span className="font-semibold text-gray-800">{cr.channel}</span>
              <span
                className={`text-[9px] font-bold flex items-center gap-1 ${
                  cr.status === "Ready"
                    ? "text-emerald-700"
                    : cr.status === "Non Applicable"
                    ? "text-gray-400"
                    : "text-amber-700"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    cr.status === "Ready"
                      ? "bg-emerald-500"
                      : cr.status === "Non Applicable"
                      ? "bg-gray-300"
                      : "bg-amber-500"
                  }`}
                />
                {cr.status}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-1.5 border-t border-gray-100">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-gray-900">Overall Channel Readiness</span>
            <span className="text-emerald-700 font-mono text-[11px]">{overallPct}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mt-1">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${overallPct}%` }} />
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}

export function ContentUsagePlacementPanel({
  placements = [],
}: {
  placements: UsagePlacementItem[];
}) {
  return (
    <MarketingSectionCard title="5. Usage & Placement" className="h-full">
      <div className="flex flex-col gap-1.5 font-sans text-xs">
        <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
          <span>Active Usage References:</span>
          <span className="font-mono text-gray-900">{placements.length}</span>
        </div>

        <div className="divide-y divide-gray-100 text-[10px]">
          {placements.map((p) => (
            <div key={p.name} className="py-1.5 grid grid-cols-[1.2fr_0.8fr_0.8fr_0.5fr] items-center gap-1">
              <span className="font-bold text-gray-900 truncate" title={p.name}>
                {p.name}
              </span>
              <span className="text-gray-500 text-[9px]">{p.type}</span>
              <span className="text-gray-700 text-[9px] truncate">{p.location}</span>
              <span className="text-right">
                <span className="text-[8px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                  {p.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}
