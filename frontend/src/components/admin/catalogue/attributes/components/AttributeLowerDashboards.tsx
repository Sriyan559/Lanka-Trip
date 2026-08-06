"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, ChevronRight, GitMerge, FileText, ArrowRight } from "lucide-react";
import {
  MOCK_VARIANT_RULES,
  MOCK_DUPLICATE_ATTRIBUTES,
  MOCK_ATTRIBUTE_ACTIVITIES,
} from "@/data/attributes.mock";
import { DuplicateAttributePair, VariantGenerationRule } from "@/types/attributeManagement";

interface AttributeLowerDashboardsProps {
  onCompareDuplicate: (pair: DuplicateAttributePair) => void;
  onMergeDuplicate: (pair: DuplicateAttributePair) => void;
  onIgnoreDuplicate: (pair: DuplicateAttributePair) => void;
  onEditVariantRule: (rule: VariantGenerationRule) => void;
}

/** Compact SVG circular progress ring */
const Ring: React.FC<{ pct: number; size?: number; stroke?: number; color?: string }> = ({
  pct,
  size = 52,
  stroke = 4,
  color = "#10b981",
}) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const AttributeLowerDashboards: React.FC<AttributeLowerDashboardsProps> = ({
  onCompareDuplicate,
  onEditVariantRule,
}) => {
  const scorecardMetrics = [
    { label: "Completeness", pct: 91, status: "Good", color: "#10b981" },
    { label: "Validation Accuracy", pct: 88, status: "Good", color: "#10b981" },
    { label: "Variant Readiness", pct: 86, status: "Good", color: "#10b981" },
    { label: "Category Coverage", pct: 89, status: "Good", color: "#10b981" },
    { label: "Channel Compliance", pct: 87, status: "Good", color: "#10b981" },
    { label: "Duplicate Control", pct: 95, status: "Excellent", color: "#059669" },
    { label: "Media Mapping", pct: 84, status: "Good", color: "#10b981" },
    { label: "Publication Readiness", pct: 87, status: "Good", color: "#10b981" },
  ];

  return (
    <div className="flex flex-col gap-4 min-w-0">

      {/* ── Row 1: Health Scorecard + Value Management ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Panel 1: Attribute Health Scorecard */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-[11.5px]">Attribute Health Scorecard</h3>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
              View full scorecard <ChevronRight size={10} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {scorecardMetrics.map((m, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 p-1.5 rounded bg-gray-50 border border-gray-100">
                <div className="relative flex items-center justify-center">
                  <Ring pct={m.pct} size={48} stroke={4} color={m.color} />
                  <span className="absolute text-[10px] font-black text-gray-900 rotate-90" style={{ transform: "rotate(90deg)" }}>
                    {m.pct}%
                  </span>
                </div>
                <span className="text-[9.5px] font-semibold text-gray-600 leading-tight text-center" style={{ maxWidth: "64px" }}>
                  {m.label}
                </span>
                <span className="text-[8.5px] font-bold text-emerald-700">{m.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Attribute Value Management */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-[11.5px]">Attribute Value Management</h3>
              <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
                View value quality report <ChevronRight size={10} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center mb-3 text-xs">
              <div className="p-2 rounded bg-gray-50 border border-gray-100">
                <span className="text-[9.5px] text-gray-500 block">Total Values</span>
                <span className="font-extrabold text-gray-900">12,840</span>
              </div>
              <div className="p-2 rounded bg-gray-50 border border-gray-100">
                <span className="text-[9.5px] text-gray-500 block">Missing Values</span>
                <span className="font-extrabold text-rose-600">248</span>
              </div>
              <div className="p-2 rounded bg-gray-50 border border-gray-100">
                <span className="text-[9.5px] text-gray-500 block">Norm. Issues</span>
                <span className="font-extrabold text-amber-600">36</span>
              </div>
              <div className="p-2 rounded bg-gray-50 border border-gray-100">
                <span className="text-[9.5px] text-gray-500 block">Orphan Values</span>
                <span className="font-extrabold text-gray-700">92</span>
              </div>
            </div>

            <span className="text-[10.5px] font-bold text-gray-700 block mb-1.5">Top Attributes by Missing Values</span>
            <div className="flex flex-col gap-1 text-[11px]">
              {[
                { name: "SPF Level", missing: 62, share: "25%" },
                { name: "Hair Concern", missing: 48, share: "19%" },
                { name: "Fragrance Type", missing: 36, share: "14%" },
                { name: "Shade Name", missing: 24, share: "10%" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-rose-600">{item.missing} missing</span>
                    <span className="text-gray-400 font-mono text-[10.5px]">{item.share}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Category Matrix + Variant Rules + Channel Readiness ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Panel 3: Category Attribute Template Matrix */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-[11.5px]">Category Attribute Template Matrix</h3>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
              View full matrix <ChevronRight size={10} />
            </button>
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 text-[9.5px] uppercase font-bold">
                <th className="py-1.5 px-1.5">Category</th>
                <th className="py-1.5 px-1.5 text-center">Req.</th>
                <th className="py-1.5 px-1.5 text-right">Coverage</th>
                <th className="py-1.5 px-1.5 text-center">Conf.</th>
                <th className="py-1.5 px-1.5 text-center">Issues</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {[
                { cat: "Face Serum", req: 42, cov: "92%", comp: 38, issues: 4 },
                { cat: "Moisturizer", req: 45, cov: "80%", comp: 32, issues: 6 },
                { cat: "Lipstick", req: 38, cov: "95%", comp: 36, issues: 2 },
                { cat: "Shampoo", req: 41, cov: "85%", comp: 30, issues: 6 },
                { cat: "Sunscreen", req: 44, cov: "78%", comp: 28, issues: 10 },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 cursor-pointer">
                  <td className="py-1.5 px-1.5 font-semibold text-gray-900 text-[11px]">{row.cat}</td>
                  <td className="py-1.5 px-1.5 text-center font-mono text-[11px]">{row.req}</td>
                  <td className="py-1.5 px-1.5 text-right font-mono font-bold text-emerald-700 text-[11px]">{row.cov}</td>
                  <td className="py-1.5 px-1.5 text-center font-mono text-[11px]">{row.comp}</td>
                  <td className="py-1.5 px-1.5 text-center font-mono font-bold text-rose-600 text-[11px]">{row.issues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 4: Variant Generation Rules */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-[11.5px]">Variant Generation Rules</h3>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
              Manage variant rules <ChevronRight size={10} />
            </button>
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 text-[9.5px] uppercase font-bold">
                <th className="py-1.5 px-1.5">Rule Name</th>
                <th className="py-1.5 px-1.5">Condition</th>
                <th className="py-1.5 px-1.5">Result</th>
                <th className="py-1.5 px-1.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {MOCK_VARIANT_RULES.map((rule) => (
                <tr key={rule.id} onClick={() => onEditVariantRule(rule)} className="hover:bg-gray-50 cursor-pointer">
                  <td className="py-1.5 px-1.5 font-semibold text-gray-900 text-[11px] whitespace-nowrap">{rule.ruleName}</td>
                  <td className="py-1.5 px-1.5 font-mono text-[10px] text-gray-500 truncate max-w-[80px]">{rule.conditionText}</td>
                  <td className="py-1.5 px-1.5 text-gray-600 text-[11px]">{rule.resultType}</td>
                  <td className="py-1.5 px-1.5 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      rule.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {rule.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 5: Product Variant Readiness by Channel */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-[11.5px]">Product Variant Readiness by Channel</h3>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
              View readiness by channel <ChevronRight size={10} />
            </button>
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 text-[9.5px] uppercase font-bold">
                <th className="py-1.5 px-1.5">Channel</th>
                <th className="py-1.5 px-1.5 text-right">Ready</th>
                <th className="py-1.5 px-1.5 text-right">Partial</th>
                <th className="py-1.5 px-1.5 text-right">Not Ready</th>
                <th className="py-1.5 px-1.5 text-right">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {[
                { channel: "Online Marketplace", ready: "8,420", partial: "1,020", notReady: "240", pct: "81%" },
                { channel: "Mobile App", ready: "7,861", partial: "921", notReady: "180", pct: "83%" },
                { channel: "B2B Wholesale", ready: "6,442", partial: "810", notReady: "148", pct: "79%" },
                { channel: "Partner Storefront", ready: "5,166", partial: "640", notReady: "122", pct: "80%" },
                { channel: "Social Commerce", ready: "4,321", partial: "512", notReady: "98", pct: "81%" },
              ].map((r, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-1.5 px-1.5 font-semibold text-gray-900 text-[10.5px] whitespace-nowrap">{r.channel}</td>
                  <td className="py-1.5 px-1.5 text-right font-mono text-emerald-700 font-bold text-[11px]">{r.ready}</td>
                  <td className="py-1.5 px-1.5 text-right font-mono text-amber-600 text-[11px]">{r.partial}</td>
                  <td className="py-1.5 px-1.5 text-right font-mono text-rose-600 text-[11px]">{r.notReady}</td>
                  <td className="py-1.5 px-1.5 text-right font-mono font-bold text-gray-900 text-[11px]">{r.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Row 3: Validation Rules + Dependencies + Channel Requirements ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Panel 6: Attribute Validation Rules (donut) */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-[11.5px]">Attribute Validation Rules</h3>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
              View all validation rules <ChevronRight size={10} />
            </button>
          </div>
          <div className="flex items-center justify-around py-1">
            {/* Donut */}
            <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
              <svg width={80} height={80} className="transform -rotate-90">
                <circle cx={40} cy={40} r={33} fill="none" stroke="#f3f4f6" strokeWidth={7} />
                <circle cx={40} cy={40} r={33} fill="none" stroke="#10b981" strokeWidth={7}
                  strokeDasharray={`${2 * Math.PI * 33}`}
                  strokeDashoffset={`${2 * Math.PI * 33 * (1 - 0.82)}`}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-sm font-black text-gray-900 rotate-90" style={{ transform: "rotate(90deg) translateX(-2px)" }}>368</span>
                <span className="text-[8px] text-gray-400 font-semibold" style={{ transform: "rotate(90deg) translateX(-2px)", marginTop: 2 }}>Rules</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 text-[10.5px]">
              {[
                { label: "Active", count: "302", pct: "82%", color: "bg-emerald-500" },
                { label: "Draft", count: "32", pct: "9%", color: "bg-amber-500" },
                { label: "Pending Review", count: "16", pct: "5%", color: "bg-sky-500" },
                { label: "Inactive", count: "16", pct: "4%", color: "bg-rose-500" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${s.color}`} />
                  <span className="text-gray-600">{s.label}</span>
                  <span className="font-bold text-gray-900 ml-auto">{s.count} ({s.pct})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 7: Attribute Dependencies & Inheritance */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-[11.5px]">Attribute Dependencies & Inheritance</h3>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
              View dependency map <ChevronRight size={10} />
            </button>
          </div>
          <div className="p-3 bg-gray-50 rounded border border-gray-200 flex items-center justify-around min-h-[90px]">
            <div className="flex flex-col gap-1.5 text-center text-[10px]">
              <span className="px-2 py-1 rounded bg-white border border-gray-300 font-bold text-gray-700 shadow-2xs">Undertone</span>
              <span className="px-2 py-1 rounded bg-white border border-gray-300 font-bold text-gray-700 shadow-2xs">Skin Type</span>
              <span className="px-2 py-1 rounded bg-white border border-gray-300 font-bold text-gray-700 shadow-2xs">Finish Type</span>
            </div>
            <ArrowRight size={16} className="text-gray-400 shrink-0 mx-1" />
            <div className="px-3 py-2 rounded bg-[#741d35] text-white font-extrabold text-xs shadow-xs text-center whitespace-nowrap">
              Shade Name
            </div>
          </div>
          <div className="flex justify-between text-[10.5px] text-gray-500 mt-2">
            <span>Total Dependencies: <strong className="text-gray-900">46</strong></span>
            <span>Inherited from Templates: <strong className="text-gray-900">38</strong></span>
          </div>
        </div>

        {/* Panel 8: Channel Attribute Requirements */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-[11.5px]">Channel Attribute Requirements</h3>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
              View full requirements <ChevronRight size={10} />
            </button>
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 text-[9.5px] uppercase font-bold">
                <th className="py-1.5 px-1.5">Channel</th>
                <th className="py-1.5 px-1.5 text-center">Req.</th>
                <th className="py-1.5 px-1.5 text-center">Opt.</th>
                <th className="py-1.5 px-1.5 text-right">Comp.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {[
                { ch: "Online Marketplace", req: 842, opt: 312, comp: "91%" },
                { ch: "Mobile App", req: 812, opt: 298, comp: "90%" },
                { ch: "B2B Wholesale", req: 768, opt: 280, comp: "88%" },
                { ch: "Partner Storefront", req: 736, opt: 260, comp: "89%" },
                { ch: "Social Commerce", req: 654, opt: 224, comp: "87%" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-1.5 px-1.5 font-semibold text-gray-900 text-[10.5px] whitespace-nowrap">{item.ch}</td>
                  <td className="py-1.5 px-1.5 text-center font-mono text-[11px]">{item.req}</td>
                  <td className="py-1.5 px-1.5 text-center font-mono text-[11px]">{item.opt}</td>
                  <td className="py-1.5 px-1.5 text-right font-mono font-bold text-emerald-700 text-[11px]">{item.comp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Row 4: Quality Issues + Duplicate Candidates ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Panel 9: Attribute Quality & Variant Issues */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-[11.5px]">Attribute Quality & Variant Issues</h3>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
              View all quality issues <ChevronRight size={10} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { name: "Missing Required Values", count: 248, risk: "High", color: "rose" },
              { name: "Invalid Format / Values", count: 86, risk: "Medium", color: "amber" },
              { name: "Normalization Issues", count: 36, risk: "Medium", color: "amber" },
              { name: "Orphan / Unused Values", count: 92, risk: "Low", color: "gray" },
              { name: "Inconsistent Mappings", count: 28, risk: "Low", color: "gray" },
            ].map((iss, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-100 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    size={12}
                    className={iss.color === "rose" ? "text-rose-500" : iss.color === "amber" ? "text-amber-500" : "text-gray-400"}
                  />
                  <span className="text-xs font-semibold text-gray-800">{iss.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-gray-900 text-xs">{iss.count}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    iss.color === "rose"
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : iss.color === "amber"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}>
                    {iss.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 10: Duplicate Attribute Candidates */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-[11.5px]">Duplicate Attribute Candidates</h3>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
              Review duplicates <ChevronRight size={10} />
            </button>
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 text-[9.5px] uppercase font-bold">
                <th className="py-1.5 px-2">Attribute Name</th>
                <th className="py-1.5 px-2 text-center">Duplicates</th>
                <th className="py-1.5 px-2 text-right">Similarity</th>
                <th className="py-1.5 px-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {MOCK_DUPLICATE_ATTRIBUTES.map((pair) => (
                <tr key={pair.id} className="hover:bg-gray-50">
                  <td className="py-1.5 px-2 font-bold text-gray-900 text-[11px]">{pair.attributeName}</td>
                  <td className="py-1.5 px-2 text-center font-mono text-[11px]">{pair.potentialDuplicatesCount}</td>
                  <td className="py-1.5 px-2 text-right font-mono font-bold text-amber-600 text-[11px]">{pair.similarityPercent}%</td>
                  <td className="py-1.5 px-2 text-center">
                    <button
                      onClick={() => onCompareDuplicate(pair)}
                      className="px-2 py-0.5 rounded border border-gray-300 text-[9.5px] font-bold text-gray-700 hover:bg-gray-100"
                    >
                      Compare
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Row 5: Recent Activity (full width) ── */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-[11.5px]">Recent Attribute & Variant Activity</h3>
          <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
            View full activity log <ChevronRight size={10} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 text-[9.5px] uppercase font-bold">
                <th className="py-2 px-2.5">Activity</th>
                <th className="py-2 px-2.5">Entity Type</th>
                <th className="py-2 px-2.5">Entity</th>
                <th className="py-2 px-2.5">Action By</th>
                <th className="py-2 px-2.5">Date & Time</th>
                <th className="py-2 px-2.5">Details</th>
                <th className="py-2 px-2.5 text-center">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {MOCK_ATTRIBUTE_ACTIVITIES.map((act) => (
                <tr key={act.id} className="hover:bg-gray-50">
                  <td className="py-2 px-2.5 font-bold text-gray-900 whitespace-nowrap text-[11px]">{act.activity}</td>
                  <td className="py-2 px-2.5 text-gray-500 font-medium text-[11px]">{act.entityType}</td>
                  <td className="py-2 px-2.5 font-semibold text-gray-800 whitespace-nowrap text-[11px]">{act.entityName}</td>
                  <td className="py-2 px-2.5 text-gray-700 text-[11px]">{act.actionBy}</td>
                  <td className="py-2 px-2.5 text-gray-500 font-mono text-[10px] whitespace-nowrap">{act.dateTime}</td>
                  <td className="py-2 px-2.5 text-gray-600 max-w-xs truncate text-[11px]" title={act.details}>
                    {act.details}
                  </td>
                  <td className="py-2 px-2.5 text-center">
                    <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {act.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
