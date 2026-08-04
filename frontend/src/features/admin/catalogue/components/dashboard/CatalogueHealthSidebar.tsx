"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AlertCircle, Clock, Copy, ShieldAlert, PackageX, CheckCircle, ChevronRight, User } from "lucide-react";

export function CatalogueHealthSidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* Catalogue Health */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Catalogue Health</h3>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={89}
              text="89"
              styles={buildStyles({
                textSize: '24px',
                pathColor: '#10b981',
                textColor: '#1e293b',
                trailColor: '#f1f5f9',
              })}
            />
          </div>
          <div className="flex-1">
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[12px] font-bold inline-block mb-3 border border-green-200">
              Stable
            </div>
            <div className="text-[11px] text-muted space-y-1">
              <div className="flex justify-between"><span>Completeness</span><span className="font-bold text-ink">91%</span></div>
              <div className="flex justify-between"><span>Approval Efficiency</span><span className="font-bold text-ink">86%</span></div>
              <div className="flex justify-between"><span>Data Quality</span><span className="font-bold text-ink">87%</span></div>
              <div className="flex justify-between"><span>Media Readiness</span><span className="font-bold text-ink">84%</span></div>
              <div className="flex justify-between"><span>Compliance</span><span className="font-bold text-ink">89%</span></div>
            </div>
          </div>
        </div>
        <button className="text-[12px] font-semibold text-[#8b2c45] hover:underline w-full text-left">
          View full health dashboard &rarr;
        </button>
      </div>

      {/* Priority Catalogue Alerts */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[13px] font-bold text-ink">Priority Catalogue Alerts</h3>
          <button className="text-[11px] font-semibold text-[#8b2c45] hover:underline">View all</button>
        </div>
        <div className="space-y-3">
          {[
            { id: 1, text: "High-risk authenticity review required", level: "High", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50 text-red-700" },
            { id: 2, text: "Approval SLA breached", level: "High", icon: Clock, color: "text-red-500", bg: "bg-red-50 text-red-700" },
            { id: 3, text: "Near-expiry inventory exposure", level: "Medium", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50 text-amber-700" },
            { id: 4, text: "Duplicate product candidates detected", level: "Medium", icon: Copy, color: "text-amber-500", bg: "bg-amber-50 text-amber-700" },
            { id: 5, text: "Missing mandatory product media", level: "Medium", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50 text-amber-700" },
            { id: 6, text: "Recalled stock linked to active listings", level: "High", icon: PackageX, color: "text-red-500", bg: "bg-red-50 text-red-700" },
          ].map(alert => (
            <div key={alert.id} className="flex items-start gap-3">
              <alert.icon size={14} className={`mt-0.5 ${alert.color}`} />
              <div className="flex-1 text-[12px] text-ink">{alert.text}</div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${alert.bg}`}>{alert.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Queues */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Quick Queues</h3>
        <div className="space-y-1">
          {[
            { label: "Pending Product Approvals", count: 312, icon: Clock },
            { label: "High-Risk Products", count: 46, icon: ShieldAlert },
            { label: "Missing Information", count: 124, icon: AlertCircle },
            { label: "Duplicate Risks", count: 36, icon: Copy },
            { label: "Near-Expiry Batches", count: 42, icon: Clock },
            { label: "Publication Blockers", count: 22, icon: PackageX },
          ].map((q, i) => (
            <button key={i} className="w-full flex items-center justify-between py-2 text-[12px] text-muted hover:text-ink hover:bg-slate-50 rounded px-2 -mx-2 transition-colors">
              <div className="flex items-center gap-2">
                <q.icon size={14} />
                <span>{q.label}</span>
              </div>
              <span className="font-bold text-ink">{q.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
