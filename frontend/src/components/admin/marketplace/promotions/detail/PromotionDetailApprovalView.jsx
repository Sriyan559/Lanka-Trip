"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {AlertTriangle,ChevronRight,RefreshCw} from "lucide-react";
import {fetchMarketplacePromotionDetail} from "@/services/api/marketplacePromotionDetailService";
import styles from "./promotion-detail-approval.module.css";

export default function PromotionDetailApprovalView({promotionId}){const[loading,setLoading]=useState(true),[error,setError]=useState("");useEffect(()=>{const controller=new AbortController();void fetchMarketplacePromotionDetail(promotionId,controller.signal).catch(caught=>{if(caught?.name!=="AbortError")setError(caught?.status===404?"Promotion records are not available because the promotion domain has not been implemented.":"Promotion details could not be loaded.")}).finally(()=>setLoading(false));return()=>controller.abort()},[promotionId]);if(loading)return <div className={styles.loading} aria-busy="true"><RefreshCw/></div>;return <main className={styles.page}><nav className={styles.breadcrumb}><Link href="/admin/marketplace">Marketplace</Link><ChevronRight/><Link href="/admin/marketplace/promotions">Promotions</Link><ChevronRight/><span>{promotionId}</span></nav><section className={styles.state} role="alert"><AlertTriangle/><h1>Promotion detail unavailable</h1><p>{error||"No promotion record exists."}</p><Link href="/admin/marketplace/promotions">Back to Promotions</Link></section></main>}
