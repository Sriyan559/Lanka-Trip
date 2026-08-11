"use client";

import React, { useState } from "react";
import { ExperiencePreviewData } from "@/data/marketingWebApp.mock";
import { Monitor, Tablet, Smartphone } from "lucide-react";

interface ExperiencePreviewProps {
  preview: ExperiencePreviewData;
}

export function ExperiencePreview({ preview }: ExperiencePreviewProps) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedAudience, setSelectedAudience] = useState("All Marketable Customers");

  const getContainerWidth = () => {
    switch (deviceMode) {
      case "mobile":
        return "max-w-[280px]";
      case "tablet":
        return "max-w-[420px]";
      case "desktop":
      default:
        return "w-full";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
          <h4 className="text-xs font-bold text-gray-900">Live Experience Preview</h4>

          <div className="flex items-center gap-2">
            {/* Device Selector */}
            <div className="inline-flex bg-gray-100 p-0.5 rounded-lg text-xs font-semibold text-gray-600">
              <button
                onClick={() => setDeviceMode("desktop")}
                className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                  deviceMode === "desktop"
                    ? "bg-white text-[#800020] shadow-2xs font-bold"
                    : "hover:text-gray-900"
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setDeviceMode("tablet")}
                className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                  deviceMode === "tablet"
                    ? "bg-white text-[#800020] shadow-2xs font-bold"
                    : "hover:text-gray-900"
                }`}
              >
                <Tablet className="w-3 h-3" />
                <span>Tablet</span>
              </button>
              <button
                onClick={() => setDeviceMode("mobile")}
                className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                  deviceMode === "mobile"
                    ? "bg-white text-[#800020] shadow-2xs font-bold"
                    : "hover:text-gray-900"
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>Mobile</span>
              </button>
            </div>

            {/* Audience Selector */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-gray-400 font-medium">Preview as Audience:</span>
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded px-2 py-0.5 text-[11px] font-semibold text-gray-700 focus:outline-none"
              >
                <option value="All Marketable Customers">All Marketable Customers</option>
                <option value="VIP Customers">VIP Customers</option>
                <option value="New Visitors">New Visitors</option>
              </select>
            </div>
          </div>
        </div>

        {/* Viewport Frame */}
        <div className="mt-3 flex justify-center bg-gray-50/50 p-3 rounded-lg border border-gray-100 min-h-[180px]">
          <div
            className={`transition-all duration-300 ${getContainerWidth()} rounded-lg overflow-hidden border border-rose-200/60 shadow-xs bg-gradient-to-r from-rose-900 via-[#800020] to-rose-950 p-4 text-white flex flex-col justify-between relative`}
          >
            <div className="space-y-1 z-10">
              <span className="inline-block px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs">
                Summer Campaign
              </span>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight leading-snug">
                {preview.heroTitle}
              </h3>
              <p className="text-xs text-rose-100 opacity-90 line-clamp-2">
                {preview.heroSubtitle}
              </p>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between z-10">
              <button className="px-3.5 py-1.5 text-xs font-bold bg-white text-[#800020] rounded-md shadow-xs hover:bg-rose-50 transition-colors cursor-pointer">
                {preview.ctaText}
              </button>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
              </div>
            </div>

            {/* Subtle decorative glow overlay */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-rose-500/20 rounded-full blur-xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
