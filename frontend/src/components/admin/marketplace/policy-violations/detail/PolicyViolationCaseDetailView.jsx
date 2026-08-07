"use client";

import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {ArrowLeft, LockKeyhole, RefreshCw, ShieldAlert} from "lucide-react";
import {Badge, Breadcrumb, Card, KeyValues, State, styles} from "@/components/admin/marketplace/enterprise-workspaces/WorkspaceUI";
import {fetchMarketplacePolicyViolation} from "@/services/api/marketplacePolicyViolationsService";

const humanize = value => value ? value.replaceAll("_", " ").replace(/\b\w/g, letter => letter.toUpperCase()) : "Not available";

export default function PolicyViolationCaseDetailView({caseId}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {setData(await fetchMarketplacePolicyViolation(decodeURIComponent(caseId)));}
    catch (exception) {setError(exception instanceof Error ? exception.message : "Policy case data could not be loaded.");}
    finally {setLoading(false);}
  }, [caseId]);
  useEffect(() => {void reload();}, [reload]);
  if (loading && !data) return <State title="Loading policy case" loading/>;
  if (error && !data) return <State title="Policy case unavailable" text={error} onRetry={reload}/>;
  if (!data?.permissions.canView) return <State title="Permission required" text="Your role cannot access this policy case."/>;
  const item = data.case;
  return <main className={styles.page}>
    <Breadcrumb items={[{label: "Marketplace", href: "/admin/marketplace"}, {label: "Policy Violations", href: "/admin/marketplace/policy-violations"}, {label: item.caseCode}]}/>
    <div className={styles.header}><div><Link href="/admin/marketplace/policy-violations"><ArrowLeft size={13}/> Back to Marketplace Policy Violations</Link><h1>{humanize(item.category)}</h1><div className={styles.titleBadges}><strong>{item.caseCode}</strong><Badge>{humanize(item.status)}</Badge><Badge>{humanize(item.complianceStatus)}</Badge>{item.severity && <Badge>{humanize(item.severity)}</Badge>}</div></div><div className={styles.headerActions}><button onClick={() => void reload()}><RefreshCw/>Refresh</button><button disabled title="No dedicated case export contract is configured">Export Case Report</button><button disabled title="Case mutations are unavailable">More Actions</button></div></div>
    {error && <div className={styles.alertBar}><ShieldAlert/>Refresh failed. The last successfully loaded record remains visible.</div>}
    <section className={styles.card}><div className={styles.grid3}>
      <KeyValues data={{"Case ID": item.id, "Case Number": item.caseCode, Category: humanize(item.category), Status: humanize(item.status)}}/>
      <KeyValues data={{Policy: item.policy?.name || "Not available", "Policy Key": item.policy?.key || "Not available", Severity: humanize(item.severity), "Compliance Status": humanize(item.complianceStatus)}}/>
      <KeyValues data={{Source: item.source ? `${item.source.type} #${item.source.id}` : "Not available", Reviewer: item.assignedReviewer?.name || "Unassigned", "Created At": new Date(item.createdAt).toLocaleString(), "Updated At": new Date(item.updatedAt).toLocaleString()}}/>
    </div></section>
    <div className={styles.layout}><div className={styles.workspace}><div className={styles.grid2}>
      <UnavailableCard title="Evidence" block={data.evidence}/><UnavailableCard title="Enforcement" block={data.enforcement}/><UnavailableCard title="Appeal" block={data.appeal}/><Card title="Notes"><p style={{padding: "0 11px"}}><LockKeyhole size={14}/> {item.noteCount} note(s) recorded. Note contents are restricted and are not returned by this API.</p></Card>
    </div></div><aside className={styles.rail}><section className={styles.railCard}><h2>Available Actions</h2><p>Read-only access is supported. Creation, editing, evidence review, enforcement, and appeals require domain and authorization contracts that are not present.</p></section><section className={styles.railCard}><h2>Data Freshness</h2><KeyValues data={{"Data As Of": new Date(data.meta.dataAsOf).toLocaleString(), "Refresh Interval": `${data.meta.refreshIntervalSeconds} seconds`}}/></section></aside></div>
  </main>;
}

function UnavailableCard({title, block}) {
  return <Card title={title}><p style={{padding: "0 11px"}}>Not available - {humanize(block.reason)}.</p></Card>;
}
