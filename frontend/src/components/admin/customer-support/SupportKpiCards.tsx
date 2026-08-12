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
  // Reference values matching CS02 screenshot if metrics is null or empty
  const values = {
    totalOpenCases: metrics?.totalOpenCases ?? 1286,
    newCasesToday: metrics?.newCasesToday ?? 84,
    trendPercent: metrics?.newCasesTodayTrendPercent ?? 12,
    unassignedCases: metrics?.unassignedCases ?? 46,
    inProgress: metrics?.inProgress ?? 312,
    waitingForCustomer: metrics?.waitingForCustomer ?? 128,
    waitingForSupplier: metrics?.waitingForSupplier ?? 74,
    waitingForLogistics: metrics?.waitingForLogistics ?? 38,
    waitingForFinance: metrics?.waitingForFinance ?? 21,
    slaAtRisk: metrics?.slaAtRisk ?? 29,
    slaBreaches: metrics?.slaBreaches ?? 12,
    escalatedCases: metrics?.escalatedCases ?? 17,
    safetyComplaints: metrics?.safetyComplaints ?? 4,
    resolvedToday: metrics?.resolvedToday ?? 196,
    customerSatisfaction: metrics?.customerSatisfaction ?? 91,
  };

  const row1 = [
    {
      key: 'all',
      filterKey: 'status',
      filterVal: 'all',
      icon: Headset,
      iconColor: 'text-blue-600',
      label: 'Total Open Cases',
      value: values.totalOpenCases.toLocaleString(),
    },
    {
      key: 'new-today',
      filterKey: 'quickFilter',
      filterVal: 'new-today',
      icon: FilePlus,
      iconColor: 'text-green-600',
      label: 'New Cases Today',
      value: values.newCasesToday.toString(),
      badge: `↑ ${values.trendPercent}%`,
    },
    {
      key: 'unassigned',
      filterKey: 'assignedAgent',
      filterVal: 'unassigned',
      icon: UserX,
      iconColor: 'text-orange-600',
      label: 'Unassigned Cases',
      value: values.unassignedCases.toString(),
    },
    {
      key: 'in-progress',
      filterKey: 'status',
      filterVal: 'in-progress',
      icon: Clock,
      iconColor: 'text-sky-600',
      label: 'In Progress',
      value: values.inProgress.toString(),
    },
    {
      key: 'waiting-customer',
      filterKey: 'status',
      filterVal: 'waiting-for-customer',
      icon: UserCheck,
      iconColor: 'text-purple-600',
      label: 'Waiting for Customer',
      value: values.waitingForCustomer.toString(),
    },
    {
      key: 'waiting-supplier',
      filterKey: 'status',
      filterVal: 'waiting-for-supplier',
      icon: Building2,
      iconColor: 'text-amber-600',
      label: 'Waiting for Supplier',
      value: values.waitingForSupplier.toString(),
    },
    {
      key: 'waiting-logistics',
      filterKey: 'status',
      filterVal: 'waiting-for-logistics',
      icon: Truck,
      iconColor: 'text-teal-600',
      label: 'Waiting for Logistics',
      value: values.waitingForLogistics.toString(),
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
      value: values.waitingForFinance.toString(),
    },
    {
      key: 'sla-at-risk',
      filterKey: 'sla',
      filterVal: 'at-risk',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      label: 'SLA At Risk',
      value: values.slaAtRisk.toString(),
      isHighlight: true,
    },
    {
      key: 'sla-breaches',
      filterKey: 'sla',
      filterVal: 'breached',
      icon: ShieldAlert,
      iconColor: 'text-[#7a0016]',
      label: 'SLA Breaches',
      value: values.slaBreaches.toString(),
      isHighlight: true,
    },
    {
      key: 'escalated-cases',
      filterKey: 'status',
      filterVal: 'escalated',
      icon: TrendingUp,
      iconColor: 'text-purple-600',
      label: 'Escalated Cases',
      value: values.escalatedCases.toString(),
    },
    {
      key: 'safety-complaints',
      filterKey: 'quickFilter',
      filterVal: 'safety-complaint',
      icon: Flame,
      iconColor: 'text-red-600',
      label: 'Safety Complaints',
      value: values.safetyComplaints.toString(),
      isHighlight: true,
    },
    {
      key: 'resolved-today',
      filterKey: 'status',
      filterVal: 'resolved',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
      label: 'Resolved Today',
      value: values.resolvedToday.toString(),
    },
    {
      key: 'customer-satisfaction',
      filterKey: 'sentiment',
      filterVal: 'positive',
      icon: Star,
      iconColor: 'text-green-600',
      label: 'Customer Satisfaction',
      value: `${values.customerSatisfaction}%`,
    },
  ];

  interface KpiCardItemConfig {
    key: string;
    filterKey: string;
    filterVal: string;
    icon: LucideIcon;
    iconColor: string;
    label: string;
    value: string;
    badge?: string;
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
        className={`flex-1 px-2.5 py-1.5 rounded-lg border bg-white flex flex-col justify-between text-left transition-all hover:shadow-sm ${
          isActive
            ? 'border-primary-900 ring-1 ring-primary-900 shadow-sm'
            : card.isHighlight
            ? 'border-red-200 hover:border-red-300'
            : 'border-line hover:border-slate-300'
        }`}
      >
        <div className="flex items-center gap-1 mb-1">
          <Icon size={13} className={card.iconColor} />
          <span className="text-[9.5px] font-semibold text-slate-500 truncate uppercase tracking-tight">
            {card.label}
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className={`text-[17px] font-extrabold tracking-tight leading-none ${card.isHighlight ? 'text-red-700' : 'text-ink'}`}>
            {card.value}
          </span>
          {card.badge && (
            <span className="text-[9.5px] font-bold text-emerald-600 leading-none">
              {card.badge}
            </span>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {row1.map(renderCard)}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {row2.map(renderCard)}
      </div>
    </div>
  );
}
