export type ProductFormMode = 'create' | 'edit';

export type ProductStepId =
  | 'identity'
  | 'classification'
  | 'brand-supplier'
  | 'content'
  | 'ingredients-safety'
  | 'variants-attributes'
  | 'images-media'
  | 'pricing-tax'
  | 'inventory-publication'
  | 'review-readiness';

export type StepStatus = 'complete' | 'active' | 'pending' | 'blocked';

export interface WorkflowStepItem {
  id: ProductStepId;
  stepNumber: number;
  label: string;
  status: StepStatus;
  completionPercent: number;
}

export interface FormulationIngredient {
  id: string;
  rowNumber: number;
  ingredientName: string;
  inciName: string;
  concentration: number; // percentage e.g. 15.00
  function: string;
  isRestricted: boolean;
  isAllergen: boolean;
  safetyStatus: 'Safe' | 'Unsafe' | 'Requires Review';
  evidenceStatus: 'Verified' | 'Missing' | 'Pending' | 'N/A';
  notes?: string;
}

export interface SafetyDeclarationCard {
  id: string;
  title: string;
  value: string;
  status: 'good' | 'warning' | 'alert' | 'neutral';
  editable: boolean;
}

export interface CorrectiveActionItem {
  id: string;
  description: string;
  targetStep: ProductStepId;
  actionLabel: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface SafetyValidationFindings {
  totalChecks: number;
  passedCount: number;
  warningsCount: number;
  failedCount: number;
  statusText: string;
  topActions: CorrectiveActionItem[];
}

export interface FormBlockingIssue {
  id: string;
  description: string;
  severity: 'High' | 'Medium';
  targetStep: ProductStepId;
  actionLabel: string;
}

export interface CategoryReadinessMetric {
  category: string;
  percent: number;
  stepId: ProductStepId;
}

export interface DuplicateCandidate {
  id: string;
  productName: string;
  brand: string;
  sku: string;
  barcode: string;
  category: string;
  matchScorePercent: number;
}

export interface ProductMasterFormState {
  // Identity
  productName: string;
  publicId: string;
  internalId: string;
  sku: string;
  barcode: string;
  manufacturer: string;
  countryOfOrigin: string;
  productType: string;
  primaryVariant: string;

  // Classification
  department: string;
  category: string;
  subcategory: string;
  productFamily: string;
  beautyConcern: string;
  skinType: string;
  regulatoryClass: string;

  // Brand & Supplier
  brand: string;
  brandAuthId: string;
  brandAuthExpiry: string;
  supplier: string;
  supplierRisk: string;

  // Content
  shortDescription: string;
  longDescription: string;
  keyBenefits: string;
  warnings: string;
  languages: string[];

  // Formulation & Ingredients
  ingredients: FormulationIngredient[];

  // Pricing & Tax
  mrp: number;
  costPrice: number;
  taxClass: string;

  // Metadata
  draftId: string;
  recordVersion: string;
  createdBy: string;
  lastAutosavedTime: string;
  isDirty: boolean;
  autosaveStatus: 'saved' | 'saving' | 'error';
}
