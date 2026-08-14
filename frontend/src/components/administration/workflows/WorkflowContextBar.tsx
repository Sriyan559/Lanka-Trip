import React from 'react';

interface WorkflowContextBarProps {
  context: Record<string, string>;
}

export function WorkflowContextBar({ context }: WorkflowContextBarProps) {
  const items = [
    { label: 'Tenant', value: context.tenant || 'SL Beauty', isBold: true },
    { label: 'Ecosystem', value: context.ecosystem || 'Beauty Marketplace' },
    { label: 'Administrative Scope', value: context.adminScope || 'Enterprise Wide' },
    { label: 'Region', value: context.region || 'Sri Lanka' },
    { label: 'Environment', value: context.environment || 'Production' },
    { label: 'Workflow Registry', value: context.workflowRegistry || 'Connected', isConnected: true },
    { label: 'Approval Registry', value: context.approvalRegistry || 'Connected', isConnected: true },
    { label: 'Rule Registry', value: context.ruleRegistry || 'Connected', isConnected: true },
    { label: 'Security Engine', value: context.securityEngine || 'Healthy', isHealthy: true },
    { label: 'Notification Engine', value: context.notificationEngine || 'Healthy', isHealthy: true },
    { label: 'SLA Engine', value: context.slaEngine || 'Healthy', isHealthy: true },
    { label: 'Escalation Engine', value: context.escalationEngine || 'Healthy', isHealthy: true },
    { label: 'Audit Service', value: context.auditService || 'Connected', isConnected: true },
    { label: 'Data Completeness', value: context.dataCompleteness || '99%', isHighlight: true },
    { label: 'Last Refreshed', value: context.lastRefreshed || 'Aug 13, 2026 4:40 AM' },
    { label: 'Access', value: context.accessScope || 'Assigned Administration Scope' },
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
export default WorkflowContextBar;
