'use client';

import React, { useState } from 'react';
import { X, Users, Shuffle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfigureTeamModal({ isOpen, onClose }: ModalProps) {
  const [teamName, setTeamName] = useState('');
  const [division, setDivision] = useState('Customer Operations');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Support Team "${teamName || 'New Team'}" configured successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Users size={16} className="text-[#881337]" /> Create / Configure Support Team
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Team Name</label>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. VIP Concierge Support"
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Support Division</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900"
              >
                <option value="Customer Operations">Customer Operations</option>
                <option value="Logistics Support">Logistics Support</option>
                <option value="Returns & Refunds">Returns &amp; Refunds</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Standard Capacity / Agent</label>
              <input
                type="number"
                defaultValue={18}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#881337] text-white font-semibold rounded hover:bg-[#70102e]"
            >
              Save Team Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function RebalanceModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    toast.success('Workloads rebalanced across 6 overloaded agents! (Explicit confirmation)');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Shuffle size={16} className="text-[#881337]" /> Rebalance Workloads Rationale &amp; Preview
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2 bg-amber-50 border border-amber-200 rounded space-y-1">
            <span className="font-bold text-amber-800 block">Proposed Workload Transfer</span>
            <p className="text-amber-700 text-[11px] leading-tight">
              Transfer 14 active cases from <strong>Order &amp; Delivery (Overloaded 84%)</strong> to <strong>Customer Operations (Available 34 agents)</strong>.
            </p>
          </div>

          <div className="space-y-1 text-[11px] text-slate-700">
            <div className="flex justify-between"><span className="text-slate-500">Affected Teams:</span> <strong>Order &amp; Delivery → Customer Ops</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Affected Cases:</span> <strong>14 Cases</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Predicted Utilisation Delta:</span> <strong className="text-emerald-600">-6% Overload Reduction</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Backend Rationale:</span> <span className="font-mono text-[10px]">SUP-WFM-v6 Capacity Rule #4</span></div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end gap-2 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-3 py-1.5 bg-[#881337] text-white font-semibold rounded hover:bg-[#70102e]"
          >
            Confirm Rebalance
          </button>
        </div>
      </div>
    </div>
  );
}

export function StaffingGapsModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <AlertCircle size={16} className="text-rose-600" /> Staffing Gaps Analysis &amp; Coverage
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="space-y-1 text-[11px] text-slate-700">
            <div className="flex justify-between"><span className="text-slate-500">Total Deficit:</span> <strong className="text-rose-600">12 Agents</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Critical Shift:</span> <strong className="text-slate-900">Night Shift (11pm – 7am)</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">High Risk Queues:</span> <strong className="text-rose-600">Order &amp; Delivery (-18)</strong></div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
