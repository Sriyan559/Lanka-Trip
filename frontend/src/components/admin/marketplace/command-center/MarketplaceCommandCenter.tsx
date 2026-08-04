"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Download, Info, MoreVertical, RefreshCw, Store, X } from "lucide-react";
import { fetchMarketplaceDashboard } from "@/services/api/marketplaceDashboardService";
import type { CompositionItem, MarketplaceDashboardData, TrendPoint } from "@/types/marketplaceDashboard";
import styles from "./marketplace-command-center.module.css";

const CONTEXT = { tenant: "sl-beauty-enterprise", businessUnit: "LK" };
const withContext = (href: string) => {
  const [path, query = ""] = href.split("?");
  const params = new URLSearchParams(query);
  Object.entries(CONTEXT).forEach(([key, value]) => params.set(key, value));
  return `${path}?${params.toString()}`;
};

function TrendChart({ points }: { points: TrendPoint[] }) {
  const max = Math.max(...points.map((point) => point.gmv), 1);
  return <div className={styles.chart} role="img" aria-label={`Revenue trend across ${points.length} periods`}>
    {points.map((point) => <div className={styles.barColumn} key={point.label}>
      <div className={styles.barStack} title={`${point.label}: GMV ${point.gmv}M`}>
        <i className={styles.refundBar} style={{height:`${point.refunds/max*100}%`}} />
        <i className={styles.commissionBar} style={{height:`${point.commission/max*100}%`}} />
        <i className={styles.salesBar} style={{height:`${point.sales/max*100}%`}} />
        <i className={styles.gmvBar} style={{height:`${Math.max(18,(point.gmv-point.sales-point.commission-point.refunds)/max*100)}%`}} />
      </div><span>{point.label}</span>
    </div>)}
  </div>;
}

function CompositionChart({ items }: { items: CompositionItem[] }) {
  let cursor = 0;
  const gradient = items.map((item) => { const start=cursor; cursor+=item.value; return `${item.color} ${start}% ${cursor}%`; }).join(",");
  return <div className={styles.compositionBody}>
    <div className={styles.donut} style={{background:`conic-gradient(${gradient})`}} role="img" aria-label={items.map(i=>`${i.label} ${i.value}%`).join(", ")}><div><strong>{items[0]?.value ?? 0}%</strong><span>{items[0]?.label ?? "No data"}</span></div></div>
    <ul>{items.map(item=><li key={item.label}><i style={{background:item.color}}/><span>{item.label}</span><strong>{item.value}%</strong></li>)}</ul>
  </div>;
}

function DashboardModal({ type, onClose }: { type: string; onClose: () => void }) {
  const titles: Record<string,string> = { report:"Generate Marketplace Report", export:"Export Report", settings:"Marketplace Settings", manage:"Connected Marketplaces", queue:"Operational Queue", seller:"Seller Actions", audit:"Audit Record", reconcile:"Ledger Reconciliation" };
  useEffect(() => { const key=(event:KeyboardEvent)=>{if(event.key==="Escape")onClose();}; document.addEventListener("keydown",key); return()=>document.removeEventListener("keydown",key); },[onClose]);
  return <div className={styles.modalBackdrop} onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="dashboard-modal-title">
    <header><h2 id="dashboard-modal-title">{titles[type] ?? "Marketplace Action"}</h2><button type="button" onClick={onClose} aria-label="Close dialog"><X size={18}/></button></header>
    {type==="manage" ? <div className={styles.marketplaceList}><article><Store/><div><strong>SL Beauty Enterprise</strong><span>Sri Lanka · Live · Primary marketplace</span></div></article></div> :
      type==="settings" ? <form><label>Default business unit<select defaultValue="LK"><option value="LK">Sri Lanka (LK)</option></select></label><label><input type="checkbox" defaultChecked/> Show live operational alerts</label></form> :
      type==="seller" ? <div className={styles.actionList}><Link href={withContext("/admin/verification/suppliers")}>View seller profile</Link><Link href={withContext("/admin/marketplace/orders")}>View seller orders</Link><Link href={withContext("/admin/catalogue/product-approvals")}>View products</Link></div> :
      <form><label>Report format<select defaultValue="csv"><option value="csv">CSV</option><option value="pdf">PDF</option></select></label><label>Date range<select defaultValue="current"><option value="current">Current reporting period</option><option value="month">This month</option></select></label><p>This frontend workflow is ready for connection to the corresponding reporting service.</p></form>}
    <footer><button type="button" className={styles.secondaryButton} onClick={onClose}>Cancel</button><button type="button" className={styles.primaryButton} onClick={onClose}>Confirm</button></footer>
  </section></div>;
}

