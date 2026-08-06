"use client";

import React, { useState } from "react";
import { X, ZoomIn, ZoomOut, Download, Play, Pause, FileText, CheckCircle2 } from "lucide-react";
import { MediaAsset } from "@/types/mediaManagement";

interface PreviewModalProps {
  isOpen: boolean;
  asset: MediaAsset | null;
  onClose: () => void;
  onDownload: (asset: MediaAsset) => void;
}

export function MediaPreviewModal({ isOpen, asset, onClose, onDownload }: PreviewModalProps) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || !asset) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <div className="text-[10px] font-mono text-emerald-400 font-bold">{asset.id}</div>
            <h2 className="text-base font-bold text-white">{asset.name}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onDownload(asset)}
              className="h-8 px-3 rounded bg-white/10 hover:bg-white/20 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download size={13} /> Download
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/10">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 min-h-[350px] bg-black flex items-center justify-center p-6 relative overflow-hidden">
          {asset.category === "image" && (
            <img
              src={asset.thumbnailUrl}
              alt={asset.name}
              style={{ transform: `scale(${zoomLevel / 100})` }}
              className="max-h-[60vh] max-w-full object-contain transition-transform duration-200"
            />
          )}

          {asset.category === "video" && (
            <div className="relative w-full max-w-xl aspect-video bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
              <img src={asset.thumbnailUrl} alt={asset.name} className="w-full h-full object-cover opacity-60" />
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[#671021] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1 fill-white" />}
              </button>
            </div>
          )}

          {asset.category === "document" && (
            <div className="flex flex-col items-center gap-3 text-slate-300">
              <FileText size={64} className="text-rose-500" />
              <span className="font-bold text-lg">{asset.name} ({asset.format})</span>
              <p className="text-xs text-slate-400 max-w-md text-center">
                {asset.altText || "Official compliance document record."}
              </p>
            </div>
          )}

          {/* Image Zoom Toolbar */}
          {asset.category === "image" && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-3 text-xs font-mono">
              <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))} className="hover:text-emerald-400">
                <ZoomOut size={14} />
              </button>
              <span>{zoomLevel}%</span>
              <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))} className="hover:text-emerald-400">
                <ZoomIn size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Footer Metadata */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300">
          <div><span className="text-slate-500 block">Product</span><span className="font-bold text-white">{asset.productName}</span></div>
          <div><span className="text-slate-500 block">Resolution</span><span className="font-mono text-white">{asset.resolution}</span></div>
          <div><span className="text-slate-500 block">Quality Score</span><span className="font-bold text-emerald-400 font-mono">{asset.qualityScore}/100</span></div>
          <div><span className="text-slate-500 block">Alt Text Status</span><span className="font-semibold text-emerald-400">{asset.altTextStatus}</span></div>
        </div>
      </div>
    </div>
  );
}
