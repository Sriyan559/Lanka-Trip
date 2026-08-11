"use client";

import React from "react";
import { ProviderConnectionDetails } from "@/data/marketingChannels.mock";

interface ProviderConnectionCardProps {
  details: ProviderConnectionDetails;
}

export function ProviderConnectionCard({ details }: ProviderConnectionCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Provider Connection
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Provider</span>
            <span className="font-semibold text-gray-900">{details.provider}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Connection Status</span>
            <span className="font-bold text-emerald-700">{details.connectionStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Credential Status</span>
            <span className="font-semibold text-emerald-700">{details.credentialStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">OAuth 2.0 Token</span>
            <span className="font-semibold text-emerald-700">{details.oauthTokenStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Last Validated</span>
            <span className="text-gray-700 font-mono text-[11px]">{details.lastValidated}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Rotation Due</span>
            <span className="text-gray-700 font-mono text-[11px]">{details.rotationDue}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">IP Allowlist</span>
            <span className="text-gray-700">{details.ipAllowlist}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Data Residency</span>
            <span className="text-gray-700">{details.dataResidency}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          Test Connection
        </button>
      </div>
    </div>
  );
}