export function MarketplaceCommandCenter() {
  const [data,setData]=useState<MarketplaceDashboardData|null>(null);
  const [loading,setLoading]=useState(true); const [error,setError]=useState<string|null>(null); const [refreshing,setRefreshing]=useState(false);
  const [period,setPeriod]=useState<"daily"|"weekly"|"monthly">("daily"); const [composition,setComposition]=useState<"category"|"seller"|"channel"|"business">("category");
  const [modal,setModal]=useState<string|null>(null); const [sellerMenu,setSellerMenu]=useState<number|null>(null);
  const requestController=useRef<AbortController|null>(null);
  const load=useCallback(async(refresh=false)=>{requestController.current?.abort();const controller=new AbortController();requestController.current=controller;refresh?setRefreshing(true):setLoading(true);setError(null);try{setData(await fetchMarketplaceDashboard(controller.signal));}catch(err){if((err as Error).name!=="AbortError")setError(err instanceof Error?err.message:"Unable to load Marketplace dashboard.");}finally{if(requestController.current===controller){setLoading(false);setRefreshing(false);}}},[]);
  useEffect(()=>{void load();return()=>requestController.current?.abort();},[load]);
  if(loading&&!data)return <div className={styles.state} aria-busy="true"><div className={styles.skeleton}/><div className={styles.skeletonGrid}>{Array.from({length:8},(_,i)=><i key={i}/>)}</div></div>;
  if(error&&!data)return <div className={styles.state} role="alert"><h1>Marketplace Command Center</h1><p>{error}</p><button className={styles.primaryButton} onClick={()=>void load()}>Retry</button></div>;
  if(!data)return <div className={styles.state}><h1>Marketplace Command Center</h1><p>No marketplace dashboard data is available.</p></div>;
  return <div className={styles.page}>
    <header className={styles.pageHeader}><div><h1>Marketplace Command Center</h1><p>Enterprise Administration <span>›</span> Marketplace Command Center</p></div><button className={styles.primaryButton} onClick={()=>setModal("report")}><Download size={15}/>Generate Report</button></header>
    <div className={styles.dashboardLayout}><main className={styles.workspace}>
      <section className={styles.commandCard}><div><p className={styles.eyebrow}>Marketplace <span>|</span> Command &amp; Control</p><h2>Marketplace Command Center</h2><p>Monitor marketplace sales, orders, sellers, commissions, fulfilment and operational risks across our connected business universe.</p></div><div className={styles.commandActions}><button onClick={()=>setModal("export")}>Export Report</button><button onClick={()=>setModal("settings")}>Marketplace Settings</button><button className={styles.primaryButton} onClick={()=>setModal("manage")}>Manage Marketplaces</button></div></section>
      <section className={styles.contextBar}><dl><div><dt>Trusted Business</dt><dd>SL Beauty Enterprise</dd></div><div><dt>Administrated By</dt><dd>SL Admin</dd></div><div><dt>Business</dt><dd>Sri Lanka (LK)</dd></div><div><dt>Time Zone</dt><dd>Local (UTC+5:30)</dd></div></dl><div className={styles.live}><span>● Live data</span><small>{data.lastUpdated}</small><button onClick={()=>void load(true)} disabled={refreshing} aria-label="Refresh dashboard"><RefreshCw size={14} className={refreshing?styles.spin:""}/></button></div></section>
      <section className={styles.kpiGrid}>{data.kpis.map(kpi=><article className={styles.kpi} key={kpi.id}><header><span>{kpi.label}</span><Info size={13}/></header><div><strong>{kpi.value}</strong><em className={kpi.positive?styles.positive:styles.negative}>{kpi.positive?"↑":"↓"} {kpi.change}</em></div>{kpi.trend?<svg viewBox="0 0 100 20" aria-hidden="true"><polyline points={kpi.trend.map((v,i)=>`${i*16},${20-v*1.7}`).join(" ")} fill="none" stroke="#8b0028" strokeWidth="1.5"/></svg>:<small>{kpi.note}</small>}</article>)}</section>
      <section className={styles.chartGrid}><article className={styles.card}><header className={styles.cardHeader}><div><h2>Marketplace Sales &amp; Revenue Trend</h2><p><strong>LKR 45.2M</strong> Total GMV <span>|</span> <strong>LKR 8.4M</strong> Net Sales</p></div><div className={styles.segmented}>{(["daily","weekly","monthly"] as const).map(item=><button aria-pressed={period===item} className={period===item?styles.active:""} onClick={()=>setPeriod(item)} key={item}>{item}</button>)}</div></header><TrendChart points={data.trends[period]}/></article>
      <article className={styles.card}><header className={styles.cardHeader}><h2>Marketplace Composition</h2></header><div className={styles.segmented}>{(["category","seller","channel","business"] as const).map(item=><button aria-pressed={composition===item} className={composition===item?styles.active:""} onClick={()=>setComposition(item)} key={item}>{item==="business"?"Business Unit":item}</button>)}</div><CompositionChart items={data.composition[composition]}/></article></section>
      <section className={`${styles.card} ${styles.pipeline}`}><h2>Order Lifecycle Pipeline</h2><div>{data.lifecycle.map(stage=><Link className={styles[stage.tone]} href={withContext(stage.href)} key={stage.label}><span>{stage.label}</span><strong>{stage.count}</strong></Link>)}</div></section>
      <section className={styles.queueGrid}>{data.queues.map(queue=>queue.href?<Link href={withContext(queue.href)} className={styles.queue} key={queue.label}><strong>{queue.count}</strong><span>{queue.label}</span><small>View Queue <ArrowRight size={13}/></small></Link>:<button className={styles.queue} onClick={()=>setModal("queue")} key={queue.label}><strong>{queue.count}</strong><span>{queue.label}</span><small>View Queue <ArrowRight size={13}/></small></button>)}</section>
      <section className={`${styles.card} ${styles.tableCard}`}><h2>Top Performing Sellers</h2><div className={styles.tableWrap}><table><thead><tr>{["Rank","Seller","Business Unit","Orders","GMV","Fulfilment","Cancellation","Return Rate","Rating","Risk","Status","Action"].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{data.sellers.map(row=><tr key={row.rank}><td>{row.rank}</td><td>{row.seller}</td><td>{row.unit}</td><td>{row.orders}</td><td>{row.gmv}</td><td className={styles.positive}>{row.fulfilment}</td><td>{row.cancellation}</td><td>{row.returnRate}</td><td>{row.rating}</td><td><span className={row.risk==="High"?styles.badgeDanger:styles.badgeSuccess}>{row.risk}</span></td><td><span className={row.status==="Live"?styles.badgeSuccess:styles.badgeDanger}>{row.status}</span></td><td><button aria-label={`Actions for ${row.seller}`} onClick={()=>setSellerMenu(sellerMenu===row.rank?null:row.rank)}><MoreVertical size={14}/></button>{sellerMenu===row.rank&&<button className={styles.inlineMenu} onClick={()=>setModal("seller")}>Open actions</button>}</td></tr>)}</tbody></table></div><Link className={styles.centerLink} href={withContext("/admin/verification/suppliers")}>View All Sellers <ArrowRight size={13}/></Link></section>
      <section className={`${styles.card} ${styles.tableCard}`}><h2>Recent Marketplace Activity Audit</h2><div className={styles.tableWrap}><table><thead><tr>{["Event & Source","Reference ID","Entity","Action","Timestamp","Initiated By","Business Unit","View Audit Record"].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{data.audits.map(row=><tr key={row.reference}><td>{row.event}</td><td>{row.href?<Link href={withContext(row.href)}>{row.reference}</Link>:row.reference}</td><td>{row.entity}</td><td>{row.action}</td><td>{row.timestamp}</td><td>{row.by}</td><td>{row.unit}</td><td><button className={styles.textButton} onClick={()=>setModal("audit")}>View Audit Record <ArrowRight size={12}/></button></td></tr>)}</tbody></table></div><button className={styles.centerLink} onClick={()=>setModal("audit")}>View All Audit Records <ArrowRight size={13}/></button></section>
    </main><aside className={styles.rail}>
      <section className={styles.card}><div className={styles.railHeading}><h2>Marketplace Health</h2><span className={styles.badgeSuccess}>Normal</span></div><div className={styles.score}><strong>84</strong><span>/100</span><small>Overall Market Performance</small></div>{data.health.map(metric=><div className={styles.healthMetric} key={metric.label}><p><span>{metric.label}</span><strong>{metric.display}</strong></p><i><b className={metric.tone===`green`?styles.greenBar:metric.tone===`amber`?styles.amberBar:styles.burgundyBar} style={{width:`${metric.value}%`}}/></i></div>)}</section>
      <section className={styles.card}><h2>Priority Alerts ({data.alerts.length})</h2><div className={styles.alertList}>{data.alerts.map(alert=><article className={styles[alert.severity]} key={alert.title}><AlertTriangle size={15}/><div><strong>{alert.title}</strong><p>{alert.description}</p><small>{alert.time} · {alert.href?<Link href={withContext(alert.href)}>{alert.action}</Link>:<button onClick={()=>setModal("queue")}>{alert.action}</button>}</small></div></article>)}</div></section>
      <section className={styles.financial}><header><h2>Financial Snapshot</h2><Download size={15}/></header>{[["Gross Merchandise Value","LKR 45.2M"],["Net Merchandise Sales","LKR 8.4M"],["Marketplace Commission","LKR 4.3M"],["Pending Settlements","LKR 1.2M"],["Ecosystem Total","LKR 59.2M"]].map(([a,b])=><p key={a}><span>{a}</span><strong>{b}</strong></p>)}<button onClick={()=>setModal("reconcile")}>Reconcile Ledger</button></section>
      <section className={styles.card}><h2>Data Status Summary</h2>{[["Overall Data Quality","High"],["Data Freshness","Live"],["API Performance","98.1%"],["Last Data Refresh","11:24 AM"],["System Performance","High"],["Data Consistency","Valid"]].map(([a,b],i)=><p className={styles.statusRow} key={a}><span>{a}</span><strong className={i===2?styles.warningText:styles.positive}>● {b}</strong></p>)}<div className={styles.legend}>● Live　◼ Demo　● Stale　● Partial　○ Refreshing　● API Down</div></section>
    </aside></div>{modal&&<DashboardModal type={modal} onClose={()=>setModal(null)}/>}</div>;
}
