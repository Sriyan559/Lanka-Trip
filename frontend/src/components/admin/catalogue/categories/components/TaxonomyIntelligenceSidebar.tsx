"use client";
import React from "react";
import type {CategoryManagementData} from "@/types/categoryManagement";

const Panel=({title,children}:{title:string;children:React.ReactNode})=><section className="bg-white border border-gray-200 rounded p-3 shadow-2xs"><h3 className="text-xs font-bold mb-2">{title}</h3>{children}</section>;
const Row=({label,value}:{label:string;value:string|number})=><div className="flex justify-between border-b border-gray-100 py-1.5 text-[11px]"><span>{label}</span><b>{value}</b></div>;
export function TaxonomyIntelligenceSidebar({data,onSelectQueue}:{data:CategoryManagementData;onSelectQueue:(id:string)=>void}){
 const availableScores=[data.analytics.hierarchyIntegrity,data.summary.attributeCoverage].filter((v):v is number=>v!==null);const score=availableScores.length?Math.round(availableScores.reduce((a,b)=>a+b,0)/availableScores.length):null;
 return <div className="flex flex-col gap-4">
  <Panel title="Taxonomy Health"><div className="flex items-center gap-3"><div className="h-14 w-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-black">{score??"N/A"}</div><p className="text-[10px] text-gray-500">Limited score: hierarchy integrity and configured required-attribute coverage only.</p></div></Panel>
  <Panel title="Priority Alerts"><Row label="Orphan categories" value={data.summary.orphanCategories}/><Row label="Exact duplicate candidates" value={data.summary.duplicateCandidates}/><Row label="Uncategorized products" value={data.summary.uncategorizedProducts}/><p className="mt-2 text-[10px] text-amber-700">Channel and compliance alerts unavailable.</p></Panel>
  <Panel title="Hierarchy Summary"><Row label="Max Depth" value={data.analytics.maxDepth}/><Row label="Avg Products / Category" value={data.analytics.averageProductsPerCategory}/><Row label="Leaf Categories" value={data.analytics.leafCategories}/><Row label="Review Required" value="N/A"/></Panel>
  <Panel title="Governance Summary"><p className="rounded bg-amber-50 p-2 text-[10px] text-amber-800">Unavailable: no category reviewer, approval, lock or governance records.</p></Panel>
  <Panel title="Quick Queues"><button onClick={()=>onSelectQueue("duplicates")} className="w-full text-left"><Row label="Duplicate Review" value={data.summary.duplicateCandidates}/></button><button onClick={()=>onSelectQueue("uncategorized")} className="w-full text-left"><Row label="Uncategorized" value={data.summary.uncategorizedProducts}/></button><Row label="Attribute Gaps" value="N/A"/><Row label="Compliance Review" value="N/A"/><Row label="Channel Mapping" value="N/A"/></Panel>
 </div>;
}
