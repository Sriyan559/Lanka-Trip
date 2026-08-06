"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Save, Play, CheckCircle } from "lucide-react";
import { CreateProductMasterWizard } from "@/components/admin/catalogue/products/create/CreateProductMasterWizard";
import { CatalogueTopFilterBar } from "@/components/admin/catalogue/shared/CatalogueTopFilterBar";
import { useParams } from "next/navigation";

export default function EditProductMaster() {
  const { productId } = useParams();

  return (
    <div className="w-full flex flex-col min-h-screen bg-canvas pb-20">
      {/* Header */}
      <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-1 flex items-center gap-1">
              <Link href="/admin/catalogue" className="hover:text-ink">Catalogue</Link>
              <ChevronRight size={12}/>
              <Link href="/admin/catalogue/products" className="hover:text-ink">Product Masters</Link>
              <ChevronRight size={12}/>
              <span>Edit Product Master</span>
            </div>
            <h1 className="text-xl font-bold text-ink flex items-center gap-2">
              Edit Product Master: {productId || 'product-uuid-001'}
            </h1>
            <p className="text-[12px] text-muted mt-1">
              Update product master record properties, variants, formulation matrices, safety lists, and assets.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href={`/admin/catalogue/products/${productId || 'product-uuid-001'}`} 
              className="h-9 px-4 rounded bg-white border border-line text-[12px] font-bold text-ink hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center"
            >
              Cancel
            </Link>
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-bold text-ink hover:bg-slate-50 flex items-center gap-2 transition-colors shadow-sm">
              <Save size={14} /> Save Draft
            </button>
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-bold text-ink hover:bg-slate-50 flex items-center gap-2 transition-colors shadow-sm">
              <CheckCircle size={14} /> Validate Product
            </button>
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-bold text-ink hover:bg-slate-50 flex items-center gap-2 transition-colors shadow-sm">
              <Play size={14} /> Preview Product
            </button>
            <button className="h-9 px-4 rounded bg-red-100 text-[#8b2c45] text-[12px] font-bold opacity-60 cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm">
              Submit for Approval
            </button>
          </div>
        </div>
      </div>
      
      {/* Top Filter Bar */}
      <CatalogueTopFilterBar />

      <div className="px-6 py-6">
         <CreateProductMasterWizard />
      </div>
    </div>
  );
}