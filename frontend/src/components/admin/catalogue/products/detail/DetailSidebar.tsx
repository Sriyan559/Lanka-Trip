"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AlertCircle, Clock, Info, User, CheckCircle2, FileEdit, Send, MessageSquare, ExternalLink, PauseCircle, Archive, AlertTriangle, Download } from "lucide-react";

export function DetailSidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* Product Health */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Product Health</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={84}
              text="84"
              styles={buildStyles({
                textSize: '24px',
                pathColor: '#f59e0b',
                textColor: '#1e293b',
                trailColor: '#f1f5f9',
              })}
            />
          </div>
          <div className="flex-1">
            <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[12px] font-bold inline-block mb-3 border border-amber-200">
              Needs Attention
            </div>
            <div className="text-[11px] text-muted space-y-0.5">
              <div className="flex justify-between"><span>Identity</span><span className="font-bold text-ink">98%</span></div>
              <div className="flex justify-between"><span>Classification</span><span className="font-bold text-ink">94%</span></div>
              <div className="flex justify-between"><span>Brand Verification</span><span className="font-bold text-ink">96%</span></div>
              <div className="flex justify-between"><span>Compliance</span><span className="font-bold text-ink">72%</span></div>
              <div className="flex justify-between"><span>Variants</span><span className="font-bold text-ink">100%</span></div>
            </div>
          </div>
        </div>
        <button className="text-[11px] font-semibold text-[#8b2c45] hover:underline w-full text-center">
          View health dashboard &rarr;
        </button>
      </div>

      {/* Current Product State */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Current Product State</h3>
        <div className="space-y-3 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1.5"><CheckCircle2 size={12} className="text-green-500" /> Status</span>
            <span className="font-bold text-green-600">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1.5"><Clock size={12} className="text-blue-500" /> Approval Stage</span>
            <span className="font-bold text-ink">Compliance Review</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1.5"><AlertCircle size={12} className="text-red-500" /> Publication Status</span>
            <span className="font-bold text-red-600">Not Ready</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1.5"><AlertTriangle size={12} className="text-amber-500" /> Risk Level</span>
            <span className="font-bold text-amber-600">Medium</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1.5"><Info size={12} /> Record Version</span>
            <span className="font-bold text-ink">v2</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1.5"><Clock size={12} /> Last Updated</span>
            <span className="font-bold text-ink text-right">May 04, 2026<br/><span className="text-[10px] font-normal text-muted">11:27 AM</span></span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1.5"><User size={12} /> Owner</span>
            <span className="font-bold text-ink">Elena Vance</span>
          </div>
        </div>
        <button className="text-[11px] font-semibold text-[#8b2c45] hover:underline w-full text-center mt-4">
          View product timeline &rarr;
        </button>
      </div>

      {/* Priority Issues */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Priority Issues</h3>
        <div className="space-y-3">
          {[
            { text: "Missing safety evidence (15% Vitamin C)", level: "High", action: "Review" },
            { text: "Unsupported anti-aging claim", level: "High", action: "Review" },
            { text: "Back packaging image missing", level: "Medium", action: "Upload" },
            { text: "Safety evidence pending", level: "Medium", action: "Review" },
          ].map((issue, i) => (
            <div key={i} className="flex gap-2">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded h-fit mt-0.5 ${issue.level === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                {issue.level}
              </span>
              <div className="flex-1 text-[11px] text-ink leading-tight">{issue.text}</div>
              <button className="text-[10px] text-[#8b2c45] font-bold hover:underline">{issue.action}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Final Product Actions */}
      <div className="bg-white rounded-lg border border-line shadow-sm overflow-hidden flex flex-col">
        <h3 className="text-[13px] font-bold text-ink p-5 pb-3">Final Product Actions</h3>
        <button className="w-full text-left px-5 py-3 text-[12px] font-bold text-white bg-[#741d35] hover:bg-[#5a1629] flex items-center gap-2 border-b border-[#5a1629]">
          <FileEdit size={14} /> Edit Product
        </button>
        <button className="w-full text-left px-5 py-3 text-[12px] font-bold text-[#741d35] bg-white hover:bg-red-50 flex items-center gap-2 border-b border-line">
          <Send size={14} /> Submit for Approval
        </button>
        <button className="w-full text-left px-5 py-3 text-[12px] font-bold text-ink hover:bg-slate-50 flex items-center gap-2 border-b border-line">
          <MessageSquare size={14} /> Request Additional Information
        </button>
        <button className="w-full text-left px-5 py-3 text-[12px] font-bold text-ink hover:bg-slate-50 flex items-center gap-2 border-b border-line">
          <ExternalLink size={14} /> Preview Marketplace Listing
        </button>
        <button className="w-full text-left px-5 py-3 text-[12px] font-bold text-amber-600 hover:bg-amber-50 flex items-center gap-2 border-b border-line">
          <PauseCircle size={14} /> Suspend Publication
        </button>
        <button className="w-full text-left px-5 py-3 text-[12px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 border-b border-line">
          <Archive size={14} /> Archive Product
        </button>
        <button className="w-full text-left px-5 py-3 text-[12px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 border-b border-line">
          <AlertTriangle size={14} /> Escalate Product
        </button>
        <button className="w-full text-left px-5 py-3 text-[12px] font-bold text-ink hover:bg-slate-50 flex items-center gap-2">
          <Download size={14} /> Export Product Record
        </button>
      </div>
    </div>
  );
}
