"use client";

import React from "react";
import Image from "next/image";
import { ContentLibraryItem } from "@/data/marketingContent.mock";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function ContentLibraryTable({
  items = [],
  selectedContentId,
  onSelectContent,
}: {
  items: ContentLibraryItem[];
  selectedContentId?: string;
  onSelectContent?: (item: ContentLibraryItem) => void;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs font-sans overflow-hidden">
      {/* Table Header */}
      <div className="p-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h2 className="text-xs font-bold text-gray-900 leading-tight">Content Library</h2>
          <p className="text-[10px] text-gray-500 font-medium">
            Reusable creative and messaging content available for campaigns, journeys and channel execution.
          </p>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-gray-50/90 text-gray-400 font-bold uppercase text-[8.5px] border-b border-gray-200/80 tracking-tight">
              <th className="py-2 px-2 text-center w-8">
                <input type="checkbox" className="rounded border-gray-300 text-[#800020] focus:ring-0" />
              </th>
              <th className="py-2 px-2">Preview</th>
              <th className="py-2 px-2">Content Name</th>
              <th className="py-2 px-2">Content ID</th>
              <th className="py-2 px-2">Type</th>
              <th className="py-2 px-2">Content Status</th>
              <th className="py-2 px-2">Owner</th>
              <th className="py-2 px-2">Brand</th>
              <th className="py-2 px-2">Business Unit</th>
              <th className="py-2 px-2">Primary Market</th>
              <th className="py-2 px-2 text-center">Version</th>
              <th className="py-2 px-2 text-center">Variants</th>
              <th className="py-2 px-2">Approval Status</th>
              <th className="py-2 px-2">Rights State</th>
              <th className="py-2 px-2">Usage</th>
              <th className="py-2 px-2 text-center">Linked Campaigns</th>
              <th className="py-2 px-2">Performance (CTR)</th>
              <th className="py-2 px-2">Last Updated</th>
              <th className="py-2 px-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-[10px] font-medium text-gray-700">
            {items.map((item) => {
              const isSelected = item.id === selectedContentId || item.contentId === "CNT-2026-0164";

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectContent && onSelectContent(item)}
                  className={`cursor-pointer transition-colors hover:bg-gray-50/80 ${
                    isSelected ? "bg-[#800020]/5 font-semibold text-gray-900" : ""
                  }`}
                >
                  <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectContent && onSelectContent(item)}
                      className="rounded border-gray-300 text-[#800020] focus:ring-0"
                    />
                  </td>

                  {/* Thumbnail Preview */}
                  <td className="py-2 px-2">
                    <div className="w-10 h-7 rounded border border-gray-200 overflow-hidden relative bg-gray-100 shrink-0">
                      <Image
                        src={item.previewUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  </td>

                  <td className="py-2 px-2">
                    <span className="font-extrabold text-gray-900 block truncate max-w-[160px]">
                      {item.name}
                    </span>
                  </td>

                  <td className="py-2 px-2">
                    <code className="font-mono text-[#800020] font-bold text-[9.5px]">
                      {item.contentId}
                    </code>
                  </td>

                  <td className="py-2 px-2 text-gray-600">{item.type}</td>

                  <td className="py-2 px-2">
                    <MarketingStatusChip status={item.status} className="text-[8px] px-1.5 py-0.2" />
                  </td>

                  <td className="py-2 px-2 text-gray-600 truncate max-w-[100px]">{item.owner}</td>

                  <td className="py-2 px-2 font-semibold text-gray-900">{item.brand}</td>

                  <td className="py-2 px-2 text-gray-600">{item.businessUnit}</td>

                  <td className="py-2 px-2 text-gray-600">{item.primaryMarket}</td>

                  <td className="py-2 px-2 text-center font-mono font-bold text-gray-900">{item.version}</td>

                  <td className="py-2 px-2 text-center font-mono font-bold text-gray-900">{item.variantsCount}</td>

                  <td className="py-2 px-2">
                    <span
                      className={`px-1.5 py-0.2 rounded text-[8px] font-bold ${
                        item.approvalStatus === "Approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.approvalStatus === "In Review"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.approvalStatus}
                    </span>
                  </td>

                  <td className="py-2 px-2">
                    <span
                      className={`px-1.5 py-0.2 rounded text-[8px] font-bold ${
                        item.rightsState === "Rights Valid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.rightsState}
                    </span>
                  </td>

                  <td className="py-2 px-2 text-gray-600 truncate max-w-[120px]">{item.usageSummary}</td>

                  <td className="py-2 px-2 text-center font-mono font-bold text-gray-900">
                    {item.linkedCampaignsCount}
                  </td>

                  <td className="py-2 px-2 font-mono font-bold text-emerald-700">{item.performanceCtr}</td>

                  <td className="py-2 px-2 text-gray-500 font-mono text-[9px]">{item.lastUpdated}</td>

                  <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <button className="p-1 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="p-2.5 bg-gray-50/60 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10.5px] font-medium text-gray-600">
        <div>
          Showing <span className="font-bold text-gray-900">1 to 6</span> of{" "}
          <span className="font-bold text-gray-900">2,846</span> assets
        </div>

        <div className="flex items-center gap-1">
          <button className="p-1 rounded border border-gray-200 bg-white text-gray-400 hover:text-gray-700 disabled:opacity-50">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button className="px-2 py-0.5 rounded border border-[#800020] bg-[#800020] text-white font-bold text-[10px]">
            1
          </button>
          <button className="px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 text-[10px]">
            2
          </button>
          <button className="px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 text-[10px]">
            3
          </button>
          <button className="px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 text-[10px]">
            4
          </button>
          <button className="px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 text-[10px]">
            5
          </button>
          <span className="px-1 text-gray-400">...</span>
          <button className="px-2 py-0.5 rounded border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 text-[10px]">
            475
          </button>
          <button className="p-1 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <span className="ml-2 text-gray-500">10 / page</span>
        </div>
      </div>
    </div>
  );
}
