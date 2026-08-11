"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { AudienceSegment } from "@/data/marketingCommandCenter.mock";

interface AudienceSnapshotProps {
  marketable: string;
  suppressed: string;
  highValue: string;
  recentlyActive: string;
  atRisk: string;
  segments: AudienceSegment[];
}

export function AudienceSnapshot({
  marketable,
  suppressed,
  highValue,
  recentlyActive,
  atRisk,
  segments = [],
}: AudienceSnapshotProps) {
  return (
    <MarketingSectionCard
      title="Audience Snapshot"
      subtitle="Customer reach, consent suppression & top segments"
      footerLink={{
        label: "Manage Audiences",
        href: "/admin/marketing/audiences",
      }}
    >
      {/* 5-Metric Strip with no text overlap */}
      <div className="grid grid-cols-5 gap-0.5 bg-gray-50/80 p-1.5 rounded-lg text-center border border-gray-100 mb-2">
        <div className="min-w-0 px-0.5">
          <span
            className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter truncate"
            title="Marketable Customers"
          >
            Marketable
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold text-gray-900 leading-tight">
            {marketable}
          </span>
        </div>

        <div className="min-w-0 px-0.5">
          <span
            className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter truncate"
            title="Suppressed Customers"
          >
            Suppressed
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold text-rose-700 leading-tight">
            {suppressed}
          </span>
        </div>

        <div className="min-w-0 px-0.5">
          <span
            className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter truncate"
            title="High-Value Customers"
          >
            High-Value
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold text-emerald-700 leading-tight">
            {highValue}
          </span>
        </div>

        <div className="min-w-0 px-0.5">
          <span
            className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter truncate"
            title="Recently Active"
          >
            Active
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold text-blue-700 leading-tight">
            {recentlyActive}
          </span>
        </div>

        <div className="min-w-0 px-0.5">
          <span
            className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter truncate"
            title="At-Risk Customers"
          >
            At-Risk
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold text-amber-700 leading-tight">
            {atRisk}
          </span>
        </div>
      </div>

      {/* Top Audience Segments List */}
      <div className="space-y-1 text-[11px]">
        <h4 className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          Top Audience Segments
        </h4>
        {segments.map((seg) => (
          <div
            key={seg.name}
            className="flex items-center justify-between p-1 rounded hover:bg-gray-50/60 font-medium text-gray-700"
          >
            <span className="truncate pr-1">{seg.name}</span>
            <span className="font-bold text-gray-900 bg-gray-100 px-1.5 py-0.2 rounded text-[10px] shrink-0">
              {seg.count}
            </span>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
