"use client";

import React from "react";
import Link from "next/link";
import { MARKETING_WEB_APP_MOCK_DATA } from "@/data/marketingWebApp.mock";
import { SelectedPlacementWorkspace } from "@/components/admin/marketing/web-app/selected/SelectedPlacementWorkspace";
import { PlacementContextStrip } from "@/components/admin/marketing/web-app/PlacementContextStrip";
import { ArrowLeft } from "lucide-react";

export default function PlacementDetailPage({
  params,
}: {
  params: { placementId: string };
}) {
  const { placementId } = params;

  // Find placement details by id
  const details =
    MARKETING_WEB_APP_MOCK_DATA.selectedPlacementDetails[placementId] ||
    MARKETING_WEB_APP_MOCK_DATA.selectedPlacementDetails["PLC-2026-0011"] ||
    null;

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col gap-3">
        {/* Top Breadcrumb & Return Link */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs">
          <Link
            href="/admin/marketing/web-app-campaigns"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Web & App Placements</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/admin/marketing" className="hover:text-[#800020]">
              Marketing
            </Link>
            <span>/</span>
            <Link
              href="/admin/marketing/web-app-campaigns"
              className="hover:text-[#800020]"
            >
              Web & App Campaigns
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{placementId}</span>
          </div>
        </div>

        {/* Business Context Strip */}
        <PlacementContextStrip context={MARKETING_WEB_APP_MOCK_DATA.context} />

        {/* Selected Placement Full Detailed Workspace */}
        <SelectedPlacementWorkspace details={details} />
      </div>
    </div>
  );
}
