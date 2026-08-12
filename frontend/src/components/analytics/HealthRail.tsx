"use client";

import React from "react";
import { HealthRailData } from "@/data/analytics/executivePerformanceData";
import { CircularScore } from "./charts/CircularScore";
import { ArrowUp, Info, HelpCircle } from "lucide-react";

interface HealthRailProps {
  data: HealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function HealthRail({ data, className = "", onActionClick }: HealthRailProps) {
  const { overallScore, scoreLabel, deltaText, pillars, targets, alerts } = data;

  const actionButtons = [
    { label: "Review KPI Exceptions", primary: true },
    { label: "Review Growth Initiatives", primary: false },
    { label: "Review Operational Health", primary: false },
    { label: "Review Forecast Assumptions", primary: false },
    { label: "Review Cash Forecast", primary: false },
    { label: "Run Executive Scenario", primary: false },
    { label: "Run Executive Scenario", primary: false },
    { label: "Schedule Executive Briefing", primary: false },
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* Top Header Button */}
      <div className="w-full">
        <button
          type="button"
          onClick={() => onActionClick?.("Executive Insights Report")}
          className="w-full py-2 px-4 bg-burgundy hover:bg-burgundy-dark text-white font-bold text-xs rounded-lg shadow-2xs transition-colors text-center cursor-pointer"
        >
          Executive Insights Report
        </button>
      </div>

      {/* Executive Health Summary Section */}
      <div className="bg-slate-50/50 border border-slate-100/80 rounded-xl p-3.5 text-center space-y-2">
        <div className="text-left">
          <h4 className="font-bold text-burgundy text-sm tracking-tight">
            Executive Health Summary
          </h4>
          <p className="text-[11px] text-slate-500 font-medium">Expanded view of overall health.</p>
        </div>

        {/* Circular Gauge */}
        <div className="py-2 flex justify-center">
          <CircularScore
            score={overallScore}
            maxScore={100}
            size={110}
            strokeWidth={9}
            primaryColor="#800020"
          />
        </div>

        {/* Score Details */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1 font-bold text-slate-900 text-sm">
            <span>{scoreLabel}</span>
            <Info size={13} className="text-slate-400 cursor-pointer" />
          </div>
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-600 mt-0.5">
            <ArrowUp size={11} className="stroke-[3]" />
            <span>{deltaText}</span>
          </div>
        </div>
      </div>

      {/* Health by Pillar */}
      <div className="border-t border-slate-100 pt-3">
        <h4 className="font-bold text-burgundy text-xs mb-2 tracking-tight">
          Health by Pillar
        </h4>
        <div className="space-y-1 text-[11px]">
          {pillars.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100/60 last:border-0">
              <span className="text-slate-700 font-medium">{p.pillar}</span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-burgundy text-xs">{p.score}</span>
                <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center gap-0.5 w-7 justify-end">
                  <ArrowUp size={9} className="stroke-[3]" /> {p.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Summary (Next 30 Days) */}
      <div className="border-t border-slate-100 pt-3">
        <h4 className="font-bold text-burgundy text-xs mb-2 tracking-tight">
          Target Summary <span className="text-[10px] text-slate-400 font-normal">(Next 30 Days)</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-slate-400 font-bold border-b border-slate-100 text-left text-[10px]">
                <th className="py-1 font-medium">Metric</th>
                <th className="py-1 text-right font-medium">Forecast</th>
                <th className="py-1 text-right font-medium">vs. Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/70">
              {targets.map((t, idx) => (
                <tr key={idx}>
                  <td className="py-1.5 text-slate-700 font-medium truncate max-w-[100px]">{t.metric}</td>
                  <td className="py-1.5 text-right font-semibold text-slate-900">{t.forecast}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-600">{t.vsTarget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts & Watchlist */}
      <div className="border-t border-slate-100 pt-3">
        <h4 className="font-bold text-burgundy text-xs mb-2 tracking-tight">
          Alerts &amp; Watchlist
        </h4>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between py-1 border-b border-slate-100/60">
            <span className="font-medium text-slate-700">High Priority Alerts</span>
            <span className="font-bold text-burgundy bg-rose-50 text-xs px-2 py-0.5 rounded-full border border-rose-100">
              {alerts.highPriority}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-slate-100/60">
            <span className="font-medium text-slate-700">Medium Priority Alerts</span>
            <span className="font-bold text-burgundy bg-rose-50 text-xs px-2 py-0.5 rounded-full border border-rose-100">
              {alerts.mediumPriority}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-slate-100/60">
            <span className="font-medium text-slate-700">Watchlist Items</span>
            <span className="font-bold text-burgundy bg-rose-50 text-xs px-2 py-0.5 rounded-full border border-rose-100">
              {alerts.watchlistItems}
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="font-medium text-slate-700">Action Items Due</span>
            <span className="font-bold text-burgundy bg-rose-50 text-xs px-2 py-0.5 rounded-full border border-rose-100">
              {alerts.actionItemsDue}
            </span>
          </div>
        </div>
      </div>

      {/* Final Actions */}
      <div className="border-t border-slate-100 pt-3">
        <h4 className="font-bold text-burgundy text-xs mb-2 tracking-tight">
          Final Actions
        </h4>
        <div className="space-y-1.5">
          {actionButtons.map((btn, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onActionClick?.(btn.label)}
              className={`w-full py-1.5 px-3 text-[11px] rounded-lg transition-colors text-center cursor-pointer shadow-2xs ${
                btn.primary
                  ? "bg-burgundy hover:bg-burgundy-dark text-white font-bold"
                  : "bg-white border border-rose-200/90 text-rose-950 font-semibold hover:bg-rose-50/50"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Support Link */}
      <div className="border-t border-slate-100 pt-3 flex items-center gap-2 bg-slate-50/60 rounded-lg p-2">
        <div className="w-7 h-7 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-600 shrink-0">
          <HelpCircle size={15} />
        </div>
        <div className="text-[10px]">
          <span className="block font-medium text-slate-600">Need help?</span>
          <span className="block font-bold text-slate-800 hover:text-burgundy cursor-pointer">
            Contact Analytics Support
          </span>
        </div>
      </div>
    </aside>
  );
}
