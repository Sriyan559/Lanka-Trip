"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Megaphone } from "lucide-react";

export default function CampaignDetailPage({
  params,
}: {
  params: { campaignId: string };
}) {
  return (
    <div className="min-h-screen bg-[#faf8f8] p-4 text-gray-900 font-sans flex flex-col items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-lg text-center shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#800020] mx-auto mb-4">
          <Megaphone className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">
          Campaign Detail Workspace (MK03)
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Target Campaign ID: <code className="font-mono text-[#800020] font-bold">{params.campaignId}</code>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Detailed metrics, audience segmentation, budget allocation, channel schedules and governance history for this campaign.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/admin/marketing/campaigns"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Campaigns</span>
          </Link>
          <Link
            href={`/admin/marketing/campaigns/${params.campaignId}/edit`}
            className="px-4 py-2 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-xs transition-colors"
          >
            Edit Campaign
          </Link>
        </div>
      </div>
    </div>
  );
}
