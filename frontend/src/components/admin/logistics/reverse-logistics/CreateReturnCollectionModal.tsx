"use client";

import React, { useState } from "react";
import { X, RotateCcw, Save } from "lucide-react";
import { ActionButton } from "../shared/ActionButton";
import { ReturnCase, CollectionMethod } from "@/types/logistics/reverseLogistics";

interface CreateReturnCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<ReturnCase>) => void;
}

export function CreateReturnCollectionModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateReturnCollectionModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [returnReason, setReturnReason] = useState("Wrong Item");
  const [collectionMethod, setCollectionMethod] = useState<CollectionMethod>("Courier Pickup");
  const [carrier, setCarrier] = useState("PickMe");
  const [returnValue, setReturnValue] = useState(4500);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customerName,
      orderRef,
      returnReason,
      collectionMethod,
      carrier,
      returnValue,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-rose-700" />
            <h3 className="text-xs font-bold text-gray-900 uppercase">
              Create Reverse Collection Request
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">
              Customer Name *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Tharushi Perera"
              className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Order Reference *
              </label>
              <input
                type="text"
                required
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value)}
                placeholder="e.g. ORD-2025-004562"
                className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Return Value (LKR)
              </label>
              <input
                type="number"
                value={returnValue}
                onChange={(e) => setReturnValue(Number(e.target.value))}
                className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Collection Method
              </label>
              <select
                value={collectionMethod}
                onChange={(e) => setCollectionMethod(e.target.value as CollectionMethod)}
                className="w-full text-xs p-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="Courier Pickup">Courier Pickup</option>
                <option value="Drop-off Station">Drop-off Station</option>
                <option value="Uber Flash">Uber Flash</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Assigned Carrier
              </label>
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full text-xs p-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="PickMe">PickMe</option>
                <option value="Uber Flash">Uber Flash</option>
                <option value="Luxe Courier">Luxe Courier</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">
              Return Reason
            </label>
            <input
              type="text"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              placeholder="e.g. Wrong Item Received"
              className="w-full text-xs p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <ActionButton label="Cancel" variant="outline" size="sm" onClick={onClose} />
            <ActionButton
              label="Create Collection Request"
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
