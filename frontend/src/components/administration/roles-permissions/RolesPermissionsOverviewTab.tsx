'use client';

import React from 'react';
import {
  RolesPermissionsFullData,
  RoleRegistryItem,
} from '@/lib/administration/roles-permissions/roles-permissions.types';
import { RoleHierarchyTree } from '@/components/shared/Hierarchy/RoleHierarchyTree';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface RolesPermissionsOverviewTabProps {
  data: RolesPermissionsFullData;
  selectedRole: RoleRegistryItem;
  onSelectRole: (role: RoleRegistryItem) => void;
  onNavigateTab: (tabId: string) => void;
}

export function RolesPermissionsOverviewTab({
  data,
  selectedRole,
  onSelectRole,
  onNavigateTab,
}: RolesPermissionsOverviewTabProps) {
  const {
    hierarchyRoot,
    inheritanceAnalysis,
    privilegedRoles,
    privilegedActions,
    sodConflicts,
    roleAssignments,
    reviewCampaigns,
    dormantRoles,
    overPermissiveRoles,
    permissionGaps,
  } = data;

  // Dot bullet helper
  const renderDot = (color: string) => (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full mr-1 shrink-0"
      style={{ backgroundColor: color }}
    />
  );

  return (
    <div className="w-full overflow-x-auto pb-3 text-gray-800">
      <div className="min-w-[1460px] flex flex-col gap-2.5">
        {/* ========================================================================= */}
        {/* ROW 1: 5 Columns with Equal Height and Strict Alignment */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-5 gap-2.5 items-stretch">
          {/* Card 1.1: Role Inheritance Topology */}
          <div className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between h-[215px]">
            <div className="flex flex-col h-full">
              <h3 className="text-xs font-bold text-[#741d35] tracking-tight mb-1">
                Role Inheritance Topology
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <RoleHierarchyTree root={hierarchyRoot} />
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('inheritance')}
              className="text-blue-600 hover:text-blue-800 hover:underline text-[10px] font-medium flex items-center gap-1 pt-1.5 mt-auto text-left"
            >
              <span>View topology</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Card 1.2: Inheritance Analysis */}
          <div className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between h-[215px]">
            <div>
              <h3 className="text-xs font-bold text-[#741d35] tracking-tight mb-1.5">
                Inheritance Analysis
              </h3>
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-50/90 text-gray-500 font-bold uppercase text-[8.5px] border-b border-gray-150">
                    <th className="py-1 px-1.5 text-left">Metric</th>
                    <th className="py-1 px-1.5 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr>
                    <td className="py-1 px-1.5 text-gray-600">Roles with Inherited Permissions</td>
                    <td className="py-1 px-1.5 text-right font-bold text-gray-900 whitespace-nowrap">
                      {inheritanceAnalysis.rolesWithInherited}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 text-gray-600">Total Inherited Permissions</td>
                    <td className="py-1 px-1.5 text-right font-bold text-gray-900 whitespace-nowrap">
                      {inheritanceAnalysis.totalInherited}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 text-gray-600">Average Inherited per Role</td>
                    <td className="py-1 px-1.5 text-right font-bold text-gray-900 whitespace-nowrap">
                      {inheritanceAnalysis.avgInheritedPerRole}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 text-gray-600">Orphaned Child Roles</td>
                    <td className="py-1 px-1.5 text-right font-bold text-gray-900 whitespace-nowrap">
                      {inheritanceAnalysis.orphanedChildRoles}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 px-1.5 text-gray-600">Inheritance Depth (Max)</td>
                    <td className="py-1 px-1.5 text-right font-bold text-gray-900 whitespace-nowrap">
                      {inheritanceAnalysis.inheritanceDepth}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('inheritance')}
              className="text-blue-600 hover:text-blue-800 hover:underline text-[10px] font-medium flex items-center gap-1 pt-1.5 mt-auto text-left"
            >
              <span>View analysis</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Card 1.3: Privileged Roles */}
          <div className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between h-[215px]">
            <div>
              <h3 className="text-xs font-bold text-[#741d35] tracking-tight mb-1.5">
                Privileged Roles
              </h3>
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-50/90 text-gray-500 font-bold uppercase text-[8.5px] border-b border-gray-150">
                    <th className="py-1 px-1 text-left">Role Name</th>
                    <th className="py-1 px-1 text-left">Privilege</th>
                    <th className="py-1 px-1 text-center">Members</th>
                    <th className="py-1 px-1 text-left">Last Reviewed</th>
                    <th className="py-1 px-1 text-left">Next Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {privilegedRoles.map((pr) => {
                    const isCritical = pr.privilege === 'Critical';
                    const dotColor = isCritical ? '#dc2626' : '#ea580c';
                    return (
                      <tr key={pr.id} className="hover:bg-gray-50/50">
                        <td className="py-1 px-1 font-medium text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                          {pr.roleName}
                        </td>
                        <td className="py-1 px-1 whitespace-nowrap">
                          <span className="inline-flex items-center text-[9.5px] text-gray-800">
                            {renderDot(dotColor)}
                            {pr.privilege}
                          </span>
                        </td>
                        <td className="py-1 px-1 text-center font-bold text-gray-900">
                          {pr.members}
                        </td>
                        <td className="py-1 px-1 text-gray-600 text-[9px] whitespace-nowrap">
                          {pr.lastReviewed}
                        </td>
                        <td className="py-1 px-1 text-gray-600 text-[9px] whitespace-nowrap">
                          {pr.nextReview}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('privileged-roles')}
              className="text-blue-600 hover:text-blue-800 hover:underline text-[10px] font-medium flex items-center gap-1 pt-1.5 mt-auto text-left"
            >
              <span>View all privileged roles</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Card 1.4: Privileged Administrative Actions */}
          <div className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between h-[215px]">
            <div>
              <h3 className="text-xs font-bold text-[#741d35] tracking-tight mb-1.5">
                Privileged Administrative Actions
              </h3>
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-50/90 text-gray-500 font-bold uppercase text-[8.5px] border-b border-gray-150">
                    <th className="py-1 px-1.5 text-left">Action Name</th>
                    <th className="py-1 px-1.5 text-left">Category</th>
                    <th className="py-1 px-1.5 text-center">Usage (30d)</th>
                    <th className="py-1 px-1.5 text-left">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {privilegedActions.map((pa) => {
                    const dotColor =
                      pa.riskLevel === 'Critical'
                        ? '#dc2626'
                        : pa.riskLevel === 'High'
                        ? '#ea580c'
                        : '#f59e0b';
                    return (
                      <tr key={pa.id} className="hover:bg-gray-50/50">
                        <td className="py-1 px-1.5 font-medium text-gray-800 whitespace-nowrap">
                          {pa.actionName}
                        </td>
                        <td className="py-1 px-1.5 text-gray-500 text-[9.5px] whitespace-nowrap">
                          {pa.category}
                        </td>
                        <td className="py-1 px-1.5 text-center font-bold text-gray-900">
                          {pa.usage30d}
                        </td>
                        <td className="py-1 px-1.5 whitespace-nowrap">
                          <span className="inline-flex items-center text-[9.5px] text-gray-800">
                            {renderDot(dotColor)}
                            {pa.riskLevel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('privileged-roles')}
              className="text-blue-600 hover:text-blue-800 hover:underline text-[10px] font-medium flex items-center gap-1 pt-1.5 mt-auto text-left"
            >
              <span>View all actions</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Card 1.5: Segregation of Duties (SoD) */}
          <div className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between h-[215px]">
            <div>
              <h3 className="text-xs font-bold text-[#741d35] tracking-tight mb-1.5">
                Segregation of Duties (SoD)
              </h3>
              <div className="flex items-center justify-between gap-2 py-1">
                {/* Donut Chart */}
                <div className="relative w-[95px] h-[95px] shrink-0 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Critical', value: sodConflicts.critical, color: '#dc2626' },
                          { name: 'High', value: sodConflicts.high, color: '#ea580c' },
                          { name: 'Medium', value: sodConflicts.medium, color: '#eab308' },
                          { name: 'Low', value: sodConflicts.low, color: '#10b981' },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={28}
                        outerRadius={44}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {[
                          { color: '#dc2626' },
                          { color: '#ea580c' },
                          { color: '#eab308' },
                          { color: '#10b981' },
                        ].map((entry, idx) => (
                          <Cell key={`sod-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-base font-bold text-gray-900 leading-none">
                      {sodConflicts.total}
                    </span>
                    <span className="text-[8px] text-gray-500 font-medium">Conflicts</span>
                  </div>
                </div>

                {/* Legend List */}
                <div className="flex-1 flex flex-col gap-1 text-[10px] pl-1">
                  <div className="flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-xs bg-[#dc2626] shrink-0" />
                      <span>Critical</span>
                    </div>
                    <span className="font-semibold text-gray-900">2 (33%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-xs bg-[#ea580c] shrink-0" />
                      <span>High</span>
                    </div>
                    <span className="font-semibold text-gray-900">2 (33%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-xs bg-[#eab308] shrink-0" />
                      <span>Medium</span>
                    </div>
                    <span className="font-semibold text-gray-900">1 (17%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-xs bg-[#10b981] shrink-0" />
                      <span>Low</span>
                    </div>
                    <span className="font-semibold text-gray-900">1 (17%)</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('sod-conflicts')}
              className="text-blue-600 hover:text-blue-800 hover:underline text-[10px] font-medium flex items-center gap-1 pt-1.5 mt-auto text-left"
            >
              <span>View all SoD conflicts</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: 5 Columns with Equal Height and Strict Alignment */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-5 gap-2.5 items-stretch">
          {/* Card 2.1: Role Assignments */}
          <div className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between h-[200px]">
            <div>
              <h3 className="text-xs font-bold text-[#741d35] tracking-tight mb-1.5">
                Role Assignments
              </h3>
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-50/90 text-gray-500 font-bold uppercase text-[8.5px] border-b border-gray-150">
                    <th className="py-1 px-1.5 text-left">Assignment Source</th>
                    <th className="py-1 px-1 text-center">Roles</th>
                    <th className="py-1 px-1 text-center">Users</th>
                    <th className="py-1 px-1 text-center">% of Total Users</th>
                    <th className="py-1 px-1 text-center">Trend (30d)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {roleAssignments.map((ra) => (
                    <tr key={ra.id} className="hover:bg-gray-50/50">
                      <td className="py-1 px-1.5 font-medium text-gray-800 whitespace-nowrap">{ra.source}</td>
                      <td className="py-1 px-1 text-center">{ra.rolesCount}</td>
                      <td className="py-1 px-1 text-center font-bold text-gray-900">{ra.membersCount}</td>
                      <td className="py-1 px-1 text-center">{ra.percentOfUsers}%</td>
                      <td className="py-1 px-1 text-center">
                        <svg className="w-10 h-3 inline-block" viewBox="0 0 40 12" fill="none">
                          <path
                            d="M 2 8 Q 10 2, 18 8 T 38 4"
                            stroke="#10b981"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('role-assignments')}
              className="text-blue-600 hover:text-blue-800 hover:underline text-[10px] font-medium flex items-center gap-1 pt-1.5 mt-auto text-left"
            >
              <span>View assignments</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Card 2.2: Role Review Campaigns */}
          <div className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between h-[200px]">
            <div>
              <h3 className="text-xs font-bold text-[#741d35] tracking-tight mb-1.5">
                Role Review Campaigns
              </h3>
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-50/90 text-gray-500 font-bold uppercase text-[8.5px] border-b border-gray-150">
                    <th className="py-1 px-1 text-left">Campaign Name</th>
                    <th className="py-1 px-1 text-left">Status</th>
                    <th className="py-1 px-1 text-left">Start Date</th>
                    <th className="py-1 px-1 text-left">End Date</th>
                    <th className="py-1 px-1 text-left">Scope</th>
                    <th className="py-1 px-1 text-left">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {reviewCampaigns.map((rc) => {
                    const isInProgress = rc.status === 'In Progress';
                    return (
                      <tr key={rc.id} className="hover:bg-gray-50/50">
                        <td className="py-1 px-1 font-medium text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                          {rc.campaignName}
                        </td>
                        <td className="py-1 px-1 whitespace-nowrap">
                          <span
                            className={`text-[9px] font-bold ${
                              isInProgress ? 'text-emerald-600' : 'text-gray-500'
                            }`}
                          >
                            {rc.status}
                          </span>
                        </td>
                        <td className="py-1 px-1 text-gray-600 text-[9px] whitespace-nowrap">
                          {rc.startDate}
                        </td>
                        <td className="py-1 px-1 text-gray-600 text-[9px] whitespace-nowrap">
                          {rc.endDate}
                        </td>
                        <td className="py-1 px-1 text-gray-600 text-[9px] whitespace-nowrap">
                          {rc.scope}
                        </td>
                        <td className="py-1 px-1 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <div className="w-9 bg-gray-200 h-1.5 rounded-full overflow-hidden shrink-0">
                              <div
                                className="bg-emerald-500 h-full rounded-full"
                                style={{ width: `${rc.completion}%` }}
                              />
                            </div>
                            <span className="text-[9px] text-gray-700 font-bold">
                              {rc.completion}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('role-reviews')}
              className="text-blue-600 hover:text-blue-800 hover:underline text-[10px] font-medium flex items-center gap-1 pt-1.5 mt-auto text-left"
            >
              <span>View all campaigns</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Card 2.3: Unused or Dormant Roles */}
          <div className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between h-[200px]">
            <div>
              <h3 className="text-xs font-bold text-[#741d35] tracking-tight mb-1.5">
                Unused or Dormant Roles
              </h3>
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-50/90 text-gray-500 font-bold uppercase text-[8.5px] border-b border-gray-150">
                    <th className="py-1 px-1.5 text-left">Role Name</th>
                    <th className="py-1 px-1.5 text-center">Days Inactive</th>
                    <th className="py-1 px-1.5 text-center">Members</th>
                    <th className="py-1 px-1.5 text-left">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {dormantRoles.map((dr) => (
                    <tr key={dr.id} className="hover:bg-gray-50/50">
                      <td className="py-1 px-1.5 font-medium text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                        {dr.roleName}
                      </td>
                      <td className="py-1 px-1.5 text-center font-bold text-gray-900">{dr.daysInactive}</td>
                      <td className="py-1 px-1.5 text-center text-gray-700">{dr.members}</td>
                      <td className="py-1 px-1.5 text-emerald-600 font-bold text-[9.5px] whitespace-nowrap">
                        {dr.riskLevel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('role-registry')}
              className="text-blue-600 hover:text-blue-800 hover:underline text-[10px] font-medium flex items-center gap-1 pt-1.5 mt-auto text-left"
            >
              <span>View all unused roles</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Card 2.4: Over-Permissive Roles */}
          <div className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between h-[200px]">
            <div>
              <h3 className="text-xs font-bold text-[#741d35] tracking-tight mb-1.5">
                Over-Permissive Roles
              </h3>
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-50/90 text-gray-500 font-bold uppercase text-[8.5px] border-b border-gray-150">
                    <th className="py-1 px-1.5 text-left">Role Name</th>
                    <th className="py-1 px-1.5 text-left">Privilege</th>
                    <th className="py-1 px-1.5 text-left">Risk Level</th>
                    <th className="py-1 px-1.5 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {overPermissiveRoles.map((opr) => {
                    const privDot = opr.privilege === 'High' ? '#ea580c' : '#f59e0b';
                    const riskDot = opr.riskLevel === 'Medium' ? '#f59e0b' : '#10b981';
                    return (
                      <tr key={opr.id} className="hover:bg-gray-50/50">
                        <td className="py-1 px-1.5 font-medium text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                          {opr.roleName}
                        </td>
                        <td className="py-1 px-1.5 whitespace-nowrap">
                          <span className="inline-flex items-center text-[9.5px] text-gray-800">
                            {renderDot(privDot)}
                            {opr.privilege}
                          </span>
                        </td>
                        <td className="py-1 px-1.5 whitespace-nowrap">
                          <span className="inline-flex items-center text-[9.5px] text-gray-800">
                            {renderDot(riskDot)}
                            {opr.riskLevel}
                          </span>
                        </td>
                        <td className="py-1 px-1.5 text-right font-bold text-gray-900">{opr.score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('role-registry')}
              className="text-blue-600 hover:text-blue-800 hover:underline text-[10px] font-medium flex items-center gap-1 pt-1.5 mt-auto text-left"
            >
              <span>View all over-permissive roles</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Card 2.5: Permission Gaps (Top 5) */}
          <div className="bg-white border border-gray-200 rounded p-2.5 shadow-2xs flex flex-col justify-between h-[200px]">
            <div>
              <h3 className="text-xs font-bold text-[#741d35] tracking-tight mb-1.5">
                Permission Gaps (Top 5)
              </h3>
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-50/90 text-gray-500 font-bold uppercase text-[8.5px] border-b border-gray-150">
                    <th className="py-1 px-1.5 text-left">Permission</th>
                    <th className="py-1 px-1.5 text-center">Impacted Roles</th>
                    <th className="py-1 px-1.5 text-left">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {permissionGaps.map((pg) => {
                    const dotColor = pg.priority === 'High' ? '#ea580c' : '#f59e0b';
                    return (
                      <tr key={pg.id} className="hover:bg-gray-50/50">
                        <td className="py-1 px-1.5 font-medium text-gray-800 whitespace-nowrap">
                          {pg.permission}
                        </td>
                        <td className="py-1 px-1.5 text-center font-bold text-gray-900">
                          {pg.impactedRoles}
                        </td>
                        <td className="py-1 px-1.5 whitespace-nowrap">
                          <span className="inline-flex items-center text-[9.5px] text-gray-800">
                            {renderDot(dotColor)}
                            {pg.priority}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('permission-sets')}
              className="text-blue-600 hover:text-blue-800 hover:underline text-[10px] font-medium flex items-center gap-1 pt-1.5 mt-auto text-left"
            >
              <span>View all gaps</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 3: 8 Analytics Cards aligned with perfect proportions */}
        {/* ========================================================================= */}
        <div className="flex flex-row items-stretch gap-2.5 w-full">
          {/* Widget 3.1: Role Privilege Distribution */}
          <div className="flex-1 bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between min-w-[160px] h-[145px]">
            <h4 className="text-[11px] font-bold text-[#741d35] tracking-tight mb-1 truncate">
              Role Privilege Distribution
            </h4>
            <div className="flex items-center gap-1.5 my-auto">
              <div className="relative w-[55px] h-[55px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Critical', value: 10, color: '#dc2626' },
                        { name: 'High', value: 78, color: '#ea580c' },
                        { name: 'Medium', value: 168, color: '#eab308' },
                        { name: 'Low', value: 88, color: '#10b981' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={16}
                      outerRadius={26}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {[
                        { color: '#dc2626' },
                        { color: '#ea580c' },
                        { color: '#eab308' },
                        { color: '#10b981' },
                      ].map((entry, idx) => (
                        <Cell key={`rpd-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold text-gray-900 leading-none">344</span>
                  <span className="text-[6.5px] text-gray-400">Total</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 text-[8.5px] leading-tight">
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                    <span>Critical</span>
                  </div>
                  <span className="font-bold text-gray-900">10 (3%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0" />
                    <span>High</span>
                  </div>
                  <span className="font-bold text-gray-900">78 (23%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#eab308] shrink-0" />
                    <span>Medium</span>
                  </div>
                  <span className="font-bold text-gray-900">168 (49%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                    <span>Low</span>
                  </div>
                  <span className="font-bold text-gray-900">88 (25%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3.2: Roles by Risk Level */}
          <div className="flex-1 bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between min-w-[160px] h-[145px]">
            <h4 className="text-[11px] font-bold text-[#741d35] tracking-tight mb-1 truncate">
              Roles by Risk Level
            </h4>
            <div className="flex items-center gap-1.5 my-auto">
              <div className="relative w-[55px] h-[55px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'High', value: 46, color: '#dc2626' },
                        { name: 'Medium', value: 124, color: '#f59e0b' },
                        { name: 'Low', value: 174, color: '#10b981' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={16}
                      outerRadius={26}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {[
                        { color: '#dc2626' },
                        { color: '#f59e0b' },
                        { color: '#10b981' },
                      ].map((entry, idx) => (
                        <Cell key={`rr-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold text-gray-900 leading-none">344</span>
                  <span className="text-[6.5px] text-gray-400">Total</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 text-[8.5px] leading-tight">
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                    <span>High</span>
                  </div>
                  <span className="font-bold text-gray-900">46 (13%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
                    <span>Medium</span>
                  </div>
                  <span className="font-bold text-gray-900">124 (36%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                    <span>Low</span>
                  </div>
                  <span className="font-bold text-gray-900">174 (51%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3.3: Roles by Lifecycle Status */}
          <div className="flex-1 bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between min-w-[160px] h-[145px]">
            <h4 className="text-[11px] font-bold text-[#741d35] tracking-tight mb-1 truncate">
              Roles by Lifecycle Status
            </h4>
            <div className="flex items-center gap-1.5 my-auto">
              <div className="relative w-[55px] h-[55px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Active', value: 286, color: '#10b981' },
                        { name: 'Conditional', value: 22, color: '#06b6d4' },
                        { name: 'Deprecated', value: 14, color: '#f59e0b' },
                        { name: 'Suspended', value: 12, color: '#ef4444' },
                        { name: 'Retired', value: 10, color: '#94a3b8' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={16}
                      outerRadius={26}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {[
                        { color: '#10b981' },
                        { color: '#06b6d4' },
                        { color: '#f59e0b' },
                        { color: '#ef4444' },
                        { color: '#94a3b8' },
                      ].map((entry, idx) => (
                        <Cell key={`rl-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold text-gray-900 leading-none">344</span>
                  <span className="text-[6.5px] text-gray-400">Total</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 text-[8px] leading-tight">
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                    <span>Active</span>
                  </div>
                  <span className="font-bold text-gray-900">286 (83%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shrink-0" />
                    <span>Conditional</span>
                  </div>
                  <span className="font-bold text-gray-900">22 (6%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
                    <span>Deprecated</span>
                  </div>
                  <span className="font-bold text-gray-900">14 (4%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
                    <span>Suspended</span>
                  </div>
                  <span className="font-bold text-gray-900">12 (4%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] shrink-0" />
                    <span>Retired</span>
                  </div>
                  <span className="font-bold text-gray-900">10 (3%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3.4: Assignment Source Distribution */}
          <div className="flex-1 bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between min-w-[160px] h-[145px]">
            <h4 className="text-[11px] font-bold text-[#741d35] tracking-tight mb-1 truncate">
              Assignment Source Distribution
            </h4>
            <div className="flex items-center gap-1.5 my-auto">
              <div className="relative w-[55px] h-[55px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Direct', value: 412, color: '#10b981' },
                        { name: 'Group / Membership', value: 568, color: '#8b5cf6' },
                        { name: 'Rule-Based', value: 314, color: '#06b6d4' },
                        { name: 'Temporary', value: 64, color: '#f59e0b' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={16}
                      outerRadius={26}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {[
                        { color: '#10b981' },
                        { color: '#8b5cf6' },
                        { color: '#06b6d4' },
                        { color: '#f59e0b' },
                      ].map((entry, idx) => (
                        <Cell key={`asd-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[9px] font-bold text-gray-900 leading-none">1,358</span>
                  <span className="text-[6.5px] text-gray-400">Users</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 text-[8px] leading-tight">
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                    <span className="truncate">Direct</span>
                  </div>
                  <span className="font-bold text-gray-900 whitespace-nowrap">412 (32%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] shrink-0" />
                    <span className="truncate">Group/Membership</span>
                  </div>
                  <span className="font-bold text-gray-900 whitespace-nowrap">568 (44%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shrink-0" />
                    <span className="truncate">Rule-Based</span>
                  </div>
                  <span className="font-bold text-gray-900 whitespace-nowrap">314 (24%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
                    <span className="truncate">Temporary</span>
                  </div>
                  <span className="font-bold text-gray-900 whitespace-nowrap">64 (5%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3.5: Privilege Heatmap (Roles vs Privilege) */}
          <div className="flex-[1.5] bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between min-w-[215px] h-[145px]">
            <h4 className="text-[10.5px] font-bold text-[#741d35] tracking-tight mb-1 truncate">
              Privilege Heatmap (Roles vs Privilege)
            </h4>
            <div className="w-full my-auto">
              <table className="w-full text-center border-collapse text-[8.5px]">
                <thead>
                  <tr className="text-gray-500 font-bold uppercase">
                    <th className="p-0.5"></th>
                    <th className="p-0.5 text-gray-600">Critical</th>
                    <th className="p-0.5 text-gray-600">High</th>
                    <th className="p-0.5 text-gray-600">Medium</th>
                    <th className="p-0.5 text-gray-600">Low</th>
                  </tr>
                </thead>
                <tbody className="font-bold text-gray-800">
                  <tr>
                    <td className="p-0.5 text-left text-gray-600 font-normal whitespace-nowrap text-[8px]">
                      High Risk
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#f87171]/80 text-gray-900 rounded py-0.5">6</div>
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#fb923c]/80 text-gray-900 rounded py-0.5">28</div>
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#fde047]/80 text-gray-900 rounded py-0.5">24</div>
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#bbf7d0]/80 text-gray-900 rounded py-0.5">10</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-0.5 text-left text-gray-600 font-normal whitespace-nowrap text-[8px]">
                      Medium Risk
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#fca5a5]/70 text-gray-900 rounded py-0.5">4</div>
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#fdba74]/70 text-gray-900 rounded py-0.5">32</div>
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#fef08a]/80 text-gray-900 rounded py-0.5">64</div>
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#bbf7d0]/80 text-gray-900 rounded py-0.5">24</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-0.5 text-left text-gray-600 font-normal whitespace-nowrap text-[8px]">
                      Low Risk
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#fee2e2]/70 text-gray-700 rounded py-0.5">0</div>
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#fed7aa]/70 text-gray-900 rounded py-0.5">18</div>
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#d9f99d]/80 text-gray-900 rounded py-0.5">80</div>
                    </td>
                    <td className="p-0.5">
                      <div className="bg-[#86efac]/90 text-gray-900 rounded py-0.5">54</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Widget 3.6: Role Ownership Coverage */}
          <div className="flex-1 bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between min-w-[160px] h-[145px]">
            <h4 className="text-[11px] font-bold text-[#741d35] tracking-tight mb-1 truncate">
              Role Ownership Coverage
            </h4>
            <div className="flex items-center gap-1.5 my-auto">
              <div className="relative w-[55px] h-[55px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'With Owner', value: 268, color: '#10b981' },
                        { name: 'No Owner', value: 76, color: '#e2e8f0' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={16}
                      outerRadius={26}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#e2e8f0" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold text-gray-900 leading-none">78%</span>
                  <span className="text-[6px] text-gray-500 font-medium">With Owner</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1 text-[8.5px] leading-tight">
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-xs bg-[#10b981] shrink-0" />
                    <span>With Owner</span>
                  </div>
                  <span className="font-bold text-gray-900">268 (78%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-xs bg-[#cbd5e1] shrink-0" />
                    <span>No Owner</span>
                  </div>
                  <span className="font-bold text-gray-900">76 (22%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3.7: Role to Access Profile Coverage */}
          <div className="flex-1 bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between min-w-[160px] h-[145px]">
            <h4 className="text-[11px] font-bold text-[#741d35] tracking-tight mb-1 truncate">
              Role to Access Profile Coverage
            </h4>
            <div className="flex items-center gap-1.5 my-auto">
              <div className="relative w-[55px] h-[55px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Covered', value: 316, color: '#10b981' },
                        { name: 'Unlinked', value: 28, color: '#e2e8f0' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={16}
                      outerRadius={26}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#e2e8f0" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold text-gray-900 leading-none">92%</span>
                  <span className="text-[6px] text-gray-500 font-medium">Covered</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1 text-[8.5px] leading-tight">
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-xs bg-[#10b981] shrink-0" />
                    <span>Covered</span>
                  </div>
                  <span className="font-bold text-gray-900">316 (92%)</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-xs bg-[#cbd5e1] shrink-0" />
                    <span>Unlinked</span>
                  </div>
                  <span className="font-bold text-gray-900">28 (8%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3.8: Average Time to Review */}
          <div className="flex-1 bg-white border border-gray-200 rounded p-2 shadow-2xs flex flex-col justify-between items-center text-center min-w-[145px] h-[145px]">
            <h4 className="text-[11px] font-bold text-[#741d35] tracking-tight mb-0.5">
              Average Time to Review
            </h4>
            <div className="my-auto flex flex-col items-center">
              <span className="text-2xl font-extrabold text-gray-900 leading-none">28</span>
              <span className="text-[9px] text-gray-500 font-bold mt-0.5">Days</span>
              <span className="text-[8px] text-gray-500 font-normal mt-0.5">Target: &le; 30 days</span>
            </div>
            {/* Purple Sparkline Wave */}
            <div className="w-full px-1 mt-1">
              <svg className="w-full h-3" viewBox="0 0 80 12" fill="none" preserveAspectRatio="none">
                <path
                  d="M 2 6 Q 15 1, 28 6 T 54 6 T 78 4"
                  stroke="#a855f7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
