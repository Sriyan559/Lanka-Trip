import React from 'react';

interface BuChannelsContextBarProps {
  context: Record<string, string>;
}

export function BuChannelsContextBar({ context }: BuChannelsContextBarProps) {
  const items = [
    { label: 'Tenant', value: context.tenant || 'SL Beauty', isBold: true },
    { label: 'Ecosystem', value: context.ecosystem || 'Beauty Marketplace' },
    { label: 'Administrative Scope', value: context.adminScope || 'Enterprise Wide' },
    { label: 'Region', value: context.region || 'Sri Lanka' },
    { label: 'Environment', value: context.environment || 'Production' },
    { label: 'Business Unit Registry', value: context.businessUnitRegistry || 'Connected', isConnected: true },
    { label: 'Channel Registry', value: context.channelRegistry || 'Connected', isConnected: true },
    { label: 'Organization Registry', value: context.organizationRegistry || 'Connected', isConnected: true },
    { label: 'Scope Engine', value: context.scopeEngine || 'Healthy', isHealthy: true },
    { label: 'Regional Registry', value: context.regionalRegistry || 'Connected', isConnected: true },
    { label: 'Environment Registry', value: context.environmentRegistry || 'Healthy', isHealthy: true },
    { label: 'Ownership Registry', value: context.ownershipRegistry || 'Connected', isConnected: true },
    { label: 'Audit Service', value: context.auditService || 'Connected', isConnected: true },
    { label: 'Data Completeness', value: context.dataCompleteness || '99%', isHighlight: true },
    { label: 'Last Evaluated', value: context.lastEvaluated || 'Aug 13, 2026 2:45 AM' },
    { label: 'Access', value: context.access || 'Assigned Administration Scope' },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 rounded p-2 mb-3 shadow-2xs overflow-x-auto">
      <div className="flex items-center gap-3 min-w-max text-[9px] divide-x divide-gray-150">
        {items.map((item, idx) => (
          <div key={idx} className={`flex items-center gap-1 ${idx > 0 ? 'pl-3' : ''}`}>
            <span className="text-gray-400 font-medium uppercase tracking-wider">{item.label}</span>
            <div className="flex items-center gap-0.5">
              {(item.isConnected || item.isHealthy) && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              )}
              <span
                className={`font-semibold ${
                  item.isBold
                    ? 'font-bold text-gray-900'
                    : item.isHighlight
                    ? 'font-extrabold text-emerald-700'
                    : 'text-gray-800'
                }`}
              >
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BuChannelsContextBar;
