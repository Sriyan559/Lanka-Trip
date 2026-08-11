"use client";

import React from "react";
import Link from "next/link";
import { PaidMediaSpendRefItem } from "@/data/marketingBudgets.mock";
import { ExternalLink } from "lucide-react";

interface PaidMediaSpendReferenceCardProps {
  paidMediaRef: PaidMediaSpendRefItem[];
}

export function PaidMediaSpendReferenceCard({ paidMediaRef }: PaidMediaSpendReferenceCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Paid Media Spend Reference</span>
          <Link
            href="/admin/marketing/paid-media"
            className="text-[10px] font-bold text-[#800020] hover:underline flex items-center gap-1"
          >
            <span>Open Paid Media</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Platform</th>
                <th className="py-1 text-right">Budget</th>
                <th className="py-1 text-right">Actual</th>
                <th className="py-1 text-center">Pacing</th>
                <th className="py-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {paidMediaRef.map((pm) => (
                <tr key={pm.platform} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{pm.platform}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{pm.budget}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{pm.actual}</td>
                  <td className="py-1.5 text-center font-bold text-gray-900">{pm.pacingPercent}%</td>
                  <td className="py-1.5 text-center">
                    <Link
                      href="/admin/marketing/paid-media"
                      className="text-[10px] font-bold text-[#800020] hover:underline"
                    >
                      Open Paid Media
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
