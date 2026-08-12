"use client";

import React from "react";
import Link from "next/link";
import { MessageContentDetails } from "@/data/marketingChannels.mock";

interface MessageContentCardProps {
  details: MessageContentDetails;
}

export function MessageContentCard({ details }: MessageContentCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Messaging Content
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Templates</span>
            <span className="font-bold text-gray-900">{details.templates}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Content Assets</span>
            <span className="font-bold text-gray-900">{details.contentAssets}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Last Updated</span>
            <span className="font-mono text-[11px] text-gray-700">{details.lastUpdated}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Approval Required</span>
            <span className="font-bold text-amber-700">{details.approvalRequired}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href="/admin/marketing/content"
          className="block w-full py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          Manage Content
        </Link>
      </div>
    </div>
  );
}
