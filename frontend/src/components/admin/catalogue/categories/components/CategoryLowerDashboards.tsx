"use client";
import React from "react";
import type {CategoryManagementData} from "@/types/categoryManagement";

const Unavailable=({reason}:{reason:string})=><div className="rounded border border-amber-200 bg-amber-50 p-3 text-[11px] text-amber-800"><b>Unavailable</b><p className="mt-1">{reason}</p></div>;
const Card=({title,children}:{title:string;children:React.ReactNode})=><section className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs min-w-0"><h3 className="font-bold text-gray-900 text-xs mb-3">{title}</h3>{children}</section>;
export function CategoryLowerDashboards({data,onMergeDuplicate}:{data:CategoryManagementData;onMergeDuplicate:(sourceId:string,targetId:string)=>void}){
 const unavailable="No authoritative category domain tables exist for this capability.";
 return <div className="flex flex-col gap-5 mt-2 text-xs min-w-0">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
   <Card title="Category Health Scorecard"><Metric label="Hierarchy Integrity" value={`${data.analytics.hierarchyIntegrity}%`}/><Metric label="Attribute Completeness" value={data.summary.attributeCoverage===null?"N/A":`${data.summary.attributeCoverage}%`}/><Metric label="Product Mapping Quality" value={`${data.summary.uncategorizedProducts} uncategorized`}/><Unavailable reason="Channel, compliance, SEO, publication and audit score inputs are absent."/></Card>
   <Card title="Required Attribute Coverage"><p className="text-gray-500">Across categories with configured required attributes</p><p className="mt-3 text-3xl font-black">{data.summary.attributeCoverage===null?"N/A":`${data.summary.attributeCoverage}%`}</p></Card>
   <Card title="Category Product Coverage"><table className="w-full text-[11px]"><thead><tr className="text-left text-gray-500"><th>Level</th><th>Categories</th><th>Active</th><th>Avg</th></tr></thead><tbody>{data.analytics.productCoverage.map(r=><tr key={r.level} className="border-t"><td className="py-2">{r.level}</td><td>{r.categoriesCount}</td><td>{r.activeProductsCount}</td><td>{r.avgPerCategory}</td></tr>)}</tbody></table>{!data.analytics.productCoverage.length&&<p>No categories found.</p>}</Card>
   <Card title="Channel Eligibility Matrix"><Unavailable reason={unavailable}/></Card>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
   <Card title="Duplicate Category Candidates">{data.analytics.duplicatePairs.length?data.analytics.duplicatePairs.map(p=><div key={p.id} className="mb-2 rounded border bg-gray-50 p-2"><b>{p.categoryA} / {p.categoryB}</b><p>{p.productsCount} products · exact same-parent name</p><button onClick={()=>onMergeDuplicate(p.sourceId,p.targetId)} className="mt-2 rounded border px-2 py-1 font-bold text-[#741d35]">Merge</button></div>):<p>No exact duplicate candidates.</p>}</Card>
   <Card title="Uncategorized & Misclassified Products"><Metric label="Uncategorized Products" value={data.summary.uncategorizedProducts}/><Unavailable reason="No classification-review or misclassification model exists."/></Card>
   <Card title="SEO & Merchandising Readiness"><Unavailable reason={unavailable}/></Card>
   <Card title="Recent Category Activity">{data.analytics.activities.length?data.analytics.activities.map(a=><div key={a.id} className="border-b py-2"><b>{a.action}</b><p className="text-gray-500">{a.categoryName} · {a.user}</p><time className="text-[10px] text-gray-400">{new Date(a.dateTime).toLocaleString()}</time></div>):<p>No category activity recorded.</p>}</Card>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
   <Card title="Category Compliance Rule Matrix"><Unavailable reason={unavailable}/></Card>
   <Card title="Mapping / Taxonomy Governance Summary"><Metric label="Maximum depth" value={data.analytics.maxDepth}/><Metric label="Leaf categories" value={data.analytics.leafCategories}/><Metric label="Average active products/category" value={data.analytics.averageProductsPerCategory}/><Unavailable reason="Review/governance records are absent."/></Card>
   <Card title="Recent Approvals & Audit Events"><Unavailable reason="Category review and approval records do not exist. Mutation audit events appear in Recent Category Activity."/></Card>
  </div>
 </div>;
}
function Metric({label,value}:{label:string;value:string|number}){return <div className="flex items-center justify-between border-b py-2"><span className="text-gray-600">{label}</span><b>{value}</b></div>}
