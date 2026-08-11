"use client";

import React from "react";
import { PlacementRecord } from "@/data/marketingWebApp.mock";
import { PlacementStatusBadge } from "./PlacementStatusBadge";
import { MoreVertical, Monitor, Smartphone, Search, Layout } from "lucide-react";

interface PlacementPortfolioTableProps {
  placements: PlacementRecord[];
  selectedId: string;
  onSelectPlacement: (placement: PlacementRecord) => void;
  selectedCheckboxes: string[];
  onToggleCheckbox: (id: string) => void;
  onToggleAllCheckboxes: () => void;
}

export function PlacementPortfolioTable({
  placements = [],
  selectedId,
  onSelectPlacement,
  selectedCheckboxes = [],
  onToggleCheckbox,
  onToggleAllCheckboxes,
}: PlacementPortfolioTableProps) {
  const isAllSelected =
    placements.length > 0 && selectedCheckboxes.length === placements.length;

  const getSurfaceIcon = (surface: PlacementRecord["surface"]) => {
    switch (surface) {
      case "Website":
        return <Monitor className="w-3.5 h-3.5 text-blue-600" />;
      case "Mobile App":
        return <Smartphone className="w-3.5 h-3.5 text-purple-600" />;
      case "Website Search":
        return <Search className="w-3.5 h-3.5 text-amber-600" />;
      case "Landing Page":
        return <Layout className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Monitor className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      {/* Table Header Title Strip */}
      <div className="p-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Website & App Placement Portfolio
          </h3>
          <p className="text-[11px] text-gray-500">
            Configured onsite and in-app placements used by marketing campaigns and merchandising experiences.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs text-gray-700 font-sans border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleAllCheckboxes}
                  className="rounded border-gray-300 text-[#800020] focus:ring-[#800020] cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-3">Placement</th>
              <th className="py-2.5 px-3">Placement ID</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Surface</th>
              <th className="py-2.5 px-3">Placement Type</th>
              <th className="py-2.5 px-3">Campaign</th>
              <th className="py-2.5 px-3">Audience</th>
              <th className="py-2.5 px-3">Content</th>
              <th className="py-2.5 px-3">Device</th>
              <th className="py-2.5 px-3">Start</th>
              <th className="py-2.5 px-3">End</th>
              <th className="py-2.5 px-3 text-center">Priority</th>
              <th className="py-2.5 px-3 text-right">Impressions</th>
              <th className="py-2.5 px-3 text-right">Engagement</th>
              <th className="py-2.5 px-3 text-right">Conversion</th>
              <th className="py-2.5 px-3 text-right">Revenue Reference</th>
              <th className="py-2.5 px-3">Content Readiness</th>
              <th className="py-2.5 px-3">Governance</th>
              <th className="py-2.5 px-3">Last Activity</th>
              <th className="py-2.5 px-3 text-center w-10">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {placements.length === 0 ? (
              <tr>
                <td colSpan={21} className="py-8 text-center text-gray-500 font-normal">
                  No placements found for the selected filters.
                </td>
              </tr>
            ) : (
              placements.map((plc) => {
                const isSelected = selectedId === plc.id;
                const isChecked = selectedCheckboxes.includes(plc.id);

                return (
                  <tr
                    key={plc.id}
                    onClick={() => onSelectPlacement(plc)}
                    className={`transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-rose-50/50 hover:bg-rose-50"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleCheckbox(plc.id)}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020] cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-3 font-bold text-gray-900 flex items-center gap-2">
                      {getSurfaceIcon(plc.surface)}
                      <span>{plc.placementName}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-gray-600">
                      {plc.placementId}
                    </td>
                    <td className="py-2.5 px-3">
                      <PlacementStatusBadge status={plc.status} type="status" />
                    </td>
                    <td className="py-2.5 px-3 text-gray-700">{plc.surface}</td>
                    <td className="py-2.5 px-3 text-gray-600">{plc.type}</td>
                    <td className="py-2.5 px-3 text-gray-800 font-semibold">{plc.campaign}</td>
                    <td className="py-2.5 px-3 text-gray-600">{plc.audience}</td>
                    <td className="py-2.5 px-3 text-gray-600">{plc.content}</td>
                    <td className="py-2.5 px-3 text-gray-600 text-[11px]">{plc.device}</td>
                    <td className="py-2.5 px-3 text-gray-600 text-[11px]">{plc.startDate}</td>
                    <td className="py-2.5 px-3 text-gray-600 text-[11px]">{plc.endDate}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-gray-900">
                      {plc.priority}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-gray-900">
                      {plc.impressions}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-blue-700">
                      {plc.engagement}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-emerald-700">
                      {plc.conversion}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-800">
                      {plc.revenueReference}
                    </td>
                    <td className="py-2.5 px-3">
                      <PlacementStatusBadge status={plc.contentReadiness} type="contentReadiness" />
                    </td>
                    <td className="py-2.5 px-3">
                      <PlacementStatusBadge status={plc.governance} type="governance" />
                    </td>
                    <td className="py-2.5 px-3 text-gray-500 text-[11px]">
                      {plc.lastActivity}
                    </td>
                    <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
