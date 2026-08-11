"use client";
import React from 'react';
import {
  RightIntelligenceRail,
  RailSection,
  HealthScoreGauge,
} from '@/components/admin/shared/RightIntelligenceRail';
import {
  AlertTriangle, AlertCircle, Info, CheckCircle2,
  ShieldAlert, Package, Tag, Hash, Copy, FileQuestion,
  Lock, Users, Inbox, ListChecks, Clock,
  Eye, BookOpen
} from 'lucide-react';

interface IntelligencePanelProps {
  data?: any;
}

// ── Section B: Priority Alerts ───────────────────────────────────────────────
const SEVERITY_STYLES: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  Critical: { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    icon: AlertTriangle },
  High:     { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: AlertCircle },
  Medium:   { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: Info },
  Low:      { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  icon: CheckCircle2 },
};

const DEFAULT_ALERTS = [
  { severity: 'Critical', title: 'Counterfeit Products',  count: 0 },
  { severity: 'High',     title: 'Unauthorized Brand Use',count: 0 },
  { severity: 'Medium',   title: 'Packaging Conflicts',   count: 0 },
  { severity: 'Low',      title: 'Identifier Conflicts',  count: 0 },
];

function PriorityAlerts({ alerts = DEFAULT_ALERTS }: { alerts?: typeof DEFAULT_ALERTS }) {
  return (
    <div className="flex flex-col gap-1.5">
      {alerts.map((alert) => {
        const style = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.Low;
        const Icon = style.icon;
        return (
          <div key={alert.severity} className={`flex items-center justify-between px-2.5 py-1.5 rounded border ${style.bg} ${style.border}`}>
            <div className="flex items-center gap-1.5">
              <Icon size={11} className={style.text} />
              <span className={`text-[10px] font-semibold ${style.text}`}>{alert.severity}</span>
              <span className="text-[10px] text-gray-600 ml-0.5">{alert.title}</span>
            </div>
            <span className={`text-[10px] font-bold ${style.text}`}>{alert.count}</span>
          </div>
        );
      })}
      <button className="text-[10px] text-[#7a0023] font-semibold underline text-right mt-1">View all</button>
    </div>
  );
}

// ── Section C/D: Mini Summary Cards ─────────────────────────────────────────
function MiniSummaryRow({ label, value, color = '#6b7280' }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex items-center justify-between text-[10px] py-0.5">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
        <span className="text-gray-600">{label}</span>
      </div>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}

// ── Section G: Quick Queue Item ──────────────────────────────────────────────
function QuickQueueItem({ label, count, icon: Icon }: { label: string; count: number; icon: React.ElementType }) {
  return (
    <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded border border-gray-200 bg-white hover:bg-gray-50 text-[11px] font-medium text-gray-700 transition-colors">
      <div className="flex items-center gap-1.5">
        <Icon size={11} className="text-gray-400" />
        {label}
      </div>
      <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{count}</span>
    </button>
  );
}

