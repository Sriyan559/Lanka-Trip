"use client";

import React from "react";
import Link from "next/link";
import { SelectedChannelDetails } from "@/data/marketingChannels.mock";
import { ExternalLink } from "lucide-react";

import { ProviderConnectionCard } from "./ProviderConnectionCard";
import { SenderIdentityCard } from "./SenderIdentityCard";
import { DeliveryPerformanceCard } from "./DeliveryPerformanceCard";
import { DeliveryFailuresCard } from "./DeliveryFailuresCard";
import { ChannelSuppressionsCard } from "./ChannelSuppressionsCard";
import { DeliveryQueueCard } from "./DeliveryQueueCard";

import { RoutingFallbackCard } from "./RoutingFallbackCard";
import { LimitsFrequencyCard } from "./LimitsFrequencyCard";
import { EligibilityConsentCard } from "./EligibilityConsentCard";
import { CampaignUsageCard } from "./CampaignUsageCard";
import { JourneyUsageCard } from "./JourneyUsageCard";
import { MessageContentCard } from "./MessageContentCard";

import { GovernanceComplianceCard } from "./GovernanceComplianceCard";
import { ChannelExceptionsCard } from "./ChannelExceptionsCard";
import { ProviderHealthCard } from "./ProviderHealthCard";
import { ChannelActivityTable } from "./ChannelActivityTable";

interface SelectedChannelWorkspaceProps {
  details: SelectedChannelDetails | null;
}

export function SelectedChannelWorkspace({ details }: SelectedChannelWorkspaceProps) {
  if (!details) {
    return (
      <div className="bg-white border border-gray-200/80 rounded-xl p-8 text-center text-gray-500 shadow-2xs">
        <p className="text-sm font-semibold">Select a channel to view operational details.</p>
      </div>
    );
  }

  const { channel } = details;

  return (
    <div className="flex flex-col gap-3">
      {/* Selected Channel Workspace Header */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              Selected Channel — <span className="text-[#800020]">{channel.channelName}</span>
            </span>
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              Channel ID: {channel.channelId}
            </span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {channel.status}
            </span>
            <span className="px-2 py-0.5 rounded font-medium bg-emerald-50/60 text-emerald-800 border border-emerald-200">
              Provider Sync: {details.providerConnection.connectionStatus}
            </span>
            <span className="px-2 py-0.5 rounded font-medium bg-emerald-50/60 text-emerald-800 border border-emerald-200">
              Sender Verified
            </span>
            <span className="px-2 py-0.5 rounded font-medium bg-emerald-50/60 text-emerald-800 border border-emerald-200">
              Consent Scope: {channel.consentScope}
            </span>
          </div>
        </div>

        {/* Open Channel Detail Link */}
        <Link
          href={`/admin/marketing/channels/${channel.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800020] hover:text-[#66001a] hover:underline"
        >
          <span>Open Channel Detail</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Row 1 Cards (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 items-stretch">
        <ProviderConnectionCard details={details.providerConnection} />
        <SenderIdentityCard details={details.senderIdentity} />
        <DeliveryPerformanceCard details={details.deliveryPerformance} />
        <DeliveryFailuresCard details={details.deliveryFailures} />
        <ChannelSuppressionsCard details={details.channelSuppressions} />
        <DeliveryQueueCard details={details.deliveryQueue} />
      </div>

      {/* Row 2 Cards (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 items-stretch">
        <RoutingFallbackCard details={details.routingFallback} />
        <LimitsFrequencyCard details={details.limitsFrequency} />
        <EligibilityConsentCard details={details.eligibilityConsent} />
        <CampaignUsageCard details={details.campaignUsage} />
        <JourneyUsageCard details={details.journeyUsage} />
        <MessageContentCard details={details.messageContent} />
      </div>

      {/* Lower Operational Cards (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 items-stretch">
        <div className="xl:col-span-3">
          <GovernanceComplianceCard details={details.governanceCompliance} />
        </div>
        <div className="xl:col-span-3">
          <ChannelExceptionsCard details={details.activeExceptions} />
        </div>
        <div className="xl:col-span-3">
          <ProviderHealthCard details={details.providerHealth} />
        </div>
        <div className="xl:col-span-3">
          <ChannelActivityTable activities={details.recentActivity} />
        </div>
      </div>
    </div>
  );
}
