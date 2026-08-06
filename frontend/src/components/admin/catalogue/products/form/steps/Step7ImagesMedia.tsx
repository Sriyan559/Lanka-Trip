"use client";

import React from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

export const Step7ImagesMedia: React.FC = () => {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h3 className="text-xs font-bold text-gray-900">Step 7 — Images & Media Gallery</h3>
        <button
          onClick={() => toast.success("Opened media asset uploader.")}
          className="h-8 px-3 rounded bg-white border border-gray-300 text-[11px] font-bold text-[#741d35] hover:bg-gray-50 flex items-center gap-1"
        >
          <Upload size={14} /> Upload Media
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="border border-gray-200 rounded p-2 text-center bg-gray-50">
          <img
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80"
            alt="Primary Front"
            className="w-full h-28 object-contain rounded border border-gray-200 mb-2 bg-white"
          />
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            Primary Image
          </span>
        </div>

        <div className="border border-gray-200 rounded p-2 text-center bg-gray-50">
          <img
            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200"
            alt="Packaging Front"
            className="w-full h-28 object-contain rounded border border-gray-200 mb-2 bg-white"
          />
          <span className="text-[10px] font-bold text-gray-600">Packaging Front</span>
        </div>

        <div className="border-2 border-dashed border-rose-300 rounded p-4 flex flex-col items-center justify-center text-center bg-rose-50/40">
          <ImageIcon size={24} className="text-rose-500 mb-1" />
          <span className="text-[11px] font-bold text-rose-700">Back Packaging Image</span>
          <span className="text-[9.5px] text-rose-500 font-semibold mt-0.5">Missing (Required Blocker)</span>
          <button
            onClick={() => toast.success("Select back packaging image file.")}
            className="mt-2 text-[10px] font-bold text-[#741d35] underline"
          >
            Upload Now
          </button>
        </div>
      </div>
    </div>
  );
};
