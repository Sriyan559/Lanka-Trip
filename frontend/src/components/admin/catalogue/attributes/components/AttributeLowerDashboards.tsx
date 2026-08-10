"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";
import type { AttributeManagementData, DuplicateAttributePair } from "@/types/attributeManagement";

interface Props { data: AttributeManagementData["lower"]; capabilities: AttributeManagementData["capabilities"]; onCompareDuplicate: (pair: DuplicateAttributePair) => void }
const Panel = ({ title, children, wide = false }: { title: string; children: React.ReactNode; wide?: boolean }) => <section className={`rounded border border-gray-200 bg-white p-4 shadow-2xs ${wide ? "lg:col-span-3" : ""}`}><h3 className="mb-3 text-[11.5px] font-bold text-gray-900">{title}</h3>{children}</section>;
const Empty = ({ reason }: { reason: string }) => <p className="rounded border border-dashed border-gray-200 bg-gray-50 p-4 text-[10.5px] text-gray-500">Unavailable — {reason}</p>;
const Table = ({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) => rows.length ? <div className="overflow-x-auto"><table className="w-full text-left text-[10.5px]"><thead><tr className="border-b text-gray-400">{headers.map(header => <th key={header} className="px-2 py-1.5 uppercase">{header}</th>)}</tr></thead><tbody>{rows.map((row,index) => <tr key={index} className="border-b border-gray-100">{row.map((cell,cellIndex) => <td key={cellIndex} className="px-2 py-2">{cell}</td>)}</tr>)}</tbody></table></div> : <Empty reason="no authoritative records are available."/>;

export const AttributeLowerDashboards: React.FC<Props> = ({ data, capabilities, onCompareDuplicate }) => <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
  <Panel title="Attribute Health Scorecard"><div className="grid grid-cols-2 gap-2">{data.healthScorecard.map(metric => <div key={metric.label} className="rounded bg-gray-50 p-2"><span className="block text-[10px] text-gray-500">{metric.label}</span><b>{metric.value}%</b></div>)}</div></Panel>
  <Panel title="Attribute Value Management"><Table headers={["Attribute","Missing"]} rows={data.missingValues.map(row => [<b key="n">{row.name}</b>, row.missing.toLocaleString()])}/></Panel>
  <Panel title="Category Attribute Template Matrix"><Table headers={["Category","Required","Optional"]} rows={data.categoryMatrix.map(row => [<b key="n">{row.category}</b>, row.required, row.optional])}/></Panel>
  <Panel title="Variant Generation Rules"><Empty reason={String(capabilities.variantRulesReason || "no authoritative variant-rule schema is installed.")}/></Panel>
  <Panel title="Product Variant Readiness by Channel"><Empty reason={String(capabilities.channelsReason || "no authoritative channel requirement schema is installed.")}/></Panel>
  <Panel title="Attribute Validation Rules"><Empty reason={String(capabilities.validationRulesReason || "no authoritative validation-rule schema is installed.")}/></Panel>
  <Panel title="Attribute Dependencies & Inheritance"><Empty reason={String(capabilities.dependenciesReason || "no authoritative dependency schema is installed.")}/></Panel>
  <Panel title="Channel Attribute Requirements"><Empty reason={String(capabilities.channelsReason || "no authoritative channel requirement schema is installed.")}/></Panel>
  <Panel title="Attribute Quality & Variant Issues"><div className="space-y-2">{data.qualityIssues.map(issue => <div key={issue.id} className="flex justify-between rounded bg-gray-50 p-2 text-[10.5px]"><span className="flex items-center gap-1.5"><AlertTriangle size={11} className="text-amber-500"/>{issue.label}</span><b>{issue.count}</b></div>)}</div></Panel>
  <Panel title="Duplicate Attribute Candidates"><Table headers={["Attribute","Candidates","Similarity","Action"]} rows={data.duplicateCandidates.map(pair => [<b key="n">{pair.attributeName}</b>, pair.potentialDuplicatesCount, `${pair.similarityPercent}%`, <button key="a" onClick={() => onCompareDuplicate(pair)} className="rounded border px-2 py-0.5 font-bold">Compare</button>])}/></Panel>
  <Panel title="Recent Attribute & Variant Activity" wide><Table headers={["Activity","Entity","Action By","Date & Time","Details","Result"]} rows={data.activities.map(activity => [<b key="a">{activity.activity}</b>, activity.entityName, activity.actionBy, activity.dateTime, activity.details, activity.result])}/></Panel>
</div>;
