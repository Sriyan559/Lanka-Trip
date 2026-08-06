"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Download, Info, RefreshCw } from "lucide-react";
import { useMarketplaceDashboard } from "@/hooks/admin/useMarketplaceDashboard";
import { exportMarketplaceDashboard } from "@/services/api/marketplaceDashboardService";
import type { CompositionItem, DashboardMetric, MarketplaceDashboardFilters, TrendPoint } from "@/types/marketplaceDashboard";
import styles from "./marketplace-command-center.module.css";

const COLORS = ["#7a0023", "#a0002b", "#c79616", "#6b7280", "#94a3b8", "#14532d", "#7c3aed", "#0369a1"];
const KPI_LABELS: Record<string, string> = { gmv: "GMV", nmv: "Net Marketplace Value", total_orders: "Total Orders", aov: "AOV", active_sellers: "Active Sellers", active_listings: "Active Listings", commission: "Commission", expenses: "Expenses" };
const FINANCIAL_LABELS: Record<string, string> = { gmv: "Gross Merchandise Value", nmv: "Net Marketplace Value", commission: "Marketplace Commission", pending_settlements: "Pending Settlements" };
const LIFECYCLE = [["pending", "Pending", "warning"], ["confirmed", "Confirmed", "info"], ["production", "Production", "info"], ["shipped", "Shipped", "info"], ["completed", "Completed", "success"], ["cancelled", "Cancelled", "danger"]] as const;

function initialFilters(): MarketplaceDashboardFilters {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return { dateFrom: params.get("dateFrom") || undefined, dateTo: params.get("dateTo") || undefined, timezone: params.get("timezone") || undefined, currency: params.get("currency") || undefined };
}

