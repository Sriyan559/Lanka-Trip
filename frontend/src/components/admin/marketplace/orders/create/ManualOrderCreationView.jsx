"use client";

import {useEffect,useState} from "react";
import {AlertTriangle,Check,ShieldCheck} from "lucide-react";
import {Breadcrumb,Card,State,styles} from "@/components/admin/marketplace/enterprise-workspaces/WorkspaceUI";
import {fetchManualOrderCapabilities} from "@/services/api/orderService";

const steps=["Business Context","Customer","Items","Inventory","Pricing","Delivery","Payment","Review","Approval","Order Created"];
const pretty=value=>value.replaceAll("_"," ").replace(/\b\w/g,char=>char.toUpperCase());

export default function ManualOrderCreationView(){
  const [capability,setCapability]=useState(null),[error,setError]=useState(""),[loading,setLoading]=useState(true);
  const load=()=>{setLoading(true);setError("");fetchManualOrderCapabilities().then(setCapability).catch(reason=>setError(reason.message||"Unable to verify manual-order capabilities.")).finally(()=>setLoading(false))};
  useEffect(()=>{const controller=new AbortController();fetchManualOrderCapabilities(controller.signal).then(setCapability).catch(reason=>{if(reason.name!=="AbortError")setError(reason.message||"Unable to verify manual-order capabilities.")}).finally(()=>setLoading(false));return()=>controller.abort()},[]);
  if(loading)return <State title="Checking manual-order capabilities" loading/>;
  if(error)return <State title="Manual order unavailable" text={error} onRetry={load}/>;
  return <main className={styles.page}><Breadcrumb items={[{label:"Marketplace",href:"/admin/marketplace"},{label:"Orders",href:"/admin/marketplace/orders"},{label:"Create Manual Order"}]}/><header className={styles.header}><div><h1>Manual Order Creation</h1><p>Create a marketplace order on behalf of a customer using verified listings, authoritative pricing, available inventory, and auditable administrative controls.</p></div><div className={styles.headerActions}><button disabled>Save Draft</button><button disabled>Validate Order</button><button disabled>Preview Order</button><button className={styles.primary} disabled><ShieldCheck/>Submit for Approval</button></div></header><div className={styles.alertBar} role="alert"><AlertTriangle/><div><b>Manual order creation is not available.</b><br/>The application currently supports order creation from an accepted quotation only. No server-side manual draft, pricing, inventory reservation, approval, or idempotency workflow exists.</div></div><section className={styles.workflow}>{steps.map((step,index)=><div className={index===0?styles.active:""} key={step}><i>{index===0?<Check size={13}/>:index+1}</i><b>{step}</b></div>)}</section><div className={styles.layout}><div className={styles.workspace}><div className={styles.forms}><Card className={styles.span12} title="Required backend capabilities"><div className={styles.formBody}><p>These capabilities must be implemented and approved before this workflow can accept data:</p><ul>{(capability?.missingCapabilities??[]).map(item=><li key={item}>{pretty(item)}</li>)}</ul><p><b>Supported creation path:</b> {pretty(capability?.supportedCreationPath??"accepted_quotation_only")}</p></div></Card></div></div><aside className={styles.rail}><section className={styles.railCard}><h2>Order Validation</h2><p>Unavailable until an authoritative draft can be created.</p></section><section className={styles.railCard}><h2>Final Actions</h2><button className={styles.primary} disabled>Submit for Approval</button></section></aside></div></main>
}
