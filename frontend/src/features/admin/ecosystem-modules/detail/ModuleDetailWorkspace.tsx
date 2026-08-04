"use client";

import { type MouseEvent as ReactMouseEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Download,
  Flag as FlagIcon,
  GitCompare,
  Globe2,
  HeartPulse,
  History,
  Lock,
  Network,
  PauseCircle,
  Plug,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  SearchX,
  Star,
  Trash2,
  X,
} from "lucide-react";
import "../ecosystem.css";
import { ErrorState, LoadingSkeleton, PermissionDeniedState } from "@/components/admin/common/States";
import { sanitizeInternalRedirect } from "@/lib/authRedirect";
import {
  exportModuleRecord,
  fetchEcosystemModuleDetail,
  getModuleDetailPermissions,
} from "@/services/api/ecosystemModuleDetail";
import { DETAIL_TABS } from "../types";
import type {
  AuditHistoryEntry,
  ConfigParameterRow,
  DetailTabKey,
  EcosystemModuleDetail as ModuleDetailType,
  FeatureFlagRow,
} from "../types";
import { StatusPill } from "./shared";
import { OverviewTab } from "./OverviewTab";
import { ConfigurationTab, EnvironmentsTab, VersionsTab } from "./ConfigurationTabs";
import { DependenciesTab, FeatureFlagsTab, IntegrationsTab } from "./IntegrationTabs";
import { AccessRolesTab, CompliancePrivacyTab, CountryAvailabilityTab, SecurityTab } from "./ComplianceTabs";
import { AdoptionTab, AlertsTab, AuditHistoryTab, HealthPerformanceTab } from "./OperationsTabs";
import {
  EditFeatureFlagModal,
  ProductionEnablementModal,
  RetireModuleModal,
  ReviewRequestModal,
  RotateSecretModal,
  ScheduleReleaseModal,
  SuspendModuleModal,
} from "./ActionModals";

type ModalState =
  | { kind: "none" }
  | { kind: "production-enablement" }
  | { kind: "schedule-release" }
  | { kind: "suspend" }
  | { kind: "retire" }
  | { kind: "review"; reviewKind: "security" | "compliance" }
  | { kind: "edit-flag"; flag: FeatureFlagRow }
  | { kind: "rotate-secret"; parameter: ConfigParameterRow }
  | { kind: "info"; title: string; body: string };

