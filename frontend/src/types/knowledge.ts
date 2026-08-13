export type KnowledgeType = 'Article' | 'Policy' | 'Playbook' | 'Template' | 'Decision Tree';

export type KnowledgeStatus = 'Published' | 'Needs Review' | 'Draft' | 'Pending Approval' | 'Archived';

export type ContentClassification = 'Customer Safe' | 'Agent Safe' | 'Internal Only' | 'Restricted';

export interface KnowledgeItem {
  id: string;
  kbId: string;
  title: string;
  type: KnowledgeType;
  topic: string;
  audience: string;
  classification: ContentClassification;
  status: KnowledgeStatus;
  policyLinked: boolean;
  relevance: number;
  confidenceStars: number;
  lastReviewed: string;
  author: string;
  version: string;
  createdAt: string;
  owner: string;
  reviewCadence: string;
  nextReview: string;
  usageCount: number;
  helpfulRate: number;
  suggestedReply?: string;
  suggestedReplyConfidence?: number;
}

export interface GroundingSource {
  id: string;
  name: string;
  updatedAt: string;
  type: string;
}

export interface LinkedPolicy {
  id: string;
  title: string;
  policyId: string;
}

export interface ResponseTemplateItem {
  id: string;
  title: string;
  matchScore: number;
}

export interface KnowledgeGapItem {
  id: string;
  topic: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface KnowledgeFilterParams {
  search?: string;
  audience?: string;
  contentType?: string;
  language?: string;
  relevance?: string;
  author?: string;
  channel?: string;
  productDivision?: string;
  dateRange?: string;
  confidenceScore?: string;
  policyLink?: string;
  approvalStatus?: string;
  agentSafe?: string;
  contentClassification?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}
