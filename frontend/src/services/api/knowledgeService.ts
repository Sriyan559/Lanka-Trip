import {
  mockKnowledgeItems,
  mockLinkedPolicies,
  mockGroundingSources,
  mockResponseTemplates,
  mockKnowledgeGaps,
} from '@/mocks/admin/knowledge.mock';
import {
  KnowledgeItem,
  LinkedPolicy,
  GroundingSource,
  ResponseTemplateItem,
  KnowledgeGapItem,
  KnowledgeFilterParams,
} from '@/types/knowledge';

export async function fetchKnowledgeItems(filters: KnowledgeFilterParams = {}): Promise<{
  data: KnowledgeItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  let list = [...mockKnowledgeItems];

  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      (k) =>
        k.title.toLowerCase().includes(q) ||
        k.kbId.toLowerCase().includes(q) ||
        k.topic.toLowerCase().includes(q)
    );
  }

  if (filters.audience && filters.audience !== 'All') {
    list = list.filter((k) => k.audience === filters.audience);
  }

  if (filters.contentType && filters.contentType !== 'All') {
    list = list.filter((k) => k.type === filters.contentType);
  }

  const page = filters.page || 1;
  const pageSize = filters.pageSize || 10;
  const total = 842; // Matching exact total from screenshot

  return {
    data: list,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function fetchLinkedPolicies(): Promise<LinkedPolicy[]> {
  return [...mockLinkedPolicies];
}

export async function fetchGroundingSources(): Promise<GroundingSource[]> {
  return [...mockGroundingSources];
}

export async function fetchResponseTemplates(): Promise<ResponseTemplateItem[]> {
  return [...mockResponseTemplates];
}

export async function fetchKnowledgeGaps(): Promise<KnowledgeGapItem[]> {
  return [...mockKnowledgeGaps];
}
