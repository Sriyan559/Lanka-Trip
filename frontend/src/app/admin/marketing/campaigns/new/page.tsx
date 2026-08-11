"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";

export default function CreateCampaignPage() {
  return (
    <div className="min-h-screen bg-[#faf8f8] p-4 text-gray-900 font-sans flex flex-col items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-lg text-center shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#800020] mx-auto mb-4">
          <PlusCircle className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">
          Create Campaign Form (MK04)
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Setup campaign parameters, target audience segments, marketing channels, budget caps, and governance rules.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/admin/marketing/campaigns"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Campaigns</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
