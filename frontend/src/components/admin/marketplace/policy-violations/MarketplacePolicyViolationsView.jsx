"use client";

import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {AlertTriangle, ChevronRight, Download, FileWarning, LockKeyhole, RefreshCw, Search, ShieldAlert} from "lucide-react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import toast from "react-hot-toast";
import {useMarketplacePolicyViolations} from "@/hooks/admin/useMarketplacePolicyViolations";
import {exportMarketplacePolicyViolations} from "@/services/api/marketplacePolicyViolationsService";
import styles from "./marketplace-policy-violations.module.css";

const humanize = value => value ? value.replaceAll("_", " ").replace(/\b\w/g, letter => letter.toUpperCase()) : "Not available";
const unavailablePanels = [["Open and Overdue Cases", "openOverdue"], ["Evidence Status", "evidence"], ["Enforcement Actions", "enforcement"], ["Repeat-Offender Analysis", "repeatOffenders"], ["Active Appeals", "appeals"]];

export default function MarketplacePolicyViolationsView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();
  const filters = useMemo(() => ({search: searchParams.get("search") || "", caseStatus: searchParams.get("caseStatus") || undefined, severity: searchParams.get("severity") || undefined, sortBy: searchParams.get("sortBy") || "updatedAt", sortDirection: searchParams.get("sortDirection") || "desc", page: Number(searchParams.get("page") || 1), perPage: Number(searchParams.get("perPage") || 25)}), [queryKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const [search, setSearch] = useState(filters.search);
  const [exporting, setExporting] = useState(false);
  const {data, loading, refreshing, error, stale, refresh} = useMarketplacePolicyViolations(filters);
  const setFilter = (key, value) => {const params = new URLSearchParams(searchParams); value ? params.set(key, value) : params.delete(key); if (key !== "page") params.delete("page"); router.replace(`${pathname}${params.size ? `?${params}` : ""}`, {scroll: false});};
  useEffect(() => {const timer = setTimeout(() => {if (search !== filters.search) setFilter("search", search);}, 350); return () => clearTimeout(timer);}, [search, filters.search]); // eslint-disable-line react-hooks/exhaustive-deps
  const runExport = async () => {setExporting(true); try {await exportMarketplacePolicyViolations(filters); toast.success("Policy violation report exported");} catch (exception) {toast.error(exception instanceof Error ? exception.message : "Export failed");} finally {setExporting(false);}};
  if (loading && !data) return <main className={`${styles.page} ${styles.loading}`} aria-busy="true"><div/><div/><div/></main>;
  if (error && !data) return <section className={styles.state}><ShieldAlert/><h1>Marketplace Policy Violations</h1><p>{error}</p><button onClick={() => void refresh()}>Retry</button></section>;
  if (!data) return null;
  return <main className={styles.page}>
    <nav className={styles.breadcrumb}><Link href="/admin/marketplace">Marketplace</Link><ChevronRight/><span>Policy Violations</span></nav>
    <header className={styles.pageHeader}><div><h1>Marketplace Policy Violations</h1><p>Database-backed compliance cases. Internal notes, evidence, and restricted metadata are never exposed.</p></div><div className={styles.headerActions}><button disabled={!data.permissions.canExport || exporting} onClick={() => void runExport()}><Download/>{exporting ? "Exporting..." : "Export Violation Report"}</button><button disabled title="No policy-library domain is configured">Review Policy Library</button><button disabled title="No case mutation workflow is defined">Bulk Actions</button><button className={styles.primary} disabled title="Case creation workflow is not defined">Create Policy Case</button></div></header>
    <section className={styles.context}><div><span><small>Tenant</small><b>SL Beauty</b></span><span><small>Ecosystem</small><b>Beauty Marketplace</b></span><span><small>Date range</small><b>{data.context.dateFrom} - {data.context.dateTo}</b></span></div><aside><p><LockKeyhole/>Internal notes excluded</p><div><i/><b>{stale ? "Stale" : "Live polling"}</b></div><small>{new Date(data.meta.dataAsOf).toLocaleString()}</small><button aria-label="Refresh policy cases" onClick={() => void refresh(true)}><RefreshCw className={refreshing ? styles.spin : ""}/></button></aside></section>
    <section className={styles.kpis}>{data.kpis.map(metric => <article key={metric.id} title={metric.reason || metric.definition}><div><small>{metric.label}</small><strong>{metric.available ? metric.value : "Not available"}</strong><em>{metric.available ? "Database value" : "Configuration required"}</em></div><FileWarning/></article>)}</section>
    <div className={styles.layout}><div className={styles.workspace}>
      <section className={`${styles.card} ${styles.charts}`}><section className={styles.chartPanel}><h2>Policy Violation Trend</h2>{data.trend.items.length ? <div className={styles.chart}><ResponsiveContainer><LineChart data={data.trend.items}><CartesianGrid/><XAxis dataKey="period"/><YAxis allowDecimals={false}/><Tooltip/><Line dataKey="createdCount" stroke="#7b001c"/></LineChart></ResponsiveContainer></div> : <Empty text="No compliance cases were created in this period."/>}</section><Distribution title="Violation Category Distribution" items={data.categories.items}/><Distribution title="Policy Source Distribution" items={data.sources.items}/></section>
      <Unavailable title="Policy Health Scorecard" block={data.scorecard}/>
      <section className={`${styles.card} ${styles.caseCard}`}><div className={styles.filters}><label className={styles.search}><Search/><input aria-label="Search policy cases" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search case, category or policy..."/></label><select aria-label="Case status" value={filters.caseStatus || ""} onChange={event => setFilter("caseStatus", event.target.value)}><option value="">All recorded statuses</option>{data.statuses.items.map(item => <option key={item.key} value={item.key}>{humanize(item.key)}</option>)}</select></div><div className={styles.tableHeading}><h2>Marketplace Policy Violation Cases</h2><span>{data.meta.total} cases</span></div><CaseTable rows={data.items}/><Pagination meta={data.meta} onPage={page => setFilter("page", String(page))}/></section>
      <section className={styles.lowerGrid}>{unavailablePanels.map(([title, key]) => <Unavailable key={key} title={title} block={data[key]}/>)}</section>
    </div><aside className={styles.rail}><Unavailable title="Marketplace Policy Health" block={data.health}/><Rail title="Priority Policy Alerts" text="No supported alert source."/><Distribution title="Violation Status Summary" items={data.statuses.items}/><Unavailable title="Investigation SLA Summary" block={data.sla}/><Unavailable title="Enforcement Impact" block={data.impact}/><Rail title="Quick Queues" text="No supported queue rules."/></aside></div>
  </main>;
}

function CaseTable({rows}) {if (!rows.length) return <Empty text="No compliance cases match the selected period and filters."/>; return <div className={styles.tableWrap}><table><thead><tr>{["Case", "Category", "Policy", "Source", "Severity", "Status", "Compliance", "Reviewer", "Notes", "Created", "Updated"].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.id}><td><Link className={styles.caseLink} href={`/admin/marketplace/policy-violations/${row.id}`}>{row.caseCode}</Link></td><td>{humanize(row.category)}</td><td>{row.policy?.name || "Not available"}</td><td>{row.source ? `${row.source.type} #${row.source.id}` : "Not available"}</td><td>{humanize(row.severity)}</td><td>{humanize(row.status)}</td><td>{humanize(row.complianceStatus)}</td><td>{row.assignedReviewer?.name || "Unassigned"}</td><td>{row.noteCount}</td><td>{new Date(row.createdAt).toLocaleString()}</td><td>{new Date(row.updatedAt).toLocaleString()}</td></tr>)}</tbody></table></div>;}
function Pagination({meta, onPage}) {if (meta.totalPages <= 1) return null; return <nav className={styles.pagination} aria-label="Policy case pagination"><span>Showing {meta.from}-{meta.to} of {meta.total}</span><div><button disabled={meta.page <= 1} onClick={() => onPage(meta.page - 1)}>Previous</button><button className={styles.current} disabled>{meta.page}</button><button disabled={meta.page >= meta.totalPages} onClick={() => onPage(meta.page + 1)}>Next</button></div></nav>;}
function Distribution({title, items}) {return <section className={styles.chartPanel}><h2>{title}</h2>{items.length ? <div className={styles.sourceBars}>{items.map(item => <div key={item.key}><span>{humanize(item.key)}</span><i><b style={{width: `${item.percentage}%`}}/></i><strong>{item.count} ({item.percentage}%)</strong></div>)}</div> : <Empty text="Insufficient data"/>}</section>;}
function Unavailable({title, block}) {return <section className={`${styles.card} ${styles.unavailable}`}><h2>{title}</h2><Empty text={`Not available - ${humanize(block.reason)}`}/></section>;}
function Rail({title, text}) {return <section className={styles.railCard}><h2>{title}</h2><Empty text={text}/></section>;}
function Empty({text}) {return <div className={styles.empty}><AlertTriangle/><p>{text}</p></div>;}
