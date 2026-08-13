import {
  mockQaEvaluations,
  mockTeamQuality,
  mockScorecardCategories,
  mockCriticalDefects,
  mockLowCsatCases,
  mockQualityDefects,
  mockServiceInitiatives,
  mockScorecardVersions,
} from '@/mocks/admin/satisfactionQa.mock';
import {
  QaEvaluationItem,
  TeamQualityItem,
  ScorecardCategoryItem,
  CriticalDefectItem,
  LowCsatCaseItem,
  QualityDefectItem,
  ServiceInitiativeItem,
  ScorecardVersionItem,
  SatisfactionQaFilterParams,
} from '@/types/satisfactionQa';

export async function fetchQaEvaluations(filters: SatisfactionQaFilterParams = {}): Promise<QaEvaluationItem[]> {
  let list = [...mockQaEvaluations];
  if (filters.qaStatus && filters.qaStatus !== 'All') {
    list = list.filter((e) => e.status === filters.qaStatus);
  }
  return list;
}

export async function fetchTeamQuality(): Promise<TeamQualityItem[]> {
  return [...mockTeamQuality];
}

export async function fetchScorecardCategories(): Promise<ScorecardCategoryItem[]> {
  return [...mockScorecardCategories];
}

export async function fetchCriticalDefects(): Promise<CriticalDefectItem[]> {
  return [...mockCriticalDefects];
}

export async function fetchLowCsatCases(): Promise<LowCsatCaseItem[]> {
  return [...mockLowCsatCases];
}

export async function fetchQualityDefects(): Promise<QualityDefectItem[]> {
  return [...mockQualityDefects];
}

export async function fetchServiceInitiatives(): Promise<ServiceInitiativeItem[]> {
  return [...mockServiceInitiatives];
}

export async function fetchScorecardVersions(): Promise<ScorecardVersionItem[]> {
  return [...mockScorecardVersions];
}
