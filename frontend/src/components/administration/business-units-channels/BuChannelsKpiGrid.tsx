import React from 'react';
import { ReusableSparkline } from '@/components/shared/Chart/ReusableSparkline';
import {
  Building2,
  Share2,
  Layers,
  Shield,
  ShieldAlert,
  GitCommit,
  CheckCircle,
  Activity,
  AlertTriangle,
  Clock,
  MapPin,
  Map,
} from 'lucide-react';

interface BuChannelsKpiGridProps {
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
}

export function BuChannelsKpiGrid({ kpis }: BuChannelsKpiGridProps) {
  const row1 = [
    { label: 'Business Units', key: 'businessUnits', icon: Building2, color: 'text-[#741d35]' },
    { label: 'Active Business Units', key: 'activeBusinessUnits', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Channels', key: 'channels', icon: Share2, color: 'text-indigo-600' },
    { label: 'Active Channels', key: 'activeChannels', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Operating Scopes', key: 'operatingScopes', icon: Layers, color: 'text-blue-600' },
    { label: 'Restricted Scopes', key: 'restrictedScopes', icon: ShieldAlert, color: 'text-rose-600' },
    { label: 'Ownership Gaps', key: 'ownershipGaps', icon: AlertTriangle, color: 'text-amber-600' },
    { label: 'Scope Conflicts', key: 'scopeConflicts', icon: ShieldAlert, color: 'text-rose-600' },
    { label: 'Pending Changes', key: 'pendingChanges', icon: Clock, color: 'text-amber-600' },
    { label: 'Operating Health', key: 'operatingHealth', icon: Activity, color: 'text-emerald-600' },
  ];

  const row2 = [
    { label: 'Shared Channels', key: 'sharedChannels', icon: Share2, color: 'text-indigo-600' },
    { label: 'Direct Scopes', key: 'directScopes', icon: Shield, color: 'text-blue-600' },
    { label: 'Inherited Scopes', key: 'inheritedScopes', icon: Layers, color: 'text-emerald-600' },
    { label: 'Country Assignments', key: 'countryAssignments', icon: MapPin, color: 'text-teal-600' },
    { label: 'Region Assignments', key: 'regionAssignments', icon: Map, color: 'text-cyan-600' },
    { label: 'Production Enabled Units', key: 'productionEnabledUnits', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Pilot Units', key: 'pilotUnits', icon: Clock, color: 'text-amber-600' },
    { label: 'Inactive Units', key: 'inactiveUnits', icon: AlertTriangle, color: 'text-gray-500' },
    { label: 'Reviews Due', key: 'reviewsDue', icon: Clock, color: 'text-rose-600' },
    { label: 'Operating Exceptions', key: 'operatingExceptions', icon: AlertTriangle, color: 'text-rose-600' },
  ];

  const renderRow = (items: typeof row1) => (
    <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-2">
      {items.map((c, idx) => {
        const Icon = c.icon;
        const data = kpis[c.key] || { value: 0, trend: 'No change', trendDirection: 'up', sparkline: [] };
        const isUpTrend = data.trendDirection === 'up';

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
                <span
                  className={`block text-[8px] font-semibold mt-0.5 truncate ${
                    isUpTrend ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {data.trend}
                </span>
              </div>
              {data.sparkline && data.sparkline.length > 0 && (
                <div className="mb-0.5">
                  <ReusableSparkline
                    data={data.sparkline}
                    color={isUpTrend ? '#10b981' : '#f43f5e'}
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
export default BuChannelsKpiGrid;
