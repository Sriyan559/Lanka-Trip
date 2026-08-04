"use client";

import React from "react";
import { AlertTriangle, Plus, Upload, CheckCircle2, XCircle, Search, Edit2 } from "lucide-react";

export function IngredientsAndSafetyStep() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top Completion Bar */}
      <div className="flex items-center gap-4 bg-white border border-line rounded-lg p-5 shadow-sm">
        <div className="flex-1">
          <div className="flex justify-between text-[11px] font-bold mb-2">
            <span className="text-muted">Overall Completeness</span>
            <span className="text-ink">68%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: '68%' }} />
          </div>
        </div>
        <div className="w-px h-10 bg-line mx-4" />
        <div className="flex-1 text-center">
          <div className="text-[11px] font-medium text-muted">Required Fields Completed</div>
          <div className="text-2xl font-bold text-ink">82 <span className="text-sm font-medium text-muted">/ 120</span></div>
        </div>
        <div className="w-px h-10 bg-line mx-4" />
        <div className="flex-1 text-center">
          <div className="text-[11px] font-medium text-muted">Open Validation Issues</div>
          <div className="text-2xl font-bold text-amber-600">7</div>
        </div>
        <div className="w-px h-10 bg-line mx-4" />
        <div className="flex-1 text-center">
          <div className="text-[11px] font-medium text-muted">Blocking Issues</div>
          <div className="text-2xl font-bold text-red-600">3</div>
        </div>
      </div>

      {/* Regulatory Block Alert */}
      <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 flex items-center gap-3 shadow-sm">
        <AlertTriangle size={20} className="text-red-600" />
        <div>
          <h4 className="text-[13px] font-bold text-red-800">Regulatory Compliance Block</h4>
          <p className="text-[12px] font-medium mt-0.5">Safety evidence is required for 15% Vitamin C concentration. Upload clinical safety assessment certificates to proceed.</p>
        </div>
      </div>

      {/* Formulation Matrix */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[13px] font-bold text-ink">Formulation Matrix</h3>
            <p className="text-[11px] text-muted">Declare all active and inactive compounds.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 rounded bg-white border border-line text-[11px] font-bold text-[#8b2c45] hover:bg-slate-50 flex items-center gap-1.5">
              <Plus size={14} /> Add Ingredient
            </button>
            <button className="h-8 px-3 rounded bg-white border border-line text-[11px] font-bold text-ink hover:bg-slate-50 flex items-center gap-1.5">
              <Upload size={14} /> Import Ingredient List
            </button>
            <button className="h-8 px-3 rounded bg-white border border-line text-[11px] font-bold text-ink hover:bg-slate-50 flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Validate INCI
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-line rounded">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line bg-canvas/50">
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">#</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Ingredient Name</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">INCI Name</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Concentration</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Function</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Restricted</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Allergen</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Safety Status</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Evidence</th>
                <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line hover:bg-slate-50">
                <td className="py-3 px-3 text-[11px] text-muted">1</td>
                <td className="py-3 px-3 text-[12px] font-medium text-ink">Vitamin C</td>
                <td className="py-3 px-3 text-[11px] text-muted">Ascorbic Acid</td>
                <td className="py-3 px-3 text-[11px] font-bold text-ink text-right">15.00%</td>
                <td className="py-3 px-3 text-[11px] text-muted">Antioxidant</td>
                <td className="py-3 px-3 text-center"><AlertTriangle size={14} className="text-red-500 mx-auto" /></td>
                <td className="py-3 px-3 text-[11px] text-muted text-center">No</td>
                <td className="py-3 px-3"><span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded flex items-center gap-1 w-fit"><XCircle size={10} /> Unsafe</span></td>
                <td className="py-3 px-3 text-[11px] font-medium text-red-600"><div className="flex items-center gap-1"><AlertTriangle size={12}/> Missing</div></td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1 text-muted">
                    <button className="p-1 hover:text-ink"><Edit2 size={14} /></button>
                    <button className="p-1 hover:text-ink"><Upload size={14} /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-line hover:bg-slate-50">
                <td className="py-3 px-3 text-[11px] text-muted">2</td>
                <td className="py-3 px-3 text-[12px] font-medium text-ink">Hyaluronic Acid</td>
                <td className="py-3 px-3 text-[11px] text-muted">Sodium Hyaluronate</td>
                <td className="py-3 px-3 text-[11px] font-bold text-ink text-right">2.00%</td>
                <td className="py-3 px-3 text-[11px] text-muted">Humectant</td>
                <td className="py-3 px-3 text-[11px] text-muted text-center">No</td>
                <td className="py-3 px-3 text-[11px] text-muted text-center">No</td>
                <td className="py-3 px-3"><span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-1 w-fit"><CheckCircle2 size={10} /> Safe</span></td>
                <td className="py-3 px-3 text-[11px] font-medium text-green-600"><div className="flex items-center gap-1"><CheckCircle2 size={12}/> Verified</div></td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1 text-muted">
                    <button className="p-1 hover:text-ink"><Edit2 size={14} /></button>
                    <button className="p-1 hover:text-ink"><Upload size={14} /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-line hover:bg-slate-50">
                <td className="py-3 px-3 text-[11px] text-muted">3</td>
                <td className="py-3 px-3 text-[12px] font-medium text-ink">Water</td>
                <td className="py-3 px-3 text-[11px] text-muted">Aqua</td>
                <td className="py-3 px-3 text-[11px] font-bold text-ink text-right">82.00%</td>
                <td className="py-3 px-3 text-[11px] text-muted">Solvent</td>
                <td className="py-3 px-3 text-[11px] text-muted text-center">No</td>
                <td className="py-3 px-3 text-[11px] text-muted text-center">No</td>
                <td className="py-3 px-3"><span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-1 w-fit"><CheckCircle2 size={10} /> Safe</span></td>
                <td className="py-3 px-3 text-[11px] font-medium text-muted">N/A</td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1 text-muted">
                    <button className="p-1 hover:text-ink"><Edit2 size={14} /></button>
                    <button className="p-1 hover:text-ink"><Upload size={14} /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="text-[11px] font-semibold text-[#8b2c45] hover:underline mt-4">View full ingredient analysis &rarr;</button>
      </div>

      {/* Cross-Step Summary placeholders */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Cross-Step Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-4">
           {/* Placeholders for small progress bars at bottom of mockup */}
           <div className="border border-line rounded p-2 text-center"><div className="text-[10px] font-bold text-muted mb-1">Product Identity</div><div className="text-[12px] font-bold text-green-600 mb-1">Complete</div><div className="w-full h-1 bg-green-500 rounded" /></div>
           <div className="border border-line rounded p-2 text-center"><div className="text-[10px] font-bold text-muted mb-1">Classification</div><div className="text-[12px] font-bold text-green-600 mb-1">Complete</div><div className="w-full h-1 bg-green-500 rounded" /></div>
           <div className="border border-line rounded p-2 text-center"><div className="text-[10px] font-bold text-muted mb-1">Brand & Supplier</div><div className="text-[12px] font-bold text-green-600 mb-1">Complete</div><div className="w-full h-1 bg-green-500 rounded" /></div>
           <div className="border border-line rounded p-2 text-center"><div className="text-[10px] font-bold text-muted mb-1">Product Content</div><div className="text-[12px] font-bold text-amber-500 mb-1">Partial</div><div className="w-full h-1 bg-amber-500 rounded w-[74%]" /></div>
           <div className="border border-line rounded p-2 text-center"><div className="text-[10px] font-bold text-muted mb-1">Variants & Attributes</div><div className="text-[12px] font-bold text-amber-500 mb-1">Partial</div><div className="w-full h-1 bg-amber-500 rounded w-[82%]" /></div>
           <div className="border border-line rounded p-2 text-center"><div className="text-[10px] font-bold text-muted mb-1">Images & Media</div><div className="text-[12px] font-bold text-amber-500 mb-1">Partial</div><div className="w-full h-1 bg-amber-500 rounded w-[62%]" /></div>
           <div className="border border-line rounded p-2 text-center"><div className="text-[10px] font-bold text-muted mb-1">Pricing & Tax</div><div className="text-[12px] font-bold text-green-600 mb-1">Complete</div><div className="w-full h-1 bg-green-500 rounded" /></div>
           <div className="border border-line rounded p-2 text-center"><div className="text-[10px] font-bold text-muted mb-1">Inventory & Publication</div><div className="text-[12px] font-bold text-amber-500 mb-1">Partial</div><div className="w-full h-1 bg-amber-500 rounded w-[70%]" /></div>
        </div>
      </div>
    </div>
  );
}
