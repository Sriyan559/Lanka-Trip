import React from 'react';
import {
  Users,
  Shield,
  Key,
  ShieldAlert,
  Laptop,
  Clock,
  FileCheck,
  AlertCircle,
  AlertTriangle,
  HeartPulse,
  LogIn,
  CheckCircle2,
  Lock,
  Flame,
  UserCheck,
  ShieldCheck,
  Ban,
  ShieldX,
  History,
  FileText,
} from 'lucide-react';

export function UserMetricCards() {
  const row1 = [
    { label: 'Memberships', value: '3', icon: Users, color: 'text-gray-900', badgeColor: 'bg-blue-50 text-blue-700' },
    { label: 'Assigned Roles', value: '4', icon: Shield, color: 'text-gray-900', badgeColor: 'bg-blue-50 text-blue-700' },
    { label: 'Effective Permission Sets', value: '6', icon: Key, color: 'text-gray-900', badgeColor: 'bg-indigo-50 text-indigo-700' },
    { label: 'Privileged Permissions', value: '12', icon: ShieldAlert, color: 'text-rose-700', badgeColor: 'bg-rose-50 text-rose-700' },
    { label: 'Active Sessions', value: '3', icon: Laptop, color: 'text-emerald-700', badgeColor: 'bg-emerald-50 text-emerald-700' },
    { label: 'Temporary Grants', value: '1', icon: Clock, color: 'text-amber-700', badgeColor: 'bg-amber-50 text-amber-700' },
    { label: 'Open Reviews', value: '1', icon: FileCheck, color: 'text-amber-700', badgeColor: 'bg-amber-50 text-amber-700' },
    { label: 'Exceptions', value: '0', icon: AlertCircle, color: 'text-gray-500', badgeColor: 'bg-gray-100 text-gray-700' },
    { label: 'Risk Signals', value: '2', icon: AlertTriangle, color: 'text-amber-700', badgeColor: 'bg-amber-50 text-amber-700' },
    { label: 'User Health', value: '96 / 100', icon: HeartPulse, color: 'text-emerald-700', badgeColor: 'bg-emerald-50 text-emerald-700' },
  ];

  const row2 = [
    { label: 'Last Login', value: '12 min ago', icon: LogIn, color: 'text-gray-900' },
    { label: 'MFA', value: 'Verified', icon: CheckCircle2, color: 'text-emerald-700' },
    { label: 'SSO', value: 'Managed', icon: Lock, color: 'text-emerald-700' },
    { label: 'Production Access', value: 'Conditional', icon: Flame, color: 'text-amber-700' },
    { label: 'Review Status', value: 'Current', icon: UserCheck, color: 'text-emerald-700' },
    { label: 'Dormancy', value: 'No', icon: ShieldCheck, color: 'text-gray-700' },
    { label: 'Restrictions', value: 'None', icon: Ban, color: 'text-gray-700' },
    { label: 'Failed Logins — 30D', value: '2', icon: ShieldX, color: 'text-rose-700' },
    { label: 'Access Changes — 30D', value: '5', icon: History, color: 'text-blue-700' },
    { label: 'Audit Events — 30D', value: '38', icon: FileText, color: 'text-blue-700' },
  ];

  return (
    <div className="flex flex-col gap-2 mb-3">
      {/* Row 1 Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-2">
        {row1.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between min-h-[64px]"
            >
              <div className="flex items-center justify-between gap-1 text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                <span className="truncate">{m.label}</span>
                <Icon className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              </div>
              <span className={`text-base font-extrabold ${m.color} leading-none mt-1`}>
                {m.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Row 2 Status & Activity Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-2">
        {row2.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between min-h-[64px]"
            >
              <div className="flex items-center justify-between gap-1 text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                <span className="truncate">{m.label}</span>
                <Icon className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              </div>
              <span className={`text-xs font-bold ${m.color} leading-none mt-1 truncate`}>
                {m.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
