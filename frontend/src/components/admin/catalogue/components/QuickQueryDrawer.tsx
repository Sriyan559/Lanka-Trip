"use client";

import React, { useState } from "react";
import { X, Search, Command, ArrowRight } from "lucide-react";

interface QuickQueryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickQueryDrawer: React.FC<QuickQueryDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const sampleQueries = [
    "Find low stock products in Colombo warehouse",
    "Show near-expiry batches under 30 days",
    "List pending brand authorizations for Estée Lauder",
    "Find duplicate products by EAN barcode",
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between relative">
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#f5ebed] text-[#741d35] flex items-center justify-center">
                <Command size={16} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Quick Query Console</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Type query or command (e.g. SKU, Batch ID, Supplier)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
              autoFocus
            />
          </div>

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Suggested Quick Queries
          </div>
          <div className="space-y-2">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(q)}
                className="w-full text-left p-2.5 rounded bg-gray-50 hover:bg-[#f5ebed] border border-gray-200 text-xs text-gray-800 font-medium transition-colors flex items-center justify-between group"
              >
                <span>{q}</span>
                <ArrowRight size={14} className="text-gray-400 group-hover:text-[#741d35]" />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
          <span>Press ESC to exit</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
