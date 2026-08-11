"use client";

import React from "react";
import Link from "next/link";
import { MARKETING_PAID_MEDIA_MOCK_DATA } from "@/data/marketingPaidMedia.mock";
import { SelectedPaidCampaignWorkspace } from "@/components/admin/marketing/paid-media/selected/SelectedPaidCampaignWorkspace";
import { PaidMediaContextStrip } from "@/components/admin/marketing/paid-media/PaidMediaContextStrip";
import { ArrowLeft } from "lucide-react";

export default function PaidMediaDetailPage({
  params,
}: {
  params: { mediaId: string };
}) {
  const { mediaId } = params;

  // Find details by mediaId
  const details =
    MARKETING_PAID_MEDIA_MOCK_DATA.selectedCampaignDetails[mediaId] ||
    MARKETING_PAID_MEDIA_MOCK_DATA.selectedCampaignDetails["MED-0306-001"] ||
    null;

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col gap-3">
        {/* Top Breadcrumb & Return Link */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs">
          <Link
            href="/admin/marketing/paid-media"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Paid Media Campaigns</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/admin/marketing" className="hover:text-[#800020]">
              Marketing
            </Link>
            <span>/</span>
            <Link
              href="/admin/marketing/paid-media"
              className="hover:text-[#800020]"
            >
              Paid Media
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{mediaId}</span>
          </div>
        </div>

        {/* Business Context Strip */}
        <PaidMediaContextStrip context={MARKETING_PAID_MEDIA_MOCK_DATA.context} />

        {/* Full Selected Campaign Workspace */}
        <SelectedPaidCampaignWorkspace details={details} />
      </div>
    </div>
  );
}
