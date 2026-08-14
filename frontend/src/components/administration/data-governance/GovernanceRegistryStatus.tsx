import React from 'react';

interface GovernanceRegistryStatusProps {
  context: Record<string, string>;
}

export function GovernanceRegistryStatus({ context }: GovernanceRegistryStatusProps) {
  const items = [
    { label: 'Tenant', value: context.tenant || 'SL Beauty', isBold: true },
    { label: 'Ecosystem', value: context.ecosystem || 'Beauty Marketplace' },
    { label: 'Administrative Scope', value: context.adminScope || 'Enterprise Wide' },
    { label: 'Region', value: context.region || 'Sri Lanka' },
    { label: 'Environment', value: context.environment || 'Production' },
    { label: 'Data Registry', value: context.dataRegistry || 'Connected', isConnected: true },
    { label: 'Classification Registry', value: context.classificationRegistry || 'Connected', isConnected: true },
    { label: 'Ownership Registry', value: context.ownershipRegistry || 'Connected', isConnected: true },
    { label: 'Retention Engine', value: context.retentionEngine || 'Connected', isConnected: true },
    { label: 'Privacy Engine', value: context.privacyEngine || 'Connected', isConnected: true },
    { label: 'Residency Registry', value: context.residencyRegistry || 'Connected', isConnected: true },
    { label: 'Audit Service', value: context.auditService1 || 'Connected', isConnected: true },
    { label: 'Audit Service', value: context.auditService2 || 'Connected', isConnected: true },
    { label: 'Data Completeness', value: context.dataCompleteness || '99%', isHighlight: true },
    { label: 'Last Evaluated', value: context.lastEvaluated || 'May 13, 2025 5:00 AM' },
    { label: 'Access Scope', value: context.accessScope || 'Administration Scope' },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 rounded p-2 mb-3 shadow-2xs overflow-x-auto">
      <div className="flex items-center gap-3 min-w-max text-[9px] divide-x divide-gray-150">
        {items.map((item, idx) => (
          <div key={idx} className={`flex items-center gap-1 ${idx > 0 ? 'pl-3' : ''}`}>
            <span className="text-gray-400 font-medium uppercase tracking-wider">{item.label}</span>
            <div className="flex items-center gap-0.5">
              {item.isConnected && (
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
export default GovernanceRegistryStatus;
