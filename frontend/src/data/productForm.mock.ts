import {
  WorkflowStepItem,
  FormulationIngredient,
  SafetyDeclarationCard,
  SafetyValidationFindings,
  FormBlockingIssue,
  CategoryReadinessMetric,
  DuplicateCandidate,
  ProductMasterFormState,
} from '../types/productForm';

export const INITIAL_WORKFLOW_STEPS: WorkflowStepItem[] = [
  { id: 'identity', stepNumber: 1, label: 'Identity', status: 'complete', completionPercent: 95 },
  { id: 'classification', stepNumber: 2, label: 'Classification', status: 'complete', completionPercent: 90 },
  { id: 'brand-supplier', stepNumber: 3, label: 'Brand & Supplier', status: 'complete', completionPercent: 88 },
  { id: 'content', stepNumber: 4, label: 'Content', status: 'complete', completionPercent: 74 },
  { id: 'ingredients-safety', stepNumber: 5, label: 'Ingredients & Safety', status: 'active', completionPercent: 58 },
  { id: 'variants-attributes', stepNumber: 6, label: 'Variants & Attributes', status: 'pending', completionPercent: 82 },
  { id: 'images-media', stepNumber: 7, label: 'Images & Media', status: 'pending', completionPercent: 62 },
  { id: 'pricing-tax', stepNumber: 8, label: 'Pricing & Tax', status: 'pending', completionPercent: 90 },
  { id: 'inventory-publication', stepNumber: 9, label: 'Inventory & Publication', status: 'pending', completionPercent: 70 },
  { id: 'review-readiness', stepNumber: 10, label: 'Review Readiness', status: 'pending', completionPercent: 55 },
];

export const INITIAL_FORMULATION_INGREDIENTS: FormulationIngredient[] = [
  {
    id: 'ing-1',
    rowNumber: 1,
    ingredientName: 'Vitamin C',
    inciName: 'Ascorbic Acid',
    concentration: 15.0,
    function: 'Antioxidant',
    isRestricted: true,
    isAllergen: false,
    safetyStatus: 'Unsafe',
    evidenceStatus: 'Missing',
    notes: 'Clinical safety certificate required for >10% concentration',
  },
  {
    id: 'ing-2',
    rowNumber: 2,
    ingredientName: 'Hyaluronic Acid',
    inciName: 'Sodium Hyaluronate',
    concentration: 2.0,
    function: 'Humectant',
    isRestricted: false,
    isAllergen: false,
    safetyStatus: 'Safe',
    evidenceStatus: 'Verified',
  },
  {
    id: 'ing-3',
    rowNumber: 3,
    ingredientName: 'Water',
    inciName: 'Aqua',
    concentration: 82.0,
    function: 'Solvent',
    isRestricted: false,
    isAllergen: false,
    safetyStatus: 'Safe',
    evidenceStatus: 'N/A',
  },
];

export const SAFETY_DECLARATION_CARDS: SafetyDeclarationCard[] = [
  { id: 'sd-1', title: 'Safety & Compliance Declarations', value: '3 of 10 completed', status: 'warning', editable: true },
  { id: 'sd-2', title: 'Active Ingredients', value: '2 declared', status: 'good', editable: true },
  { id: 'sd-3', title: 'Allergens', value: 'None declared', status: 'good', editable: true },
  { id: 'sd-4', title: 'Fragrance', value: 'Fragrance-Free', status: 'good', editable: true },
  { id: 'sd-5', title: 'Sensitive Skin Warning', value: 'Applicable', status: 'warning', editable: true },
  { id: 'sd-6', title: 'Patch Test Recommendation', value: 'Recommended', status: 'good', editable: true },
  { id: 'sd-7', title: 'Dermatologically Tested', value: 'Yes', status: 'good', editable: true },
  { id: 'sd-8', title: 'Safety Evidence', value: '1 of 3 uploaded', status: 'alert', editable: true },
  { id: 'sd-9', title: 'Regulatory Registration', value: 'Not provided', status: 'warning', editable: true },
  { id: 'sd-10', title: 'Recall Match', value: 'No matches', status: 'good', editable: false },
  { id: 'sd-11', title: 'Hazard Classification', value: 'Low Hazard', status: 'good', editable: false },
];

export const SAFETY_VALIDATION_FINDINGS: SafetyValidationFindings = {
  totalChecks: 24,
  passedCount: 16,
  warningsCount: 5,
  failedCount: 3,
  statusText: 'Requires attention',
  topActions: [
    { id: 'ca-1', description: 'Upload safety certificate', targetStep: 'ingredients-safety', actionLabel: 'Fix', severity: 'High' },
    { id: 'ca-2', description: 'Add back packaging image', targetStep: 'images-media', actionLabel: 'Fix', severity: 'Medium' },
    { id: 'ca-3', description: 'Review unsupported claim', targetStep: 'content', actionLabel: 'Fix', severity: 'High' },
  ],
};

