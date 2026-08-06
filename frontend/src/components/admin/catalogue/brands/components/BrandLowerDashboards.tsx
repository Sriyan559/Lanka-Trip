"use client";

import React from "react";
import {
  MOCK_DUPLICATE_BRAND_PAIRS,
  MOCK_UNAUTHORIZED_INCIDENTS,
  MOCK_PRIORITY_AUTHORIZATIONS,
  MOCK_SUPPLIER_RELATIONSHIPS,
  MOCK_BRAND_ACTIVITIES,
  MOCK_BRAND_AUDIT_EVENTS,
} from "@/data/brands.mock";
import { DuplicateBrandPair, UnauthorizedBrandIncident, PriorityAuthorizationItem } from "@/types/brandManagement";

interface BrandLowerDashboardsProps {
  onCompareDuplicate: (pair: DuplicateBrandPair) => void;
  onMergeDuplicate: (pair: DuplicateBrandPair) => void;
  onIgnoreDuplicate: (pair: DuplicateBrandPair) => void;
  onSelectIncident: (inc: UnauthorizedBrandIncident) => void;
  onSelectAuthorization: (auth: PriorityAuthorizationItem) => void;
}

export const BrandLowerDashboards: React.FC<BrandLowerDashboardsProps> = ({
  onCompareDuplicate,
  onMergeDuplicate,
  onIgnoreDuplicate,
  onSelectIncident,
  onSelectAuthorization,
}) => {
  return (
    <div className="flex flex-col gap-5 mt-2 text-xs min-w-0">
      {/* Row 1: Health Scorecard, Product Coverage, Readiness Donut, Priority Auth Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* 1. Brand Health Scorecard */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-3">Brand Health Scorecard</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Verification Coverage", val: 92 },
                { label: "Authorization Readiness", val: 78 },
                { label: "Supplier Mapping", val: 85 },
                { label: "Compliance Readiness", val: 88 },
                { label: "Product Coverage", val: 82 },
                { label: "Channel Readiness", val: 90 },
                { label: "Media / SEO Readiness", val: 74 },
                { label: "Duplicate Control", val: 89 },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-700 font-medium truncate pr-2" title={item.label}>
                      {item.label}
                    </span>
                    <span className="font-bold text-gray-900 w-10 text-right shrink-0">{item.val}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.val >= 85 ? "bg-emerald-500" : item.val >= 75 ? "bg-sky-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View detailed scorecard &gt;
          </button>
        </div>

        {/* 2. Product Coverage by Brand */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Product Coverage by Brand</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9.5px]">
                    <th className="py-1.5 px-1 align-middle min-w-[100px]">Brand</th>
                    <th className="py-1.5 px-1 text-right align-middle w-16">Active</th>
                    <th className="py-1.5 px-1 text-right align-middle min-w-[80px]">Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {[
                    { brand: "Estée Lauder", count: 428, pct: 92 },
                    { brand: "Chanel Beauty", count: 320, pct: 95 },
                    { brand: "Shiseido", count: 210, pct: 85 },
                    { brand: "Innisfree", count: 156, pct: 64 },
                    { brand: "Tokyo Beauty", count: 84, pct: 70 },
                  ].map((row, idx) => (
                    <tr key={idx} className="h-9">
                      <td className="py-1.5 px-1 font-bold text-gray-800 align-middle truncate" title={row.brand}>
                        {row.brand}
                      </td>
                      <td className="py-1.5 px-1 text-right font-mono font-semibold text-gray-900 align-middle">
                        {row.count}
                      </td>
                      <td className="py-1.5 px-1 text-right align-middle">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="font-bold text-[10.5px] font-mono shrink-0">{row.pct}%</span>
                          <div className="w-12 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${row.pct}%` }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View full report &gt;
          </button>
        </div>

        {/* 3. Brand Readiness Distribution Donut */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-3">Brand Readiness Distribution</h3>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-emerald-500" strokeWidth="4" strokeDasharray="84.8, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-amber-500" strokeWidth="4" strokeDasharray="4.9, 100" strokeDashoffset="-84.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-rose-500" strokeWidth="4" strokeDasharray="3.7, 100" strokeDashoffset="-89.7" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black text-gray-900 leading-tight">486</span>
                  <span className="text-[8.5px] font-bold text-gray-400">Total</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-[10.5px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-gray-600">Verified:</span>
                  <span className="font-bold text-gray-900">412 (84.8%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-gray-600">Pending:</span>
                  <span className="font-bold text-gray-900">24 (4.9%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-gray-600">Conditional:</span>
                  <span className="font-bold text-gray-900">18 (3.7%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-gray-600">Expiring:</span>
                  <span className="font-bold text-gray-900">18 (3.7%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-gray-600">Unauthorized:</span>
                  <span className="font-bold text-gray-900">9 (1.8%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-gray-600">Expired:</span>
                  <span className="font-bold text-gray-900">6 (1.2%)</span>
                </div>
              </div>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View details &gt;
          </button>
        </div>

        {/* 4. Priority Authorization Operations */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Priority Authorization Operations</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9.5px]">
                    <th className="py-1.5 px-1 align-middle min-w-[90px]">Brand</th>
                    <th className="py-1.5 px-1 text-center align-middle w-20">Status</th>
                    <th className="py-1.5 px-1 text-center align-middle min-w-[80px]">Expires On</th>
                    <th className="py-1.5 px-1 text-right align-middle w-16">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {MOCK_PRIORITY_AUTHORIZATIONS.map((auth) => (
                    <tr
                      key={auth.id}
                      onClick={() => onSelectAuthorization(auth)}
                      className="h-9 hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-1.5 px-1 font-bold text-gray-800 align-middle truncate" title={auth.brandName}>
                        {auth.brandName}
                      </td>
                      <td className="py-1.5 px-1 text-center align-middle">
                        <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold ${
                          auth.status === "Expiring Soon" || auth.status === "Conditional"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : auth.status === "Expired"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-gray-50 text-gray-700 border border-gray-200"
                        }`}>
                          {auth.status}
                        </span>
                      </td>
                      <td className="py-1.5 px-1 text-center font-mono text-[10px] text-gray-600 align-middle whitespace-nowrap">
                        {auth.expiresOn}
                      </td>
                      <td className="py-1.5 px-1 text-right align-middle">
                        <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold ${
                          auth.priority === "High" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {auth.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View full queue &gt;
          </button>
        </div>
      </div>

      {/* Row 2: Brand Supplier Relationship, Eligibility by Channel, Unauthorized Brand Use, Duplicate Brand Candidates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* 5. Brand & Supplier Relationship Matrix */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Brand & Supplier Relationship Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9.5px]">
                    <th className="py-1.5 px-1 align-middle min-w-[110px]">Supplier</th>
                    <th className="py-1.5 px-1 text-center align-middle w-12">Total</th>
                    <th className="py-1.5 px-1 text-center align-middle w-12">Active</th>
                    <th className="py-1.5 px-1 text-center align-middle w-12">At Risk</th>
                    <th className="py-1.5 px-1 text-right align-middle w-14">Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {MOCK_SUPPLIER_RELATIONSHIPS.map((sup) => (
                    <tr key={sup.id} className="h-9">
                      <td className="py-1.5 px-1 font-semibold text-gray-800 align-middle truncate" title={sup.supplierName}>
                        {sup.supplierName}
                      </td>
                      <td className="py-1.5 px-1 text-center font-bold text-gray-700 align-middle">{sup.totalBrands}</td>
                      <td className="py-1.5 px-1 text-center font-bold text-emerald-700 align-middle">{sup.activeBrands}</td>
                      <td className={`py-1.5 px-1 text-center font-bold align-middle ${sup.atRiskBrands > 0 ? "text-rose-600" : "text-gray-400"}`}>
                        {sup.atRiskBrands}
                      </td>
                      <td className="py-1.5 px-1 text-right font-mono font-bold text-gray-900 align-middle">{sup.coveragePercent}%</td>
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

        {/* 6. Brand Eligibility by Channel */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Brand Eligibility by Channel</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9.5px]">
                    <th className="py-1.5 px-1 align-middle min-w-[120px]">Channel</th>
                    <th className="py-1.5 px-1 text-center align-middle w-12">Eligible</th>
                    <th className="py-1.5 px-1 text-center align-middle w-12">Partial</th>
                    <th className="py-1.5 px-1 text-center align-middle w-14">Blocked</th>
                    <th className="py-1.5 px-1 text-right align-middle w-14">Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {[
                    { channel: "Online Marketplace", e: 438, p: 18, n: 30, c: "91%" },
                    { channel: "Mobile App", e: 412, p: 24, n: 50, c: "84%" },
                    { channel: "B2B Wholesale Portal", e: 366, p: 32, n: 88, c: "74%" },
                    { channel: "Partner Storefront", e: 342, p: 36, n: 88, c: "75%" },
                    { channel: "Social Commerce", e: 340, p: 28, n: 118, c: "69%" },
                  ].map((row, idx) => (
                    <tr key={idx} className="h-9">
                      <td className="py-1.5 px-1 font-semibold text-gray-800 align-middle truncate" title={row.channel}>
                        {row.channel}
                      </td>
                      <td className="py-1.5 px-1 text-center font-bold text-emerald-700 align-middle">{row.e}</td>
                      <td className="py-1.5 px-1 text-center font-bold text-amber-700 align-middle">{row.p}</td>
                      <td className="py-1.5 px-1 text-center font-bold text-rose-600 align-middle">{row.n}</td>
                      <td className="py-1.5 px-1 text-right font-mono font-bold text-gray-900 align-middle">{row.c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View full report &gt;
          </button>
        </div>

        {/* 7. Unauthorized Brand Use */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Unauthorized Brand Use</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9.5px]">
                    <th className="py-1.5 px-1 align-middle min-w-[90px]">Incident</th>
                    <th className="py-1.5 px-1 align-middle min-w-[80px]">Brand</th>
                    <th className="py-1.5 px-1 align-middle min-w-[90px]">Channel</th>
                    <th className="py-1.5 px-1 text-right align-middle w-12">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {MOCK_UNAUTHORIZED_INCIDENTS.map((inc) => (
                    <tr
                      key={inc.id}
                      onClick={() => onSelectIncident(inc)}
                      className="h-9 hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-1.5 px-1 font-mono text-[10px] text-gray-600 align-middle whitespace-nowrap">
                        {inc.incidentId}
                      </td>
                      <td className="py-1.5 px-1 font-bold text-gray-800 align-middle truncate" title={inc.brandName}>
                        {inc.brandName}
                      </td>
                      <td className="py-1.5 px-1 text-gray-600 align-middle truncate" title={inc.channel}>
                        {inc.channel}
                      </td>
                      <td className="py-1.5 px-1 text-right align-middle">
                        <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold ${
                          inc.risk === "High" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {inc.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View all incidents &gt;
          </button>
        </div>

        {/* 8. Duplicate Brand Candidates */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Duplicate Brand Candidates</h3>
            <div className="flex flex-col gap-2">
              {MOCK_DUPLICATE_BRAND_PAIRS.map((pair) => (
                <div key={pair.id} className="p-2 rounded bg-gray-50 border border-gray-200 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-gray-900 truncate pr-1" title={`${pair.brandA} / ${pair.brandB}`}>
                      {pair.brandA} / {pair.brandB}
                    </span>
                    <span className="font-bold text-amber-700 shrink-0">{pair.similarityPercent}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className={`px-1.5 py-0.2 rounded font-extrabold ${
                      pair.risk === "High" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {pair.risk}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onCompareDuplicate(pair)}
                        className="px-2 py-0.5 rounded border border-gray-300 bg-white font-bold text-gray-700 hover:bg-gray-100"
                      >
                        Compare
                      </button>
                      <button
                        onClick={() => onMergeDuplicate(pair)}
                        className="px-2 py-0.5 rounded border border-gray-300 bg-white font-bold text-gray-700 hover:bg-gray-100"
                      >
                        Merge
                      </button>
                      <button
                        onClick={() => onIgnoreDuplicate(pair)}
                        className="px-2 py-0.5 rounded border border-gray-300 bg-white font-bold text-gray-500 hover:bg-gray-100"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View all candidates &gt;
          </button>
        </div>
      </div>

      {/* Row 3: Compliance & Authenticity, Media & SEO Readiness, Recent Activity, Audit Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* 9. Brand Compliance & Authenticity */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-3">Brand Compliance & Authenticity</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "KYC Verification Rate", val: 94 },
                { label: "Certificate Validity", val: 92 },
                { label: "Authenticity Coverage", val: 90 },
                { label: "Regulatory Compliance", val: 87 },
                { label: "Restricted Ingredient Check", val: 86 },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-700 font-medium truncate pr-2" title={item.label}>
                      {item.label}
                    </span>
                    <span className="font-bold text-gray-900 w-10 text-right shrink-0">{item.val}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View compliance report &gt;
          </button>
        </div>

        {/* 10. Brand Media & SEO Readiness */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-3">Brand Media & SEO Readiness</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Image Completeness", val: 84 },
                { label: "Video Availability", val: 84 },
                { label: "SEO Metadata Coverage", val: 74 },
                { label: "Content Quality Score", val: 78 },
                { label: "Rich Media Score", val: 69 },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-700 font-medium truncate pr-2" title={item.label}>
                      {item.label}
                    </span>
                    <span className="font-bold text-gray-900 w-10 text-right shrink-0">{item.val}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.val >= 80 ? "bg-emerald-500" : "bg-sky-500"}`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View media report &gt;
          </button>
        </div>

        {/* 11. Recent Brand Activity */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Recent Brand Activity</h3>
            <div className="flex flex-col divide-y divide-gray-100">
              {MOCK_BRAND_ACTIVITIES.map((act) => (
                <div key={act.id} className="py-1.5 flex flex-col gap-0.5 text-[11px]">
                  <div className="flex items-center justify-between font-bold text-gray-900">
                    <span className="truncate pr-2" title={act.activity}>{act.activity}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded border shrink-0 font-bold ${
                      act.result === "Success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>
                      {act.result}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500 text-[10.5px]">
                    <span className="truncate pr-2">{act.brandName} • {act.actionBy}</span>
                    <span className="shrink-0 font-mono text-[9.5px] text-gray-400">{act.dateTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
            View full activity log &gt;
          </button>
        </div>

        {/* 12. Recent Approvals & Audit Events */}
        <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">Recent Approvals & Audit Events</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9.5px]">
                    <th className="py-1.5 px-1 align-middle min-w-[110px]">Event</th>
                    <th className="py-1.5 px-1 align-middle min-w-[90px]">Brand</th>
                    <th className="py-1.5 px-1 align-middle min-w-[90px]">Reviewer</th>
                    <th className="py-1.5 px-1 text-right align-middle w-16">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {MOCK_BRAND_AUDIT_EVENTS.map((aud) => (
                    <tr key={aud.id} className="h-9">
                      <td className="py-1.5 px-1 font-semibold text-gray-800 align-middle whitespace-nowrap" title={aud.event}>
                        {aud.event}
                      </td>
                      <td className="py-1.5 px-1 text-gray-700 align-middle whitespace-nowrap">{aud.brandName}</td>
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
