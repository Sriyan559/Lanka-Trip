"use client";

import React from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import {
  CHANNEL_PUBLICATION_READINESS_DATA,
  RECENT_PRODUCT_ACTIVITIES,
} from "@/data/productMasters.mock";

export const LowerSummaryDashboards: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Row 1: Data Quality, Variant Readiness, Media Readiness, Inventory Linkage */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* A. Product Data Quality */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-900">Product Data Quality</h3>
            </div>

            <div className="space-y-2 text-[11.5px]">
              <div className="flex items-center justify-between text-gray-700">
                <span>Incomplete Identity</span>
                <span className="font-bold text-rose-600">248</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Missing Category</span>
                <span className="font-bold text-rose-600">124</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Missing Brand</span>
                <span className="font-bold text-amber-600">126</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Missing Ingredients</span>
                <span className="font-bold text-gray-800">48</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Missing Safety Info</span>
                <span className="font-bold text-rose-600">36</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Invalid Barcode</span>
                <span className="font-bold text-rose-600">22</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Missing Media</span>
                <span className="font-bold text-amber-600">124</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Duplicate Candidates</span>
                <span className="font-bold text-rose-600">36</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Variant Inconsistencies</span>
                <span className="font-bold text-amber-600">18</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Publication Blockers</span>
                <span className="font-bold text-rose-600">28</span>
              </div>
            </div>
          </div>

          <button className="mt-4 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
            <span>View full data quality report</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* B. Variant & Attribute Readiness */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-900">Variant & Attribute Readiness</h3>
            </div>

            <div className="mb-3 p-2 bg-emerald-50 rounded border border-emerald-200">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>Overall Variant Readiness</span>
                <span>91%</span>
              </div>
            </div>

            <div className="space-y-2 text-[11.5px] mb-3">
              <div className="flex items-center justify-between text-gray-700">
                <span>Products with Variants</span>
                <span className="font-bold text-gray-900">8,920</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Avg Variants per Product</span>
                <span className="font-bold text-gray-900">3.4</span>
              </div>
            </div>

            <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
              Category Readiness
            </div>
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Skincare</span>
                <span className="font-bold text-emerald-600">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Makeup</span>
                <span className="font-bold text-emerald-600">88%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Haircare</span>
                <span className="font-bold text-emerald-600">91%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Fragrance</span>
                <span className="font-bold text-amber-600">86%</span>
              </div>
            </div>
          </div>

          <button className="mt-4 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
            <span>View details</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* C. Product Media Readiness */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-900">Product Media Readiness</h3>
            </div>

            <div className="space-y-2 text-[11.5px] mb-4">
              <div className="flex items-center justify-between text-gray-700">
                <span>Missing Images</span>
                <span className="font-bold text-rose-600">124</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Low-Resolution Assets</span>
                <span className="font-bold text-amber-600">86</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Unapproved Media</span>
                <span className="font-bold text-gray-800">42</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Duplicate Assets</span>
                <span className="font-bold text-gray-800">36</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-gray-50 border border-gray-200">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-700 mb-1">
                <span>Media completeness</span>
                <span className="font-bold text-amber-600 text-xs">84%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "84%" }} />
              </div>
            </div>
          </div>

          <button className="mt-4 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
            <span>View media report</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* D. Inventory & Batch Linkage */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-900">Inventory & Batch Linkage</h3>
            </div>

            <div className="space-y-2 text-[11.5px]">
              <div className="flex items-center justify-between text-gray-700">
                <span>Inventory Linked</span>
                <span className="font-bold text-emerald-600">11,420</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>No Inventory Record</span>
                <span className="font-bold text-rose-600">1,084</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Active Batches</span>
                <span className="font-bold text-gray-900">32,450</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Low-Stock Products</span>
                <span className="font-bold text-amber-600">318</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Out-of-Stock Products</span>
                <span className="font-bold text-rose-600">126</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Near Expiry (&lt; 90 Days)</span>
                <span className="font-bold text-amber-600">42</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Recalled / Quarantined</span>
                <span className="font-bold text-rose-600">9</span>
              </div>
            </div>
          </div>

          <button className="mt-4 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
            <span>View inventory report</span>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Publication Readiness by Channel Table Panel */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-900">Publication Readiness by Channel</h3>
          <button className="text-[11px] font-semibold text-[#741d35] hover:underline">
            View channel publication report
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="w-full text-left border-collapse text-[11.5px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-[10px]">
                <th className="py-2 px-3">Channel</th>
                <th className="py-2 px-3">Eligible</th>
                <th className="py-2 px-3">Published</th>
                <th className="py-2 px-3">Missing Media</th>
                <th className="py-2 px-3">Pricing Issues</th>
                <th className="py-2 px-3">Inventory Issues</th>
                <th className="py-2 px-3">Policy Issues</th>
                <th className="py-2 px-3 text-right">Readiness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {CHANNEL_PUBLICATION_READINESS_DATA.map((ch) => (
                <tr key={ch.id} className="hover:bg-gray-50/80">
                  <td className="py-2.5 px-3 font-semibold text-gray-800">{ch.channel}</td>
                  <td className="py-2.5 px-3 text-gray-700">{ch.eligible.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">{ch.published.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-amber-600">{ch.missingMedia}</td>
                  <td className="py-2.5 px-3 text-rose-600">{ch.pricingIssues}</td>
                  <td className="py-2.5 px-3 text-rose-600">{ch.inventoryIssues}</td>
                  <td className="py-2.5 px-3 text-rose-600">{ch.policyIssues}</td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            ch.readinessPercent >= 90
                              ? "bg-emerald-500"
                              : ch.readinessPercent >= 80
                              ? "bg-emerald-400"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${ch.readinessPercent}%` }}
                        />
                      </div>
                      <span className="font-bold text-gray-800">{ch.readinessPercent}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 3: Approval Status Summary, Duplicate Product Risk, Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Approval Status Summary */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-3">Approval Status Summary</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11.5px]">
              <div className="flex justify-between">
                <span className="text-gray-600">Draft</span>
                <span className="font-bold text-gray-800">486</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Info Requested</span>
                <span className="font-bold text-amber-600">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Submitted</span>
                <span className="font-bold text-amber-600">312</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Final Decision</span>
                <span className="font-bold text-rose-600">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Initial Review</span>
                <span className="font-bold text-gray-800">126</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Approved</span>
                <span className="font-bold text-emerald-600">10,150</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Brand Auth.</span>
                <span className="font-bold text-gray-800">48</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rejected</span>
                <span className="font-bold text-rose-600">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Compliance Review</span>
                <span className="font-bold text-gray-800">36</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Published</span>
                <span className="font-bold text-emerald-600">9,246</span>
              </div>
            </div>
          </div>
          <button className="mt-4 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
            <span>View approval workflow</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* Duplicate Product Risk */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-3">Duplicate Product Risk</h3>
            <div className="space-y-2 text-[11.5px]">
              <div className="flex justify-between">
                <span className="text-gray-700">High Confidence Candidates</span>
                <span className="font-bold text-rose-600">36</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Medium Confidence</span>
                <span className="font-bold text-amber-600">84</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Low Confidence</span>
                <span className="font-bold text-gray-800">128</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Duplicate Barcodes</span>
                <span className="font-bold text-rose-600">22</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Similar Names</span>
                <span className="font-bold text-amber-600">64</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Same Brand / Variant Conflict</span>
                <span className="font-bold text-gray-800">18</span>
              </div>
            </div>
          </div>
          <button className="mt-4 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
            <span>View duplicate management</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* Recent Product Master Activity Table */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-900">Recent Product Master Activity</h3>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[9.5px]">
                    <th className="py-2 px-2">Activity</th>
                    <th className="py-2 px-2">Product</th>
                    <th className="py-2 px-2">Performed By</th>
                    <th className="py-2 px-2">Date & Time</th>
                    <th className="py-2 px-2">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {RECENT_PRODUCT_ACTIVITIES.map((act) => (
                    <tr key={act.id} className="hover:bg-gray-50/80">
                      <td className="py-2 px-2 font-medium text-gray-900 whitespace-nowrap">{act.activity}</td>
                      <td className="py-2 px-2 text-gray-700 max-w-[110px] truncate">{act.product}</td>
                      <td className="py-2 px-2 text-gray-600 whitespace-nowrap">{act.performedBy}</td>
                      <td className="py-2 px-2 text-gray-500 whitespace-nowrap">{act.dateTime}</td>
                      <td className="py-2 px-2 whitespace-nowrap">
                        <span className="text-emerald-700 font-bold">{act.result}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button className="mt-3 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
            <span>View full activity log</span>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
