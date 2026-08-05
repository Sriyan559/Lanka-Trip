"use client";

import React from "react";
import { Search, SlidersHorizontal, Settings2, Download, Upload, Filter, Plus } from "lucide-react";

export function CategoryTableSection() {
  return (
    <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm">
      <div className="p-4 border-b border-line flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
         <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search category / product / attribute / ID" 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-line rounded-lg text-[12px] focus:outline-none focus:border-slate-300 focus:bg-white transition-colors"
            />
         </div>
         <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            <button className="whitespace-nowrap px-3 py-1.5 bg-white border border-line rounded flex items-center gap-2 text-[11px] font-semibold text-ink hover:bg-slate-50">
               <SlidersHorizontal size={12} /> Advanced Filters
            </button>
            <button className="whitespace-nowrap px-3 py-1.5 bg-white border border-line rounded flex items-center gap-2 text-[11px] font-semibold text-ink hover:bg-slate-50">
               <Settings2 size={12} /> Columns
            </button>
         </div>
      </div>
      
      <div className="p-10 flex items-center justify-center min-h-[400px]">
         <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Filter className="text-slate-400" size={24} />
            </div>
            <h3 className="text-sm font-bold text-ink mb-1">Category Hierarchy Tree</h3>
            <p className="text-[12px] text-muted max-w-sm mx-auto">
               The detailed data grid and taxonomy hierarchy component will be placed here.
            </p>
         </div>
      </div>
    </div>
  );
}
