"use client";

import React, { useState } from "react";
import { X, Settings, Save } from "lucide-react";
import { ActionButton } from "../shared/ActionButton";
import { ConfigurationRecord, ConfigurationType } from "@/types/logistics/deliveryConfiguration";

interface DeliveryRuleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<ConfigurationRecord>) => void;
  initialData?: ConfigurationRecord | null;
}

export function DeliveryRuleForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: DeliveryRuleFormProps) {
  const [configName, setConfigName] = useState(initialData?.configName || "");
  const [ruleType, setRuleType] = useState<ConfigurationType>(initialData?.ruleType || "Delivery Zone");
  const [zoneName, setZoneName] = useState(initialData?.zoneName || "");
  const [region, setRegion] = useState(initialData?.region || "Western");
  const [carrier, setCarrier] = useState(initialData?.carrier || "Domex");
  const [baseRate, setBaseRate] = useState(initialData?.baseRate || 180);
  const [capacityLimit, setCapacityLimit] = useState(initialData?.capacityLimit || 2000);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      configName,
      ruleType,
      zoneName,
      region,
      carrier,
      baseRate,
      capacityLimit,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-rose-700" />
            <h3 className="text-xs font-bold text-gray-900 uppercase">
              {initialData ? "Edit Delivery Rule" : "Create Delivery Rule"}
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

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3 text-xs flex-1">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">
              Configuration Name *
            </label>
            <input
              type="text"
              required
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              placeholder="e.g. Colombo Central Delivery Zone"
              className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Rule Type *
              </label>
              <select
                value={ruleType}
                onChange={(e) => setRuleType(e.target.value as ConfigurationType)}
                className="w-full text-xs p-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="Delivery Zone">Delivery Zone</option>
                <option value="Rate Rule">Rate Rule</option>
                <option value="Capacity Rule">Capacity Rule</option>
                <option value="SLA Rule">SLA Rule</option>
                <option value="Cut-Off Rule">Cut-Off Rule</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Zone Name *
              </label>
              <input
                type="text"
                required
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                placeholder="e.g. Colombo Central"
                className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full text-xs p-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="Western">Western</option>
                <option value="Central">Central</option>
                <option value="Southern">Southern</option>
                <option value="Northern">Northern</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Primary Carrier
              </label>
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full text-xs p-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="Domex">Domex</option>
                <option value="SpeedX">SpeedX</option>
                <option value="Kandy Regional">Kandy Regional</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Base Rate (LKR)
              </label>
              <input
                type="number"
                value={baseRate}
                onChange={(e) => setBaseRate(Number(e.target.value))}
                className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Capacity Limit (Orders/Day)
              </label>
              <input
                type="number"
                value={capacityLimit}
                onChange={(e) => setCapacityLimit(Number(e.target.value))}
                className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <ActionButton
              label="Cancel"
              variant="outline"
              size="sm"
              onClick={onClose}
            />
            <ActionButton
              label="Save Delivery Rule"
              icon={<Save className="w-3.5 h-3.5" />}
              variant="primary"
              size="sm"
              onClick={handleSubmit as any}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
