"use client";

import { Globe2, Lock, ShieldAlert, ShieldCheck } from "lucide-react";
import type { EcosystemModuleDetail } from "../types";
import { EmptyRow, SectionCard, StatusPill } from "./shared";

export function CountryAvailabilityTab({ detail, onManageCountries }: { detail: EcosystemModuleDetail; onManageCountries: () => void }) {
  const enabled = detail.countryReadiness.filter((row) => row.availability.toLowerCase().includes("enabled")).length;
  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Markets Tracked</span><strong className="text-[20px] text-ink">{detail.countryReadiness.length}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Enabled Markets</span><strong className="text-[20px] text-ink">{enabled}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Primary Region</span><strong className="text-[20px] text-ink">{detail.environmentSummary.primaryRegion}</strong></div>
      </section>
      <SectionCard
        title="Country & Legal Readiness"
        description="ISO code, legal, privacy, language, currency, environment and effective date per market."
        aside={<button type="button" className="text-[12px] font-bold text-[#741d35] flex items-center gap-1.5 hover:underline bg-[#f8fafc] px-3 py-1.5 rounded border border-line shadow-sm" onClick={onManageCountries}><Globe2 size={14} />Manage Countries</button>}
      >
        <table className="w-full text-left text-[12px] border-collapse min-w-[800px]">
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
            {detail.countryReadiness.length === 0 && <EmptyRow colSpan={9} message="No markets configured yet." />}
            {detail.countryReadiness.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-2.5 px-2 text-ink">{row.country} ({row.isoCode})</td>
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
    </div>
  );
}

export function AccessRolesTab({ detail, onManageAccess }: { detail: EcosystemModuleDetail; onManageAccess: () => void }) {
  return (
    <SectionCard
      title="Module Access Control"
      description="Role-based permission matrix for this module."
      aside={<button type="button" className="text-[12px] font-bold text-[#741d35] flex items-center gap-1.5 hover:underline bg-[#f8fafc] px-3 py-1.5 rounded border border-line shadow-sm" onClick={onManageAccess}><Lock size={14} />Manage Access Roles</button>}
    >
      <table className="w-full text-left text-[12px] border-collapse min-w-[1400px]">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2.5 px-2 font-bold text-muted">Role</th>
            <th className="py-2.5 px-2 font-bold text-muted">Permission Scope</th>
            <th className="py-2.5 px-2 font-bold text-muted">Environment</th>
            <th className="py-2.5 px-2 font-bold text-muted">View</th>
            <th className="py-2.5 px-2 font-bold text-muted">Configure</th>
            <th className="py-2.5 px-2 font-bold text-muted">Release</th>
            <th className="py-2.5 px-2 font-bold text-muted">Enable Production</th>
            <th className="py-2.5 px-2 font-bold text-muted">Manage Flags</th>
            <th className="py-2.5 px-2 font-bold text-muted">View Audit</th>
            <th className="py-2.5 px-2 font-bold text-muted">Last Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {detail.accessRoles.length === 0 && <EmptyRow colSpan={10} message="No access roles recorded yet." />}
          {detail.accessRoles.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-2.5 px-2 text-ink"><strong>{row.role}</strong></td>
              <td className="py-2.5 px-2 text-ink">{row.permissionScope}</td>
              <td className="py-2.5 px-2 text-ink">{row.environment}</td>
              <td className="py-2.5 px-2 text-ink"><StatusPill value={row.view} /></td>
              <td className="py-2.5 px-2 text-ink"><StatusPill value={row.configure} /></td>
              <td className="py-2.5 px-2 text-ink">{row.release}</td>
              <td className="py-2.5 px-2 text-ink"><StatusPill value={row.enableProduction} /></td>
              <td className="py-2.5 px-2 text-ink"><StatusPill value={row.manageFlags} /></td>
              <td className="py-2.5 px-2 text-ink">{row.viewAudit}</td>
              <td className="py-2.5 px-2 text-ink">{row.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

export function SecurityTab({ detail, onRequestReview }: { detail: EcosystemModuleDetail; onRequestReview: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted mb-1">Security Review Status</span><StatusPill value={detail.complianceDetail.securityReviewStatus} /></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted mb-1">Open Findings</span><strong className="text-[20px] text-ink">{detail.complianceDetail.openFindings}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted mb-1">Critical Findings</span><strong className="text-[20px] text-ink">{detail.complianceDetail.criticalFindings}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted mb-1">High Findings</span><strong className="text-[20px] text-ink">{detail.complianceDetail.highFindings}</strong></div>
      </section>
      <SectionCard
        title="Security Findings"
        description="Open findings tracked against this module."
        aside={<button type="button" className="text-[12px] font-bold text-[#741d35] flex items-center gap-1.5 hover:underline bg-[#f8fafc] px-3 py-1.5 rounded border border-line shadow-sm" onClick={onRequestReview}><ShieldAlert size={14} />Request Security Review</button>}
      >
        <table className="w-full text-left text-[12px] border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2.5 px-2 font-bold text-muted">Finding</th>
              <th className="py-2.5 px-2 font-bold text-muted">Severity</th>
              <th className="py-2.5 px-2 font-bold text-muted">Status</th>
              <th className="py-2.5 px-2 font-bold text-muted">Discovered</th>
              <th className="py-2.5 px-2 font-bold text-muted">Owner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {detail.securityFindings.length === 0 && <EmptyRow colSpan={5} message="No open security findings." />}
            {detail.securityFindings.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-2.5 px-2 text-ink min-w-[240px] whitespace-normal leading-snug">{row.title}</td>
                <td className="py-2.5 px-2 text-ink"><StatusPill value={row.severity} /></td>
                <td className="py-2.5 px-2 text-ink">{row.status}</td>
                <td className="py-2.5 px-2 text-ink">{row.discovered}</td>
                <td className="py-2.5 px-2 text-ink">{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}

export function CompliancePrivacyTab({ detail }: { detail: EcosystemModuleDetail }) {
  return (
    <SectionCard title="Compliance & Privacy" description="Privacy review, consent and data-handling posture for this module." aside={<ShieldCheck size={16} className="text-[#74070a]" />} scroll={false}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-5 border-b border-line bg-[#f8fafc]">
        <div className="flex flex-col gap-1.5"><span className="text-[12px] font-bold text-muted uppercase tracking-widest">Privacy Review Required</span><div><StatusPill value={detail.complianceDetail.privacyReviewRequired} /></div></div>
        <div className="flex flex-col gap-1.5"><span className="text-[12px] font-bold text-muted uppercase tracking-widest">Consent Requirement</span><div><StatusPill value={detail.complianceDetail.consentRequirement} /></div></div>
        <div className="flex flex-col gap-1.5"><span className="text-[12px] font-bold text-muted uppercase tracking-widest">Data Retention</span><div><StatusPill value={detail.complianceDetail.dataRetention} /></div></div>
        <div className="flex flex-col gap-1.5"><span className="text-[12px] font-bold text-muted uppercase tracking-widest">Sensitive Data Handling</span><div><StatusPill value={detail.complianceDetail.sensitiveDataHandling} /></div></div>
      </div>
      <p className="p-5 text-muted text-[11px] leading-relaxed">
        Compliance status for this module is <strong className="text-ink">{detail.statusDomains.find((f) => f.key === "compliance")?.value}</strong>, tracked
        against the markets listed under Country Availability. Requesting a compliance review notifies the compliance team and
        moves this status to review pending.
      </p>
    </SectionCard>
  );
}

