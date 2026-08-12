"use client";

import React from "react";
import { DeviceReadinessData } from "@/data/marketingWebApp.mock";

interface DeviceReadinessCardProps {
  device: DeviceReadinessData;
}

export function DeviceReadinessCard({ device }: DeviceReadinessCardProps) {
  const renderStatus = (status: string) => {
    if (status === "Ready") {
      return <span className="font-bold text-emerald-700">● Ready</span>;
    }
    if (status === "Warning") {
      return <span className="font-bold text-amber-700">● Warning</span>;
    }
    return <span className="text-gray-400 font-medium">N/A</span>;
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Device Readiness
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Desktop</span>
            {renderStatus(device.desktop)}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Tablet</span>
            {renderStatus(device.tablet)}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Mobile Web</span>
            {renderStatus(device.mobileWeb)}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">iOS</span>
            {renderStatus(device.ios)}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Android</span>
            {renderStatus(device.android)}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500">Overall Readiness</span>
        <span className="text-sm font-extrabold text-emerald-700">
          {device.overallReadinessPercent}%
        </span>
      </div>
    </div>
  );
}
