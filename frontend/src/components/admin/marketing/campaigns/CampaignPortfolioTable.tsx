"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CampaignPortfolioRecord } from "@/data/campaignManagement.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import { MoreVertical, ChevronLeft, ChevronRight, Eye, Edit2, Sliders } from "lucide-react";

interface CampaignPortfolioTableProps {
  records: CampaignPortfolioRecord[];
  selectedId: string;
  onSelectRecord: (rec: CampaignPortfolioRecord) => void;
}

export function CampaignPortfolioTable({
  records = [],
  selectedId,
  onSelectRecord,
}: CampaignPortfolioTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleSelectAll = () => {
    if (selectedIds.length === records.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(records.map((r) => r.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-100 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900">
            Campaign Portfolio
          </h3>
          <p className="text-[11px] text-gray-500">
            Manage all marketing campaigns in the selected tenant and business context.
          </p>
        </div>
      </div>

      {/* Enterprise Data Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-[11px] text-left text-gray-700 whitespace-nowrap">
          <thead className="bg-gray-50/90 text-gray-500 font-semibold border-b border-gray-100">
            <tr>
              <th className="py-2 px-2 text-center w-8">
                <input
                  type="checkbox"
                  checked={records.length > 0 && selectedIds.length === records.length}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                />
              </th>
              <th className="py-2 px-3">Campaign</th>
              <th className="py-2 px-2">Campaign ID</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Campaign Type</th>
              <th className="py-2 px-2">Owner</th>
              <th className="py-2 px-2">Business Unit</th>
              <th className="py-2 px-2">Channel</th>
              <th className="py-2 px-2 text-right">Audience</th>
              <th className="py-2 px-2">Start Date</th>
              <th className="py-2 px-2">End Date</th>
              <th className="py-2 px-2 text-right">Budget</th>
              <th className="py-2 px-2 text-right">Spend</th>
              <th className="py-2 px-2 text-right">Revenue</th>
              <th className="py-2 px-2 text-right">ROAS</th>
              <th className="py-2 px-2 text-right">Conversion</th>
              <th className="py-2 px-2">Approval</th>
              <th className="py-2 px-2">Governance</th>
              <th className="py-2 px-2">Delivery Health</th>
              <th className="py-2 px-2">Updated</th>
              <th className="py-2 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {records.length === 0 ? (
              <tr>
                <td colSpan={21} className="py-8 text-center text-gray-400 font-medium">
                  No campaigns found for the selected filters.
                </td>
              </tr>
            ) : (
              records.map((rec) => {
                const isSelected = rec.id === selectedId;
                const isChecked = selectedIds.includes(rec.id);

                return (
                  <tr
                    key={rec.id}
                    onClick={() => onSelectRecord(rec)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-rose-50/70 border-l-2 border-l-[#800020]"
                        : "hover:bg-gray-50/70"
                    }`}
                  >
                    <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelectRow(rec.id)}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020]"
                      />
                    </td>
                    <td className="py-2 px-3 font-semibold text-gray-900 hover:text-[#800020]">
                      <Link href={`/admin/marketing/campaigns/${rec.id}`}>
                        {rec.name}
                      </Link>
                    </td>
                    <td className="py-2 px-2 text-gray-500 font-mono text-[10px]">
                      {rec.code}
                    </td>
                    <td className="py-2 px-2">
                      <MarketingStatusChip status={rec.lifecycleStatus} />
                    </td>
                    <td className="py-2 px-2 text-gray-600 text-[10px]">{rec.type}</td>
                    <td className="py-2 px-2 text-gray-700">{rec.owner}</td>
                    <td className="py-2 px-2 text-gray-600">{rec.businessUnit}</td>
                    <td className="py-2 px-2 text-gray-600 text-[10px]">
                      {rec.channels.join(" + ")}
                    </td>
                    <td className="py-2 px-2 text-right font-semibold text-gray-900">
                      {rec.audience}
                    </td>
                    <td className="py-2 px-2 text-gray-500 text-[10px]">{rec.startDate}</td>
                    <td className="py-2 px-2 text-gray-500 text-[10px]">{rec.endDate}</td>
                    <td className="py-2 px-2 text-right text-gray-800">{rec.budget}</td>
                    <td className="py-2 px-2 text-right text-gray-900 font-bold">{rec.spend}</td>
                    <td className="py-2 px-2 text-right text-[#800020] font-bold">
                      {rec.revenue}
                    </td>
                    <td className="py-2 px-2 text-right text-emerald-700 font-bold">
                      {rec.roas}
                    </td>
                    <td className="py-2 px-2 text-right text-emerald-700 font-semibold">
                      {rec.conversion}
                    </td>
                    <td className="py-2 px-2">
                      <MarketingStatusChip status={rec.approvalStatus} />
                    </td>
                    <td className="py-2 px-2">
                      <MarketingStatusChip status={rec.governanceStatus} />
                    </td>
                    <td className="py-2 px-2">
                      <MarketingStatusChip status={rec.deliveryHealth} />
                    </td>
                    <td className="py-2 px-2 text-gray-400 text-[10px]">{rec.updated}</td>
                    <td className="py-2 px-2 text-center relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() =>
                          setActiveMenuId((prev) => (prev === rec.id ? null : rec.id))
                        }
                        className="p-1 hover:text-gray-700 rounded cursor-pointer"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {activeMenuId === rec.id && (
                        <div className="absolute right-2 top-8 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 text-[11px] text-left">
                          <Link
                            href={`/admin/marketing/campaigns/${rec.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                            onClick={() => setActiveMenuId(null)}
                          >
                            <Eye className="w-3.5 h-3.5 text-gray-400" />
                            <span>View Campaign</span>
                          </Link>
                          <Link
                            href={`/admin/marketing/campaigns/${rec.id}/edit`}
                            className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                            onClick={() => setActiveMenuId(null)}
                          >
                            <Edit2 className="w-3.5 h-3.5 text-gray-400" />
                            <span>Edit Campaign</span>
                          </Link>
                          <button
                            onClick={() => {
                              alert(`Duplicating ${rec.name}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-50 text-gray-700 text-left"
                          >
                            <Sliders className="w-3.5 h-3.5 text-gray-400" />
                            <span>Duplicate</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-3 py-2 bg-gray-50/70 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600 font-medium">
        <span>Showing 1 to 6 of 128 campaigns</span>

        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-gray-200 border border-gray-300 disabled:opacity-40">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button className="px-2 py-0.5 rounded bg-[#800020] text-white font-bold">1</button>
          <button className="px-2 py-0.5 rounded hover:bg-gray-200">2</button>
          <button className="px-2 py-0.5 rounded hover:bg-gray-200">3</button>
          <button className="px-2 py-0.5 rounded hover:bg-gray-200">4</button>
          <button className="px-2 py-0.5 rounded hover:bg-gray-200">5</button>
          <span className="px-1 text-gray-400">...</span>
          <button className="px-2 py-0.5 rounded hover:bg-gray-200">13</button>
          <button className="p-1 rounded hover:bg-gray-200 border border-gray-300">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select className="bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-gray-700 font-semibold">
            <option>10 / page</option>
            <option>25 / page</option>
            <option>50 / page</option>
          </select>
          <button className="px-2 py-0.5 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50">
            Columns
          </button>
        </div>
      </div>
    </div>
  );
}
