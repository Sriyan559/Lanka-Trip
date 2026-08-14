'use client';

import React from 'react';
import { RolesPermissionsFullData } from '@/lib/administration/roles-permissions/roles-permissions.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { RoleHierarchyTree } from '@/components/shared/Hierarchy/RoleHierarchyTree';
import { PrivilegeHeatmap } from '@/components/shared/Chart/PrivilegeHeatmap';
import { ShieldCheck, Lock, Key, Layers, Clock, AlertTriangle, Users } from 'lucide-react';

interface RolesPermissionsTabContentProps {
  activeTab: string;
  data: RolesPermissionsFullData;
  onNavigateTab: (tabId: string) => void;
}

export function RolesPermissionsTabContent({ activeTab, data }: RolesPermissionsTabContentProps) {
  const {
    roles,
    permissionSets,
    effectivePermissionsByRole,
    accessProfiles,
    scopeTemplates,
    assignmentRules,
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
    privilegeHeatmap,
  } = data;

  switch (activeTab) {
    case 'role-registry':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Complete Enterprise Role Registry">
            <DataTable
              columns={[
                { key: 'name', header: 'Role Name', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
                { key: 'code', header: 'Role Code', cell: (r) => <span className="font-mono text-gray-500 text-[9px]">{r.code}</span> },
                { key: 'category', header: 'Category' },
                { key: 'businessUnit', header: 'Business Unit' },
                { key: 'privilege', header: 'Privilege' },
                { key: 'riskLevel', header: 'Risk Level', cell: (r) => <StatusBadge status={r.riskLevel} size="xs" /> },
                { key: 'lifecycle', header: 'Lifecycle', cell: (r) => <StatusBadge status={r.lifecycle} size="xs" /> },
                { key: 'assignmentSource', header: 'Assignment Source' },
                { key: 'members', header: 'Members', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.members}</span> },
                { key: 'modified', header: 'Last Modified' },
              ]}
              data={roles}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'permission-sets':
      return (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <SectionCard title="Permission Sets Directory">
              <DataTable
                columns={[
                  { key: 'permissionSet', header: 'Permission Set', cell: (r) => <span className="font-bold text-gray-900">{r.permissionSet}</span> },
                  { key: 'category', header: 'Category' },
                  { key: 'privilege', header: 'Privilege', align: 'center' },
                  { key: 'riskLevel', header: 'Risk Level', align: 'center', cell: (r) => <StatusBadge status={r.riskLevel} size="xs" /> },
                ]}
                data={permissionSets}
                density="normal"
                searchable
                pagination
              />
            </SectionCard>

            <SectionCard title="Permission Gaps & High-Impact Permissions">
              <DataTable
                columns={[
                  { key: 'permission', header: 'Permission', cell: (r) => <span className="font-bold text-gray-900">{r.permission}</span> },
                  { key: 'impactedRoles', header: 'Impacted Roles', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.impactedRoles}</span> },
                  { key: 'priority', header: 'Priority', align: 'center', cell: (r) => <StatusBadge status={r.priority} size="xs" /> },
                ]}
                data={permissionGaps}
                density="normal"
              />
            </SectionCard>
          </div>
        </div>
      );

    case 'access-profiles':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Enterprise Access Profiles">
            <DataTable
              columns={[
                { key: 'name', header: 'Access Profile', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
                { key: 'description', header: 'Description' },
                { key: 'linkedRoles', header: 'Linked Roles', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.linkedRoles}</span> },
                { key: 'members', header: 'Members', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.members}</span> },
              ]}
              data={accessProfiles}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'scope-templates':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Operating Scope Templates">
            <DataTable
              columns={[
                { key: 'name', header: 'Scope Template', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
                { key: 'scopeType', header: 'Scope Type' },
                { key: 'appliesTo', header: 'Applies To' },
                { key: 'linkedRoles', header: 'Linked Roles', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.linkedRoles}</span> },
              ]}
              data={scopeTemplates}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'assignment-rules':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Automated Role Assignment Rules">
            <DataTable
              columns={[
                { key: 'ruleName', header: 'Rule Name', cell: (r) => <span className="font-bold text-gray-900">{r.ruleName}</span> },
                { key: 'appliesTo', header: 'Applies To' },
                { key: 'conditionSummary', header: 'Condition Summary', cell: (r) => <span className="font-mono text-[10px] text-gray-600">{r.conditionSummary}</span> },
                { key: 'members', header: 'Members Covered', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.members}</span> },
              ]}
              data={assignmentRules}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'inheritance':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Role Inheritance Topology Tree">
            <div className="p-4 flex items-center justify-center">
              <RoleHierarchyTree root={hierarchyRoot} />
            </div>
          </SectionCard>

          <SectionCard title="Inheritance Analytics & Metrics">
            <div className="space-y-3 p-2 text-xs">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-150">
                <span className="text-gray-600">Roles with Inherited Permissions</span>
                <span className="font-bold text-gray-900">{inheritanceAnalysis.rolesWithInherited}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-150">
                <span className="text-gray-600">Total Inherited Permissions</span>
                <span className="font-bold text-gray-900">{inheritanceAnalysis.totalInherited}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-150">
                <span className="text-gray-600">Average Inherited per Role</span>
                <span className="font-bold text-gray-900">{inheritanceAnalysis.avgInheritedPerRole}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-150">
                <span className="text-gray-600">Orphaned Child Roles</span>
                <span className="font-bold text-gray-900">{inheritanceAnalysis.orphanedChildRoles}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-emerald-50 rounded border border-emerald-200">
                <span className="text-emerald-800 font-semibold">Max Inheritance Depth</span>
                <span className="font-extrabold text-emerald-700">{inheritanceAnalysis.inheritanceDepth}</span>
              </div>
            </div>
          </SectionCard>
        </div>
      );

    case 'privileged-roles':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Privileged Roles Directory">
            <DataTable
              columns={[
                { key: 'roleName', header: 'Role Name', cell: (r) => <span className="font-bold text-gray-900">{r.roleName}</span> },
                { key: 'privilege', header: 'Privilege', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.privilege}</span> },
                { key: 'members', header: 'Members', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.members}</span> },
                { key: 'lastReviewed', header: 'Last Reviewed' },
                { key: 'nextReview', header: 'Next Review' },
              ]}
              data={privilegedRoles}
              density="normal"
            />
          </SectionCard>

          <SectionCard title="Privileged Administrative Actions">
            <DataTable
              columns={[
                { key: 'actionName', header: 'Action Name', cell: (r) => <span className="font-bold text-gray-900">{r.actionName}</span> },
                { key: 'category', header: 'Category' },
                { key: 'usage30d', header: 'Usage (30d)', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.usage30d}</span> },
                { key: 'riskLevel', header: 'Risk Level', align: 'center', cell: (r) => <StatusBadge status={r.riskLevel} size="xs" /> },
              ]}
              data={privilegedActions}
              density="normal"
            />
          </SectionCard>
        </div>
      );

    case 'sod-conflicts':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <SectionCard title="Segregation of Duties Conflicts Distribution">
            <ReusableDonutChart
              data={[
                { name: 'Critical', value: sodConflicts.critical, color: '#e11d48' },
                { name: 'High', value: sodConflicts.high, color: '#f97316' },
                { name: 'Medium', value: sodConflicts.medium, color: '#eab308' },
                { name: 'Low', value: sodConflicts.low, color: '#10b981' },
              ]}
              totalValue={sodConflicts.total}
              totalLabel="Conflicts"
              height={180}
            />
          </SectionCard>

          <div className="lg:col-span-2">
            <SectionCard title="Active Segregation of Duties (SoD) Violations">
              <div className="space-y-2 p-2 text-xs">
                <div className="p-3 bg-rose-50 border border-rose-200 rounded flex items-center justify-between">
                  <div>
                    <span className="font-bold text-rose-900 block text-xs">Buyer & Supplier Payout Approver Overlap</span>
                    <span className="text-[10px] text-rose-700">Conflict between PO Creation and Payment Authorization roles</span>
                  </div>
                  <StatusBadge status="Critical" size="sm" />
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded flex items-center justify-between">
                  <div>
                    <span className="font-bold text-rose-900 block text-xs">Price Override & Cashier Balance Overlap</span>
                    <span className="text-[10px] text-rose-700">Conflict in retail POS pricing override and register closing</span>
                  </div>
                  <StatusBadge status="Critical" size="sm" />
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded flex items-center justify-between">
                  <div>
                    <span className="font-bold text-amber-900 block text-xs">Catalog Manager & QA Certification Overlap</span>
                    <span className="text-[10px] text-amber-700">Product approval policy violation</span>
                  </div>
                  <StatusBadge status="High" size="sm" />
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      );

    case 'role-reviews':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Access Review Campaigns">
            <DataTable
              columns={[
                { key: 'campaignName', header: 'Campaign Name', cell: (r) => <span className="font-bold text-gray-900">{r.campaignName}</span> },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                { key: 'startDate', header: 'Start Date' },
                { key: 'endDate', header: 'End Date' },
                { key: 'scope', header: 'Scope' },
                {
                  key: 'completion',
                  header: 'Completion',
                  cell: (r) => (
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${r.completion}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-700">{r.completion}%</span>
                    </div>
                  ),
                },
              ]}
              data={reviewCampaigns}
              density="normal"
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'analytics':
    default:
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <SectionCard title="Role Privilege Distribution">
            <ReusableDonutChart
              data={[
                { name: 'Critical', value: 10, color: '#e11d48' },
                { name: 'High', value: 38, color: '#f97316' },
                { name: 'Medium', value: 168, color: '#eab308' },
                { name: 'Low', value: 88, color: '#10b981' },
              ]}
              totalValue="344"
              totalLabel="Total"
              height={180}
            />
          </SectionCard>

          <SectionCard title="Roles by Risk Level">
            <ReusableDonutChart
              data={[
                { name: 'High', value: 46, color: '#e11d48' },
                { name: 'Medium', value: 126, color: '#f59e0b' },
                { name: 'Low', value: 172, color: '#10b981' },
              ]}
              totalValue="344"
              totalLabel="Total"
              height={180}
            />
          </SectionCard>

          <SectionCard title="Roles by Lifecycle Status">
            <ReusableDonutChart
              data={[
                { name: 'Active', value: 286, color: '#10b981' },
                { name: 'Conditional', value: 22, color: '#8b5cf6' },
                { name: 'Deprecated', value: 14, color: '#f59e0b' },
                { name: 'Suspended', value: 12, color: '#e11d48' },
                { name: 'Retired', value: 10, color: '#64748b' },
              ]}
              totalValue="344"
              totalLabel="Total"
              height={180}
            />
          </SectionCard>

          <SectionCard title="Assignment Source Distribution">
            <ReusableDonutChart
              data={[
                { name: 'Direct', value: 412, color: '#2563eb' },
                { name: 'Group / Mem', value: 568, color: '#8b5cf6' },
                { name: 'Rule-Based', value: 314, color: '#10b981' },
                { name: 'Temporary', value: 64, color: '#f59e0b' },
              ]}
              totalValue="1,358"
              totalLabel="Users"
              height={180}
            />
          </SectionCard>
        </div>
      );
  }
}
