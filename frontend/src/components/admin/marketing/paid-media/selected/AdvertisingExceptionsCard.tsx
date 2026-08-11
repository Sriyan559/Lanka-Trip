"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface AdvertisingExceptionsCardProps {
  exceptions: {
    openExceptions: number;
    critical: number;
    high: number;
    medium: number;
  };
}

export function AdvertisingExceptionsCard({ exceptions }: AdvertisingExceptionsCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>Active Advertising Exceptions</span>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Open Exceptions</span>
            <span className="text-xl font-extrabold text-rose-600">
              {exceptions.openExceptions}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Critical</span>
            <span className="font-bold text-gray-900">{exceptions.critical}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">High</span>
            <span className="font-bold text-rose-600">{exceptions.high}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Medium</span>
            <span className="font-bold text-amber-600">{exceptions.medium}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href="/admin/marketing/governance"
          className="block w-full py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          Review Exceptions
        </Link>
      </div>
    </div>
  );
}
