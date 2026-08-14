'use client';

import React from 'react';
import { UserDetailFullData } from '@/lib/administration/users/user-detail.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { ShieldCheck, Lock, KeyRound, Clock, UserCheck, AlertTriangle, FileText, CheckCircle2, ShieldAlert, Laptop, History, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface UserDetailTabContentProps {
  activeTab: string;
  data: UserDetailFullData;
  onNavigateAudit?: () => void;
}

export function UserDetailTabContent({ activeTab, data }: UserDetailTabContentProps) {
  const {
    profile,
    lifecycle,
    memberships,
    scopeInheritance,
    assignedRoles,
    effectiveAccess,
    privilegedPermissions,
    authPosture,
    mfaMethods,
    signInEvents,
    temporaryGrants,
    restrictions,
    adminActivities,
    userActivities,
    accessApprovals,
    activityTrends,
    accessChangeTrends,
  } = data;

  switch (activeTab) {
    case 'profile':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SectionCard title="Detailed Identity Profile">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Legal Name</span>
                <span className="font-bold text-gray-900">{profile.name}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Preferred Name</span>
                <span className="font-bold text-gray-900">{profile.preferredName}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Corporate Email</span>
                <span className="font-semibold text-gray-900">{profile.email}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Internal Directory Username</span>
                <span className="font-semibold text-gray-900">{profile.internalUsername}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Person ID</span>
                <span className="font-semibold text-gray-900">{profile.personId}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Employment Type</span>
                <span className="font-semibold text-gray-900">{profile.employmentType}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Department</span>
                <span className="font-semibold text-gray-900">{profile.department}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Location</span>
                <span className="font-semibold text-gray-900">{profile.location}</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Lifecycle & Organization Context">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Reporting Manager</span>
                <span className="font-bold text-gray-900">{profile.manager}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Security Domain</span>
                <span className="font-bold text-gray-900">{profile.securityDomain}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Account Age</span>
                <span className="font-bold text-emerald-700">{lifecycle.accountAgeDays} Days</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Active Duration</span>
                <span className="font-bold text-emerald-700">{lifecycle.activeDurationDays} Days</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Created Date</span>
                <span className="font-semibold text-gray-700">{lifecycle.createdOn}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 font-semibold block text-[10px] uppercase">Next Review Date</span>
                <span className="font-semibold text-gray-700">{lifecycle.nextReview}</span>
              </div>
            </div>
          </SectionCard>
        </div>
      );

    case 'memberships':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Tenant & Ecosystem Memberships Directory">
            <DataTable
              columns={[
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
              ]}
              data={memberships}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>

          <SectionCard title="Membership Scope Inheritance Hierarchy">
            <DataTable
              columns={[
                { key: 'tenantEcosystem', header: 'Tenant / Ecosystem', cell: (r) => <span className="font-bold text-gray-900">{r.tenantEcosystem}</span> },
                { key: 'membershipType', header: 'Membership Type' },
                { key: 'platformChannel', header: 'Platform / Channel' },
                { key: 'accessToScope', header: 'Access To Scope' },
                { key: 'productionEnvironment', header: 'Production Environment', cell: (r) => <StatusBadge status={r.productionEnvironment} size="xs" /> },
              ]}
              data={scopeInheritance}
              density="normal"
            />
          </SectionCard>
        </div>
      );

    case 'roles-access':
      return (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <SectionCard title="Assigned Administrative Roles">
              <DataTable
                columns={[
                  { key: 'roleName', header: 'Role Name', cell: (r) => <span className="font-bold text-gray-900">{r.roleName}</span> },
                  { key: 'roleType', header: 'Role Type' },
                  { key: 'scope', header: 'Scope' },
                  { key: 'primary', header: 'Primary', align: 'center', cell: (r) => r.primary ? <span className="text-emerald-700 font-bold">Yes</span> : <span className="text-gray-400">No</span> },
                  { key: 'grantedOn', header: 'Granted On' },
                  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                ]}
                data={assignedRoles}
                density="compact"
              />
            </SectionCard>

            <SectionCard title="Privileged Access Permissions">
              <DataTable
                columns={[
                  { key: 'permission', header: 'Permission', cell: (r) => <span className="font-bold text-gray-900">{r.permission}</span> },
                  { key: 'scopeResource', header: 'Scope / Resource' },
                  { key: 'stepUp', header: 'Step-Up', align: 'center' },
                  { key: 'approval', header: 'Approval', align: 'center' },
                  { key: 'lastUsed', header: 'Last Used' },
                  { key: 'risk', header: 'Risk', align: 'center', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
                  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                ]}
                data={privilegedPermissions}
                density="compact"
              />
            </SectionCard>
          </div>

          <SectionCard title="Effective Administrative Access Matrix">
            <DataTable
              columns={[
                { key: 'accessCategory', header: 'Access Category', cell: (r) => <span className="font-bold text-gray-900">{r.accessCategory}</span> },
                { key: 'view', header: 'View', align: 'center', cell: (r) => <StatusBadge status={r.view} size="xs" /> },
                { key: 'configure', header: 'Configure', align: 'center', cell: (r) => <StatusBadge status={r.configure} size="xs" /> },
                { key: 'request', header: 'Request', align: 'center', cell: (r) => <StatusBadge status={r.request} size="xs" /> },
                { key: 'approve', header: 'Approve', align: 'center', cell: (r) => <StatusBadge status={r.approve} size="xs" /> },
                { key: 'productionAccess', header: 'Production Access', align: 'center', cell: (r) => <StatusBadge status={r.productionAccess} size="xs" /> },
                { key: 'export', header: 'Export', align: 'center', cell: (r) => <StatusBadge status={r.export} size="xs" /> },
                { key: 'audit', header: 'Audit', align: 'center', cell: (r) => <StatusBadge status={r.audit} size="xs" /> },
              ]}
              data={effectiveAccess}
              density="normal"
            />
          </SectionCard>
        </div>
      );

    case 'authentication':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Authentication & Sign-in Posture Details">
            <DataTable
              columns={[
                { key: 'method', header: 'Method', cell: (r) => <span className="font-bold text-gray-900">{r.method}</span> },
                { key: 'status', header: 'Status' },
                { key: 'registered', header: 'Registered' },
                { key: 'lastUsed', header: 'Last Used' },
                { key: 'health', header: 'Health', align: 'center', cell: () => <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> },
              ]}
              data={authPosture}
              density="normal"
            />
          </SectionCard>

          <SectionCard title="Enrolled Multi-Factor Authentication (MFA) Methods">
            <DataTable
              columns={[
                { key: 'method', header: 'Method', cell: (r) => <span className="font-bold text-gray-900">{r.method}</span> },
                { key: 'enrolled', header: 'Enrolled', align: 'center', cell: (r) => r.enrolled ? <span className="text-emerald-700 font-bold">Yes</span> : 'No' },
                { key: 'verified', header: 'Verified', align: 'center', cell: (r) => r.verified ? <span className="text-emerald-700 font-bold">Yes</span> : 'No' },
                { key: 'lastUsed', header: 'Last Used' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={mfaMethods}
              density="normal"
            />
          </SectionCard>
        </div>
      );

    case 'sessions':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Active & Recent Authentication Sessions">
            <DataTable
              columns={[
                { key: 'timestamp', header: 'Date / Time (IST)', cell: (r) => <span className="font-semibold text-gray-900">{r.timestamp}</span> },
                { key: 'location', header: 'Location' },
                { key: 'method', header: 'Method' },
                { key: 'mfa', header: 'MFA' },
                { key: 'environment', header: 'Environment' },
                { key: 'deviceChannel', header: 'Device / Channel' },
                { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
                { key: 'sessionEnd', header: 'Session End', cell: (r) => <StatusBadge status={r.sessionEnd} size="xs" /> },
              ]}
              data={signInEvents}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'temporary-access':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Time-Bound & Temporary Grants Registry">
            <DataTable
              columns={[
                { key: 'grantAccess', header: 'Grant / Access', cell: (r) => <span className="font-bold text-gray-900">{r.grantAccess}</span> },
                { key: 'reason', header: 'Reason' },
                { key: 'approver', header: 'Approver' },
                { key: 'start', header: 'Start Date' },
                { key: 'ends', header: 'End Date' },
                { key: 'autoRevoke', header: 'Auto-Revoke', align: 'center', cell: (r) => r.autoRevoke ? 'Yes' : 'No' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={temporaryGrants}
              density="normal"
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'restrictions':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Security & Operational Restrictions">
            <DataTable
              columns={[
                { key: 'controlCategory', header: 'Control Category', cell: (r) => <span className="font-bold text-gray-900">{r.controlCategory}</span> },
                { key: 'details', header: 'Scope & Enforcement Details' },
                { key: 'status', header: 'Status', align: 'right', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={restrictions}
              density="normal"
            />
          </SectionCard>
        </div>
      );

    case 'activity':
      return (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <SectionCard title="Activity Sessions Trend (30 Days)">
              <ResponsiveLineChart
                data={activityTrends}
                series={[
                  { key: 'login', label: 'Login', color: '#2563eb' },
                  { key: 'configChanges', label: 'Config Changes', color: '#10b981' },
                  { key: 'approvalActions', label: 'Approval Actions', color: '#8b5cf6' },
                  { key: 'exports', label: 'Exports', color: '#f59e0b' },
                  { key: 'privilegeActions', label: 'Privilege Actions', color: '#e11d48' },
                ]}
                height={220}
              />
            </SectionCard>

            <SectionCard title="Access Change Trend (30 Days)">
              <ResponsiveLineChart
                data={accessChangeTrends}
                series={[
                  { key: 'added', label: 'Added', color: '#2563eb' },
                  { key: 'removed', label: 'Removed', color: '#e11d48' },
                  { key: 'modified', label: 'Modified', color: '#8b5cf6' },
                ]}
                height={220}
              />
            </SectionCard>
          </div>

          <SectionCard title="Recent Administrative Actions">
            <DataTable
              columns={[
                { key: 'timestamp', header: 'Date / Time (IST)', cell: (r) => <span className="font-semibold text-gray-900">{r.timestamp}</span> },
                { key: 'action', header: 'Action', cell: (r) => <span className="font-bold text-gray-900">{r.action}</span> },
                { key: 'scope', header: 'Scope' },
                { key: 'details', header: 'Details' },
                { key: 'device', header: 'Device' },
              ]}
              data={adminActivities}
              density="normal"
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'approvals':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Access & Administration Approvals History">
            <DataTable
              columns={[
                { key: 'approvalType', header: 'Approval Type', cell: (r) => <span className="font-bold text-gray-900">{r.approvalType}</span> },
                { key: 'approver', header: 'Approver' },
                { key: 'enactedOn', header: 'Enacted On' },
                { key: 'expires', header: 'Expires' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={accessApprovals}
              density="normal"
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'audit-history':
    case 'reviews':
    case 'security':
    case 'exceptions':
    default:
      return (
        <div className="flex flex-col gap-3">
          <SectionCard
            title="User Activity & Audit Records (Traceable in AD14)"
            actions={
              <Link
                href="/admin/administration/reports-audit"
                className="px-2.5 py-1 bg-[#741d35] hover:bg-[#5d172a] text-white text-[10px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1"
              >
                <span>Central Audit Log (AD14)</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            }
          >
            <DataTable
              columns={[
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
              ]}
              data={userActivities}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );
  }
}
