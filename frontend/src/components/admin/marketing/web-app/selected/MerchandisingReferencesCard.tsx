"use client";

import React from "react";
import Link from "next/link";
import { MerchandisingReferencesData } from "@/data/marketingWebApp.mock";

interface MerchandisingReferencesCardProps {
  references: MerchandisingReferencesData;
}

export function MerchandisingReferencesCard({ references }: MerchandisingReferencesCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Merchandising References
        </h4>
        <div className="mt-2 space-y-2 text-xs">
          <div>
            <span className="text-gray-500 font-medium block text-[10px] uppercase">Categories</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {references.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded font-semibold text-[11px]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-gray-500 font-medium block text-[10px] uppercase">Key Products</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {references.keyProducts.map((prod) => (
                <span
                  key={prod}
                  className="px-2 py-0.5 bg-rose-50 text-[#800020] rounded font-semibold text-[11px] border border-rose-200/60"
                >
                  {prod}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          href="/admin/catalogue/products"
          className="block w-full py-1 text-center text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          View References
        </Link>
      </div>
    </div>
  );
}
