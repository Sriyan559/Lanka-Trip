export interface ProductDetailRecord {
  id: string;
  publicId: string;
  dbProductId: string;
  productName: string;
  variantInfo: string;
  sku: string;
  barcode: string;
  brand: string;
  brandAuthId: string;
  brandAuthStatus: 'Valid' | 'Pending' | 'Expired';
  brandAuthExpiry: string;
  supplier: string;
  supplierRisk: string;
  supplierSince: string;
  category: string;
  subcategory: string;
  department: string;
  productFamily: string;
  beautyConcern: string;
  skinType: string;
  regulatoryClass: string;
  productType: string;
  primaryVariant: string;
  countryOfOrigin: string;
  manufacturer: string;
  productStatus: 'Active' | 'Draft' | 'Blocked' | 'Archived';
  approvalStatus: 'Compliance Review' | 'Approved' | 'Pending Approval' | 'Draft';
  publicationStatus: 'Not Ready' | 'Ready' | 'Blocked';
  riskLevel: 'Medium' | 'Low' | 'High';
  completenessPercent: number;
  ownerName: string;
  ownerRole: string;
  createdDate: string;
  updatedDate: string;
  recordVersion: string;
  thumbnail: string;
  shortDescription: string;
  keyBenefits: string;
  warnings: string;
  languages: string[];
  contentCompleteness: number;
  totalIngredients: number;
  activeIngredientsCount: number;
  allergens: string[];
  safetyEvidenceStatus: string;
  prohibitedIngredientsStatus: string;
  activeRecallStatus: string;
  mrp: number;
  costPrice: number;
  grossMarginPercent: number;
  taxClass: string;
  promotionalEligibility: string;
  priceLastUpdated: string;
  totalAvailableUnits: number;
  reservedUnits: number;
  quarantinedUnits: number;
  totalStockUnits: number;
  openIssuesCount: number;
  activeBatchesCount: number;
  channelCoverageText: string;
  riskScore: number;
}

export interface ReadinessCardItem {
  id: string;
  label: string;
  value: string;
  status: 'good' | 'warning' | 'alert';
  actionText?: string;
  targetTab?: string;
}

export interface VariantDetailRow {
  variant: string;
  size: string;
  sku: string;
  status: 'Active' | 'Draft';
  readinessPercent: number;
  inventory: number;
}

export interface ActiveBatchRow {
  batchNumber: string;
  mfgDate: string;
  expiryDate: string;
  availableQty: number;
  status: 'Active' | 'Near Expiry' | 'Quarantined';
}

export interface ChannelReadinessDetailRow {
  channel: string;
  eligible: boolean;
  published: boolean;
  content: 'Ready' | 'Partial' | 'Not Ready';
  media: 'Ready' | 'Partial' | 'Not Ready';
  pricing: 'Ready' | 'Partial' | 'Not Ready';
  inventory: 'Ready' | 'Partial' | 'Not Ready';
  policy: 'Ready' | 'Partial' | 'Not Ready';
  blockersCount: number;
  lastPublished: string;
}

export interface LinkedRecordItem {
  id: string;
  type: string;
  reference: string;
  count?: string;
}

export interface BlockingIssueItem {
  id: string;
  issue: string;
  area: string;
  severity: 'High' | 'Medium' | 'Low';
  impact: string;
  owner: string;
  openedDate: string;
  sla: string;
  recommendedAction: string;
  actionLabel: string;
}

export interface RecentAuditActivityItem {
  id: string;
  event: string;
  changedArea: string;
  previousValue: string;
  newValue: string;
  performedBy: string;
  role: string;
  dateTime: string;
  reason: string;
  result: 'Success' | 'Failed';
  auditRecord: string;
}
