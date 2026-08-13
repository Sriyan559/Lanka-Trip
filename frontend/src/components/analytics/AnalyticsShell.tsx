"use client";

import React from "react";

interface AnalyticsShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AnalyticsShell({ children, className = "" }: AnalyticsShellProps) {
  return (
    <div className={`analytics-shell-container w-full min-h-screen bg-slate-100/50 p-4 md:p-6 ${className}`}>
      <div className="max-w-[1680px] mx-auto space-y-4">
        {children}
      </div>
    </div>
  );
}
