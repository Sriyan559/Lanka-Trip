import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export type KpiTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface AuthenticityKpiCardProps {
  sequence: number;
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  tone?: KpiTone;
}

const TONE_STYLES: Record<KpiTone, { icon: string; badge: string; text: string }> = {
  neutral: { icon: 'bg-gray-100 text-gray-600', badge: 'text-gray-500', text: 'text-gray-900' },
  success: { icon: 'bg-green-50 text-green-600', badge: 'text-green-600', text: 'text-gray-900' },
  warning: { icon: 'bg-amber-50 text-amber-600', badge: 'text-amber-600', text: 'text-gray-900' },
  danger:  { icon: 'bg-red-50 text-red-600', badge: 'text-red-600', text: 'text-gray-900' },
  info:    { icon: 'bg-blue-50 text-blue-600', badge: 'text-blue-600', text: 'text-gray-900' },
};

export function AuthenticityKpiCard({
  sequence,
  title,
  value,
  trend,
  trendDirection = 'neutral',
  icon: Icon,
  tone = 'neutral',
}: AuthenticityKpiCardProps) {
  const styles = TONE_STYLES[tone];

  const TrendIcon =
    trendDirection === 'up' ? TrendingUp :
    trendDirection === 'down' ? TrendingDown :
    Minus;

  const trendColor =
    trendDirection === 'up' ? 'text-green-600' :
    trendDirection === 'down' ? 'text-red-600' :
    'text-gray-400';

  return (
    <div className="relative flex flex-col justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm h-full min-h-[88px]">
      {/* Top row: sequence + title + icon */}
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-[10px] font-bold text-gray-400 flex-shrink-0">{sequence}</span>
          <span className="text-[11px] font-medium text-gray-600 leading-tight truncate">{title}</span>
        </div>
        {Icon && (
          <div className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 ml-1 ${styles.icon}`}>
            <Icon size={12} strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Bottom row: value + trend */}
      <div className="flex items-baseline justify-between">
        <span className={`text-[22px] font-bold leading-none ${styles.text}`}>
          {value ?? 0}
        </span>
        {trend && (
          <span className={`flex items-center gap-0.5 text-[10px] font-bold ${trendColor}`}>
            <TrendIcon size={10} strokeWidth={2.5} />
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
