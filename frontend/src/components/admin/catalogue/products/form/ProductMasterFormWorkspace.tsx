"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import {
  ProductFormMode,
  ProductStepId,
  FormulationIngredient,
  SafetyDeclarationCard,
  ProductMasterFormState,
  FormBlockingIssue,
} from "@/types/productForm";
import {
  INITIAL_WORKFLOW_STEPS,
  INITIAL_FORMULATION_INGREDIENTS,
  SAFETY_DECLARATION_CARDS,
  SAFETY_VALIDATION_FINDINGS,
  BLOCKING_ISSUES,
  CREATE_INITIAL_FORM_STATE,
  EDIT_PRODUCT_FORM_STATE,
} from "@/data/productForm.mock";

import { ProductFormHeader } from "./components/ProductFormHeader";
import { ProductFormBusinessContext } from "./components/ProductFormBusinessContext";
import { ProductFormWorkflow } from "./components/ProductFormWorkflow";
import { ProductFormCompletenessSummary } from "./components/ProductFormCompletenessSummary";
import { RegulatoryComplianceAlert } from "./components/RegulatoryComplianceAlert";
import { ProductReadinessSidebar } from "./components/ProductReadinessSidebar";
import { ProductFormStickyFooter } from "./components/ProductFormStickyFooter";
import { CrossStepSummary } from "./components/CrossStepSummary";

import { Step1Identity } from "./steps/Step1Identity";
import { Step2Classification } from "./steps/Step2Classification";
import { Step3BrandSupplier } from "./steps/Step3BrandSupplier";
import { Step4Content } from "./steps/Step4Content";
import { Step5IngredientsSafety } from "./steps/Step5IngredientsSafety";
import { Step6VariantsAttributes } from "./steps/Step6VariantsAttributes";
import { Step7ImagesMedia } from "./steps/Step7ImagesMedia";
import { Step8PricingTax } from "./steps/Step8PricingTax";
import { Step9InventoryPublication } from "./steps/Step9InventoryPublication";
import { Step10ReviewReadiness } from "./steps/Step10ReviewReadiness";

import { IngredientFormDrawer } from "./modals/IngredientFormDrawer";
import { IngredientImportModal } from "./modals/IngredientImportModal";
import { SafetyEvidenceModal } from "./modals/SafetyEvidenceModal";
import { DeclarationEditModal } from "./modals/DeclarationEditModal";
import { DuplicateComparisonModal } from "./modals/DuplicateComparisonModal";
import { UnsavedChangesModal } from "./modals/UnsavedChangesModal";
import { ProductPreviewModal } from "./modals/ProductPreviewModal";
import { SubmitApprovalModal } from "./modals/SubmitApprovalModal";

interface ProductMasterFormWorkspaceProps {
  mode: ProductFormMode;
  productId?: string;
}

