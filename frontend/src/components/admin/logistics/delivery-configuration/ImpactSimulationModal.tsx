"use client";

import React, { useState } from "react";
import { X, Play, Activity } from "lucide-react";
import { ActionButton } from "../shared/ActionButton";
import { ImpactSimulationScenario } from "@/types/logistics/deliveryConfiguration";

interface ImpactSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunSimulation: (percentIncrease: number) => Promise<ImpactSimulationScenario>;
}

export function ImpactSimulationModal({
  isOpen,
  onClose,
  onRunSimulation,
}: ImpactSimulationModalProps) {
  const [percentIncrease, setPercentIncrease] = useState(20);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImpactSimulationScenario | null>(null);

  if (!isOpen) return null;

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await onRunSimulation(percentIncrease);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-700" />
            <h3 className="text-xs font-bold text-gray-900 uppercase">
              Run Impact Simulation (What-If Analysis)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">
              Order Volume Increase Scenario (%)
            </label>
            <input
              type="number"
              value={percentIncrease}
              onChange={(e) => setPercentIncrease(Number(e.target.value))}
              min={1}
              max={100}
              className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono font-bold"
            />
          </div>

          {result && (
            <div className="bg-blue-50/80 border border-blue-200 rounded-md p-3 space-y-1 text-[11px]">
              <span className="font-bold text-blue-900 block mb-1">Simulation Results:</span>
              <div className="flex justify-between">
                <span className="text-gray-600">Projected Capacity Utilisation:</span>
                <span className="font-bold text-blue-800">{result.projectedCapacityUtilisation}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SLA Compliance Impact:</span>
                <span className="font-bold text-rose-700">{result.slaComplianceImpactPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Affected Zones:</span>
                <span className="font-bold text-gray-900">{result.affectedZonesCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Additional Drivers Needed:</span>
                <span className="font-bold text-emerald-700">{result.additionalDriversNeeded}</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
          <ActionButton label="Close" variant="outline" size="sm" onClick={onClose} />
          <ActionButton
            label="Execute Simulation"
            icon={<Play className="w-3.5 h-3.5" />}
            variant="primary"
            size="sm"
            loading={loading}
            onClick={handleRun}
          />
        </div>
      </div>
    </div>
  );
}
