"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Download,
  Info,
  RefreshCw,
} from "lucide-react";
import { useMarketplaceDashboard } from "@/hooks/admin/useMarketplaceDashboard";
import { exportMarketplaceDashboard } from "@/services/api/marketplaceDashboardService";
import type {
  CompositionItem,
  MarketplaceDashboardFilters,
  MarketplaceMetricValue,
  TrendPoint,
} from "@/types/marketplaceDashboard";
import styles from "./marketplace-command-center.module.css";

const initialFilters: MarketplaceDashboardFilters = {
  currency: "LKR",
  timezone: "Asia/Colombo",
};

const KPI_LABELS: Record<string, string> = {
  gmv: "Gross Merchandise Value",
  nmv: "Net Merchandise Value",
  order_volume: "Total Order Volume",
  commission_earned: "Commissions Earned",
  payout_pending: "Payout Pending",
  active_sellers: "Active Sellers",
  active_listings: "Active Listings",
  cancellation_rate: "Cancellation Rate",
};

const FINANCIAL_LABELS: Record<string, string> = {
  total_gross_settlement: "Total Gross Settlement",
  total_commission_collected: "Total Commission Collected",
  pending_payouts: "Pending Payouts",
  disputed_payouts: "Disputed Payouts",
};

const LIFECYCLE: Array<[string, string, string]> = [
  ["pending", "Pending Confirmation", "pending"],
  ["processing", "Processing", "processing"],
  ["shipped", "Shipped", "shipped"],
  ["delivered", "Delivered", "delivered"],
  ["cancelled", "Cancelled", "cancelled"],
  ["returned", "Returned", "returned"],
];

const COLORS = ["#8b0028", "#d97706", "#2563eb", "#059669", "#7c3aed", "#db2777"];

function number(val: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
}

