'use client';

import React, { useState } from 'react';
import { X, Plus, BookOpen, FileText, Info, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateArticleModal({ isOpen, onClose }: ModalProps) {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('Delivery & Logistics');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Knowledge Article "${title || 'New Article'}" created in Draft status!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <BookOpen size={16} className="text-[#881337]" /> Create Knowledge Article
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Article Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Expedited Shipping Refund Procedure"
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Topic / Category</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900"
              >
                <option value="Delivery & Logistics">Delivery &amp; Logistics</option>
                <option value="Returns & Refunds">Returns &amp; Refunds</option>
                <option value="Payments">Payments</option>
                <option value="Account Management">Account Management</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Content Classification</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900">
                <option value="Customer Safe">Customer Safe</option>
                <option value="Agent Safe">Agent Safe</option>
                <option value="Internal Only">Internal Only</option>
              </select>
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
              Save Draft Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CreatePlaybookModal({ isOpen, onClose }: ModalProps) {
  const [playbookTitle, setPlaybookTitle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Resolution Playbook "${playbookTitle || 'New Playbook'}" created!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <FileText size={16} className="text-[#881337]" /> Create Resolution Playbook
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Playbook Title</label>
            <input
              type="text"
              required
              value={playbookTitle}
              onChange={(e) => setPlaybookTitle(e.target.value)}
              placeholder="e.g. Lost Shipment Escalation Workflow"
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
            />
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
              Create Playbook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ViewBasisModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Info size={16} className="text-blue-600" /> Guidance Basis &amp; Grounding Evidence
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2 bg-slate-50 rounded border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 block">Grounding Source Context</span>
            <p className="text-slate-600 text-[11px] leading-tight">
              Recommendation synthesized from <strong>Carrier Status Feed (10m ago)</strong> and canonical policy <strong>POL-2024-015 (Shipping &amp; Delivery Policy)</strong>.
            </p>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-500">Confidence Score:</span> <strong className="text-emerald-600">96% High</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Policy Compliance:</span> <strong className="text-emerald-600">Fully Validated</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Source Freshness:</span> <span className="text-slate-700">Updated 10m ago</span></div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200 text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
