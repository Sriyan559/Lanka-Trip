import React from 'react';

interface ControlHealthMetricProps {
  label: string;
  percentage: number;
  color?: string;
}

function ControlHealthMetric({ label, percentage, color = '#7a0023' }: ControlHealthMetricProps) {
  const pct = Math.min(100, Math.max(0, percentage));
  const textColor = pct >= 80 ? '#16a34a' : pct >= 60 ? '#f59e0b' : '#dc2626';

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-medium text-gray-600 truncate pr-2">{label}</span>
        <span className="font-bold flex-shrink-0" style={{ color: textColor }}>
          {pct}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: pct >= 80 ? '#16a34a' : pct >= 60 ? '#f59e0b' : '#dc2626' }}
        />
      </div>
    </div>
  );
}

const SCORECARD_METRICS = [
  { label: 'Brand Authorization',    key: 'brand_authorization' },
  { label: 'Product Identity Match', key: 'product_identity' },
  { label: 'Packaging Authenticity', key: 'packaging_authenticity' },
  { label: 'Identifier Integrity',   key: 'identifier_integrity' },
  { label: 'Seller Compliance',      key: 'seller_compliance' },
  { label: 'Evidence Readiness',     key: 'evidence_readiness' },
  { label: 'Restriction Control',    key: 'restriction_control' },
  { label: 'Revalidation Readiness', key: 'revalidation_readiness' },
  { label: 'SLA Compliance',         key: 'sla_compliance' },
  { label: 'Audit Readiness',        key: 'audit_readiness' },
];

interface AuthenticityHealthScorecardProps {
  data?: Record<string, number>;
}

export function AuthenticityHealthScorecard({ data = {} }: AuthenticityHealthScorecardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
          Authenticity Control Health Scorecard
        </h3>
        <span className="text-[10px] text-gray-400">Live metrics</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
        {SCORECARD_METRICS.map((metric) => (
          <ControlHealthMetric
            key={metric.key}
            label={metric.label}
            percentage={data?.[metric.key] ?? 0}
          />
        ))}
      </div>
    </div>
  );
}
