"use client";

import React from "react";
import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";

export function RecentActivitySection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[13px] font-bold text-ink">Recent Catalogue Activity</h3>
          <button className="text-[11px] font-semibold text-[#8b2c45] hover:underline">View full activity log &rarr;</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-line bg-canvas/50">
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Action</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Product / Record</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Performed By</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Date & Time</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Result</th>
              </tr>
            </thead>
            <tbody>
              {[
                { action: "Product approved", record: "Radiance Vitamin C Serum", user: "Elena Vance", date: "04 Aug 2026, 11:24 AM", result: "Approved", rColor: "text-green-600" },
                { action: "Brand authorization updated", record: "Estée Lauder (AUTH-2023-0892)", user: "Marcus Lee", date: "04 Aug 2026, 10:45 AM", result: "Authorized", rColor: "text-green-600" },
                { action: "Duplicate candidates merged", record: "Tokyo Brightening Essence", user: "Priya Kapoor", date: "04 Aug 2026, 09:41 AM", result: "Merged", rColor: "text-blue-600" },
                { action: "Batch quarantined", record: "Luxe Skin Cream - Batch 128", user: "System", date: "04 Aug 2026, 08:30 AM", result: "Quarantined", rColor: "text-red-600" },
                { action: "Batch recall initiated", record: "Nourishing Glow Oil - Batch 07C", user: "Elena Vance", date: "04 Aug 2026, 06:45 AM", result: "Recall Initiated", rColor: "text-red-600" },
                { action: "Product published to Mobile App", record: "Luxe Silk Lipstick Ruby Red", user: "System", date: "03 Aug 2026, 05:22 PM", result: "Published", rColor: "text-emerald-600" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-line hover:bg-slate-50">
                  <td className="py-3 px-3 text-[11px] font-medium text-ink">{row.action}</td>
                  <td className="py-3 px-3 text-[11px] text-muted truncate max-w-[150px]">{row.record}</td>
                  <td className="py-3 px-3 text-[11px] text-muted">{row.user}</td>
                  <td className="py-3 px-3 text-[11px] text-muted whitespace-nowrap">{row.date}</td>
                  <td className={`py-3 px-3 text-[11px] font-semibold text-right ${row.rColor}`}>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Channel Publication Readiness</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-line bg-canvas/50">
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Channel</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Readiness</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Eligible</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Blocked</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Media Issues</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Priority Issues</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Policy Issues</th>
              </tr>
            </thead>
            <tbody>
              {[
                { channel: "Online Marketplace", score: 92, eligible: "8,940", blocked: "328", media: "96", priority: "48", policy: "40" },
                { channel: "Mobile App", score: 89, eligible: "8,210", blocked: "412", media: "112", priority: "96", policy: "56" },
                { channel: "B2B Wholesale Portal", score: 85, eligible: "7,320", blocked: "684", media: "156", priority: "120", policy: "68" },
                { channel: "Partner Storefront", score: 78, eligible: "6,150", blocked: "912", media: "184", priority: "128", policy: "80" },
                { channel: "Social Commerce", score: 72, eligible: "4,980", blocked: "1,256", media: "208", priority: "154", policy: "92" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-line hover:bg-slate-50">
                  <td className="py-3 px-3 text-[12px] font-medium text-ink">{row.channel}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${row.score >= 90 ? 'bg-green-500' : row.score >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${row.score}%` }} />
                      </div>
                      <span className="text-[11px] font-bold text-ink">{row.score}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[11px] font-semibold text-ink text-right">{row.eligible}</td>
                  <td className="py-3 px-3 text-[11px] font-medium text-muted text-right">{row.blocked}</td>
                  <td className="py-3 px-3 text-[11px] font-medium text-red-600 text-right">{row.media}</td>
                  <td className="py-3 px-3 text-[11px] font-medium text-red-600 text-right">{row.priority}</td>
                  <td className="py-3 px-3 text-[11px] font-medium text-amber-600 text-right">{row.policy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