export function ModuleDetailWorkspace({ moduleKey }: { moduleKey: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const [detail, setDetail] = useState<ModuleDetailType | null | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);
  const [modal, setModal] = useState<ModalState>({ kind: "none" });
  const [notice, setNotice] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);

  const screenState = searchParams.get("state") ?? "";
  const readOnly = searchParams.get("access") === "read-only";
  const activeTab = (searchParams.get("tab") as DetailTabKey) || "overview";
  const returnTo = sanitizeInternalRedirect(
    searchParams.get("returnTo"),
    "/admin/ecosystem-modules",
  );
  const permissions = getModuleDetailPermissions(readOnly);

  const updateQuery = useCallback(
    (patch: Record<string, string | undefined>) => {
      const next = new URLSearchParams(searchParamsString);
      Object.entries(patch).forEach(([key, value]) => {
        if (value === undefined || value === "") next.delete(key);
        else next.set(key, value);
      });
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [searchParamsString, pathname, router],
  );

  useEffect(() => {
    let cancelled = false;
    setDetail(undefined);
    fetchEcosystemModuleDetail(moduleKey).then((result) => {
      if (!cancelled) setDetail(result);
    });
    return () => {
      cancelled = true;
    };
  }, [moduleKey, refreshKey]);

  useEffect(() => {
    if (!moreOpen) return;
    function handleClick() {
      setMoreOpen(false);
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [moreOpen]);

  function refresh() {
    setRefreshKey((key) => key + 1);
  }

  function handleSuccess(_entry: AuditHistoryEntry, message: string) {
    setModal({ kind: "none" });
    setNotice(message);
    refresh();
  }

  async function handleExport() {
    if (!detail) return;
    const csv = await exportModuleRecord(moduleKey);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${detail.module.moduleKey}-module-record.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Module record exported.");
  }

  if (screenState === "unauthorized") return <PermissionDeniedState />;

  const forcedNotFound = screenState === "not-found";

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-canvas font-sans">
      <div className="flex items-center gap-4 mb-6">
        <Link href={returnTo} className="flex items-center gap-2 text-[12px] font-bold text-muted hover:text-ink transition-colors px-3 py-1.5 rounded-lg border border-transparent hover:border-line hover:bg-white">
          <ArrowLeft size={13} /> Back to Ecosystem Modules
        </Link>
        <nav className="flex items-center gap-2 text-[12px] font-medium text-muted bg-[#f8fafc] px-3 py-1.5 rounded-lg border border-line" aria-label="Breadcrumb">
          <Link href="/admin/ecosystem-modules" className="hover:text-ink transition-colors">Ecosystem Modules</Link>
          <ChevronRight size={11} className="opacity-50" />
          <span>Module Management</span>
          <ChevronRight size={11} className="opacity-50" />
          <strong className="text-ink font-bold">{detail ? detail.module.moduleName : "Module"}</strong>
        </nav>
      </div>

      {detail === undefined ? (
        <LoadingSkeleton />
      ) : screenState === "error" ? (
        <ErrorState message="Module details could not be loaded from the ecosystem module service. Try again in a moment." />
      ) : detail === null || forcedNotFound ? (
        <div className="py-16 px-4 bg-white rounded-xl shadow-sm border border-line flex flex-col items-center text-center gap-4">
          <SearchX size={36} color="#9aa1ab" />
          <h2 className="text-[18px] font-extrabold text-ink">Module not found</h2>
          <p className="text-[14px] text-muted max-w-[400px]">We couldn&apos;t find a module matching &ldquo;{moduleKey}&rdquo;. It may have been removed, renamed, or the link may be out of date.</p>
          <Link href={returnTo} className="mt-2 px-4 py-2 bg-[#741d35] text-white text-[12px] font-bold rounded-lg hover:bg-[#5d172a] transition-colors shadow-sm">Return to Ecosystem Modules</Link>
        </div>
      ) : (
        <ModuleDetailContent
          detail={detail}
          activeTab={activeTab}
          permissions={permissions}
          readOnly={readOnly}
          screenState={screenState}
          notice={notice}
          moreOpen={moreOpen}
          onDismissNotice={() => setNotice("")}
          onRefresh={refresh}
          onNavigateTab={(tab) => updateQuery({ tab })}
          onToggleMore={(event) => {
            event.stopPropagation();
            setMoreOpen((open) => !open);
          }}
          onExport={() => void handleExport()}
          onOpenModal={setModal}
        />
      )}

      {modal.kind === "production-enablement" && (
        <ProductionEnablementModal moduleKey={moduleKey} onClose={() => setModal({ kind: "none" })} onSuccess={handleSuccess} />
      )}
      {modal.kind === "schedule-release" && detail && (
        <ScheduleReleaseModal moduleKey={moduleKey} targetVersion={detail.currentRelease.targetVersion} onClose={() => setModal({ kind: "none" })} onSuccess={handleSuccess} />
      )}
      {modal.kind === "suspend" && detail && (
        <SuspendModuleModal moduleKey={moduleKey} moduleName={detail.module.moduleName} onClose={() => setModal({ kind: "none" })} onSuccess={handleSuccess} />
      )}
      {modal.kind === "retire" && detail && (
        <RetireModuleModal moduleKey={moduleKey} moduleName={detail.module.moduleName} onClose={() => setModal({ kind: "none" })} onSuccess={handleSuccess} />
      )}
      {modal.kind === "review" && (
        <ReviewRequestModal moduleKey={moduleKey} kind={modal.reviewKind} onClose={() => setModal({ kind: "none" })} onSuccess={handleSuccess} />
      )}
      {modal.kind === "edit-flag" && (
        <EditFeatureFlagModal moduleKey={moduleKey} flag={modal.flag} onClose={() => setModal({ kind: "none" })} onSuccess={handleSuccess} />
      )}
      {modal.kind === "rotate-secret" && (
        <RotateSecretModal moduleKey={moduleKey} parameter={modal.parameter} onClose={() => setModal({ kind: "none" })} onSuccess={handleSuccess} />
      )}
      {modal.kind === "info" && (
        <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setModal({ kind: "none" })}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[480px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-line flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-ink">{modal.title}</h2>
              <button className="text-muted hover:text-ink hover:bg-canvas p-1 rounded-md transition-colors" type="button" onClick={() => setModal({ kind: "none" })} aria-label="Close dialog"><X size={18} /></button>
            </div>
            <div className="p-5 text-[13px] text-ink leading-relaxed">{modal.body}</div>
            <div className="px-5 py-4 border-t border-line bg-[#f8fafc] flex justify-end gap-3">
              <button className="px-4 py-2 rounded-lg text-[12px] font-bold text-white bg-[#741d35] border border-[#741d35] hover:bg-[#5d172a] transition-colors shadow-sm" type="button" onClick={() => setModal({ kind: "none" })}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModuleDetailContent({
  detail,
  activeTab,
  permissions,
  readOnly,
  screenState,
  notice,
  moreOpen,
  onDismissNotice,
  onRefresh,
  onNavigateTab,
  onToggleMore,
  onExport,
  onOpenModal,
}: {
  detail: ModuleDetailType;
  activeTab: DetailTabKey;
  permissions: ReturnType<typeof getModuleDetailPermissions>;
  readOnly: boolean;
  screenState: string;
  notice: string;
  moreOpen: boolean;
  onDismissNotice: () => void;
  onRefresh: () => void;
  onNavigateTab: (tab: DetailTabKey) => void;
  onToggleMore: (event: ReactMouseEvent) => void;
  onExport: () => void;
  onOpenModal: (modal: ModalState) => void;
}) {
  const { module, governance, currentRelease } = detail;

  function info(title: string, body: string) {
    onOpenModal({ kind: "info", title, body });
  }

  return (
    <>
      {readOnly && (
        <div className="mb-6 px-4 py-3 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-[13px] flex items-center gap-2">
          <Lock size={14} /> You have read-only access to this module. Controlled actions are disabled.
        </div>
      )}
      {screenState === "stale" && (
        <div className="mb-6 px-4 py-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg text-[13px] flex items-center gap-2">
          <AlertTriangle size={14} /> This module&apos;s data may be stale — last refreshed at {module.lastUpdated}.
          <button type="button" onClick={onRefresh} className="ml-auto underline font-bold hover:text-yellow-900">Refresh</button>
        </div>
      )}
      {screenState === "partial" && (
        <div className="mb-6 px-4 py-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg text-[13px] flex items-center gap-2">
          <AlertTriangle size={14} /> Some sections could not be loaded from every backing service. Showing the data that is available.
        </div>
      )}
      {notice && (
        <div className="mb-6 px-4 py-3 bg-green-50 text-green-800 border border-green-200 rounded-lg text-[13px] flex items-center justify-between">
          <div className="flex items-center gap-2"><Check size={14} /> {notice}</div>
          <button type="button" onClick={onDismissNotice} className="hover:text-green-900" aria-label="Dismiss"><X size={14} /></button>
        </div>
      )}

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
          <div>
            <h1 className="text-[28px] font-extrabold text-ink leading-tight mb-2 tracking-tight">{module.moduleName}</h1>
            <p className="text-[14px] text-muted max-w-[800px] leading-relaxed">{detail.moduleDescription}</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <div className="flex gap-3">
              <button type="button" className="px-4 py-2 rounded-lg text-[12px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2" onClick={() => info("Compare Versions", "Select two versions from Versions & Releases to compare configuration, health and adoption side by side. Full comparison connects once the backend endpoint is available.")}>
                <GitCompare size={14} /> Compare Versions
              </button>
              <button type="button" className="px-4 py-2 rounded-lg text-[12px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2" onClick={() => onNavigateTab("audit-history")}>
                <History size={14} /> View Audit
              </button>
              <button type="button" className="px-4 py-2 rounded-lg text-[12px] font-bold text-white bg-[#741d35] border border-[#741d35] hover:bg-[#5d172a] hover:border-[#5d172a] transition-colors shadow-sm flex items-center gap-2" onClick={() => info("Review Release Readiness", `Release readiness is currently ${detail.overviewMetrics.find((metric) => metric.id === "release-readiness")?.value ?? "-"}. Full readiness review checklist connects once the backend endpoint is available.`)}>
                <ShieldCheck size={14} /> Review Release Readiness
              </button>
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" className="px-4 py-2 rounded-lg text-[12px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2" onClick={() => onNavigateTab("configuration")}>
                <Settings2 size={14} /> Update Configuration
              </button>
              <button type="button" className="px-4 py-2 rounded-lg text-[12px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!permissions.canRequestReview} onClick={() => onOpenModal({ kind: "review", reviewKind: "security" })}>
                <ShieldAlert size={14} /> Request Security Review
              </button>
              <button type="button" className="px-4 py-2 rounded-lg text-[12px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!permissions.canRequestReview} onClick={() => onOpenModal({ kind: "review", reviewKind: "compliance" })}>
                <ShieldCheck size={14} /> Request Compliance Review
              </button>
              <div className="relative">
                <button type="button" className="px-4 py-2 rounded-lg text-[12px] font-bold text-ink bg-white border border-line hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2" onClick={onToggleMore}>
                  More Actions <ChevronDown size={14} />
                </button>
                {moreOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[240px] bg-white border border-line rounded-xl shadow-xl py-2 z-50 flex flex-col" onMouseDown={(event) => event.stopPropagation()}>
                    <button type="button" className="px-4 py-2 text-[12px] font-medium text-ink hover:bg-gray-50 flex items-center gap-3 text-left w-full transition-colors" onClick={() => onNavigateTab("dependencies")}><Network size={14} className="text-muted" /> Manage Dependencies</button>
                    <button type="button" className="px-4 py-2 text-[12px] font-medium text-ink hover:bg-gray-50 flex items-center gap-3 text-left w-full transition-colors" onClick={() => onNavigateTab("integrations")}><Plug size={14} className="text-muted" /> Manage Integrations</button>
                    <button type="button" className="px-4 py-2 text-[12px] font-medium text-ink hover:bg-gray-50 flex items-center gap-3 text-left w-full transition-colors" onClick={() => onNavigateTab("feature-flags")}><FlagIcon size={14} className="text-muted" /> Manage Feature Flags</button>
                    <button type="button" className="px-4 py-2 text-[12px] font-medium text-ink hover:bg-gray-50 flex items-center gap-3 text-left w-full transition-colors" onClick={() => onNavigateTab("country-availability")}><Globe2 size={14} className="text-muted" /> Manage Countries</button>
                    <button type="button" className="px-4 py-2 text-[12px] font-medium text-ink hover:bg-gray-50 flex items-center gap-3 text-left w-full transition-colors" onClick={() => onNavigateTab("access-roles")}><Lock size={14} className="text-muted" /> Manage Access Roles</button>
                    <div className="h-px bg-line my-2" />
                    <button type="button" className="px-4 py-2 text-[12px] font-medium text-ink hover:bg-gray-50 flex items-center gap-3 text-left w-full transition-colors" onClick={() => onNavigateTab("health-performance")}><HeartPulse size={14} className="text-muted" /> View Health Events</button>
                    <button type="button" className="px-4 py-2 text-[12px] font-medium text-ink hover:bg-gray-50 flex items-center gap-3 text-left w-full transition-colors" onClick={onExport}><Download size={14} className="text-muted" /> Export Module Record</button>
                    <button type="button" className="px-4 py-2 text-[12px] font-medium text-ink hover:bg-gray-50 flex items-center gap-3 text-left w-full transition-colors" onClick={() => onNavigateTab("audit-history")}><History size={14} className="text-muted" /> View Audit History</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
      <div className="flex-1 min-w-0 flex flex-col gap-6">

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 bg-white rounded-xl shadow-sm border border-line p-5">
          <div className="flex flex-col gap-1.5"><span className="text-[11px] font-bold text-muted">Public Module Reference</span><strong className="text-[12px] text-ink">{module.publicReference}</strong></div>
          <div className="flex flex-col gap-1.5"><span className="text-[11px] font-bold text-muted">Database Module ID</span><strong className="text-[12px] text-ink">{module.databaseModuleId}</strong></div>
          <div className="flex flex-col gap-1.5"><span className="text-[11px] font-bold text-muted">Module Key</span><strong className="text-[12px] text-ink">{module.moduleKey}</strong></div>
          <div className="flex flex-col gap-1.5"><span className="text-[11px] font-bold text-muted">Category</span><strong className="text-[12px] text-ink">{module.category}</strong></div>
          <div className="flex flex-col gap-1.5"><span className="text-[11px] font-bold text-muted">Business Owner</span><strong className="text-[12px] text-ink">{governance.businessOwner}</strong></div>
          <div className="flex flex-col gap-1.5"><span className="text-[11px] font-bold text-muted">Technical Owner</span><strong className="text-[12px] text-ink">{governance.technicalOwner}</strong></div>
          <div className="flex flex-col gap-1.5"><span className="text-[11px] font-bold text-muted">Next Release</span><strong className="text-[12px] text-ink">{currentRelease.nextRelease}</strong></div>
          <div className="flex flex-col gap-1.5"><span className="text-[11px] font-bold text-muted">Last Updated</span><strong className="text-[12px] text-ink">{module.lastUpdated}</strong></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 bg-white rounded-xl shadow-sm border border-line p-5">
          {detail.statusDomains.map((field) => (
            <div key={field.key} className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-muted">{field.label}</span>
              <div><StatusPill value={field.value} /></div>
            </div>
          ))}
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none border-b border-line pb-px" aria-label="Module detail sections">
          {DETAIL_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`px-4 py-2.5 text-[12px] font-bold border-b-[3px] transition-colors whitespace-nowrap outline-none ${activeTab === tab.key ? "border-[#741d35] text-[#741d35]" : "border-transparent text-muted hover:text-ink hover:border-line"}`}
              aria-current={activeTab === tab.key ? "page" : undefined}
              onClick={() => onNavigateTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {detail.overviewMetrics.map((metric) => (
            <div key={metric.id} className={`bg-white rounded-xl shadow-sm border border-line p-4 flex flex-col items-center justify-center text-center gap-1.5 transition-transform hover-lift ${metric.tone === "danger" ? "border-red-200 bg-red-50" : metric.tone === "warning" ? "border-orange-200 bg-orange-50" : metric.tone === "success" ? "border-green-200 bg-green-50" : ""}`}>
              <span className="text-[11px] font-bold text-muted">{metric.label}</span>
              <strong className={`text-[20px] font-extrabold ${metric.tone === "danger" ? "text-danger" : metric.tone === "warning" ? "text-warning" : metric.tone === "success" ? "text-success" : "text-ink"}`}>{metric.value}</strong>
            </div>
          ))}
        </section>

        <div className="bg-white rounded-xl shadow-sm border border-line p-5">
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none min-w-[600px]">
            {detail.lifecycleStages.map((stage, index) => {
              const isComplete = stage.state === "complete";
              const isCurrent = stage.state === "current";
              return (
                <div key={stage.key} className="flex-1 flex flex-col items-center gap-2 relative z-10 group">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${isComplete ? "bg-[#741d35] text-white" : isCurrent ? "bg-white border-2 border-[#741d35] text-[#741d35]" : "bg-canvas text-muted border border-line"}`}>
                    {isComplete ? <Check size={14} /> : index + 1}
                  </div>
                  <span className={`text-[11px] font-bold text-center ${isComplete || isCurrent ? "text-ink" : "text-muted"}`}>{stage.label}</span>
                </div>
              );
            })}
          </div>
        </div>

      <div style={{ minHeight: 200 }}>
        {activeTab === "overview" && (
          <OverviewTab
            detail={detail}
            onNavigateTab={onNavigateTab}
            onEditFlag={(flag) => onOpenModal({ kind: "edit-flag", flag })}
            onConfigAction={(parameter) => onOpenModal(parameter.secret ? { kind: "rotate-secret", parameter } : { kind: "edit-flag", flag: { id: parameter.id, flagKey: parameter.configKey, state: "Enabled", audience: "", rollout: 0, approvalStatus: "", expiry: "", updatedAt: "" } })}
          />
        )}
        {activeTab === "configuration" && (
          <ConfigurationTab detail={detail} onConfigAction={(parameter) => onOpenModal(parameter.secret ? { kind: "rotate-secret", parameter } : { kind: "info", title: parameter.configKey, body: `Editing non-secret configuration values updates the audit history immediately. Current value: ${parameter.currentValue}.` })} />
        )}
        {activeTab === "versions" && <VersionsTab detail={detail} onScheduleRelease={() => onOpenModal({ kind: "schedule-release" })} />}
        {activeTab === "environments" && <EnvironmentsTab detail={detail} />}
        {activeTab === "dependencies" && <DependenciesTab detail={detail} />}
        {activeTab === "integrations" && <IntegrationsTab detail={detail} />}
        {activeTab === "feature-flags" && <FeatureFlagsTab detail={detail} onEditFlag={(flag) => onOpenModal({ kind: "edit-flag", flag })} />}
        {activeTab === "country-availability" && <CountryAvailabilityTab detail={detail} onManageCountries={() => onNavigateTab("country-availability")} />}
        {activeTab === "access-roles" && <AccessRolesTab detail={detail} onManageAccess={() => onNavigateTab("access-roles")} />}
        {activeTab === "security" && <SecurityTab detail={detail} onRequestReview={() => onOpenModal({ kind: "review", reviewKind: "security" })} />}
        {activeTab === "compliance-privacy" && <CompliancePrivacyTab detail={detail} />}
        {activeTab === "health-performance" && <HealthPerformanceTab detail={detail} />}
        {activeTab === "adoption" && <AdoptionTab detail={detail} />}
        {activeTab === "alerts" && <AlertsTab detail={detail} />}
        {activeTab === "audit-history" && <AuditHistoryTab detail={detail} />}
      </div>

      </div>

      <aside className="w-full xl:w-[320px] flex flex-col gap-6 shrink-0">
        <section className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
          <h2 className="px-5 py-4 border-b border-line text-[13px] font-bold text-ink flex items-center gap-2"><HeartPulse size={15} className="text-[#741d35]" /> Module Health</h2>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-baseline justify-between mb-2">
              <strong className="text-[32px] font-extrabold text-ink leading-none tracking-tight">{module.healthScore}<span className="text-[14px] text-muted font-bold ml-1">/100</span></strong>
              <StatusPill value={module.riskLevel} />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Availability</span><strong className="text-ink font-bold">{module.availability === null ? "-" : `${module.availability}%`}</strong></div>
              <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Error Rate</span><strong className={`font-bold ${(module.errorRate ?? 0) > 2 ? "text-danger" : "text-ink"}`}>{module.errorRate === null ? "-" : `${module.errorRate}%`}</strong></div>
              <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Open Alerts</span><strong className={`font-bold ${detail.alerts.length > 0 ? "text-danger" : "text-success"}`}>{detail.overviewMetrics.find((m) => m.id === "open-alerts")?.value ?? detail.alerts.length}</strong></div>
              <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Blocking Issues</span><strong className="text-danger font-bold">{detail.overviewMetrics.find((m) => m.id === "blocking-issues")?.value ?? "0"}</strong></div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
          <h2 className="px-5 py-4 border-b border-line text-[13px] font-bold text-ink flex items-center gap-2"><AlertTriangle size={15} className="text-warning" /> Priority Alerts</h2>
          {detail.alerts.length === 0 ? (
            <p className="p-5 text-[12px] text-muted font-medium">No priority alerts right now.</p>
          ) : (
            <div className="flex flex-col divide-y divide-line">
              {detail.alerts.slice(0, 4).map((alert) => (
                <button key={alert.id} type="button" className="p-4 flex items-start gap-3 text-left hover:bg-gray-50 transition-colors" onClick={() => onNavigateTab("alerts")}>
                  <AlertTriangle size={14} className="text-warning shrink-0 mt-0.5" />
                  <span className="text-[12px] text-ink leading-snug font-medium">{alert.message} <em className="text-muted not-italic block mt-1">Due: {alert.due}</em></span>
                </button>
              ))}
              <button type="button" className="px-5 py-3 text-[11px] font-bold text-[#741d35] bg-[#f8fafc] hover:bg-gray-50 flex items-center justify-between transition-colors" onClick={() => onNavigateTab("alerts")}>View all alerts <ChevronRight size={13} /></button>
            </div>
          )}
        </section>

        <section className="bg-[#111827] text-white rounded-xl shadow-sm border border-[#1f2937] overflow-hidden p-5 flex flex-col gap-3 relative">
          <h2 className="text-[13px] font-bold flex items-center gap-2 text-white/90"><Star size={14} className="text-yellow-400" /> Recommended Next Action</h2>
          <p className="text-[13px] leading-relaxed text-white/80">{detail.recommendedAction.message}</p>
          <div className="flex flex-col gap-1.5 mt-2 pt-3 border-t border-white/10 text-[11px]">
            <div className="flex justify-between"><span className="text-white/50">Owner</span><strong className="text-white/90">{detail.recommendedAction.owner}</strong></div>
            <div className="flex justify-between"><span className="text-white/50">Due</span><strong className="text-white/90">{detail.recommendedAction.due}</strong></div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
          <h2 className="px-5 py-4 border-b border-line text-[13px] font-bold text-ink flex items-center gap-2"><Boxes size={15} className="text-muted" /> Release Summary</h2>
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Current Version</span><strong className="text-ink font-bold">{detail.releaseSummary.currentVersion}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Target Version</span><strong className="text-ink font-bold">{detail.releaseSummary.targetVersion}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Release Status</span><StatusPill value={detail.releaseSummary.releaseStatus} /></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Target Date</span><strong className="text-ink font-bold">{detail.releaseSummary.targetDate}</strong></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Approval Status</span><StatusPill value={detail.releaseSummary.approvalStatus} /></div>
            <div className="flex items-center justify-between text-[12px]"><span className="text-muted">Rollback Plan</span><StatusPill value={detail.releaseSummary.rollbackPlan} /></div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
          <h2 className="px-5 py-4 border-b border-line text-[13px] font-bold text-ink flex items-center gap-2"><ShieldCheck size={15} className="text-muted" /> Controlled Module Actions</h2>
          <div className="flex flex-col">
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 flex items-center justify-between transition-colors" onClick={() => onNavigateTab("configuration")}><span className="flex items-center gap-2"><Settings2 size={13} className="text-muted" />Update Configuration</span><ChevronRight size={13} className="text-muted" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 flex items-center justify-between transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!permissions.canRequestReview} onClick={() => onOpenModal({ kind: "review", reviewKind: "security" })}><span className="flex items-center gap-2"><ShieldAlert size={13} className="text-muted" />Request Security Review</span><ChevronRight size={13} className="text-muted" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 flex items-center justify-between transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!permissions.canRequestReview} onClick={() => onOpenModal({ kind: "review", reviewKind: "compliance" })}><span className="flex items-center gap-2"><ShieldCheck size={13} className="text-muted" />Request Compliance Review</span><ChevronRight size={13} className="text-muted" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 flex items-center justify-between transition-colors" onClick={() => onNavigateTab("dependencies")}><span className="flex items-center gap-2"><Network size={13} className="text-muted" />Manage Dependencies</span><ChevronRight size={13} className="text-muted" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 flex items-center justify-between transition-colors" onClick={() => onNavigateTab("integrations")}><span className="flex items-center gap-2"><Plug size={13} className="text-muted" />Manage Integrations</span><ChevronRight size={13} className="text-muted" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 flex items-center justify-between transition-colors" onClick={() => onNavigateTab("feature-flags")}><span className="flex items-center gap-2"><FlagIcon size={13} className="text-muted" />Manage Feature Flags</span><ChevronRight size={13} className="text-muted" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 flex items-center justify-between transition-colors" onClick={() => onNavigateTab("country-availability")}><span className="flex items-center gap-2"><Globe2 size={13} className="text-muted" />Manage Countries</span><ChevronRight size={13} className="text-muted" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 flex items-center justify-between transition-colors" onClick={() => info("Compare Versions", "Select two versions from Versions & Releases to compare configuration, health and adoption side by side.")}><span className="flex items-center gap-2"><GitCompare size={13} className="text-muted" />Compare Versions</span><ChevronRight size={13} className="text-muted" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 flex items-center justify-between transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!permissions.canScheduleRelease} onClick={() => onOpenModal({ kind: "schedule-release" })}><span className="flex items-center gap-2"><Calendar size={13} className="text-muted" />Schedule Release</span><ChevronRight size={13} className="text-muted" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-ink text-left hover:bg-gray-50 flex items-center justify-between transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!permissions.canRequestProductionEnablement} onClick={() => onOpenModal({ kind: "production-enablement" })}><span className="flex items-center gap-2"><ShieldCheck size={13} className="text-muted" />Request Production Enablement</span><ChevronRight size={13} className="text-muted" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-danger text-left hover:bg-red-50 flex items-center justify-between transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!permissions.canSuspend} onClick={() => onOpenModal({ kind: "suspend" })}><span className="flex items-center gap-2"><PauseCircle size={13} />Suspend Module</span><ChevronRight size={13} className="text-danger opacity-50" /></button>
            <button type="button" className="px-5 py-3 border-b border-line text-[12px] font-medium text-danger text-left hover:bg-red-50 flex items-center justify-between transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!permissions.canRetire} onClick={() => onOpenModal({ kind: "retire" })}><span className="flex items-center gap-2"><Trash2 size={13} />Retire Module</span><ChevronRight size={13} className="text-danger opacity-50" /></button>
          </div>
        </section>
      </aside>
      </div>
    </>
  );
}
