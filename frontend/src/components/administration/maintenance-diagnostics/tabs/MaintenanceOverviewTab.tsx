'use client';

import React from 'react';
import { MaintenanceDiagnosticsFullData, SystemJobRecord } from '@/lib/administration/maintenance-diagnostics/maintenance.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { SelectedJobPanel } from '../SelectedJobPanel';
import { ChevronRight } from 'lucide-react';

interface MaintenanceOverviewTabProps {
  data: MaintenanceDiagnosticsFullData;
  selectedJobItem: SystemJobRecord;
  onSelectJobItem: (item: SystemJobRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function MaintenanceOverviewTab({
  data,
  selectedJobItem,
  onSelectJobItem,
  onNavigateTab,
}: MaintenanceOverviewTabProps) {
  const {
    systemJobs,
    selectedJob,
    retryQueue,
    retryPolicies,
    deadLetterJobs,
    platformServices,
    serviceRegistry,
    healthChecks,
    healthCheckFailures,
    diagnosticOverview,
    diagnosticSignals,
    maintenanceWindows,
    selectedMaintenance,
    maintenanceImpact,
    dependencies,
    dependencyImpact,
    adminRoutines,
    cacheIndex,
    dataSync,
    operationalRisks,
    recentActivity,
    healthMatrix,
    charts,
  } = data;

  const jobColumns: ColumnDef<SystemJobRecord>[] = [
    {
      key: 'jobName',
      header: 'Job Name',
      cell: (r) => (
        <button type="button" onClick={() => onSelectJobItem(r)} className="font-bold text-gray-900 hover:text-[#741d35] hover:underline text-left block truncate">
          {r.jobName}
        </button>
      ),
    },
    { key: 'service', header: 'Service', cell: (r) => <span className="text-gray-600 truncate block">{r.service}</span> },
    { key: 'type', header: 'Type' },
    { key: 'schedule', header: 'Schedule', cell: (r) => <span className="font-mono text-[9px]">{r.schedule}</span> },
    { key: 'lifecycle', header: 'Lifecycle', cell: (r) => <StatusBadge status={r.lifecycle} size="xs" /> },
    { key: 'lastRun', header: 'Last Run', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastRun}</span> },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
    { key: 'successRate', header: 'Success Rate', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.successRate}</span> },
    { key: 'avgDuration', header: 'Avg Duration', align: 'center' },
    { key: 'nextRun', header: 'Next Run', cell: (r) => <span className="text-[9px] text-gray-500">{r.nextRun}</span> },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ROW 1: System Job Registry + Selected Job */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-8 min-w-0">
          <SectionCard
            title="System Job Registry"
            actions={
              <button type="button" onClick={() => onNavigateTab('system-jobs')} className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5">
                <span>View all jobs</span><ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable columns={jobColumns} data={systemJobs} density="compact" />
          </SectionCard>
        </div>
        <div className="lg:col-span-4 min-w-0">
          <SelectedJobPanel
            job={selectedJob}
            onViewDetails={() => onNavigateTab('system-jobs')}
            onViewRecentRuns={() => onNavigateTab('system-jobs')}
            onViewLogs={() => onNavigateTab('system-jobs')}
            onViewDependencies={() => onNavigateTab('dependencies')}
          />
        </div>
      </div>

      {/* ROW 2: Charts — Job Execution, Trend, Workers, Capacity, Queue Health, Queue Depth */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <SectionCard title="Job Execution — Last 24h">
          <div className="flex items-center justify-center p-1">
            <ReusableDonutChart data={charts.jobExecution} totalValue="36" totalLabel="Jobs" height={120} />
          </div>
        </SectionCard>

        <SectionCard title="Job Execution Trend — Last 30 Days">
          <ResponsiveLineChart
            data={charts.jobExecutionTrend}
            xAxisKey="label"
            series={[
              { key: 'Completed', label: 'Completed', color: '#10b981' },
              { key: 'Failed', label: 'Failed', color: '#f43f5e' },
              { key: 'Running', label: 'Running', color: '#3b82f6' },
            ]}
            height={120}
          />
        </SectionCard>

        <SectionCard title="Background Worker Registry">
          <div className="flex items-center justify-center p-1">
            <ReusableDonutChart data={charts.workerRegistry} totalValue="618" totalLabel="Workers" height={120} />
          </div>
        </SectionCard>

        <SectionCard title="Worker Capacity">
          <div className="flex items-center justify-center p-1">
            <ReusableDonutChart data={charts.workerCapacity} totalValue="72%" totalLabel="Healthy" height={120} />
          </div>
        </SectionCard>

        <SectionCard title="Queue Health">
          <div className="flex items-center justify-center p-1">
            <ReusableDonutChart data={charts.queueHealth} totalValue="95%" totalLabel="Healthy" height={120} />
          </div>
        </SectionCard>

        <SectionCard title="Queue Depth — Last 24h">
          <ResponsiveLineChart
            data={charts.queueDepth}
            xAxisKey="label"
            series={[
              { key: 'High Priority', label: 'High Priority', color: '#f43f5e' },
              { key: 'Normal', label: 'Normal', color: '#3b82f6' },
            ]}
            height={120}
          />
        </SectionCard>
      </div>

      {/* ROW 3: Retry Queue, Retry Policies, Dead-Letter, Platform Services, Service Health, Service Health Trend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <SectionCard title="Retry Queue">
          <DataTable
            columns={[
              { key: 'priority', header: 'Priority', cell: (r) => <span className="font-bold text-gray-900">{r.priority}</span> },
              { key: 'total', header: 'Total', align: 'center', cell: (r) => <span className="font-bold">{r.total}</span> },
              { key: 'maxRetries', header: 'Max Retries', align: 'center' },
              { key: 'delay', header: 'Delay' },
            ]}
            data={retryQueue}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Retry Policies">
          <DataTable
            columns={[
              { key: 'policyName', header: 'Policy', cell: (r) => <span className="font-bold text-gray-900">{r.policyName}</span> },
              { key: 'attempts', header: 'Attempts', align: 'center' },
              { key: 'priority', header: 'Priority' },
              { key: 'delay', header: 'Delay' },
            ]}
            data={retryPolicies}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Dead-Letter Jobs">
          <DataTable
            columns={[
              { key: 'jobName', header: 'Job', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.jobName}</span> },
              { key: 'priority', header: 'Priority', cell: (r) => <StatusBadge status={r.priority} size="xs" /> },
              { key: 'age', header: 'Age' },
            ]}
            data={deadLetterJobs}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Platform Service Registry">
          <DataTable
            columns={[
              { key: 'serviceName', header: 'Service', cell: (r) => <span className="font-bold text-gray-900">{r.serviceName}</span> },
              { key: 'total', header: 'Total', align: 'center' },
              { key: 'enabled', header: 'Enabled', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.enabled}</span> },
              { key: 'disabled', header: 'Disabled', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.disabled}</span> },
            ]}
            data={platformServices}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Service Health">
          <DataTable
            columns={[
              { key: 'serviceName', header: 'Status', cell: (r) => <span className="font-bold text-gray-900">{r.serviceName}</span> },
              { key: 'health', header: 'Health', cell: (r) => <StatusBadge status={r.health} size="xs" /> },
              { key: 'percentage', header: '% Total', align: 'right', cell: (r) => <span className="font-bold text-gray-700">{r.percentage}</span> },
            ]}
            data={serviceRegistry}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Service Health Trend — Last 30 Days">
          <ResponsiveLineChart
            data={charts.serviceHealthTrend}
            xAxisKey="label"
            series={[
              { key: 'Healthy', label: 'Healthy', color: '#10b981' },
              { key: 'Degraded', label: 'Degraded', color: '#f59e0b' },
              { key: 'Unhealthy', label: 'Unhealthy', color: '#f43f5e' },
            ]}
            height={120}
          />
        </SectionCard>
      </div>

      {/* ROW 4: Health Checks, Failures, Diagnostics, Signals, Maintenance Windows, Selected Maintenance, Impact, Readiness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-3">
        <SectionCard title="Operational Health Checks">
          <DataTable
            columns={[
              { key: 'checkName', header: 'Check', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.checkName}</span> },
              { key: 'totalChecks', header: 'Total', align: 'center' },
              { key: 'passing', header: 'Passing', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.passing}</span> },
              { key: 'warning', header: 'Warning', align: 'center', cell: (r) => <span className="font-bold text-amber-700">{r.warning}</span> },
              { key: 'failing', header: 'Failing', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.failing}</span> },
            ]}
            data={healthChecks}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Health Check Failures">
          <DataTable
            columns={[
              { key: 'checkName', header: 'Check', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.checkName}</span> },
              { key: 'failures', header: 'Failures', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.failures}</span> },
              { key: 'trend', header: 'Trend', cell: (r) => <StatusBadge status={r.trend} size="xs" /> },
            ]}
            data={healthCheckFailures}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Diagnostic Overview">
          <DataTable
            columns={[
              { key: 'category', header: 'Category', cell: (r) => <span className="font-bold text-gray-900">{r.category}</span> },
              { key: 'total', header: 'Total', align: 'center' },
              { key: 'errors', header: 'Errors', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.errors}</span> },
              { key: 'warnings', header: 'Warnings', align: 'center', cell: (r) => <span className="font-bold text-amber-700">{r.warnings}</span> },
            ]}
            data={diagnosticOverview}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Diagnostic Signals">
          <DataTable
            columns={[
              { key: 'signalName', header: 'Signal', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.signalName}</span> },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold">{r.count}</span> },
              { key: 'priority', header: 'Priority', cell: (r) => <StatusBadge status={r.priority} size="xs" /> },
              { key: 'type', header: 'Type' },
            ]}
            data={diagnosticSignals}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Maintenance Windows">
          <DataTable
            columns={[
              { key: 'windowName', header: 'Window', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.windowName}</span> },
              { key: 'type', header: 'Type' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'scheduled', header: 'Scheduled', cell: (r) => <span className="text-[9px] text-gray-500">{r.scheduled}</span> },
            ]}
            data={maintenanceWindows}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Selected Maintenance — Search Index Optimization">
          <div className="flex flex-col gap-1 text-[9px]">
            {[
              { label: 'Start', value: selectedMaintenance.startTime },
              { label: 'End', value: selectedMaintenance.endTime },
              { label: 'Type', value: selectedMaintenance.type },
              { label: 'Reason', value: selectedMaintenance.reason },
              { label: 'Status', value: selectedMaintenance.status },
              { label: 'No. Checks Needed', value: selectedMaintenance.noChecksNeeded },
              { label: 'Resources Allocated', value: selectedMaintenance.resourcesAllocated },
              { label: 'Dependency Ready', value: selectedMaintenance.dependencyReady },
              { label: 'Approval Required', value: selectedMaintenance.approvalRequired },
              { label: 'Approved By', value: selectedMaintenance.approvedBy },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-400 font-semibold uppercase tracking-wider">{item.label}</span>
                <span className="font-bold text-gray-900 text-right max-w-[60%] truncate">{item.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Maintenance Impact Analysis">
          <DataTable
            columns={[
              { key: 'impact', header: 'Impact', cell: (r) => <span className="font-bold text-gray-900">{r.impact}</span> },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold">{r.count}</span> },
            ]}
            data={maintenanceImpact}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Maintenance Readiness">
          <div className="flex items-center justify-center p-1">
            <ReusableDonutChart data={charts.maintenanceReadiness} totalValue={`${selectedMaintenance.readiness}%`} totalLabel="Ready" height={120} />
          </div>
        </SectionCard>
      </div>

      {/* ROW 5: Dependencies, Dependency Impact, Operational Readiness, Admin Routines, Cache, Sync, Risks, Health Matrix, Activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-3">
        <SectionCard title="Operational Dependency Registry">
          <DataTable
            columns={[
              { key: 'dependencyName', header: 'Dependency', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.dependencyName}</span> },
              { key: 'type', header: 'Type' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'responseTime', header: 'Response', align: 'right', cell: (r) => <span className="font-bold text-gray-800">{r.responseTime}</span> },
              { key: 'sla', header: 'SLA', align: 'right' },
            ]}
            data={dependencies}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Dependency Impact">
          <DataTable
            columns={[
              { key: 'impact', header: 'Impact', cell: (r) => <span className="font-bold text-gray-900">{r.impact}</span> },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold">{r.count}</span> },
            ]}
            data={dependencyImpact}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Operational Readiness">
          <div className="flex items-center justify-center p-1">
            <ReusableDonutChart data={charts.operationalReadiness} totalValue="88%" totalLabel="Ready" height={120} />
          </div>
        </SectionCard>

        <SectionCard title="Administrative Routines">
          <DataTable
            columns={[
              { key: 'routineName', header: 'Category', cell: (r) => <span className="font-bold text-gray-900">{r.routineName}</span> },
              { key: 'totalRoutines', header: 'Total', align: 'center' },
              { key: 'automated', header: 'Auto', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.automated}</span> },
              { key: 'manual', header: 'Manual', align: 'center' },
              { key: 'overdue', header: 'Overdue', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.overdue}</span> },
            ]}
            data={adminRoutines}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Cache & Index Maintenance">
          <DataTable
            columns={[
              { key: 'name', header: 'Name', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.name}</span> },
              { key: 'successful', header: 'Result', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.successful}</span> },
              { key: 'lastRun', header: 'Last Run', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastRun}</span> },
              { key: 'nextRun', header: 'Next Run', cell: (r) => <span className="text-[9px] text-gray-500">{r.nextRun}</span> },
            ]}
            data={cacheIndex}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Data & Integration Synchronization">
          <DataTable
            columns={[
              { key: 'name', header: 'Name', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.name}</span> },
              { key: 'successful', header: 'Count', align: 'center', cell: (r) => <span className="font-bold">{r.successful}</span> },
              { key: 'lastRun', header: 'Last Run', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastRun}</span> },
              { key: 'nextRun', header: 'Next Run', cell: (r) => <span className="text-[9px] text-gray-500">{r.nextRun}</span> },
            ]}
            data={dataSync}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Operational Risks">
          <DataTable
            columns={[
              { key: 'domain', header: 'Domain', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.domain}</span> },
              { key: 'impact', header: 'Impact', cell: (r) => <StatusBadge status={r.impact} size="xs" /> },
              { key: 'severity', header: 'Severity', cell: (r) => <StatusBadge status={r.severity} size="xs" /> },
            ]}
            data={operationalRisks}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Operations Health Matrix">
          <DataTable
            columns={[
              { key: 'domain', header: 'Domain', cell: (r) => <span className="font-bold text-gray-900">{r.domain}</span> },
              { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}</span> },
              { key: 'trend', header: 'Trend', align: 'center', cell: (r) => <span className={`font-bold ${r.trend.startsWith('+') ? 'text-emerald-600' : r.trend === '0' ? 'text-gray-500' : 'text-rose-600'}`}>{r.trend}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={healthMatrix}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Recent Maintenance & Operations Activity">
          <DataTable
            columns={[
              { key: 'time', header: 'Time', cell: (r) => <span className="text-[9px] text-gray-500 whitespace-nowrap">{r.time}</span> },
              { key: 'jobName', header: 'Job / Name', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.jobName}</span> },
              { key: 'event', header: 'Event', cell: (r) => <span className="font-semibold text-gray-700">{r.event}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'by', header: 'By' },
            ]}
            data={recentActivity}
            density="compact"
          />
        </SectionCard>
      </div>
    </div>
  );
}
export default MaintenanceOverviewTab;
