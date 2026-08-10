"use client";

import React from "react";

/** @deprecated The live dashboard uses SelectedMediaPreviewCard with an API asset. */
export function MediaPreviewSidebar() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm">
      <div className="border-b border-line bg-slate-50 px-5 py-4">
        <h2 className="text-[13px] font-bold text-ink">Selected Asset Preview</h2>
      </div>
      <div className="p-6 text-center text-[11px] text-muted">
        No media asset selected. This legacy component does not create demo preview data.
      </div>
    </div>
  );
}
