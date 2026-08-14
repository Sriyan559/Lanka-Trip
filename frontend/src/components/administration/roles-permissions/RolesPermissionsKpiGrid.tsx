import React from 'react';
import {
  Shield,
  ShieldCheck,
  Key,
  FolderLock,
  Layers,
  FileCode,
  ShieldAlert,
  AlertTriangle,
  Clock,
  Flame,
} from 'lucide-react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';

interface RolesPermissionsKpiGridProps {
  kpis: {
    totalRoles: number;
    activeRoles: number;
    permissionSets: number;
    accessProfiles: number;
    scopeTemplates: number;
    assignmentRules: number;
    privilegedRoles: number;
    segregationConflicts: number;
    dueForReview: number;
    overPermissiveRoles: number;
    authHealthScore: number;
  };
  healthMetrics: { label: string; value: number }[];
}

export function RolesPermissionsKpiGrid({ kpis, healthMetrics }: RolesPermissionsKpiGridProps) {
  const cards = [
    { label: 'Total Roles', value: kpis.totalRoles, trend: '-5 vs last 30 days', trendColor: 'text-gray-400', icon: Shield, iconColor: 'text-blue-600' },
    { label: 'Active Roles', value: kpis.activeRoles, trend: '-9 vs last 30 days', trendColor: 'text-gray-400', icon: ShieldCheck, iconColor: 'text-emerald-600' },
    { label: 'Permission Sets', value: kpis.permissionSets, trend: '+8 vs last 30 days', trendColor: 'text-emerald-600', icon: Key, iconColor: 'text-emerald-600' },
    { label: 'Access Profiles', value: kpis.accessProfiles, trend: '+4 vs last 30 days', trendColor: 'text-emerald-600', icon: FolderLock, iconColor: 'text-blue-600' },
    { label: 'Scope Templates', value: kpis.scopeTemplates, trend: '+2 vs last 30 days', trendColor: 'text-emerald-600', icon: Layers, iconColor: 'text-blue-600' },
    { label: 'Assignment Rules', value: kpis.assignmentRules, trend: '+1 vs last 30 days', trendColor: 'text-emerald-600', icon: FileCode, iconColor: 'text-rose-600' },
    { label: 'Privileged Roles', value: kpis.privilegedRoles, trend: 'No change', trendColor: 'text-gray-400', icon: ShieldAlert, iconColor: 'text-rose-600' },
    { label: 'Segregation Conflicts', value: kpis.segregationConflicts, trend: '-1 vs last 30 days', trendColor: 'text-emerald-600', icon: AlertTriangle, iconColor: 'text-amber-600' },
    { label: 'Due for Review', value: kpis.dueForReview, trend: '-3 vs last 30 days', trendColor: 'text-emerald-600', icon: Clock, iconColor: 'text-amber-600' },
    { label: 'Over-Permissive Roles', value: kpis.overPermissiveRoles, trend: 'No change', trendColor: 'text-gray-400', icon: Flame, iconColor: 'text-amber-600' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 xl:grid-cols-11 gap-2 mb-3">
      {/* 10 Standard Metric Cards */}
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between min-h-[72px]"
          >
            <div className="flex items-center justify-between gap-1 text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
              <span className="truncate">{c.label}</span>
              <Icon className={`w-3.5 h-3.5 ${c.iconColor} opacity-70 flex-shrink-0`} />
            </div>
            <div className="mt-1">
              <span className="text-lg font-extrabold text-gray-900 leading-none">
                {c.value}
              </span>
              <span className={`block text-[8px] font-medium ${c.trendColor} mt-0.5 truncate`}>
                {c.trend}
              </span>
            </div>
          </div>
        );
      })}

      {/* 11th Card: Authorization Health Gauge */}
      <div className="bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between min-h-[72px] col-span-2 sm:col-span-3 md:col-span-6 xl:col-span-1">
        <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider leading-none">
          Authorization Health
        </span>
        <div className="flex items-center justify-center my-0.5">
          <HealthScore score={kpis.authHealthScore} max={100} label="Excellent" size="sm" />
        </div>
      </div>
    </div>
  );
}
