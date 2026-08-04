export type ModerationStage = { label: string; state: "complete" | "active" | "pending" };
export type ComparisonRow = { attribute: string; listing: string; master: string; status: "Match" | "Minor Difference" | "Requires Review" | "Missing"; detail: string };
export type RiskFinding = { title: string; detail: string; severity: "High Risk" | "Medium Risk" | "Low Risk" };

export interface MarketplaceListingDetail {
  source: "frontend-fixture" | "api";
  id: string;
  title: string;
  seller: string;
  marketplace: string;
  brand: string;
  country: string;
  region: string;
  category: string;
  lastUpdated: string;
  status: string;
  price: string;
  stock: number;
  description: string;
  image?: string;
  score: number;
  completion: number;
  reviewer: string;
  reviewSla: string;
  elapsed: string;
  dueDate: string;
  productMaster: string;
  sku: string;
  ean: string;
  stages: ModerationStage[];
  comparison: ComparisonRow[];
  findings: RiskFinding[];
}

export type LocalAuditEvent = { id: string; action: string; note: string; at: string; actor: string };

