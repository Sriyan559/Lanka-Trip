"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Boxes,
  Cloud,
  Flag as FlagIcon,
  Globe2,
  HeartPulse,
  Landmark,
  Link2,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ConfigParameterRow, DetailTabKey, EcosystemModuleDetail, FeatureFlagRow } from "../types";
import { StatusPill, SectionCard, ViewDetailsLink, ProgressBar } from "./shared";
export function OverviewTab({
  detail,
  onNavigateTab,
  onEditFlag,
  onConfigAction,
}: {
  detail: EcosystemModuleDetail;
  onNavigateTab: (tab: DetailTabKey) => void;
  onEditFlag: (flag: FeatureFlagRow) => void;
  onConfigAction: (parameter: ConfigParameterRow) => void;
}) {
  const { governance, currentRelease, environmentSummary, configSummary, integrationSummary, dependencySummary } = detail;

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <article className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col h-[220px]">
          <h3 className="text-[13px] font-bold text-ink flex items-center gap-2 mb-4 pb-3 border-b border-line"><Users size={14} className="text-[#741d35]" /> Governance</h3>
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Business Owner</span><strong className="text-ink font-bold">{governance.businessOwner}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Technical Owner</span><strong className="text-ink font-bold">{governance.technicalOwner}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Last Review</span><strong className="text-ink font-bold">{governance.lastReview}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Approval Chain</span><strong className="text-ink font-bold">{governance.approvalChain}</strong></div>
          </div>
          <ViewDetailsLink onClick={() => onNavigateTab("audit-history")} />
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col h-[220px]">
          <h3 className="text-[13px] font-bold text-ink flex items-center gap-2 mb-4 pb-3 border-b border-line"><Boxes size={14} className="text-[#741d35]" /> Current Release</h3>
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Current Version</span><strong className="text-ink font-bold">{currentRelease.currentVersion}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Target Version</span><strong className="text-ink font-bold">{currentRelease.targetVersion}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Release Status</span><StatusPill value={currentRelease.releaseStatus} /></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Next Release</span><strong className="text-ink font-bold">{currentRelease.nextRelease}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Rollback Plan</span><StatusPill value={currentRelease.rollbackPlan} /></div>
          </div>
          <ViewDetailsLink onClick={() => onNavigateTab("versions")} />
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col h-[220px]">
          <h3 className="text-[13px] font-bold text-ink flex items-center gap-2 mb-4 pb-3 border-b border-line"><Cloud size={14} className="text-[#741d35]" /> Environment Summary</h3>
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Production Enablement</span><StatusPill value={environmentSummary.productionEnablement} /></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Countries Enabled</span><strong className="text-ink font-bold">{environmentSummary.countriesEnabledSummary}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Primary Region</span><strong className="text-ink font-bold">{environmentSummary.primaryRegion}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Environment Health</span><StatusPill value={environmentSummary.environmentHealth} /></div>
          </div>
          <ViewDetailsLink onClick={() => onNavigateTab("environments")} />
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col h-[220px]">
          <h3 className="text-[13px] font-bold text-ink flex items-center gap-2 mb-4 pb-3 border-b border-line"><Settings2 size={14} className="text-[#741d35]" /> Configuration Summary</h3>
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Secrets-safe completion</span><strong className="text-ink font-bold">{configSummary.secretsSafeCompletion}%</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Parameter coverage</span><strong className="text-ink font-bold">{configSummary.parameterCoverage}%</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Configuration Progress</span><strong className="text-ink font-bold">{configSummary.configurationProgress}%</strong></div>
            <ProgressBar value={configSummary.configurationProgress} />
          </div>
          <ViewDetailsLink onClick={() => onNavigateTab("configuration")} />
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col h-[220px]">
          <h3 className="text-[13px] font-bold text-ink flex items-center gap-2 mb-4 pb-3 border-b border-line"><Link2 size={14} className="text-[#741d35]" /> Integration Summary</h3>
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Services-total completion</span><strong className="text-ink font-bold">{integrationSummary.servicesTotalCompletion}%</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Parameter coverage</span><strong className="text-ink font-bold">{integrationSummary.parameterCoverage}%</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Integration Progress</span><strong className="text-ink font-bold">{integrationSummary.integrationProgress}%</strong></div>
            <ProgressBar value={integrationSummary.integrationProgress} />
          </div>
          <ViewDetailsLink onClick={() => onNavigateTab("integrations")} />
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col h-[220px]">
          <h3 className="text-[13px] font-bold text-ink flex items-center gap-2 mb-4 pb-3 border-b border-line"><Landmark size={14} className="text-[#741d35]" /> Dependency Summary</h3>
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Critical Dependencies</span><strong className="text-ink font-bold">{dependencySummary.criticalDependencies}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Required Dependencies</span><strong className="text-ink font-bold">{dependencySummary.requiredDependencies}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Health Status</span><StatusPill value={dependencySummary.healthStatus} /></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Impact Risk</span><StatusPill value={dependencySummary.impactRisk} /></div>
          </div>
          <ViewDetailsLink onClick={() => onNavigateTab("dependencies")} />
        </article>
      </section>

      <SectionCard title="Feature Flags & Rollout" description="Flags, rollout percentage and audience for this module." aside={<ViewDetailsLink onClick={() => onNavigateTab("feature-flags")} label="Manage flags" />}>
        <table className="w-full text-left text-[12px] border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2.5 px-2 font-bold text-muted">Flag Key</th>
              <th className="py-2.5 px-2 font-bold text-muted">State</th>
              <th className="py-2.5 px-2 font-bold text-muted">Audience</th>
              <th className="py-2.5 px-2 font-bold text-muted">Rollout</th>
              <th className="py-2.5 px-2 font-bold text-muted">Updated At</th>
              <th className="py-2.5 px-2 font-bold text-muted">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {detail.featureFlags.map((flag) => (
              <tr key={flag.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-2.5 px-2 text-ink"><strong>{flag.flagKey}</strong></td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={flag.state} /></td>
                <td className="py-2.5 px-2 text-ink">{flag.audience}</td>
                <td className="py-2.5 px-2 text-ink">{flag.rollout}%</td>
                <td className="py-2.5 px-2 text-ink">{flag.updatedAt}</td>
                <td className="py-2.5 px-2 text-ink"><button type="button" className="text-[11px] font-bold text-[#741d35] hover:underline" onClick={() => onEditFlag(flag)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <SectionCard title="Active Configuration Parameters" description="Configuration key and environment variable are tracked separately. Secret values are never rendered." aside={<ViewDetailsLink onClick={() => onNavigateTab("configuration")} label="Manage configuration" />}>
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
            {detail.configParameters.map((parameter) => (
              <tr key={parameter.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-2.5 px-2 text-ink">{parameter.configKey}</td>
                <td className="py-2.5 px-2 text-ink font-mono text-[11px]">{parameter.envVariable}</td>
                <td className="py-2.5 px-2 text-ink">{parameter.category}</td>
                <td className="py-2.5 px-2 text-ink">{parameter.environment}</td>
                <td className="py-2.5 px-2 text-ink">{parameter.secret ? <span className="font-mono text-muted tracking-widest text-[10px]">••••••••</span> : parameter.currentValue}</td>
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

      <SectionCard title="Country & Legal Readiness" description="Business, legal and privacy review status by market." aside={<ViewDetailsLink onClick={() => onNavigateTab("country-availability")} label="Manage countries" />}>
        <table className="w-full text-left text-[12px] border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2.5 px-2 font-bold text-muted">Country (Code)</th>
              <th className="py-2.5 px-2 font-bold text-muted">Availability</th>
              <th className="py-2.5 px-2 font-bold text-muted">Business Approval</th>
              <th className="py-2.5 px-2 font-bold text-muted">Legal Review</th>
              <th className="py-2.5 px-2 font-bold text-muted">Privacy Review</th>
              <th className="py-2.5 px-2 font-bold text-muted">Languages</th>
              <th className="py-2.5 px-2 font-bold text-muted">Currency</th>
              <th className="py-2.5 px-2 font-bold text-muted">Environment</th>
              <th className="py-2.5 px-2 font-bold text-muted">Effective Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {detail.countryReadiness.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-2.5 px-2 text-ink font-medium">{row.country} ({row.isoCode})</td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={row.availability} /></td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={row.businessApproval} /></td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={row.legalReview} /></td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={row.privacyReview} /></td>
                <td className="py-2.5 px-2 text-ink">{row.languages}</td>
                <td className="py-2.5 px-2 text-ink">{row.currency}</td>
                <td className="py-2.5 px-2 text-ink">{row.environment}</td>
                <td className="py-2.5 px-2 text-ink">{row.effectiveDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="bg-white rounded-xl shadow-sm border border-line flex flex-col p-5">
          <h2 className="text-[13px] font-bold text-ink mb-1 flex items-center gap-2"><HeartPulse size={14} className="text-[#741d35]" />Health & Performance Metrics (Last 7 Days)</h2>
          <p className="text-[11px] text-muted mb-4">Request Volume (Last 7 Days)</p>
          <div className="w-full h-[140px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={detail.healthPerformance.requestVolume} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#8a919c" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#8a919c" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} cursor={{ fill: "#f5eaea" }} />
                <Bar dataKey="value" fill="#74070a" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-auto">
            <div className="flex flex-col gap-1"><span className="text-[11px] font-bold text-muted">Average Latency</span><strong className="text-[14px] text-ink">{detail.healthPerformance.averageLatency}</strong><em className="text-[11px] not-italic text-muted">{detail.healthPerformance.latencyTrend}</em></div>
            <div className="flex flex-col gap-1"><span className="text-[11px] font-bold text-muted">Uptime</span><strong className="text-[14px] text-ink">{detail.healthPerformance.uptime}</strong><em className="text-[11px] not-italic text-success">{detail.healthPerformance.uptimeTrend}</em></div>
            <div className="flex flex-col gap-1"><span className="text-[11px] font-bold text-muted">Recommendation Success</span><strong className="text-[14px] text-ink">{detail.healthPerformance.recommendationSuccess}</strong><em className="text-[11px] not-italic text-success">{detail.healthPerformance.recommendationTrend}</em></div>
            <div className="flex flex-col gap-1"><span className="text-[11px] font-bold text-muted">Error Trend</span><strong className="text-[14px] text-ink">{detail.healthPerformance.errorTrend}</strong><em className="text-[11px] not-italic text-success">{detail.healthPerformance.errorTrendChange}</em></div>
          </div>
          <ViewDetailsLink onClick={() => onNavigateTab("health-performance")} label="View full health workspace" />
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-line flex flex-col p-5">
          <h2 className="text-[13px] font-bold text-ink mb-4">User Adoption & Insights (This Month)</h2>
          <div className="flex flex-col divide-y divide-line mb-4 flex-1 justify-center">
            <div className="flex items-center justify-between py-3"><span className="text-[12px] text-muted">Monthly Active Users</span><div className="flex items-baseline gap-2"><strong className="text-[16px] text-ink font-bold">{detail.adoptionInsights.monthlyActiveUsers.toLocaleString()}</strong><em className="text-[11px] not-italic text-success">{detail.adoptionInsights.activeUsersTrend}</em></div></div>
            <div className="flex items-center justify-between py-3"><span className="text-[12px] text-muted">Monthly Conversations</span><div className="flex items-baseline gap-2"><strong className="text-[16px] text-ink font-bold">{detail.adoptionInsights.monthlyConversations.toLocaleString()}</strong><em className="text-[11px] not-italic text-success">{detail.adoptionInsights.conversationsTrend}</em></div></div>
            <div className="flex items-center justify-between py-3"><span className="text-[12px] text-muted">Adoption Rate</span><div className="flex items-baseline gap-2"><strong className="text-[16px] text-ink font-bold">{detail.adoptionInsights.adoptionRate}%</strong><em className="text-[11px] not-italic text-success">{detail.adoptionInsights.adoptionTrend}</em></div></div>
          </div>
          <ViewDetailsLink onClick={() => onNavigateTab("adoption")} label="View full adoption workspace" />
        </article>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard title="Security & Compliance Detail" scroll={false} aside={<ViewDetailsLink onClick={() => onNavigateTab("security")} label="Open security tab" />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
            <div className="flex flex-col gap-2"><span className="text-[11px] font-bold text-muted">Security Review Status</span><div><StatusPill value={detail.complianceDetail.securityReviewStatus} /></div></div>
            <div className="flex flex-col gap-2"><span className="text-[11px] font-bold text-muted">Open Findings</span><strong className="text-[12px] text-ink">{detail.complianceDetail.openFindings}</strong></div>
            <div className="flex flex-col gap-2"><span className="text-[11px] font-bold text-muted">Critical Findings</span><strong className="text-[12px] text-ink">{detail.complianceDetail.criticalFindings}</strong></div>
            <div className="flex flex-col gap-2"><span className="text-[11px] font-bold text-muted">High Findings</span><strong className="text-[12px] text-ink">{detail.complianceDetail.highFindings}</strong></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 border-t border-line">
            <div className="flex flex-col gap-2"><span className="text-[11px] font-bold text-muted">Privacy Review Required</span><div><StatusPill value={detail.complianceDetail.privacyReviewRequired} /></div></div>
            <div className="flex flex-col gap-2"><span className="text-[11px] font-bold text-muted">Consent Requirement</span><div><StatusPill value={detail.complianceDetail.consentRequirement} /></div></div>
            <div className="flex flex-col gap-2"><span className="text-[11px] font-bold text-muted">Data Retention</span><div><StatusPill value={detail.complianceDetail.dataRetention} /></div></div>
            <div className="flex flex-col gap-2"><span className="text-[11px] font-bold text-muted">Sensitive Data Handling</span><div><StatusPill value={detail.complianceDetail.sensitiveDataHandling} /></div></div>
          </div>
        </SectionCard>

        <SectionCard title="Module Access Control" description="Role-based permissions for this module." aside={<ViewDetailsLink onClick={() => onNavigateTab("access-roles")} label="Manage access roles" />}>
          <table className="w-full text-left text-[12px] border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2.5 px-2 font-bold text-muted">Role</th>
                <th className="py-2.5 px-2 font-bold text-muted">Scope</th>
                <th className="py-2.5 px-2 font-bold text-muted">Environment</th>
                <th className="py-2.5 px-2 font-bold text-muted">View</th>
                <th className="py-2.5 px-2 font-bold text-muted">Configure</th>
                <th className="py-2.5 px-2 font-bold text-muted">Release</th>
                <th className="py-2.5 px-2 font-bold text-muted">Enable Prod.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {detail.accessRoles.slice(0, 5).map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 px-2 text-ink">{row.role}</td>
                  <td className="py-2.5 px-2 text-ink">{row.permissionScope}</td>
                  <td className="py-2.5 px-2 text-ink">{row.environment}</td>
                  <td className="py-2.5 px-2 text-ink">{row.view}</td>
                  <td className="py-2.5 px-2 text-ink">{row.configure}</td>
                  <td className="py-2.5 px-2 text-ink">{row.release}</td>
                  <td className="py-2.5 px-2 text-ink"><StatusPill value={row.enableProduction} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#8a919c", fontSize: 10 }}>
        <ShieldCheck size={12} /> <Globe2 size={12} style={{ marginLeft: 8 }} /> <FlagIcon size={12} style={{ marginLeft: 8 }} />
        <span>Every summary above links to its full workspace tab — nothing here is edited without a controlled action.</span>
      </div>
    </div>
  );
}

