import React from 'react';
import { ReusableSparkline } from '@/components/shared/Chart/ReusableSparkline';
import {
  Database,
  Clock,
  Play,
  XCircle,
  RotateCcw,
  Layers,
  AlertTriangle,
  Wrench,
  HeartPulse,
  AlertOctagon,
  Network,
  Users,
  Activity,
  Flame,
  MessageSquareX,
  CheckCircle,
  Server,
  CalendarCheck,
  Calendar,
  Bell
} from 'lucide-react';

interface MaintenanceKpiGridProps {
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
}

export function MaintenanceKpiGrid({ kpis }: MaintenanceKpiGridProps) {
  const row1 = [
    { label: 'Registered Jobs', key: 'registeredJobs', icon: Database, color: 'text-blue-600' },
    { label: 'Active Scheduled Jobs', key: 'activeScheduledJobs', icon: Clock, color: 'text-indigo-600' },
    { label: 'Running Jobs', key: 'runningJobs', icon: Play, color: 'text-emerald-600' },
    { label: 'Failed Jobs — 24h', key: 'failedJobs24h', icon: XCircle, color: 'text-rose-600' },
    { label: 'Retry Queue', key: 'retryQueue', icon: RotateCcw, color: 'text-amber-600' },
    { label: 'Queue Backlog', key: 'queueBacklog', icon: Layers, color: 'text-orange-600' },
    { label: 'Degraded Services', key: 'degradedServices', icon: AlertTriangle, color: 'text-amber-600' },
    { label: 'Maintenance Windows', key: 'maintenanceWindows', icon: Wrench, color: 'text-blue-600' },
    { label: 'Health Checks', key: 'healthChecks', icon: HeartPulse, color: 'text-emerald-600' },
    { label: 'Failed Health Checks', key: 'failedHealthChecks', icon: AlertOctagon, color: 'text-rose-600' },
  ];

  const row2 = [
    { label: 'Dependency Warnings', key: 'dependencyWarnings', icon: Network, color: 'text-amber-600' },
    { label: 'Background Workers', key: 'backgroundWorkers', icon: Users, color: 'text-blue-600' },
    { label: 'Active Workers', key: 'activeWorkers', icon: Activity, color: 'text-emerald-600' },
    { label: 'Critical Jobs', key: 'criticalJobs', icon: Flame, color: 'text-rose-600' },
    { label: 'Dead-Letter Jobs', key: 'deadLetterJobs', icon: MessageSquareX, color: 'text-rose-600' },
    { label: 'SLA Compliance', key: 'slaCompliance', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Service Health', key: 'serviceHealth', icon: Server, color: 'text-emerald-600' },
    { label: 'Scheduled Maintenance', key: 'scheduledMaintenance', icon: CalendarCheck, color: 'text-blue-600' },
    { label: 'Maintenance Overdue', key: 'maintenanceOverdue', icon: Calendar, color: 'text-amber-600' },
    { label: 'System Alerts', key: 'systemAlerts', icon: Bell, color: 'text-rose-600' },
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
                <span className="text-base font-extrabold text-gray-900 leading-none">{data.value}</span>
                {data.trend !== '0%' && (
                  <span className={`block text-[8px] font-semibold mt-0.5 truncate ${trendColor}`}>
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
export default MaintenanceKpiGrid;
