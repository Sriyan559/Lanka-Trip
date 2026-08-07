"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { SharedProgressList } from "../shared/SharedProgressList";
import { SharedLineChart } from "../shared/SharedLineChart";
import { SharedPieChart } from "../shared/SharedPieChart";

export function ProductApprovalsBottomPanels() {
  const TEAM_PERFORMANCE = [
    { label: "Elena V. (Seniors)", pct: 98, color: "bg-[#059669]" },
    { label: "Marcus C. (Compliance)", pct: 85, color: "bg-[#059669]" },
    { label: "Sarah J. (Content)", pct: 92, color: "bg-[#059669]" },
    { label: "David K. (Pricing)", pct: 76, color: "bg-[#d97706]" },
    { label: "Anita M. (New Brands)", pct: 64, color: "bg-[#dc2626]" },
  ];

  const REJECTION_REASONS = [
    { name: "Incomplete Descriptions", value: 35, color: "#dc2626" },
    { name: "Low Res Images", value: 25, color: "#d97706" },
    { name: "Missing Safety Docs", value: 20, color: "#2563eb" },
    { name: "Invalid Categorization", value: 12, color: "#475569" },
    { name: "Other", value: 8, color: "#94a3b8" },
  ];

  const APPROVAL_TRENDS = [
    { name: "Mon", approved: 120, rejected: 15 },
    { name: "Tue", approved: 145, rejected: 22 },
    { name: "Wed", approved: 130, rejected: 18 },
    { name: "Thu", approved: 160, rejected: 25 },
    { name: "Fri", approved: 142, rejected: 15 },
    { name: "Sat", approved: 80, rejected: 10 },
    { name: "Sun", approved: 60, rejected: 5 },
  ];

  const RECENT_ACTIVITY = [
    { action: "Product Approved", entity: "Radiance Serum (PROD-421)", user: "Elena V.", date: "Today, 10:30 AM" },
    { action: "Info Requested", entity: "Cleansing Gel (PROD-423)", user: "Marcus C.", date: "Yesterday, 04:15 PM" },
    { action: "Product Rejected", entity: "Lipstick Variant (PROD-318)", user: "Elena V.", date: "02 Aug, 11:20 AM" },
    { action: "Bulk Assignment", entity: "12 Products assigned to David", user: "System", date: "01 Aug, 09:00 AM" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SharedProgressList 
          title="Team Performance (SLA Compliance)" 
          items={TEAM_PERFORMANCE} 
          layout="vertical"
        />
        
        <SharedPieChart 
          title="Top Rejection Reasons"
          data={REJECTION_REASONS}
        />

        <div className="bg-white rounded-xl border border-line flex flex-col overflow-hidden shadow-sm">
          <div className="p-6 border-b border-line flex items-center justify-between bg-slate-50/50">
            <h3 className="text-[13px] font-bold text-ink">Recent Audit Activity</h3>
            <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center">
              View Log <ChevronRight size={14} />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-1 overflow-auto">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-[#741d35]"></div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[12px] font-semibold text-ink">{item.action}</span>
                    <span className="text-[10px] font-medium text-muted">{item.date}</span>
                  </div>
                  <span className="text-[11px] text-muted mt-0.5">
                    {item.entity} • <span className="font-medium text-slate-700">{item.user}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SharedLineChart 
          title="Approval Volume Trends (7 Days)"
          data={APPROVAL_TRENDS}
          xAxisKey="name"
          series={[
            { key: "approved", label: "Approved", color: "#059669" },
            { key: "rejected", label: "Rejected", color: "#dc2626" }
          ]}
        />
      </div>
    </div>
  );
}
