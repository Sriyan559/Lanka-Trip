import { MaintenanceDiagnosticsFullData } from './maintenance.types';

export const MAINTENANCE_METADATA = {
  id: 'AD13',
  name: 'Maintenance, Diagnostics, System Jobs & Operational Administration',
  route: '/admin/administration/maintenance',
  module: 'Administration',
  domain: 'Maintenance & Diagnostics',
};

export const MAINTENANCE_TABS = [
  { id: 'overview', label: 'Operations Overview' },
  { id: 'system-jobs', label: 'System Jobs' },
  { id: 'schedules', label: 'Schedules' },
  { id: 'queues', label: 'Queues' },
  { id: 'workers', label: 'Workers' },
  { id: 'services', label: 'Services' },
  { id: 'health-diagnostics', label: 'Health & Diagnostics' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'dependencies', label: 'Dependencies' },
  { id: 'administration', label: 'Administration' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'reports', label: 'Reports' },
  { id: 'audit', label: 'Audit' },
] as const;

export const MAINTENANCE_FILTERS = [
  { id: 'all-services', label: 'All Services' },
  { id: 'all-job-types', label: 'All Job Types' },
  { id: 'all-queues', label: 'All Queues' },
  { id: 'all-workers', label: 'All Workers' },
  { id: 'all-statuses', label: 'All Statuses' },
  { id: 'all-environments', label: 'All Environments' },
  { id: 'all-regions', label: 'All Regions' },
];

export const MAINTENANCE_QUICK_FILTERS = [
  { id: 'running', label: 'Running', color: 'text-blue-700' },
  { id: 'completed', label: 'Completed', color: 'text-emerald-700' },
  { id: 'failed', label: 'Failed', color: 'text-rose-700' },
  { id: 'retrying', label: 'Retrying', color: 'text-amber-700' },
  { id: 'delayed', label: 'Delayed', color: 'text-orange-700' },
  { id: 'paused', label: 'Paused', color: 'text-gray-600' },
  { id: 'cancelled', label: 'Cancelled', color: 'text-gray-500' },
  { id: 'dead-letter', label: 'Dead-Letter', color: 'text-rose-800' },
  { id: 'active', label: 'Active', color: 'text-emerald-700' },
  { id: 'healthy', label: 'Healthy', color: 'text-emerald-700' },
  { id: 'degraded', label: 'Degraded', color: 'text-amber-700' },
  { id: 'unhealthy', label: 'Unhealthy', color: 'text-rose-700' },
];

