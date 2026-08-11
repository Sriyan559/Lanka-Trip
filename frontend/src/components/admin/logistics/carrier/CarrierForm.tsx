"use client";

import React, { useState } from "react";
import { X, Truck, Save } from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

interface CarrierFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  initialData?: any;
}

export function CarrierForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: CarrierFormProps) {
  const [carrierName, setCarrierName] = useState(initialData?.carrierName || "");
  const [carrierType, setCarrierType] = useState(initialData?.carrierType || "National Courier");
  const [operator, setOperator] = useState(initialData?.operator || "");
  const [contactNumber, setContactNumber] = useState(initialData?.contactNumber || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [dailyCapacity, setDailyCapacity] = useState(initialData?.capacity?.dailyCapacity || 5000);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      carrierName,
      carrierType,
      operator,
      contactNumber,
      email,
      dailyCapacity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-rose-700" />
            <h3 className="text-xs font-bold text-gray-900 uppercase">
              {initialData ? "Edit Carrier Partner" : "Add Carrier / Delivery Partner"}
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
              Carrier / Partner Name *
            </label>
            <input
              type="text"
              required
              value={carrierName}
              onChange={(e) => setCarrierName(e.target.value)}
              placeholder="e.g. Domex Courier"
              className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Carrier Type *
              </label>
              <select
                value={carrierType}
                onChange={(e) => setCarrierType(e.target.value)}
                className="w-full text-xs p-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="National Courier">National Courier</option>
                <option value="Regional Courier">Regional Courier</option>
                <option value="Same-Day Partner">Same-Day Partner</option>
                <option value="3PL">3PL</option>
                <option value="Internal Fleet">Internal Fleet</option>
                <option value="Specialist Carrier">Specialist Carrier</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Operator / Company Name *
              </label>
              <input
                type="text"
                required
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                placeholder="e.g. Domex Pvt Ltd"
                className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+94 11 2 345 678"
                className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="partnerops@domex.lk"
                className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">
              Initial Daily Capacity (Packages)
            </label>
            <input
              type="number"
              value={dailyCapacity}
              onChange={(e) => setDailyCapacity(Number(e.target.value))}
              className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
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
              label="Save Carrier"
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
