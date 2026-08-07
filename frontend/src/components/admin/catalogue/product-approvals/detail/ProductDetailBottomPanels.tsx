"use client";

import React from "react";
import { AlertTriangle, Clock, Activity, ShieldAlert, CheckCircle2 } from "lucide-react";
import { SharedProgressList } from "../../shared/SharedProgressList";

export function ProductDetailBottomPanels() {
  const SCORECARD_ROW_1 = [
    { label: "Identity Completeness", pct: 98, color: "bg-[#059669]" },
    { label: "Classification Quality", pct: 94, color: "bg-[#059669]" },
    { label: "Brand Verification", pct: 96, color: "bg-[#059669]" },
    { label: "Compliance Readiness", pct: 72, color: "bg-[#d97706]" },
  ];
  
  const SCORECARD_ROW_2 = [
    { label: "Variant Readiness", pct: 100, color: "bg-[#059669]" },
    { label: "Media Readiness", pct: 80, color: "bg-[#d97706]" },
    { label: "Inventory Linkage", pct: 90, color: "bg-[#059669]" },
    { label: "Publication Readiness", pct: 68, color: "bg-[#dc2626]" },
  ];

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Product Master Health Scorecard */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Product Master Health Scorecard</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
           <SharedProgressList items={SCORECARD_ROW_1} layout="vertical" hasCardWrapper={false} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           <SharedProgressList items={SCORECARD_ROW_2} layout="vertical" hasCardWrapper={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Product Blocking Issues */}
        <div className="bg-white border border-line rounded-xl p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert size={16} className="text-ink" />
            <h3 className="text-[13px] font-bold text-ink">Product Blocking Issues</h3>
            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto">3 Issues</span>
          </div>
          <div className="overflow-x-auto flex-1 scrollbar-thin">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[700px]">
              <thead>
                <tr>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Issue</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Area</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Severity</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Impact</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Owner</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Opened</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">SLA</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Recommended Action</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 pr-4 text-ink font-semibold">Missing safety evidence for 15% Vitamin C</td>
                  <td className="py-2.5 pr-4 text-muted">Compliance & Safety</td>
                  <td className="py-2.5 pr-4"><span className="text-red-600 font-bold">High</span></td>
                  <td className="py-2.5 pr-4 text-ink">Blocks Approval</td>
                  <td className="py-2.5 pr-4 text-ink">Elena Vance</td>
                  <td className="py-2.5 pr-4 text-muted">Apr 30, 2026</td>
                  <td className="py-2.5 pr-4 text-red-600 font-bold">18h</td>
                  <td className="py-2.5 pr-4 text-ink">Upload safety assessment report</td>
                  <td className="py-2.5 text-right"><button className="text-[10px] font-bold text-[#741d35] hover:underline">Review</button></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 pr-4 text-ink font-semibold">Unsupported anti-aging claim on packaging</td>
                  <td className="py-2.5 pr-4 text-muted">Ingredients & Safety</td>
                  <td className="py-2.5 pr-4"><span className="text-red-600 font-bold">High</span></td>
                  <td className="py-2.5 pr-4 text-ink">Blocks Approval</td>
                  <td className="py-2.5 pr-4 text-ink">Marcus Lee</td>
                  <td className="py-2.5 pr-4 text-muted">May 01, 2026</td>
                  <td className="py-2.5 pr-4 text-amber-600 font-bold">1d 4h</td>
                  <td className="py-2.5 pr-4 text-ink">Provide clinical study or remove claim</td>
                  <td className="py-2.5 text-right"><button className="text-[10px] font-bold text-[#741d35] hover:underline">Upload</button></td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-ink font-semibold">Back packaging image missing</td>
                  <td className="py-2.5 pr-4 text-muted">Images & Media</td>
                  <td className="py-2.5 pr-4"><span className="text-amber-500 font-bold">Medium</span></td>
                  <td className="py-2.5 pr-4 text-ink">Blocks Approval</td>
                  <td className="py-2.5 pr-4 text-ink">Priya Kapoor</td>
                  <td className="py-2.5 pr-4 text-muted">May 01, 2026</td>
                  <td className="py-2.5 pr-4 text-amber-600 font-bold">1d 6h</td>
                  <td className="py-2.5 pr-4 text-ink">Upload new label image</td>
                  <td className="py-2.5 text-right"><button className="text-[10px] font-bold text-[#741d35] hover:underline">Upload</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline">View all issues →</button>
          </div>
        </div>

        {/* Recent Product Activity */}
        <div className="bg-white border border-line rounded-xl p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-ink" />
              <h3 className="text-[13px] font-bold text-ink">Recent Product Activity</h3>
            </div>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto flex-1 scrollbar-thin">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[900px]">
              <thead>
                <tr>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Event</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Changed Area</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Previous Value</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">New Value</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Performed By</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Role</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Date & Time</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Reason</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line pr-4">Result</th>
                  <th className="py-2 text-[10px] font-bold text-muted uppercase border-b border-line">Audit Record</th>
                </tr>
              </thead>
              <tbody className="text-[10px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 pr-4 text-ink font-semibold">Product content updated</td>
                  <td className="py-2.5 pr-4 text-muted">Product Content</td>
                  <td className="py-2.5 pr-4 text-muted">v1</td>
                  <td className="py-2.5 pr-4 text-ink">v2</td>
                  <td className="py-2.5 pr-4 text-ink">Elena Vance</td>
                  <td className="py-2.5 pr-4 text-muted">Compliance Lead</td>
                  <td className="py-2.5 pr-4 text-muted">May 04, 2026, 11:15 AM</td>
                  <td className="py-2.5 pr-4 text-ink">Content refinement</td>
                  <td className="py-2.5 pr-4"><span className="text-emerald-600 font-bold">Success</span></td>
                  <td className="py-2.5 text-muted">AUD-2026-5582</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 pr-4 text-ink font-semibold">Brand authorization validated</td>
                  <td className="py-2.5 pr-4 text-muted">Brand & Supplier</td>
                  <td className="py-2.5 pr-4 text-muted">Pending</td>
                  <td className="py-2.5 pr-4 text-ink">Valid</td>
                  <td className="py-2.5 pr-4 text-ink">Marcus Lee</td>
                  <td className="py-2.5 pr-4 text-muted">Brand Manager</td>
                  <td className="py-2.5 pr-4 text-muted">May 04, 2026, 10:45 AM</td>
                  <td className="py-2.5 pr-4 text-ink">Annual renewal passed</td>
                  <td className="py-2.5 pr-4"><span className="text-emerald-600 font-bold">Success</span></td>
                  <td className="py-2.5 text-muted">AUD-2026-5579</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 pr-4 text-ink font-semibold">Variant attributes added</td>
                  <td className="py-2.5 pr-4 text-muted">Variants & Attributes</td>
                  <td className="py-2.5 pr-4 text-muted">2 variants</td>
                  <td className="py-2.5 pr-4 text-ink">3 variants</td>
                  <td className="py-2.5 pr-4 text-ink">Priya Kapoor</td>
                  <td className="py-2.5 pr-4 text-muted">Catalog Specialist</td>
                  <td className="py-2.5 pr-4 text-muted">May 03, 2026, 02:30 PM</td>
                  <td className="py-2.5 pr-4 text-ink">New travel size launch</td>
                  <td className="py-2.5 pr-4"><span className="text-emerald-600 font-bold">Success</span></td>
                  <td className="py-2.5 text-muted">AUD-2026-5564</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 pr-4 text-ink font-semibold">Primary image replaced</td>
                  <td className="py-2.5 pr-4 text-muted">Images & Media</td>
                  <td className="py-2.5 pr-4 text-muted">img_v1.jpg</td>
                  <td className="py-2.5 pr-4 text-ink">img_v2.jpg</td>
                  <td className="py-2.5 pr-4 text-ink">Elena Vance</td>
                  <td className="py-2.5 pr-4 text-muted">Compliance Lead</td>
                  <td className="py-2.5 pr-4 text-muted">May 03, 2026, 11:05 AM</td>
                  <td className="py-2.5 pr-4 text-ink">Label text clearer</td>
                  <td className="py-2.5 pr-4"><span className="text-emerald-600 font-bold">Success</span></td>
                  <td className="py-2.5 text-muted">AUD-2026-5560</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-ink font-semibold">Safety status changed</td>
                  <td className="py-2.5 pr-4 text-muted">Ingredients & Safety</td>
                  <td className="py-2.5 pr-4 text-muted">Clear</td>
                  <td className="py-2.5 pr-4 text-red-600">Flagged</td>
                  <td className="py-2.5 pr-4 text-ink">System</td>
                  <td className="py-2.5 pr-4 text-muted">Auto-Validation</td>
                  <td className="py-2.5 pr-4 text-muted">May 02, 2026, 09:12 AM</td>
                  <td className="py-2.5 pr-4 text-ink">Safety evidence outdated</td>
                  <td className="py-2.5 pr-4"><span className="text-amber-600 font-bold">Warning</span></td>
                  <td className="py-2.5 text-muted">AUD-2026-5548</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline">View full audit history →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
