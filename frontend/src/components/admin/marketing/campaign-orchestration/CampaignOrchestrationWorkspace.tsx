"use client";

import React, { useState } from "react";
import {
  mockCampaignOrchestrationData,
  OrchestrationStepId,
} from "@/data/campaignOrchestration.mock";
import { CampaignOrchestrationHeader } from "./CampaignOrchestrationHeader";
import { ActiveCampaignRevisionBanner } from "./ActiveCampaignRevisionBanner";
import { CampaignDraftContextStrip } from "./CampaignDraftContextStrip";
import { CampaignAutosaveBar } from "./CampaignAutosaveBar";
import { CampaignSetupStepper } from "./CampaignSetupStepper";
import { CampaignStepWorkspace } from "./CampaignStepWorkspace";
import { CampaignValidationRail } from "./CampaignValidationRail";
import { CampaignOrchestrationFooter } from "./CampaignOrchestrationFooter";

export function CampaignOrchestrationWorkspace({
  mode,
  campaignId,
}: {
  mode: "Create" | "Edit";
  campaignId?: string;
}) {
  const [data, setData] = useState(mockCampaignOrchestrationData);
  const [activeStep, setActiveStep] = useState<OrchestrationStepId>("channels");

  const displayCode = mode === "Edit" ? campaignId || data.code : undefined;
  const displayTitle = mode === "Edit" ? data.title : "New Campaign";

  const handleSaveDraft = () => {
    setData((prev) => ({
      ...prev,
      context: {
        ...prev.context,
        draftStatus: "Autosaved",
        lastSaved: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    }));
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans flex flex-col justify-between">
      <div className="max-w-[1920px] mx-auto w-full flex flex-col gap-3">
        {/* 1. HEADER */}
        <CampaignOrchestrationHeader
          mode={mode}
          title={displayTitle}
          code={displayCode}
          lifecycleStatus={mode === "Edit" ? data.lifecycleStatus : undefined}
          approvalStatus={mode === "Edit" ? data.approvalStatus : undefined}
          campaignId={campaignId}
          onSaveDraft={handleSaveDraft}
          onSaveAndContinue={() => {
            handleSaveDraft();
            setActiveStep("content");
          }}
        />

        {/* 2. REVISION BANNER (Edit mode for active campaign) */}
        {mode === "Edit" && data.isLive && (
          <ActiveCampaignRevisionBanner
            liveVersion={data.liveVersion}
            draftVersion={data.draftVersion}
          />
        )}

        {/* 3. CONTEXT STRIP */}
        <CampaignDraftContextStrip
          context={{
            ...data.context,
            editingMode: mode,
          }}
        />

        {/* 4. AUTOSAVE INDICATOR BAR */}
        <CampaignAutosaveBar />

        {/* 5. MAIN 3-COLUMN ORCHESTRATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_270px] gap-3 items-stretch w-full min-w-0 my-1">
          {/* LEFT: 11-step Wizard Stepper (~22%) */}
          <CampaignSetupStepper
            steps={data.stepper}
            activeStep={activeStep}
            readinessScore={data.validation.readinessScore}
            onStepSelect={(stepId) => setActiveStep(stepId)}
          />

          {/* CENTER: Active Step Workspace (~58%) */}
          <CampaignStepWorkspace
            activeStep={activeStep}
            channels={data.channels}
            onTargetStepSelect={(stepId) => setActiveStep(stepId)}
          />

          {/* RIGHT: Campaign Validation Rail (~20%) */}
          <CampaignValidationRail
            validation={data.validation}
            onTargetStepSelect={(stepId) => setActiveStep(stepId)}
          />
        </div>
      </div>

      {/* 6. STICKY WORKFLOW FOOTER */}
      <CampaignOrchestrationFooter
        mode={mode}
        campaignId={campaignId}
        blockerCount={data.validation.summary.blocker}
        lastSavedTime="10:42 AM"
        onSaveDraft={handleSaveDraft}
        onRunValidation={() => handleSaveDraft()}
        onSubmitForApproval={() => {}}
      />
    </div>
  );
}
