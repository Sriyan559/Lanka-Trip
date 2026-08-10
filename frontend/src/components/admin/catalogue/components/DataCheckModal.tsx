"use client";

import React from "react";
import { X, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import type { CatalogueKpi } from "@/types/catalogue";

export const DataCheckModal: React.FC<{ isOpen: boolean; onClose: () => void; kpis: CatalogueKpi[]; isScanning: boolean; onRunCheck: () => void }> = ({ isOpen, onClose, kpis, isScanning, onRunCheck }) => {
  if (!isOpen) return null;
  const byFilter = (key: string) => kpis.find((item) => item.filterKey === key);
  const checks = [["Duplicate SKU groups", "duplicate"], ["Mandatory product media", "missing-media"], ["Core record completeness", "incomplete"], ["Product compliance", "compliance"]] as const;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="bg-white rounded-lg border border-gray-200 shadow-xl max-w-md w-full p-6 relative">
    <button aria-label="Close data check" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"><X size={18}/></button>
    <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200"><ShieldCheck size={20}/></div><div><h3 className="text-base font-bold text-gray-900">Catalogue Data Check</h3><p className="text-[12px] text-gray-500">Current database-backed catalogue integrity indicators.</p></div></div>
    <div className="space-y-2.5 mb-6">{checks.map(([title,key]) => { const metric=byFilter(key); const unavailable=metric?.availability==='unavailable'; const count=metric?.rawValue ?? null; const pass=!unavailable && count===0; return <div key={key} className="p-3 rounded border border-gray-200 bg-gray-50/60 flex items-start gap-2.5">{pass?<CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/>:<AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5"/>}<div className="text-xs"><div className="font-bold text-gray-900">{title}</div><div className="text-gray-500 text-[11px] mt-0.5">{unavailable ? "Unavailable in the current schema." : `${count ?? 0} record${count===1?'':'s'} require attention.`}</div></div></div>;})}</div>
    <div className="flex items-center justify-between pt-3 border-t border-gray-100"><button onClick={onRunCheck} disabled={isScanning} className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 flex items-center gap-2"><RefreshCw size={13} className={isScanning?'animate-spin text-[#741d35]':''}/>{isScanning?'Scanning...':'Re-run Validation Scan'}</button><button onClick={onClose} className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold">Done</button></div>
  </div></div>;
};
