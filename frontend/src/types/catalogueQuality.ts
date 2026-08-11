export type QualitySeverity = "Critical" | "High" | "Medium" | "Low";
export type QualityIssueType = string;
export type QualityIssueStatus = string;
export type QualityBusinessImpact = string;

export interface CatalogueQualityIssue {
  id:string; caseId:string; issueType:string; entityName:string; publicId:string; productId?:string|null;
  sku:string; brand:string|null; category:string|null; channels:string[]; severity:QualitySeverity;
  businessImpact:string; owner:string|null; ownerId?:string|null; reviewer?:string|null; sla:string;
  slaDueAt?:string|null; isSlaBreached?:boolean; status:string; updatedAt:string; title?:string;
  description?:string|null; evidence?:string|null; lockVersion:number; candidateId?:string|null;
}
export interface QualityKpiCard { id:string; label:string; value:number|null; trend:number|null; available:boolean; scope:string }
export interface QualityTrendPoint { date:string; openIssues:number; resolvedIssues:number; criticalIssues:number; slaBreaches:number }
export interface IssueDistributionItem { name:string; value:number; percentage:number; color:string }
export interface IssueStatusSummaryItem { status:string; count:number; color:string; pct:number }
export interface ScorecardMetric { label:string; percentage:number|null }
export interface DuplicateProductCandidate { id:string;pairName:string;recordA:string|null;recordB:string|null;productAId:string;productBId:string;skuA:string|null;skuB:string|null;brand:string|null;category:string|null;confidenceScore:number;suggestedAction:"Merge"|"Review"|"Ignore";signal:string }
export interface IncompleteRecordSummary { id:string;reason:string;recordsCount:number;percentage:number|null }
export interface ValidationFailure { id:string;failedRule:string;failuresCount:number;percentage:number|null }
export interface PublicationReadinessImpact { id:string;channel:string;eligible:number;blocked:number;missingMedia:number;policyIssues:number }
export interface QualityActivity { id:string;activity:string;user:string;action:string;dateTime:string;result:string }
export interface QualityFilterState {searchQuery:string;issueType:string;severity:string;status:string;category:string;brand:string;channel:string;owner:string;reviewer:string;slaStatus:string;dataSource:string;updatedDate:string;activeTab:string;quickChips:string[]}
export interface QualityQuery {page:number;pageSize:number;search?:string;scope?:string;issueType?:string;severity?:string;status?:string;categoryId?:number;reviewerId?:number;ownerId?:number;slaStatus?:string;assignedToMe?:boolean;unassigned?:boolean;dateFrom?:string;dateTo?:string;granularity?:"daily"|"weekly"|"monthly";sort?:string;direction?:"asc"|"desc"}
export interface CatalogueQualityDashboard {
  kpis:QualityKpiCard[];tabs:Array<{label:string;scope:string;count:number}>;
  trend:{granularity:string;points:QualityTrendPoint[]};distribution:IssueDistributionItem[];statusSummary:IssueStatusSummaryItem[];scorecard:ScorecardMetric[];
  issues:{data:CatalogueQualityIssue[];page:number;pageSize:number;total:number;totalPages:number};
  lower:{duplicates:DuplicateProductCandidate[];incompleteRecords:IncompleteRecordSummary[];validationFailures:ValidationFailure[];publicationReadiness:PublicationReadinessImpact[];resolutionPerformance:{avgMergeReviewTime:string|null;autoMergeApproved:number;manualMerges:number;rejectedMerges:number;reopenedCases:number;rollbackRate:string|null};governance:{totalActiveRules:number;scheduledValidations:number;pendingApprovals:number;openQualityCases:number;auditPassRate:string|null;latestRunResult:number|null};activities:QualityActivity[]};
  health:{score:number|null;status:string;metrics:ScorecardMetric[]};alerts:Array<{id:string;text:string;count:number;severity:string;scope:string}>;quickQueues:Array<{label:string;count:number;scope:string}>;severitySummary:Array<{label:string;count:number}>;resolutionSummary:Array<{label:string;count:number}>;slaSummary:Array<{label:string;count:number}>;
  options:{categories:Array<{id:number;name:string}>;users:Array<{id:number;name:string}>;issueTypes:string[];statuses:string[];severities:string[];brands:string[];channels:string[]};savedViews:Array<{id:string;name:string;filters:Partial<QualityFilterState>}>;activeValidation:{id:string;status:string;progress:number;productsScanned:number}|null;capabilities:Record<string,boolean>;lastSyncedAt:string;meta:{refreshIntervalSeconds:number;tenantIsolation:boolean;brandMapping:boolean;channelMapping:boolean};
}
export interface QualityCaseDetail extends CatalogueQualityIssue {notes:Array<{id:number;note:string;user:string;createdAt:string}>}
export interface QualityCaseDraft {product_id?:number|null;title:string;issue_type:string;severity:string;description:string;evidence?:string;assigned_to?:number|null;reviewer_id?:number|null;sla_due_at?:string|null}
export interface ValidationRunDraft {scope:"catalogue"}
