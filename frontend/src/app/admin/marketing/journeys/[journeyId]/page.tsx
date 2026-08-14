"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, GitCommit, ExternalLink } from "lucide-react";

export default function JourneyDetailPage({
  params,
}: {
  params: { journeyId: string };
}) {
  return (
    <div className="min-h-screen bg-[#faf8f8] p-4 text-gray-900 font-sans flex flex-col items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-lg text-center shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#800020] mx-auto mb-4">
          <GitCommit className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">
          Customer Journey Detail & Execution Flow
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Target Journey ID: <code className="font-mono text-[#800020] font-bold">{params?.journeyId || ""}</code>

        </p>
        <p className="text-xs text-gray-500 mt-1">
          Detailed step execution parameters, customer movement logs, channel dispatch health, and conversion attribution.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/admin/marketing/journeys"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journeys</span>
          </Link>
          <Link
            href="/admin/marketing/campaigns"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-xs transition-colors"
          >
            <span>Linked Campaigns</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
