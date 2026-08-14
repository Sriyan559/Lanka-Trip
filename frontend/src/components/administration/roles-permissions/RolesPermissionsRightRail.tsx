'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, ShieldAlert, ChevronRight, Plus, Key, FolderPlus, Clock, Download } from 'lucide-react';

interface RolesPermissionsRightRailProps {
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function RolesPermissionsRightRail({
  onNavigateTab,
  onActionClick,
}: RolesPermissionsRightRailProps) {
  const healthMetrics = [
    { label: 'Least Privilege', value: 91 },
    { label: 'SoD Compliance', value: 94 },
    { label: 'Access Reviews', value: 95 },
    { label: 'Ownership Coverage', value: 78 },
    { label: 'Dormant Cleanup', value: 10 },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Authorization Health */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Authorization Health
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={96} max={100} label="Excellent" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Compliance</span>
            <span className="text-xs font-bold text-emerald-700">96% Compliant</span>
          </div>
        </div>
        <div className="space-y-1 text-[9px]">
          {healthMetrics.map((hm, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-500">{hm.label}</span>
              <span className="font-bold text-gray-800">{hm.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Role Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Role Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Active Roles</span>
            <span className="font-bold text-gray-900">286</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Conditional Roles</span>
            <span className="font-medium text-gray-700">22</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Deprecated Roles</span>
            <span className="font-medium text-gray-700">14</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Suspended Roles</span>
            <span className="font-medium text-gray-700">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Retired Roles</span>
            <span className="font-medium text-gray-700">10</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-gray-150 font-bold">
            <span className="text-gray-700">Total Roles</span>
            <span className="text-[#741d35]">344</span>
          </div>
        </div>
      </div>

      {/* 3. Assignment Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Assignment Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center font-bold">
            <span className="text-gray-700">Total Users</span>
            <span className="text-gray-900">1,358</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Direct</span>
            <span className="font-semibold text-gray-800">412 (32%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Group / Membership</span>
            <span className="font-semibold text-gray-800">568 (44%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Rule-Based</span>
            <span className="font-semibold text-gray-800">314 (24%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Temporary</span>
            <span className="font-semibold text-gray-800">64 (5%)</span>
          </div>
        </div>
      </div>

      {/* 4. Role & Permission Risk */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Role & Permission Risk
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Critical Risk</span>
            <span className="font-bold text-rose-700">6</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">High Risk</span>
            <span className="font-bold text-rose-600">18</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Medium Risk</span>
            <span className="font-bold text-amber-700">46</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Low Risk</span>
            <span className="font-semibold text-gray-700">124</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-gray-150 font-bold">
            <span className="text-gray-700">Total at Risk</span>
            <span className="text-rose-700">194</span>
          </div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[10px]">
          <button
            type="button"
            onClick={() => onNavigateTab('role-reviews')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded transition-colors text-left"
          >
            <span className="text-gray-600">Roles Due for Review</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">14</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('privileged-roles')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded transition-colors text-left"
          >
            <span className="text-gray-600">Privileged Roles</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">28</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('sod-conflicts')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded transition-colors text-left"
          >
            <span className="text-gray-600">SoD Conflicts</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">6</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('role-registry')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded transition-colors text-left"
          >
            <span className="text-gray-600">Over-Permissive Roles</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">6</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('role-registry')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded transition-colors text-left"
          >
            <span className="text-gray-600">Unused / Dormant Roles</span>
            <span className="font-bold text-gray-700 bg-gray-100 px-1.5 py-0.25 rounded text-[9px]">24</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('permission-sets')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded transition-colors text-left"
          >
            <span className="text-gray-600">Permission Gaps</span>
            <span className="font-bold text-gray-700 bg-gray-100 px-1.5 py-0.25 rounded text-[9px]">12</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('role-assignments')}
            className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded transition-colors text-left"
          >
            <span className="text-gray-600">Failed Assignments</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">3</span>
          </button>
        </div>
      </div>

      {/* 6. Recommended Next Action */}
      <div className="bg-rose-950 text-white rounded p-3 shadow-sm border border-rose-900 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Recommended Next Action</span>
        </div>
        <p className="text-[10px] text-rose-100 leading-relaxed">
          Review 14 roles due for access recertification. Address 6 SoD conflicts to reduce risk. Remove 24 dormant roles to improve hygiene.
        </p>
        <button
          type="button"
          onClick={() => onNavigateTab('role-reviews')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700"
        >
          Open Review Queue
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Final Actions
        </h4>
        <div className="flex flex-col gap-1.5 text-[10px]">
          <button
            type="button"
            onClick={() => onActionClick('create_role')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Create Role</span>
            <Plus className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('create_permission_set')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Create Permission Set</span>
            <Key className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('create_access_profile')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Create Access Profile</span>
            <FolderPlus className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('run_review_campaign')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Run Access Review Campaign</span>
            <Clock className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('sod-conflicts')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Review SoD Conflicts</span>
            <ShieldAlert className="w-3 h-3 text-amber-600" />
          </button>
          <button
            type="button"
            onClick={() => onActionClick('export_role_registry')}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"
          >
            <span>Export Role Registry</span>
            <Download className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
