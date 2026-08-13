"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, ChevronDown, CheckCircle, Clock, Search, Filter, Save, 
  Download, AlertTriangle, ShieldCheck, ShieldAlert, Zap, Globe, Package, 
  Users, Layers, ArrowRight, CheckSquare, XCircle, AlertCircle, TrendingUp, 
  Activity, Info, Shield, Lock, RefreshCw, Key, ShieldX, UserCheck, FileText, Check, Play
} from "lucide-react";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { StatusBadge } from "@/components/analytics/StatusBadge";
import { PolicyDecisionFlow } from "./PolicyDecisionFlow";
import { GOVERNANCE_ACCESS_DATA, IdentityRegistryItem, AccessPolicyItem, EffectivePermissionItem, RoleRegistryItem, PermissionSetItem, ServicePrincipalItem, SodMatrixItem, RecentGovernanceActivityItem } from "@/data/ecosystem-modules/governanceAccessData";

export function GovernanceAccessWorkspace() {
  const router = useRouter();

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
  };

  const identityCols: ColumnDef<IdentityRegistryItem>[] = [
    { header: "Identity", accessorKey: "identity", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.identity}</span> },
    { header: "Type", accessorKey: "type", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.type}</span> },
    { header: "Business Unit", accessorKey: "businessUnit", align: "left" },
    { header: "Entitlements", accessorKey: "entitlements", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.entitlements}</span> },
    { header: "Privilege Level", accessorKey: "privilegeLevel", align: "center", renderCell: (row) => <span className={`font-bold px-1.5 py-0.5 rounded text-[9.5px] ${row.privilegeLevel === 'P1' ? 'bg-rose-100 text-rose-700' : row.privilegeLevel === 'P2' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>{row.privilegeLevel}</span> },
    { header: "Risk Level", accessorKey: "riskLevel", align: "center", renderCell: (row) => <span className={row.riskLevel === 'High' ? 'text-rose-600 font-bold' : row.riskLevel === 'Medium' ? 'text-amber-600 font-bold' : 'text-emerald-600 font-medium'}>{row.riskLevel}</span> },
    { header: "MFA / Auth", accessorKey: "mfaAuth", align: "center", renderCell: (row) => <span className="text-[9.5px] font-bold text-emerald-700">{row.mfaAuth}</span> },
  ];

  const policyCols: ColumnDef<AccessPolicyItem>[] = [
    { header: "Policy Name", accessorKey: "policyName", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.policyName}</span> },
    { header: "Lifecycle Status", accessorKey: "lifecycleStatus", align: "center", renderCell: (row) => <StatusBadge status={row.lifecycleStatus} /> },
    { header: "Last Updated", accessorKey: "lastUpdated", align: "left", renderCell: (row) => <span className="text-slate-400 text-[9.5px]">{row.lastUpdated}</span> },
    { header: "Owner", accessorKey: "owner", align: "left" },
    { header: "Applies To", accessorKey: "appliesTo", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.appliesTo}</span> },
    { header: "Evaluation Result", accessorKey: "evaluationResult", align: "center", renderCell: (row) => <span className={row.evaluationResult === 'Allow' ? 'text-emerald-600 font-bold' : row.evaluationResult === 'Deny' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>{row.evaluationResult}</span> },
  ];

  const effectiveCols: ColumnDef<EffectivePermissionItem>[] = [
    { header: "Identity", accessorKey: "identity", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.identity}</span> },
    { header: "Application / System", accessorKey: "applicationSystem", align: "left" },
    { header: "Role", accessorKey: "role", align: "left" },
    { header: "Permission Set", accessorKey: "permissionSet", align: "left" },
    { header: "Access Type", accessorKey: "accessType", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.accessType}</span> },
    { header: "Privilege Level", accessorKey: "privilegeLevel", align: "center", renderCell: (row) => <span className={`font-bold px-1.5 py-0.5 rounded text-[9.5px] ${row.privilegeLevel === 'P1' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{row.privilegeLevel}</span> },
    { header: "Risk Level", accessorKey: "riskLevel", align: "center", renderCell: (row) => <span className={row.riskLevel === 'High' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>{row.riskLevel}</span> },
    { header: "Evaluation Result", accessorKey: "evaluationResult", align: "center", renderCell: (row) => <span className={row.evaluationResult === 'Allow' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{row.evaluationResult}</span> },
    { header: "Last Evaluated", accessorKey: "lastEvaluated", align: "right", renderCell: (row) => <span className="text-slate-400 text-[9.5px]">{row.lastEvaluated}</span> },
  ];

  const roleCols: ColumnDef<RoleRegistryItem>[] = [
    { header: "Role Name", accessorKey: "roleName", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.roleName}</span> },
    { header: "Type", accessorKey: "type", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.type}</span> },
    { header: "Identities", accessorKey: "identities", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.identities}</span> },
    { header: "Applications", accessorKey: "applications", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.applications}</span> },
    { header: "Privilege Level", accessorKey: "privilegeLevel", align: "center", renderCell: (row) => <span className={`font-bold px-1.5 py-0.5 rounded text-[9.5px] ${row.privilegeLevel === 'P1' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{row.privilegeLevel}</span> },
    { header: "Risk Level", accessorKey: "riskLevel", align: "center", renderCell: (row) => <span className={row.riskLevel === 'High' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>{row.riskLevel}</span> },
  ];

  const permCols: ColumnDef<PermissionSetItem>[] = [
    { header: "Permission Set", accessorKey: "permissionSet", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.permissionSet}</span> },
    { header: "Type", accessorKey: "type", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.type}</span> },
    { header: "Assignments", accessorKey: "assignments", align: "center", renderCell: (row) => <span className="font-bold text-slate-800">{row.assignments}</span> },
    { header: "Privilege Level", accessorKey: "privilegeLevel", align: "center", renderCell: (row) => <span className={`font-bold px-1.5 py-0.5 rounded text-[9.5px] ${row.privilegeLevel === 'P1' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{row.privilegeLevel}</span> },
    { header: "Risk Level", accessorKey: "riskLevel", align: "center", renderCell: (row) => <span className={row.riskLevel === 'High' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>{row.riskLevel}</span> },
  ];

  const spCols: ColumnDef<ServicePrincipalItem>[] = [
    { header: "Service Principal", accessorKey: "servicePrincipal", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.servicePrincipal}</span> },
    { header: "Owner", accessorKey: "owner", align: "left" },
    { header: "Applications", accessorKey: "applications", align: "left" },
    { header: "Credential Type", accessorKey: "credentialType", align: "center", renderCell: (row) => <span className="text-[10px] text-slate-600">{row.credentialType}</span> },
    { header: "Rotation", accessorKey: "credentialRotation", align: "center" },
    { header: "Lifetime", accessorKey: "tokenLifetime", align: "center" },
    { header: "mTLS", accessorKey: "mTLS", align: "center", renderCell: (row) => <span className="font-bold text-emerald-700">{row.mTLS}</span> },
    { header: "Service Scope", accessorKey: "serviceScope", align: "left" },
    { header: "Risk Level", accessorKey: "riskLevel", align: "center", renderCell: (row) => <span className="text-emerald-600 font-bold">{row.riskLevel}</span> },
  ];

  const sodCols: ColumnDef<SodMatrixItem>[] = [
    { header: "SoD Rule", accessorKey: "sodRule", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.sodRule}</span> },
    { header: "Conflicting Roles", accessorKey: "conflictingRoles", align: "left" },
    { header: "Conflicts", accessorKey: "conflicts", align: "center", renderCell: (row) => <span className="font-bold text-rose-600">{row.conflicts}</span> },
    { header: "Risk Level", accessorKey: "riskLevel", align: "center", renderCell: (row) => <span className={row.riskLevel === 'High' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>{row.riskLevel}</span> },
    { header: "Status", accessorKey: "status", align: "center", renderCell: (row) => <StatusBadge status={row.status} /> },
  ];

  const activityCols: ColumnDef<RecentGovernanceActivityItem>[] = [
    { header: "Time", accessorKey: "time", align: "left", renderCell: (row) => <span className="text-slate-400 text-[10px]">{row.time}</span> },
    { header: "Actor", accessorKey: "actor", align: "left", renderCell: (row) => <span className="font-semibold text-slate-800">{row.actor}</span> },
    { header: "Action", accessorKey: "action", align: "left", renderCell: (row) => <span className="text-slate-700">{row.action}</span> },
    { header: "Target", accessorKey: "target", align: "left" },
    { header: "Result", accessorKey: "result", align: "center", renderCell: (row) => <span className={row.result === 'Success' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{row.result}</span> },
    { header: "Details", accessorKey: "details", align: "left", renderCell: (row) => <span className="text-slate-500 text-[10px]">{row.details}</span> },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
            <span>Ecosystem Modules</span>
            <span>&gt;</span>
            <span className="font-semibold text-slate-700">Governance &amp; Access</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {GOVERNANCE_ACCESS_DATA.headerInfo.visibleTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
            {GOVERNANCE_ACCESS_DATA.headerInfo.subtitle}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleAction("Create Access Policy")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus size={12} /> Create Access Policy
          </button>
          <button
            type="button"
            onClick={() => handleAction("New Access Request")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus size={12} /> New Access Request
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Access Review")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Play size={12} /> Run Access Review
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-4 items-start">
        <div className="min-w-0 space-y-4">
          
          {/* 2. Top Primary KPI Cards (8 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2 min-w-0">
            {GOVERNANCE_ACCESS_DATA.primaryKpis.map((kpi, idx) => (
              <div
                key={idx}
                onClick={() => handleAction(`KPI ${kpi.label}`)}
                className="bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer min-w-0 text-center items-center"
              >
                <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-tight truncate block mb-1">
                  {kpi.label}
                </span>
                <span className={`text-base font-black leading-none ${kpi.tone === 'success' ? 'text-emerald-700' : kpi.tone === 'danger' ? 'text-rose-600' : kpi.tone === 'warning' ? 'text-amber-600' : 'text-slate-800'}`}>
                  {kpi.value}
                </span>
                <span className="text-[9px] text-slate-400 mt-1 block truncate">
                  {kpi.supportingText}
                </span>
              </div>
            ))}
          </div>

          {/* 3. Governance Filter Toolbar */}
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Identity Type</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Business Unit</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Application / System</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Role</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Access Type</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Policy Status</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Evaluation Result</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
              <div><span className="text-[9px] font-bold text-slate-400 uppercase block">Risk Level</span><select className="w-full text-[10.5px] border-slate-200 rounded p-1"><option>All</option></select></div>
            </div>
            
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1 text-[9.5px]">
                <span className="font-bold text-slate-400 mr-1 uppercase">Quick Actions:</span>
                <button onClick={() => handleAction("Quick Filter All")} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded cursor-pointer">
                  All
                </button>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => handleAction("Clear All")} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer">Clear All</button>
                <button onClick={() => handleAction("Save View")} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"><Save size={10} /> Save View</button>
                <button onClick={() => handleAction("Refresh")} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 font-semibold rounded text-[10.5px] hover:bg-slate-50 cursor-pointer flex items-center gap-1"><RefreshCw size={10} /> Refresh</button>
              </div>
            </div>
          </div>

          {/* 4. ROW 1: Access Governance Registry + Access Policy Registry + Policy Decision Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Access Governance Registry */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Access Governance Registry</h4>
                  <span className="text-[10px] font-semibold text-slate-400">Top Identities</span>
                </div>
                <AnalyticsTable data={GOVERNANCE_ACCESS_DATA.topIdentities} columns={identityCols} itemsPerPage={5} />
              </div>
              <button onClick={() => handleAction("View All Identities")} className="mt-2 text-[10.5px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Identities <ArrowRight size={10} />
              </button>
            </div>

            {/* Access Policy Registry */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Access Policy Registry</h4>
                  <button onClick={() => handleAction("View All Policies")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View All Policies <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={GOVERNANCE_ACCESS_DATA.policies} columns={policyCols} itemsPerPage={5} />
              </div>
              <button onClick={() => handleAction("View All Policies")} className="mt-2 text-[10.5px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Policies <ArrowRight size={10} />
              </button>
            </div>

            {/* Policy Decision Flow */}
            <PolicyDecisionFlow />

          </div>

          {/* 5. ROW 2: Effective Permissions Matrix + Role Registry + Permission Sets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Effective Permissions Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Effective Permissions Matrix</h4>
                  <span className="text-[10px] font-semibold text-slate-400">Top Access</span>
                </div>
                <AnalyticsTable data={GOVERNANCE_ACCESS_DATA.effectivePermissions} columns={effectiveCols} itemsPerPage={4} />
              </div>
              <button onClick={() => handleAction("View Full Matrix")} className="mt-2 text-[10.5px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View Full Matrix <ArrowRight size={10} />
              </button>
            </div>

            {/* Role Registry */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Role Registry</h4>
                  <span className="text-[10px] font-semibold text-slate-400">Top Roles</span>
                </div>
                <AnalyticsTable data={GOVERNANCE_ACCESS_DATA.roles} columns={roleCols} itemsPerPage={4} />
              </div>
              <button onClick={() => handleAction("View All Roles")} className="mt-2 text-[10.5px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Roles <ArrowRight size={10} />
              </button>
            </div>

            {/* Permission Sets */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Permission Sets</h4>
                  <span className="text-[10px] font-semibold text-slate-400">Top Sets</span>
                </div>
                <AnalyticsTable data={GOVERNANCE_ACCESS_DATA.permissionSets} columns={permCols} itemsPerPage={4} />
              </div>
              <button onClick={() => handleAction("View All Permission Sets")} className="mt-2 text-[10.5px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Permission Sets <ArrowRight size={10} />
              </button>
            </div>

          </div>

          {/* 6. ROW 3: Operational Summary Cards Grid (6 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3">
            
            {/* Access Request Queue */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Access Request Queue</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600 font-bold"><span>Total Pending</span><span className="text-amber-600">{GOVERNANCE_ACCESS_DATA.accessRequestQueue.totalPending}</span></div>
                  <div className="flex justify-between text-slate-500 text-[10.5px]"><span>New</span><span>{GOVERNANCE_ACCESS_DATA.accessRequestQueue.newCount}</span></div>
                  <div className="flex justify-between text-slate-500 text-[10.5px]"><span>In Review</span><span>{GOVERNANCE_ACCESS_DATA.accessRequestQueue.inReview}</span></div>
                  <div className="flex justify-between text-slate-500 text-[10.5px]"><span>Approval Pending</span><span>{GOVERNANCE_ACCESS_DATA.accessRequestQueue.approvalPending}</span></div>
                  <div className="flex justify-between text-slate-500 text-[10.5px]"><span>Additional Info</span><span>{GOVERNANCE_ACCESS_DATA.accessRequestQueue.additionalInfo}</span></div>
                </div>
              </div>
              <button onClick={() => handleAction("View All Requests")} className="mt-2 text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Requests <ArrowRight size={10} />
              </button>
            </div>

            {/* Recent Access Requests */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Recent Access Requests</h4>
                <div className="space-y-1.5 text-[10px]">
                  {GOVERNANCE_ACCESS_DATA.recentRequests.map((req, idx) => (
                    <div key={idx} className="border-b border-slate-50 pb-1">
                      <div className="font-semibold text-slate-800 truncate">{req.request}</div>
                      <div className="flex justify-between text-slate-400"><span>{req.requester}</span><span>{req.date}</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => handleAction("View All Requests")} className="mt-2 text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Requests <ArrowRight size={10} />
              </button>
            </div>

            {/* Temporary Access */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Temporary Access</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600"><span>Active Grants</span><span className="font-bold text-slate-900">{GOVERNANCE_ACCESS_DATA.temporaryAccess.activeGrants}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Expiring Within 7 Days</span><span className="font-bold text-amber-600">{GOVERNANCE_ACCESS_DATA.temporaryAccess.expiring7Days}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Overdue</span><span className="font-bold text-rose-600">{GOVERNANCE_ACCESS_DATA.temporaryAccess.overdue}</span></div>
                </div>
              </div>
              <button onClick={() => handleAction("View All Temporary Access")} className="mt-2 text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Temporary Access <ArrowRight size={10} />
              </button>
            </div>

            {/* Access Certification */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Access Certification</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600"><span>Due Soon</span><span className="font-bold text-amber-600">{GOVERNANCE_ACCESS_DATA.accessCertification.dueSoon}</span></div>
                  <div className="flex justify-between text-slate-600"><span>In Progress</span><span className="font-bold text-slate-900">{GOVERNANCE_ACCESS_DATA.accessCertification.inProgress}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Completed (This Month)</span><span className="font-bold text-emerald-700">{GOVERNANCE_ACCESS_DATA.accessCertification.completedThisMonth}</span></div>
                </div>
              </div>
              <button onClick={() => handleAction("View All Certifications")} className="mt-2 text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Certifications <ArrowRight size={10} />
              </button>
            </div>

            {/* Access Reviews (By State) Donut Chart */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1">Access Reviews <span className="text-[10px] font-normal text-slate-400">(By State)</span></h4>
                <div className="flex items-center justify-center py-2">
                  <CircularScore score={GOVERNANCE_ACCESS_DATA.accessReviewsByState.totalReviews} maxScore={30} size="md" />
                </div>
                <div className="space-y-0.5 text-[9.5px]">
                  {GOVERNANCE_ACCESS_DATA.accessReviewsByState.states.map((st, idx) => (
                    <div key={idx} className="flex justify-between text-slate-600">
                      <span>{st.label}</span>
                      <span className="font-semibold">{st.count} ({st.pct})</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => handleAction("View All Reviews")} className="mt-2 text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Reviews <ArrowRight size={10} />
              </button>
            </div>

            {/* Dormant Access */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Dormant Access</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600 font-bold"><span>Dormant Accounts</span><span className="text-rose-600">{GOVERNANCE_ACCESS_DATA.dormantAccess.dormantAccounts}</span></div>
                  <div className="flex justify-between text-slate-500 text-[10.5px]"><span>&gt; 90 Days</span><span>{GOVERNANCE_ACCESS_DATA.dormantAccess.over90Days}</span></div>
                  <div className="flex justify-between text-slate-500 text-[10.5px]"><span>&gt; 180 Days</span><span>{GOVERNANCE_ACCESS_DATA.dormantAccess.over180Days}</span></div>
                  <div className="flex justify-between text-slate-500 text-[10.5px]"><span>&gt; 365 Days</span><span>{GOVERNANCE_ACCESS_DATA.dormantAccess.over365Days}</span></div>
                </div>
              </div>
              <button onClick={() => handleAction("View Dormant Access")} className="mt-2 text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View Dormant Access <ArrowRight size={10} />
              </button>
            </div>

          </div>

          {/* 7. ROW 4: Service Principal Portfolio + Segregation of Duties Matrix + Recent Governance Activity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Service Principal Portfolio */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Service Principal Portfolio</h4>
                  <button onClick={() => handleAction("View All Service Principals")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View All Service Principals <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={GOVERNANCE_ACCESS_DATA.servicePrincipals} columns={spCols} itemsPerPage={4} />
              </div>
              <button onClick={() => handleAction("View All Service Principals")} className="mt-2 text-[10.5px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Service Principals <ArrowRight size={10} />
              </button>
            </div>

            {/* Segregation of Duties Matrix */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Segregation of Duties Matrix</h4>
                  <span className="text-[10px] font-semibold text-slate-400">Top Conflicts</span>
                </div>
                <AnalyticsTable data={GOVERNANCE_ACCESS_DATA.sodMatrix} columns={sodCols} itemsPerPage={4} />
              </div>
              <button onClick={() => handleAction("View Full SoD Matrix")} className="mt-2 text-[10.5px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View Full SoD Matrix <ArrowRight size={10} />
              </button>
            </div>

            {/* Recent Governance & Access Activity */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">Recent Governance &amp; Access Activity</h4>
                  <button onClick={() => handleAction("View All Activity")} className="text-[10px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                    View All Activity <ArrowRight size={10} />
                  </button>
                </div>
                <AnalyticsTable data={GOVERNANCE_ACCESS_DATA.recentActivity} columns={activityCols} itemsPerPage={4} />
              </div>
              <button onClick={() => handleAction("View All Activity")} className="mt-2 text-[10.5px] font-semibold text-burgundy hover:underline flex items-center gap-0.5 cursor-pointer">
                View All Activity <ArrowRight size={10} />
              </button>
            </div>

          </div>

        </div>

        {/* 8. RIGHT-SIDE GOVERNANCE PANEL */}
        <div className="w-full flex flex-col gap-4">
          
          {/* A. Governance Health Score */}
          <AnalyticsPanel number="" title="Governance Health">
            <div className="flex flex-col items-center py-3">
              <CircularScore score={GOVERNANCE_ACCESS_DATA.rightPanel.healthScore} maxScore={100} size="lg" />
              <div className="mt-2 text-xs font-extrabold text-emerald-700 tracking-wide uppercase">
                {GOVERNANCE_ACCESS_DATA.rightPanel.healthLabel}
              </div>
              <span className="text-[9.5px] text-emerald-600 font-semibold mt-0.5">{GOVERNANCE_ACCESS_DATA.rightPanel.trendText}</span>
            </div>
          </AnalyticsPanel>

          {/* B. Access Summary */}
          <AnalyticsPanel number="" title="Access Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Human Identities</span><span className="font-bold text-slate-900">{GOVERNANCE_ACCESS_DATA.rightPanel.accessSummary.humanIdentities}</span></div>
              <div className="flex justify-between text-slate-600"><span>Service Principals</span><span className="font-bold text-slate-900">{GOVERNANCE_ACCESS_DATA.rightPanel.accessSummary.servicePrincipals}</span></div>
              <div className="flex justify-between text-slate-600"><span>Active Users (30D)</span><span className="font-bold text-emerald-700">{GOVERNANCE_ACCESS_DATA.rightPanel.accessSummary.activeUsers}</span></div>
              <div className="flex justify-between text-slate-600"><span>Privileged Accounts</span><span className="font-bold text-amber-600">{GOVERNANCE_ACCESS_DATA.rightPanel.accessSummary.privilegedAccounts}</span></div>
              <div className="flex justify-between text-slate-600"><span>High Risk Access</span><span className="font-bold text-rose-600">{GOVERNANCE_ACCESS_DATA.rightPanel.accessSummary.highRiskAccess}</span></div>
            </div>
          </AnalyticsPanel>

          {/* C. Governance Risk Summary */}
          <AnalyticsPanel number="" title="Governance Risk Summary">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>High Risk</span><span className="font-bold text-rose-600">{GOVERNANCE_ACCESS_DATA.rightPanel.riskSummary.highRisk}</span></div>
              <div className="flex justify-between text-slate-600"><span>Medium Risk</span><span className="font-bold text-amber-600">{GOVERNANCE_ACCESS_DATA.rightPanel.riskSummary.mediumRisk}</span></div>
              <div className="flex justify-between text-slate-600"><span>Low Risk</span><span className="font-bold text-emerald-700">{GOVERNANCE_ACCESS_DATA.rightPanel.riskSummary.lowRisk}</span></div>
              <div className="flex justify-between text-slate-600"><span>Info</span><span className="font-semibold text-slate-600">{GOVERNANCE_ACCESS_DATA.rightPanel.riskSummary.info}</span></div>
            </div>
          </AnalyticsPanel>

          {/* D. Review & Certification */}
          <AnalyticsPanel number="" title="Review & Certification">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600"><span>Certifications Due Soon</span><span className="font-bold text-amber-600">{GOVERNANCE_ACCESS_DATA.rightPanel.reviewCertification.certificationsDueSoon}</span></div>
              <div className="flex justify-between text-slate-600"><span>Reviews Due Soon</span><span className="font-bold text-amber-600">{GOVERNANCE_ACCESS_DATA.rightPanel.reviewCertification.reviewsDueSoon}</span></div>
              <div className="flex justify-between text-slate-600"><span>Reviews Overdue</span><span className="font-bold text-rose-600">{GOVERNANCE_ACCESS_DATA.rightPanel.reviewCertification.reviewsOverdue}</span></div>
              <div className="flex justify-between text-slate-600"><span>In Progress</span><span className="font-semibold text-slate-700">{GOVERNANCE_ACCESS_DATA.rightPanel.reviewCertification.inProgress}</span></div>
              <div className="flex justify-between text-slate-600"><span>Completed (This Month)</span><span className="font-bold text-emerald-700">{GOVERNANCE_ACCESS_DATA.rightPanel.reviewCertification.completedThisMonth}</span></div>
            </div>
          </AnalyticsPanel>

          {/* E. Quick Queues */}
          <AnalyticsPanel number="" title="Quick Queues">
            <div className="space-y-1.5 text-xs">
              {GOVERNANCE_ACCESS_DATA.rightPanel.quickQueues.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-600">
                  <span className="truncate pr-2">{item.label}</span>
                  <span className={`px-2 py-0.2 rounded-full font-bold text-[10px] ${
                    item.tone === 'danger' ? 'bg-rose-100 text-rose-700' :
                    item.tone === 'warning' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </AnalyticsPanel>

          {/* F. Recommended Next Actions */}
          <AnalyticsPanel number="" title="Recommended Next Action">
            <div className="space-y-2">
              {GOVERNANCE_ACCESS_DATA.rightPanel.recommendedNextActions.map((act) => (
                <div
                  key={act.id}
                  onClick={() => handleAction(act.title)}
                  className="p-2 rounded border border-amber-200 bg-amber-50/50 hover:bg-amber-100/50 transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-slate-800">{act.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{act.subtitle}</div>
                </div>
              ))}
            </div>
          </AnalyticsPanel>

          {/* G. Final Actions Vertical Cluster */}
          <AnalyticsPanel number="" title="Final Actions">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleAction("Create Access Policy")}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                + Create Access Policy
              </button>
              <button
                onClick={() => handleAction("New Access Request")}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                + New Access Request
              </button>
              <button
                onClick={() => handleAction("Run Access Review")}
                className="w-full py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer text-center"
              >
                + Run Access Review
              </button>
              <button
                onClick={() => handleAction("Review High Risk Access")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Review High Risk Access
              </button>
              <button
                onClick={() => handleAction("Run SoD Analysis")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Run SoD Analysis
              </button>
              <button
                onClick={() => handleAction("Export Governance Report")}
                className="w-full py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Export Governance Report
              </button>
            </div>
          </AnalyticsPanel>

        </div>
      </div>
    </AnalyticsShell>
  );
}
