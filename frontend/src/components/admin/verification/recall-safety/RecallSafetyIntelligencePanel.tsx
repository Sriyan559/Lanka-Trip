"use client";
import React from 'react';
import {
  RightIntelligenceRail,
  RailSection,
  HealthScoreGauge,
} from '@/components/admin/shared/RightIntelligenceRail';
import {
  AlertTriangle, AlertCircle, Info, CheckCircle2,
  ShieldAlert, Package, Users, FileText, Activity,
  Clock, ArrowRight, Bell,
} from 'lucide-react';
import {
  RECALL_ALERTS_DEFAULT,
  SIGNAL_BARS,
  STATUS_DEFAULTS,
  type RecallAlert,
  type SignalBar,
} from './recallSafetyMock';

// ── Alert severity styles ────────────────────────────────────────────────────
const ALERT_STYLES: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  critical: { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    icon: AlertTriangle },
  high:     { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: AlertCircle },
  medium:   { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: Info },
  low:      { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  icon: CheckCircle2 },
};

// ── Signal bar row ────────────────────────────────────────────────────────────
function SignalBarRow({ bar }: { bar: SignalBar }) {
  const pct = Math.min(100, Math.max(0, bar.value));
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-gray-600">{bar.label}</span>
        <span className="font-bold" style={{ color: bar.color }}>{pct}%</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: bar.color }} />
      </div>
    </div>
  );
}

// ── Summary metric tile ───────────────────────────────────────────────────────
function SummaryTile({ label, value, tone = 'neutral' }: { label: string; value: string | number; tone?: string }) {
  const tc = tone === 'danger' ? 'text-red-700' : tone === 'warning' ? 'text-amber-700' : 'text-gray-900';
  return (
    <div className="flex flex-col items-center bg-gray-50 border border-gray-100 rounded p-1.5 text-center">
      <span className={`text-[13px] font-bold ${tc}`}>{value}</span>
      <span className="text-[9px] text-gray-500 mt-0.5 leading-tight">{label}</span>
    </div>
  );
}

