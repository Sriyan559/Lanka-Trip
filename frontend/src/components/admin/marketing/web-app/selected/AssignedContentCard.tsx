"use client";

import React from "react";
import Link from "next/link";
import { AssignedContentData } from "@/data/marketingWebApp.mock";

interface AssignedContentCardProps {
  content: AssignedContentData;
}

export function AssignedContentCard({ content }: AssignedContentCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Assigned Content
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Content</span>
            <span className="font-semibold text-gray-900">{content.contentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Variant</span>
            <span className="font-semibold text-emerald-700">{content.variant}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Content ID</span>
            <span className="font-mono text-[11px] text-gray-700">{content.contentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Content Status</span>
            <span className="font-bold text-emerald-700">{content.contentStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Content Type</span>
            <span className="text-gray-700">{content.contentType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Size</span>
            <span className="font-mono text-[11px] text-gray-700">{content.dimensions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Format</span>
            <span className="text-gray-700">{content.format}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 flex gap-2">
        <Link
          href="/admin/marketing/content"
          className="flex-1 py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          Open Content Library
        </Link>
        <button
          onClick={() => {}}
          className="flex-1 py-1 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          Replace Content
        </button>
      </div>
    </div>
  );
}