export function ProductMasterFormWorkspace({
  mode,
  productId,
}: ProductMasterFormWorkspaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams?.get("step") as ProductStepId | null;


  // Form State
  const [formState, setFormState] = useState<ProductMasterFormState>(
    mode === "edit" ? EDIT_PRODUCT_FORM_STATE : CREATE_INITIAL_FORM_STATE
  );

  const [activeStepId, setActiveStepId] = useState<ProductStepId>(
    stepParam || "ingredients-safety"
  );
  const [workflowSteps, setWorkflowSteps] = useState(INITIAL_WORKFLOW_STEPS);
  const [ingredients, setIngredients] = useState<FormulationIngredient[]>(INITIAL_FORMULATION_INGREDIENTS);
  const [declarations, setDeclarations] = useState<SafetyDeclarationCard[]>(SAFETY_DECLARATION_CARDS);
  const [blockingIssues, setBlockingIssues] = useState<FormBlockingIssue[]>(BLOCKING_ISSUES);
  const [findings, setFindings] = useState(SAFETY_VALIDATION_FINDINGS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState("04 Aug 2026, 12:57 AM");

  // Modals & Drawers State
  const [isIngredientDrawerOpen, setIsIngredientDrawerOpen] = useState(false);
  const [ingredientToEdit, setIngredientToEdit] = useState<FormulationIngredient | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSafetyEvidenceModalOpen, setIsSafetyEvidenceModalOpen] = useState(false);
  const [isDeclarationModalOpen, setIsDeclarationModalOpen] = useState(false);
  const [declarationToEdit, setDeclarationToEdit] = useState<SafetyDeclarationCard | null>(null);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [isUnsavedChangesModalOpen, setIsUnsavedChangesModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Sync stepParam to activeStepId
  useEffect(() => {
    if (stepParam && stepParam !== activeStepId) {
      setActiveStepId(stepParam);
    }
  }, [stepParam]);

  // Controlled Not Found screen if productId is invalid in Edit mode
  if (mode === "edit" && (productId === "invalid-id" || productId === "404")) {
    return (
      <div className="p-6 max-w-4xl mx-auto w-full min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Product master not found</h1>
        <p className="text-xs text-gray-500 mb-6 max-w-md">
          The requested Product Master reference ID <span className="font-mono font-bold text-gray-800">&quot;{productId}&quot;</span> does not exist in the catalogue registry or has been archived.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/catalogue/products"
            className="h-9 px-4 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a] flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Product Masters</span>
          </Link>
        </div>
      </div>
    );
  }

  // Handlers
  const handleSelectStep = (stepId: ProductStepId) => {
    setActiveStepId(stepId);
    const path = mode === "edit" ? `/admin/catalogue/products/${productId || "PROD-2024-00421"}/edit` : `/admin/catalogue/products/create`;
    router.push(`${path}?step=${stepId}`);
  };

  const handleFieldChange = (field: keyof ProductMasterFormState, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      isDirty: true,
      autosaveStatus: "saving",
    }));

    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        autosaveStatus: "saved",
        lastAutosavedTime: "Saved just now",
      }));
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSynced(new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }));
      toast.success("Product business context synced.");
    }, 600);
  };

  const handleSaveDraft = () => {
    setFormState((prev) => ({
      ...prev,
      isDirty: false,
      autosaveStatus: "saved",
      lastAutosavedTime: "Saved just now",
    }));
    toast.success("Draft saved successfully.");
  };

  const handleValidate = () => {
    toast.success("Full product master validation complete. Findings updated.");
  };

  const handleCancel = () => {
    if (formState.isDirty) {
      setIsUnsavedChangesModalOpen(true);
    } else {
      router.push("/admin/catalogue/products");
    }
  };

  // Ingredient Handlers
  const handleSaveIngredient = (saved: FormulationIngredient) => {
    setIngredients((prev) => {
      const exists = prev.some((item) => item.id === saved.id);
      if (exists) {
        return prev.map((item) => (item.id === saved.id ? saved : item));
      }
      return [...prev, { ...saved, rowNumber: prev.length + 1 }];
    });
    setFormState((prev) => ({ ...prev, isDirty: true }));
  };

  const handleDeleteIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id).map((item, idx) => ({ ...item, rowNumber: idx + 1 })));
    toast.success("Removed ingredient from formulation matrix.");
    setFormState((prev) => ({ ...prev, isDirty: true }));
  };

  const handleConfirmImport = () => {
    const imported: FormulationIngredient[] = [
      { id: "imp-1", rowNumber: 4, ingredientName: "Ferulic Acid", inciName: "Ferulic Acid", concentration: 0.5, function: "Antioxidant", isRestricted: false, isAllergen: false, safetyStatus: "Safe", evidenceStatus: "N/A" },
      { id: "imp-2", rowNumber: 5, ingredientName: "Tocopherol", inciName: "Vitamin E", concentration: 0.5, function: "Antioxidant", isRestricted: false, isAllergen: false, safetyStatus: "Safe", evidenceStatus: "N/A" },
    ];
    setIngredients((prev) => [...prev, ...imported]);
    setFormState((prev) => ({ ...prev, isDirty: true }));
  };

  const handleConfirmSafetyUpload = () => {
    // Resolve safety blocker
    setIngredients((prev) =>
      prev.map((ing) =>
        ing.ingredientName === "Vitamin C"
          ? { ...ing, safetyStatus: "Safe", evidenceStatus: "Verified" }
          : ing
      )
    );

    setBlockingIssues((prev) => prev.filter((issue) => issue.id !== "bi-1"));
    setFindings((prev) => ({
      ...prev,
      passedCount: prev.passedCount + 1,
      failedCount: Math.max(0, prev.failedCount - 1),
      statusText: "All critical checks cleared",
    }));

    setFormState((prev) => ({ ...prev, isDirty: true }));
  };

  const handleSaveDeclaration = (updated: SafetyDeclarationCard) => {
    setDeclarations((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    setFormState((prev) => ({ ...prev, isDirty: true }));
  };

  const handleSaveAndContinue = () => {
    const currentIndex = workflowSteps.findIndex((s) => s.id === activeStepId);
    if (currentIndex < workflowSteps.length - 1) {
      const nextStep = workflowSteps[currentIndex + 1];
      handleSelectStep(nextStep.id);
      toast.success(`Saved & moved to ${nextStep.label}`);
    } else {
      toast.success("Reached final review step.");
    }
  };

  const currentStepItem = workflowSteps.find((s) => s.id === activeStepId) || workflowSteps[4];
  const hasBlockers = blockingIssues.length > 0;

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f8fafc] p-4 sm:p-6 pb-24">
      {/* 1. Page Header */}
      <ProductFormHeader
        mode={mode}
        productId={productId}
        hasBlockers={hasBlockers}
        blockersCount={blockingIssues.length}
        onCancel={handleCancel}
        onSaveDraft={handleSaveDraft}
        onValidate={handleValidate}
        onPreview={() => setIsPreviewModalOpen(true)}
        onSubmitApproval={() => setIsSubmitModalOpen(true)}
      />

      <div className="flex flex-col gap-4 max-w-[1920px] mx-auto w-full">
        {/* 2. Business Context Strip */}
        <ProductFormBusinessContext
          mode={mode}
          recordVersion={formState.recordVersion}
          lastSyncedTime={lastSynced}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        {/* 3. 10-Step Workflow Bar */}
        <ProductFormWorkflow
          steps={workflowSteps}
          activeStepId={activeStepId}
          onSelectStep={handleSelectStep}
        />

        {/* 4. Completeness Summary */}
        <ProductFormCompletenessSummary
          overallPercent={68}
          completedFields={82}
          totalRequiredFields={120}
          openValidationIssues={7}
          blockingIssuesCount={blockingIssues.length}
          autosaveText={formState.lastAutosavedTime}
        />

        {/* 5. Regulatory Compliance Block Alert (Shown if Vit C evidence is missing) */}
        {blockingIssues.some((b) => b.id === "bi-1") && (
          <RegulatoryComplianceAlert onUploadEvidence={() => setIsSafetyEvidenceModalOpen(true)} />
        )}

        {/* 2-Column Main Layout: Active Step Workspace & Right Readiness Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Main Left Active Step Workspace */}
          <div className="flex flex-col gap-6 min-w-0">
            {activeStepId === "identity" && (
              <Step1Identity formState={formState} onChange={handleFieldChange} />
            )}
            {activeStepId === "classification" && (
              <Step2Classification formState={formState} onChange={handleFieldChange} />
            )}
            {activeStepId === "brand-supplier" && (
              <Step3BrandSupplier formState={formState} onChange={handleFieldChange} />
            )}
            {activeStepId === "content" && (
              <Step4Content formState={formState} onChange={handleFieldChange} />
            )}
            {activeStepId === "ingredients-safety" && (
              <Step5IngredientsSafety
                ingredients={ingredients}
                declarations={declarations}
                findings={findings}
                onAddIngredient={() => {
                  setIngredientToEdit(null);
                  setIsIngredientDrawerOpen(true);
                }}
                onEditIngredient={(ing) => {
                  setIngredientToEdit(ing);
                  setIsIngredientDrawerOpen(true);
                }}
                onDeleteIngredient={handleDeleteIngredient}
                onImportList={() => setIsImportModalOpen(true)}
                onValidateInci={handleValidate}
                onUploadEvidence={() => setIsSafetyEvidenceModalOpen(true)}
                onEditDeclaration={(dec) => {
                  setDeclarationToEdit(dec);
                  setIsDeclarationModalOpen(true);
                }}
                onFixFinding={handleSelectStep}
              />
            )}
            {activeStepId === "variants-attributes" && <Step6VariantsAttributes />}
            {activeStepId === "images-media" && <Step7ImagesMedia />}
            {activeStepId === "pricing-tax" && (
              <Step8PricingTax formState={formState} onChange={handleFieldChange} />
            )}
            {activeStepId === "inventory-publication" && <Step9InventoryPublication />}
            {activeStepId === "review-readiness" && (
              <Step10ReviewReadiness
                blockingIssues={blockingIssues}
                onSubmitApproval={() => setIsSubmitModalOpen(true)}
              />
            )}

            {/* Cross-Step Summary Grid */}
            <CrossStepSummary steps={workflowSteps} onSelectStep={handleSelectStep} />
          </div>

          {/* Right Validation & Readiness Panel */}
          <div className="sticky top-4">
            <ProductReadinessSidebar
              mode={mode}
              readinessScore={68}
              completedFields={82}
              remainingFields={38}
              missingRequired={12}
              blockingIssues={blockingIssues}
              draftId={formState.draftId}
              recordVersion={formState.recordVersion}
              lastAutosavedTime={formState.lastAutosavedTime}
              createdBy={formState.createdBy}
              onSelectStep={handleSelectStep}
              onFixIssue={handleSelectStep}
              onCompareCandidates={() => setIsDuplicateModalOpen(true)}
              onSaveDraft={handleSaveDraft}
              onValidate={handleValidate}
              onPreview={() => setIsPreviewModalOpen(true)}
              onSubmitApproval={() => setIsSubmitModalOpen(true)}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <ProductFormStickyFooter
        currentStep={currentStepItem}
        totalSteps={workflowSteps.length}
        overallPercent={68}
        autosaveText={formState.lastAutosavedTime}
        blockingIssuesCount={blockingIssues.length}
        hasBlockers={hasBlockers}
        onCancel={handleCancel}
        onSaveDraft={handleSaveDraft}
        onSaveAndContinue={handleSaveAndContinue}
        onValidate={handleValidate}
        onPreview={() => setIsPreviewModalOpen(true)}
        onSubmitApproval={() => setIsSubmitModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <IngredientFormDrawer
        isOpen={isIngredientDrawerOpen}
        ingredientToEdit={ingredientToEdit}
        onClose={() => setIsIngredientDrawerOpen(false)}
        onSave={handleSaveIngredient}
      />

      <IngredientImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onConfirmImport={handleConfirmImport}
      />

      <SafetyEvidenceModal
        isOpen={isSafetyEvidenceModalOpen}
        onClose={() => setIsSafetyEvidenceModalOpen(false)}
        onConfirmUpload={handleConfirmSafetyUpload}
      />

      <DeclarationEditModal
        isOpen={isDeclarationModalOpen}
        declaration={declarationToEdit}
        onClose={() => setIsDeclarationModalOpen(false)}
        onSave={handleSaveDeclaration}
      />

      <DuplicateComparisonModal
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
      />

      <UnsavedChangesModal
        isOpen={isUnsavedChangesModalOpen}
        onClose={() => setIsUnsavedChangesModalOpen(false)}
        onConfirmDiscard={() => {
          setIsUnsavedChangesModalOpen(false);
          router.push("/admin/catalogue/products");
        }}
        onSaveDraftAndExit={() => {
          handleSaveDraft();
          setIsUnsavedChangesModalOpen(false);
          router.push("/admin/catalogue/products");
        }}
      />

      <ProductPreviewModal
        isOpen={isPreviewModalOpen}
        formState={formState}
        onClose={() => setIsPreviewModalOpen(false)}
      />

      <SubmitApprovalModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={() => {
          setFormState((prev) => ({ ...prev, isDirty: false }));
          router.push("/admin/catalogue/products");
        }}
      />
    </div>
  );
}
