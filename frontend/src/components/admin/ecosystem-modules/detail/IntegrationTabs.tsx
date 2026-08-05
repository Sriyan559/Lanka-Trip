"use client";

import { Network, Plug, Flag as FlagIcon } from "lucide-react";
import type { EcosystemModuleDetail, FeatureFlagRow } from "../types";
import { EmptyRow, SectionCard, StatusPill } from "./shared";

export function DependenciesTab({ detail }: { detail: EcosystemModuleDetail }) {
  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Critical Dependencies</span><strong className="text-[20px] text-ink">{detail.dependencySummary.criticalDependencies}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Required Dependencies</span><strong className="text-[20px] text-ink">{detail.dependencySummary.requiredDependencies}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Health Status</span><strong className="text-[20px] text-ink">{detail.dependencySummary.healthStatus}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Impact Risk</span><strong className="text-[20px] text-ink">{detail.dependencySummary.impactRisk}</strong></div>
      </section>
      <SectionCard title="Dependencies" description="Upstream and downstream services this module relies on, or that rely on it." aside={<Network size={16} className="text-[#74070a]" />}>
        <table className="w-full text-left text-[12px] border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2.5 px-2 font-bold text-muted">Name</th>
              <th className="py-2.5 px-2 font-bold text-muted">Type</th>
              <th className="py-2.5 px-2 font-bold text-muted">Direction</th>
              <th className="py-2.5 px-2 font-bold text-muted">Health</th>
              <th className="py-2.5 px-2 font-bold text-muted">Criticality</th>
              <th className="py-2.5 px-2 font-bold text-muted">Owner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {detail.dependencies.length === 0 && <EmptyRow colSpan={6} message="No dependencies recorded yet." />}
            {detail.dependencies.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-2.5 px-2 text-ink"><strong>{row.name}</strong></td>
                <td className="py-2.5 px-2 text-ink">{row.type}</td>
                <td className="py-2.5 px-2 text-ink">{row.direction}</td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={row.health} /></td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={row.criticality} /></td>
                <td className="py-2.5 px-2 text-ink">{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}

export function IntegrationsTab({ detail }: { detail: EcosystemModuleDetail }) {
  return (
    <SectionCard title="Integrations" description="External and internal services this module integrates with." aside={<Plug size={16} className="text-[#74070a]" />}>
      <table className="w-full text-left text-[12px] border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2.5 px-2 font-bold text-muted">Name</th>
            <th className="py-2.5 px-2 font-bold text-muted">Provider</th>
            <th className="py-2.5 px-2 font-bold text-muted">Category</th>
            <th className="py-2.5 px-2 font-bold text-muted">Status</th>
            <th className="py-2.5 px-2 font-bold text-muted">Last Checked</th>
            <th className="py-2.5 px-2 font-bold text-muted">Latency</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {detail.integrations.length === 0 && <EmptyRow colSpan={6} message="No integrations recorded yet." />}
          {detail.integrations.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-2.5 px-2 text-ink"><strong>{row.name}</strong></td>
              <td className="py-2.5 px-2 text-ink">{row.provider}</td>
              <td className="py-2.5 px-2 text-ink">{row.category}</td>
              <td className="py-2.5 px-2 text-ink"><StatusPill value={row.status} /></td>
              <td className="py-2.5 px-2 text-ink">{row.lastChecked}</td>
              <td className="py-2.5 px-2 text-ink">{row.latency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

export function FeatureFlagsTab({ detail, onEditFlag }: { detail: EcosystemModuleDetail; onEditFlag: (flag: FeatureFlagRow) => void }) {
  return (
    <SectionCard title="Feature Flags & Rollout" description="Every flag gating this module's behaviour, with approval, rollout and expiry metadata." aside={<FlagIcon size={16} className="text-[#74070a]" />}>
      <table className="w-full text-left text-[12px] border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2.5 px-2 font-bold text-muted">Flag Key</th>
            <th className="py-2.5 px-2 font-bold text-muted">State</th>
            <th className="py-2.5 px-2 font-bold text-muted">Audience</th>
            <th className="py-2.5 px-2 font-bold text-muted">Rollout</th>
            <th className="py-2.5 px-2 font-bold text-muted">Approval Status</th>
            <th className="py-2.5 px-2 font-bold text-muted">Expiry</th>
            <th className="py-2.5 px-2 font-bold text-muted">Updated At</th>
            <th className="py-2.5 px-2 font-bold text-muted">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {detail.featureFlags.length === 0 && <EmptyRow colSpan={8} message="No feature flags recorded yet." />}
          {detail.featureFlags.map((flag) => (
            <tr key={flag.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-2.5 px-2 text-ink"><strong>{flag.flagKey}</strong></td>
              <td className="py-2.5 px-2 text-ink"><StatusPill value={flag.state} /></td>
              <td className="py-2.5 px-2 text-ink">{flag.audience}</td>
              <td className="py-2.5 px-2 text-ink">{flag.rollout}%</td>
              <td className="py-2.5 px-2 text-ink"><StatusPill value={flag.approvalStatus} /></td>
              <td className="py-2.5 px-2 text-ink">{flag.expiry}</td>
              <td className="py-2.5 px-2 text-ink">{flag.updatedAt}</td>
              <td className="py-2.5 px-2 text-ink"><button type="button" className="text-[11px] font-bold text-[#741d35] hover:underline" onClick={() => onEditFlag(flag)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

