"use client";

import React from "react";
import { Edit2, Send, ExternalLink, MoreHorizontal, Info } from "lucide-react";

export function DetailHeaderInfo() {
  return (
    <div className="p-6">
      <div className="flex items-start gap-6">
        <div className="w-32 h-40 bg-slate-100 rounded-lg overflow-hidden border border-line flex-shrink-0">
          <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80" alt="Product" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-ink flex items-center gap-2">
                Radiance Vitamin C Serum - 30 ml
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 rounded bg-[#741d35] text-white text-[11px] font-bold flex items-center gap-1.5 hover:bg-[#5a1629]">
                <Edit2 size={12} /> Edit Product
              </button>
              <button className="h-8 px-3 rounded bg-white border border-line text-ink text-[11px] font-bold flex items-center gap-1.5 hover:bg-slate-50">
                <Send size={12} /> Submit for Approval
              </button>
              <button className="h-8 px-3 rounded bg-white border border-line text-ink text-[11px] font-bold flex items-center gap-1.5 hover:bg-slate-50">
                <ExternalLink size={12} /> Preview Marketplace Listing
              </button>
              <button className="h-8 px-2 rounded bg-white border border-line text-ink hover:bg-slate-50">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-6 text-[12px]">
            <div>
              <div className="text-muted font-medium mb-1">Public Product Ref</div>
              <div className="font-bold text-ink">PROD-2024-00421</div>
            </div>
            <div>
              <div className="text-muted font-medium mb-1 flex items-center gap-1">Database Product ID <Info size={12}/></div>
              <div className="font-bold text-ink">421</div>
            </div>
            <div>
              <div className="text-muted font-medium mb-1">SKU</div>
              <div className="font-bold text-ink">RAD-VITC-30ML</div>
            </div>
            <div>
              <div className="text-muted font-medium mb-1">Barcode (GTIN)</div>
              <div className="font-bold text-ink">8901234567895</div>
            </div>
            <div></div>

            <div>
              <div className="text-muted font-medium mb-1">Brand</div>
              <div className="font-bold text-ink">Estée Lauder</div>
            </div>
            <div>
              <div className="text-muted font-medium mb-1 flex items-center gap-1">Supplier <Info size={12}/></div>
              <div className="font-bold text-ink">Luxe Distribution Pvt Ltd</div>
            </div>
            <div>
              <div className="text-muted font-medium mb-1">Category</div>
              <div className="font-bold text-ink">Skincare &gt; Face Serum</div>
            </div>
            <div>
              <div className="text-muted font-medium mb-1">Product Type</div>
              <div className="font-bold text-ink">Finished Cosmetic Product</div>
            </div>
            <div></div>

            <div>
              <div className="text-muted font-medium mb-1">Primary Variant</div>
              <div className="font-bold text-ink">30 ml</div>
            </div>
            <div>
              <div className="text-muted font-medium mb-1">Country of Origin</div>
              <div className="font-bold text-ink">USA</div>
            </div>
            <div className="col-span-2">
              <div className="text-muted font-medium mb-1">Manufacturer</div>
              <div className="font-bold text-ink">Estée Lauder Companies Inc.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
