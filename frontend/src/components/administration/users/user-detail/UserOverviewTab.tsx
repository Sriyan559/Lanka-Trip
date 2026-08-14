'use client';

import React from 'react';
import { UserDetailFullData } from '@/lib/administration/users/user-detail.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { CheckCircle2, TrendingUp, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface UserOverviewTabProps {
  data: UserDetailFullData;
  onNavigateAudit?: () => void;
}

export function UserOverviewTab({ data }: UserOverviewTabProps) {
  const {
    profile,
    healthBreakdown,
    lifecycle,
    memberships,
    scopeInheritance,
    assignedRoles,
    effectiveAccess,
    privilegedPermissions,
    accessAttributions,
    authPosture,
    mfaMethods,
    signInEvents,
    temporaryGrants,
    restrictions,
    governanceGates,
    ownedResources,
    adminActivities,
    userActivities,
    ecosystemGates,
    accessApprovals,
    activityTrends,
    accessChangeTrends,
  } = data;

  // 1. Memberships table columns
  const membershipColumns: ColumnDef<any>[] = [
    { key: 'tenant', header: 'Tenant', cell: (r) => <span className="font-bold text-gray-900">{r.tenant}</span> },
    { key: 'ecosystem', header: 'Ecosystem' },
    { key: 'businessUnit', header: 'Business Unit' },
    { key: 'channel', header: 'Channel' },
    { key: 'membershipType', header: 'Membership', cell: (r) => <StatusBadge status={r.membershipType} size="xs" /> },
    { key: 'role', header: 'Role', cell: (r) => <span className="font-semibold text-gray-900">{r.role}</span> },
    { key: 'scope', header: 'Scope' },
    { key: 'grantedBy', header: 'Granted By' },
    { key: 'grantedOn', header: 'Granted On' },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
  ];

  // 2. Scope inheritance columns
  const scopeColumns: ColumnDef<any>[] = [
    { key: 'tenantEcosystem', header: 'Tenant / Ecosystem', cell: (r) => <span className="font-bold text-gray-900">{r.tenantEcosystem}</span> },
    { key: 'membershipType', header: 'Membership Type' },
    { key: 'platformChannel', header: 'Platform / Channel' },
    { key: 'accessToScope', header: 'Access To Scope' },
    { key: 'productionEnvironment', header: 'Production Environment', cell: (r) => <StatusBadge status={r.productionEnvironment} size="xs" /> },
  ];

  // 3. Assigned Roles columns
  const assignedRolesColumns: ColumnDef<any>[] = [
    { key: 'roleName', header: 'Role Name', cell: (r) => <span className="font-bold text-gray-900">{r.roleName}</span> },
    { key: 'roleType', header: 'Role Type' },
    { key: 'scope', header: 'Scope' },
    { key: 'primary', header: 'Primary', align: 'center', cell: (r) => r.primary ? <span className="text-emerald-700 font-bold">Yes</span> : <span className="text-gray-400">No</span> },
    { key: 'grantedOn', header: 'Granted On' },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
  ];

  // 4. Effective Access matrix columns
  const effectiveAccessColumns: ColumnDef<any>[] = [
    { key: 'accessCategory', header: 'Access Category', cell: (r) => <span className="font-bold text-gray-900">{r.accessCategory}</span> },
    { key: 'view', header: 'View', align: 'center', cell: (r) => <StatusBadge status={r.view} size="xs" /> },
    { key: 'configure', header: 'Configure', align: 'center', cell: (r) => <StatusBadge status={r.configure} size="xs" /> },
    { key: 'request', header: 'Request', align: 'center', cell: (r) => <StatusBadge status={r.request} size="xs" /> },
    { key: 'approve', header: 'Approve', align: 'center', cell: (r) => <StatusBadge status={r.approve} size="xs" /> },
    { key: 'productionAccess', header: 'Production Access', align: 'center', cell: (r) => <StatusBadge status={r.productionAccess} size="xs" /> },
    { key: 'export', header: 'Export', align: 'center', cell: (r) => <StatusBadge status={r.export} size="xs" /> },
    { key: 'audit', header: 'Audit', align: 'center', cell: (r) => <StatusBadge status={r.audit} size="xs" /> },
  ];

  // 5. Privileged Permissions columns
  const privilegedColumns: ColumnDef<any>[] = [
    { key: 'permission', header: 'Permission', cell: (r) => <span className="font-bold text-gray-900">{r.permission}</span> },
    { key: 'scopeResource', header: 'Scope / Resource' },
    { key: 'stepUp', header: 'Step-Up', align: 'center' },
    { key: 'approval', header: 'Approval', align: 'center' },
    { key: 'lastUsed', header: 'Last Used' },
    { key: 'risk', header: 'Risk', align: 'center', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
  ];

  // 6. Sign-in Activity columns
  const signInColumns: ColumnDef<any>[] = [
    { key: 'timestamp', header: 'Date / Time (IST)', cell: (r) => <span className="font-semibold text-gray-900">{r.timestamp}</span> },
    { key: 'location', header: 'Location' },
    { key: 'method', header: 'Method' },
    { key: 'mfa', header: 'MFA' },
    { key: 'environment', header: 'Environment' },
    { key: 'deviceChannel', header: 'Device / Channel' },
    { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
    { key: 'sessionEnd', header: 'Session End', cell: (r) => <StatusBadge status={r.sessionEnd} size="xs" /> },
  ];

  // 7. Temporary Grants columns
  const tempGrantColumns: ColumnDef<any>[] = [
    { key: 'grantAccess', header: 'Grant / Access', cell: (r) => <span className="font-bold text-gray-900">{r.grantAccess}</span> },
    { key: 'reason', header: 'Reason' },
    { key: 'approver', header: 'Approver' },
    { key: 'start', header: 'Start' },
    { key: 'ends', header: 'Ends' },
    { key: 'autoRevoke', header: 'Auto-Revoke', align: 'center', cell: (r) => r.autoRevoke ? 'Yes' : 'No' },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
  ];

  // 8. Admin Activity columns
  const adminActivityColumns: ColumnDef<any>[] = [
    { key: 'timestamp', header: 'Date / Time (IST)', cell: (r) => <span className="font-semibold text-gray-900">{r.timestamp}</span> },
    { key: 'action', header: 'Action', cell: (r) => <span className="font-bold text-gray-900">{r.action}</span> },
    { key: 'scope', header: 'Scope' },
    { key: 'details', header: 'Details', cell: (r) => <span className="truncate max-w-[150px] inline-block">{r.details}</span> },
    { key: 'device', header: 'Device' },
  ];

  // 9. User Activity columns
  const userActivityColumns: ColumnDef<any>[] = [
    {
      key: 'auditId',
      header: 'Audit ID',
      cell: (r) => (
        <Link
          href={`/admin/administration/reports-audit?auditRef=${r.auditId}`}
          className="text-[#741d35] font-bold hover:underline"
        >
          {r.auditId}
        </Link>
      ),
    },
    { key: 'timestamp', header: 'Date / Time (IST)' },
    { key: 'event', header: 'Event', cell: (r) => <span className="font-semibold text-gray-900">{r.event}</span> },
    { key: 'scope', header: 'Scope' },
    { key: 'resourcePath', header: 'Resource / Path' },
    { key: 'outcome', header: 'Outcome', cell: (r) => <StatusBadge status={r.outcome} size="xs" /> },
  ];

  // 10. Access Approvals columns
  const approvalColumns: ColumnDef<any>[] = [
    { key: 'approvalType', header: 'Approval Type', cell: (r) => <span className="font-bold text-gray-900">{r.approvalType}</span> },
    { key: 'approver', header: 'Approver' },
    { key: 'enactedOn', header: 'Enacted On' },
    { key: 'expires', header: 'Expires' },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Top Triple Panel: Health Overview, Profile, Lifecycle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* User Health Overview */}
        <SectionCard title="User Health Overview">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                  <th className="pb-1.5">Area</th>
                  <th className="pb-1.5 text-center">Score</th>
                  <th className="pb-1.5 text-center">Trend</th>
                  <th className="pb-1.5">Last Checked</th>
                  <th className="pb-1.5">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {healthBreakdown.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60">
                    <td className="py-1 font-semibold text-gray-900">{row.dimension}</td>
                    <td className="py-1 text-center">
                      <span className="text-emerald-700 font-bold">{row.score}</span>
                    </td>
                    <td className="py-1 text-center text-emerald-600">
                      <TrendingUp className="w-3 h-3 inline" />
                    </td>
                    <td className="py-1 text-gray-500 whitespace-nowrap">{row.lastChecked}</td>
                    <td className="py-1 text-gray-600 truncate max-w-[100px]">{row.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-150 flex items-center justify-between text-[11px]">
            <span className="font-bold text-gray-700">Overall Health Score</span>
            <span className="font-extrabold text-emerald-700">96 / 100 (Excellent)</span>
          </div>
        </SectionCard>

        {/* Identity Profile */}
        <SectionCard title="Identity Profile">
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-[10px]">
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Preferred Name</span>
              <span className="font-bold text-gray-900">{profile.preferredName}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Email</span>
              <span className="font-semibold text-gray-900 truncate block" title={profile.email}>{profile.email}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Username</span>
              <span className="font-semibold text-gray-800 truncate block" title={profile.internalUsername}>{profile.internalUsername}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Person ID</span>
              <span className="font-semibold text-gray-800">{profile.personId}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Department</span>
              <span className="font-semibold text-gray-800">{profile.department}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Title</span>
              <span className="font-semibold text-gray-800">{profile.title}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Manager</span>
              <span className="font-semibold text-gray-800">{profile.manager}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Location</span>
              <span className="font-semibold text-gray-800">{profile.location}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Employment Type</span>
              <span className="font-semibold text-gray-800">{profile.employmentType}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Security Domain</span>
              <span className="font-semibold text-gray-800">{profile.securityDomain}</span>
            </div>
          </div>
        </SectionCard>

        {/* Account Lifecycle */}
        <SectionCard title="Account Lifecycle">
          {/* Stepper horizontal line */}
          <div className="relative flex items-center justify-between mb-3 px-1 pt-1">
            <div className="absolute left-3 right-3 top-2.5 h-0.5 bg-emerald-500 -z-0" />
            <div className="flex flex-col items-center relative z-10">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
              <span className="text-[8px] font-bold text-gray-700 mt-1">Created</span>
              <span className="text-[8px] text-gray-400">Jan 14, 2026</span>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
              <span className="text-[8px] font-bold text-gray-700 mt-1">Activated</span>
              <span className="text-[8px] text-gray-400">Jan 14, 2026</span>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
              <span className="text-[8px] font-bold text-gray-700 mt-1">Admin Assigned</span>
              <span className="text-[8px] text-gray-400">Jan 14, 2026</span>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
              <span className="text-[8px] font-bold text-gray-700 mt-1">Privileged Access</span>
              <span className="text-[8px] text-gray-400">Jan 14, 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] border-t border-gray-100 pt-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Initial Sign-on:</span>
              <span className="font-semibold text-gray-800">{lifecycle.initialSignOn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Review:</span>
              <span className="font-semibold text-gray-800">{lifecycle.lastReview}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Activated On:</span>
              <span className="font-semibold text-gray-800">{lifecycle.activatedOn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Next Review:</span>
              <span className="font-semibold text-gray-800">{lifecycle.nextReview}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Role Change:</span>
              <span className="font-semibold text-gray-800">{lifecycle.lastRoleChange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Account Expiry:</span>
              <span className="font-semibold text-gray-800">{lifecycle.accountExpiry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Access Change:</span>
              <span className="font-semibold text-gray-800">{lifecycle.lastAccessChange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Active Eligibility:</span>
              <span className="font-semibold text-gray-800">{lifecycle.activeEligibility}</span>
            </div>
            <div className="flex justify-between col-span-2 pt-1 border-t border-gray-100 font-bold text-gray-700">
              <span>Account Age: {lifecycle.accountAgeDays} days</span>
              <span>Active Duration: {lifecycle.activeDurationDays} days</span>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* 2. Tenant, Ecosystem & Organizational Memberships */}
      <SectionCard title="Tenant, Ecosystem & Organizational Memberships">
        <DataTable
          columns={membershipColumns}
          data={memberships}
          density="compact"
          sortable
        />
      </SectionCard>

      {/* 3. Membership & Scope Inheritance + Assigned Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <SectionCard
          title="Membership & Scope Inheritance"
          actions={
            <div className="flex items-center gap-2 text-[9px] text-gray-500">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Direct</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Inherited</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Conditional</span>
            </div>
          }
        >
          <DataTable
            columns={scopeColumns}
            data={scopeInheritance}
            density="compact"
            sortable
          />
        </SectionCard>

        <SectionCard title="Assigned Roles">
          <DataTable
            columns={assignedRolesColumns}
            data={assignedRoles}
            density="compact"
            sortable
          />
        </SectionCard>
      </div>

      {/* 4. Effective Administrative Access + Privileged Permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <SectionCard title="Effective Administrative Access">
          <DataTable
            columns={effectiveAccessColumns}
            data={effectiveAccess}
            density="compact"
            sortable
          />
        </SectionCard>

        <SectionCard title="Privileged Permissions">
          <DataTable
            columns={privilegedColumns}
            data={privilegedPermissions}
            density="compact"
            sortable
          />
        </SectionCard>
      </div>

      {/* 5. Triple Row: Why This User Has Access, Auth Posture, MFA Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SectionCard title="Why This User Has Access">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                  <th className="pb-1.5">Source Type</th>
                  <th className="pb-1.5">Source Name</th>
                  <th className="pb-1.5">Inherited From</th>
                  <th className="pb-1.5 text-center">Confidence</th>
                  <th className="pb-1.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {accessAttributions.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/60">
                    <td className="py-1.5 font-bold text-gray-900">{row.sourceType}</td>
                    <td className="py-1.5 text-gray-800 truncate max-w-[100px]">{row.sourceName}</td>
                    <td className="py-1.5 text-gray-500 truncate max-w-[100px]">{row.inheritedFrom}</td>
                    <td className="py-1.5 text-center text-emerald-700 font-bold">{row.confidence}</td>
                    <td className="py-1.5"><StatusBadge status={row.status} size="xs" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Authentication & Sign-in Posture">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                  <th className="pb-1.5">Method</th>
                  <th className="pb-1.5">Status</th>
                  <th className="pb-1.5">Last Used</th>
                  <th className="pb-1.5 text-center">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {authPosture.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/60">
                    <td className="py-1.5 font-bold text-gray-900">{row.method}</td>
                    <td className="py-1.5 text-gray-700">{row.status}</td>
                    <td className="py-1.5 text-gray-500 whitespace-nowrap">{row.lastUsed}</td>
                    <td className="py-1.5 text-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="MFA Methods">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                  <th className="pb-1.5">Method</th>
                  <th className="pb-1.5 text-center">Enrolled</th>
                  <th className="pb-1.5 text-center">Verified</th>
                  <th className="pb-1.5">Last Used</th>
                  <th className="pb-1.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {mfaMethods.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/60">
                    <td className="py-1.5 font-bold text-gray-900">{row.method}</td>
                    <td className="py-1.5 text-center text-emerald-700 font-bold">{row.enrolled ? 'Yes' : 'No'}</td>
                    <td className="py-1.5 text-center text-emerald-700 font-bold">{row.verified ? 'Yes' : 'No'}</td>
                    <td className="py-1.5 text-gray-500 whitespace-nowrap">{row.lastUsed}</td>
                    <td className="py-1.5"><StatusBadge status={row.status} size="xs" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* 6. Sign-in Activity (Last 10 Events) */}
      <SectionCard title="Sign-in Activity (Last 10 Events)">
        <DataTable
          columns={signInColumns}
          data={signInEvents}
          density="compact"
          sortable
        />
      </SectionCard>

      {/* 7. Trend Charts Row: Activity Sessions + Access Change History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <SectionCard title="Activity Sessions (Last 30 Days)">
          <ResponsiveLineChart
            data={activityTrends}
            series={[
              { key: 'login', label: 'Login', color: '#2563eb' },
              { key: 'configChanges', label: 'Config Changes', color: '#10b981' },
              { key: 'approvalActions', label: 'Approval Actions', color: '#8b5cf6' },
              { key: 'exports', label: 'Exports', color: '#f59e0b' },
              { key: 'privilegeActions', label: 'Privilege Actions', color: '#e11d48' },
            ]}
            height={190}
          />
        </SectionCard>

        <SectionCard title="Access Change History (Last 30 Days)">
          <ResponsiveLineChart
            data={accessChangeTrends}
            series={[
              { key: 'added', label: 'Added', color: '#2563eb' },
              { key: 'removed', label: 'Removed', color: '#e11d48' },
              { key: 'modified', label: 'Modified', color: '#8b5cf6' },
            ]}
            height={190}
          />
        </SectionCard>
      </div>

      {/* 8. Temporary Access, Restrictions & Controls, Governance Gates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <SectionCard title="Temporary Access & Time-Bound Grants">
          <DataTable
            columns={tempGrantColumns}
            data={temporaryGrants}
            density="compact"
            sortable
          />
        </SectionCard>

        <SectionCard title="Restrictions & Controls">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                  <th className="pb-1.5">Control Category</th>
                  <th className="pb-1.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {restrictions.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/60">
                    <td className="py-2">
                      <span className="font-bold text-gray-900 block">{row.controlCategory}</span>
                      {row.details && <span className="text-[9px] text-gray-400 block">{row.details}</span>}
                    </td>
                    <td className="py-2 text-right">
                      <StatusBadge status={row.status} size="xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="User Governance Gates">
          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            {governanceGates.map((gate) => (
              <div key={gate.id} className="p-2 bg-gray-50 rounded border border-gray-150 flex flex-col items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-[9px] font-semibold text-gray-700 leading-tight truncate w-full" title={gate.name}>
                  {gate.name}
                </span>
                <span className="text-[9px] font-extrabold text-emerald-700">Pass</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* 9. Bottom Multi-Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {/* Owned Resources */}
        <SectionCard title="Owned Resources & Responsibilities">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                  <th className="pb-1">Resource Type</th>
                  <th className="pb-1">Scope</th>
                  <th className="pb-1 text-center">Transfer</th>
                  <th className="pb-1">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {ownedResources.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/60">
                    <td className="py-1 font-bold text-gray-900">{row.resourceType}</td>
                    <td className="py-1 text-gray-600 truncate max-w-[80px]">{row.scope}</td>
                    <td className="py-1 text-center text-gray-400">{row.transferRequired ? 'Yes' : 'No'}</td>
                    <td className="py-1 text-gray-600">{row.review}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Recent Admin Activity */}
        <SectionCard title="Recent Administrative Activity">
          <DataTable
            columns={adminActivityColumns}
            data={adminActivities}
            density="compact"
          />
        </SectionCard>

        {/* User Activity */}
        <SectionCard
          title="User Activity (Last 30 Days)"
          actions={
            <Link
              href="/admin/administration/reports-audit"
              className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
            >
              <span>AD14 Trace</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          }
        >
          <DataTable
            columns={userActivityColumns}
            data={userActivities}
            density="compact"
          />
        </SectionCard>

        {/* Access & Administration Approvals */}
        <SectionCard title="Access & Administration Approvals">
          <DataTable
            columns={approvalColumns}
            data={accessApprovals}
            density="compact"
          />
        </SectionCard>
      </div>
    </div>
  );
}
