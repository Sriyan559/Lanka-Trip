'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Play, Plus, Shield, GitBranch, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSlaPolicyModal({ isOpen, onClose }: ModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Order & Delivery');
  const [firstResp, setFirstResp] = useState('15m');
  const [resolution, setResolution] = useState('6h');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`SLA Policy "${name || 'New Policy'}" created in Draft state!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Plus size={16} className="text-[#881337]" /> Create SLA Policy
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Policy Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Express Delivery SLA"
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900"
              >
                <option value="Order & Delivery">Order &amp; Delivery</option>
                <option value="Safety & Compliance">Safety &amp; Compliance</option>
                <option value="General Support">General Support</option>
                <option value="Returns & Refunds">Returns &amp; Refunds</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Priority</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900">
                <option value="High">High</option>
                <option value="Critical">Critical</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">First Response Target</label>
              <input
                type="text"
                value={firstResp}
                onChange={(e) => setFirstResp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Resolution Target</label>
              <input
                type="text"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
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
              Save Draft Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CreateRoutingRuleModal({ isOpen, onClose }: ModalProps) {
  const [ruleName, setRuleName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Routing Rule "${ruleName || 'New Rule'}" created!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <GitBranch size={16} className="text-[#881337]" /> Create Routing Rule
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Rule Name</label>
            <input
              type="text"
              required
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="e.g. VIP In-App Chat Routing"
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Queue</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900">
                <option value="Order & Delivery">Order &amp; Delivery Queue</option>
                <option value="Safety">Safety Queue</option>
                <option value="Returns">Returns Queue</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Assigned Team</label>
              <input
                type="text"
                defaultValue="Govinda Support Team"
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
              Create Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function SimulateRoutingModal({ isOpen, onClose }: ModalProps) {
  const [running, setRunning] = useState(false);

  if (!isOpen) return null;

  const handleSimulate = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      toast.success('Routing Simulation complete: 100% rules validated cleanly!');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Play size={16} className="text-[#881337] fill-[#881337]" /> Safe Routing Simulation
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Simulate incoming ticket parameters against the active policy set (SUP-POL-v8). This test runs in a sandbox and will not modify live cases or queues.
        </p>

        <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5 text-xs">
          <div className="flex justify-between"><span className="text-slate-500">Customer Tier:</span> <strong className="text-slate-800">VIP Customer</strong></div>
          <div className="flex justify-between"><span className="text-slate-500">Issue:</span> <strong className="text-slate-800">Shipment Not Dispatched</strong></div>
          <div className="flex justify-between"><span className="text-slate-500">Channel:</span> <strong className="text-slate-800">In-App Chat</strong></div>
          <div className="flex justify-between"><span className="text-slate-500">Region:</span> <strong className="text-slate-800">Sri Lanka</strong></div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200 text-xs"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSimulate}
            disabled={running}
            className="px-4 py-1.5 bg-[#881337] text-white font-semibold rounded hover:bg-[#70102e] text-xs flex items-center gap-1.5"
          >
            {running ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>
      </div>
    </div>
  );
}
