"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, Check } from "lucide-react";

interface ScheduleExportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (exportName: string) => void;
}

export function ScheduleExportDrawer({
  isOpen,
  onClose,
  onSuccess,
}: ScheduleExportDrawerProps) {
  const [exportName, setExportName] = useState("Nightly Catalogue Export Feed");
  const [frequency, setFrequency] = useState("Daily");
  const [destination, setDestination] = useState("Marketplace API");
  const [time, setTime] = useState("02:00 AM");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(exportName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-line flex flex-col justify-between">
        <div className="p-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold text-[#671021] uppercase tracking-wider">
              Export Automation
            </span>
            <h2 className="text-base font-extrabold text-ink">Schedule Export Job</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-500">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex-1 overflow-y-auto space-y-4 text-[12px]">
          <div>
            <label className="block font-bold text-ink mb-1">Export Feed Name</label>
            <input
              type="text"
              required
              value={exportName}
              onChange={(e) => setExportName(e.target.value)}
              className="w-full h-9 px-3 rounded border border-line text-[12px] font-medium text-ink focus:outline-none focus:border-[#671021]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-ink mb-1">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none"
              >
                <option value="Hourly">Hourly</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Execution Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-9 px-3 rounded border border-line text-[12px] font-medium text-ink focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Destination Endpoint / System</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none"
            >
              <option value="Marketplace API">Marketplace API</option>
              <option value="Inventory System">Inventory System</option>
              <option value="CDN Platform">CDN Platform</option>
              <option value="Pricing Engine">Pricing Engine</option>
            </select>
          </div>

          <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-sky-900 text-[11px] leading-relaxed">
            <span className="font-bold block mb-0.5">Schedule Preview</span>
            This job will run automatically <strong>{frequency}</strong> at <strong>{time}</strong> and deliver dataset payloads to <strong>{destination}</strong>.
          </div>
        </form>

        <div className="p-4 border-t border-line bg-slate-50 flex items-center justify-end gap-2">
          <button onClick={onClose} className="h-9 px-4 rounded border border-line text-[12px] font-bold text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="h-9 px-5 rounded bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520d1a] flex items-center gap-1.5 shadow-sm"
          >
            <Check size={14} /> Schedule Job
          </button>
        </div>
      </div>
    </div>
  );
}
