"use client";

import React from "react";

interface PlatformConnectionCardProps {
  connection: {
    apiHealthPercent: number;
    syncStatus: string;
    connectionHealth: string;
    lastSync: string;
  };
}

export function PlatformConnectionCard({ connection }: PlatformConnectionCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Platform Connection
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">API Health</span>
            <span className="text-xl font-extrabold text-gray-900">
              {connection.apiHealthPercent}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Sync Status</span>
            <span className="font-bold text-emerald-700">{connection.syncStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Connection Health</span>
            <span className="font-bold text-emerald-700">{connection.connectionHealth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Last Sync</span>
            <span className="text-gray-600 font-mono text-[11px]">{connection.lastSync}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Platform Sync
        </button>
      </div>
    </div>
  );
}
