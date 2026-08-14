import React from 'react';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { ShieldCheck, Lock, Fingerprint, Key, Server, AlertTriangle } from 'lucide-react';

export function AuthenticationMethodsGrid() {
  const methods = [
    { title: 'Enterprise SSO', status: 'Enabled', icon: ShieldCheck, color: 'text-[#741d35]' },
    { title: 'Password + MFA', status: 'Enabled', icon: Lock, color: 'text-indigo-600' },
    { title: 'Passkey / WebAuthn', status: 'Enabled', icon: Fingerprint, color: 'text-blue-600' },
    { title: 'Hardware Security Key', status: 'Enabled', icon: Key, color: 'text-teal-600' },
    { title: 'Service Credential', status: 'Enabled', icon: Server, color: 'text-purple-600' },
    { title: 'Emergency Local Auth', status: 'Break-Glass', icon: AlertTriangle, color: 'text-rose-600' },
  ];

  return (
    <SectionCard title="Authentication Methods">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {methods.map((m, idx) => {
          const Icon = m.icon;
          const isBreakGlass = m.status === 'Break-Glass';

          return (
            <div
              key={idx}
              className={`p-2.5 rounded border text-center flex flex-col items-center justify-center gap-1 min-h-[70px] ${
                isBreakGlass
                  ? 'bg-rose-50 border-rose-200'
                  : 'bg-gray-50/70 border-gray-200 hover:bg-gray-100/70'
              }`}
            >
              <Icon className={`w-4 h-4 ${m.color}`} />
              <span className="text-[10px] font-bold text-gray-900 leading-tight">
                {m.title}
              </span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.25 rounded ${
                  isBreakGlass
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {m.status}
              </span>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
export default AuthenticationMethodsGrid;
