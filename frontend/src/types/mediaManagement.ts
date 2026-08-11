export type MediaAssetType = string;
/*
  | "Product Image — Hero"
  | "Packaging Image — Back"
  | "Packaging Image — Ingredients"
  | "Document — Certificate"
  | "Campaign Image — Banner"
  | "Product Demo — Video"
  | "Lifestyle Image — Model"
  | "360 View Asset"
  | "Variant Swatch"
  | "Compliance Certificate"; */

export type MediaAssetCategory = "image" | "video" | "document" | "360_view" | string;

export type LinkedEntityType = "Product" | "Brand" | "Campaign" | "Compliance" | "Supplier" | "Unlinked" | string;

export type MediaApprovalStatus = "Approved" | "Pending" | "Needs Review" | "Rejected" | "Draft" | "Published" | string;

export type MediaQualityStatus = "Optimal" | "Good" | "Needs Improvement" | "Low Resolution" | "Blurry" | "Wrong Ratio";

export type MediaRiskLevel = "Low" | "Medium" | "High" | "Critical";

export type DuplicateRiskLevel = "None" | "Low" | "Medium" | "High";

export type AltTextStatus = "Yes" | "No" | "Needs Review";

export interface ChannelCompatibility {
  web: boolean;
  mobile: boolean;
  b2b: boolean;
  partner: boolean;
  social: boolean;
}

export interface MediaAsset {
  id: string; // e.g. "MED-2026-818421"
  name: string;
  type: MediaAssetType;
  category: MediaAssetCategory;
  linkedEntityType: LinkedEntityType;
  linkedEntityId?: string;
  productName: string;
  brandName: string;
  variant?: string;
  format: "JPEG" | "PNG" | "WEBP" | "PDF" | "MP4" | "SVG";
  resolution: string; // e.g. "2400 × 2400" or "00:45"
  fileSizeBytes: number;
  fileSizeFormatted: string; // e.g. "2.3 MB"
  channelCompatibility: ChannelCompatibility | null;
  altTextStatus: AltTextStatus;
  altText?: string;
  qualityScore: number | null;
  approvalStatus: MediaApprovalStatus;
  usageRightsStatus: string; // e.g. "Valid until 2027" or "Expiring 15 Aug 2026"
  rightsExpiryDate?: string;
  duplicateRisk: DuplicateRiskLevel;
  duplicateScore?: number;
  riskLevel: MediaRiskLevel;
  updatedAt: string; // ISO or formatted "04 Aug 2026 10:25 AM"
  ownerName: string;
  reviewerName?: string;
  thumbnailUrl: string | null;
  downloadUrl?: string;
  filename?: string;
  mimeType?: string;
  processingStatus?: string;
  uploadedAt?: string;
  product?: { id: string; name: string; sku?: string | null } | null;
  productId?: string;
  variantId?: string;
  isArchived?: boolean;
  colourSpace?: string;
  dimensions?: { width: number; height: number };
  durationSeconds?: number;
}

export interface MediaKpi { id: string; label: string; value: number | null; trend: number | null; available: boolean; scope: string; reason?: string | null }
export interface MediaTab { label: string; count: number | null; scope: string }
export interface MediaDashboardData {
  kpis: MediaKpi[];
  tabs: MediaTab[];
  assets: { data: MediaAsset[]; page: number; pageSize: number; total: number; totalPages: number };
  options: { products: Array<{id:string;name:string}>; categories: Array<{id:string;name:string}>; suppliers: Array<{id:string;name:string}>; fileTypes: string[]; approvalStatuses: string[]; processingStatuses: string[] };
  health: { score: number; status: string; dimensions: Array<{label:string;value:number}> };
  alerts: Array<{id:string;label:string;count:number;severity:string;scope:string}>;
  statusSummary: Array<{label:string;count:number}>;
  storageSummary: { assetCount:number; bytes:number; disk:string; cdnAvailable:boolean };
  processingSummary: Array<{label:string;count:number}>;
  lower: { formatSummary:Array<{label:string;count:number}>; productCoverage:{missingMandatory:number;unlinked:number}; duplicates:MediaDuplicateCandidate[]; activities:MediaActivity[] };
  capabilities: Record<string, boolean | string>;
  lastSyncedAt: string;
  meta: { refreshIntervalSeconds: number };
}

export interface MediaQuery { page:number; pageSize:number; search?:string; linkedEntity?:"product"|"unlinked"; fileType?:string; category?:string; approvalStatus?:string; processingStatus?:string; productId?:string; categoryId?:string; supplierId?:string; dateFrom?:string; dateTo?:string; scope?:string; sort?:string; direction?:"asc"|"desc" }

export interface MediaFilterState {
  search: string;
  assetType: string;
  approvalStatus: string;
  linkedEntity: string;
  brand: string;
  supplier: string;
  productSku: string;
  qualityStatus: string;
  rightsStatus: string;
  channelCompatibility: string;
  resolutionQuality: string;
  dateRange: string;
  quickChips: string[];
  activeTab: string;
}

export interface MediaSavedView {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  isPublic: boolean;
  filters: Partial<MediaFilterState>;
  columns: string[];
}

export interface MediaDuplicateCandidate {
  id: string; // Target Asset ID
  originalId: string;
  confidenceScore: number; // 0-100
  matchesCount: number;
  originalName: string;
  duplicateName: string;
  originalThumbnail: string;
  duplicateThumbnail: string;
  originalSize: string;
  duplicateSize: string;
  originalRes: string;
  duplicateRes: string;
  qualityScore: number;
  duplicateQualityScore: number;
  linkedEntity: string;
}

export interface MediaActivity {
  id: string;
  activity: string;
  assetId: string;
  linkedEntity: string;
  actionBy: string;
  dateTime: string;
  details: string;
}

export interface MediaUploadDraft {
  file: File | null;
  name: string;
  type: MediaAssetType;
  linkedEntityType: LinkedEntityType;
  linkedEntityName: string;
  variant: string;
  altText: string;
  description: string;
  rightsOwner: string;
  licenseType: string;
  rightsStartDate: string;
  rightsExpiryDate: string;
  isPrimary: boolean;
  channels: ChannelCompatibility;
  reviewer: string;
}
