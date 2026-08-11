"use client";

import React from "react";
import { ChannelCardData } from "@/data/campaignOrchestration.mock";
import { OrchestrationFlowMap } from "./OrchestrationFlowMap";
import { Mail, Smartphone, Megaphone, Plus, MoreVertical, AlertTriangle } from "lucide-react";

const CHANNEL_ICONS: Record<string, React.ElementType> = {
  Email: Mail,
  "Web/App": Smartphone,
  "Paid Social": Megaphone,
};

export function CampaignChannelsWorkspace({
  channels = [],
  onAddChannel,
  onResolveWarning,
}: {
  channels: ChannelCardData[];
  onAddChannel?: () => void;
  onResolveWarning?: () => void;
}) {
  return (
    <div className="flex flex-col gap-3.5 font-sans">
      {/* Workspace Step Header */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-gray-900">
            Channel Selection & Orchestration
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Configure delivery channels and design the orchestration flow for this campaign.
          </p>
        </div>

        <button
          onClick={onAddChannel}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white border border-[#800020]/40 hover:bg-rose-50/50 rounded-lg transition-colors shadow-2xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Channel</span>
        </button>
      </div>

      {/* 3 Channel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
        {channels.map((ch) => {
          const IconComp = CHANNEL_ICONS[ch.type] || Mail;
          const isReady = ch.status === "Ready";

          return (
            <div
              key={ch.id}
              className={`bg-white border rounded-xl p-3.5 shadow-2xs flex flex-col justify-between transition-all ${
                isReady
                  ? "border-gray-200/80 border-l-4 border-l-emerald-500"
                  : "border-rose-200 border-l-4 border-l-rose-500 bg-rose-50/20"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isReady
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-rose-50 text-rose-600 border border-rose-100"
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">{ch.name}</h3>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded inline-block ${
                          isReady
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {ch.status}
                      </span>
                    </div>
                  </div>

                  <button className="text-gray-400 hover:text-gray-700 p-1 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Key-Value Fields */}
                <div className="space-y-1.5 text-xs">
                  {ch.fields.map((f) => (
                    <div key={f.label} className="grid grid-cols-[100px_1fr] gap-1 items-start">
                      <span className="text-gray-400 font-medium text-[10.5px] truncate">{f.label}</span>
                      <span className="font-semibold text-gray-900 text-[11px] leading-snug break-words">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Warning Footer */}
              {ch.warning && (
                <div className="mt-3 pt-2 border-t border-rose-200/80 bg-rose-50/80 -mx-3.5 -mb-3.5 p-2.5 rounded-b-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-rose-700 font-bold text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>{ch.warning.message}</span>
                  </div>
                  <button
                    onClick={onResolveWarning}
                    className="text-[11px] font-bold text-[#800020] hover:underline"
                  >
                    {ch.warning.actionText}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Orchestration Flow Map Component */}
      <OrchestrationFlowMap />
    </div>
  );
}
