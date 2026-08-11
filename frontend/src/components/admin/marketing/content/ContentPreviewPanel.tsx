"use client";

import React from "react";
import Image from "next/image";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";

export function ContentPreviewPanel({
  previewUrl = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  title = "Summer Beauty Festival Hero",
}: {
  previewUrl?: string;
  title?: string;
}) {
  return (
    <MarketingSectionCard title="1. Content Preview" className="h-full">
      <div className="flex flex-col items-center justify-center font-sans h-full">
        <div className="w-full h-36 relative rounded-lg overflow-hidden border border-gray-200 shadow-2xs bg-gray-100">
          <Image
            src={previewUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-2.5">
            <span className="text-white font-extrabold text-xs tracking-tight">{title}</span>
            <span className="text-emerald-300 text-[9px] font-bold">Approved Master Asset</span>
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}

export function ContentDetailsPanel({
  details,
}: {
  details: {
    contentName: string;
    contentType: string;
    contentId: string;
    brand: string;
    campaignTheme: string;
    primaryLanguage: string;
    marketRegion: string;
    createdOn: string;
    lastUpdated: string;
    createdBy: string;
    currentVersion: string;
  };
}) {
  return (
    <MarketingSectionCard title="2. Content Details" className="h-full">
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-sans">
        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CONTENT NAME</span>
          <span className="font-extrabold text-gray-900 text-[10px] truncate block">{details.contentName}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CONTENT TYPE</span>
          <span className="font-semibold text-gray-800 text-[10px]">{details.contentType}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CONTENT ID</span>
          <span className="font-mono text-[#800020] font-bold text-[10px]">{details.contentId}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">BRAND</span>
          <span className="font-bold text-gray-900 text-[10px]">{details.brand}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CAMPAIGN THEME</span>
          <span className="text-gray-700 text-[9.5px] truncate block">{details.campaignTheme}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">PRIMARY LANGUAGE</span>
          <span className="font-semibold text-gray-800 text-[10px]">{details.primaryLanguage}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">MARKET / REGION</span>
          <span className="text-gray-700 text-[9.5px]">{details.marketRegion}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CURRENT VERSION</span>
          <span className="font-mono font-extrabold text-emerald-700 text-[10.5px]">{details.currentVersion}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CREATED ON</span>
          <span className="text-gray-600 font-mono text-[9px]">{details.createdOn}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">LAST UPDATED</span>
          <span className="text-gray-600 font-mono text-[9px]">{details.lastUpdated}</span>
        </div>

        <div className="col-span-2 pt-1 border-t border-gray-100 flex justify-between items-center">
          <span className="text-gray-400 text-[8.5px] font-bold uppercase">CREATED BY</span>
          <span className="font-bold text-gray-900 text-[9.5px]">{details.createdBy}</span>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
