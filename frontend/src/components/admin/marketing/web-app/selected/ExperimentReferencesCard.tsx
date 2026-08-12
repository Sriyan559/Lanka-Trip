"use client";

import React from "react";
import { ExperimentReferenceData } from "@/data/marketingWebApp.mock";

interface ExperimentReferencesCardProps {
  experiment: ExperimentReferenceData;
}

export function ExperimentReferencesCard({ experiment }: ExperimentReferencesCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Experiment Reference
        </h4>
        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Experiment</span>
            <span className="font-semibold text-gray-900">{experiment.experimentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Status</span>
            <span className="font-bold text-emerald-700">{experiment.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Variant A</span>
            <span className="text-gray-700">{experiment.variantA}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Variant B</span>
            <span className="text-gray-700">{experiment.variantB}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Traffic Split</span>
            <span className="font-mono text-[11px] text-gray-700">{experiment.trafficSplit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Primary Metric</span>
            <span className="font-semibold text-gray-900">{experiment.primaryMetric}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Current Lift</span>
            <span className="font-bold text-emerald-700">{experiment.currentLift}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Experiment
        </button>
      </div>
    </div>
  );
}
