import React from 'react';
import { ReusableSparkline } from '@/components/shared/Chart/ReusableSparkline';
import {
  ShieldCheck,
  Server,
  Users,
  CheckCircle,
  Activity,
  Lock,
  AlertTriangle,
  AlertOctagon,
  Shield,
  Smartphone,
  FileWarning,
  Laptop,
  Layers,
  Clock,
  Eye,
  Flame,
  FileText,
  ShieldAlert
} from 'lucide-react';

interface SecurityKpiGridProps {
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
}

export function SecurityKpiGrid({ kpis }: SecurityKpiGridProps) {
  const row1 = [
    { label: 'Active Authentication Policies', key: 'activePolicies', icon: ShieldCheck, color: 'text-blue-600' },
    { label: 'Authentication Providers', key: 'authProviders', icon: Server, color: 'text-indigo-600' },
    { label: 'SSO Managed Users', key: 'ssoUsers', icon: Users, color: 'text-teal-600' },
    { label: 'MFA Coverage', key: 'mfaCoverage', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Active Sessions', key: 'activeSessions', icon: Activity, color: 'text-blue-600' },
    { label: 'Privileged Sessions', key: 'privilegedSessions', icon: Lock, color: 'text-amber-600' },
    { label: 'Locked Accounts', key: 'lockedAccounts', icon: AlertTriangle, color: 'text-rose-600' },
    { label: 'High-Risk Sessions', key: 'highRiskSessions', icon: AlertOctagon, color: 'text-rose-600' },
    { label: 'Authentication Warnings', key: 'authWarnings', icon: FileWarning, color: 'text-amber-600' },
    { label: 'Security Health', key: 'securityHealth', icon: Shield, color: 'text-emerald-600' },
  ];

  const row2 = [
    { label: 'MFA Enrolled Users', key: 'mfaEnrolledUsers', icon: Smartphone, color: 'text-emerald-600' },
    { label: 'MFA Gaps', key: 'mfaGaps', icon: FileWarning, color: 'text-amber-600' },
    { label: 'Trusted Devices', key: 'trustedDevices', icon: Laptop, color: 'text-indigo-600' },
    { label: 'Step-Up Policies', key: 'stepUpPolicies', icon: Layers, color: 'text-blue-600' },
    { label: 'Session Policies', key: 'sessionPolicies', icon: Clock, color: 'text-teal-600' },
    { label: 'Suspicious Login Signals', key: 'suspiciousLoginSignals', icon: Flame, color: 'text-rose-600' },
    { label: 'Break-Glass Accounts', key: 'breakGlassAccounts', icon: Lock, color: 'text-rose-600' },
    { label: 'Expiring Credentials', key: 'expiringCredentials', icon: FileText, color: 'text-amber-600' },
    { label: 'Reviews Due', key: 'reviewsDue', icon: Eye, color: 'text-purple-600' },
    { label: 'Security Exceptions', key: 'securityExceptions', icon: ShieldAlert, color: 'text-rose-600' },
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
export default SecurityKpiGrid;
