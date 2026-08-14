'use client';

import React from 'react';
import { UserProfileData } from '@/lib/administration/users/user-detail.types';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import {
  ShieldAlert,
  AlertTriangle,
  FileCheck,
  Key,
  Users,
  Download,
  Flame,
  Clock,
  ShieldX,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

interface UserHealthAccessRailProps {
  profile: UserProfileData;
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function UserHealthAccessRail({
  profile,
  onNavigateTab,
  onActionClick,
}: UserHealthAccessRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. User Activity Posture */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          User Activity Posture
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={97} max={100} label="Excellent" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Posture Status</span>
            <span className="text-xs font-bold text-emerald-700">Healthy & Monitored</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 text-center text-[9px]">
          <div className="p-1 bg-gray-50 rounded border border-gray-100">
            <span className="text-gray-400 block text-[8px]">Anomalies (7D)</span>
            <span className="font-extrabold text-gray-900 text-xs">0</span>
          </div>
          <div className="p-1 bg-amber-50/50 rounded border border-amber-100">
            <span className="text-amber-700 block text-[8px]">Warnings (7D)</span>
            <span className="font-extrabold text-amber-700 text-xs">1</span>
          </div>
          <div className="p-1 bg-amber-50/50 rounded border border-amber-100">
            <span className="text-amber-700 block text-[8px]">Risk Events (7D)</span>
            <span className="font-extrabold text-amber-700 text-xs">2</span>
          </div>
          <div className="p-1 bg-gray-50 rounded border border-gray-100 mt-1">
            <span className="text-gray-400 block text-[8px]">Critical Findings</span>
            <span className="font-extrabold text-gray-900 text-xs">0</span>
          </div>
          <div className="p-1 bg-gray-50 rounded border border-gray-100 mt-1">
            <span className="text-gray-400 block text-[8px]">Open Rev.</span>
            <span className="font-extrabold text-gray-900 text-xs">1</span>
          </div>
          <div className="p-1 bg-emerald-50 rounded border border-emerald-100 mt-1">
            <span className="text-emerald-700 block text-[8px]">Control Area</span>
            <span className="font-extrabold text-emerald-700 text-[10px]">Secure</span>
          </div>
        </div>
      </div>

      {/* 2. Account Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Account Summary
        </h4>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <StatusBadge status={profile.status} size="xs" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Account Type</span>
            <span className="font-semibold text-gray-800">{profile.accountType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Primary Role</span>
            <span className="font-semibold text-gray-800 truncate max-w-[140px]" title={profile.primaryRole}>{profile.primaryRole}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Department</span>
            <span className="font-semibold text-gray-800">{profile.department}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Privilege Level</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px] border border-rose-200">
              {profile.privilegeLevel}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Access Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Access Summary
        </h4>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Memberships</span>
            <span className="font-bold text-gray-900">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Roles</span>
            <span className="font-bold text-gray-900">4</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Permission Sets</span>
            <span className="font-bold text-gray-900">6</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Privileged Permissions</span>
            <span className="font-bold text-rose-700">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Production Scope</span>
            <span className="text-amber-700 bg-amber-50 px-1 py-0.25 rounded font-bold text-[9px] border border-amber-200">
              Conditional
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Temporary Grants</span>
            <span className="font-bold text-gray-900">1</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Restrictions</span>
            <span className="text-amber-700 font-semibold">1 Conditional</span>
          </div>
        </div>
      </div>

      {/* 4. Authentication */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Authentication
        </h4>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">SSO</span>
            <span className="font-semibold text-emerald-700">Managed (Okta)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">MFA</span>
            <span className="font-bold text-emerald-700">Verified</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Active Sessions</span>
            <span className="font-bold text-gray-900">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Failed Logins (30D)</span>
            <span className="font-bold text-rose-700">2</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Last Login</span>
            <span className="font-medium text-gray-700">12 min ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Step-Up Requirement</span>
            <span className="text-teal-700 font-bold text-[9px]">Critical Actions</span>
          </div>
        </div>
      </div>

      {/* 5. Review & Risk */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Review & Risk
        </h4>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Review Status</span>
            <span className="font-bold text-emerald-700">Current</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Next Review</span>
            <span className="font-medium text-gray-700">Sep 18, 2026</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Risk Signals</span>
            <span className="font-bold text-amber-700">2</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Exceptions</span>
            <span className="font-bold text-gray-700">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Dormancy</span>
            <span className="font-medium text-gray-700">No</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Account Risk</span>
            <span className="text-amber-700 font-bold">Medium</span>
          </div>
        </div>
      </div>

      {/* 6. Recommended Next Action */}
      <div className="bg-rose-950 text-white rounded p-3 shadow-sm border border-rose-900 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Recommended Next Action</span>
        </div>
        <p className="text-[10px] text-rose-100 leading-relaxed">
          Review Priya Kumar&apos;s temporary production access window before it expires on Aug 31, 2026. Elevated access should align with approved scope for operational duties.
        </p>
        <div className="flex items-center justify-between text-[9px] text-rose-300 border-t border-rose-900 pt-1.5">
          <span>Owner: Platform Administration</span>
          <span>Due: Aug 14, 2026</span>
        </div>
        <button
          type="button"
          onClick={() => onActionClick('review_temporary_access')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700"
        >
          Review Temporary Access
        </button>
      </div>

      {/* 7. Quick Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Actions
        </h4>
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <button
            type="button"
            onClick={() => onNavigateTab('memberships')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Review Memberships</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('temporary-access')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Review Temporary Access</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('roles-access')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Review Roles</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('security')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Review Security Risks</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('roles-access')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Review Effective Access</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('activity')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Review Sign-in Activity</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('authentication')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Review Authentication</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('export_user_audit')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Export User Audit</span>
            <Download className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('sessions')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between col-span-2"
          >
            <span>Review Sessions</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      </div>

      {/* 8. Controlled Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Controlled Actions</span>
        </h4>
        <div className="flex flex-col gap-1 text-[10px]">
          <button
            type="button"
            onClick={() => onActionClick('request_access_change')}
            className="p-1.5 text-left text-gray-700 hover:bg-gray-50 rounded font-semibold flex items-center justify-between"
          >
            <span>Request Access Change</span>
            <FileCheck className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('request_recertification')}
            className="p-1.5 text-left text-gray-700 hover:bg-gray-50 rounded font-semibold flex items-center justify-between"
          >
            <span>Request Access Recertification</span>
            <Clock className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('request_temp_access')}
            className="p-1.5 text-left text-gray-700 hover:bg-gray-50 rounded font-semibold flex items-center justify-between"
          >
            <span>Request Temporary Access</span>
            <Key className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('revoke_user_access')}
            className="p-1.5 text-left text-rose-700 hover:bg-rose-50 rounded font-bold flex items-center justify-between"
          >
            <span>Revoke User Access</span>
            <ShieldX className="w-3 h-3 text-rose-500" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('revoke_sessions')}
            className="p-1.5 text-left text-rose-700 hover:bg-rose-50 rounded font-bold flex items-center justify-between"
          >
            <span>Revoke Sessions</span>
            <ShieldX className="w-3 h-3 text-rose-500" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('restrict_scope')}
            className="p-1.5 text-left text-amber-700 hover:bg-amber-50 rounded font-semibold flex items-center justify-between"
          >
            <span>Restrict Access Scope</span>
            <AlertTriangle className="w-3 h-3 text-amber-500" />
          </button>
          <Link
            href="/admin/administration/reports-audit"
            className="p-1.5 text-left text-[#741d35] hover:bg-pink-50 rounded font-bold flex items-center justify-between border-t border-gray-100 mt-1 pt-2"
          >
            <span>Open Full Audit History (AD14)</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
