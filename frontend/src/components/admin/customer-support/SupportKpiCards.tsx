'use client';

import React from 'react';
import {
  Headset,
  FilePlus,
  UserX,
  Clock,
  UserCheck,
  Building2,
  Truck,
  Landmark,
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
  Flame,
  CheckCircle2,
  Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SupportCaseMetricSummary } from '@/types/customerSupport';

interface SupportKpiCardsProps {
  metrics: SupportCaseMetricSummary | null;
  activeFilterKey?: string;
  onSelectFilter: (key: string, value: string) => void;
}

export function SupportKpiCards({
  metrics,
  activeFilterKey,
  onSelectFilter,
}: SupportKpiCardsProps) {
  if (!metrics) {
    return (
      <div className="flex gap-4 flex-wrap">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-slate-100 rounded-xl h-24 flex-1 min-w-[150px]"
          />
        ))}
      </div>
    );
  }

  const row1 = [
    {
      key: 'all',
      filterKey: 'status',
      filterVal: 'all',
      icon: Headset,
      iconColor: 'text-blue-600',
      label: 'Total Open Cases',
      value: metrics.totalOpenCases.toLocaleString(),
    },
    {
      key: 'new-today',
      filterKey: 'quickFilter',
      filterVal: 'new-today',
      icon: FilePlus,
      iconColor: 'text-green-600',
      label: 'New Cases Today',
      value: metrics.newCasesToday.toString(),
      badge: metrics.newCasesTodayTrendPercent ? `+${metrics.newCasesTodayTrendPercent}%` : undefined,
      badgePositive: true,
    },
    {
      key: 'unassigned',
      filterKey: 'assignedAgent',
      filterVal: 'unassigned',
      icon: UserX,
      iconColor: 'text-orange-600',
      label: 'Unassigned Cases',
      value: metrics.unassignedCases.toString(),
    },
    {
      key: 'in-progress',
      filterKey: 'status',
      filterVal: 'in-progress',
      icon: Clock,
      iconColor: 'text-sky-600',
      label: 'In Progress',
      value: metrics.inProgress.toString(),
    },
    {
      key: 'waiting-customer',
      filterKey: 'status',
      filterVal: 'waiting-for-customer',
      icon: UserCheck,
      iconColor: 'text-purple-600',
      label: 'Waiting for Customer',
      value: metrics.waitingForCustomer.toString(),
    },
    {
      key: 'waiting-supplier',
      filterKey: 'status',
      filterVal: 'waiting-for-supplier',
      icon: Building2,
      iconColor: 'text-amber-600',
      label: 'Waiting for Supplier',
      value: metrics.waitingForSupplier.toString(),
    },
    {
      key: 'waiting-logistics',
      filterKey: 'status',
      filterVal: 'waiting-for-logistics',
      icon: Truck,
      iconColor: 'text-teal-600',
      label: 'Waiting for Logistics',
      value: metrics.waitingForLogistics.toString(),
    },
  ];

  const row2 = [
    {
      key: 'waiting-finance',
      filterKey: 'status',
      filterVal: 'waiting-for-finance',
      icon: Landmark,
      iconColor: 'text-sky-600',
      label: 'Waiting for Finance',
      value: metrics.waitingForFinance.toString(),
    },
    {
      key: 'sla-at-risk',
      filterKey: 'sla',
      filterVal: 'at-risk',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      label: 'SLA At Risk',
      value: metrics.slaAtRisk.toString(),
      isHighlight: true,
    },
    {
      key: 'sla-breaches',
      filterKey: 'sla',
      filterVal: 'breached',
      icon: ShieldAlert,
      iconColor: 'text-primary-900',
      label: 'SLA Breaches',
      value: metrics.slaBreaches.toString(),
      isHighlight: true,
    },
    {
      key: 'escalated-cases',
      filterKey: 'status',
      filterVal: 'escalated',
      icon: TrendingUp,
      iconColor: 'text-purple-600',
      label: 'Escalated Cases',
      value: metrics.escalatedCases.toString(),
    },
    {
      key: 'safety-complaints',
      filterKey: 'quickFilter',
      filterVal: 'safety-complaint',
      icon: Flame,
      iconColor: 'text-primary-900',
      label: 'Safety Complaints',
      value: metrics.safetyComplaints.toString(),
      isHighlight: true,
    },
    {
      key: 'resolved-today',
      filterKey: 'status',
      filterVal: 'resolved',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
      label: 'Resolved Today',
      value: metrics.resolvedToday.toString(),
    },
    {
      key: 'customer-satisfaction',
      filterKey: 'sentiment',
      filterVal: 'positive',
      icon: Star,
      iconColor: 'text-green-600',
      label: 'Customer Satisfaction',
      value: `${metrics.customerSatisfaction}%`,
    },
  ];

  interface KpiCardItemConfig {
    key: string;
    filterKey: string;
    filterVal: string;
    icon: LucideIcon;
    iconColor: string;
    label: string;
    value?: string;
    badge?: string;
    badgePositive?: boolean;
    isHighlight?: boolean;
  }

  const renderCard = (card: KpiCardItemConfig) => {
    const Icon = card.icon;
    const isActive = activeFilterKey === card.key || activeFilterKey === card.filterVal;

    return (
      <button
        key={card.key}
        type="button"
        onClick={() => onSelectFilter(card.filterKey, card.filterVal)}
        className={`flex-1 min-w-[150px] p-4 rounded-xl border bg-white flex flex-col items-start gap-1 text-left transition-all hover:-translate-y-1 hover:shadow-md ${
          isActive
            ? 'border-primary-900 ring-1 ring-primary-900 shadow-sm'
            : card.isHighlight
            ? 'border-red-200 hover:border-red-300'
            : 'border-line hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between w-full mb-1">
          <div className={`${card.iconColor}`}>
            <Icon size={18} strokeWidth={2} />
          </div>
          {card.badge && (
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-md">
              <TrendingUp size={10} />
              {card.badge}
            </div>
          )}
        </div>
        <div className={`text-2xl font-bold tracking-tight ${card.isHighlight ? 'text-red-700' : 'text-ink'}`}>
          {card.value}
        </div>
        <div className={`text-[11px] font-medium uppercase tracking-wider ${card.isHighlight ? 'text-red-600' : 'text-slate-500'}`}>
          {card.label}
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">{row1.map(renderCard)}</div>
      <div className="flex flex-row gap-4">{row2.map(renderCard)}</div>
    </div>
  );
}
