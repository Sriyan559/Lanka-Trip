"use client";

import React from "react";
import { AcquisitionIntelligenceData } from "@/data/marketingAttribution.mock";

interface AcquisitionIntelligenceCardProps {
  acquisition: AcquisitionIntelligenceData;
}

export function AcquisitionIntelligenceCard({ acquisition }: AcquisitionIntelligenceCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Acquisition Intelligence</span>
          <span className="text-[10px] text-gray-400 font-normal">New Customers: <strong className="text-gray-900">{acquisition.newCustomers}</strong></span>
        </h4>

        <div className="mt-2 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium">First-Order Conversion</span>
            <span className="font-bold text-emerald-700">{acquisition.firstOrderConversion}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                  <th className="py-1">Source</th>
                  <th className="py-1 text-right">Average CAC</th>
                  <th className="py-1 text-right">New Customers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11px]">
                {acquisition.acquisitionCostBySource.map((item) => (
                  <tr key={item.source} className="hover:bg-gray-50/50">
                    <td className="py-1 font-semibold text-gray-800">{item.source}</td>
                    <td className="py-1 text-right font-bold text-rose-700">{item.averageCac}</td>
                    <td className="py-1 text-right font-mono font-bold text-gray-900">{item.newCustomers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100 bg-gray-50/50 p-2 rounded-lg text-xs space-y-0.5">
        <div className="flex justify-between text-[11px]">
          <span className="text-gray-500 font-medium">Existing Customers Revenue</span>
          <span className="font-bold text-emerald-700">{acquisition.existingCustomers.newCustomerRevenue}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-gray-500 font-medium">Repeat Purchase ROAS</span>
          <span className="font-bold text-blue-700">{acquisition.existingCustomers.repeatPurchaseRoas}</span>
        </div>
      </div>
    </div>
  );
}
