'use client';

import React from 'react';
import { Plus, ShieldAlert, Key, FolderPlus, Download, MoreHorizontal } from 'lucide-react';

interface RolesPermissionsHeaderProps {
  onCreateRole: () => void;
  onCreatePermissionSet: () => void;
  onCreateAccessProfile: () => void;
  onReviewPrivileged: () => void;
  onExportRegistry: () => void;
}

export function RolesPermissionsHeader({
  onCreateRole,
  onCreatePermissionSet,
  onCreateAccessProfile,
  onReviewPrivileged,
  onExportRegistry,
}: RolesPermissionsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 bg-white p-3.5 rounded border border-gray-200 shadow-2xs">
      {/* Title & Description */}
      <div className="min-w-0">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          Roles, Permissions & Access Profiles
        </h1>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-2xl leading-normal">
          Define and govern roles, permission sets, scope templates, inheritance, and assignments to ensure least privilege and appropriate access across the enterprise.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
        <button
          type="button"
          onClick={onCreateRole}
          className="px-3 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Role</span>
        </button>

        <button
          type="button"
          onClick={onCreatePermissionSet}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Key className="w-3.5 h-3.5 text-gray-500" />
          <span>Create Permission Set</span>
        </button>

        <button
          type="button"
          onClick={onCreateAccessProfile}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <FolderPlus className="w-3.5 h-3.5 text-gray-500" />
          <span>Create Access Profile</span>
        </button>

        <button
          type="button"
          onClick={onReviewPrivileged}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Review Privileged Roles</span>
        </button>

        <button
          type="button"
          onClick={onExportRegistry}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Role Registry</span>
        </button>

        <button
          type="button"
          className="p-1.5 bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 rounded shadow-2xs transition-colors"
          aria-label="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
