"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ShieldAlert, AlertTriangle } from "lucide-react";

export function WizardSidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* Validation & Readiness Score */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Validation & Readiness</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={68}
              text="68"
              styles={buildStyles({
                textSize: '24px',
                pathColor: '#f59e0b',
                textColor: '#1e293b',
                trailColor: '#f1f5f9',
              })}
            />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold text-muted mb-2">Product Readiness Score</div>
            <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-[12px] font-bold inline-block border border-red-200">
              Incomplete
            </div>
          </div>
        </div>
        
        <div className="space-y-1 mb-6">
          {/* Mocked mini bars */}
          <div className="flex justify-between items-center text-[10px]"><span className="text-muted w-24">Identity</span> <div className="flex-1 h-1 bg-slate-100 rounded mx-2"><div className="h-full bg-green-500" style={{width: '95%'}}/></div> <span className="font-bold w-6 text-right">95%</span></div>
          <div className="flex justify-between items-center text-[10px]"><span className="text-muted w-24">Classification</span> <div className="flex-1 h-1 bg-slate-100 rounded mx-2"><div className="h-full bg-green-500" style={{width: '90%'}}/></div> <span className="font-bold w-6 text-right">90%</span></div>
          <div className="flex justify-between items-center text-[10px]"><span className="text-muted w-24">Brand & Supplier</span> <div className="flex-1 h-1 bg-slate-100 rounded mx-2"><div className="h-full bg-green-500" style={{width: '88%'}}/></div> <span className="font-bold w-6 text-right">88%</span></div>
          <div className="flex justify-between items-center text-[10px]"><span className="text-muted w-24">Content</span> <div className="flex-1 h-1 bg-slate-100 rounded mx-2"><div className="h-full bg-amber-500" style={{width: '74%'}}/></div> <span className="font-bold w-6 text-right">74%</span></div>
          <div className="flex justify-between items-center text-[10px]"><span className="text-muted w-24">Ingredients</span> <div className="flex-1 h-1 bg-slate-100 rounded mx-2"><div className="h-full bg-amber-500" style={{width: '58%'}}/></div> <span className="font-bold w-6 text-right">58%</span></div>
          <div className="flex justify-between items-center text-[10px]"><span className="text-muted w-24">Variants</span> <div className="flex-1 h-1 bg-slate-100 rounded mx-2"><div className="h-full bg-amber-500" style={{width: '82%'}}/></div> <span className="font-bold w-6 text-right">82%</span></div>
          <div className="flex justify-between items-center text-[10px]"><span className="text-muted w-24">Media</span> <div className="flex-1 h-1 bg-slate-100 rounded mx-2"><div className="h-full bg-amber-500" style={{width: '62%'}}/></div> <span className="font-bold w-6 text-right">62%</span></div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-line pt-4">
           <div className="text-center">
             <div className="text-[10px] font-semibold text-muted">Required</div>
             <div className="text-[14px] font-bold text-green-600">82</div>
           </div>
           <div className="text-center">
             <div className="text-[10px] font-semibold text-muted">Remaining</div>
             <div className="text-[14px] font-bold text-blue-600">38</div>
           </div>
           <div className="text-center">
             <div className="text-[10px] font-semibold text-muted">Missing</div>
             <div className="text-[14px] font-bold text-red-600">12</div>
           </div>
        </div>
      </div>

      {/* Blocking Issues */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-[13px] font-bold text-ink">Blocking Issues (3)</h3>
           <button className="text-[10px] font-semibold text-[#8b2c45]">View all</button>
        </div>
        <div className="space-y-3">
           <div className="flex gap-2 items-start">
             <ShieldAlert size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
             <div className="flex-1 text-[11px] text-ink">Missing safety certificate</div>
             <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1 rounded">High</span>
             <button className="text-[10px] font-bold text-[#8b2c45]">Fix</button>
           </div>
           <div className="flex gap-2 items-start">
             <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
             <div className="flex-1 text-[11px] text-ink">Back packaging image missing</div>
             <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1 rounded">Medium</span>
             <button className="text-[10px] font-bold text-[#8b2c45]">Fix</button>
           </div>
           <div className="flex gap-2 items-start">
             <ShieldAlert size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
             <div className="flex-1 text-[11px] text-ink">Unsupported product claim</div>
             <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1 rounded">High</span>
             <button className="text-[10px] font-bold text-[#8b2c45]">Fix</button>
           </div>
        </div>
      </div>

      {/* Duplicate Risk */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
           <h3 className="text-[13px] font-bold text-ink">Duplicate Risk</h3>
           <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Low Risk</span>
        </div>
        <div className="text-[11px] font-medium text-muted flex justify-between">
          Barcode Match <span className="font-bold text-ink">0</span>
        </div>
        <button className="text-[11px] font-semibold text-[#8b2c45] mt-2 w-full text-center hover:underline">Compare Candidates</button>
      </div>
    </div>
  );
}
