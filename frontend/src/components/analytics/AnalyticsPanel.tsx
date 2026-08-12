"use client";

import React from "react";

interface AnalyticsPanelProps {
  title: string;
  number?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footerLinkText?: string;
  onFooterLinkClick?: () => void;
}

export function AnalyticsPanel({
  title,
  number,
  subtitle,
  headerAction,
  children,
  className = "",
  footerLinkText,
  onFooterLinkClick,
}: AnalyticsPanelProps) {
  return (
    <div
      className={`analytics-panel-card bg-white rounded-lg border border-slate-200/90 shadow-xs p-3.5 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between mb-2.5 pb-1 border-b border-slate-100">
          <div className="flex items-baseline gap-1 min-w-0 flex-wrap">
            {number && <span className="text-xs font-bold text-burgundy">{number}</span>}
            <h3 className="text-xs font-bold text-burgundy tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <span className="text-[10px] text-slate-500 font-normal">
                ({subtitle})
              </span>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>

        {/* Panel Content Body */}
        <div className="analytics-panel-body">{children}</div>
      </div>

      {/* Optional Footer Link */}
      {footerLinkText && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-center">
          <button
            type="button"
            onClick={onFooterLinkClick}
            className="text-[11px] font-bold text-burgundy hover:text-burgundy-dark transition-colors cursor-pointer"
          >
            {footerLinkText}
          </button>
        </div>
      )}
    </div>
  );
}
