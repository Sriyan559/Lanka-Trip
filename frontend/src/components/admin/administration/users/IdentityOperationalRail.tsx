import React from 'react';
import Link from 'next/link';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  Users, UserCheck, Shield, Key, AlertTriangle, Play, HelpCircle, FileText,
  Activity, Settings, PlusCircle, ArrowUpRight, Search, FileBarChart,
  UserPlus, MailPlus, ShieldAlert, Lock, Unlock, Eye, RefreshCw, FolderClosed
} from 'lucide-react';

interface OverviewRowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

function OverviewRow({ label, value, highlight }: OverviewRowProps) {
  return (
    <div className="flex justify-between items-center text-[11px] font-semibold py-1 border-b border-gray-100 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className={`font-bold ${highlight ? 'text-red-650 bg-red-50 px-1.5 py-0.25 rounded text-red-600' : 'text-gray-900'}`}>{value}</span>
    </div>
  );
}

export function IdentityOperationalRail() {
  const score = 97;

  return (
    <div className="w-[300px] flex-shrink-0 flex flex-col gap-4 border-l border-gray-200 pl-4 py-1 min-h-screen">
      
      {/* 1. Identity Health Gauge */}
      <div className="bg-white border border-gray-200 rounded p-3.5 shadow-sm">
        <div className="flex flex-col items-center border-b border-gray-100 pb-3 mb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Identity Health</span>
          
          <div className="w-24 h-24 relative flex flex-col items-center justify-center mb-2">
            <CircularProgressbar
              value={score}
              strokeWidth={9}
              styles={buildStyles({
                pathColor: '#10b981', // green
                trailColor: '#f3f4f6',
                pathTransitionDuration: 0.5,
              })}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-gray-900 leading-none mt-1">{score}</span>
              <span className="text-[9px] font-bold text-gray-400">/100</span>
            </div>
          </div>
          
          <span className="text-[11px] font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
            Excellent
          </span>
        </div>

        {/* Health dimensions list */}
        <div className="flex flex-col gap-1.5 text-[10px] font-semibold text-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>Active Account Health</span>
            </div>
            <strong>99%</strong>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>MFA Coverage</span>
            </div>
            <strong>92%</strong>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>SSO Coverage</span>
            </div>
            <strong>90%</strong>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>Review Coverage</span>
            </div>
            <strong>95%</strong>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>Ownership Coverage</span>
            </div>
            <strong>96%</strong>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>Exception Hygiene</span>
            </div>
            <strong>94%</strong>
          </div>
        </div>
      </div>

      {/* 2. Account Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-gray-150">Account Summary</h3>
        <div className="flex flex-col">
          <OverviewRow label="Total Accounts" value="446" />
          <OverviewRow label="Active Users" value="428" />
          <OverviewRow label="Administrators" value="24" />
          <OverviewRow label="Privileged Users" value="8" />
          <OverviewRow label="Pending Invitations" value="15" />
          <OverviewRow label="Locked Accounts" value="4" highlight />
          <OverviewRow label="Suspended Accounts" value="8" highlight />
        </div>
      </div>

      {/* 3. Access & Authentication */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-gray-150">Access & Authentication</h3>
        <div className="flex flex-col">
          <OverviewRow label="Tenant Memberships" value="612" />
          <OverviewRow label="Multi-Tenant Users" value="26" />
          <OverviewRow label="SSO Managed Accounts" value="286" />
          <OverviewRow label="Local Auth Accounts" value="140" />
          <OverviewRow label="MFA Gaps" value="6" highlight />
          <OverviewRow label="Temporary Access Grants" value="8" />
        </div>
      </div>

      {/* 4. Review & Risk */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-gray-150">Review & Risk</h3>
        <div className="flex flex-col">
          <OverviewRow label="Review Due / Overdue" value="12" highlight />
          <OverviewRow label="Dormant Accounts" value="11" />
          <OverviewRow label="Account Exceptions" value="5" />
          <OverviewRow label="High Risk Accounts" value="12" highlight />
          <OverviewRow label="Out-of-Policy Accounts" value="4" highlight />
          <OverviewRow label="Expiring Temporary Access" value="2" />
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-gray-150">Quick Queues</h3>
        <div className="flex flex-col text-[11px] font-semibold text-gray-700">
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span>Pending Invitations</span>
            <span className="text-orange-600 font-bold">15</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span>MFA Gaps</span>
            <span className="text-red-650 font-bold text-red-600">6</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span>Locked Accounts</span>
            <span className="text-red-650 font-bold text-red-600">4</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span>Suspended Accounts</span>
            <span className="text-red-650 font-bold text-red-600">8</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span>Review Due</span>
            <span className="text-red-650 font-bold text-red-600">12</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span>Dormant Accounts</span>
            <span className="text-orange-600 font-bold">11</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span>Temporary Access Expiring</span>
            <span className="text-orange-600 font-bold">3</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Identity Risks</span>
            <span className="text-red-650 font-bold text-red-600">20</span>
          </div>
        </div>
      </div>

      {/* 6. Recommended Next Action (burgundy card) */}
      <div className="bg-[#741d35] text-white rounded p-3.5 shadow-sm">
        <div className="flex items-center gap-1.5 mb-2">
          <AlertTriangle size={14} className="text-amber-300" />
          <h4 className="text-[11px] font-bold uppercase tracking-wider">Recommended Next Action</h4>
        </div>
        <p className="text-[10px] font-semibold text-red-50 leading-relaxed mb-3">
          Review the 6 encryption-requiring user identities. Address MFA adoption gaps and expiring access certifications to improve overall identity security posture.
        </p>
        <div className="text-[9px] font-bold text-red-200 mb-3 flex flex-col gap-0.5 border-t border-red-800/60 pt-2">
          <div className="flex justify-between">
            <span>Owner:</span>
            <span className="text-white">Identity & Security</span>
          </div>
          <div className="flex justify-between">
            <span>Due Date:</span>
            <span className="text-white">Aug 14, 2026</span>
          </div>
        </div>
        <button
          type="button"
          className="w-full bg-white hover:bg-gray-100 text-[#741d35] font-extrabold text-[10px] py-1.5 rounded transition-colors shadow-sm"
        >
          Review MFA Gaps
        </button>
      </div>

      {/* 7. Final Actions Links */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-sm">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-gray-150">Final Actions</h3>
        <div className="flex flex-col gap-1">
          <Link href="/admin/administration/users" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <UserPlus size={12} />
            <span>Create User</span>
          </Link>
          <Link href="/admin/administration/users" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <MailPlus size={12} />
            <span>Invite User</span>
          </Link>
          <Link href="/admin/administration/roles-permissions" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <Shield size={12} />
            <span>Review Privileged Users</span>
          </Link>
          <Link href="/admin/administration/users" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <MailPlus size={12} />
            <span>Review Pending Invitations</span>
          </Link>
          <Link href="/admin/administration/security-authentication" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <AlertTriangle size={12} />
            <span>Review MFA Gaps</span>
          </Link>
          <Link href="/admin/administration/users" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <Lock size={12} />
            <span>Review Locked Accounts</span>
          </Link>
          <Link href="/admin/administration/users" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <ShieldAlert size={12} />
            <span>Review Suspended Accounts</span>
          </Link>
          <Link href="/admin/administration/users" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <ShieldAlert size={12} />
            <span>Review Dormant Accounts</span>
          </Link>
          <Link href="/admin/administration/users" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <PlusCircle size={12} />
            <span>Review Temporary Access</span>
          </Link>
          <Link href="/admin/administration/users" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <Settings size={12} />
            <span>Review Account Exceptions</span>
          </Link>
          <Link href="/admin/administration/users" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1 border-b border-gray-50">
            <FileBarChart size={12} />
            <span>Export User Registry</span>
          </Link>
          <Link href="/admin/administration/reports-audit" className="flex items-center gap-2 text-[10px] font-bold text-[#741d35] hover:underline py-1">
            <Search size={12} />
            <span>Open Identity Audit</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
