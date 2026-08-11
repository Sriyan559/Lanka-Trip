"use client";

import React from "react";
import { CampaignOrchestrationWorkspace } from "@/components/admin/marketing/campaign-orchestration/CampaignOrchestrationWorkspace";

export default function EditCampaignPage({
  params,
}: {
  params: { campaignId: string };
}) {
  return (
    <CampaignOrchestrationWorkspace
      mode="Edit"
      campaignId={params.campaignId}
    />
  );
}
