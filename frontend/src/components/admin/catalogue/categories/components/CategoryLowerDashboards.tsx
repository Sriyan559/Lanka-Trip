"use client";

import React from "react";
import { CheckCircle2, ChevronRight, AlertTriangle, ExternalLink } from "lucide-react";
import {
  MOCK_ATTRIBUTE_COVERAGE,
  MOCK_PRODUCT_COVERAGE_LEVELS,
  MOCK_CHANNEL_ELIGIBILITY_MATRIX,
  MOCK_DUPLICATE_CANDIDATES,
  MOCK_UNCATEGORIZED_SUMMARY,
  MOCK_RECENT_CATEGORY_ACTIVITIES,
  MOCK_COMPLIANCE_RULES,
  MOCK_AUDIT_EVENTS,
} from "@/data/categories.mock";
import { DuplicateCategoryPair } from "@/types/categoryManagement";

interface CategoryLowerDashboardsProps {
  onCompareDuplicate: (pair: DuplicateCategoryPair) => void;
  onMergeDuplicate: (pair: DuplicateCategoryPair) => void;
  onIgnoreDuplicate: (pair: DuplicateCategoryPair) => void;
}

export const CategoryLowerDashboards: React.FC<CategoryLowerDashboardsProps> = ({
  onCompareDuplicate,
  onMergeDuplicate,
  onIgnoreDuplicate,
}) => {
  return (
    <div className="flex flex-col gap-5 mt-2 text-xs min-w-0">
      {/* Row 1: Health Scorecard, Attr Coverage, Product Coverage, Channel Eligibility Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* 1. Category Health Scorecard */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-xs">Category Health Scorecard</h3>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Hierarchy Integrity", val: 92 },
                { label: "Attribute Completeness", val: 86 },
                { label: "Product Mapping Quality", val: 80 },
                { label: "Channel Eligibility", val: 90 },
                { label: "Compliance Readiness", val: 84 },
                { label: "SEO Readiness", val: 82 },
                { label: "Publication Readiness", val: 78 },
                { label: "Audit Compliance", val: 90 },
              ].map((item, idx) => {
                const clampedVal = Math.min(100, Math.max(0, item.val));
                return (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-700 font-medium truncate pr-2" title={item.label}>
                        {item.label}
                      </span>
                      <span className="font-bold text-gray-900 w-10 text-right shrink-0">{clampedVal}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${clampedVal}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View detailed scorecard &gt;
          </button>
        </div>

        {/* 2. Required Attribute Coverage */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-0.5">Required Attribute Coverage</h3>
            <span className="text-[10.5px] text-gray-400 font-semibold block mb-3">Top Categories</span>
            <div className="flex flex-col gap-2.5">
              {MOCK_ATTRIBUTE_COVERAGE.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-0.5">
                  <span className="font-semibold text-gray-800 text-[11.5px] truncate max-w-[120px]" title={item.categoryName}>
                    {item.categoryName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-right w-10">{item.coveragePercent}%</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold text-center w-20 ${
                        item.statusText === "Excellent"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : item.statusText === "Good"
                          ? "bg-sky-50 text-sky-700 border border-sky-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {item.statusText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View all attribute coverage &gt;
          </button>
        </div>

        {/* 3. Category Product Coverage */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-0.5">Category Product Coverage</h3>
            <span className="text-[10.5px] text-gray-400 font-semibold block mb-2">By Category Level</span>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9.5px]">
                    <th className="py-1.5 px-1 align-middle w-12">Level</th>
                    <th className="py-1.5 px-1 text-center align-middle">Categories</th>
                    <th className="py-1.5 px-1 text-right align-middle">Active</th>
                    <th className="py-1.5 px-1 text-right align-middle">Avg / Cat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {MOCK_PRODUCT_COVERAGE_LEVELS.map((lvl) => (
                    <tr key={lvl.level} className="h-9">
                      <td className="py-1.5 px-1 font-bold text-gray-800 align-middle">{lvl.level}</td>
                      <td className="py-1.5 px-1 text-center text-gray-700 align-middle">{lvl.categoriesCount}</td>
                      <td className="py-1.5 px-1 text-right font-mono text-gray-900 align-middle">{lvl.activeProductsCount.toLocaleString()}</td>
                      <td className="py-1.5 px-1 text-right font-mono text-gray-700 align-middle">{lvl.avgPerCategory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View full coverage report &gt;
          </button>
        </div>

        {/* 4. Channel Eligibility Matrix */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-0.5">Channel Eligibility Matrix</h3>
            <span className="text-[10.5px] text-gray-400 font-semibold block mb-2">Channels Breakdown</span>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9.5px]">
                    <th className="py-1.5 px-1 align-middle min-w-[130px]">Channels</th>
                    <th className="py-1.5 px-1 text-center align-middle w-14">Eligible</th>
                    <th className="py-1.5 px-1 text-center align-middle w-14">Partial</th>
                    <th className="py-1.5 px-1 text-center align-middle w-16">Blocked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {MOCK_CHANNEL_ELIGIBILITY_MATRIX.map((ch, idx) => (
                    <tr key={idx} className="h-9">
                      <td className="py-1.5 px-1 font-semibold text-gray-800 align-middle whitespace-nowrap" title={ch.channel}>
                        {ch.channel}
                      </td>
                      <td className="py-1.5 px-1 text-center font-bold text-emerald-700 align-middle">{ch.eligibleCount}</td>
                      <td className="py-1.5 px-1 text-center font-bold text-amber-700 align-middle">{ch.partialCount}</td>
                      <td className="py-1.5 px-1 text-center font-bold text-rose-600 align-middle">{ch.notEligibleCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View full matrix &gt;
          </button>
        </div>
      </div>

      {/* Row 2: Duplicate Candidates, Uncategorized Products Queue, SEO Readiness, Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* 5. Duplicate Category Candidates */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Duplicate Category Candidates</h3>
            <div className="flex flex-col gap-2">
              {MOCK_DUPLICATE_CANDIDATES.map((pair) => (
                <div key={pair.id} className="p-2.5 rounded bg-gray-50 border border-gray-200 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-gray-900 truncate pr-2" title={`${pair.categoryA} / ${pair.categoryB}`}>
                      {pair.categoryA} / {pair.categoryB}
                    </span>
                    <span className="font-bold text-amber-700 shrink-0">{pair.similarityPercent}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span
                      className={`px-1.5 py-0.2 rounded font-extrabold ${
                        pair.risk === "High" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {pair.risk}
                    </span>
                    <span className="text-gray-500 font-mono">{pair.productsCount} products</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 shrink-0">
                    <button
                      onClick={() => onCompareDuplicate(pair)}
                      className="px-2.5 py-1 rounded border border-gray-300 bg-white text-[10.5px] font-bold text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors"
                    >
                      Compare
                    </button>
                    <button
                      onClick={() => onMergeDuplicate(pair)}
                      className="px-2.5 py-1 rounded border border-gray-300 bg-white text-[10.5px] font-bold text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors"
                    >
                      Merge
                    </button>
                    <button
                      onClick={() => onIgnoreDuplicate(pair)}
                      className="px-2.5 py-1 rounded border border-gray-300 bg-white text-[10.5px] font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View all duplicate candidates &gt;
          </button>
        </div>

        {/* 6. Uncategorized & Misclassified Products */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-0.5">Uncategorized & Misclassified Products</h3>
            <span className="text-[10.5px] text-gray-400 font-semibold block mb-3">Queue Summary</span>
            <div className="flex flex-col gap-2">
              <div className="p-2.5 rounded bg-rose-50/70 border border-rose-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-rose-900 block">Uncategorized Products</span>
                  <span className="text-xl font-black text-rose-700">{MOCK_UNCATEGORIZED_SUMMARY.uncategorizedProducts}</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-rose-200 text-rose-800">
                  ▲ High
                </span>
              </div>
              <div className="p-2.5 rounded bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-900 block">Misclassified Products</span>
                  <span className="text-xl font-black text-amber-700">{MOCK_UNCATEGORIZED_SUMMARY.misclassifiedProducts}</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-200 text-amber-800">
                  ▲ Medium
                </span>
              </div>
              <div className="p-2.5 rounded bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-800 block">Needs Reassignment</span>
                  <span className="text-xl font-black text-gray-900">{MOCK_UNCATEGORIZED_SUMMARY.needsReassignment}</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-gray-200 text-gray-700">
                  ▲ Medium
                </span>
              </div>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View full queue &gt;
          </button>
        </div>

        {/* 7. SEO & Merchandising Readiness */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-3">SEO & Merchandising Readiness</h3>
            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">SEO Ready</span>
                <span className="text-lg font-black text-emerald-700">118</span>
                <span className="text-[9.5px] font-extrabold text-emerald-600 block">▲ 80%</span>
              </div>
              <div className="p-2 rounded bg-amber-50 border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">Partial</span>
                <span className="text-lg font-black text-amber-700">22</span>
                <span className="text-[9.5px] font-extrabold text-amber-600 block">▲ 15%</span>
              </div>
              <div className="p-2 rounded bg-rose-50 border border-rose-200">
                <span className="text-[10px] font-bold text-rose-800 uppercase block">Not Ready</span>
                <span className="text-lg font-black text-rose-700">8</span>
                <span className="text-[9.5px] font-extrabold text-rose-600 block">▼ 5%</span>
              </div>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View SEO recommendations &gt;
          </button>
        </div>

        {/* 8. Recent Category Activity */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Recent Category Activity</h3>
            <div className="flex flex-col divide-y divide-gray-100">
              {MOCK_RECENT_CATEGORY_ACTIVITIES.map((act) => (
                <div key={act.id} className="py-2 flex flex-col gap-0.5 text-[11px]">
                  <div className="flex items-center justify-between font-bold text-gray-900">
                    <span className="truncate pr-2" title={act.action}>{act.action}</span>
                    <span className="text-emerald-700 text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                      {act.result}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500 text-[10.5px]">
                    <span className="truncate pr-2">{act.categoryName} • {act.user}</span>
                    <span className="shrink-0 font-mono text-[10px] text-gray-400">{act.dateTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View full activity log &gt;
          </button>
        </div>
      </div>

      {/* Row 3: Category Compliance Rule Matrix, Governance Summary & Recent Audit Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {/* 9. Category Compliance Rule Matrix */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Category Compliance Rule Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9.5px]">
                    <th className="py-1.5 px-1 align-middle min-w-[150px]">Rule</th>
                    <th className="py-1.5 px-1 text-center align-middle w-14">Affected</th>
                    <th className="py-1.5 px-1 text-center align-middle w-16">Severity</th>
                    <th className="py-1.5 px-1 text-center align-middle w-14">Status</th>
                    <th className="py-1.5 px-1 text-right align-middle w-20">Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {MOCK_COMPLIANCE_RULES.map((rule) => (
                    <tr key={rule.id} className="h-9">
                      <td className="py-1.5 px-1 font-semibold text-gray-800 align-middle whitespace-nowrap" title={rule.ruleName}>
                        {rule.ruleName}
                      </td>
                      <td className="py-1.5 px-1 text-center font-bold text-gray-700 align-middle">{rule.affectedCategoriesCount}</td>
                      <td className="py-1.5 px-1 text-center align-middle">
                        <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${
                          rule.severity === "High" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {rule.severity}
                        </span>
                      </td>
                      <td className="py-1.5 px-1 text-center align-middle">
                        <span className="font-bold text-emerald-700">{rule.status}</span>
                      </td>
                      <td className="py-1.5 px-1 text-right font-mono font-bold text-gray-900 align-middle">{rule.complianceRatePercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View all compliance rules &gt;
          </button>
        </div>

        {/* 10. Mapping / Taxonomy Governance Summary */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Mapping / Taxonomy Governance Summary</h3>
            <div className="grid grid-cols-4 gap-2 text-center mb-3">
              <div className="p-1.5 rounded bg-gray-50 border border-gray-200">
                <span className="text-[9.5px] font-bold text-gray-500 uppercase block truncate">Total Rules</span>
                <span className="text-base font-black text-gray-900">186</span>
                <span className="text-[9px] text-emerald-600 font-bold">Active</span>
              </div>
              <div className="p-1.5 rounded bg-gray-50 border border-gray-200">
                <span className="text-[9.5px] font-bold text-gray-500 uppercase block truncate">Orphans</span>
                <span className="text-base font-black text-gray-900">8</span>
                <span className="text-[9px] text-amber-600 font-bold">Review</span>
              </div>
              <div className="p-1.5 rounded bg-gray-50 border border-gray-200">
                <span className="text-[9.5px] font-bold text-gray-500 uppercase block truncate">Broken</span>
                <span className="text-base font-black text-gray-900">6</span>
                <span className="text-[9px] text-rose-600 font-bold">High</span>
              </div>
              <div className="p-1.5 rounded bg-gray-50 border border-gray-200">
                <span className="text-[9.5px] font-bold text-gray-500 uppercase block truncate">Coverage</span>
                <span className="text-base font-black text-emerald-700">91%</span>
              </div>
            </div>

            {/* Sparkline chart SVG */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Mapping Quality Trend (Last 30 Days)</span>
              <svg className="w-full h-12 stroke-[#741d35] fill-none stroke-2" viewBox="0 0 300 50">
                <polyline points="0,40 50,30 100,35 150,20 200,25 250,15 300,10" />
              </svg>
              <div className="flex justify-between text-[9px] text-gray-400 mt-1">
                <span>Jul 6</span>
                <span>Jul 13</span>
                <span>Jul 20</span>
                <span>Jul 27</span>
                <span>Aug 3</span>
              </div>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View governance dashboard &gt;
          </button>
        </div>

        {/* 11. Recent Approvals & Audit Events */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Recent Approvals & Audit Events</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9.5px]">
                    <th className="py-1.5 px-1 align-middle min-w-[110px]">Event</th>
                    <th className="py-1.5 px-1 align-middle min-w-[90px]">Category</th>
                    <th className="py-1.5 px-1 align-middle min-w-[90px]">Reviewer</th>
                    <th className="py-1.5 px-1 text-right align-middle w-16">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {MOCK_AUDIT_EVENTS.map((aud) => (
                    <tr key={aud.id} className="h-9">
                      <td className="py-1.5 px-1 font-semibold text-gray-800 align-middle whitespace-nowrap" title={aud.event}>
                        {aud.event}
                      </td>
                      <td className="py-1.5 px-1 text-gray-700 align-middle whitespace-nowrap">{aud.categoryName}</td>
                      <td className="py-1.5 px-1 text-gray-500 text-[10.5px] align-middle whitespace-nowrap">{aud.reviewer}</td>
                      <td className="py-1.5 px-1 text-right font-bold text-emerald-700 align-middle whitespace-nowrap">{aud.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View full audit trail &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