const number = (value: number, maximumFractionDigits = 0) => new Intl.NumberFormat("en-LK", { maximumFractionDigits }).format(value);
const metricValue = (metric: DashboardMetric) => metric.availability === "available" && metric.value !== null ? metric.currency ? `${metric.currency} ${number(metric.value, 2)}` : number(metric.value) : "Not available";
const dateTime = (value: string) => new Intl.DateTimeFormat("en-LK", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

function aggregateTrend(points: TrendPoint[], period: "daily" | "weekly" | "monthly"): TrendPoint[] {
  if (period === "daily") return points;
  const groups = new Map<string, TrendPoint>();
  for (const point of points) {
    const date = new Date(`${point.date}T00:00:00`);
    if (period === "weekly") date.setDate(date.getDate() - date.getDay()); else date.setDate(1);
    const key = date.toISOString().slice(0, 10);
    const current = groups.get(key) ?? { date: key, gmv: 0, revenue: 0, orders: 0 };
    current.gmv += point.gmv; current.revenue += point.revenue; current.orders += point.orders; groups.set(key, current);
  }
  return [...groups.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function TrendChart({ points, currency }: { points: TrendPoint[]; currency: string | null }) {
  const max = Math.max(...points.map(point => Math.max(point.gmv, point.revenue)), 1);
  if (!points.length || points.every(point => point.gmv === 0 && point.revenue === 0)) return <div className={styles.empty}>No sales or payment activity exists for this period.</div>;
  return <div className={styles.chart} role="img" aria-label={`Marketplace order value and payment revenue in ${currency ?? "the selected currency"} across ${points.length} periods`}>
    {points.map(point => <div className={styles.barColumn} key={point.date}><div className={styles.barStack} title={`${point.date}: order value ${currency ?? ""} ${point.gmv}; revenue ${currency ?? ""} ${point.revenue}`}><i className={styles.salesBar} style={{ height: `${Math.max(point.revenue ? 3 : 0, point.revenue / max * 100)}%` }} /><i className={styles.gmvBar} style={{ height: `${Math.max(point.gmv ? 3 : 0, point.gmv / max * 100)}%` }} /></div><span>{point.date.slice(5)}</span></div>)}
  </div>;
}

function CompositionChart({ items }: { items: CompositionItem[] }) {
  if (!items.length) return <div className={styles.empty}>No composition data is available.</div>;
  let cursor = 0;
  const gradient = items.map((item, index) => { const start = cursor; cursor += item.percentage; return `${COLORS[index % COLORS.length]} ${start}% ${cursor}%`; }).join(",");
  return <div className={styles.compositionBody}><div className={styles.donut} style={{ background: `conic-gradient(${gradient})` }} role="img" aria-label={items.map(item => `${item.label} ${item.percentage}%`).join(", ")}><div><strong>{items[0]?.percentage ?? 0}%</strong><span>{items[0]?.label}</span></div></div><ul>{items.map((item, index) => <li key={item.id}><i style={{ background: COLORS[index % COLORS.length] }} /><span>{item.label}</span><strong>{number(item.value)} ({item.percentage}%)</strong></li>)}</ul></div>;
}

export function MarketplaceCommandCenter() {
  const [filters] = useState<MarketplaceDashboardFilters>(initialFilters);
  const { data, loading, refreshing, error, stale, refresh } = useMarketplaceDashboard(filters);
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [composition, setComposition] = useState<"category" | "seller" | "channel">("category");
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const trend = useMemo(() => aggregateTrend(data?.trend.items ?? [], period), [data?.trend.items, period]);
  const exportReport = async () => { setExporting(true); setExportError(null); try { await exportMarketplaceDashboard(filters); } catch (caught) { setExportError(caught instanceof Error ? caught.message : "Unable to export the report."); } finally { setExporting(false); } };

  if (loading && !data) return <div className={styles.state} aria-busy="true"><div className={styles.skeleton} /><div className={styles.skeletonGrid}>{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div></div>;
  if (error && !data) return <div className={styles.state} role="alert"><h1>Marketplace Command Center</h1><p>{error}</p><button className={styles.primaryButton} onClick={() => void refresh()}>Retry</button></div>;
  if (!data) return <div className={styles.state}><h1>Marketplace Command Center</h1><p>No marketplace dashboard response is available.</p></div>;

  const reportHref = `/admin/analytics/reports/order-performance?from=${data.filters.date_from}&to=${data.filters.date_to}`;
  return <div className={styles.page}>
    <header className={styles.pageHeader}><div><h1>Marketplace Command Center</h1><p>Enterprise Administration <span>›</span> Marketplace Command Center</p></div><Link className={styles.primaryButton} href={reportHref}><Download size={15} />Generate Report</Link></header>
    {(error || exportError) && <div className={styles.inlineError} role="alert">{exportError || `${error} Showing the last successful response.`}</div>}
    <div className={styles.dashboardLayout}><main className={styles.workspace}>
      <section className={styles.commandCard}><div><p className={styles.eyebrow}>Marketplace <span>|</span> Command &amp; Control</p><h2>Marketplace Command Center</h2><p>Live marketplace orders, sellers, listings, settlements, operational queues and risks from the platform database.</p></div><div className={styles.commandActions}><button onClick={() => void exportReport()} disabled={!data.permissions.can_export || exporting}>{exporting ? "Exporting…" : "Export Report"}</button><Link href="/admin/marketplace/settings">Marketplace Settings</Link><Link className={styles.primaryButton} href="/admin/marketplace/channels">Manage Marketplace</Link></div></section>
      <section className={styles.contextBar}><dl><div><dt>Reporting range</dt><dd>{data.filters.date_from} – {data.filters.date_to}</dd></div><div><dt>Currency</dt><dd>{data.filters.currency ?? "Selection required"}</dd></div><div><dt>Time Zone</dt><dd>{data.filters.timezone}</dd></div></dl><div className={styles.live}><span>{stale ? "● Stale" : "● Live API"}</span><small>Updated {dateTime(data.meta.generated_at)}</small><button onClick={() => void refresh(true)} disabled={refreshing} aria-label="Refresh dashboard"><RefreshCw size={14} className={refreshing ? styles.spin : ""} /></button></div></section>
      <section className={styles.kpiGrid}>{Object.entries(data.summary).map(([id, metric]) => <article className={styles.kpi} key={id}><header><span>{KPI_LABELS[id]}</span><Info size={13} /></header><div><strong>{metricValue(metric)}</strong></div><small title={metric.definition ?? metric.reason}>{metric.availability === "available" ? (metric.definition ?? "Database-backed value") : (metric.reason ?? "Unavailable")}</small></article>)}</section>
      <section className={styles.chartGrid}><article className={styles.card}><header className={styles.cardHeader}><div><h2>Marketplace Sales &amp; Revenue Trend</h2><p><strong>{metricValue(data.summary.gmv)}</strong> order value <span>|</span> <strong>{metricValue(data.summary.nmv)}</strong> net payment value</p></div><div className={styles.segmented}>{(["daily", "weekly", "monthly"] as const).map(item => <button aria-pressed={period === item} className={period === item ? styles.active : ""} onClick={() => setPeriod(item)} key={item}>{item}</button>)}</div></header>{data.trend.availability === "available" ? <TrendChart points={trend} currency={data.filters.currency} /> : <div className={styles.empty}>Trend unavailable: select a single currency.</div>}</article><article className={styles.card}><header className={styles.cardHeader}><h2>Marketplace Composition</h2></header><div className={styles.segmented}>{(["category", "seller", "channel"] as const).map(item => <button aria-pressed={composition === item} className={composition === item ? styles.active : ""} onClick={() => setComposition(item)} key={item}>{item}</button>)}</div><CompositionChart items={data.composition[composition]} /></article></section>
      <section className={`${styles.card} ${styles.pipeline}`}><h2>Order Lifecycle Pipeline</h2><div>{LIFECYCLE.map(([status, label, tone]) => <Link className={styles[tone]} href={`/admin/marketplace/orders?orderStatus=${status}`} key={status}><span>{label}</span><strong>{data.order_lifecycle[status] ?? 0}</strong></Link>)}</div></section>
      <section className={styles.queueGrid}>{data.operational_queues.map(queue => <Link href={queue.href} className={styles.queue} key={queue.id}><strong>{queue.count}</strong><span>{queue.label}</span><small>View Queue <ArrowRight size={13} /></small></Link>)}</section>
      <section className={`${styles.card} ${styles.tableCard}`}><h2>Top Performing Sellers</h2><div className={styles.tableWrap}><table><thead><tr>{["Rank", "Seller", "Orders", "GMV", "Fulfilment", "Cancellation", "Rating", "Status", "Action"].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{data.top_sellers.map((seller, index) => <tr key={seller.id}><td>{index + 1}</td><td>{seller.name}</td><td>{seller.orders}</td><td>{data.filters.currency} {number(seller.gmv, 2)}</td><td>{seller.fulfilment_rate}%</td><td>{seller.cancellation_rate}%</td><td>{seller.rating ?? "Not available"}</td><td><span className={seller.status === "active" ? styles.badgeSuccess : styles.badgeDanger}>{seller.status}</span></td><td><Link href={`/admin/marketplace/sellers/${seller.id}`}>Open seller</Link></td></tr>)}</tbody></table>{!data.top_sellers.length && <div className={styles.empty}>No seller order activity exists for this currency and period.</div>}</div><Link className={styles.centerLink} href="/admin/marketplace/sellers">View All Sellers <ArrowRight size={13} /></Link></section>
      <section className={`${styles.card} ${styles.tableCard}`}><h2>Recent Marketplace Activity Audit</h2><div className={styles.tableWrap}><table><thead><tr>{["Source", "Action", "Entity", "Entity ID", "Timestamp", "Initiated By"].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{data.recent_activity.map(row => <tr key={row.id}><td>{row.source}</td><td>{row.action}</td><td>{row.entity_type ?? "—"}</td><td>{row.entity_id ?? "—"}</td><td>{dateTime(row.occurred_at)}</td><td>{row.actor}</td></tr>)}</tbody></table>{!data.recent_activity.length && <div className={styles.empty}>No marketplace audit activity exists for this period.</div>}</div></section>
    </main><aside className={styles.rail}>
      <section className={styles.card}><div className={styles.railHeading}><h2>Marketplace Health</h2><span className={styles.badgeDanger}>Unavailable</span></div><div className={styles.score}><strong>{data.marketplace_health.score ?? "—"}</strong><span>/100</span><small>{data.marketplace_health.reason?.replaceAll("_", " ")}</small></div></section>
      <section className={styles.card}><h2>Priority Alerts ({data.priority_alerts.length})</h2><div className={styles.alertList}>{data.priority_alerts.map(alert => <article className={styles[alert.severity]} key={alert.id}><AlertTriangle size={15} /><div><strong>{alert.title}</strong><p>{alert.entity_type ?? "Marketplace"} {alert.entity_id ?? ""}</p><small>{dateTime(alert.created_at)}{alert.risk_score !== null ? ` · Risk ${alert.risk_score}` : ""}</small></div></article>)}{!data.priority_alerts.length && <div className={styles.empty}>No unresolved marketplace alerts.</div>}</div></section>
      <section className={styles.financial}><header><h2>Financial Snapshot</h2><Download size={15} /></header>{Object.entries(data.financial_snapshot).map(([id, metric]) => <p key={id}><span>{FINANCIAL_LABELS[id]}</span><strong>{metricValue(metric)}</strong></p>)}<button onClick={() => void exportReport()} disabled={!data.permissions.can_export || exporting}>Export Ledger Summary</button></section>
      <section className={styles.card}><h2>Risk Signal Summary</h2><p className={styles.statusRow}><span>Source status</span><strong className={styles.positive}>● {data.risk_signals.availability}</strong></p><p className={styles.statusRow}><span>Open signals</span><strong>{data.risk_signals.items.length}</strong></p><p className={styles.statusRow}><span>Data as of</span><strong>{dateTime(data.meta.data_as_of)}</strong></p></section>
    </aside></div>
  </div>;
}