// ── Quick action button ───────────────────────────────────────────────────────
function QuickActionBtn({ label, urgent = false }: { label: string; urgent?: boolean }) {
  return (
    <button className={`w-full text-left text-[10px] px-2 py-1.5 rounded border font-medium transition-colors truncate ${
      urgent
        ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
    }`}>
      {label}
    </button>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────
interface RecallSafetyIntelligencePanelProps {
  data?: any;
}

export function RecallSafetyIntelligencePanel({ data }: RecallSafetyIntelligencePanelProps) {
  const health         = data?.health          ?? {};
  const healthScore    = health.score          ?? 0;
  const healthLabel    = health.label          ?? 'Stable';
  const healthStatus   = health.status         ?? 'No Critical Recalls';
  const healthColor    = healthScore >= 80 ? '#16a34a' : healthScore >= 60 ? '#f59e0b' : '#dc2626';

  const healthMetrics  = (SIGNAL_BARS).map((bar) => ({
    label: bar.label,
    value: `${data?.signals?.[bar.label] ?? 0}%`,
    progress: data?.signals?.[bar.label] ?? 0,
  }));

  const alerts: RecallAlert[]   = data?.alerts ?? RECALL_ALERTS_DEFAULT;
  const signals: SignalBar[]    = SIGNAL_BARS.map((b) => ({
    ...b,
    value: data?.signal_scores?.[b.label] ?? 0,
  }));

  // Status summary
  const statusRows = STATUS_DEFAULTS.slice(0, 6).map((s) => ({
    label: s.label,
    count: data?.status_summary?.[s.label] ?? 0,
    color: s.color,
  }));

  // System summary
  const sys = data?.system_summary ?? {};

  // Failure metrics
  const failures = data?.failures ?? {
    cases_failed: 0,
    customer_response: 0,
    regulatory_escalations: 0,
    overdue_quarantines: 0,
  };

  return (
    <RightIntelligenceRail>

      {/* A: Health Gauge */}
      <RailSection title="Recall & Safety Intelligence Center">
        <HealthScoreGauge
          score={healthScore}
          label={healthLabel}
          statusText={healthStatus}
          statusColor={healthColor}
          metrics={healthMetrics}
        />
      </RailSection>

      {/* B: Signal Scores */}
      <RailSection title="Signal Monitoring">
        <div className="flex flex-col gap-2">
          {signals.map((bar) => <SignalBarRow key={bar.label} bar={bar} />)}
        </div>
      </RailSection>

      {/* C: Priority Alerts */}
      <RailSection
        title="Safety Alerts & Signals"
        action={
          <button className="text-[10px] text-[#7a0023] font-semibold flex items-center gap-0.5">
            View all <ArrowRight size={10} />
          </button>
        }
      >
        <div className="flex flex-col gap-1.5">
          {alerts.map((alert) => {
            const style = ALERT_STYLES[alert.severity] ?? ALERT_STYLES.low;
            const Icon  = style.icon;
            return (
              <div key={alert.id} className={`flex items-start gap-1.5 px-2 py-1.5 rounded border ${style.bg} ${style.border}`}>
                <Icon size={11} className={`${style.text} mt-0.5 flex-shrink-0`} />
                <div className="flex flex-col min-w-0">
                  <span className={`text-[10px] font-semibold ${style.text} leading-tight`}>{alert.message}</span>
                  <span className="text-[9px] text-gray-400 mt-0.5">{alert.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </RailSection>

      {/* D: Incident Status Summary */}
      <RailSection title="Incident Status Summary">
        <div className="border border-gray-100 rounded-md p-2 bg-gray-50">
          {statusRows.map((s) => (
            <div key={s.label} className="flex items-center justify-between py-0.5 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-gray-600">{s.label}</span>
              </div>
              <span className="font-bold text-gray-900">{s.count}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 mt-1 pt-1 flex justify-between text-[10px] font-bold text-gray-900">
            <span>Total</span>
            <span>{statusRows.reduce((a, s) => a + s.count, 0)}</span>
          </div>
        </div>
      </RailSection>

      {/* E: Recall System Summary */}
      <RailSection title="Recall System Summary">
        <div className="grid grid-cols-2 gap-1.5">
          <SummaryTile label="Open Cases"          value={sys.open_cases           ?? 0} />
          <SummaryTile label="Orders Pending"      value={sys.orders_pending       ?? 0} />
          <SummaryTile label="Quarantine Pending"  value={sys.quarantine_pending   ?? 0} tone="warning" />
          <SummaryTile label="Regulatory"          value={sys.regulatory           ?? 0} />
          <SummaryTile label="Active Suppliers"    value={sys.active_suppliers     ?? 0} />
          <SummaryTile label="Quarantined"         value={sys.quarantined          ?? 0} tone="warning" />
          <SummaryTile label="Avg Closure"         value={sys.avg_closure          ?? '—'} />
          <SummaryTile label="Avg Response"        value={sys.avg_response         ?? '—'} />
        </div>
      </RailSection>

      {/* F: Failure Metrics */}
      <RailSection title="Recall Failure Metrics">
        <div className="flex flex-col gap-1.5">
          {[
            { label: 'Cases Failed',            value: failures.cases_failed,           tone: 'danger' as const },
            { label: 'Customer Response',       value: failures.customer_response,       tone: 'danger' as const },
            { label: 'Regulatory Escalations',  value: failures.regulatory_escalations, tone: 'warning' as const },
            { label: 'Overdue Quarantines',     value: failures.overdue_quarantines,    tone: 'danger' as const },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[10px]">
              <span className="text-gray-600">{item.label}</span>
              <span className={`font-bold ${item.tone === 'danger' ? 'text-red-600' : 'text-amber-600'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </RailSection>

      {/* G: Quick Events */}
      <RailSection title="Recent & Opening Events">
        <div className="grid grid-cols-2 gap-1.5">
          <QuickActionBtn label="Case Review Escalated"       urgent />
          <QuickActionBtn label="External Event Alert"        urgent />
          <QuickActionBtn label="Pending Source Review" />
          <QuickActionBtn label="Critical Evaluation" urgent />
          <QuickActionBtn label="Corrective Capacity" />
          <QuickActionBtn label="Safety Case Escalation"      urgent />
          <QuickActionBtn label="Critical Incident Candidate" urgent />
          <QuickActionBtn label="Safety Committee Review" />
        </div>
      </RailSection>

    </RightIntelligenceRail>
  );
}
