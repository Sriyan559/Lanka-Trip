"use client";

import React, { useState } from "react";
import { X, Play, CheckCircle2, RefreshCw } from "lucide-react";

interface RunValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (scope: string) => void;
}

export function RunValidationModal({
  isOpen,
  onClose,
  onSuccess,
}: RunValidationModalProps) {
  const [scope, setScope] = useState("Entire catalogue");
  const [ruleGroup, setRuleGroup] = useState("All Active Rules (256)");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleStartRun = () => {
    setIsRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          onSuccess(scope);
          onClose();
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-line w-full max-w-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold text-[#671021] uppercase tracking-wider">
              Automated Audit Engine
            </span>
            <h2 className="text-base font-extrabold text-ink">Run Catalogue Validation Scan</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4 text-[12px]">
          <div>
            <label className="block font-bold text-ink mb-1">Validation Scope</label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none"
            >
              <option value="Entire catalogue">Entire catalogue (8,368 records)</option>
              <option value="Selected products">Selected products only</option>
              <option value="Publication-ready records">Publication-ready records</option>
              <option value="Imported records">Recently imported records</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Validation Rule Group</label>
            <select
              value={ruleGroup}
              onChange={(e) => setRuleGroup(e.target.value)}
              className="w-full h-9 px-3 rounded border border-line text-[12px] font-semibold text-ink focus:outline-none"
            >
              <option value="All Active Rules (256)">All Active Rules (256 rules)</option>
              <option value="Duplicate Detection Rules">Duplicate Detection Rules only</option>
              <option value="Regulatory & Safety Rules">Regulatory & Safety Rules only</option>
              <option value="Media Compliance Rules">Media Compliance Rules only</option>
            </select>
          </div>

          {isRunning && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-700">
                <span>Executing validation scan ({scope})...</span>
                <span className="font-mono text-[#671021]">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#671021] transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-line bg-slate-50 flex items-center justify-end gap-2">
          <button onClick={onClose} disabled={isRunning} className="h-9 px-4 rounded border border-line text-[12px] font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50">
            Cancel
          </button>
          <button
            onClick={handleStartRun}
            disabled={isRunning}
            className="h-9 px-5 rounded bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520d1a] flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Scanning...
              </>
            ) : (
              <>
                <Play size={14} className="fill-white" /> Start Validation Scan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
