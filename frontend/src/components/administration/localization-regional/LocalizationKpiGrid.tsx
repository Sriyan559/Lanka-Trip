import React from 'react';
import { ReusableSparkline } from '@/components/shared/Chart/ReusableSparkline';
import {
  Globe,
  MapPin,
  MessageSquare,
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  FileText,
  FileWarning
} from 'lucide-react';

interface LocalizationKpiGridProps {
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
}

export function LocalizationKpiGrid({ kpis }: LocalizationKpiGridProps) {
  const items = [
    { label: 'Supported Countries', key: 'supportedCountries', icon: Globe, color: 'text-blue-600' },
    { label: 'Active Locales', key: 'activeLocales', icon: MapPin, color: 'text-indigo-600' },
    { label: 'Languages', key: 'languages', icon: MessageSquare, color: 'text-purple-600' },
    { label: 'Currencies', key: 'currencies', icon: DollarSign, color: 'text-emerald-600' },
    { label: 'Timezones', key: 'timezones', icon: Clock, color: 'text-cyan-600' },
    { label: 'Translation Coverage', key: 'translationCoverage', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'FX Freshness', key: 'fxFreshness', icon: TrendingUp, color: 'text-emerald-600' },
    { label: 'Localization Gaps', key: 'localizationGaps', icon: AlertTriangle, color: 'text-rose-600' },
    { label: 'Translation Gaps', key: 'translationGaps', icon: FileText, color: 'text-amber-600' },
    { label: 'Localization Exceptions', key: 'localizationExceptions', icon: FileWarning, color: 'text-rose-600' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-3">
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
                {data.trend !== '0%' && data.trend !== 'Current' && (
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
}
export default LocalizationKpiGrid;
