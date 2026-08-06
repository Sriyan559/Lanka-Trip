"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Download, Info, RefreshCw, ShieldCheck, Store, XCircle } from "lucide-react";
import { fetchMarketplaceSellerDetail } from "@/services/api/marketplaceSellerDetailService";
import { exportMarketplaceSellers } from "@/services/api/marketplaceSellersService";
import styles from "./seller-performance-detail.module.css";

export function SellerPerformanceDetailView({sellerId}) {
  const [data,setData]=useState(null); const [loading,setLoading]=useState(true); const [refreshing,setRefreshing]=useState(false); const [error,setError]=useState("");
  const load=useCallback(async(background=false)=>{background?setRefreshing(true):setLoading(true);setError("");const controller=new AbortController();try{setData(await fetchMarketplaceSellerDetail(sellerId,{},controller.signal));}catch(e){if(e?.name!=="AbortError")setError(e?.status===404||e?.message==="SELLER_NOT_FOUND"?"The requested seller could not be found.":"Seller performance details could not be loaded.");}finally{setLoading(false);setRefreshing(false)}return()=>controller.abort()},[sellerId]);
  useEffect(()=>{void load()},[load]);
  if(loading&&!data)return <div className={styles.loading} role="status"><div/><div/><section><i/><i/><i/></section><div/></div>;
  if(error&&!data)return <section className={styles.state} role="alert"><XCircle/><h1>Seller unavailable</h1><p>{error}</p><div><Link href="/admin/marketplace/sellers">Back to Sellers</Link><button onClick={()=>void load()}>Retry</button></div></section>;
  if(!data)return <section className={styles.state}><Store/><h1>No seller detail available</h1></section>;
  const {seller,profile}=data;
  const summary=[["Active Listings",seller.activeListings],["Total Orders",seller.orders],["GMV",seller.gmv?`${seller.gmv.currency} ${seller.gmv.amount.toLocaleString()}`:"Select a currency"],["Average Order Value",seller.averageOrderValue?`${seller.averageOrderValue.currency} ${seller.averageOrderValue.amount.toLocaleString()}`:"Unavailable"],["Fulfilment Rate",`${seller.fulfilmentRate}%`],["Cancellation Rate",`${seller.cancellationRate}%`],["Return Case Rate",`${seller.returnRate}%`],["Customer Rating",seller.rating??"—"],["Risk Level",seller.riskLevel||"Unassessed"],["Verification",seller.verificationStatus],["Compliance",profile.complianceStatus],["Last Activity",new Date(seller.lastActivityAt).toLocaleString()]];
  return <main className={styles.page}>
    <nav className={styles.breadcrumb}><Link href="/admin/marketplace">Marketplace</Link><ChevronRight/><Link href="/admin/marketplace/sellers">Sellers</Link><ChevronRight/><span>{seller.sellerCode}</span></nav>
    <header className={styles.header}><div><div className={styles.titleRow}><h1>{seller.name}</h1><span><ShieldCheck/>{seller.status.replaceAll("-"," ")}</span></div><p>{profile.description||`${seller.businessType||"Marketplace seller"} in ${profile.country}.`}</p></div><div className={styles.headerActions}><button disabled title="A seller contact workflow is not defined">Contact Seller</button><button disabled={!data.permissions.canExport} onClick={()=>void exportMarketplaceSellers({sellerId:seller.id})}><Download/>Export Report</button><button className={styles.primary} disabled title="Seller review mutations require an approved audited workflow">Place Under Review</button></div></header>
    <div className={styles.live}><i/>Live database data <small>Updated {new Date(data.generatedAt).toLocaleString()}</small><button disabled={refreshing} onClick={()=>void load(true)}><RefreshCw className={refreshing?styles.spin:""}/></button></div>
    <section className={styles.summary}>{summary.map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}</section>
    <div className={styles.layout}><div className={styles.workspace}><section className={styles.card}><h2>Seller profile</h2><dl>{[["Seller ID",seller.sellerCode],["Business type",seller.businessType||"—"],["Email",profile.email],["Phone",profile.phone||"—"],["Website",profile.website||"—"],["Location",[profile.city,profile.country].filter(Boolean).join(", ")]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section><section className={styles.card}><h2>Metric definitions</h2><p>GMV is non-cancelled order gross value for the selected period and currency.</p><p>Fulfilment is completed orders divided by all orders. Returns are return cases divided by orders.</p></section></div><aside className={styles.rail}><section className={styles.related}><h2>Unavailable domain data</h2>{Object.entries(data.unavailable).map(([key,reason])=><div key={key}><Info/><p><b>{key.replaceAll(/([A-Z])/g," $1")}</b><span>{reason}</span></p></div>)}</section></aside></div>
  </main>;
}
