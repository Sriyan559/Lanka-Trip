"use client";

import React from "react";
import Link from "next/link";
import { SelectedPlacementDetails } from "@/data/marketingWebApp.mock";
import { ExternalLink } from "lucide-react";

import { ExperiencePreview } from "./ExperiencePreview";
import { PlacementDetailsCard } from "./PlacementDetailsCard";
import { PlacementTargetingCard } from "./PlacementTargetingCard";
import { AssignedContentCard } from "./AssignedContentCard";
import { PlacementScheduleCard } from "./PlacementScheduleCard";
import { MerchandisingRulesCard } from "./MerchandisingRulesCard";
import { MerchandisingReferencesCard } from "./MerchandisingReferencesCard";
import { PlacementConflictCard } from "./PlacementConflictCard";
import { DeviceReadinessCard } from "./DeviceReadinessCard";
import { PlacementPerformanceCard } from "./PlacementPerformanceCard";
import { InteractionFunnelCard } from "./InteractionFunnelCard";
import { ExperienceHealthCard } from "./ExperienceHealthCard";
import { PersonalizationCard } from "./PersonalizationCard";
import { ExperimentReferencesCard } from "./ExperimentReferencesCard";
import { PlacementExceptionsCard } from "./PlacementExceptionsCard";
import { GovernanceComplianceCard } from "./GovernanceComplianceCard";
import { LinkedCampaignCard } from "./LinkedCampaignCard";
import { PlacementActivityCard } from "./PlacementActivityCard";
import { PlacementVersioningCard } from "./PlacementVersioningCard";

interface SelectedPlacementWorkspaceProps {
  details: SelectedPlacementDetails | null;
}

export function SelectedPlacementWorkspace({ details }: SelectedPlacementWorkspaceProps) {
  if (!details) {
    return (
      <div className="bg-white border border-gray-200/80 rounded-xl p-8 text-center text-gray-500 shadow-2xs">
        <p className="text-sm font-semibold">Select a placement to view experience details.</p>
      </div>
    );
  }

  const { placement } = details;

  return (
    <div className="flex flex-col gap-3">
      {/* Selected Placement Header Strip */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              Selected Placement — <span className="text-[#800020]">{placement.placementName}</span>
            </span>
          </div>

          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {placement.status}
            </span>
            <span className="px-2 py-0.5 rounded font-medium bg-emerald-50/60 text-emerald-800 border border-emerald-200">
              Ready
            </span>
            <span className="px-2 py-0.5 rounded font-medium bg-emerald-50/60 text-emerald-800 border border-emerald-200">
              Clear
            </span>
          </div>

          {/* Header Metrics Summary Strip */}
          <div className="flex flex-wrap items-center gap-3 text-xs border-l border-gray-200 pl-3 text-gray-600">
            <div>
              <span className="text-[10px] text-gray-400 font-medium block">Impressions</span>
              <span className="font-bold text-gray-900">{placement.impressions}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-medium block">Engagement Rate</span>
              <span className="font-bold text-blue-700">{placement.engagement}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-medium block">Conversion Rate</span>
              <span className="font-bold text-emerald-700">{placement.conversion}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-medium block">Revenue Reference</span>
              <span className="font-bold text-emerald-800">{placement.revenueReference}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-medium block">Priority</span>
              <span className="font-bold text-gray-900">{placement.priority}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-medium block">Content Readiness</span>
              <span className="font-bold text-emerald-700">{placement.contentReadiness}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-medium block">Experience Health</span>
              <span className="font-bold text-emerald-700">97%</span>
            </div>
          </div>
        </div>

        {/* Open Placement Detail Link */}
        <Link
          href={`/admin/marketing/web-app-campaigns/${placement.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800020] hover:text-[#66001a] hover:underline"
        >
          <span>Open Placement Detail</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid Row 1: Experience Preview + Placement Details */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-stretch">
        <div className="xl:col-span-8">
          <ExperiencePreview preview={details.preview} />
        </div>
        <div className="xl:col-span-4">
          <PlacementDetailsCard details={details.details} />
        </div>
      </div>

      {/* Grid Row 2: Targeting, Content, Schedule, Merchandising Rules, References */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 items-stretch">
        <PlacementTargetingCard targeting={details.targeting} />
        <AssignedContentCard content={details.content} />
        <PlacementScheduleCard schedule={details.schedule} />
        <MerchandisingRulesCard rules={details.merchandisingRules} />
        <MerchandisingReferencesCard references={details.merchandisingReferences} />
      </div>

      {/* Grid Row 3: Conflict, Devices, Performance, Funnel, Landing Page Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 items-stretch">
        <PlacementConflictCard conflict={details.conflictAnalysis} />
        <DeviceReadinessCard device={details.deviceReadiness} />
        <PlacementPerformanceCard trendData={details.performanceTrend} />
        <InteractionFunnelCard stages={details.funnelStages} />
        <ExperienceHealthCard health={details.landingPageHealth} />
      </div>

      {/* Grid Row 4: Personalization, Experiments, Exceptions, Governance */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-stretch">
        <PersonalizationCard personalization={details.personalization} />
        <ExperimentReferencesCard experiment={details.experiment} />
        <PlacementExceptionsCard exceptions={details.exceptions} />
        <GovernanceComplianceCard governance={details.governance} />
      </div>

      {/* Grid Row 5: Linked Campaign, Recent Activity, Versioning & Publication */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
        <LinkedCampaignCard campaign={details.linkedCampaign} />
        <PlacementActivityCard activities={details.recentActivity} />
        <PlacementVersioningCard versioning={details.versioning} />
      </div>
    </div>
  );
}
