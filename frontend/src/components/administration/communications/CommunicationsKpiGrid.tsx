import React from 'react';
import { ReusableSparkline } from '@/components/shared/Chart/ReusableSparkline';
import {
  FileText,
  Sliders,
  Server,
  Radio,
  Send,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  FileWarning,
  Activity,
  Mail,
  MessageSquare,
  Smartphone,
  AppWindow,
  Globe,
  Languages,
  GitBranch,
  Eye,
  ShieldAlert
} from 'lucide-react';

interface CommunicationsKpiGridProps {
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
}

export function CommunicationsKpiGrid({ kpis }: CommunicationsKpiGridProps) {
  const row1 = [
    { label: 'Active Templates', key: 'activeTemplates', icon: FileText, color: 'text-rose-600' },
    { label: 'Notification Rules', key: 'notificationRules', icon: Sliders, color: 'text-blue-600' },
    { label: 'Providers', key: 'providers', icon: Server, color: 'text-indigo-600' },
    { label: 'Active Channels', key: 'activeChannels', icon: Radio, color: 'text-teal-600' },
    { label: 'Deliveries (24H)', key: 'deliveries24h', icon: Send, color: 'text-blue-600' },
    { label: 'Delivery Success', key: 'deliverySuccess', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Failed Deliveries', key: 'failedDeliveries', icon: AlertTriangle, color: 'text-rose-600' },
    { label: 'Retry Queue', key: 'retryQueue', icon: RefreshCw, color: 'text-amber-600' },
    { label: 'Template Gaps', key: 'templateGaps', icon: FileWarning, color: 'text-amber-600' },
    { label: 'Communications Health', key: 'communicationsHealth', icon: Activity, color: 'text-emerald-600' },
  ];

  const row2 = [
    { label: 'Email Templates', key: 'emailTemplates', icon: Mail, color: 'text-blue-600' },
    { label: 'SMS Templates', key: 'smsTemplates', icon: MessageSquare, color: 'text-emerald-600' },
    { label: 'Push Templates', key: 'pushTemplates', icon: Smartphone, color: 'text-purple-600' },
    { label: 'In-App Templates', key: 'inAppTemplates', icon: AppWindow, color: 'text-cyan-600' },
    { label: 'Webhook Notifications', key: 'webhookNotifications', icon: Globe, color: 'text-indigo-600' },
    { label: 'Localized Variants', key: 'localizedVariants', icon: Languages, color: 'text-emerald-600' },
    { label: 'Fallback Routes', key: 'fallbackRoutes', icon: GitBranch, color: 'text-blue-600' },
    { label: 'Reviews Due', key: 'reviewsDue', icon: Eye, color: 'text-purple-600' },
    { label: 'Reviews Due', key: 'reviewsDue', icon: Eye, color: 'text-purple-600' },
    { label: 'Communication Exceptions', key: 'communicationExceptions', icon: ShieldAlert, color: 'text-rose-600' },
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
export default CommunicationsKpiGrid;
