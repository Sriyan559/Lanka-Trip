"use client";

import React from "react";
import { OrchestrationContextData } from "@/data/campaignOrchestration.mock";
import { CheckCircle2, Edit3, ChevronDown } from "lucide-react";

export function CampaignDraftContextStrip({
  context,
}: {
  context: OrchestrationContextData;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs font-sans text-xs flex flex-wrap items-center justify-between gap-y-2 gap-x-3">
      <div className="flex items-center gap-3.5 flex-wrap">
        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Tenant</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.tenant}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Ecosystem</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.ecosystem}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Business Unit</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.businessUnit}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Region</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.region}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Base Currency</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.baseCurrency}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Campaign Type</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.campaignType}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Editing Mode</span>
          <span className="font-semibold text-gray-900 text-[11px] flex items-center gap-1">
            {context.editingMode}
            <Edit3 className="w-3 h-3 text-gray-400" />
          </span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Draft Status</span>
          <span className="font-bold text-emerald-700 text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            {context.draftStatus}
          </span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Version</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.version}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Last Saved</span>
          <span className="font-medium text-gray-700 text-[10px]">{context.lastSaved}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div className="flex flex-col min-w-[110px]">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-gray-400 font-medium uppercase tracking-tight">Configuration</span>
            <span className="font-bold text-gray-900">{context.completenessPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mt-0.5">
            <div
              className="bg-[#800020] h-full rounded-full"
              style={{ width: `${context.completenessPercent}%` }}
            />
          </div>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Governance Checks</span>
          <span className="font-semibold text-amber-700 text-[11px]">{context.governanceChecks}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
        <span className="text-gray-400">Access:</span>
        <span className="font-semibold text-gray-800">{context.access}</span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </div>
    </div>
  );
}
