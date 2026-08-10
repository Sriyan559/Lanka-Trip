"use client";

import React from "react";
import { MediaAsset } from "@/types/mediaManagement";
import { Globe, Smartphone, Store, ShoppingBag, Share2, RefreshCw, ExternalLink, RotateCcw } from "lucide-react";

interface SelectedCardProps {
  asset: MediaAsset | null;
  onOpenDetail: (asset: MediaAsset) => void;
  onReplace: (asset: MediaAsset) => void;
  onRevoke: (id: string) => void;
}

export function SelectedMediaPreviewCard({
  asset,
  onOpenDetail,
  onReplace,
  onRevoke,
}: SelectedCardProps) {
  if (!asset) {
    return (
      <div className="bg-white border border-line rounded-lg p-5 text-center text-muted text-[12px] shadow-sm">
        Select an asset from the table to view its detailed preview.
      </div>
    );
  }

  return (
    <div className="bg-white border border-line rounded-lg p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-ink uppercase tracking-wider">
          Selected Asset Preview
        </h3>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
          {asset.approvalStatus}
        </span>
      </div>

      {/* Large Image Preview */}
      <div className="w-full h-44 rounded-lg border border-line bg-slate-100 overflow-hidden relative flex items-center justify-center">
        {asset.category === "image" && (
          <img src={asset.thumbnailUrl || ""} alt={asset.name} className="w-full h-full object-cover" />
        )}
        {asset.category === "video" && (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white relative">
            <img src={asset.thumbnailUrl || ""} alt={asset.name} className="w-full h-full object-cover opacity-60" />
            <span className="font-bold text-xs bg-black/60 px-2.5 py-1 rounded-full">
              Video Preview ({asset.resolution})
            </span>
          </div>
        )}
        {asset.category === "document" && (
          <div className="flex flex-col items-center gap-1 text-slate-500">
            <span className="font-mono text-sm font-bold">{asset.format} Document</span>
          </div>
        )}
      </div>

      {/* Metadata Overview */}
      <div className="flex flex-col gap-1 text-[11px]">
        <div className="flex items-center justify-between font-mono font-bold text-ink">
          <span>{asset.id}</span>
          <span className="text-slate-500 font-sans font-semibold text-[10px]">{asset.type}</span>
        </div>

        <div className="mt-1">
          <span className="text-muted font-medium">Product: </span>
          <span className="font-bold text-ink">{asset.productName} — {asset.variant || "Standard"}</span>
        </div>

        <div>
          <span className="text-muted font-medium">Brand: </span>
          <span className="font-semibold text-slate-700">{asset.brandName}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-line text-[10px]">
          <div>
            <span className="text-muted block">File Type</span>
            <span className="font-mono font-bold text-ink">{asset.format}</span>
          </div>
          <div>
            <span className="text-muted block">Resolution</span>
            <span className="font-mono font-bold text-ink">{asset.resolution}</span>
          </div>
          <div>
            <span className="text-muted block">Colour Space</span>
            <span className="font-semibold text-slate-700">{asset.colourSpace || "Unavailable"}</span>
          </div>
          <div>
            <span className="text-muted block">Quality Score</span>
            <span className="font-mono font-bold text-emerald-600">{asset.qualityScore == null ? "N/A" : `${asset.qualityScore}/100`}</span>
          </div>
        </div>

        {/* Channel Compatibility Icons */}
        <div className="mt-2 pt-2 border-t border-line">
          <span className="text-[10px] text-muted font-semibold block mb-1">Channel Compatibility</span>
          {asset.channelCompatibility ? <div className="flex items-center gap-2 text-slate-500 text-[10px]">
            <span className="flex items-center gap-1">
              <Globe size={13} className={asset.channelCompatibility.web ? "text-emerald-600" : "opacity-30"} /> Web
            </span>
            <span className="flex items-center gap-1">
              <Smartphone size={13} className={asset.channelCompatibility.mobile ? "text-emerald-600" : "opacity-30"} /> Mobile
            </span>
            <span className="flex items-center gap-1">
              <Store size={13} className={asset.channelCompatibility.b2b ? "text-emerald-600" : "opacity-30"} /> B2B
            </span>
          </div> : <span className="text-[10px] text-muted">Unavailable — no channel requirement schema is installed.</span>}
        </div>
      </div>

      {/* Card Actions */}
      <div className="grid grid-cols-3 gap-1.5 mt-2 pt-2 border-t border-line">
        <button
          onClick={() => onReplace(asset)}
          className="h-8 px-2 rounded border border-line bg-white text-[10px] font-bold text-ink hover:bg-slate-50 flex items-center justify-center gap-1"
        >
          <RefreshCw size={12} /> Replace
        </button>

        <button
          onClick={() => onOpenDetail(asset)}
          className="h-8 px-2 rounded border border-line bg-white text-[10px] font-bold text-ink hover:bg-slate-50 flex items-center justify-center gap-1"
        >
          <ExternalLink size={12} /> Detail
        </button>

        <button
          onClick={() => onRevoke(asset.id)}
          className="h-8 px-2 rounded border border-rose-200 bg-rose-50 text-[10px] font-bold text-rose-700 hover:bg-rose-100 flex items-center justify-center gap-1"
        >
          <RotateCcw size={12} /> Revoke
        </button>
      </div>
    </div>
  );
}
