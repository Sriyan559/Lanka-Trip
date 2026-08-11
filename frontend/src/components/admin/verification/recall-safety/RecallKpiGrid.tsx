import React from 'react';
import {
  ShieldAlert, RefreshCw, AlertTriangle, Package, FlaskConical,
  Box, ShoppingCart, Users, Truck, Bell, RotateCcw, Clock,
  TrendingUp, TrendingDown, Minus,
  type LucideIcon,
} from 'lucide-react';
import {
  RECALL_KPIS,
  type RecallKpi,
} from './recallSafetyMock';

// ── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  ShieldAlert,
  RefreshCw,
  AlertTriangle,
  Package,
  Flask: FlaskConical,
  Box,
  ShoppingCart,
  Users,
  Truck,
  Bell,
  RotateCcw,
  Clock,
};

// ── Tone styles ───────────────────────────────────────────────────────────────
const TONE_ICON: Record<string, string> = {
  critical: 'bg-red-50 text-red-600',
  warning:  'bg-amber-50 text-amber-600',
  success:  'bg-green-50 text-green-600',
  info:     'bg-blue-50 text-blue-600',
  neutral:  'bg-gray-100 text-gray-500',
};

// ── Single KPI card ───────────────────────────────────────────────────────────
function RecallKpiCard({ kpi, liveValue }: { kpi: RecallKpi; liveValue?: string | number }) {
  const Icon = ICON_MAP[kpi.iconName] ?? ShieldAlert;
  const iconCls = TONE_ICON[kpi.status] ?? TONE_ICON.neutral;
  const displayValue = liveValue ?? kpi.value ?? 0;

  const TrendIcon =
    kpi.trendDirection === 'up'   ? TrendingUp :
    kpi.trendDirection === 'down' ? TrendingDown :
    Minus;

  const trendColor =
    kpi.trendDirection === 'up'   ? 'text-red-600' :
    kpi.trendDirection === 'down' ? 'text-green-600' :
    'text-gray-400';

  return (
    <div className="flex flex-col justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm min-h-[88px]">
      {/* Top */}
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-[10px] font-bold text-gray-400 flex-shrink-0">
            {String(kpi.id).padStart(2, '0')}
          </span>
          <span className="text-[11px] font-medium text-gray-600 leading-tight truncate">
            {kpi.label}
          </span>
        </div>
        <div className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 ml-1 ${iconCls}`}>
          <Icon size={12} strokeWidth={2} />
        </div>
      </div>
      {/* Bottom */}
      <div className="flex items-baseline justify-between">
        <span className="text-[22px] font-bold text-gray-900 leading-none">
          {displayValue}
        </span>
        <span className={`flex items-center gap-0.5 text-[10px] font-bold ${trendColor}`}>
          <TrendIcon size={10} strokeWidth={2.5} />
          {kpi.trend}
        </span>
      </div>
    </div>
  );
}

// ── 12-card grid ──────────────────────────────────────────────────────────────
interface RecallKpiGridProps {
  liveKpis?: Record<string, string | number>;
}

export function RecallKpiGrid({ liveKpis = {} }: RecallKpiGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
      {RECALL_KPIS.map((kpi) => (
        <RecallKpiCard
          key={kpi.id}
          kpi={kpi}
          liveValue={liveKpis[`kpi_${kpi.id}`]}
        />
      ))}
    </div>
  );
}
