"use client";

import React from "react";
import { PlacementVersioningData } from "@/data/marketingWebApp.mock";

interface PlacementVersioningCardProps {
  versioning: PlacementVersioningData;
}

export function PlacementVersioningCard({ versioning }: PlacementVersioningCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Versioning & Publication
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Current Live Version</span>
            <span className="font-bold text-emerald-700">{versioning.currentLiveVersion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Published On</span>
            <span className="font-mono text-[11px] text-gray-700">{versioning.publishedOn}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Published By</span>
            <span className="text-gray-800 font-medium">{versioning.publishedBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Draft Revision</span>
            <span className="text-gray-600">{versioning.draftRevision}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 flex gap-2">
        <button className="flex-1 py-1 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg transition-colors cursor-pointer">
          Live (Safe to Edit)
        </button>
        <button className="flex-1 py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Version History
        </button>
      </div>
    </div>
  );
}
