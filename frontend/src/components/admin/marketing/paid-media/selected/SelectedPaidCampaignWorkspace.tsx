"use client";

import React from "react";
import Link from "next/link";
import { SelectedPaidCampaignDetails } from "@/data/marketingPaidMedia.mock";
import { ExternalLink } from "lucide-react";

import { PaidCampaignDetailsCard } from "./PaidCampaignDetailsCard";
import { PlatformConnectionCard } from "./PlatformConnectionCard";
import { AudienceActivationCard } from "./AudienceActivationCard";
import { CreativeReadinessCard } from "./CreativeReadinessCard";
import { SpendPacingCard } from "./SpendPacingCard";
import { DeliveryPerformanceCard } from "./DeliveryPerformanceCard";
import { AcquisitionPerformanceCard } from "./AcquisitionPerformanceCard";
import { RevenueRoasReferenceCard } from "./RevenueRoasReferenceCard";

import { TrackingMeasurementCard } from "./TrackingMeasurementCard";
import { BiddingOptimizationCard } from "./BiddingOptimizationCard";
import { PlatformPolicyCard } from "./PlatformPolicyCard";
import { PlatformReconciliationCard } from "./PlatformReconciliationCard";
import { AdvertisingExceptionsCard } from "./AdvertisingExceptionsCard";
import { LinkedMarketingCampaignCard } from "./LinkedMarketingCampaignCard";
import { LinkedAudiencesCard } from "./LinkedAudiencesCard";
import { LinkedCreativeCard } from "./LinkedCreativeCard";

import { AdvertisingAccountHealthCard } from "./AdvertisingAccountHealthCard";
import { PaidMediaGovernanceCard } from "./PaidMediaGovernanceCard";
import { PaidMediaActivityCard } from "./PaidMediaActivityCard";
import { PaidCampaignConfigurationCard } from "./PaidCampaignConfigurationCard";

interface SelectedPaidCampaignWorkspaceProps {
  details: SelectedPaidCampaignDetails | null;
}

export function SelectedPaidCampaignWorkspace({ details }: SelectedPaidCampaignWorkspaceProps) {
  if (!details) {
    return (
      <div className="bg-white border border-rose-200/80 rounded-xl p-8 text-center text-gray-500 shadow-2xs">
        <p className="text-sm font-semibold">Select a paid media campaign to view operational details.</p>
      </div>
    );
  }

  const { campaign, summaryMetrics } = details;

  return (
    <div className="bg-[#faf8f8] border border-rose-200/80 rounded-xl p-3 sm:p-4 shadow-2xs flex flex-col gap-3">
      {/* Selected Paid Campaign Header Strip */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            Selected Paid Campaign — <span className="text-[#800020]">{campaign.paidCampaign}</span>
          </span>

          {/* Health & Sync Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              ● Platform Synced
            </span>
            <span className="px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              ● Tracking Healthy
            </span>
            <span className="px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              ● Governance Clear
            </span>
          </div>
        </div>

        {/* Open Paid Campaign Detail Link */}
        <Link
          href={`/admin/marketing/paid-media/${campaign.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800020] hover:text-[#66001a] hover:underline"
        >
          <span>Open Paid Campaign Detail</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Summary Metrics Strip */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 text-xs text-gray-700">
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Budget</span>
          <span className="font-bold text-gray-900">{summaryMetrics.budget}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Spend</span>
          <span className="font-bold text-blue-700">{summaryMetrics.spend}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Impressions</span>
          <span className="font-bold text-gray-900">{summaryMetrics.impressions}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Clicks</span>
          <span className="font-bold text-blue-700">{summaryMetrics.clicks}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">CTR</span>
          <span className="font-bold text-gray-900">{summaryMetrics.ctr}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Conversions</span>
          <span className="font-bold text-emerald-700">{summaryMetrics.conversions}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">CPA</span>
          <span className="font-bold text-gray-900">{summaryMetrics.cpa}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">ROAS Reference</span>
          <span className="font-bold text-emerald-800">{summaryMetrics.roasReference}</span>
        </div>
      </div>

      {/* Card Grid ROW 1: 8 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 items-stretch">
        <PaidCampaignDetailsCard details={details.details} />
        <PlatformConnectionCard connection={details.platformConnection} />
        <AudienceActivationCard activation={details.audienceActivation} />
        <CreativeReadinessCard creative={details.creativeReadiness} />
        <SpendPacingCard spendPacing={details.spendPacing} />
        <DeliveryPerformanceCard delivery={details.deliveryPerformance} />
        <AcquisitionPerformanceCard acquisition={details.acquisitionPerformance} />
        <RevenueRoasReferenceCard revenueRoas={details.revenueRoasReference} />
      </div>

      {/* Card Grid ROW 2: 8 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 items-stretch">
        <TrackingMeasurementCard tracking={details.trackingMeasurement} />
        <BiddingOptimizationCard bidding={details.biddingOptimization} />
        <PlatformPolicyCard policy={details.platformPolicy} />
        <PlatformReconciliationCard reconciliation={details.platformReconciliation} />
        <AdvertisingExceptionsCard exceptions={details.activeExceptions} />
        <LinkedMarketingCampaignCard linkedCampaign={details.linkedMarketingCampaign} />
        <LinkedAudiencesCard audiences={details.linkedAudiences} />
        <LinkedCreativeCard creative={details.linkedCreative} />
      </div>

      {/* Card Grid ROW 3: 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-stretch">
        <AdvertisingAccountHealthCard accountHealth={details.accountHealth} />
        <PaidMediaGovernanceCard governance={details.governance} />
        <PaidMediaActivityCard activity={details.recentActivity} />
        <PaidCampaignConfigurationCard configuration={details.configuration} />
      </div>
    </div>
  );
}
