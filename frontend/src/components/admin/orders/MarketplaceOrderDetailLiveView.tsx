"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { fetchOrderDetail, type MarketplaceOrderDetail } from "@/services/api/orderService";
import styles from "./order-detail.module.css";

const label = (value: unknown) => value == null || value === "" ? "Not recorded" : String(value).replaceAll("_", " ").replace(/\b\w/g, c => c.toUpperCase());
const amount = (value: unknown, currency: string) => `${currency} ${Number(value ?? 0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;

export function MarketplaceOrderDetailLiveView({orderId}:{orderId:string}) {
  const [order,setOrder]=useState<MarketplaceOrderDetail|null>(null); const [error,setError]=useState(""); const [loading,setLoading]=useState(true);
  const load=async()=>{setLoading(true);try{setOrder(await fetchOrderDetail(orderId));setError("")}catch(reason){setError((reason as Error).message||"Unable to load this order.")}finally{setLoading(false)}};
  useEffect(()=>{const controller=new AbortController();setLoading(true);fetchOrderDetail(orderId,controller.signal).then(value=>{setOrder(value);setError("")}).catch(reason=>{if(reason.name!=="AbortError")setError(reason.message||"Unable to load this order.")}).finally(()=>setLoading(false));return()=>controller.abort()},[orderId]);
  if(loading&&!order)return <div className={styles.pageContainer}>Loading live order…</div>;
  if(error&&!order)return <div className={styles.pageContainer} role="alert"><AlertTriangle/> <h1>Order unavailable</h1><p>{error}</p><button onClick={()=>void load()}>Retry</button></div>;
  if(!order)return null;
  return <main className={styles.pageContainer}>
    <nav className={styles.topBreadcrumbNav}><Link className={styles.backLink} href="/admin/marketplace/orders"><ArrowLeft size={16}/>Back to Order Management</Link><button className="button secondary" onClick={()=>void load()}><RefreshCw size={14}/>Refresh</button></nav>
    {error&&<div className="toast-notification error" role="alert">{error} Showing the last successfully loaded record.</div>}
    <section className={styles.orderSummaryCard}><div className={styles.summaryTitleRow}><div className={styles.refBlock}><span className={styles.mainRef}>{order.orderReference}</span><span className={styles.subRef}>Database order ID {order.databaseOrderId}</span></div></div><div className={styles.metaGrid}>{[["Customer",order.customer.name],["Supplier",order.supplier?.name],["Created",new Date(order.createdAt).toLocaleString()],["Order total",amount(order.total.amount,order.total.currency)]].map(([a,b])=><div className={styles.metaItem} key={a}><span className={styles.metaLabel}>{a}</span><strong className={styles.metaValue}>{label(b)}</strong></div>)}</div><div className={styles.badgesRow}><span className={styles.statusPill}>Order: {label(order.orderStatus)}</span><span className={styles.statusPill}>Payment: {label(order.paymentStatus)}</span><span className={styles.statusPill}>Fulfilment: {label(order.fulfilmentStatus)}</span><span className={styles.statusPill}>Delivery: {label(order.delivery?.status)}</span></div></section>
    <section className="card"><h2>Order Items</h2><div className="table-wrap"><table className="order-table"><thead><tr><th>Product</th><th>SKU</th><th>Quantity</th><th>Unit</th><th>Unit price</th><th>Tax</th><th>Discount</th><th>Total</th></tr></thead><tbody>{order.items.length?order.items.map(item=><tr key={String(item.id)}><td>{label(item.product_name)}</td><td>{label(item.sku)}</td><td>{label(item.quantity)}</td><td>{label(item.unit)}</td><td>{amount(item.unit_price,order.total.currency)}</td><td>{amount(item.tax_amount,order.total.currency)}</td><td>{amount(item.discount_amount,order.total.currency)}</td><td>{amount(item.total_amount,order.total.currency)}</td></tr>):<tr><td colSpan={8}>No order items recorded.</td></tr>}</tbody></table></div></section>
    <div className="orders-workspace-grid"><section className="card"><h2>Payments</h2>{order.payments.length?order.payments.map(payment=><dl className={styles.metaGrid} key={String(payment.id)}><div><dt>Payment</dt><dd>{label(payment.payment_number)}</dd></div><div><dt>Method</dt><dd>{label(payment.method_name)}</dd></div><div><dt>Status</dt><dd>{label(payment.payment_status)}</dd></div><div><dt>Amount</dt><dd>{amount(payment.amount,order.total.currency)}</dd></div></dl>):<p>No payment records exist for this order.</p>}</section><section className="card"><h2>Shipments & Returns</h2><p>{order.shipments.length?`${order.shipments.length} shipment record(s)`:`No shipment records exist.`}</p><p>{order.returns.length?`${order.returns.length} return case(s)`:`No return cases exist.`}</p></section></div>
    <section className="card"><h2>Administrative Actions</h2><p>Read-only. Status changes, assignment, risk/SLA actions, customer contact, refunds, and shipment mutations are unavailable here because no authorized admin workflow contract exists for them.</p><button disabled className="button secondary">Assign Officer</button> <button disabled className="button secondary">Update Status</button> <button disabled className="button secondary">Start Refund</button></section>
  </main>;
}
