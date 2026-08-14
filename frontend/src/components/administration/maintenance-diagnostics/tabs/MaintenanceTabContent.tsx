'use client';

import React from 'react';
import { MaintenanceDiagnosticsFullData, SystemJobRecord } from '@/lib/administration/maintenance-diagnostics/maintenance.types';
import { MaintenanceOverviewTab } from './MaintenanceOverviewTab';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';

interface MaintenanceTabContentProps {
  activeTab: string;
  data: MaintenanceDiagnosticsFullData;
  selectedJobItem: SystemJobRecord;
  onSelectJobItem: (item: SystemJobRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function MaintenanceTabContent({
  activeTab,
  data,
  selectedJobItem,
  onSelectJobItem,
  onNavigateTab,
}: MaintenanceTabContentProps) {
  switch (activeTab) {
    case 'overview':
      return (
        <MaintenanceOverviewTab
          data={data}
          selectedJobItem={selectedJobItem}
          onSelectJobItem={onSelectJobItem}
          onNavigateTab={onNavigateTab}
        />
      );

    case 'system-jobs':
      return (
        <SectionCard title="System Job Registry">
          <DataTable
            columns={[
              { key: 'jobName', header: 'Job Name', cell: (r) => <span className="font-bold text-gray-900">{r.jobName}</span> },
              { key: 'service', header: 'Service' },
              { key: 'type', header: 'Type' },
              { key: 'schedule', header: 'Schedule', cell: (r) => <span className="font-mono text-[9px]">{r.schedule}</span> },
              { key: 'lifecycle', header: 'Lifecycle', cell: (r) => <StatusBadge status={r.lifecycle} size="xs" /> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'successRate', header: 'Success Rate', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.successRate}</span> },
              { key: 'avgDuration', header: 'Avg Duration', align: 'center' },
              { key: 'nextRun', header: 'Next Run', cell: (r) => <span className="text-[9px] text-gray-500">{r.nextRun}</span> },
            ]}
            data={data.systemJobs}
            density="compact"
          />
        </SectionCard>
      );

    case 'queues':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Retry Queue">
            <DataTable
              columns={[
                { key: 'priority', header: 'Priority', cell: (r) => <span className="font-bold text-gray-900">{r.priority}</span> },
                { key: 'total', header: 'Total', align: 'center' },
                { key: 'maxRetries', header: 'Max Retries', align: 'center' },
                { key: 'delay', header: 'Delay' },
              ]}
              data={data.retryQueue}
              density="compact"
            />
          </SectionCard>

          <SectionCard title="Dead-Letter Jobs">
            <DataTable
              columns={[
                { key: 'jobName', header: 'Job Name', cell: (r) => <span className="font-bold text-gray-900">{r.jobName}</span> },
                { key: 'priority', header: 'Priority', cell: (r) => <StatusBadge status={r.priority} size="xs" /> },
                { key: 'age', header: 'Age' },
              ]}
              data={data.deadLetterJobs}
              density="compact"
            />
          </SectionCard>
        </div>
      );

    case 'services':
      return (
        <SectionCard title="Platform Service Registry">
          <DataTable
            columns={[
              { key: 'serviceName', header: 'Service', cell: (r) => <span className="font-bold text-gray-900">{r.serviceName}</span> },
              { key: 'total', header: 'Total', align: 'center' },
              { key: 'enabled', header: 'Enabled', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.enabled}</span> },
              { key: 'disabled', header: 'Disabled', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.disabled}</span> },
              { key: 'unknown', header: 'Unknown', align: 'center', cell: (r) => <span className="font-bold text-gray-500">{r.unknown}</span> },
            ]}
            data={data.platformServices}
            density="compact"
          />
        </SectionCard>
      );

    case 'health-diagnostics':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Operational Health Checks">
            <DataTable
              columns={[
                { key: 'checkName', header: 'Check', cell: (r) => <span className="font-bold text-gray-900">{r.checkName}</span> },
                { key: 'totalChecks', header: 'Total', align: 'center' },
                { key: 'passing', header: 'Passing', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.passing}</span> },
                { key: 'warning', header: 'Warning', align: 'center', cell: (r) => <span className="font-bold text-amber-700">{r.warning}</span> },
                { key: 'failing', header: 'Failing', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.failing}</span> },
              ]}
              data={data.healthChecks}
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
                { key: 'info', header: 'Info', align: 'center' },
              ]}
              data={data.diagnosticOverview}
              density="compact"
            />
          </SectionCard>
        </div>
      );

    case 'maintenance':
      return (
        <SectionCard title="Maintenance Windows">
          <DataTable
            columns={[
              { key: 'windowName', header: 'Window', cell: (r) => <span className="font-bold text-gray-900">{r.windowName}</span> },
              { key: 'type', header: 'Type' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'scheduled', header: 'Scheduled' },
              { key: 'duration', header: 'Duration', align: 'right' },
            ]}
            data={data.maintenanceWindows}
            density="compact"
          />
        </SectionCard>
      );

    case 'dependencies':
      return (
        <SectionCard title="Operational Dependency Registry">
          <DataTable
            columns={[
              { key: 'dependencyName', header: 'Dependency', cell: (r) => <span className="font-bold text-gray-900">{r.dependencyName}</span> },
              { key: 'type', header: 'Type' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'responseTime', header: 'Response Time', align: 'right', cell: (r) => <span className="font-bold text-gray-800">{r.responseTime}</span> },
              { key: 'sla', header: 'SLA', align: 'right' },
            ]}
            data={data.dependencies}
            density="compact"
          />
        </SectionCard>
      );

    case 'audit':
    case 'activity':
      return (
        <SectionCard title="Recent Maintenance & Operations Activity">
          <DataTable
            columns={[
              { key: 'time', header: 'Time', cell: (r) => <span className="text-[9px] text-gray-500">{r.time}</span> },
              { key: 'jobName', header: 'Job / Name', cell: (r) => <span className="font-bold text-gray-900">{r.jobName}</span> },
              { key: 'event', header: 'Event', cell: (r) => <span className="font-semibold text-gray-700">{r.event}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'by', header: 'By' },
            ]}
            data={data.recentActivity}
            density="compact"
          />
        </SectionCard>
      );

    default:
      return (
        <div className="bg-white border border-gray-200 rounded p-8 text-center text-gray-500 text-sm shadow-2xs">
          The <span className="font-bold text-gray-700">{activeTab}</span> tab is under construction.
        </div>
      );
  }
}
export default MaintenanceTabContent;
