import { api } from '@/lib/api/client';
import type {
  EcosystemModule,
  EcosystemModuleDashboard,
  EcosystemModuleFilters,
  EcosystemModulePage,
  ModulePermissions,
  ModuleRegistrationDraft,
} from '@/components/admin/ecosystem-modules/types';

type LaravelPage<T> = {
  data: T[];
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
};

type ModulesResponse = { modules: LaravelPage<EcosystemModule> };
type DashboardApiResponse = {
  dashboard: {
    summary: Record<string, number>;
    health: Record<string, number | null>;
    alerts: EcosystemModuleDashboard['alerts'];
    risks: EcosystemModuleDashboard['risks'];
    distributions: EcosystemModuleDashboard['distributions'];
    permissions: { canRegister: boolean; canConfigure: boolean; canExport: boolean };
    generatedAt: string;
    source: string;
  };
};

const labels: Record<string, [string, string, 'success' | 'warning' | 'danger' | 'info' | 'neutral']> = {
  total: ['Total Registered Modules', 'Portfolio records', 'info'],
  active: ['Active Modules', 'Enabled modules', 'success'],
  pilot: ['Pilot Modules', 'Controlled rollout', 'info'],
  comingSoon: ['Coming Soon', 'Pre-release', 'neutral'],
  planned: ['Planned Modules', 'Roadmap', 'info'],
  needsAttention: ['Modules Requiring Attention', 'Action needed', 'danger'],
  operational: ['Operational Modules', 'Available portfolio', 'success'],
  degraded: ['Degraded Modules', 'Service health', 'warning'],
  blocked: ['Blocked Releases', 'Release intervention', 'danger'],
  pendingConfiguration: ['Pending Configurations', 'Configuration review', 'warning'],
  integrationIssues: ['Integration Issues', 'Integration checks', 'warning'],
  dependencyRisks: ['Dependency Risks', 'Dependency review', 'warning'],
  countriesEnabled: ['Countries Enabled', 'Live territories', 'info'],
};

function toParams(filters: EcosystemModuleFilters) {
  return {
    search: filters.search,
    lifecycle: filters.lifecycle?.toLowerCase().replaceAll(' ', '_'),
    status: filters.operationalStatus?.toLowerCase().replaceAll(' ', '_'),
    owner: filters.owner,
    category: filters.category,
    environment: filters.environment?.toLowerCase().replaceAll(' ', '_'),
    risk: filters.risk?.toLowerCase(),
    sort: filters.sort ? ({
      moduleName: 'name', moduleKey: 'module_key', operationalStatus: 'status',
      riskLevel: 'risk_level', lastUpdated: 'updated_at', healthScore: 'health_score',
      adoptionRate: 'adoption_rate', currentVersion: 'current_version',
      targetVersion: 'target_version', releaseStatus: 'release_status',
      securityReview: 'security_status', complianceStatus: 'compliance_status',
      integrationReadiness: 'integration_status', dependencyHealth: 'dependency_status',
      primaryOwner: 'primary_owner',
    } as Record<string, string>)[filters.sort] ?? filters.sort : undefined,
    direction: filters.direction,
    page: filters.page,
    per_page: filters.pageSize,
  };
}

export async function fetchEcosystemModules(filters: EcosystemModuleFilters = {}): Promise<EcosystemModulePage> {
  const response = await api.get('/admin/ecosystem/modules', { params: toParams(filters) }) as ModulesResponse;
  return {
    data: response.modules.data,
    total: response.modules.total,
    page: response.modules.current_page,
    pageSize: response.modules.per_page,
    totalPages: response.modules.last_page,
  };
}

export async function fetchEcosystemModuleDashboard(): Promise<EcosystemModuleDashboard> {
  const { dashboard } = await api.get('/admin/ecosystem/dashboard') as DashboardApiResponse;
  const kpis = Object.entries(labels).map(([id, [label, detail, tone]]) => ({
    id,
    label,
    detail,
    tone,
    value: String(dashboard.summary[id] ?? 0),
  }));
  kpis.push({
    id: 'average-health',
    label: 'Average Module Health',
    detail: 'Evaluated portfolio average',
    tone: 'success',
    value: dashboard.health.overall === null ? '—' : `${dashboard.health.overall}%`,
  });
  const healthLabels: Record<string, string> = {
    overall: 'Portfolio Health Score', availability: 'Operational Availability',
    configuration: 'Configuration Completeness', integration: 'Integration Readiness',
    dependency: 'Dependency Health', compliance: 'Compliance Readiness',
    release: 'Release Readiness', adoption: 'Adoption Rate',
  };
  return {
    kpis,
    portfolioHealth: Object.entries(healthLabels).map(([key, label]) => ({
      label,
      value: dashboard.health[key] === null ? '—' : `${dashboard.health[key]}%`,
      progress: dashboard.health[key] ?? 0,
      tone: (dashboard.health[key] ?? 0) >= 85 ? 'success' : 'warning',
    })),
    alerts: dashboard.alerts,
    risks: dashboard.risks,
    distributions: dashboard.distributions,
    permissions: dashboard.permissions,
    generatedAt: dashboard.generatedAt,
    source: dashboard.source,
    freshness: 'fresh',
  };
}

export async function fetchEcosystemModuleByKey(moduleKey: string): Promise<EcosystemModule | null> {
  const page = await fetchEcosystemModules({ search: moduleKey, pageSize: 10 });
  return page.data.find((module) => module.moduleKey === moduleKey) ?? null;
}

export function getModulePermissions(readOnly = false): ModulePermissions {
  return { canRegister: !readOnly, canCompare: !readOnly, canExport: !readOnly, canManageReleases: !readOnly };
}

export async function registerEcosystemModule(draft: ModuleRegistrationDraft): Promise<EcosystemModule> {
  const response = await api.post('/admin/ecosystem/modules', {
    module_key: draft.moduleKey.trim().toLowerCase(),
    name: draft.moduleName.trim(),
    category: draft.category,
    module_type: 'optional',
    lifecycle: 'planned',
    status: 'draft',
    environment: draft.environment.toLowerCase(),
    release_status: 'not_scheduled',
    health_status: 'unknown',
    risk_level: 'unknown',
    primary_owner: draft.primaryOwner || null,
    technical_owner: draft.technicalOwner || null,
    is_enabled: false,
  }) as { module: EcosystemModule };
  return response.module;
}

export async function exportEcosystemModuleReport(filters: EcosystemModuleFilters = {}): Promise<string> {
  const results = await fetchEcosystemModules({ ...filters, page: 1, pageSize: 100 });
  const headers = ['Public reference', 'Database module ID', 'Module name', 'Module key', 'Lifecycle', 'Operational status', 'Health score', 'Risk level'];
  const rows = results.data.map((module) => [module.publicReference, module.databaseModuleId, module.moduleName, module.moduleKey, module.lifecycle, module.operationalStatus, module.healthScore ?? '', module.riskLevel]);
  return [headers, ...rows].map((row) => row.map((item) => `"${String(item ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
}
