"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, History, TrendingUp } from "lucide-react";
import type { EcosystemModuleDetail } from "../types";
import { EmptyRow, ProgressBar, SectionCard, StatusPill } from "./shared";

export function HealthPerformanceTab({ detail }: { detail: EcosystemModuleDetail }) {
  const hp = detail.healthPerformance;
  return (
    <div className="flex flex-col gap-6">
      <article className="bg-white rounded-xl shadow-sm border border-line p-5">
        <h2 className="text-[13px] font-bold text-ink mb-4">Request Volume (Last 7 Days)</h2>
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hp.requestVolume} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#8a919c" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#8a919c" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} cursor={{ fill: "#f5eaea" }} />
              <Bar dataKey="value" fill="#74070a" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Average Latency</span><strong className="text-[20px] text-ink">{hp.averageLatency}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Uptime</span><strong className="text-[20px] text-ink">{hp.uptime}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Recommendation Success</span><strong className="text-[20px] text-ink">{hp.recommendationSuccess}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Error Trend</span><strong className="text-[20px] text-ink">{hp.errorTrend}</strong></div>
      </section>
    </div>
  );
}

export function AdoptionTab({ detail }: { detail: EcosystemModuleDetail }) {
  const ai = detail.adoptionInsights;
  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Monthly Active Users</span><strong className="text-[20px] text-ink">{ai.monthlyActiveUsers.toLocaleString()}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Monthly Conversations</span><strong className="text-[20px] text-ink">{ai.monthlyConversations.toLocaleString()}</strong></div>
        <div className="bg-white rounded-xl shadow-sm border border-line p-5 flex flex-col gap-1"><span className="text-[12px] font-bold text-muted">Adoption Rate</span><strong className="text-[20px] text-ink">{ai.adoptionRate}%</strong></div>
      </section>
      <SectionCard title="Adoption Breakdown" description="Where adoption is concentrated this month." aside={<TrendingUp size={16} className="text-[#74070a]" />} scroll={false}>
        <div className="flex flex-col divide-y divide-line">
          {ai.adoptionByCohort.map((cohort) => (
            <div key={cohort.label} className="flex items-center justify-between p-4 bg-white hover:bg-[#f8fafc] transition-colors text-[12px]">
              <span className="font-semibold text-ink">{cohort.label}</span>
              <div className="flex items-center gap-2.5">
                <span className="w-[120px] block">
                  <ProgressBar value={cohort.value} />
                </span>
                <strong className="w-[30px] text-right font-mono text-[11px] text-muted">{cohort.value}%</strong>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export function AlertsTab({ detail }: { detail: EcosystemModuleDetail }) {
  return (
    <SectionCard title="Alerts" description="Every open alert for this module, most urgent first." aside={<AlertTriangle size={16} className="text-[#74070a]" />} scroll={false}>
      <div className="flex flex-col divide-y divide-line">
        {detail.alerts.length === 0 && <p className="p-5 text-muted text-[12px]">No open alerts for this module.</p>}
        {detail.alerts.map((alert) => (
          <div key={alert.id} className="flex items-center justify-between p-4 bg-white hover:bg-[#f8fafc] transition-colors text-[12px]">
            <span className="text-ink">{alert.message}</span>
            <div className="flex items-center gap-2.5">
              <StatusPill value={`Due ${alert.due}`} tone={alert.tone} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function AuditHistoryTab({ detail }: { detail: EcosystemModuleDetail }) {
  return (
    <SectionCard title="Audit History" description="Every recorded action for this module, most recent first." aside={<History size={16} className="text-[#74070a]" />}>
      <table className="w-full text-left text-[12px] border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2.5 px-2 font-bold text-muted">Timestamp</th>
            <th className="py-2.5 px-2 font-bold text-muted">Actor</th>
            <th className="py-2.5 px-2 font-bold text-muted">Action</th>
            <th className="py-2.5 px-2 font-bold text-muted">Detail</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {detail.auditHistory.length === 0 && <EmptyRow colSpan={4} message="No audit history recorded yet." />}
          {detail.auditHistory.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-2.5 px-2 text-ink whitespace-nowrap">{entry.timestamp}</td>
              <td className="py-2.5 px-2 text-ink">{entry.actor}</td>
              <td className="py-2.5 px-2 text-ink"><strong>{entry.action}</strong></td>
              <td className="py-2.5 px-2 text-ink min-w-[320px] whitespace-normal leading-snug">{entry.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

