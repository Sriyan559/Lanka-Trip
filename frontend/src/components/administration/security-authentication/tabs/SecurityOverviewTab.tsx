'use client';

import React from 'react';
import { SecurityFullData, AuthenticationPolicyRecord } from '@/lib/administration/security-authentication/security-authentication.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { SelectedPolicyPanel } from '../SelectedPolicyPanel';
import { AuthenticationMethodsGrid } from '../AuthenticationMethodsGrid';
import { ChevronRight } from 'lucide-react';

interface SecurityOverviewTabProps {
  data: SecurityFullData;
  selectedPolicyItem: AuthenticationPolicyRecord;
  onSelectPolicyItem: (item: AuthenticationPolicyRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function SecurityOverviewTab({
  data,
  selectedPolicyItem,
  onSelectPolicyItem,
  onNavigateTab,
}: SecurityOverviewTabProps) {
  const {
    policies,
    selectedPolicy,
    providers,
    ssoDomains,
    mfaMethods,
    mfaGaps,
    stepUpPolicies,
    sessionPolicies,
    sessionLimits,
    highRiskSessions,
    revocationQueue,
    deviceTrustRules,
    loginProtection,
    riskSignals,
    serviceIdentities,
    certificates,
    recoveryControls,
    passwordPolicy,
    authHealthMatrix,
    governanceGates,
    operationsGates,
    recentActivity,
    charts,
  } = data;

  const policyColumns: ColumnDef<AuthenticationPolicyRecord>[] = [
    { key: 'policyRef', header: 'Policy Ref', cell: (r) => <span className="font-mono text-gray-500 text-[9px]">{r.policyRef}</span> },
    {
      key: 'policyName',
      header: 'Policy Name',
      cell: (r) => (
        <button
          type="button"
          onClick={() => onSelectPolicyItem(r)}
          className="font-bold text-gray-900 hover:text-[#741d35] hover:underline text-left"
        >
          {r.policyName}
        </button>
      ),
    },
    { key: 'type', header: 'Type' },
    { key: 'tenant', header: 'Tenant' },
    { key: 'environment', header: 'Env' },
    { key: 'provider', header: 'Provider' },
    { key: 'authMethod', header: 'Auth Method' },
    { key: 'mfa', header: 'MFA', align: 'center' },
    { key: 'stepUp', header: 'Step-Up', align: 'center' },
    { key: 'session', header: 'Session', align: 'center' },
    { key: 'deviceTrust', header: 'Device Trust' },
    { key: 'owner', header: 'Owner' },
    { key: 'compliance', header: 'Compliance', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.compliance}%</span> },
    { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
    { key: 'lastUpdated', header: 'Last Updated', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastUpdated}</span> },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ========================================================================= */}
      {/* ROW 1: Authentication Policy Registry, Selected Security Policy */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-8 min-w-0">
          <SectionCard
            title="Authentication & Security Policy Registry"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('overview')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>View all authentication policies</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable columns={policyColumns} data={policies} density="compact" />
          </SectionCard>
        </div>

        <div className="lg:col-span-4 min-w-0">
          <SelectedPolicyPanel
            policy={selectedPolicy}
            onReviewPolicy={() => alert('Review Policy')}
            onReviewMfa={() => onNavigateTab('mfa')}
            onReviewSessions={() => onNavigateTab('session-policies')}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 2: Authentication Providers, Methods Grid, SSO Coverage, SSO Domains */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-4 min-w-0">
          <SectionCard
            title="Authentication Providers"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('providers')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>View all providers</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable
              columns={[
                { key: 'provider', header: 'Provider', cell: (r) => <span className="font-bold text-gray-900">{r.provider}</span> },
                { key: 'protocol', header: 'Protocol', cell: (r) => <span className="font-mono text-[9px]">{r.protocol}</span> },
                { key: 'users', header: 'Users', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.users}</span> },
                { key: 'mfaCoverage', header: 'MFA Coverage', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.mfaCoverage}%</span> },
                { key: 'mfaStatus', header: 'MFA Status', cell: (r) => <span className="font-semibold text-gray-800">{r.mfaStatus}</span> },
                { key: 'avgLatency', header: 'Avg. Latency', align: 'right' },
                { key: 'errorRate', header: 'Error Rate', align: 'right' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                { key: 'connectivity', header: 'Connectivity', cell: (r) => <StatusBadge status={r.connectivity} size="xs" /> },
              ]}
              data={providers}
              density="compact"
            />
          </SectionCard>
        </div>

        <div className="lg:col-span-3 min-w-0">
          <AuthenticationMethodsGrid />
        </div>

        <div className="lg:col-span-2 min-w-0">
          <SectionCard title="SSO Configuration & Coverage">
            <div className="flex flex-col gap-2 p-1 text-[10px]">
              <div className="flex justify-between items-center"><span className="text-gray-500">SSO Managed Users</span><span className="font-bold text-gray-900">286 / 292 <span className="text-emerald-700 ml-1">97.9%</span></span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">SSO Adoption</span><span className="font-bold text-emerald-700">98%</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">SSO Domains</span><span className="font-bold text-gray-900">8</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">SSO Applications</span><span className="font-bold text-gray-900">64</span></div>
              <button
                type="button"
                onClick={() => onNavigateTab('sso')}
                className="mt-1 text-[#741d35] font-bold text-left hover:underline text-[9px]"
              >
                View coverage details →
              </button>
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-3 min-w-0">
          <SectionCard title="SSO Domain Mapping">
            <DataTable
              columns={[
                { key: 'domain', header: 'Domain', cell: (r) => <span className="font-mono font-bold text-gray-900">{r.domain}</span> },
                { key: 'users', header: 'Users', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.users}</span> },
                { key: 'coverage', header: 'Coverage', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.coverage}%</span> },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={ssoDomains}
              density="compact"
            />
          </SectionCard>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 3: MFA Coverage Donut, MFA Methods, MFA Gaps, Step-Up Policies, Session Policies, Session Limits */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        <SectionCard title="MFA Coverage">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.mfaCoverage}
              totalValue="98%"
              totalLabel="Covered"
              height={140}
            />
          </div>
        </SectionCard>

