"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MarketingSectionCardProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  headerActions?: React.ReactNode;
  footerLink?: {
    label: string;
    href: string;
  };
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function MarketingSectionCard({
  title,
  subtitle,
  headerActions,
  footerLink,
  children,
  className = "",
  bodyClassName = "",
}: MarketingSectionCardProps) {
  return (
    <div
      className={`bg-white border border-gray-200/80 rounded-xl shadow-2xs flex flex-col overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-2.5 sm:p-3 border-b border-gray-100 flex items-center justify-between gap-2 shrink-0">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        {headerActions && (
          <div className="flex items-center gap-1.5 shrink-0">
            {headerActions}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className={`p-2.5 sm:p-3 flex-1 min-w-0 ${bodyClassName}`}>
        {children}
      </div>

      {/* Footer link if present */}
      {footerLink && (
        <div className="px-3 py-1.5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end text-[11px] font-bold text-[#800020] hover:text-[#66001a] transition-colors shrink-0">
          <Link
            href={footerLink.href}
            className="inline-flex items-center gap-1 hover:underline"
          >
            <span>{footerLink.label}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
