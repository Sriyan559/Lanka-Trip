"use client";

import React from "react";
import Link from "next/link";

interface RevenueRoasReferenceCardProps {
  revenueRoas: {
    roasReference: string;
    attributedRevenueReference: string;
  };
}

export function RevenueRoasReferenceCard({ revenueRoas }: RevenueRoasReferenceCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Revenue & ROAS Reference
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">ROAS Reference</span>
            <span className="text-xl font-extrabold text-emerald-700">
              {revenueRoas.roasReference}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Attributed Revenue Reference</span>
            <span className="font-bold text-emerald-800">
              {revenueRoas.attributedRevenueReference}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href="/admin/marketing/attribution-analytics"
          className="block w-full py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          View Attribution Analytics
        </Link>
      </div>
    </div>
  );
}
