"use client";

import React from "react";
import { MerchandisingRulesData } from "@/data/marketingWebApp.mock";

interface MerchandisingRulesCardProps {
  rules: MerchandisingRulesData;
}

export function MerchandisingRulesCard({ rules }: MerchandisingRulesCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Merchandising Rules
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Pricing Rule</span>
            <span className="font-semibold text-emerald-700">● {rules.pricingRule}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Campaign Priority</span>
            <span className="font-semibold text-emerald-700">● {rules.campaignPriority}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Product Availability Rule</span>
            <span className="font-semibold text-emerald-700">● {rules.productAvailabilityRule}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Inventory Rule</span>
            <span className="font-semibold text-emerald-700">● {rules.inventoryRule}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Compliance Rule</span>
            <span className="font-semibold text-emerald-700">● {rules.complianceRule}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Audience Rule</span>
            <span className="font-semibold text-emerald-700">● {rules.audienceRule}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 text-center">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 inline-block">
          All Rules Valid
        </span>
      </div>
    </div>
  );
}
