'use client';

import React from 'react';
import { UserProfileData, UserHealthBreakdown } from '@/lib/administration/users/user-detail.types';
import { getInitials } from '@/lib/administration/users/user-detail.mappers';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { UserHealthScore } from './UserHealthScore';
import {
  ShieldCheck,
  KeyRound,
  Users,
  Download,
  MoreHorizontal,
  FileCheck2,
} from 'lucide-react';

interface UserDetailHeaderProps {
  profile: UserProfileData;
  healthBreakdown: UserHealthBreakdown[];
  onReviewAccess: () => void;
  onRequestAccessChange: () => void;
  onReviewAuth: () => void;
  onReviewMemberships: () => void;
  onExportAudit: () => void;
}

export function UserDetailHeader({
  profile,
  healthBreakdown,
  onReviewAccess,
  onRequestAccessChange,
  onReviewAuth,
  onReviewMemberships,
  onExportAudit,
}: UserDetailHeaderProps) {
  const initials = getInitials(profile.name);

  return (
    <div className="flex flex-col gap-3 bg-white p-3.5 rounded border border-gray-200 shadow-2xs mb-3">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-150 pb-3">
        {/* User Identity Hero */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#741d35] text-white font-extrabold flex items-center justify-center text-sm shadow-xs flex-shrink-0">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-gray-900 leading-tight">
                {profile.name}
              </h1>
              <StatusBadge status={profile.status} size="xs" />
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              {profile.title} • {profile.department}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={onReviewAccess}
            className="px-3 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Review User Access</span>
          </button>
          <button
            type="button"
            onClick={onRequestAccessChange}
            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-gray-500" />
            <span>Request Access Change</span>
          </button>
          <button
            type="button"
            onClick={onReviewAuth}
            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5 text-gray-500" />
            <span>Review Authentication</span>
          </button>
          <button
            type="button"
            onClick={onReviewMemberships}
            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-gray-500" />
            <span>Review Memberships</span>
          </button>
          <button
            type="button"
            onClick={onExportAudit}
            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export User Audit</span>
          </button>
          <button
            type="button"
            className="p-1.5 bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 rounded shadow-2xs transition-colors"
            aria-label="More actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Metadata Strip + Health Score */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Compact Metadata Fields Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-2 text-[10px] flex-1">
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">User Reference</span>
            <span className="font-bold text-gray-900">{profile.userRef}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Account Type</span>
            <span className="font-semibold text-gray-800">{profile.accountType}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Primary Tenant</span>
            <span className="font-semibold text-gray-800">{profile.primaryTenant}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Primary Ecosystem</span>
            <span className="font-semibold text-gray-800">{profile.primaryEcosystem}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Department</span>
            <span className="font-semibold text-gray-800">{profile.department}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Primary Role</span>
            <span className="font-bold text-gray-900">{profile.primaryRole}</span>
          </div>

          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Admin Scope</span>
            <span className="font-semibold text-gray-800 truncate block" title={profile.adminScope}>{profile.adminScope}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Privilege Level</span>
            <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1 py-0.25 rounded text-[9px] inline-block">
              {profile.privilegeLevel}
            </span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Account Status</span>
            <StatusBadge status={profile.status} size="xs" />
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Identity Health</span>
            <span className="font-bold text-emerald-700">{profile.healthScore} / 100</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Created</span>
            <span className="font-medium text-gray-600">{profile.createdDate}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase tracking-wider">Last Updated</span>
            <span className="font-medium text-gray-600">{profile.lastUpdated}</span>
          </div>
        </div>

        {/* Health Score breakdown gauge */}
        <div className="flex-shrink-0 flex items-center justify-end">
          <UserHealthScore score={profile.healthScore} breakdown={healthBreakdown} />
        </div>
      </div>
    </div>
  );
}