export const DEFAULT_MAINTENANCE_DATA: MaintenanceDiagnosticsFullData = {
  context: {
    tenant: 'SL Beauty',
    ecosystem: 'Beauty Marketplace',
    adminScope: 'Enterprise-Wide',
    region: 'Sri Lanka',
    environment: 'Production',
    jobRegistry: 'Connected',
    serviceRegistry: 'Connected',
    healthCheckService: 'Connected',
    workerRegistry: 'Connected',
    dependencyRegistry: 'Connected',
    auditService: 'Connected',
    dataCompleteness: '100%',
    lastRefreshed: 'May 13, 2025 5:45 AM',
    accessScope: 'Administration Scope',
  },

  kpis: {
    registeredJobs: { value: 36, trend: '0%', trendDirection: 'up', sparkline: [34, 35, 35, 36, 36, 36] },
    activeScheduledJobs: { value: 74, trend: '3%', trendDirection: 'up', sparkline: [70, 71, 72, 73, 73, 74] },
    runningJobs: { value: 8, trend: '0%', trendDirection: 'up', sparkline: [6, 7, 7, 8, 8, 8] },
    failedJobs24h: { value: 12, trend: '25%', trendDirection: 'down', sparkline: [18, 16, 15, 14, 13, 12] },
    retryQueue: { value: 16, trend: '11%', trendDirection: 'down', sparkline: [22, 20, 18, 17, 16, 16] },
    queueBacklog: { value: 213, trend: '5%', trendDirection: 'down', sparkline: [240, 230, 225, 218, 215, 213] },
    degradedServices: { value: 3, trend: '25%', trendDirection: 'down', sparkline: [5, 4, 4, 3, 3, 3] },
    maintenanceWindows: { value: 2, trend: '0%', trendDirection: 'up', sparkline: [2, 2, 2, 2, 2, 2] },
    healthChecks: { value: 0, trend: '0%', trendDirection: 'up', sparkline: [0, 0, 0, 0, 0, 0] },
    failedHealthChecks: { value: 4, trend: '20%', trendDirection: 'down', sparkline: [7, 6, 5, 5, 4, 4] },
    dependencyWarnings: { value: 4, trend: '20%', trendDirection: 'down', sparkline: [6, 5, 5, 4, 4, 4] },
    backgroundWorkers: { value: 618, trend: '4%', trendDirection: 'up', sparkline: [594, 600, 606, 612, 615, 618] },
    activeWorkers: { value: 445, trend: '3%', trendDirection: 'up', sparkline: [428, 432, 436, 440, 443, 445] },
    criticalJobs: { value: 2, trend: '33%', trendDirection: 'down', sparkline: [4, 3, 3, 2, 2, 2] },
    deadLetterJobs: { value: 3, trend: '25%', trendDirection: 'down', sparkline: [5, 4, 4, 3, 3, 3] },
    slaCompliance: { value: '100%', trend: '1%', trendDirection: 'up', sparkline: [97, 98, 99, 99, 100, 100] },
    serviceHealth: { value: '96 / 100', trend: '1 pt', trendDirection: 'up', sparkline: [93, 94, 95, 95, 96, 96] },
    scheduledMaintenance: { value: 2, trend: '0%', trendDirection: 'up', sparkline: [2, 2, 2, 2, 2, 2] },
    maintenanceOverdue: { value: 0, trend: '100%', trendDirection: 'down', sparkline: [3, 2, 1, 1, 0, 0] },
    systemAlerts: { value: 4, trend: '20%', trendDirection: 'down', sparkline: [7, 6, 5, 5, 4, 4] },
  },

  systemJobs: [
    { id: 'j1', jobName: 'Product Image Synchronization', service: 'Product Service', type: 'ETL', schedule: '*/15 min', lifecycle: 'Active', lastRun: '6:44 AM', status: 'Completed', successRate: '99.6%', avgDuration: '2m 18s', nextRun: '6:44 AM' },
    { id: 'j2', jobName: 'Inventory Reconciliation', service: 'Inventory Service', type: 'Batch', schedule: '*/30 min', lifecycle: 'Active', lastRun: '6:30 AM', status: 'Running', successRate: '98.8%', avgDuration: '5m 44s', nextRun: '7:00 AM' },
    { id: 'j3', jobName: 'Order Status Update', service: 'Order Service', type: 'Batch', schedule: '*/5 min', lifecycle: 'Active', lastRun: '6:42 AM', status: 'Completed', successRate: '99.7%', avgDuration: '45s', nextRun: '6:47 AM' },
    { id: 'j4', jobName: 'Search Index Optimization', service: 'Search Service', type: 'Batch', schedule: '1:00 AM', lifecycle: 'Active', lastRun: 'May 13, 5:00 AM', status: 'Scheduled', successRate: '99.7%', avgDuration: '12m 34s', nextRun: 'May 14, 3:00 AM' },
    { id: 'j5', jobName: 'Customer Email Digest', service: 'Marketing Service', type: 'Batch', schedule: '8:00 AM', lifecycle: 'Active', lastRun: 'May 13, 8:00 AM', status: 'Completed', successRate: '98.7%', avgDuration: '3m 11s', nextRun: 'May 14, 8:00 AM' },
  ],

  selectedJob: {
    jobName: 'Product Image Synchronization',
    service: 'Product Service',
    type: 'ETL',
    schedule: '*/15 minutes',
    lifecycle: 'Active',
    lastRun: 'May 13, 2025 6:44 AM',
    status: 'Completed',
    successRate: '99.6%',
    avgDuration: '2m 18s',
    retryPolicy: '3 attempts, exponential',
    deadLetterHandling: 'Move to DLQ after max retries',
    workerPool: 'Product Service Pool',
    executionMode: 'Parallel',
    concurrency: 12,
    sla: '5 minutes',
    slaCompliance: '3 minutes',
    nextRun: 'May 13, 2025 6:59 AM',
    healthScore: 99,
    statusLabel: 'Excellent',
  },

  retryQueue: [
    { id: 'rq1', priority: 'Total', total: 56, maxRetries: 5, delay: 'Fixed interval' },
    { id: 'rq2', priority: 'High Priority', total: 5, maxRetries: 3, delay: 'Immediate' },
    { id: 'rq3', priority: 'Normal Priority', total: 46, maxRetries: 5, delay: '15-40s' },
    { id: 'rq4', priority: 'Low Priority', total: 5, maxRetries: 3, delay: 'Custom Policy' },
  ],

  retryPolicies: [
    { id: 'rp1', policyName: 'Fixed Interval', attempts: 5, priority: 'Normal', delay: '30s' },
    { id: 'rp2', policyName: 'Exponential Backoff', attempts: 3, priority: 'High', delay: '15-40s' },
    { id: 'rp3', policyName: 'Custom Policy', attempts: 3, priority: 'Low', delay: '60s' },
  ],

  deadLetterJobs: [
    { id: 'dl1', jobName: 'Failed Notification Job', priority: 'High Priority', age: '4h 10s' },
    { id: 'dl2', jobName: 'Failed Payment Hook', priority: 'High Priority', age: '2h 45s' },
    { id: 'dl3', jobName: 'Failed Report Export', priority: 'Low Priority', age: '1h 32s' },
  ],

  platformServices: [
    { id: 'ps1', serviceName: 'Total Services', total: 52, enabled: 46, disabled: 2, unknown: 4 },
    { id: 'ps2', serviceName: 'Enabled', total: 46, enabled: 46, disabled: 0, unknown: 0 },
    { id: 'ps3', serviceName: 'Disabled', total: 2, enabled: 0, disabled: 2, unknown: 0 },
    { id: 'ps4', serviceName: 'Unknown', total: 4, enabled: 0, disabled: 0, unknown: 4 },
  ],

  serviceRegistry: [
    { id: 'sr1', serviceName: 'Healthy', health: 'Healthy', percentage: '88.5% (46)' },
    { id: 'sr2', serviceName: 'Degraded', health: 'Degraded', percentage: '5.8% (3)' },
    { id: 'sr3', serviceName: 'Unhealthy', health: 'Unhealthy', percentage: '3.8% (2)' },
    { id: 'sr4', serviceName: 'Unknown', health: 'Unknown', percentage: '1.9% (1)' },
  ],

  healthChecks: [
    { id: 'hc1', checkName: 'Database Connections', totalChecks: 4, passing: 4, warning: 0, failing: 0 },
    { id: 'hc2', checkName: 'Cache Services', totalChecks: 3, passing: 3, warning: 0, failing: 0 },
    { id: 'hc3', checkName: 'Search Service Latency', totalChecks: 1, passing: 0, warning: 1, failing: 0 },
    { id: 'hc4', checkName: 'Payment Gateway Timeout', totalChecks: 1, passing: 0, warning: 0, failing: 1 },
  ],

  healthCheckFailures: [
    { id: 'hcf1', checkName: 'Search Service Latency', failures: 1, trend: 'Recurring' },
    { id: 'hcf2', checkName: 'Payment Gateway Timeout', failures: 1, trend: 'New' },
    { id: 'hcf3', checkName: 'Database Replication Lag', failures: 1, trend: 'Recurring' },
    { id: 'hcf4', checkName: 'Backup Window Overlap', failures: 1, trend: 'New' },
  ],

  diagnosticOverview: [
    { id: 'do1', category: 'Total Diagnostics', total: 18, errors: 4, warnings: 8, info: 6 },
    { id: 'do2', category: 'System Events', total: 22, errors: 2, warnings: 5, info: 6 },
    { id: 'do3', category: 'Operational Events', total: 14, errors: 2, warnings: 3, info: 0 },
  ],

  diagnosticSignals: [
    { id: 'ds1', signalName: 'Errors (24h)', count: 20, priority: 'High', type: 'Error' },
    { id: 'ds2', signalName: 'Warnings (24h)', count: 142, priority: 'Medium', type: 'Warning' },
    { id: 'ds3', signalName: 'Info (24h)', count: 368, priority: 'Low', type: 'Info' },
  ],

  maintenanceWindows: [
    { id: 'mw1', windowName: 'Search Index Optimization', type: 'Performance', status: 'Scheduled', scheduled: 'May 13, 2025', duration: '30 min' },
    { id: 'mw2', windowName: 'DB Backup Maintenance', type: 'Backup', status: 'Completed', scheduled: 'May 10, 2025', duration: '45 min' },
    { id: 'mw3', windowName: 'Cache Clear & Rebuild', type: 'Maintenance', status: 'Pending', scheduled: 'May 14, 2025', duration: '15 min' },
  ],

  selectedMaintenance: {
    windowName: 'Search Index Optimization',
    startTime: 'May 13, 2025 6:00 AM',
    endTime: 'May 13, 2025 6:30 AM',
    type: 'Performance, Catalog Service',
    service: 'Catalog Service',
    reason: 'Performance',
    status: 'Scheduled',
    readiness: 92,
    noChecksNeeded: '4 / Passed',
    resourcesAllocated: 'Yes (Ready)',
    dependencyReady: 'No (Checklist)',
    approvalRequired: '3 minutes',
    approvedBy: 'Platform Operations',
  },

  maintenanceImpact: [
    { id: 'mi1', impact: '1 High', count: 1 },
    { id: 'mi2', impact: '4 Medium', count: 4 },
    { id: 'mi3', impact: '3 Low', count: 3 },
    { id: 'mi4', impact: '1 None', count: 1 },
  ],

  dependencies: [
    { id: 'dep1', dependencyName: 'Order Database', type: 'Database', status: 'Healthy', responseTime: '24ms', sla: '50ms' },
    { id: 'dep2', dependencyName: 'Search Service API', type: 'API', status: 'Degraded', responseTime: '284ms', sla: '200ms' },
    { id: 'dep3', dependencyName: 'Payment Gateway', type: 'External', status: 'Healthy', responseTime: '140ms', sla: '200ms' },
    { id: 'dep4', dependencyName: 'CDN Service', type: 'Service', status: 'Healthy', responseTime: '12ms', sla: '50ms' },
    { id: 'dep5', dependencyName: 'Redis Cache', type: 'Cache', status: 'Healthy', responseTime: '2ms', sla: '10ms' },
  ],

  dependencyImpact: [
    { id: 'di1', impact: 'Critical', count: 24 },
    { id: 'di2', impact: 'Medium Impact', count: 17 },
    { id: 'di3', impact: 'Low Impact', count: 9 },
    { id: 'di4', impact: 'Healthy', count: 40 },
  ],

  adminRoutines: [
    { id: 'ar1', routineName: 'Total Routines', totalRoutines: 22, automated: 18, manual: 4, overdue: 0 },
    { id: 'ar2', routineName: 'Automated', totalRoutines: 18, automated: 18, manual: 0, overdue: 0 },
    { id: 'ar3', routineName: 'Manual', totalRoutines: 4, automated: 0, manual: 4, overdue: 0 },
    { id: 'ar4', routineName: 'Overdue', totalRoutines: 0, automated: 0, manual: 0, overdue: 0 },
  ],

  cacheIndex: [
    { id: 'ci1', name: 'Index Health', successful: '89%', lastRun: 'May 11, 2025', nextRun: 'May 18, 2025' },
    { id: 'ci2', name: 'Media Files', successful: 'Successful', lastRun: 'May 11, 2025', nextRun: 'May 18, 2025' },
    { id: 'ci3', name: 'DB Backup', successful: 'Successful', lastRun: 'May 11, 2025', nextRun: 'Jun-15' },
  ],

  dataSync: [
    { id: 'dsy1', name: 'Successful (24h)', successful: 41, lastRun: 'May 13, 2025', nextRun: 'May 13, 2025' },
    { id: 'dsy2', name: 'Failed (24h)', successful: 2, lastRun: 'May 13, 2025', nextRun: 'May 13, 2025' },
  ],

  operationalRisks: [
    { id: 'or1', domain: 'Search Service Latency Spike', impact: 'High', severity: 'High' },
    { id: 'or2', domain: 'Database Replication Lag', impact: 'High', severity: 'High' },
    { id: 'or3', domain: 'Payment Gateway Instability', impact: 'Medium', severity: 'Medium' },
    { id: 'or4', domain: 'Backup Window Overlap', impact: 'Low', severity: 'Low' },
  ],

  recentActivity: [
    { id: 'ra1', time: '5:35 AM', jobName: 'Product Image Sync', event: 'Completed', status: 'Completed', by: 'system' },
    { id: 'ra2', time: '5:38 AM', jobName: 'Health Check', event: 'Database Health Check', status: 'Passed', by: 'system' },
    { id: 'ra3', time: '5:40 AM', jobName: 'Search Service Latency', event: 'Alert', status: 'Warning', by: 'monitor' },
    { id: 'ra4', time: '5:42 AM', jobName: 'Retry: Payment Hook API', event: 'Retry Attempt', status: 'Retrying', by: 'system' },
    { id: 'ra5', time: '4:45 AM', jobName: 'Search Service Latency', event: 'Alert', status: 'Warning', by: 'system' },
  ],

  healthMatrix: [
    { id: 'hm1', domain: 'Jobs', health: '96 / 100', trend: '+2', status: 'Excellent' },
    { id: 'hm2', domain: 'Services', health: '94 / 100', trend: '+1', status: 'Very Good' },
    { id: 'hm3', domain: 'Workers', health: '98 / 100', trend: '0', status: 'Excellent' },
    { id: 'hm4', domain: 'Queues', health: '95 / 100', trend: '+1', status: 'Excellent' },
    { id: 'hm5', domain: 'Dependencies', health: '90 / 100', trend: '-1', status: 'Good' },
    { id: 'hm6', domain: 'Data & Integrations', health: '95 / 100', trend: '+2', status: 'Excellent' },
    { id: 'hm7', domain: 'Data Integrity', health: '99 / 100', trend: '0', status: 'Excellent' },
    { id: 'hm8', domain: 'Security Posture', health: '97 / 100', trend: '0', status: 'Excellent' },
  ],

  charts: {
    jobExecution: [
      { name: 'Completed', value: 22, color: '#10b981' },
      { name: 'Failed', value: 5, color: '#f43f5e' },
      { name: 'Running', value: 9, color: '#3b82f6' },
    ],
    jobExecutionTrend: [
      { label: 'Apr 14', Completed: 180, Failed: 12, Running: 8 },
      { label: 'Apr 21', Completed: 195, Failed: 10, Running: 9 },
      { label: 'Apr 28', Completed: 210, Failed: 8, Running: 7 },
      { label: 'May 5', Completed: 220, Failed: 6, Running: 8 },
      { label: 'May 12', Completed: 235, Failed: 5, Running: 8 },
    ],
    workerRegistry: [
      { name: 'Active', value: 445, color: '#10b981' },
      { name: 'Offline', value: 41, color: '#64748b' },
      { name: 'Warming', value: 132, color: '#f59e0b' },
    ],
    workerCapacity: [
      { name: 'Healthy', value: 72, color: '#10b981' },
      { name: 'Warning', value: 15, color: '#f59e0b' },
      { name: 'Critical', value: 13, color: '#f43f5e' },
    ],
    queueHealth: [
      { name: 'Healthy', value: 95, color: '#10b981' },
      { name: 'Warning', value: 3, color: '#f59e0b' },
      { name: 'Unhealthy', value: 2, color: '#f43f5e' },
    ],
    queueDepth: [
      { label: '8 PM', 'High Priority': 22, Normal: 80 },
      { label: '12 AM', 'High Priority': 18, Normal: 70 },
      { label: '4 AM', 'High Priority': 12, Normal: 60 },
      { label: '8 AM', 'High Priority': 15, Normal: 75 },
      { label: '12 PM', 'High Priority': 20, Normal: 85 },
    ],
    serviceHealthTrend: [
      { label: 'Apr 14', Healthy: 88, Degraded: 8, Unhealthy: 4 },
      { label: 'Apr 21', Healthy: 90, Degraded: 6, Unhealthy: 4 },
      { label: 'Apr 28', Healthy: 92, Degraded: 5, Unhealthy: 3 },
      { label: 'May 5', Healthy: 93, Degraded: 4, Unhealthy: 3 },
      { label: 'May 12', Healthy: 95, Degraded: 3, Unhealthy: 2 },
    ],
    maintenanceReadiness: [
      { name: 'Pre-Checks Passed', value: 19, color: '#10b981' },
      { name: 'Dependencies Ready', value: 9, color: '#3b82f6' },
      { name: 'Resources Available', value: 18, color: '#6366f1' },
      { name: 'Approvals Complete', value: 7, color: '#f59e0b' },
    ],
    operationalReadiness: [
      { name: 'Dependencies Ready', value: 80, color: '#10b981' },
      { name: 'Jobs Ready', value: 88, color: '#3b82f6' },
      { name: 'Resources Ready', value: 90, color: '#6366f1' },
    ],
  },
};