function dateTime(val: string | null): string {
  if (!val) return "—";
  return new Date(val).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function chartCurrency(val: number, curr: string | null): string {
  if (!curr) return number(val);
  return `${curr} ${number(val)}`;
}

function compactCurrency(val: number, curr: string | null): string {
  if (!curr) return number(val);
  if (val >= 1000000) return `${curr} ${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${curr} ${(val / 1000).toFixed(1)}K`;
  return `${curr} ${number(val)}`;
}

function metricValue(metric: MarketplaceMetricValue | undefined): string {
  if (!metric) return "—";
  if (metric.availability !== "available" || metric.value === null) {
    return "Unavailable";
  }
  if (typeof metric.value === "number") {
    return metric.unit ? `${metric.value}${metric.unit}` : number(metric.value);
  }
  return metric.value;
}

function periodLabel(date: string, period: "daily" | "weekly" | "monthly"): string {
  if (period === "monthly") return date;
  if (period === "weekly") return `W${date.slice(-2)}`;
  return date.slice(-5);
}

function aggregateTrend(items: TrendPoint[], period: "daily" | "weekly" | "monthly"): TrendPoint[] {
  if (period === "daily") return items;
  const groups: Record<string, TrendPoint> = {};
  items.forEach((item) => {
    const key = period === "monthly" ? item.date.slice(0, 7) : item.date.slice(0, 7);
    if (!groups[key]) {
      groups[key] = { date: key, gmv: 0, revenue: 0, orders: 0 };
    }
    groups[key].gmv += item.gmv;
    groups[key].revenue += item.revenue;
    groups[key].orders += item.orders;
  });
  return Object.values(groups);
}

function TrendChart({ points, currency, period }: { points: TrendPoint[]; currency: string | null; period: "daily" | "weekly" | "monthly" }) {
  if (!points.length) return <div className={styles.empty}>No trend data is available for this period.</div>;
  const maxGmv = Math.max(...points.map((p) => p.gmv), 1);
  const maxRev = Math.max(...points.map((p) => p.revenue), 1);
  const yMaximum = Math.max(maxGmv, maxRev);

  return (
    <div className={styles.chartBody}>
      <div className={styles.yAxis} aria-hidden="true">
        <span>{compactCurrency(yMaximum, currency)}</span>
        <span>{compactCurrency(yMaximum / 2, currency)}</span>
        <span>{compactCurrency(0, currency)}</span>
      </div>
      <div className={styles.plot}>
        <div className={styles.gridLines} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className={styles.barColumns}>
          {points.map((point) => {
            const orderHeight = point.gmv > 0 ? Math.max(2, (point.gmv / yMaximum) * 100) : 0;
            const paymentHeight = point.revenue > 0 ? Math.max(2, (point.revenue / yMaximum) * 100) : 0;
            const description = `${point.date}: order value ${chartCurrency(point.gmv, currency)}; net payment value ${chartCurrency(point.revenue, currency)}`;
            return (
              <div className={styles.barColumn} key={point.date} aria-label={description} title={description}>
                <div className={styles.barStack}>
                  <i className={styles.gmvBar} style={{ height: `${orderHeight}%` }} />
                  <i className={styles.salesBar} style={{ height: `${paymentHeight}%` }} />
                </div>
                <span>{periodLabel(point.date, period)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CompositionChart({ items }: { items: CompositionItem[] }) {
  if (!items || !items.length) return <div className={styles.empty}>No composition data is available.</div>;
  let cursor = 0;
  const gradient = items
    .map((item, index) => {
      const start = cursor;
      cursor += item.percentage;
      return `${COLORS[index % COLORS.length]} ${start}% ${cursor}%`;
    })
    .join(",");

  return (
    <div className={styles.compositionBody}>
      <div
        className={styles.donut}
        style={{ background: `conic-gradient(${gradient})` }}
        role="img"
        aria-label={items.map((item) => `${item.label} ${item.percentage}%`).join(", ")}
      >
        <div>
          <strong>{items[0]?.percentage ?? 0}%</strong>
          <span>{items[0]?.label}</span>
        </div>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <i style={{ background: COLORS[index % COLORS.length] }} />
            <span>{item.label}</span>
            <strong>
              {number(item.value)} ({item.percentage}%)
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MarketplaceCommandCenter() {
  const [filters] = useState<MarketplaceDashboardFilters>(initialFilters);
  const { data, loading, refreshing, error, stale, refresh } = useMarketplaceDashboard(filters);
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [composition, setComposition] = useState<"category" | "seller" | "channel">("category");
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const trend = useMemo(() => aggregateTrend(data?.trend.items ?? [], period), [data?.trend.items, period]);

  const exportReport = async () => {
    setExporting(true);
    setExportError(null);
    try {
      await exportMarketplaceDashboard(filters);
    } catch (caught) {
      setExportError(caught instanceof Error ? caught.message : "Unable to export the report.");
    } finally {
      setExporting(false);
    }
  };

  if (loading && !data) {
    return (
      <div className={styles.state} aria-busy="true">
        <div className={styles.skeleton} />
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 8 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className={styles.state} role="alert">
        <h1>Marketplace Command Center</h1>
        <p>{error}</p>
        <button className={styles.primaryButton} onClick={() => void refresh()}>
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.state}>
        <h1>Marketplace Command Center</h1>
        <p>No marketplace dashboard response is available.</p>
      </div>
    );
  }

  const reportHref = `/admin/analytics/reports/order-performance?from=${data.filters.date_from}&to=${data.filters.date_to}`;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Marketplace Command Center</h1>
          <p>
            Enterprise Administration <span>›</span> Marketplace Command Center
          </p>
        </div>
        <Link className={styles.primaryButton} href={reportHref}>
          <Download size={15} />
          Generate Report
        </Link>
      </header>

      {(error || exportError) && (
        <div className={styles.inlineError} role="alert">
          {exportError || `${error} Showing the last successful response.`}
        </div>
      )}

      <div className={styles.dashboardLayout}>
        <main className={styles.workspace}>
          <section className={styles.commandCard}>
            <div>
              <p className={styles.eyebrow}>
                Marketplace <span>|</span> Command &amp; Control
              </p>
              <h2>Marketplace Command Center</h2>
              <p>
                Live marketplace orders, sellers, listings, settlements, operational queues and risks from the platform database.
              </p>
            </div>
            <div className={styles.commandActions}>
              <button onClick={() => void exportReport()} disabled={!data.permissions.can_export || exporting}>
                {exporting ? "Exporting…" : "Export Report"}
              </button>
              <Link href="/admin/marketplace/settings">Marketplace Settings</Link>
              <Link className={styles.primaryButton} href="/admin/marketplace/channels">
                Manage Marketplace
              </Link>
            </div>
          </section>

          <section className={styles.contextBar}>
            <dl>
              <div>
                <dt>Reporting range</dt>
                <dd>
                  {data.filters.date_from} – {data.filters.date_to}
                </dd>
              </div>
              <div>
                <dt>Currency</dt>
                <dd>{data.filters.currency ?? "Selection required"}</dd>
              </div>
              <div>
                <dt>Time Zone</dt>
                <dd>{data.filters.timezone}</dd>
              </div>
            </dl>
            <div className={styles.live}>
              <span>{stale ? "● Stale" : "● Live API"}</span>
              <small>Updated {dateTime(data.meta.generated_at)}</small>
              <button onClick={() => void refresh(true)} disabled={refreshing} aria-label="Refresh dashboard">
                <RefreshCw size={14} className={refreshing ? styles.spin : ""} />
              </button>
            </div>
          </section>

          <section className={styles.kpiGrid}>
            {Object.entries(data.summary).map(([id, metric]) => (
              <article className={styles.kpi} key={id}>
                <header>
                  <span>{KPI_LABELS[id]}</span>
                  <Info size={13} />
                </header>
                <div>
                  <strong>{metricValue(metric)}</strong>
                </div>
                <small title={metric.definition ?? metric.reason}>
                  {metric.availability === "available"
                    ? metric.definition ?? "Database-backed value"
                    : metric.reason ?? "Unavailable"}
                </small>
              </article>
            ))}
          </section>

          <section className={styles.chartGrid}>
            <article className={`${styles.card} ${styles.trendCard}`}>
              <header className={styles.cardHeader}>
                <div>
                  <h2>Marketplace Sales &amp; Revenue Trend</h2>
                  <p>
                    <strong>{metricValue(data.summary.gmv)}</strong> order value <span>|</span>{" "}
                    <strong>{metricValue(data.summary.nmv)}</strong> net payment value
                  </p>
                </div>
                <div className={styles.segmented}>
                  {(["daily", "weekly", "monthly"] as const).map((item) => (
                    <button
                      type="button"
                      aria-pressed={period === item}
                      className={period === item ? styles.active : ""}
                      onClick={() => setPeriod(item)}
                      key={item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </header>
              <div className={styles.trendChartWrapper} aria-busy={refreshing}>
                {refreshing && (
                  <span className={styles.chartRefreshing} role="status">
                    Refreshing chart…
                  </span>
                )}
                {data.trend.availability === "available" ? (
                  <TrendChart points={trend} currency={data.filters.currency} period={period} />
                ) : (
                  <div className={styles.empty}>Trend unavailable: select a single currency.</div>
                )}
              </div>
            </article>

            <article className={styles.card}>
              <header className={styles.cardHeader}>
                <h2>Marketplace Composition</h2>
              </header>
              <div className={styles.segmented}>
                {(["category", "seller", "channel"] as const).map((item) => (
                  <button
                    aria-pressed={composition === item}
                    className={composition === item ? styles.active : ""}
                    onClick={() => setComposition(item)}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <CompositionChart items={data.composition[composition]} />
            </article>
          </section>

          <section className={`${styles.card} ${styles.pipeline}`}>
            <h2>Order Lifecycle Pipeline</h2>
            <div>
              {LIFECYCLE.map(([status, label, tone]) => (
                <Link className={styles[tone]} href={`/admin/marketplace/orders?orderStatus=${status}`} key={status}>
                  <span>{label}</span>
                  <strong>{data.order_lifecycle[status] ?? 0}</strong>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.queueGrid}>
            {data.operational_queues.map((queue) => (
              <Link href={queue.href} className={styles.queue} key={queue.id}>
                <strong>{queue.count}</strong>
                <span>{queue.label}</span>
                <small>
                  View Queue <ArrowRight size={13} />
                </small>
              </Link>
            ))}
          </section>

          <section className={`${styles.card} ${styles.tableCard}`}>
            <h2>Top Performing Sellers</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    {["Rank", "Seller", "Orders", "GMV", "Fulfilment", "Cancellation", "Rating", "Status", "Action"].map(
                      (label) => (
                        <th key={label}>{label}</th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.top_sellers.map((seller, index) => (
                    <tr key={seller.id}>
                      <td>{index + 1}</td>
                      <td>{seller.name}</td>
                      <td>{seller.orders}</td>
                      <td>
                        {data.filters.currency} {number(seller.gmv, 2)}
                      </td>
                      <td>{seller.fulfilment_rate}%</td>
                      <td>{seller.cancellation_rate}%</td>
                      <td>{seller.rating ?? "Not available"}</td>
                      <td>
                        <span className={seller.status === "active" ? styles.badgeSuccess : styles.badgeDanger}>
                          {seller.status}
                        </span>
                      </td>
                      <td>
                        <Link href={`/admin/marketplace/sellers/${seller.id}`}>Open seller</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!data.top_sellers.length && (
                <div className={styles.empty}>No seller order activity exists for this currency and period.</div>
              )}
            </div>
            <Link className={styles.centerLink} href="/admin/marketplace/sellers">
              View All Sellers <ArrowRight size={13} />
            </Link>
          </section>

          <section className={`${styles.card} ${styles.tableCard}`}>
            <h2>Recent Marketplace Activity Audit</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    {["Source", "Action", "Entity", "Entity ID", "Timestamp", "Initiated By"].map((label) => (
                      <th key={label}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.recent_activity.map((row) => (
                    <tr key={row.id}>
                      <td>{row.source}</td>
                      <td>{row.action}</td>
                      <td>{row.entity_type ?? "—"}</td>
                      <td>{row.entity_id ?? "—"}</td>
                      <td>{dateTime(row.occurred_at)}</td>
                      <td>{row.actor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!data.recent_activity.length && (
                <div className={styles.empty}>No marketplace audit activity exists for this period.</div>
              )}
            </div>
          </section>
        </main>

        <aside className={styles.rail}>
          <section className={styles.card}>
            <div className={styles.railHeading}>
              <h2>Marketplace Health</h2>
              <span className={styles.badgeDanger}>Unavailable</span>
            </div>
            <div className={styles.score}>
              <strong>{data.marketplace_health.score ?? "—"}</strong>
              <span>/100</span>
              <small>{data.marketplace_health.reason?.replaceAll("_", " ")}</small>
            </div>
          </section>

          <section className={styles.card}>
            <h2>Priority Alerts ({data.priority_alerts.length})</h2>
            <div className={styles.alertList}>
              {data.priority_alerts.map((alert) => (
                <article className={styles[alert.severity]} key={alert.id}>
                  <AlertTriangle size={15} />
                  <div>
                    <strong>{alert.title}</strong>
                    <p>
                      {alert.entity_type ?? "Marketplace"} {alert.entity_id ?? ""}
                    </p>
                    <small>
                      {dateTime(alert.created_at)}
                      {alert.risk_score !== null ? ` · Risk ${alert.risk_score}` : ""}
                    </small>
                  </div>
                </article>
              ))}
              {!data.priority_alerts.length && (
                <div className={styles.empty}>No unresolved marketplace alerts.</div>
              )}
            </div>
          </section>

          <section className={styles.financial}>
            <header>
              <h2>Financial Snapshot</h2>
              <Download size={15} />
            </header>
            {Object.entries(data.financial_snapshot).map(([id, metric]) => (
              <p key={id}>
                <span>{FINANCIAL_LABELS[id]}</span>
                <strong>{metricValue(metric)}</strong>
              </p>
            ))}
            <button onClick={() => void exportReport()} disabled={!data.permissions.can_export || exporting}>
              Export Ledger Summary
            </button>
          </section>

          <section className={styles.card}>
            <h2>Risk Signal Summary</h2>
            <p className={styles.statusRow}>
              <span>Source status</span>
              <strong className={styles.positive}>● {data.risk_signals.availability}</strong>
            </p>
            <p className={styles.statusRow}>
              <span>Open signals</span>
              <strong>{data.risk_signals.items.length}</strong>
            </p>
            <p className={styles.statusRow}>
              <span>Data as of</span>
              <strong>{dateTime(data.meta.data_as_of)}</strong>
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
