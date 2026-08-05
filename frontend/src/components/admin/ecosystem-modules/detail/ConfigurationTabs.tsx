"use client";

import { CalendarClock, KeyRound, Layers, Settings2 } from "lucide-react";
import type { ConfigParameterRow, EcosystemModuleDetail } from "../types";
import { EmptyRow, SectionCard, StatusPill } from "./shared";

export function ConfigurationTab({ detail, onConfigAction }: { detail: EcosystemModuleDetail; onConfigAction: (parameter: ConfigParameterRow) => void }) {
  const total = detail.configParameters.length;
  const secrets = detail.configParameters.filter((row) => row.secret).length;
  const passing = detail.configParameters.filter((row) => row.validationStatus === "Pass").length;

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Total Parameters</span><strong className="text-[20px] text-ink">{total}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Secret Parameters</span><strong className="text-[20px] text-ink">{secrets}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Passing Validation</span><strong className="text-[20px] text-ink">{passing}/{total}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Configuration Progress</span><strong className="text-[20px] text-ink">{detail.configSummary.configurationProgress}%</strong></div>
      </section>
      <SectionCard
        title="Active Configuration Parameters"
        description="Configuration key and environment variable are kept as separate fields. Secret values are never rendered — only rotated."
        aside={<Settings2 size={16} className="text-[#74070a]" />}
      >
        <table className="w-full text-left text-[12px] border-collapse min-w-[1400px]">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2.5 px-2 font-bold text-muted">Configuration Key</th>
              <th className="py-2.5 px-2 font-bold text-muted">Environment Variable</th>
              <th className="py-2.5 px-2 font-bold text-muted">Category</th>
              <th className="py-2.5 px-2 font-bold text-muted">Environment</th>
              <th className="py-2.5 px-2 font-bold text-muted">Current Value</th>
              <th className="py-2.5 px-2 font-bold text-muted">Secret</th>
              <th className="py-2.5 px-2 font-bold text-muted">Required</th>
              <th className="py-2.5 px-2 font-bold text-muted">Validation Status</th>
              <th className="py-2.5 px-2 font-bold text-muted">Source</th>
              <th className="py-2.5 px-2 font-bold text-muted">Last Updated</th>
              <th className="py-2.5 px-2 font-bold text-muted">Updated By</th>
              <th className="py-2.5 px-2 font-bold text-muted">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {detail.configParameters.length === 0 && <EmptyRow colSpan={12} message="No configuration parameters recorded yet." />}
            {detail.configParameters.map((parameter) => (
              <tr key={parameter.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-2.5 px-2 text-ink">{parameter.configKey}</td>
                <td className="py-2.5 px-2 text-ink font-mono text-[11px]">{parameter.envVariable}</td>
                <td className="py-2.5 px-2 text-ink">{parameter.category}</td>
                <td className="py-2.5 px-2 text-ink">{parameter.environment}</td>
                <td className="py-2.5 px-2 text-ink">{parameter.secret ? <span className="font-mono text-muted tracking-widest text-[10px] flex items-center gap-1.5"><KeyRound size={11} /> ••••••••</span> : parameter.currentValue}</td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={parameter.secret ? "Yes" : "No"} /></td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={parameter.required ? "Yes" : "No"} /></td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={parameter.validationStatus} /></td>
                <td className="py-2.5 px-2 text-ink">{parameter.source}</td>
                <td className="py-2.5 px-2 text-ink">{parameter.lastUpdated}</td>
                <td className="py-2.5 px-2 text-ink">{parameter.updatedBy}</td>
                <td className="py-2.5 px-2 text-ink"><button type="button" className="text-[11px] font-bold text-[#741d35] hover:underline" onClick={() => onConfigAction(parameter)}>{parameter.secret ? "Rotate Secret" : "Edit"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}

export function VersionsTab({ detail, onScheduleRelease }: { detail: EcosystemModuleDetail; onScheduleRelease: () => void }) {
  return (
    <SectionCard
      title="Versions & Releases"
      description="Full release history for this module, most recent first."
      aside={<button type="button" className="text-[12px] font-bold text-[#741d35] flex items-center gap-1.5 hover:underline bg-[#f8fafc] px-3 py-1.5 rounded border border-line shadow-sm" onClick={onScheduleRelease}><CalendarClock size={14} />Schedule Release</button>}
    >
      <table className="w-full text-left text-[12px] border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2.5 px-2 font-bold text-muted">Version</th>
            <th className="py-2.5 px-2 font-bold text-muted">Type</th>
            <th className="py-2.5 px-2 font-bold text-muted">Status</th>
            <th className="py-2.5 px-2 font-bold text-muted">Released On</th>
            <th className="py-2.5 px-2 font-bold text-muted">Released By</th>
            <th className="py-2.5 px-2 font-bold text-muted">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {detail.versionsReleases.length === 0 && <EmptyRow colSpan={6} message="No release history recorded yet." />}
          {detail.versionsReleases.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-2.5 px-2 text-ink"><strong>{row.version}</strong></td>
              <td className="py-2.5 px-2 text-ink">{row.releaseType}</td>
              <td className="py-2.5 px-2 text-ink"><StatusPill value={row.status} /></td>
              <td className="py-2.5 px-2 text-ink">{row.releasedOn}</td>
              <td className="py-2.5 px-2 text-ink">{row.releasedBy}</td>
              <td className="py-2.5 px-2 text-ink min-w-[220px] whitespace-normal leading-snug">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

export function EnvironmentsTab({ detail }: { detail: EcosystemModuleDetail }) {
  return (
    <SectionCard title="Environments" description="Deployment status across every environment tier." aside={<Layers size={16} className="text-[#74070a]" />}>
      <table className="w-full text-left text-[12px] border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2.5 px-2 font-bold text-muted">Environment</th>
            <th className="py-2.5 px-2 font-bold text-muted">Status</th>
            <th className="py-2.5 px-2 font-bold text-muted">Endpoint</th>
            <th className="py-2.5 px-2 font-bold text-muted">Last Deployed</th>
            <th className="py-2.5 px-2 font-bold text-muted">Deployed By</th>
            <th className="py-2.5 px-2 font-bold text-muted">Drift Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {detail.environments.length === 0 && <EmptyRow colSpan={6} message="No environments recorded yet." />}
          {detail.environments.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-2.5 px-2 text-ink"><strong>{row.name}</strong></td>
              <td className="py-2.5 px-2 text-ink"><StatusPill value={row.status} /></td>
              <td className="py-2.5 px-2 text-ink font-mono text-[11px]">{row.endpoint}</td>
              <td className="py-2.5 px-2 text-ink">{row.lastDeployed}</td>
              <td className="py-2.5 px-2 text-ink">{row.deployedBy}</td>
              <td className="py-2.5 px-2 text-ink"><StatusPill value={row.driftStatus} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

