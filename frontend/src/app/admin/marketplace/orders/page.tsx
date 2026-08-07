"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, Download, RefreshCw, Search, ShieldAlert, UserCheck } from "lucide-react";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { OrderPagination } from "@/components/admin/orders/OrderPagination";
import { exportOrdersCsv, fetchMarketplaceOrders, type MarketplaceOrdersResponse } from "@/services/api/orderService";

const humanize = (value?: string | null) => value ? value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Not available";
const money = (amount: string, currency: string) => `${currency} ${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function OrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serialized = searchParams.toString();
  const [data, setData] = useState<MarketplaceOrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stale, setStale] = useState(false);
  const [exporting, setExporting] = useState(false);

  const filters = useMemo(() => {
    const p = new URLSearchParams(serialized);
    return { search: p.get("search") || "", orderStatus: p.get("orderStatus") || "", paymentStatus: p.get("paymentStatus") || "",
      paymentMethod: p.get("paymentMethod") || "", fulfilmentStatus: p.get("fulfilmentStatus") || "", deliveryStatus: p.get("deliveryStatus") || "",
      supplierId: p.get("supplierId") || "", quickFilter: p.get("quickFilter") || "", currency: p.get("currency") || "",
      dateFrom: p.get("dateFrom") || "", dateTo: p.get("dateTo") || "", sortBy: p.get("sortBy") || "createdAt", sortDirection: p.get("sortDirection") || "desc",
      page: Number(p.get("page")) || 1, perPage: Number(p.get("perPage")) || 10 };
  }, [serialized]);

  const load = useCallback(async (background = false) => {
    const controller = new AbortController();
    if (!background) setLoading(true);
    try { const result = await fetchMarketplaceOrders(filters, controller.signal); setData(result); setError(""); setStale(false); }
    catch (reason) { if ((reason as Error).name !== "AbortError") { setError((reason as Error).message || "Unable to load orders."); setStale(Boolean(data)); } }
    finally { if (!background) setLoading(false); }
    return () => controller.abort();
  }, [filters, data]);

  useEffect(() => { void load(); const timer = window.setInterval(() => void load(true), 60_000); return () => window.clearInterval(timer); }, [serialized]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (values: Record<string, string | number>) => {
    const p = new URLSearchParams(serialized);
    Object.entries(values).forEach(([key, value]) => value && value !== "all" ? p.set(key, String(value)) : p.delete(key));
    router.push(`/admin/marketplace/orders${p.size ? `?${p}` : ""}`);
  };
  const options = data?.filters;
  const select = (label: string, key: string, values: Array<string | { slug?: string; id?: number; name: string }>, disabled = false) => (
    <label className="filter-select-group"><span className="filter-label">{label}</span><select className="filter-select" disabled={disabled} value={(filters as Record<string, unknown>)[key] as string || "all"} onChange={(e) => update({ [key]: e.target.value, page: 1 })}><option value="all">All {label}s</option>{values.map((item) => typeof item === "string" ? <option value={item} key={item}>{humanize(item)}</option> : <option value={item.slug ?? item.id} key={item.slug ?? item.id}>{item.name}</option>)}</select></label>
  );

  return <div className="marketplace-orders-page">
    <PageHeader crumbs={["Marketplace", "Order Management"]} title="Order Management" description="Monitor authoritative marketplace orders, payment state, fulfilment, shipments, delivery progress, and returns." actions={<div className="header-button-group"><div className="header-action-row"><button className="button primary" onClick={() => update({ quickFilter: "failed_payment", page: 1 })}><ShieldAlert size={15}/>Review Priority Orders</button><button className="button secondary" disabled title="Order assignment is not modeled"><UserCheck size={15}/>Assign Orders</button><button className="button secondary" disabled={!data?.permissions.canExport || exporting} onClick={async()=>{setExporting(true);try{await exportOrdersCsv(filters)}finally{setExporting(false)}}}><Download size={15}/>{exporting?"Exporting…":"Export Orders"}</button></div></div>} />
    {error && <div className="toast-notification error" role="alert"><AlertTriangle size={16}/>{error} {stale && "Showing the last successfully loaded data."}<button onClick={() => void load()}>Retry</button></div>}
    <div className="order-metrics-section"><div className="order-metrics-grid">{(data?.kpis ?? []).slice(0,6).map((metric)=><button key={metric.id} disabled={!metric.available} className="order-metric-card" title={metric.reason ?? metric.definition}><span className="metric-label">{metric.label}</span><strong className="metric-value">{metric.available ? metric.value?.toLocaleString() : "N/A"}</strong></button>)}</div><div className="order-metrics-grid">{(data?.kpis ?? []).slice(6).map((metric)=><button key={metric.id} disabled={!metric.available} className="order-metric-card" title={metric.reason ?? metric.definition}><span className="metric-label">{metric.label}</span><strong className="metric-value">{metric.available ? metric.value?.toLocaleString() : "N/A"}</strong></button>)}</div></div>
    <div className="orders-workspace-grid"><div className="orders-main-column">
      <section className="order-filter-panel"><div className="filter-row"><label className="search-control"><Search size={16}/><input className="filter-search-input" placeholder="Order reference, customer name or email" defaultValue={filters.search} onKeyDown={(e)=>{if(e.key==="Enter")update({search:e.currentTarget.value,page:1})}}/></label>{select("Order Status","orderStatus",options?.orderStatuses??[])}{select("Payment Status","paymentStatus",options?.paymentStatuses??[])}{select("Payment Method","paymentMethod",options?.paymentMethods??[])}{select("Fulfilment Status","fulfilmentStatus",options?.fulfilmentStatuses??[])}{select("Delivery Status","deliveryStatus",options?.deliveryStatuses??[])}</div><div className="filter-row">{select("Supplier","supplierId",options?.suppliers??[])}{select("Assignment","assignment",[],true)}{select("Risk Level","risk",[],true)}<label className="filter-select-group"><span className="filter-label">From</span><input type="date" className="filter-select" value={filters.dateFrom} onChange={(e)=>update({dateFrom:e.target.value,page:1})}/></label><label className="filter-select-group"><span className="filter-label">To</span><input type="date" className="filter-select" value={filters.dateTo} onChange={(e)=>update({dateTo:e.target.value,page:1})}/></label>{select("Currency","currency",data?.availableCurrencies??[])}<label className="filter-select-group"><span className="filter-label">Sort by</span><select className="filter-select" value={filters.sortBy} onChange={(e)=>update({sortBy:e.target.value,page:1})}><option value="createdAt">Created date</option><option value="orderReference">Order reference</option><option value="customer">Customer</option><option value="total">Total</option><option value="status">Order status</option><option value="paymentStatus">Payment status</option><option value="deliveryDate">Delivery date</option></select></label><label className="filter-select-group"><span className="filter-label">Direction</span><select className="filter-select" value={filters.sortDirection} onChange={(e)=>update({sortDirection:e.target.value,page:1})}><option value="desc">Descending</option><option value="asc">Ascending</option></select></label></div><div className="filter-chips-row"><div className="filter-chips-list">{[["failed_payment","Failed Payment"],["return_requested","Return Requested"],["cancelled","Cancelled"]].map(([key,label])=><button className={`filter-chip ${filters.quickFilter===key?"active":""}`} key={key} onClick={()=>update({quickFilter:filters.quickFilter===key?"":key,page:1})}>{label}</button>)}</div><button className="clear-all-filters-btn" onClick={()=>router.push("/admin/marketplace/orders")}>Clear All Filters</button></div></section>
      <div className="order-table-container"><div className="table-wrap"><table className="order-table"><thead><tr><th>Order Reference</th><th>Database Order ID</th><th>Customer</th><th>Date / Time</th><th>Items</th><th>Supplier</th><th>Total</th><th>Payment Method</th><th>Payment Status</th><th>Order Status</th><th>Fulfilment</th><th>Delivery</th><th>Assignment</th><th>Risk / SLA</th><th>Action</th></tr></thead><tbody>{loading&&!data?<tr><td colSpan={15}>Loading live orders…</td></tr>:(data?.orders.items??[]).length===0?<tr><td colSpan={15} className="empty-table-cell">No matching orders found.</td></tr>:data?.orders.items.map(order=><tr key={order.id}><td className="cell-order-ref"><Link href={`/admin/marketplace/orders/${order.id}`} className="order-ref-link">{order.orderReference}</Link></td><td>{order.databaseOrderId}</td><td>{order.customer.name}</td><td>{new Date(order.createdAt).toLocaleString()}</td><td>{order.itemsCount}</td><td>{order.supplier?.name??"Not assigned"}</td><td>{money(order.total.amount,order.total.currency)}</td><td>{order.paymentMethod??"Not recorded"}</td><td><span className="badge">{humanize(order.paymentStatus)}</span></td><td><span className="badge">{humanize(order.orderStatus)}</span></td><td><span className="badge">{humanize(order.fulfilmentStatus)}</span></td><td>{order.delivery?humanize(order.delivery.status):"Not recorded"}</td><td title="Order assignment is not modeled">N/A</td><td title="Risk and SLA domains are not modeled">N/A</td><td><Link className="button primary open-order-btn" href={`/admin/marketplace/orders/${order.id}`}>Open Order</Link></td></tr>)}</tbody></table></div></div>
      {data&&<OrderPagination currentPage={data.meta.page} pageSize={data.meta.perPage} totalRecords={data.meta.total} totalPages={data.meta.totalPages} onPageChange={(page)=>update({page})} onPageSizeChange={(perPage)=>update({perPage,page:1})}/>}</div>
      <aside className="order-operations-panel"><section className="card operations-card"><h3>Order Operations Health</h3><p className="muted">Not available</p><small>{data?.health.reason&&humanize(data.health.reason)}</small></section><section className="card operations-card"><h3>Priority Alerts</h3>{(data?.alerts??[]).length===0?<p className="muted">No failed-payment alerts in this period.</p>:data?.alerts.map(a=><button className="alert-item-row" key={a.id} onClick={()=>update({search:a.orderReference,page:1})}><span>{a.type}</span><b>{a.orderReference}</b></button>)}</section><section className="card operations-card payment-summary-card"><h3 className="text-white">Payment Summary</h3>{data?.paymentSummary.available?<div className="payment-summary-list">{[["Paid Today",data.paymentSummary.paidToday],["Pending Payments",data.paymentSummary.pendingPayments],["Failed Payments",data.paymentSummary.failedPayments],["COD Pending",data.paymentSummary.codPending],["Refunds Pending",data.paymentSummary.refundsPending]].map(([label,value])=><div className="payment-row" key={label}><span>{label}</span><strong>{data.paymentSummary.currency} {Number(value).toLocaleString(undefined,{minimumFractionDigits:2})}</strong></div>)}</div>:<p>Choose an available currency.</p>}</section><section className="card operations-card"><h3>Quick Queue</h3>{(data?.quickQueue??[]).map(q=><Link className="quick-queue-row" href={`/admin/marketplace/orders/${q.id}`} key={q.id}><span>{q.label}</span><b>{q.orderReference}</b></Link>)}</section><button className="button secondary" onClick={()=>void load()}><RefreshCw size={14}/>Refresh</button></aside>
    </div>
  </div>;
}

export default function OrderManagementPage(){return <Suspense fallback={<div className="state">Loading orders…</div>}><OrdersContent/></Suspense>}