        <SectionCard title="MFA Methods">
          <DataTable
            columns={[
              { key: 'method', header: 'Method', cell: (r) => <span className="font-bold text-gray-900">{r.method}</span> },
              { key: 'users', header: 'Users', align: 'center' },
              { key: 'coverage', header: 'Coverage', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.coverage}%</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={mfaMethods}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="MFA Gaps">
          <DataTable
            columns={[
              { key: 'userGroup', header: 'User Group', cell: (r) => <span className="font-bold text-gray-900">{r.userGroup}</span> },
              { key: 'users', header: 'Users', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.users}</span> },
              { key: 'reason', header: 'Reason' },
              { key: 'priority', header: 'Priority', cell: (r) => <StatusBadge status={r.priority} size="xs" /> },
            ]}
            data={mfaGaps}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Step-Up Policies">
          <DataTable
            columns={[
              { key: 'trigger', header: 'Trigger', cell: (r) => <span className="font-bold text-gray-900">{r.trigger}</span> },
              { key: 'usersImpacted', header: 'Users Impacted', align: 'center' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={stepUpPolicies}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Session Policies">
          <DataTable
            columns={[
              { key: 'policy', header: 'Policy', cell: (r) => <span className="font-bold text-gray-900">{r.policy}</span> },
              { key: 'usersImpacted', header: 'Users Impacted', align: 'center' },
              { key: 'status', header: 'Status', cell: (r) => <span className="font-semibold text-gray-800">{r.status}</span> },
            ]}
            data={sessionPolicies}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Session Limits">
          <DataTable
            columns={[
              { key: 'trigger', header: 'Trigger', cell: (r) => <span className="font-bold text-gray-900">{r.trigger}</span> },
              { key: 'count', header: 'Count', align: 'right', cell: (r) => <span className="font-bold text-gray-800">{r.count}</span> },
            ]}
            data={sessionLimits}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 4: Active Sessions Donut, High-Risk Sessions, Revocation Queue, Device Trust Donut, Rules, Login Protection, Locked Donut, Risk Signals */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-3">
        <SectionCard title="Active Sessions">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.activeSessions}
              totalValue="1,248"
              totalLabel="Total"
              height={130}
            />
          </div>
        </SectionCard>

        <SectionCard title="High-Risk Sessions">
          <DataTable
            columns={[
              { key: 'session', header: 'Session', cell: (r) => <span className="font-bold text-gray-900">{r.session}</span> },
              { key: 'riskReason', header: 'Risk Reason' },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.count}</span> },
            ]}
            data={highRiskSessions}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Session Revocation Queue">
          <DataTable
            columns={[
              { key: 'reason', header: 'Reason', cell: (r) => <span className="font-bold text-gray-900">{r.reason}</span> },
              { key: 'sessions', header: 'Sessions', align: 'center', cell: (r) => <span className="font-bold text-amber-700">{r.sessions}</span> },
            ]}
            data={revocationQueue}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Device Trust">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.deviceTrust}
              totalValue="342"
              totalLabel="Trusted"
              height={130}
            />
          </div>
        </SectionCard>

        <SectionCard title="Device Trust Rules">
          <DataTable
            columns={[
              { key: 'rule', header: 'Rule', cell: (r) => <span className="font-bold text-gray-900">{r.rule}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={deviceTrustRules}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Login Protection">
          <DataTable
            columns={[
              { key: 'control', header: 'Control', cell: (r) => <span className="font-bold text-gray-900">{r.control}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={loginProtection}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Locked Accounts">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.lockedAccounts}
              totalValue="4"
              totalLabel="Locked"
              height={130}
            />
          </div>
        </SectionCard>

        <SectionCard title="Authentication Risk Signals">
          <DataTable
            columns={[
              { key: 'signal', header: 'Signal', cell: (r) => <span className="font-bold text-gray-900">{r.signal}</span> },
              { key: 'count', header: 'Count', align: 'right', cell: (r) => <span className="font-bold text-rose-700">{r.count}</span> },
            ]}
            data={riskSignals}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 5: Break-Glass, Service Ident, Certificates, Recovery, Password Policy, Auth Health Matrix, Health Line Chart */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        <SectionCard title="Break-Glass Access / Emergency Access">
          <div className="flex flex-col gap-1.5 p-1 text-[10px]">
            <div className="flex justify-between items-center"><span className="text-gray-500">Break-Glass Accounts</span><span className="font-bold text-rose-700">2</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Last Used</span><span className="font-mono text-gray-700">May 19, 2024</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Usage This Month</span><span className="font-bold text-emerald-700">0</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Approvals Required</span><span className="font-bold text-gray-900">Yes</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Review Frequency</span><span className="font-semibold text-gray-800">Monthly</span></div>
          </div>
        </SectionCard>

        <SectionCard title="Service Identity Authentication">
          <DataTable
            columns={[
              { key: 'serviceIdentities', header: 'Service Identities', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.serviceIdentities}</span> },
              { key: 'activeCredentials', header: 'Active Credentials', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.activeCredentials}</span> },
              { key: 'lastRotated', header: 'Last Rotated', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastRotated}</span> },
              { key: 'expiresIn', header: 'Expires In', align: 'center', cell: (r) => <span className="font-semibold text-amber-700">{r.expiresIn}</span> },
            ]}
            data={serviceIdentities}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Authentication Credentials & Certificates">
          <DataTable
            columns={[
              { key: 'activeCertificates', header: 'Active Certificates', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.activeCertificates}</span> },
              { key: 'expiring30Days', header: 'Expiring (30 Days)', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.expiring30Days}</span> },
              { key: 'expired', header: 'Expired', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.expired}</span> },
              { key: 'lastRotated', header: 'Last Rotated', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastRotated}</span> },
            ]}
            data={certificates}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Account Recovery Controls">
          <DataTable
            columns={[
              { key: 'recoveryMethods', header: 'Recovery Methods', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.recoveryMethods}</span> },
              { key: 'selfServiceRecovery', header: 'Self-Service Recovery', cell: (r) => <StatusBadge status={r.selfServiceRecovery} size="xs" /> },
              { key: 'recoveryApproval', header: 'Recovery Approval', cell: (r) => <span className="font-semibold text-gray-800">{r.recoveryApproval}</span> },
              { key: 'recoveryAttemptsLimit', header: 'Recovery Attempts Limit', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.recoveryAttemptsLimit}</span> },
            ]}
            data={recoveryControls}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Password Policy">
          <div className="flex flex-col gap-1.5 p-1 text-[10px]">
            <div className="flex justify-between items-center"><span className="text-gray-500">Minimum Length</span><span className="font-bold text-gray-900">12</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Complexity Required</span><span className="font-bold text-emerald-700">Yes</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Self-Service Reset</span><span className="font-bold text-gray-900">90 days</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Password Expiry</span><span className="font-bold text-gray-900">24</span></div>
          </div>
        </SectionCard>

        <SectionCard title="Enterprise Authentication Health Matrix">
          <DataTable
            columns={[
              { key: 'enterprise', header: 'Enterprise', cell: (r) => <span className="font-bold text-gray-900">{r.enterprise}</span> },
              { key: 'overall', header: 'Overall', align: 'center', cell: (r) => <span className="font-extrabold text-emerald-700">{r.overall}%</span> },
              { key: 'sso', header: 'SSO', align: 'center', cell: (r) => <span className="font-semibold">{r.sso}%</span> },
              { key: 'mfa', header: 'MFA', align: 'center', cell: (r) => <span className="font-semibold">{r.mfa}%</span> },
              { key: 'sessions', header: 'Sessions', align: 'center', cell: (r) => <span className="font-semibold">{r.sessions}%</span> },
              { key: 'deviceTrust', header: 'Device Trust', align: 'center', cell: (r) => <span className="font-semibold">{r.deviceTrust}%</span> },
              { key: 'credential', header: 'Credential', align: 'center', cell: (r) => <span className="font-semibold">{r.credential}%</span> },
            ]}
            data={authHealthMatrix}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Session Health — Last 30 Days">
          <ResponsiveLineChart
            data={charts.healthTrend}
            xAxisKey="label"
            series={[
              { key: 'Overall Health', label: 'Overall Health', color: '#3b82f6' },
              { key: 'Privileged Sessions', label: 'Privileged Sessions', color: '#f59e0b', dashed: true },
            ]}
            height={130}
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 6: Security Reviews, Exceptions, Risk Portfolio, Governance Gates, Ops Gates, Activity */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        <SectionCard title="Security Reviews">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.securityReviews}
              totalValue="3"
              totalLabel="Due"
              height={140}
            />
          </div>
        </SectionCard>

        <SectionCard title="Security Exceptions">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.securityExceptions}
              totalValue="3"
              totalLabel="Active"
              height={140}
            />
          </div>
        </SectionCard>

        <SectionCard title="Risk Portfolio Summary">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.riskPortfolio}
              totalValue="16"
              totalLabel="Risks"
              height={140}
            />
          </div>
        </SectionCard>

        <SectionCard title="Governance & Compliance Gates">
          <DataTable
            columns={[
              { key: 'gate', header: 'Gate', cell: (r) => <span className="font-bold text-gray-900">{r.gate}</span> },
              { key: 'compliance', header: 'Compliance', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.compliance}%</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={governanceGates}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Security Operations Gates">
          <DataTable
            columns={[
              { key: 'gate', header: 'Control', cell: (r) => <span className="font-bold text-gray-900">{r.gate}</span> },
              { key: 'compliance', header: 'Status', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.compliance}%</span> },
              { key: 'status', header: 'Gate', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={operationsGates}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Recent Security Activity">
          <DataTable
            columns={[
              { key: 'dateTime', header: 'Date / Time', cell: (r) => <span className="text-[9px] text-gray-500 whitespace-nowrap">{r.dateTime}</span> },
              { key: 'event', header: 'Event', cell: (r) => <span className="font-semibold text-gray-800">{r.event}</span> },
              { key: 'actor', header: 'Actor' },
              { key: 'details', header: 'Details' },
            ]}
            data={recentActivity}
            density="compact"
          />
        </SectionCard>
      </div>
    </div>
  );
}
export default SecurityOverviewTab;