export const BLOCKING_ISSUES: FormBlockingIssue[] = [
  { id: 'bi-1', description: 'Missing safety certificate', severity: 'High', targetStep: 'ingredients-safety', actionLabel: 'Fix' },
  { id: 'bi-2', description: 'Back packaging image missing', severity: 'Medium', targetStep: 'images-media', actionLabel: 'Fix' },
  { id: 'bi-3', description: 'Unsupported product claim', severity: 'High', targetStep: 'content', actionLabel: 'Fix' },
  { id: 'bi-4', description: 'Mobile App publication blocked', severity: 'Medium', targetStep: 'inventory-publication', actionLabel: 'Fix' },
];

export const CATEGORY_READINESS_METRICS: CategoryReadinessMetric[] = [
  { category: 'Identity', percent: 95, stepId: 'identity' },
  { category: 'Classification', percent: 90, stepId: 'classification' },
  { category: 'Brand & Supplier', percent: 88, stepId: 'brand-supplier' },
  { category: 'Content', percent: 74, stepId: 'content' },
  { category: 'Safety (This Step)', percent: 58, stepId: 'ingredients-safety' },
  { category: 'Variants', percent: 82, stepId: 'variants-attributes' },
  { category: 'Media', percent: 62, stepId: 'images-media' },
  { category: 'Pricing & Tax', percent: 90, stepId: 'pricing-tax' },
  { category: 'Inventory', percent: 70, stepId: 'inventory-publication' },
  { category: 'Publication', percent: 55, stepId: 'inventory-publication' },
];

export const DUPLICATE_CANDIDATES: DuplicateCandidate[] = [
  { id: 'dup-1', productName: 'Radiance C Brightening Serum 30ml', brand: 'Estée Lauder', sku: 'RAD-C-30ML', barcode: '8901234567895', category: 'Face Serum', matchScorePercent: 94 },
  { id: 'dup-2', productName: 'Pure Vitamin C Glow Serum 30ml', brand: 'Luxe Beauty', sku: 'LUX-VC-30ML', barcode: '8901234567899', category: 'Face Serum', matchScorePercent: 82 },
];

export const CREATE_INITIAL_FORM_STATE: ProductMasterFormState = {
  productName: 'Radiance Vitamin C Serum',
  publicId: 'PROD-2026-DRAFT01',
  internalId: 'DRAFT-PM-000123',
  sku: 'RAD-VITC-30ML',
  barcode: '8901234567895',
  manufacturer: 'Estée Lauder Companies Inc.',
  countryOfOrigin: 'USA',
  productType: 'Finished Cosmetic Product',
  primaryVariant: '30 ml',

  department: 'Skincare',
  category: 'Face Serum',
  subcategory: 'Vitamin C Serum',
  productFamily: 'Serum',
  beautyConcern: 'Dullness, Uneven Tone',
  skinType: 'All Skin Types',
  regulatoryClass: 'Cosmetic',

  brand: 'Estée Lauder',
  brandAuthId: 'AUTH-2023-0892',
  brandAuthExpiry: 'Dec 31, 2026',
  supplier: 'Luxe Distribution Pvt Ltd',
  supplierRisk: 'Low',

  shortDescription: 'Advanced Vitamin C serum that brightens dull skin and reduces dark spots.',
  longDescription: 'High-potency formulation containing 15% L-Ascorbic Acid combined with Ferulic Acid and Hyaluronic Acid for targeted skin illumination.',
  keyBenefits: 'Brightening, Anti-oxidant, Evens tone',
  warnings: 'For external use only. Avoid direct eye contact. Store in cool dark location.',
  languages: ['EN', 'SI', 'TA'],

  ingredients: INITIAL_FORMULATION_INGREDIENTS,

  mrp: 12450.0,
  costPrice: 8250.0,
  taxClass: 'Standard VAT (15%)',

  draftId: 'DRAFT-PM-000123',
  recordVersion: 'New',
  createdBy: 'Elena Vance',
  lastAutosavedTime: 'Saved 2 minutes ago',
  isDirty: false,
  autosaveStatus: 'saved',
};

export const EDIT_PRODUCT_FORM_STATE: ProductMasterFormState = {
  ...CREATE_INITIAL_FORM_STATE,
  publicId: 'PROD-2024-00421',
  internalId: '421',
  recordVersion: 'v2',
};