// ── Section H: Action Button ─────────────────────────────────────────────────
function ActionBtn({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <button className="flex items-center gap-1 px-2 py-1.5 text-[10px] font-medium text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors truncate w-full text-left">
      <Icon size={10} className="text-gray-500 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );
}

// ── HEALTH METRICS ────────────────────────────────────────────────────────────
const HEALTH_METRICS = [
  { label: 'Brand Auth Coverage',    value: '0%', progress: 0 },
  { label: 'Packaging Authenticity', value: '0%', progress: 0 },
  { label: 'Identifier Integrity',   value: '0%', progress: 0 },
  { label: 'Seller Compliance',      value: '0%', progress: 0 },
  { label: 'Evidence Readiness',     value: '0%', progress: 0 },
  { label: 'Restriction Control',    value: '0%', progress: 0 },
  { label: 'Revalidation Readiness', value: '0%', progress: 0 },
  { label: 'SLA Compliance',         value: '0%', progress: 0 },
  { label: 'Audit Readiness',        value: '0%', progress: 0 },
  { label: 'Detection Coverage',     value: '0%', progress: 0 },
];

export function IntelligenceHealthPanel({ data }: IntelligencePanelProps) {
  const health = data?.health || {};
  const healthScore = health.score ?? 0;
  const healthLabel = health.label ?? 'Good';
  const healthStatus = health.status ?? 'Stable';
  const healthColor = healthScore >= 80 ? '#16a34a' : healthScore >= 60 ? '#f59e0b' : '#dc2626';

  const metrics = HEALTH_METRICS.map((m) => {
    const live = health.metrics?.[m.label];
    return live ? { label: m.label, value: `${live}%`, progress: live } : m;
  });

  const alerts = data?.alerts || DEFAULT_ALERTS;

  // Status summary
  const statusSummary = data?.status_summary || [
    { label: 'Open',           value: 0, color: '#2563eb' },
    { label: 'Under Review',   value: 0, color: '#8b5cf6' },
    { label: 'Awaiting Evid.', value: 0, color: '#f59e0b' },
    { label: 'Restricted',     value: 0, color: '#dc2626' },
    { label: 'Resolved',       value: 0, color: '#16a34a' },
  ];

  // Findings summary
  const findingsSummary = data?.findings_summary || [
    { label: 'Confirmed Counterfeit',  value: 0, color: '#dc2626' },
    { label: 'Unauthorized Brand Use', value: 0, color: '#f97316' },
    { label: 'Packaging Conflicts',    value: 0, color: '#f59e0b' },
    { label: 'Identifier Conflicts',   value: 0, color: '#8b5cf6' },
    { label: 'Duplicate Listings',     value: 0, color: '#2563eb' },
  ];

  // Restriction summary
  const restriction = data?.restriction || { restricted_products: 0, restricted_suppliers: 0, restricted_listings: 0 };

  // Evidence summary
  const evidence = data?.evidence || { pending: 0, received: 0, overdue: 0 };

  const quickQueues = data?.quick_queues || {
    assigned_to_me: 0,
    critical_risk: 0,
    restricted_items: 0,
    evidence_pending: 0,
    sla_breaches: 0,
    duplicate_listings: 0,
  };

  return (
    <RightIntelligenceRail>
      {/* A: Health Gauge */}
      <RailSection title="Authenticity Intelligence Health">
        <HealthScoreGauge
          score={healthScore}
          label={healthLabel}
          statusText={healthStatus}
          statusColor={healthColor}
          metrics={metrics}
        />
      </RailSection>

      {/* B: Priority Alerts */}
      <RailSection
        title="Priority Alerts"
        action={<button className="text-[10px] text-[#7a0023] font-semibold">View all</button>}
      >
        <PriorityAlerts alerts={alerts} />
      </RailSection>

      {/* C: Investigation Status Summary */}
      <RailSection title="Investigation Status Summary">
        <div className="border border-gray-100 rounded-md p-2 bg-gray-50">
          {statusSummary.map((s: any) => (
            <MiniSummaryRow key={s.label} label={s.label} value={s.value} color={s.color} />
          ))}
          <div className="border-t border-gray-200 mt-1 pt-1 flex justify-between text-[10px] font-bold text-gray-900">
            <span>Total</span>
            <span>{statusSummary.reduce((a: number, s: any) => a + (s.value || 0), 0)}</span>
          </div>
        </div>
      </RailSection>

      {/* D: Authenticity Findings Summary */}
      <RailSection title="Authenticity Findings Summary">
        <div className="border border-gray-100 rounded-md p-2 bg-gray-50">
          {findingsSummary.map((f: any) => (
            <MiniSummaryRow key={f.label} label={f.label} value={f.value} color={f.color} />
          ))}
          <div className="border-t border-gray-200 mt-1 pt-1 flex justify-between text-[10px] font-bold text-gray-900">
            <span>Total Findings</span>
            <span>{findingsSummary.reduce((a: number, f: any) => a + (f.value || 0), 0)}</span>
          </div>
        </div>
      </RailSection>

      {/* E: Restriction Summary */}
      <RailSection title="Restriction Summary">
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'Products',   value: restriction.restricted_products },
            { label: 'Suppliers',  value: restriction.restricted_suppliers },
            { label: 'Listings',   value: restriction.restricted_listings },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center bg-red-50 border border-red-100 rounded p-1.5">
              <span className="text-[14px] font-bold text-red-700">{item.value}</span>
              <span className="text-[9px] text-gray-500 mt-0.5 text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </RailSection>

      {/* F: Evidence Summary */}
      <RailSection title="Evidence Summary">
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'Pending',  value: evidence.pending,  color: 'bg-amber-50 border-amber-100 text-amber-700' },
            { label: 'Received', value: evidence.received, color: 'bg-green-50 border-green-100 text-green-700' },
            { label: 'Overdue',  value: evidence.overdue,  color: 'bg-red-50 border-red-100 text-red-700' },
          ].map((item) => (
            <div key={item.label} className={`flex flex-col items-center border rounded p-1.5 ${item.color}`}>
              <span className="text-[14px] font-bold">{item.value}</span>
              <span className="text-[9px] text-gray-500 mt-0.5 text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </RailSection>

      {/* G: Quick Queues */}
      <RailSection title="Quick Queues">
        <div className="flex flex-col gap-1.5">
          <QuickQueueItem label="Assigned to Me"   count={quickQueues.assigned_to_me}   icon={Users} />
          <QuickQueueItem label="Critical Risk"    count={quickQueues.critical_risk}    icon={ShieldAlert} />
          <QuickQueueItem label="Restricted Items" count={quickQueues.restricted_items} icon={Lock} />
          <QuickQueueItem label="Evidence Pending" count={quickQueues.evidence_pending} icon={FileQuestion} />
          <QuickQueueItem label="SLA Breaches"     count={quickQueues.sla_breaches}     icon={Clock} />
          <QuickQueueItem label="Duplicate Listings" count={quickQueues.duplicate_listings} icon={Copy} />
        </div>
      </RailSection>

      {/* H: Final Actions */}
      <RailSection title="Authenticity Actions">
        <div className="grid grid-cols-2 gap-1.5">
          <ActionBtn label="Open Investigation Queue"   icon={Inbox} />
          <ActionBtn label="Review Packaging Conflicts" icon={Package} />
          <ActionBtn label="Review Identifier Conflicts"icon={Hash} />
          <ActionBtn label="Restrict Product"           icon={Lock} />
          <ActionBtn label="Restrict Supplier"          icon={Users} />
          <ActionBtn label="Request Evidence"           icon={FileQuestion} />
          <ActionBtn label="Escalate to Compliance"     icon={AlertTriangle} />
          <ActionBtn label="View Audit Trail"           icon={BookOpen} />
        </div>
      </RailSection>
    </RightIntelligenceRail>
  );
}
