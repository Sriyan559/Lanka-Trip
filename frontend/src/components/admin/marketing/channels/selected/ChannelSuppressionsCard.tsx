"use client";

import React from "react";
import { ChannelSuppressionsDetails } from "@/data/marketingChannels.mock";

interface ChannelSuppressionsCardProps {
  details: ChannelSuppressionsDetails;
}

export function ChannelSuppressionsCard({ details }: ChannelSuppressionsCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <h4 className="text-xs font-bold text-gray-900">Channel Suppressions</h4>
          <span className="text-xs font-bold text-blue-600">{details.totalSuppressions}</span>
        </div>

        <div className="mt-2 space-y-1.5 text-xs">
          {details.items.map((item) => (
            <div key={item.category} className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">{item.category}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{item.count}</span>
                <span className="text-[11px] font-mono text-gray-400 w-10 text-right">
                  {item.percentage}
                </span>
              </div>
            </div>
          ))}
          <div className="pt-1 border-t border-gray-100 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <div className="flex items-center gap-2">
              <span>{details.totalSuppressions}</span>
              <span className="text-[11px] font-mono text-gray-500 w-10 text-right">100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          Manage Suppressions
        </button>
      </div>
    </div>
  );
}
