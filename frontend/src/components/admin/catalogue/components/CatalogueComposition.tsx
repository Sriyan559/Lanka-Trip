"use client";

import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChevronRight } from "lucide-react";
import { COMPOSITION_BY_CATEGORY, COMPOSITION_BY_BRAND } from "@/data/catalogue.mock";
import { CompositionDataItem } from "@/types/catalogue";

export const CatalogueComposition: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Category" | "Brand" | "Product Status" | "Business Unit" | "Publication Channel">("Category");

  const data: CompositionDataItem[] =
    activeTab === "Brand" ? COMPOSITION_BY_BRAND : COMPOSITION_BY_CATEGORY;

  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-sm font-bold text-gray-900">Catalogue Composition</h2>
          <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
            <span>View full composition</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-200 pb-2 mb-4 overflow-x-auto text-[11px] font-medium text-gray-500">
          {(["Category", "Brand", "Product Status", "Business Unit", "Publication Channel"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[#f5ebed] text-[#741d35] font-bold"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Chart + Legend Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Doughnut Chart with Center Text */}
          <div className="relative w-full h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${Number(value || 0).toLocaleString()} products`, "Count"]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "6px",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-black text-gray-900 leading-tight">12,840</span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Total</span>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2 text-[11.5px]">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-xs shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700 font-medium truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-gray-900">{item.percentage}%</span>
                  <span className="text-gray-400 text-[10.5px]">({item.count.toLocaleString()})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
