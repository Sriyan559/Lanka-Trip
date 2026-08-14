import { apiClient } from './apiClient';

export interface AdministrationCommandCenterResponse {
  overview: {
    health_score: number;
    identity_health_score: number;
    security_posture_score: number;
    workflow_compliance_score: number;
    total_users: number;
    active_users: number;
    admin_count: number;
    active_sessions: number;
    mfa_enforced: number;
    locked_accounts: number;
    business_units_count: number;
    organizations_count: number;
    last_updated: string;
  };
  kpis: Record<
    string,
    {
      value: string | number;
      delta?: string;
      trend?: 'up' | 'down' | 'neutral';
      status?: 'healthy' | 'warning' | 'danger' | 'info' | 'neutral';
    }
  >;
  administrative_identities: Array<{
    id: number;
    email: string;
    name: string;
    type: string;
    tenant: string;
    scope: string;
    lastLogin: string;
    mfa: boolean;
    status: string;
  }>;
  privileged_admins: Array<{
    id: number;
    email: string;
    name: string;
    role: string;
    scope: string;
    privilegeLevel: string;
    lastLogin: string;
    reviewDue: string;
    risk: 'low' | 'medium' | 'high' | 'critical';
    status: string;
  }>;
  platform_configs: Array<{
    config: string;
    domain: string;
    state: string;
    drift: string;
    sync: string;
  }>;
  localization_readiness: Array<{
    locale: string;
    code: string;
    coverage: string;
    status: string;
    fallback: string;
  }>;
  security_posture: Array<{
    control: string;
    type: string;
    compliance: string;
    violations: number;
    status: string;
  }>;
  governance_jobs: Array<{
    job: string;
    frequency: string;
    lastRun: string;
    status: string;
  }>;
  recent_activity: Array<{
    id: number | string;
    description: string;
    causer: string;
    timestamp: string;
    type: string;
  }>;
  charts: {
    activity_trend_30d: Array<{
      date: string;
      logins: number;
      adminActions: number;
      securityEvents: number;
    }>;
    domain_distribution: Array<{
      domain: string;
      value: number;
    }>;
  };
  server_info: {
    environment: string;
    php_version: string;
    laravel_version: string;
    server_time: string;
    maintenance_mode: boolean;
  };
}

export interface HealthCheckResponse {
  health_score: number;
  identity_health_score: number;
  security_posture_score: number;
  workflow_compliance_score: number;
  status: string;
  checks: Array<{
    name: string;
    status: string;
    latency?: string;
    jobs_pending?: number;
    coverage?: string;
    active_tokens?: number;
  }>;
  timestamp: string;
}

export type KpiValue = {
  value: string | number;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'healthy' | 'warning' | 'danger' | 'info' | 'neutral';
};

// ─── Identity / Users ────────────────────────────────────────────────────────

export interface IdentityUser {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
  displayRole: string;
  businessUnit: string;
  tenant: string;
  privilege: string;
  status: string;
  mfa: boolean;
  mfaStatus: string;
  authMethod: string;
  risk: string;
  lastLogin: string;
  created_at: string;
}

export interface IdentityPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface IdentityListResponse {
  users: IdentityUser[];
  pagination: IdentityPagination;
}

export interface IdentityRegistryRow {
  type: string;
  users: string;
  count: number | string;
  privilege: string;
  highRisk: string;
  lastUpdated: string;
}

export interface IdentityHealthDimension {
  dimension: string;
  baseScore: string;
  goodScore: string;
  satisfactoryScore: string;
  needsAttention: string;
  score: number;
  trend: 'up' | 'neutral' | 'down';
}

export interface IdentityScorecardResponse {
  kpis: Record<string, KpiValue>;
  health_score: number;
  registry_summary: IdentityRegistryRow[];
  health_scorecard: IdentityHealthDimension[];
  charts: {
    login_trend_30d: Array<{
      date: string;
      sso: number;
      mfa: number;
      failures: number;
    }>;
    identity_ownership: Array<{
      name: string;
      value: number;
    }>;
  };
}

export interface CreateUserPayload {
  name: string;
  email: string;
  username?: string;
  role?: string;
  business_unit?: string;
  phone?: string;
  password?: string;
  status?: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  username?: string;
  role?: string;
  business_unit?: string;
  phone?: string;
  status?: string;
}

// ─── Service objects ─────────────────────────────────────────────────────────

export const administrationService = {
  getCommandCenterData: async (params?: Record<string, string>): Promise<AdministrationCommandCenterResponse> => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await apiClient<{ data: AdministrationCommandCenterResponse }>(`/admin/administration/command-center${query}`);
    return res.data;
  },

  getHealth: async (): Promise<HealthCheckResponse> => {
    const res = await apiClient<{ data: HealthCheckResponse }>('/admin/administration/health');
    return res.data;
  },
};

export const identityService = {
  /** Paginated, searchable, filterable user listing */
  getUsers: async (
    filters: Record<string, string> = {},
    page = 1,
    perPage = 20
  ): Promise<IdentityListResponse> => {
    const params = new URLSearchParams({ ...filters, page: String(page), per_page: String(perPage) });
    const res = await apiClient<{ data: IdentityListResponse }>(`/admin/administration/users?${params}`);
    return res.data;
  },

  /** Scorecard stats + registry summary + health scorecard + charts */
  getScorecard: async (): Promise<IdentityScorecardResponse> => {
    const res = await apiClient<{ data: IdentityScorecardResponse }>('/admin/administration/users/scorecard');
    return res.data;
  },

  /** Get a single user by ID */
  getUser: async (id: number): Promise<IdentityUser> => {
    const res = await apiClient<{ data: { user: IdentityUser } }>(`/admin/administration/users/${id}`);
    return res.data.user;
  },

  /** Create a new user */
  createUser: async (payload: CreateUserPayload): Promise<IdentityUser> => {
    const res = await apiClient<{ data: { user: IdentityUser } }>('/admin/administration/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.data.user;
  },

  /** Update an existing user */
  updateUser: async (id: number, payload: UpdateUserPayload): Promise<IdentityUser> => {
    const res = await apiClient<{ data: { user: IdentityUser } }>(`/admin/administration/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.data.user;
  },

  /** Change a user's status (active / suspended / locked / pending) */
  updateStatus: async (id: number, status: string, reason?: string): Promise<IdentityUser> => {
    const res = await apiClient<{ data: { user: IdentityUser } }>(`/admin/administration/users/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, reason }),
    });
    return res.data.user;
  },

  /** Reset password — returns the new temporary password */
  resetPassword: async (id: number, newPassword?: string): Promise<string> => {
    const res = await apiClient<{ data: { temporary_password: string } }>(`/admin/administration/users/${id}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPassword ? { password: newPassword } : {}),
    });
    return res.data.temporary_password;
  },

  /** Trigger CSV file download — respects current filters */
  exportUsers: async (filters: Record<string, string> = {}): Promise<void> => {
    const { downloadApiFile } = await import('./apiClient');
    const params = new URLSearchParams(filters);
    await downloadApiFile(
      `/admin/administration/users/export?${params}`,
      `users_identity_registry_${new Date().toISOString().slice(0, 10)}.csv`
    );
  },
};
