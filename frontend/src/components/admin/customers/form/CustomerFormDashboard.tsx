"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CustomerFormHeader } from "./CustomerFormHeader";
import { CustomerFormStepper } from "./CustomerFormStepper";
import { CustomerFormTopKpis } from "./CustomerFormTopKpis";
import { CustomerBasicIdentityForm } from "./CustomerBasicIdentityForm";
import {
  CustomerBusinessContextCard,
  CustomerDuplicateIntelligenceCard,
  CustomerCorrectiveActionsCard,
  CustomerCrossStepSummary,
} from "./CustomerFormBottomCards";
import { CustomerOnboardingRightRail } from "./CustomerOnboardingRightRail";
import { CustomerStickyBottomBar } from "./CustomerStickyBottomBar";
import { CustomerFormPreviewModal } from "./CustomerFormPreviewModal";
import { CustomerContextStrip } from "../CustomerContextStrip";
import { CustomerConcurrencyNotice } from "../detail/CustomerConcurrencyNotice";
import { getCustomerFormInitialData } from "@/data/customer-form.mock";
import { CustomerFormMode, CustomerFormFullData, CustomerBasicIdentityFormState } from "@/types/customer-form";
import { RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";

interface CustomerFormDashboardProps {
  mode: CustomerFormMode;
  customerId?: string;
}

export function CustomerFormDashboard({ mode, customerId }: CustomerFormDashboardProps) {
  const router = useRouter();
  const [data, setData] = useState<CustomerFormFullData | null>(null);
  const [currentStepNumber, setCurrentStepNumber] = useState(2); // Default Step 2 Basic Identity
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    setIsLoading(true);
    const initial = getCustomerFormInitialData(mode, customerId);
    setData(initial);
    setIsLoading(false);
  }, [mode, customerId]);

  const handleFieldChange = (field: keyof CustomerBasicIdentityFormState, value: string) => {
    if (!data) return;
    setIsDirty(true);
    setData({
      ...data,
      basicIdentity: {
        ...data.basicIdentity,
        [field]: value,
      },
    });

    if (validationErrors[field]) {
      const nextErrors = { ...validationErrors };
      delete nextErrors[field];
      setValidationErrors(nextErrors);
    }
  };

  const handleValidate = () => {
    if (!data) return;
    const errors: Record<string, string> = {};
    const identity = data.basicIdentity;

    if (!identity.title) errors.title = "Title is required";
    if (!identity.firstName) errors.firstName = "First Name is required";
    if (!identity.lastName) errors.lastName = "Last Name is required";
    if (!identity.displayName) errors.displayName = "Display Name is required";
    if (!identity.dob) errors.dob = "Date of Birth is required";
    if (!identity.gender) errors.gender = "Gender is required";

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      showToast("Validation failed: Please resolve highlighted required fields.");
    } else {
      showToast("Validation passed! All required fields are valid.");
    }
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    showToast("Saving draft form state...");
    setTimeout(() => {
      setIsSaving(false);
      setIsDirty(false);
      showToast("Draft saved successfully.");
    }, 600);
  };

  const handleSaveAndContinue = () => {
    handleValidate();
    setIsSaving(true);
    showToast("Saving & continuing to next step...");
    setTimeout(() => {
      setIsSaving(false);
      setIsDirty(false);
      if (currentStepNumber < 13) {
        setCurrentStepNumber((prev) => prev + 1);
      }
      showToast("Progress saved. Moved to next step.");
    }, 500);
  };

  const handleSaveChanges = () => {
    handleSaveDraft();
  };

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm("You have unsaved changes. Are you sure you want to exit?")) {
        navigateBack();
      }
    } else {
      navigateBack();
    }
  };

  const navigateBack = () => {
    if (mode === "edit" && customerId) {
      router.push(`/admin/customers/${customerId}`);
    } else {
      router.push("/admin/customers/directory");
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast("Refreshing form data...");
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Form data refreshed.");
    }, 500);
  };

  if (isLoading || !data) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="h-10 bg-slate-200 rounded w-full" />
        <div className="h-16 bg-slate-200 rounded w-full" />
        <div className="h-40 bg-slate-200 rounded w-full" />
      </div>
    );
  }

  const currentStep = data.workflowSteps.find((s) => s.stepNumber === currentStepNumber) || data.workflowSteps[1];

  return (
    <div className="space-y-3.5 p-3.5 sm:p-5 max-w-[1920px] mx-auto min-w-0 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <CustomerFormHeader
        mode={mode}
        customerId={customerId}
        onCancel={handleCancel}
        onPreview={() => setIsPreviewOpen(true)}
        onValidate={handleValidate}
        onSaveDraft={handleSaveDraft}
        onSaveAndContinue={handleSaveAndContinue}
        isSaving={isSaving}
      />

      {/* Business Context Strip */}
      <CustomerContextStrip onRefresh={handleRefresh} isRefreshing={isRefreshing} />

      {/* Concurrency Banner in Edit mode */}
      {mode === "edit" && (
        <CustomerConcurrencyNotice
          updatedBy="another administrator"
          updatedAgo="2 minutes ago"
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
      )}

      {/* 13-Step Workflow Stepper */}
      <CustomerFormStepper
        steps={data.workflowSteps}
        currentStepNumber={currentStepNumber}
        onSelectStep={setCurrentStepNumber}
      />

      {/* Top 10 Completion Metric Cards */}
      <CustomerFormTopKpis metrics={data.completenessMetrics} />

      {/* Main Form 2-Column Grid (Left ~75% + Right ~25% Onboarding Health Rail) */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Left Main Workspace (3 Cols on XL) */}
        <div className="xl:col-span-3 space-y-4 min-w-0">
          {/* Active Step Form (Step 2 Basic Identity or fallback notice for other steps) */}
          {currentStepNumber === 2 ? (
            <CustomerBasicIdentityForm
              formState={data.basicIdentity}
              onChange={handleFieldChange}
              errors={validationErrors}
            />
          ) : (
            <div className="bg-white border border-line rounded-lg p-6 text-center space-y-2">
              <span className="px-2.5 py-1 rounded bg-rose-50 text-[#671021] font-mono font-bold text-xs">
                Step {currentStepNumber} / 13 — {currentStep.label}
              </span>
              <h3 className="text-base font-bold text-ink">
                {currentStep.label} Workflow Section
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Configure {currentStep.label} preferences, metadata, and review criteria. Switch back to Step 2 to edit core Basic Identity fields.
              </p>
            </div>
          )}

          {/* Lower 3 Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <CustomerBusinessContextCard data={data} showToast={showToast} />
            <CustomerDuplicateIntelligenceCard data={data} showToast={showToast} />
            <CustomerCorrectiveActionsCard data={data} showToast={showToast} />
          </div>

          {/* Cross-Step Summary Card */}
          <CustomerCrossStepSummary data={data} />
        </div>

        {/* Right Onboarding Health Rail (1 Col on XL) */}
        <div className="xl:col-span-1 min-w-0">
          <CustomerOnboardingRightRail
            data={data}
            showToast={showToast}
            onSaveDraft={handleSaveDraft}
            onValidate={handleValidate}
            onPreview={() => setIsPreviewOpen(true)}
            onSaveAndContinue={handleSaveAndContinue}
            isSaving={isSaving}
          />
        </div>
      </div>

      {/* Sticky Fixed Bottom Workflow Control Bar */}
      <CustomerStickyBottomBar
        currentStepNumber={currentStepNumber}
        totalSteps={13}
        stepLabel={currentStep.label}
        autosaveText={data.completenessMetrics.autosaveStatus}
        onCancel={handleCancel}
        onBack={() => setCurrentStepNumber((prev) => Math.max(1, prev - 1))}
        onSaveDraft={handleSaveDraft}
        onSaveAndContinue={handleSaveAndContinue}
        onValidate={handleValidate}
        onPreview={() => setIsPreviewOpen(true)}
        onSaveChanges={handleSaveChanges}
        isSaving={isSaving}
      />

      {/* Live Form Preview Modal */}
      <CustomerFormPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={data}
      />
    </div>
  );
}
