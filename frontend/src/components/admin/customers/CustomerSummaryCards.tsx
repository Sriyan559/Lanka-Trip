"use client";

import React from "react";
import { CUSTOMER_SUMMARY_CARDS_CONFIG } from "@/features/customers/customerSummaryConfig";

interface CustomerSummaryCardsProps {
  showToast: (msg: string) => void;
}

export function CustomerSummaryCards({ showToast }: CustomerSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2.5 mb-4 items-stretch">
      {CUSTOMER_SUMMARY_CARDS_CONFIG.map((card) => (
        <div
          key={card.id}
          className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between h-full min-w-0 text-[10.5px]"
        >
          <div>
            {/* Title: Standard Admin Sans-Serif Font, Title Case, Line Clamp 2 */}
            <h4
              className="font-sans font-bold text-slate-800 text-[10.5px] leading-tight mb-2 line-clamp-2 min-h-[28px] flex items-center"
              title={card.title}
            >
              {card.title}
            </h4>

            {/* Card Content based on type */}
            {card.type === "lifecycle" && (
              <div className="space-y-1 font-mono text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Active</span>
                  <span className="font-bold text-emerald-600 flex-shrink-0">142,680</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">At Risk</span>
                  <span className="font-bold text-amber-600 flex-shrink-0">6,120</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Dormant</span>
                  <span className="font-bold text-slate-700 flex-shrink-0">18,420</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Reactivated</span>
                  <span className="font-bold text-purple-600 flex-shrink-0">2,340</span>
                </div>
              </div>
            )}

            {card.type === "acquisition" && (
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">New Customers</span>
                  <span className="font-bold font-mono text-slate-800 flex-shrink-0">8,420</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Activation Rate</span>
                  <span className="font-bold font-mono text-emerald-600 flex-shrink-0">72.5%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "72.5%" }} />
                </div>
              </div>
            )}

            {card.type === "segment" && (
              <div className="flex items-center gap-2 my-0.5">
                <div className="w-10 h-10 rounded-full border-3 border-emerald-500 border-t-purple-600 flex items-center justify-center font-mono font-bold text-[8.5px] flex-shrink-0 text-slate-800">
                  186.4K
                </div>
                <div className="text-[9px] space-y-0.5 font-mono min-w-0 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-sans truncate">Active</span>
                    <span className="font-bold text-emerald-600 flex-shrink-0 ml-1">76.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-sans truncate">Loyalty</span>
                    <span className="font-bold text-purple-600 flex-shrink-0 ml-1">45.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-sans truncate">High-Val</span>
                    <span className="font-bold text-amber-600 flex-shrink-0 ml-1">6.9%</span>
                  </div>
                </div>
              </div>
            )}

            {card.type === "verification" && (
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Verified</span>
                  <span className="font-bold font-mono text-emerald-600 flex-shrink-0">128,460 (68.9%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Pending</span>
                  <span className="font-bold font-mono text-amber-600 flex-shrink-0">6,240 (3.3%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Unverified</span>
                  <span className="font-bold font-mono text-slate-600 flex-shrink-0">51,720 (27.8%)</span>
                </div>
              </div>
            )}

            {card.type === "purchase" && (
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Total Orders</span>
                  <span className="font-bold font-mono text-slate-800 flex-shrink-0">512,850</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Avg. Order Value</span>
                  <span className="font-bold font-mono text-slate-800 flex-shrink-0">LKR 8,942</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Repeat Purchase Rate</span>
                  <span className="font-bold font-mono text-emerald-600 flex-shrink-0">45.6%</span>
                </div>
              </div>
            )}

            {card.type === "returns" && (
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Returns</span>
                  <span className="font-bold font-mono text-amber-600 flex-shrink-0">842 (2.27%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Refunds</span>
                  <span className="font-bold font-mono text-slate-800 flex-shrink-0">LKR 2.18M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Disputes</span>
                  <span className="font-bold font-mono text-rose-600 flex-shrink-0">412 (2.13%)</span>
                </div>
              </div>
            )}

            {card.type === "loyalty" && (
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Members</span>
                  <span className="font-bold font-mono text-purple-700 flex-shrink-0">84,260</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Redemptions</span>
                  <span className="font-bold font-mono text-slate-800 flex-shrink-0">12,540</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Points Issued</span>
                  <span className="font-bold font-mono text-slate-800 flex-shrink-0">9.6M</span>
                </div>
              </div>
            )}

            {card.type === "privacy" && (
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Consented</span>
                  <span className="font-bold font-mono text-emerald-600 flex-shrink-0">154,320 (82.8%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Pending</span>
                  <span className="font-bold font-mono text-amber-600 flex-shrink-0">18,290 (9.8%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Revoked</span>
                  <span className="font-bold font-mono text-rose-600 flex-shrink-0">13,810 (7.4%)</span>
                </div>
              </div>
            )}

            {card.type === "risk" && (
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">High Risk</span>
                  <span className="font-bold font-mono text-rose-600 flex-shrink-0">2,140</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Medium Risk</span>
                  <span className="font-bold font-mono text-amber-600 flex-shrink-0">8,620</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Restricted</span>
                  <span className="font-bold font-mono text-slate-800 flex-shrink-0">428</span>
                </div>
              </div>
            )}

            {card.type === "support" && (
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Open Cases</span>
                  <span className="font-bold font-mono text-rose-600 flex-shrink-0">1,248</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Avg. Resolution</span>
                  <span className="font-bold font-mono text-slate-800 flex-shrink-0">36h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">CSAT Score</span>
                  <span className="font-bold font-mono text-emerald-600 flex-shrink-0">89%</span>
                </div>
              </div>
            )}

            {card.type === "retention" && (
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Retention Rate</span>
                  <span className="font-bold font-mono text-emerald-600 flex-shrink-0">74.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Churn Rate</span>
                  <span className="font-bold font-mono text-rose-600 flex-shrink-0">4.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans truncate pr-1">Dormancy Rate</span>
                  <span className="font-bold font-mono text-amber-600 flex-shrink-0">9.9%</span>
                </div>
              </div>
            )}

            {card.type === "activity" && (
              <div className="space-y-1 text-[9px]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700 truncate pr-1" title="Amaya Perera verified">
                    Amaya Perera verified
                  </span>
                  <span className="font-mono text-slate-400 text-[8.5px] flex-shrink-0">10:12 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700 truncate pr-1" title="Nadeesha Silva placed order">
                    Nadeesha Silva placed order
                  </span>
                  <span className="font-mono text-slate-400 text-[8.5px] flex-shrink-0">09:45 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700 truncate pr-1" title="Rajiv Perera case updated">
                    Rajiv Perera case updated
                  </span>
                  <span className="font-mono text-slate-400 text-[8.5px] flex-shrink-0">09:20 AM</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action anchored at bottom */}
          <button
            onClick={() => showToast(card.toastActionMsg)}
            className="mt-3 pt-2 border-t border-line text-[9.5px] font-bold text-[#671021] hover:underline text-left block w-full"
          >
            {card.footerText}
          </button>
        </div>
      ))}
    </div>
  );
}
