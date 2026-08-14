import React from 'react';
import { ReusableSparkline } from '@/components/shared/Chart/ReusableSparkline';
import {
  GitFork,
  Activity,
  Layers,
  Clock,
  AlertOctagon,
  Ban,
  TrendingUp,
  UserCheck,
  Eye,
  ShieldCheck,
  FileCheck,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Users,
  AlertTriangle,
  CalendarClock
} from 'lucide-react';

interface WorkflowKpiGridProps {
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
}

export function WorkflowKpiGrid({ kpis }: WorkflowKpiGridProps) {
  const row1 = [
    { label: 'Workflow Definitions', key: 'workflowDefinitions', icon: GitFork, color: 'text-blue-600' },
    { label: 'Active Workflows', key: 'activeWorkflows', icon: Activity, color: 'text-emerald-600' },
    { label: 'Active Instances', key: 'activeInstances', icon: Layers, color: 'text-indigo-600' },
    { label: 'Pending Approval', key: 'pendingApproval', icon: Clock, color: 'text-amber-600' },
    { label: 'SLA Breaches', key: 'slaBreaches', icon: AlertOctagon, color: 'text-rose-600' },
    { label: 'Blocked Workflows', key: 'blockedWorkflows', icon: Ban, color: 'text-rose-600' },
    { label: 'Escalated', key: 'escalated', icon: TrendingUp, color: 'text-amber-600' },
    { label: 'Delegations', key: 'delegations', icon: UserCheck, color: 'text-teal-600' },
    { label: 'Reviews Due', key: 'reviewsDue', icon: Eye, color: 'text-purple-600' },
    { label: 'Workflow Health', key: 'workflowHealth', icon: ShieldCheck, color: 'text-emerald-600' },
  ];

  const row2 = [
    { label: 'Approval Policies', key: 'approvalPolicies', icon: FileCheck, color: 'text-indigo-600' },
    { label: 'Workflow Versions', key: 'workflowVersions', icon: GitCommit, color: 'text-blue-600' },
    { label: 'Stages', key: 'stages', icon: Layers, color: 'text-teal-600' },
    { label: 'Routing Rules', key: 'routingRules', icon: GitPullRequest, color: 'text-purple-600' },
    { label: 'Auto-Approved (Controlled)', key: 'autoApproved', icon: CheckCircle2, color: 'text-emerald-600' },
    { label: 'Rejected', key: 'rejected', icon: XCircle, color: 'text-rose-600' },
    { label: 'Request Changes', key: 'requestChanges', icon: RotateCcw, color: 'text-amber-600' },
    { label: 'Delegations (Temporary)', key: 'delegationsTemp', icon: Users, color: 'text-blue-600' },
    { label: 'Workflow Exceptions', key: 'workflowExceptions', icon: AlertTriangle, color: 'text-amber-600' },
    { label: 'Overdue Tasks', key: 'overdueTasks', icon: CalendarClock, color: 'text-rose-600' },
  ];

  const renderRow = (items: typeof row1) => (
    <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-2">
      {items.map((c, idx) => {
        const Icon = c.icon;
        const data = kpis[c.key] || { value: 0, trend: '0%', trendDirection: 'up', sparkline: [] };
        const isUpTrend = data.trendDirection === 'up';
        const trendColor = isUpTrend ? 'text-emerald-600' : 'text-rose-600';
        const sparklineColor = isUpTrend ? '#10b981' : '#f43f5e';

        return (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between min-h-[70px]"
          >
            <div className="flex items-center justify-between gap-1 text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
              <span className="truncate">{c.label}</span>
              <Icon className={`w-3.5 h-3.5 ${c.color} opacity-75 flex-shrink-0`} />
            </div>
            <div className="mt-1 flex items-end justify-between">
              <div>
                <span className="text-base font-extrabold text-gray-900 leading-none">
                  {data.value}
                </span>
                {data.trend !== '0%' && (
                  <span
                    className={`block text-[8px] font-semibold mt-0.5 truncate ${trendColor}`}
                  >
                    {isUpTrend ? '↑' : '↓'} {data.trend}
                  </span>
                )}
              </div>
              {data.sparkline && data.sparkline.length > 0 && (
                <div className="mb-0.5">
                  <ReusableSparkline
                    data={data.sparkline}
                    color={sparklineColor}
                    width={40}
                    height={12}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col mb-3">
      {renderRow(row1)}
      {renderRow(row2)}
    </div>
  );
}
export default WorkflowKpiGrid;
