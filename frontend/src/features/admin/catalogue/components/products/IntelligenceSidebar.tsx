"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function IntelligenceSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Overall Product Master Health</h3>
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24">
            <CircularProgressbar
              value={90}
              text="90"
              styles={buildStyles({
                textSize: '24px',
                pathColor: '#10b981',
                textColor: '#1e293b',
                trailColor: '#f1f5f9',
              })}
            />
          </div>
          <div className="mt-3 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[12px] font-bold border border-green-200">
            Stable
          </div>
        </div>
        <button className="text-[12px] font-semibold text-[#8b2c45] hover:underline w-full text-center">
          View full health dashboard &rarr;
        </button>
      </div>
      
      {/* Add Priority Alerts, Status Summary etc here */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Product Status Summary</h3>
        <div className="space-y-2">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[11px] flex-1 text-muted">Active</span><span className="text-[11px] font-bold text-ink">10,962</span></div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400"></div><span className="text-[11px] flex-1 text-muted">Draft</span><span className="text-[11px] font-bold text-ink">486</span></div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-[11px] flex-1 text-muted">Pending Approval</span><span className="text-[11px] font-bold text-ink">312</span></div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-[11px] flex-1 text-muted">Approved</span><span className="text-[11px] font-bold text-ink">10,150</span></div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span className="text-[11px] flex-1 text-muted">Published</span><span className="text-[11px] font-bold text-ink">9,246</span></div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="text-[11px] flex-1 text-muted">Blocked</span><span className="text-[11px] font-bold text-ink">28</span></div>
        </div>
      </div>
    </div>
  );
}
