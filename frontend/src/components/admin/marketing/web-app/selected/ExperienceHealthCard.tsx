"use client";

import React from "react";
import { LandingPageHealthData } from "@/data/marketingWebApp.mock";

interface ExperienceHealthCardProps {
  health: LandingPageHealthData;
}

export function ExperienceHealthCard({ health }: ExperienceHealthCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Destination Landing Page Health
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Status</span>
            <span className="font-bold text-emerald-700">{health.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Load Time</span>
            <span className="font-bold text-emerald-700">{health.loadTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Mobile Performance</span>
            <span className="font-bold text-emerald-700">{health.mobilePerformance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Broken Links</span>
            <span className="font-bold text-gray-900">{health.brokenLinks}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Tracking</span>
            <span className="font-bold text-emerald-700">{health.tracking}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">SEO Metadata</span>
            <span className="text-gray-800 font-medium">{health.seoMetadata}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Accessibility</span>
            <span className="font-bold text-emerald-700">{health.accessibility}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          Open Landing Page
        </button>
      </div>
    </div>
  );
}
