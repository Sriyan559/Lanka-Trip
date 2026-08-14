import React from 'react';
import { ReusableSparkline } from '@/components/shared/Chart/ReusableSparkline';
import {
  Server,
  Key,
  CheckCircle,
  Layers,
  Clock,
  AlertTriangle,
  ShieldAlert,
  GitCompare,
  Activity,
  Lock,
  Globe,
  Monitor,
  Smartphone,
  Eye,
  FileWarning
} from 'lucide-react';

interface SystemConfigurationKpiGridProps {
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
}

export function SystemConfigurationKpiGrid({ kpis }: SystemConfigurationKpiGridProps) {
  const row1 = [
    { label: 'Configuration Domains', key: 'configurationDomains', icon: Server, color: 'text-rose-600' },
    { label: 'Configuration Keys', key: 'configurationKeys', icon: Key, color: 'text-blue-600' },
    { label: 'Active Configurations', key: 'activeConfigurations', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Scoped Overrides', key: 'scopedOverrides', icon: Layers, color: 'text-emerald-600' },
    { label: 'Pending Changes', key: 'pendingChanges', icon: Clock, color: 'text-amber-600' },
    { label: 'Validation Warnings', key: 'validationWarnings', icon: AlertTriangle, color: 'text-amber-600' },
    { label: 'Critical Errors', key: 'criticalErrors', icon: ShieldAlert, color: 'text-rose-600' },
    { label: 'Drift Findings', key: 'driftFindings', icon: GitCompare, color: 'text-purple-600' },
    { label: 'Ownership Gaps', key: 'ownershipGaps', icon: AlertTriangle, color: 'text-amber-600' },
    { label: 'Configuration Health', key: 'configurationHealth', icon: Activity, color: 'text-emerald-600' },
  ];

  const row2 = [
    { label: 'Platform Defaults', key: 'platformDefaults', icon: Server, color: 'text-indigo-600' },
    { label: 'Tenant Overrides', key: 'tenantOverrides', icon: Globe, color: 'text-blue-600' },
    { label: 'Ecosystem Overrides', key: 'ecosystemOverrides', icon: Layers, color: 'text-blue-600' },
    { label: 'BU Overrides', key: 'buOverrides', icon: Monitor, color: 'text-cyan-600' },
    { label: 'Channel Overrides', key: 'channelOverrides', icon: Smartphone, color: 'text-teal-600' },
    { label: 'Environment Overrides', key: 'environmentOverrides', icon: Layers, color: 'text-blue-600' },
    { label: 'Restricted Values', key: 'restrictedValues', icon: Lock, color: 'text-rose-600' },
    { label: 'Secrets Referenced', key: 'secretsReferenced', icon: Key, color: 'text-emerald-600' },
    { label: 'Reviews Due', key: 'reviewsDue', icon: Eye, color: 'text-purple-600' },
    { label: 'Configuration Exceptions', key: 'configurationExceptions', icon: FileWarning, color: 'text-purple-600' },
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
export default SystemConfigurationKpiGrid;
