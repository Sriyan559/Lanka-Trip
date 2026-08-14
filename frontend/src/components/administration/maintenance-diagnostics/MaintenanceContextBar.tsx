import React from 'react';

interface MaintenanceContextBarProps {
  context: Record<string, string>;
}

export function MaintenanceContextBar({ context }: MaintenanceContextBarProps) {
  const items = [
    { label: 'Tenant', value: context.tenant || 'SL Beauty', isBold: true },
    { label: 'Ecosystem', value: context.ecosystem || 'Beauty Marketplace' },
    { label: 'Administrative Scope', value: context.adminScope || 'Enterprise-Wide' },
    { label: 'Region', value: context.region || 'Sri Lanka' },
    { label: 'Environment', value: context.environment || 'Production' },
    { label: 'Job Registry', value: context.jobRegistry || 'Connected', isConnected: true },
    { label: 'Service Registry', value: context.serviceRegistry || 'Connected', isConnected: true },
    { label: 'Health Check Service', value: context.healthCheckService || 'Connected', isConnected: true },
    { label: 'Worker Registry', value: context.workerRegistry || 'Connected', isConnected: true },
    { label: 'Dependency Registry', value: context.dependencyRegistry || 'Connected', isConnected: true },
    { label: 'Audit Service', value: context.auditService || 'Connected', isConnected: true },
    { label: 'Data Completeness', value: context.dataCompleteness || '100%', isHighlight: true },
    { label: 'Last Refreshed', value: context.lastRefreshed || 'May 13, 2025 5:45 AM' },
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
              <span className={`font-semibold ${item.isBold ? 'font-bold text-gray-900' : item.isHighlight ? 'font-extrabold text-emerald-700' : 'text-gray-800'}`}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MaintenanceContextBar;
