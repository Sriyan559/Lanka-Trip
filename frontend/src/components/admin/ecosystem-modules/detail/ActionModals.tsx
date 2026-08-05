"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { X } from "lucide-react";
import {
  requestModuleReview,
  requestProductionEnablement,
  retireModule,
  rotateSecret,
  scheduleRelease,
  suspendModule,
  updateFeatureFlagRollout,
} from "@/services/api/ecosystemModuleDetail";
import type { AuditHistoryEntry, FeatureFlagRow } from "../types";

function ModalFrame({
  eyebrow,
  title,
  intro,
  onClose,
  onSubmit,
  busy,
  error,
  submitLabel,
  destructive = false,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  busy: boolean;
  error: string;
  submitLabel: string;
  destructive?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form className="bg-white rounded-xl shadow-xl w-full max-w-[480px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onSubmit={onSubmit} aria-labelledby="action-modal-title">
        <div className="px-5 py-4 border-b border-line flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">{eyebrow}</p>
            <h2 id="action-modal-title" className="text-[16px] font-extrabold text-ink leading-tight">{title}</h2>
          </div>
          <button className="text-muted hover:text-ink hover:bg-canvas p-1 rounded-md transition-colors" type="button" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>
        <p className="px-5 py-4 text-[13px] text-ink leading-relaxed border-b border-line bg-[#f8fafc]">{intro}</p>
        {children}
        {error && <p className="mx-5 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-danger text-[12px] font-bold" role="alert">{error}</p>}
        <div className="px-5 py-4 border-t border-line bg-[#f8fafc] flex justify-end gap-3 mt-auto">
          <button className="px-4 py-2 rounded-lg text-[12px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50" type="button" onClick={onClose} disabled={busy}>Cancel</button>
          <button
            className="px-4 py-2 rounded-lg text-[12px] font-bold text-white bg-[#741d35] border border-[#741d35] hover:bg-[#5d172a] transition-colors shadow-sm disabled:opacity-50"
            type="submit"
            disabled={busy}
            style={destructive ? { background: "#b91c1c", borderColor: "#b91c1c" } : undefined}
          >
            {busy ? "Submitting..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

type SuccessHandler = (entry: AuditHistoryEntry, notice: string) => void;

export function ProductionEnablementModal({ moduleKey, onClose, onSuccess }: { moduleKey: string; onClose: () => void; onSuccess: SuccessHandler }) {
  const [reason, setReason] = useState("");
  const [evidenceLink, setEvidenceLink] = useState("");
  const [securityApproved, setSecurityApproved] = useState(false);
  const [complianceApproved, setComplianceApproved] = useState(false);
  const [pilotMetricsReviewed, setPilotMetricsReviewed] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const entry = await requestProductionEnablement(moduleKey, { reason, evidenceLink, securityApproved, complianceApproved, pilotMetricsReviewed });
      onSuccess(entry, "Production enablement requested. Production stays disabled until final sign-off is recorded.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The request could not be submitted.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ModalFrame
      eyebrow="Controlled frontend workflow"
      title="Request production enablement"
      intro="This submits a request only. Production is not enabled by this form — security review, compliance review and pilot metrics all need confirmed sign-off first."
      onClose={onClose}
      onSubmit={submit}
      busy={busy}
      error={error}
      submitLabel="Submit request"
    >
      <div className="flex flex-col gap-4 p-5">
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Reason for this request
          <textarea className="w-full min-h-[100px] p-3 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow resize-y" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Explain why this module is ready for production enablement..." />
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Evidence link
          <input className="w-full p-2.5 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow" value={evidenceLink} onChange={(event) => setEvidenceLink(event.target.value)} placeholder="Link to pilot report, dashboard, or review doc" />
        </label>
        <label className="flex items-center gap-2 text-[12px] text-ink cursor-pointer">
          <input type="checkbox" className="rounded border-line text-[#741d35] focus:ring-[#741d35]" checked={securityApproved} onChange={(event) => setSecurityApproved(event.target.checked)} />
          Security review is approved for this release
        </label>
        <label className="flex items-center gap-2 text-[12px] text-ink cursor-pointer">
          <input type="checkbox" className="rounded border-line text-[#741d35] focus:ring-[#741d35]" checked={complianceApproved} onChange={(event) => setComplianceApproved(event.target.checked)} />
          Compliance review is approved for this release
        </label>
        <label className="flex items-center gap-2 text-[12px] text-ink cursor-pointer">
          <input type="checkbox" className="rounded border-line text-[#741d35] focus:ring-[#741d35]" checked={pilotMetricsReviewed} onChange={(event) => setPilotMetricsReviewed(event.target.checked)} />
          Pilot metrics have been reviewed and meet the release bar
        </label>
      </div>
    </ModalFrame>
  );
}

export function ScheduleReleaseModal({ moduleKey, targetVersion, onClose, onSuccess }: { moduleKey: string; targetVersion: string; onClose: () => void; onSuccess: SuccessHandler }) {
  const [reason, setReason] = useState("");
  const [version, setVersion] = useState(targetVersion);
  const [scheduledDate, setScheduledDate] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const entry = await scheduleRelease(moduleKey, { reason, version, scheduledDate });
      onSuccess(entry, `${version} scheduled for ${scheduledDate}.`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The release could not be scheduled.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ModalFrame
      eyebrow="Controlled frontend workflow"
      title="Schedule release"
      intro="Scheduling adds a candidate entry to Versions & Releases. It does not deploy or enable anything by itself."
      onClose={onClose}
      onSubmit={submit}
      busy={busy}
      error={error}
      submitLabel="Schedule release"
    >
      <div className="flex flex-col gap-4 p-5">
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Target version
          <input className="w-full p-2.5 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow" value={version} onChange={(event) => setVersion(event.target.value)} placeholder="v1.0.0" />
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Scheduled date
          <input className="w-full p-2.5 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow" type="date" value={scheduledDate} onChange={(event) => setScheduledDate(event.target.value)} />
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Reason
          <textarea className="w-full min-h-[100px] p-3 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow resize-y" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="What's included in this release?" />
        </label>
      </div>
    </ModalFrame>
  );
}

export function SuspendModuleModal({ moduleKey, moduleName, onClose, onSuccess }: { moduleKey: string; moduleName: string; onClose: () => void; onSuccess: SuccessHandler }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const entry = await suspendModule(moduleKey, reason);
      onSuccess(entry, `Suspension requested for ${moduleName}. It remains operational until the review is complete.`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The request could not be submitted.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ModalFrame
      eyebrow="Controlled frontend workflow — high impact"
      title={`Suspend ${moduleName}`}
      intro="This records a suspension request for review. The module is not taken offline immediately — a separate approval completes the state change."
      onClose={onClose}
      onSubmit={submit}
      busy={busy}
      error={error}
      submitLabel="Request suspension"
      destructive
    >
      <div className="flex flex-col gap-4 p-5">
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Reason (required for the audit record)
          <textarea className="w-full min-h-[100px] p-3 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow resize-y" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why does this module need to be suspended?" />
        </label>
      </div>
    </ModalFrame>
  );
}

export function RetireModuleModal({ moduleKey, moduleName, onClose, onSuccess }: { moduleKey: string; moduleName: string; onClose: () => void; onSuccess: SuccessHandler }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const entry = await retireModule(moduleKey, reason);
      onSuccess(entry, `Retirement requested for ${moduleName}. It stays active until the retirement plan is approved.`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The request could not be submitted.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ModalFrame
      eyebrow="Controlled frontend workflow — high impact"
      title={`Retire ${moduleName}`}
      intro="This records a retirement request for review, including a migration or sunset plan. The module stays active until that plan is approved."
      onClose={onClose}
      onSubmit={submit}
      busy={busy}
      error={error}
      submitLabel="Request retirement"
      destructive
    >
      <div className="flex flex-col gap-4 p-5">
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Reason and sunset plan (required for the audit record)
          <textarea className="w-full min-h-[100px] p-3 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow resize-y" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why is this module being retired, and what replaces it?" />
        </label>
      </div>
    </ModalFrame>
  );
}

export function ReviewRequestModal({
  moduleKey,
  kind,
  onClose,
  onSuccess,
}: {
  moduleKey: string;
  kind: "security" | "compliance";
  onClose: () => void;
  onSuccess: SuccessHandler;
}) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const label = kind === "security" ? "security" : "compliance";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const entry = await requestModuleReview(moduleKey, kind, reason);
      onSuccess(entry, `${label[0].toUpperCase()}${label.slice(1)} review requested.`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The request could not be submitted.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ModalFrame
      eyebrow="Controlled frontend workflow"
      title={`Request ${label} review`}
      intro={`This notifies the ${label} team and moves the ${label} status to review pending.`}
      onClose={onClose}
      onSubmit={submit}
      busy={busy}
      error={error}
      submitLabel="Send request"
    >
      <div className="flex flex-col gap-4 p-5">
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Reason
          <textarea className="w-full min-h-[100px] p-3 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow resize-y" value={reason} onChange={(event) => setReason(event.target.value)} placeholder={`What should the ${label} team look at?`} />
        </label>
      </div>
    </ModalFrame>
  );
}

export function RotateSecretModal({ moduleKey, parameter, onClose, onSuccess }: { moduleKey: string; parameter: { id: string; configKey: string }; onClose: () => void; onSuccess: SuccessHandler }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const entry = await rotateSecret(moduleKey, parameter.id, reason);
      onSuccess(entry, `${parameter.configKey} secret rotated.`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The secret could not be rotated.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ModalFrame
      eyebrow="Controlled frontend workflow — secret handling"
      title={`Rotate secret: ${parameter.configKey}`}
      intro="The secret value itself is never shown, entered, or stored in the frontend. Confirming this action instructs the secrets manager to issue a new value."
      onClose={onClose}
      onSubmit={submit}
      busy={busy}
      error={error}
      submitLabel="Rotate secret"
    >
      <div className="flex flex-col gap-4 p-5">
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Reason
          <textarea className="w-full min-h-[100px] p-3 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow resize-y" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why is this secret being rotated?" />
        </label>
      </div>
    </ModalFrame>
  );
}

export function EditFeatureFlagModal({ moduleKey, flag, onClose, onSuccess }: { moduleKey: string; flag: FeatureFlagRow; onClose: () => void; onSuccess: SuccessHandler }) {
  const [rollout, setRollout] = useState(flag.rollout);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const entry = await updateFeatureFlagRollout(moduleKey, flag.id, rollout, reason);
      onSuccess(entry, `${flag.flagKey} rollout updated to ${rollout}%.`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The flag could not be updated.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ModalFrame
      eyebrow="Controlled frontend workflow"
      title={`Edit flag: ${flag.flagKey}`}
      intro="Rollout changes are recorded to the audit history immediately."
      onClose={onClose}
      onSubmit={submit}
      busy={busy}
      error={error}
      submitLabel="Save changes"
    >
      <div className="flex flex-col gap-4 p-5">
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Rollout percentage
          <input className="w-full p-2.5 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow" type="number" min={0} max={100} value={rollout} onChange={(event) => setRollout(Number(event.target.value))} />
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-bold text-ink">
          Reason
          <textarea className="w-full min-h-[100px] p-3 rounded-lg border border-line bg-white text-[13px] font-normal text-ink focus:outline-none focus:border-[#741d35] focus:ring-1 focus:ring-[#741d35] transition-shadow resize-y" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why is the rollout changing?" />
        </label>
      </div>
    </ModalFrame>
  );
}

