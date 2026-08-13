'use client';

import React, { useState } from 'react';
import { X, Award, CheckCircle2, UserCheck, BookOpen } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateEvaluationModal({ isOpen, onClose }: ModalProps) {
  const [caseId, setCaseId] = useState('');
  const [agentName, setAgentName] = useState('J. Patel');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`QA Evaluation created for Case "${caseId || 'CS-586129'}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Award size={16} className="text-[#881337]" /> Create QA Evaluation
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Target Case ID</label>
            <input
              type="text"
              required
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              placeholder="e.g. CS-586129"
              className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:bg-white focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Agent Name</label>
              <select
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900"
              >
                <option value="J. Patel">J. Patel</option>
                <option value="K. Fernando">K. Fernando</option>
                <option value="R. Rajakaruna">R. Rajakaruna</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Scorecard Version</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1.5 text-slate-900">
                <option value="QA-SC-v4">QA-SC-v4 (Current Active)</option>
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
              Save Draft Evaluation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function RunCalibrationModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const handleStart = () => {
    toast.success('Calibration session initiated across 6 pending evaluations!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-purple-600" /> Run QA Calibration Session
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <p className="text-slate-600 leading-tight">
            Launch a calibration session to compare scoring variance across evaluators on <strong>Resolution Quality</strong> and <strong>Policy Adherence</strong>.
          </p>
          <div className="p-2 bg-purple-50 border border-purple-200 rounded text-[11px] space-y-1">
            <div className="flex justify-between"><span className="text-purple-700">Evaluations Sampled:</span> <strong>6 Pending</strong></div>
            <div className="flex justify-between"><span className="text-purple-700">Target Agreement:</span> <strong>&gt; 90%</strong></div>
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
            onClick={handleStart}
            className="px-3 py-1.5 bg-purple-700 text-white font-semibold rounded hover:bg-purple-800"
          >
            Start Calibration
          </button>
        </div>
      </div>
    </div>
  );
}

export function CreateCoachingActionModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const handleCreate = () => {
    toast.success('Coaching Action created in CS12 (Workforce & Coaching Queue)!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <UserCheck size={16} className="text-purple-700" /> Create Coaching Action (CS12 Integration)
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2 bg-slate-50 border border-slate-200 rounded space-y-1">
            <span className="font-bold text-slate-800 block">Trigger Source: QA Finding</span>
            <p className="text-slate-600 text-[11px] leading-tight">
              Agent <strong>R. Rajakaruna</strong> scored 76% on QA Evaluation <strong>QA-2026-00419</strong> due to critical policy adherence gap.
            </p>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-500">Coaching Topic:</span> <strong className="text-slate-900">Policy Adherence &amp; Esc.</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Target Module:</span> <strong className="text-purple-700">CS12 Workforce / Coaching Queue</strong></div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end gap-2 text-xs">
          <button type="button" onClick={onClose} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200">Cancel</button>
          <button type="button" onClick={handleCreate} className="px-3 py-1.5 bg-purple-700 text-white font-semibold rounded hover:bg-purple-800">Dispatch to CS12</button>
        </div>
      </div>
    </div>
  );
}

export function CreateKnowledgeGapModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const handleCreate = () => {
    toast.success('Knowledge Gap created in CS11 (Knowledge Base & Guidance)!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <BookOpen size={16} className="text-[#881337]" /> Create Knowledge Gap (CS11 Integration)
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2 bg-slate-50 border border-slate-200 rounded space-y-1">
            <span className="font-bold text-slate-800 block">Root Cause Finding</span>
            <p className="text-slate-600 text-[11px] leading-tight">
              Root Cause Analysis identified <strong>38% Knowledge Gap</strong> regarding international delivery delay updates.
            </p>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span className="text-slate-500">Proposed Topic:</span> <strong className="text-slate-900">International Delay Guidance</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Target Module:</span> <strong className="text-[#881337]">CS11 Knowledge Base</strong></div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end gap-2 text-xs">
          <button type="button" onClick={onClose} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded hover:bg-slate-200">Cancel</button>
          <button type="button" onClick={handleCreate} className="px-3 py-1.5 bg-[#881337] text-white font-semibold rounded hover:bg-[#70102e]">Dispatch to CS11</button>
        </div>
      </div>
    </div>
  );
}
