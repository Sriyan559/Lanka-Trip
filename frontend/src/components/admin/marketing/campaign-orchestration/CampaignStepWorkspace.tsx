"use client";

import React from "react";
import { OrchestrationStepId, ChannelCardData } from "@/data/campaignOrchestration.mock";
import { CampaignChannelsWorkspace } from "./CampaignChannelsWorkspace";

export function CampaignStepWorkspace({
  activeStep,
  channels,
  onTargetStepSelect,
}: {
  activeStep: OrchestrationStepId;
  channels: ChannelCardData[];
  onTargetStepSelect: (stepId: OrchestrationStepId) => void;
}) {
  if (activeStep === "channels") {
    return (
      <CampaignChannelsWorkspace
        channels={channels}
        onAddChannel={() => {}}
        onResolveWarning={() => onTargetStepSelect("channels")}
      />
    );
  }

  const STEP_TITLES: Record<OrchestrationStepId, { title: string; subtitle: string }> = {
    basics: {
      title: "1. Campaign Basics",
      subtitle: "Configure campaign code, title, business unit, brand, owner and target regional markets.",
    },
    objectives: {
      title: "2. Objectives & Success Metrics",
      subtitle: "Define revenue targets, ROAS minimums, conversion rates, and acquisition volume goals.",
    },
    audience: {
      title: "3. Audience & Eligibility",
      subtitle: "Select target segments, suppression rules, frequency caps, and consent requirements.",
    },
    channels: { title: "4. Channels", subtitle: "Configure delivery channels and orchestration." },
    content: {
      title: "5. Content & Creative",
      subtitle: "Link creative assets, banners, video variants, and verify placement readiness.",
    },
    schedule: {
      title: "6. Schedule & Timing",
      subtitle: "Set campaign start/end dates, send windows, and channel dispatch sequencing.",
    },
    budget: {
      title: "7. Budget & Spend Controls",
      subtitle: "Allocate channel budgets, spend caps, commitment thresholds, and CPA target guardrails.",
    },
    promotions: {
      title: "8. Marketplace Promotions",
      subtitle: "Reference linked marketplace flash sales, discounts, and retail promotional codes.",
    },
    tracking: {
      title: "9. Tracking & Attribution",
      subtitle: "Configure UTM parameters, pixel tracking IDs, and Shapley attribution model settings.",
    },
    governance: {
      title: "10. Governance & Consent",
      subtitle: "Verify policy compliance, privacy consent thresholds, and risk classification.",
    },
    review: {
      title: "11. Review & Approval",
      subtitle: "Audit validation checks, signoff statuses, and submit campaign draft revision for publication.",
    },
  };

  const currentInfo = STEP_TITLES[activeStep] || {
    title: "Campaign Orchestration",
    subtitle: "Configure step parameters.",
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs font-sans flex flex-col gap-4 min-h-[500px]">
      <div className="border-b border-gray-100 pb-3">
        <h2 className="text-base font-bold text-gray-900">{currentInfo.title}</h2>
        <p className="text-xs text-gray-500 font-medium mt-0.5">{currentInfo.subtitle}</p>
      </div>

      <div className="bg-gray-50/70 border border-gray-200/60 rounded-xl p-6 flex flex-col items-center justify-center text-center my-auto">
        <span className="text-xs font-bold text-[#800020] uppercase tracking-wider mb-1">
          {activeStep.toUpperCase()} STEP CONFIGURATION
        </span>
        <p className="text-xs text-gray-600 max-w-md">
          {currentInfo.subtitle} All data updated in this panel is saved directly into Draft Revision v7.
        </p>
      </div>
    </div>
  );
}
