"use client";

import React, { useState } from "react";
import { X, Filter, RotateCcw } from "lucide-react";
import { MediaFilterState } from "@/types/mediaManagement";

interface MoreFiltersProps {
  isOpen: boolean;
  filters: MediaFilterState;
  onClose: () => void;
  onApply: (updated: Partial<MediaFilterState>) => void;
}

export function MoreMediaFiltersDrawer({ isOpen, filters, onClose, onApply }: MoreFiltersProps) {
  const [fileFormat, setFileFormat] = useState("All");
  const [fileSizeRange, setFileSizeRange] = useState("All");
  const [aspectRatio, setAspectRatio] = useState("All");
  const [colourSpace, setColourSpace] = useState("All");
  const [watermark, setWatermark] = useState("All");
  const [category, setCategory] = useState("All");

  if (!isOpen) return null;

  const handleApply = () => {
    onApply({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-line flex flex-col justify-between">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#671021]" />
            <h2 className="text-base font-extrabold text-ink tracking-tight">More Advanced Filters</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-ink rounded-md hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        {/* Filter Fields */}
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-4 text-[12px]">
          <div>
            <label className="block font-bold text-ink mb-1">File Format</label>
            <select
              value={fileFormat}
              onChange={(e) => setFileFormat(e.target.value)}
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
            >
              <option value="All">All Formats</option>
              <option value="JPEG">JPEG</option>
              <option value="PNG">PNG</option>
              <option value="WEBP">WEBP</option>
              <option value="MP4">MP4 Video</option>
              <option value="PDF">PDF Document</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">File Size Range</label>
            <select
              value={fileSizeRange}
              onChange={(e) => setFileSizeRange(e.target.value)}
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
            >
              <option value="All">All Sizes</option>
              <option value="<1MB">&lt; 1 MB (Optimized)</option>
              <option value="1-5MB">1 MB – 5 MB (Standard)</option>
              <option value="5-20MB">5 MB – 20 MB (High Res)</option>
              <option value=">20MB">&gt; 20 MB (Large Video / Raw)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Aspect Ratio</label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
            >
              <option value="All">All Aspect Ratios</option>
              <option value="1:1">1:1 Square (Product / Swatch)</option>
              <option value="4:3">4:3 Standard Portrait</option>
              <option value="16:9">16:9 Landscape Banner</option>
              <option value="9:16">9:16 Mobile Vertical</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Colour Space & Profile</label>
            <select
              value={colourSpace}
              onChange={(e) => setColourSpace(e.target.value)}
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
            >
              <option value="All">All Colour Profiles</option>
              <option value="sRGB">sRGB / Web Standard</option>
              <option value="Display P3">Display P3 (Wide Gamut)</option>
              <option value="CMYK">CMYK (Print Ready)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Watermark Status</label>
            <select
              value={watermark}
              onChange={(e) => setWatermark(e.target.value)}
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
            >
              <option value="All">All</option>
              <option value="Clean">No Watermark (Clean)</option>
              <option value="Watermarked">Watermarked (Protected)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink mb-1">Product Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-9 px-3 border border-line rounded font-semibold text-ink"
            >
              <option value="All">All Categories</option>
              <option value="Skincare">Skincare</option>
              <option value="Makeup">Makeup</option>
              <option value="Haircare">Haircare</option>
              <option value="Fragrance">Fragrance</option>
              <option value="Body Care">Body Care</option>
            </select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-line bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              setFileFormat("All");
              setFileSizeRange("All");
              setAspectRatio("All");
              setColourSpace("All");
              setWatermark("All");
              setCategory("All");
            }}
            className="text-[12px] font-bold text-rose-600 hover:underline flex items-center gap-1"
          >
            <RotateCcw size={13} /> Reset Filters
          </button>
          <button
            onClick={handleApply}
            className="h-9 px-5 rounded bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520c1a]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
