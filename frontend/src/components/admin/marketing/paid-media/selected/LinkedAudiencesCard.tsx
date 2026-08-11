"use client";

import React from "react";
import Link from "next/link";

interface LinkedAudiencesCardProps {
  audiences: {
    countLabel: string;
    primaryAudience: string;
    audienceSize: string;
  };
}

export function LinkedAudiencesCard({ audiences }: LinkedAudiencesCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Linked Audiences
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Total Audiences</span>
            <span className="text-xl font-extrabold text-gray-900">
              {audiences.countLabel}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Primary Audience</span>
            <span className="font-semibold text-gray-800">{audiences.primaryAudience}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Audience Size</span>
            <span className="font-mono text-[11px] text-gray-700">{audiences.audienceSize}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href="/admin/marketing/audiences"
          className="block w-full py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          View Master Audiences
        </Link>
      </div>
    </div>
  );
}
