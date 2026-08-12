"use client";

import React from "react";

interface AdvertisingAccountHealthCardProps {
  accountHealth: {
    statusLabel: string;
    primaryAccount: string;
    accountStatus: string;
    paymentStatus: string;
  };
}

export function AdvertisingAccountHealthCard({ accountHealth }: AdvertisingAccountHealthCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Advertising Account Health
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Overall Account Status</span>
            <span className="text-sm font-extrabold text-emerald-700">
              {accountHealth.statusLabel}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Primary Account</span>
            <span className="font-semibold text-gray-800">{accountHealth.primaryAccount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Account Status</span>
            <span className="font-bold text-emerald-700">{accountHealth.accountStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Payment Status</span>
            <span className="font-bold text-emerald-700">{accountHealth.paymentStatus}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Account Settings
        </button>
      </div>
    </div>
  );
}
