"use client";

import {useMemo, useState} from "react";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {AlertTriangle, BadgeDollarSign, ChevronRight, Download, LockKeyhole, Plus, RefreshCw, Search, ShieldAlert} from "lucide-react";
import {Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import toast from "react-hot-toast";
import {useMarketplaceCommissions} from "@/hooks/admin/useMarketplaceCommissions";
import {exportMarketplaceCommissions} from "@/services/api/marketplaceCommissionsService";
import styles from "./marketplace-commission-management.module.css";

const humanize = value => value ? value.replaceAll("_", " ").replace(/\b\w/g, letter => letter.toUpperCase()) : "Not available";
const unavailableSections = [["Pending Commission Approvals", "approvals"], ["Rule Conflict Summary", "conflicts"], ["Commission Structure Distribution", "distribution"], ["Commission Precedence", "precedence"], ["Commission Health Scorecard", "scorecard"]];

export function MarketplaceCommissionManagementView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();
  const filters = useMemo(() => ({currency: searchParams.get("currency") || undefined, dateFrom: searchParams.get("dateFrom") || undefined, dateTo: searchParams.get("dateTo") || undefined, page: Number(searchParams.get("page") || 1), perPage: Number(searchParams.get("perPage") || 25)}), [queryKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const {data, loading, refreshing, error, stale, refresh} = useMarketplaceCommissions(filters);
  const [exporting, setExporting] = useState(false);
  const setFilter = (key, value) => {const params = new URLSearchParams(searchParams); value ? params.set(key, value) : params.delete(key); router.replace(`${pathname}${params.size ? `?${params}` : ""}`, {scroll: false});};
  const exportReport = async () => {setExporting(true); try {await exportMarketplaceCommissions({...filters, currency: data.context.currency}); toast.success("Commission report exported");} catch (exception) {toast.error(exception instanceof Error ? exception.message : "Export failed");} finally {setExporting(false);}};
  if (loading && !data) return <Loading/>;
  if (error && !data) return <section className={styles.state} role="alert"><ShieldAlert/><h1>Marketplace Commission Management</h1><p>{error}</p><button onClick={() => void refresh()}>Retry</button></section>;
  if (!data) return null;
  return <main className={styles.page}>
    <nav className={styles.breadcrumb}><Link href="/admin/marketplace">Marketplace</Link><ChevronRight/><span>Commissions</span></nav>
    <header className={styles.header}><div><h1>Marketplace Commission Management</h1><p>Review verified settlement commission totals. Rule management becomes available when an approved commission domain is configured.</p></div><div className={styles.headerActions}><button disabled={!data.permissions.canExport || exporting} onClick={() => void exportReport()}><Download/>{exporting ? "Exporting..." : "Export Commission Report"}</button><button disabled title="A commission resolver and precedence rules are not configured">Compare Rules</button><button disabled>Bulk Actions</button><button className={styles.primary} disabled title="Commission rule schema and workflow are not configured"><Plus/>Create Commission Rule</button></div></header>
    <section className={styles.context}><div><p><span>Tenant:</span><b>{data.context.tenant}</b></p><p><span>Ecosystem:</span><b>{data.context.ecosystem}</b></p><p><span>Currency:</span><select aria-label="Commission currency" value={data.context.currency || ""} onChange={event => setFilter("currency", event.target.value)}><option value="">Select currency</option>{data.availableCurrencies.map(currency => <option key={currency}>{currency}</option>)}</select></p><p><span>Date range:</span><b>{data.context.dateFrom} - {data.context.dateTo}</b></p></div><aside><LockKeyhole/>Authenticated administrator context</aside></section>
    <div className={styles.live}><i/>{stale ? "Stale data" : "Live polling"}<small>Last updated: {new Date(data.meta.dataAsOf).toLocaleString()}</small><button aria-label="Refresh commissions" disabled={refreshing} onClick={() => void refresh(true)}><RefreshCw className={refreshing ? styles.spin : ""}/></button></div>
    <section className={`${styles.card} ${styles.domainWarning}`}><AlertTriangle/><div><h2>Commission rule configuration required</h2><p>No rule records, rates, approval queues, conflicts, precedence, or simulations are shown because the database has no commission-rule domain.</p></div></section>
    <div className={styles.layout}><div className={styles.workspace}>
      <section className={styles.kpis}>{data.kpis.map(metric => <article key={metric.id} title={metric.reason || metric.definition}><span><BadgeDollarSign/></span><div><small>{metric.label}</small><strong>{metric.available ? formatMetric(metric) : "Not available"}</strong><em>{metric.available ? "Database value" : "Configuration required"}</em></div></article>)}</section>
      <section className={`${styles.card} ${styles.rulesCard}`}><div className={styles.tabs} role="tablist"><button role="tab" aria-selected="true">All Rules</button></div><div className={styles.filters}><label className={styles.search}><Search/><input disabled aria-label="Search commission rules" placeholder="Search requires commission rule records"/></label></div><div className={styles.tableTitle}><h2>Marketplace Commission Rules</h2><span>0 rules</span></div><Empty icon={BadgeDollarSign} title="No commission rule domain configured" text="A reviewed schema, status model, scope model, resolver, and approval workflow are required before rules can be managed."/></section>
      <section className={styles.analytics}><FinancialTrend data={data.trend}/>{unavailableSections.slice(2,4).map(([title, key]) => <Unavailable key={key} title={title} block={data[key]}/>)}</section>
      <section className={styles.dualTables}>{unavailableSections.slice(0,2).map(([title, key]) => <Unavailable key={key} title={title} block={data[key]}/>)}</section>
      <Unavailable title="Commission Health Scorecard" block={data.scorecard}/>
    </div><aside className={styles.rail}><Unavailable title="Commission Health" block={data.health}/><Rail title="Priority Commission Alerts" text="No commission rule alert source exists."/><Unavailable title="Commission Status Summary" block={data.statusSummary}/><Unavailable title="Approval SLA Summary" block={data.sla}/><FinancialPanel data={data.financial}/><Rail title="Quick Queues" text="No supported commission rule queues exist."/></aside></div>
  </main>;
}

function formatMetric(metric) {return metric.currency ? `${metric.currency} ${Number(metric.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : String(metric.value);}
function FinancialTrend({data}) {return <section className={styles.card}><header className={styles.cardHeader}><h2>Commission Revenue &amp; Settlement Trend</h2></header>{data.available && data.items.length ? <div className={styles.chart}><ResponsiveContainer><ComposedChart data={data.items}><CartesianGrid/><XAxis dataKey="period"/><YAxis/><Tooltip/><Bar dataKey="commissionRevenue" fill="#790019"/><Bar dataKey="settlementImpact" fill="#cbb8b9"/></ComposedChart></ResponsiveContainer></div> : <Empty title={data.available ? "Insufficient data" : "Not available"} text={data.reason ? humanize(data.reason) : "No settlements fall in this period."}/>}</section>;}
function FinancialPanel({data}) {return <section className={styles.railCard}><h2>Financial Impact</h2>{data.available ? <><p className={styles.money}><span>Commission Revenue</span><b>{data.currency} {Number(data.commissionRevenue).toLocaleString(undefined, {minimumFractionDigits: 2})}</b></p><p className={styles.money}><span>Pending Settlement Impact</span><b>{data.currency} {Number(data.pendingSettlementImpact).toLocaleString(undefined, {minimumFractionDigits: 2})}</b></p><p className={styles.money}><span>Settlement Records</span><b>{data.settlementCount}</b></p></> : <Empty title="Not available" text={humanize(data.reason)}/>}</section>;}
function Unavailable({title, block}) {return <section className={styles.card}><header className={styles.cardHeader}><h2>{title}</h2></header><Empty title="Not available" text={humanize(block.reason)}/></section>;}
function Rail({title, text}) {return <section className={styles.railCard}><h2>{title}</h2><Empty title="Not available" text={text}/></section>;}
function Empty({icon: Icon = AlertTriangle, title, text}) {return <div className={styles.empty}><Icon/><h3>{title}</h3><p>{text}</p></div>;}
function Loading() {return <div className={styles.loading} role="status" aria-label="Loading marketplace commissions"><div/><section>{Array.from({length: 12}, (_, index) => <i key={index}/>)}</section><div/><div/></div>;}
