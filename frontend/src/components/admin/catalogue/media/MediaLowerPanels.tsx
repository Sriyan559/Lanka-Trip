"use client";

import React from "react";
import { MOCK_DUPLICATE_CANDIDATES, MOCK_RECENT_ACTIVITIES } from "@/data/mediaAssets.mock";
import { MediaDuplicateCandidate } from "@/types/mediaManagement";
import { CheckCircle2 } from "lucide-react";

interface LowerPanelsProps {
  onCompareDuplicate: (candidate: MediaDuplicateCandidate) => void;
  showToast: (text: string) => void;
}

export function MediaLowerPanels({ onCompareDuplicate, showToast }: LowerPanelsProps) {
  return (
    <div className="flex flex-col gap-5 mt-2">
      {/* Operational Row 1: 6 Cards Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3.5 items-stretch">
        {/* Panel 1: Media Health Scorecard */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate" title="Media Health Scorecard">
              Media Health Scorecard
            </h3>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "Identity Completeness", val: 95 },
                { label: "Quality Readiness", val: 87 },
                { label: "Mandatory Coverage", val: 84 },
                { label: "Channel Readiness", val: 83 },
                { label: "Rights Compliance", val: 95 },
                { label: "Duplicate Control", val: 82 },
                { label: "Alt Text Coverage", val: 81 },
                { label: "Publication Readiness", val: 89 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-slate-500 font-medium truncate pr-1">{item.label}</span>
                    <span className="font-bold text-ink font-mono flex-shrink-0">{item.val}%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.val >= 90 ? "bg-emerald-500" : item.val >= 80 ? "bg-emerald-400" : "bg-amber-500"}`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => showToast("Navigating to full Health Scorecard...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View full scorecard &rarr;
          </button>
        </div>

        {/* Panel 2: Mandatory Media Coverage */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-0.5 font-mono truncate" title="Mandatory Media Coverage">
              Mandatory Media Coverage
            </h3>
            <p className="text-[9px] text-muted mb-2 font-sans font-semibold">By product type</p>
            <div className="flex flex-col gap-2.5">
              {[
                { type: "Skincare", cov: 92 },
                { type: "Makeup", cov: 87 },
                { type: "Haircare", cov: 84 },
                { type: "Fragrance", cov: 78 },
                { type: "Body Care", cov: 89 },
              ].map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="font-bold text-ink">{item.type}</span>
                    <span className="font-bold text-emerald-600 font-mono">{item.cov}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.cov}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => showToast("Opening Coverage Report...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View coverage report &rarr;
          </button>
        </div>

        {/* Panel 3: Product Media Readiness */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-0.5 font-mono truncate" title="Product Media Readiness">
              Product Media Readiness
            </h3>
            <p className="text-[9px] text-muted mb-2 font-sans font-semibold">By sales channel</p>
            <div className="w-full overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto] gap-x-1.5 pb-1 mb-1 border-b border-line text-[9px] font-bold text-slate-700 items-center">
                <div className="text-left text-slate-700 font-bold">Channel</div>
                <div className="text-right text-slate-700 font-bold min-w-[32px]">Ready</div>
                <div className="text-right text-slate-700 font-bold min-w-[30px]">Partial</div>
                <div className="text-right text-slate-700 font-bold min-w-[44px] whitespace-nowrap">Not Ready</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100">
                {[
                  { channel: "Marketplace", ready: "12,450", partial: "1,020", notReady: "240" },
                  { channel: "Mobile App", ready: "11,120", partial: "880", notReady: "210" },
                  { channel: "B2B Wholesale", ready: "9,840", partial: "760", notReady: "180" },
                  { channel: "Partner Storefront", ready: "8,760", partial: "640", notReady: "160" },
                  { channel: "Social Commerce", ready: "6,420", partial: "520", notReady: "130" },
                ].map((row) => (
                  <div
                    key={row.channel}
                    className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto] gap-x-1.5 py-1 items-center text-[9.5px]"
                  >
                    <div className="text-left font-sans font-semibold text-slate-700 truncate" title={row.channel}>
                      {row.channel}
                    </div>
                    <div className="text-right text-emerald-600 font-bold font-mono tabular-nums whitespace-nowrap min-w-[32px]">
                      {row.ready}
                    </div>
                    <div className="text-right text-amber-600 font-bold font-mono tabular-nums whitespace-nowrap min-w-[30px]">
                      {row.partial}
                    </div>
                    <div className="text-right text-rose-600 font-bold font-mono tabular-nums whitespace-nowrap min-w-[44px]">
                      {row.notReady}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => showToast("Opening Channel Report...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View channel report &rarr;
          </button>
        </div>

        {/* Panel 4: Media Quality Operations */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate" title="Media Quality Operations">
              Media Quality Operations
            </h3>
            <div className="flex flex-col gap-1.5 text-[10px] mt-1">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600 font-semibold truncate">Blur Issues</span>
                <span className="font-bold text-rose-600 font-mono flex-shrink-0 ml-1">128</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600 font-semibold truncate">Low Resolution</span>
                <span className="font-bold text-amber-600 font-mono flex-shrink-0 ml-1">46</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600 font-semibold truncate">Wrong Aspect Ratio</span>
                <span className="font-bold text-amber-600 font-mono flex-shrink-0 ml-1">38</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600 font-semibold truncate">Missing Background</span>
                <span className="font-bold text-slate-700 font-mono flex-shrink-0 ml-1">24</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600 font-semibold truncate">Watermark Issues</span>
                <span className="font-bold text-slate-700 font-mono flex-shrink-0 ml-1">16</span>
              </div>
            </div>
          </div>
          <button onClick={() => showToast("Opening Quality Operations...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View quality operations &rarr;
          </button>
        </div>

        {/* Panel 5: Automated Media Validation */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate" title="Automated Media Validation">
              Automated Media Validation
            </h3>
            <div className="flex flex-col gap-1 text-[10px] mt-1">
              <div className="flex justify-between items-center"><span className="text-muted font-medium">Total Scanned:</span><span className="font-bold font-mono">44,216 (91%)</span></div>
              <div className="flex justify-between items-center"><span className="text-muted font-medium">Warnings:</span><span className="font-bold font-mono text-amber-600">3,084 (6%)</span></div>
              <div className="flex justify-between items-center"><span className="text-muted font-medium">Failed:</span><span className="font-bold font-mono text-rose-600">1,320 (3%)</span></div>
            </div>
            <div className="mt-3 pt-2 border-t border-line text-[10px]">
              <span className="font-bold text-ink block mb-1 font-sans">Auto-Fix Actions</span>
              <div className="flex justify-between items-center text-slate-600"><span>Applied:</span><span className="font-bold text-emerald-600 font-mono">1,842</span></div>
              <div className="flex justify-between items-center text-slate-600"><span>Queued:</span><span className="font-bold text-amber-600 font-mono">286</span></div>
            </div>
          </div>
          <button onClick={() => showToast("Opening Validation Report...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View validation report &rarr;
          </button>
        </div>

        {/* Panel 6: Duplicate Candidates */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate" title="Duplicate Candidates">
              Duplicate Candidates
            </h3>
            <div className="w-full overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-[9.5px] table-fixed min-w-[190px]">
                <colgroup>
                  <col style={{ width: "48%" }} />
                  <col style={{ width: "26%" }} />
                  <col style={{ width: "26%" }} />
                </colgroup>
                <thead>
                  <tr className="text-muted border-b border-line bg-slate-50/80">
                    <th className="py-1 px-1 font-bold text-slate-700">ASSET ID</th>
                    <th className="py-1 px-1 text-center font-bold text-slate-700">Match</th>
                    <th className="py-1 px-1 text-right font-bold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {MOCK_DUPLICATE_CANDIDATES.slice(0, 4).map((cand) => (
                    <tr key={cand.id}>
                      <td className="py-1 px-1 font-bold text-ink truncate" title={cand.id}>{cand.id}</td>
                      <td className="py-1 px-1 text-center font-bold text-rose-600">{cand.confidenceScore}%</td>
                      <td className="py-1 px-1 text-right">
                        <button
                          onClick={() => onCompareDuplicate(cand)}
                          className="px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-bold hover:bg-rose-100 text-[8.5px] whitespace-nowrap"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={() => showToast("Opening Duplicate Candidates view...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View all duplicates &rarr;
          </button>
        </div>
      </div>

      {/* Operational Row 2: 6 Cards Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3.5 items-stretch">
        {/* Panel 7: Unlinked & Orphaned */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate" title="Unlinked & Orphaned">
              Unlinked & Orphaned
            </h3>
            <div className="flex flex-col gap-1.5 text-[10px] mt-1">
              <div className="flex justify-between items-center py-0.5"><span className="text-slate-600 font-semibold truncate">Unlinked Assets</span><span className="font-bold text-rose-600 font-mono flex-shrink-0 ml-1">92</span></div>
              <div className="flex justify-between items-center py-0.5"><span className="text-slate-600 font-semibold truncate">Orphaned by Product</span><span className="font-bold text-amber-600 font-mono flex-shrink-0 ml-1">46</span></div>
              <div className="flex justify-between items-center py-0.5"><span className="text-slate-600 font-semibold truncate">Orphaned by Brand</span><span className="font-bold text-slate-700 font-mono flex-shrink-0 ml-1">28</span></div>
              <div className="flex justify-between items-center py-0.5"><span className="text-slate-600 font-semibold truncate">Orphaned by Campaign</span><span className="font-bold text-slate-700 font-mono flex-shrink-0 ml-1">18</span></div>
            </div>
          </div>
          <button onClick={() => showToast("Opening Orphaned Assets Queue...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View orphaned assets &rarr;
          </button>
        </div>

        {/* Panel 8: Channel Requirements */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate" title="Channel Requirements">
              Channel Requirements
            </h3>
            <div className="w-full overflow-x-auto scrollbar-thin text-[9px] font-mono">
              <table className="w-full text-left table-fixed min-w-[190px]">
                <colgroup>
                  <col style={{ width: "36%" }} />
                  <col style={{ width: "16%" }} />
                  <col style={{ width: "16%" }} />
                  <col style={{ width: "16%" }} />
                  <col style={{ width: "16%" }} />
                </colgroup>
                <thead>
                  <tr className="text-muted border-b border-line pb-1 font-sans font-bold bg-slate-50/80">
                    <th className="py-1 px-0.5 text-slate-700">Channel</th>
                    <th className="py-1 px-0.5 text-center text-slate-700">Prm</th>
                    <th className="py-1 px-0.5 text-center text-slate-700">Alt</th>
                    <th className="py-1 px-0.5 text-center text-slate-700">360</th>
                    <th className="py-1 px-0.5 text-center text-slate-700">Vid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="py-1 px-0.5 font-sans font-semibold text-slate-700 truncate" title="Marketplace">Marketplace</td><td className="text-center">5/5</td><td className="text-center">4/5</td><td className="text-center">1/2</td><td className="text-center">1/1</td></tr>
                  <tr><td className="py-1 px-0.5 font-sans font-semibold text-slate-700 truncate" title="Mobile App">Mobile App</td><td className="text-center">5/5</td><td className="text-center">4/5</td><td className="text-center">1/2</td><td className="text-center">1/1</td></tr>
                  <tr><td className="py-1 px-0.5 font-sans font-semibold text-slate-700 truncate" title="B2B Wholesale">B2B Wholesale</td><td className="text-center">5/5</td><td className="text-center">3/5</td><td className="text-center">0/1</td><td className="text-center">1/1</td></tr>
                  <tr><td className="py-1 px-0.5 font-sans font-semibold text-slate-700 truncate" title="Social Store">Social Store</td><td className="text-center">4/5</td><td className="text-center">2/5</td><td className="text-center">0/1</td><td className="text-center">1/1</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={() => showToast("Opening Requirements view...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View requirements &rarr;
          </button>
        </div>

        {/* Panel 9: Renditions & Transforms */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate" title="Renditions & Transforms">
              Renditions & Transforms
            </h3>
            <div className="w-full overflow-x-auto scrollbar-thin text-[9px] font-mono">
              <table className="w-full text-left table-fixed min-w-[190px]">
                <colgroup>
                  <col style={{ width: "45%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "25%" }} />
                </colgroup>
                <thead>
                  <tr className="text-muted border-b border-line pb-1 font-sans font-bold bg-slate-50/80">
                    <th className="py-1 px-0.5 text-slate-700">Rendition</th>
                    <th className="py-1 px-0.5 text-right text-slate-700">Gen</th>
                    <th className="py-1 px-0.5 text-right text-slate-700">Queue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="py-1 px-0.5 font-sans font-semibold text-slate-700 truncate" title="Web 1200px">Web 1200px</td><td className="text-right font-bold">38,420</td><td className="text-right text-amber-600 font-bold">126</td></tr>
                  <tr><td className="py-1 px-0.5 font-sans font-semibold text-slate-700 truncate" title="Mobile 760px">Mobile 760px</td><td className="text-right font-bold">28,610</td><td className="text-right text-amber-600 font-bold">92</td></tr>
                  <tr><td className="py-1 px-0.5 font-sans font-semibold text-slate-700 truncate" title="App 480px">App 480px</td><td className="text-right font-bold">34,580</td><td className="text-right text-amber-600 font-bold">112</td></tr>
                  <tr><td className="py-1 px-0.5 font-sans font-semibold text-slate-700 truncate" title="Thumbnail 400px">Thumbnail 400px</td><td className="text-right font-bold">46,910</td><td className="text-right text-emerald-600 font-bold">0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={() => showToast("Opening Transformations Dashboard...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View transformations &rarr;
          </button>
        </div>

        {/* Panel 10: Usage Rights Compliance */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate" title="Usage Rights Compliance">
              Usage Rights Compliance
            </h3>
            <div className="flex flex-col gap-1.5 text-[10px] mt-1">
              <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold truncate">Valid</span><span className="font-bold text-emerald-600 font-mono flex-shrink-0 ml-1">44,126 (90%)</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold truncate">Expiring &lt;30 days</span><span className="font-bold text-rose-600 font-mono flex-shrink-0 ml-1">17</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold truncate">Restricted Use</span><span className="font-bold text-amber-600 font-mono flex-shrink-0 ml-1">612 (1%)</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-semibold truncate">Missing License</span><span className="font-bold text-slate-700 font-mono flex-shrink-0 ml-1">3,865 (8%)</span></div>
            </div>
          </div>
          <button onClick={() => showToast("Opening Rights Dashboard...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View rights dashboard &rarr;
          </button>
        </div>

        {/* Panel 11: Approval Operations */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate" title="Approval Operations">
              Approval Operations
            </h3>
            <div className="flex flex-col gap-1 text-[10px] mt-1">
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Draft:</span><span className="font-bold font-mono text-slate-600 flex-shrink-0 ml-1">486</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Submitted:</span><span className="font-bold font-mono text-amber-600 flex-shrink-0 ml-1">286</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Under Review:</span><span className="font-bold font-mono text-amber-600 flex-shrink-0 ml-1">1,184</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Approved:</span><span className="font-bold font-mono text-emerald-600 flex-shrink-0 ml-1">42,884</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Rejected:</span><span className="font-bold font-mono text-rose-600 flex-shrink-0 ml-1">124</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Published:</span><span className="font-bold font-mono text-emerald-600 flex-shrink-0 ml-1">40,126</span></div>
            </div>
          </div>
          <button onClick={() => showToast("Opening Approval Workflow...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View approval workflow &rarr;
          </button>
        </div>

        {/* Panel 12: Storage & Delivery */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3 className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate" title="Storage & Delivery">
              Storage & Delivery
            </h3>
            <div className="flex flex-col gap-1.5 text-[10px] mt-1">
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium whitespace-nowrap">Storage Used:</span><span className="font-bold font-mono text-ink flex-shrink-0 ml-1">2.3 TB</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium whitespace-nowrap">CDN Sync:</span><span className="font-bold font-mono text-emerald-600 flex-shrink-0 ml-1">96%</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium whitespace-nowrap">Processing Queue:</span><span className="font-bold font-mono text-amber-600 flex-shrink-0 ml-1">24</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600 font-medium whitespace-nowrap">Avg Delivery Time:</span><span className="font-bold font-mono text-emerald-600 flex-shrink-0 ml-1">1.2 sec</span></div>
            </div>
          </div>
          <button onClick={() => showToast("Opening Delivery Health Dashboard...")} className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block">
            View delivery health &rarr;
          </button>
        </div>
      </div>

      {/* Full-Width Panel: Recent Media Activity */}
      <div className="bg-white border border-line rounded-lg p-4 shadow-sm min-w-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-black text-ink uppercase tracking-wider font-mono">
            Recent Media Activity
          </h3>
          <button onClick={() => showToast("Opening Full Activity Log...")} className="text-[10px] font-bold text-[#671021] hover:underline">
            View full activity log &rarr;
          </button>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-[11px] border-collapse whitespace-nowrap table-fixed min-w-[750px]">
            <colgroup>
              <col style={{ width: "14%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "6%" }} />
            </colgroup>
            <thead>
              <tr className="border-b border-line bg-slate-50 text-[10px] font-bold text-muted uppercase">
                <th className="py-2 px-3">ACTIVITY</th>
                <th className="py-2 px-3">ASSET ID</th>
                <th className="py-2 px-3">LINKED ENTITY</th>
                <th className="py-2 px-3">ACTION BY</th>
                <th className="py-2 px-3">DATE & TIME</th>
                <th className="py-2 px-3">DETAILS</th>
                <th className="py-2 px-3 text-center">RESULT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_RECENT_ACTIVITIES.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-bold text-ink truncate">{act.activity}</td>
                  <td className="py-2 px-3 font-mono font-bold text-[#671021] truncate">{act.assetId}</td>
                  <td className="py-2 px-3 font-semibold text-slate-700 truncate">{act.linkedEntity}</td>
                  <td className="py-2 px-3 font-medium text-slate-600 truncate">{act.actionBy}</td>
                  <td className="py-2 px-3 text-muted truncate">{act.dateTime}</td>
                  <td className="py-2 px-3 text-slate-600 truncate" title={act.details}>{act.details}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 size={11} /> Success
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
}
