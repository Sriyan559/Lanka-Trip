import React from 'react';
import { ReusableSparkline } from '@/components/shared/Chart/ReusableSparkline';
import {
  Database,
  Layers,
  Tag,
  ShieldAlert,
  AlertOctagon,
  FileText,
  AlertTriangle,
  Users,
  Eye,
  ShieldCheck,
  UserCheck,
  Lock,
  Archive,
  Trash2,
  Globe,
  Share2,
  UserCheck2,
  FileWarning
} from 'lucide-react';

interface GovernanceKpiGridProps {
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
}

export function GovernanceKpiGrid({ kpis }: GovernanceKpiGridProps) {
  const row1 = [
    { label: 'Data Domains', key: 'dataDomains', icon: Database, color: 'text-blue-600' },
    { label: 'Registered Data Assets', key: 'registeredAssets', icon: Layers, color: 'text-indigo-600' },
    { label: 'Classified Assets', key: 'classifiedAssets', icon: Tag, color: 'text-teal-600' },
    { label: 'Sensitive Data Assets', key: 'sensitiveAssets', icon: ShieldAlert, color: 'text-amber-600' },
    { label: 'High-Risk Assets', key: 'highRiskAssets', icon: AlertOctagon, color: 'text-rose-600' },
    { label: 'Retention Policies', key: 'retentionPolicies', icon: FileText, color: 'text-blue-600' },
    { label: 'Retention Breaches', key: 'retentionBreaches', icon: AlertTriangle, color: 'text-rose-600' },
    { label: 'Ownership Gaps', key: 'ownershipGaps', icon: Users, color: 'text-amber-600' },
    { label: 'Reviews Due', key: 'reviewsDue', icon: Eye, color: 'text-purple-600' },
    { label: 'Data Governance Health', key: 'governanceHealth', icon: ShieldCheck, color: 'text-emerald-600' },
  ];

  const row2 = [
    { label: 'Personal Data Assets', key: 'personalDataAssets', icon: UserCheck, color: 'text-blue-600' },
    { label: 'Confidential Data Assets', key: 'confidentialAssets', icon: Lock, color: 'text-indigo-600' },
    { label: 'Restricted Data Assets', key: 'restrictedAssets', icon: Lock, color: 'text-purple-600' },
    { label: 'Archived Assets', key: 'archivedAssets', icon: Archive, color: 'text-teal-600' },
    { label: 'Disposal Due', key: 'disposalDue', icon: Trash2, color: 'text-amber-600' },
    { label: 'Residency Constraints', key: 'residencyConstraints', icon: Globe, color: 'text-blue-600' },
    { label: 'Sharing Agreements', key: 'sharingAgreements', icon: Share2, color: 'text-indigo-600' },
    { label: 'Stewardship Assignments', key: 'stewardshipAssignments', icon: UserCheck2, color: 'text-emerald-600' },
    { label: 'Privacy Exceptions', key: 'privacyExceptions', icon: FileWarning, color: 'text-rose-600' },
    { label: 'Data Quality Warnings', key: 'dataQualityWarnings', icon: AlertTriangle, color: 'text-amber-600' },
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
export default GovernanceKpiGrid;
