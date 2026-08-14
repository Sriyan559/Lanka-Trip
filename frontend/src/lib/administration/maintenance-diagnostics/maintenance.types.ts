/**
 * Type definitions for Maintenance, Diagnostics, System Jobs & Operational Administration (AD13)
 */

export type JobStatus = 'Running' | 'Completed' | 'Failed' | 'Retrying' | 'Delayed' | 'Paused' | 'Cancelled' | 'Dead-Letter' | 'Scheduled';
export type JobLifecycle = 'Active' | 'Paused' | 'Retired';
export type ServiceHealth = 'Healthy' | 'Degraded' | 'Unhealthy' | 'Unknown';
export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type MaintenanceStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue' | 'Pending';
export type DependencyStatus = 'Healthy' | 'Degraded' | 'Down' | 'Unknown';

export interface SystemJobRecord {
  id: string;
  jobName: string;
  service: string;
  type: string;
  schedule: string;
  lifecycle: JobLifecycle;
  lastRun: string;
  status: JobStatus;
  successRate: string;
  avgDuration: string;
  nextRun: string;
}

export interface SelectedJobDetails {
  jobName: string;
  service: string;
  type: string;
  schedule: string;
  lifecycle: JobLifecycle;
  lastRun: string;
  status: JobStatus;
  successRate: string;
  avgDuration: string;
  retryPolicy: string;
  deadLetterHandling: string;
  workerPool: string;
  executionMode: string;
  concurrency: number;
  sla: string;
  slaCompliance: string;
  nextRun: string;
  healthScore: number;
  statusLabel: string;
}

export interface RetryQueueRow {
  id: string;
  priority: string;
  total: number;
  maxRetries: number;
  delay: string;
}

export interface RetryPolicyRow {
  id: string;
  policyName: string;
  attempts: number;
  priority: string;
  delay: string;
}

export interface DeadLetterJobRow {
  id: string;
  jobName: string;
  priority: string;
  age: string;
}

export interface PlatformServiceRow {
  id: string;
  serviceName: string;
  total: number;
  enabled: number;
  disabled: number;
  unknown: number;
}

export interface ServiceRegistryRow {
  id: string;
  serviceName: string;
  health: ServiceHealth;
  percentage: string;
}

export interface HealthCheckRow {
  id: string;
  checkName: string;
  totalChecks: number;
  passing: number;
  warning: number;
  failing: number;
}

export interface HealthCheckFailureRow {
  id: string;
  checkName: string;
  failures: number;
  trend: string;
}

export interface DiagnosticOverviewRow {
  id: string;
  category: string;
  total: number;
  errors: number;
  warnings: number;
  info: number;
}

export interface DiagnosticSignalRow {
  id: string;
  signalName: string;
  count: number;
  priority: string;
  type: string;
}

export interface MaintenanceWindowRow {
  id: string;
  windowName: string;
  type: string;
  status: MaintenanceStatus;
  scheduled: string;
  duration: string;
}

export interface SelectedMaintenanceDetails {
  windowName: string;
  startTime: string;
  endTime: string;
  type: string;
  service: string;
  reason: string;
  status: MaintenanceStatus;
  readiness: number;
  noChecksNeeded: string;
  resourcesAllocated: string;
  dependencyReady: string;
  approvalRequired: string;
  approvedBy: string;
}

export interface MaintenanceImpactRow {
  id: string;
  impact: string;
  count: number;
}

export interface DependencyRow {
  id: string;
  dependencyName: string;
  type: string;
  status: DependencyStatus;
  responseTime: string;
  sla: string;
}

export interface DependencyImpactRow {
  id: string;
  impact: string;
  count: number;
}

export interface AdminRoutineRow {
  id: string;
  routineName: string;
  totalRoutines: number;
  automated: number;
  manual: number;
  overdue: number;
}

export interface CacheIndexRow {
  id: string;
  name: string;
  successful: number | string;
  lastRun: string;
  nextRun: string;
}

export interface DataSyncRow {
  id: string;
  name: string;
  successful: number | string;
  lastRun: string;
  nextRun: string;
}

export interface OperationalRiskRow {
  id: string;
  domain: string;
  impact: string;
  severity: SeverityLevel;
}

export interface OperationsActivityRow {
  id: string;
  time: string;
  jobName: string;
  event: string;
  status: string;
  by: string;
}

export interface OperationsHealthMatrixRow {
  id: string;
  domain: string;
  health: string;
  trend: string;
  status: string;
}

export interface MaintenanceDiagnosticsFullData {
  context: Record<string, string>;
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
  systemJobs: SystemJobRecord[];
  selectedJob: SelectedJobDetails;
  retryQueue: RetryQueueRow[];
  retryPolicies: RetryPolicyRow[];
  deadLetterJobs: DeadLetterJobRow[];
  platformServices: PlatformServiceRow[];
  serviceRegistry: ServiceRegistryRow[];
  healthChecks: HealthCheckRow[];
  healthCheckFailures: HealthCheckFailureRow[];
  diagnosticOverview: DiagnosticOverviewRow[];
  diagnosticSignals: DiagnosticSignalRow[];
  maintenanceWindows: MaintenanceWindowRow[];
  selectedMaintenance: SelectedMaintenanceDetails;
  maintenanceImpact: MaintenanceImpactRow[];
  dependencies: DependencyRow[];
  dependencyImpact: DependencyImpactRow[];
  adminRoutines: AdminRoutineRow[];
  cacheIndex: CacheIndexRow[];
  dataSync: DataSyncRow[];
  operationalRisks: OperationalRiskRow[];
  recentActivity: OperationsActivityRow[];
  healthMatrix: OperationsHealthMatrixRow[];
  charts: {
    jobExecution: { name: string; value: number; color: string }[];
    jobExecutionTrend: { label: string; Completed: number; Failed: number; Running: number }[];
    workerRegistry: { name: string; value: number; color: string }[];
    workerCapacity: { name: string; value: number; color: string }[];
    queueHealth: { name: string; value: number; color: string }[];
    queueDepth: { label: string; 'High Priority': number; 'Normal': number }[];
    serviceHealthTrend: { label: string; Healthy: number; Degraded: number; Unhealthy: number }[];
    maintenanceReadiness: { name: string; value: number; color: string }[];
    operationalReadiness: { name: string; value: number; color: string }[];
  };
}
