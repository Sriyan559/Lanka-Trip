import Link from "next/link";
export function KpiCard({label,value,href,note="Mock operational metric"}:{label:string;value:string;href:string;note?:string}){return <Link href={href} className="card"><div className="muted">{label}</div><div className="kpi-value">{value}</div><small className="muted">{note} · View queue →</small></Link>}
