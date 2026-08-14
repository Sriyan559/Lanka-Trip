import React from 'react';
import { CheckCircle2, ShieldCheck, Database, Key, Radio, Layers, Clock, Cpu } from 'lucide-react';

export function ServiceStatusStrip() {
  const items = [
    { label: 'Identity Registry', status: 'Connected', icon: Database, isOk: true },
    { label: 'Membership Registry', status: 'Connected', icon: Layers, isOk: true },
    { label: 'Role Registry', status: 'Connected', icon: ShieldCheck, isOk: true },
    { label: 'Authentication Source', status: 'Connected', icon: Key, isOk: true },
    { label: 'MFA Source', status: 'Healthy', icon: Radio, isOk: true },
    { label: 'SSO Provider', status: 'Connected', icon: CheckCircle2, isOk: true },
    { label: 'Session Service', status: 'Healthy', icon: Cpu, isOk: true },
    { label: 'Review Engine', status: 'Healthy', icon: ShieldCheck, isOk: true },
    { label: 'Audit Service', status: 'Connected', icon: Database, isOk: true },
    { label: 'Data Completeness', status: '99%', icon: CheckCircle2, isOk: true },
    { label: 'Last Evaluated', status: 'Aug 13, 2026 1:55 AM', icon: Clock, isOk: true },
    { label: 'Access Assigned', status: 'Administration Scope', icon: ShieldCheck, isOk: true },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 rounded p-2 mb-3 shadow-2xs overflow-x-auto">
      <div className="flex items-center justify-between gap-4 min-w-[1040px] text-[10px]">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-1.5 flex-1 min-w-0">
              <Icon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] text-gray-500 font-semibold truncate leading-none mb-0.5">
                  {item.label}
                </span>
                <div className="flex items-center gap-1">
                  {item.status === 'Connected' || item.status === 'Healthy' ? (
                    <span className="text-[10px] font-bold text-emerald-700 leading-none">
                      {item.status}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-900 leading-none truncate">
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
