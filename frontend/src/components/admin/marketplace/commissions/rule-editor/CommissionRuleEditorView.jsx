"use client";

import Link from "next/link";
import {AlertTriangle, ArrowLeft, ChevronRight, LockKeyhole} from "lucide-react";
import styles from "./commission-rule-editor.module.css";

export default function CommissionRuleEditorView({mode, ruleId}) {
  return <main className={styles.page}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/admin/marketplace">Marketplace</Link><ChevronRight/><Link href="/admin/marketplace/commissions">Commissions</Link><ChevronRight/><b>{mode === "edit" ? "Edit Rule" : "Create Rule"}</b></nav>
    <div className={styles.topLine}><Link href="/admin/marketplace/commissions"><ArrowLeft/>Back to Commission Management</Link></div>
    <header className={styles.header}><div><h1>{mode === "edit" ? "Commission Rule Unavailable" : "Create Commission Rule"}</h1><p>{ruleId ? `Requested rule: ${decodeURIComponent(ruleId)}` : "Commission rule creation is not currently configured."}</p></div><div className={styles.badges}><span className={styles.warning}>Configuration required</span></div></header>
    <section className={styles.state} role="status"><AlertTriangle/><h2>Commission rule domain not configured</h2><p>The database has no commission rules, versions, scopes, rates, precedence, conflicts, approvals, or transition history. This editor is disabled to prevent non-persisted financial changes.</p><p><LockKeyhole/> A reviewed schema, permission model, financial calculation policy, and approval workflow are required before this route can accept changes.</p><Link href="/admin/marketplace/commissions">Return to Commission Management</Link></section>
  </main>;
}
