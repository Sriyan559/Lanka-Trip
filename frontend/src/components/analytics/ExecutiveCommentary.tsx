"use client";

import React from "react";
import { UserCheck } from "lucide-react";

interface ExecutiveCommentaryProps {
  author?: string;
  timeAgo?: string;
  content: string;
  className?: string;
  onViewFull?: () => void;
}

export function ExecutiveCommentary({
  author = "BI Analyst",
  timeAgo = "2h ago",
  content,
  className = "",
  onViewFull,
}: ExecutiveCommentaryProps) {
  return (
    <div className={`flex flex-col justify-between h-full text-xs ${className}`}>
      <div>
        <div className="flex items-center justify-between mb-2 text-slate-500 text-[11px]">
          <span className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              <UserCheck size={11} />
            </span>
            {author}
          </span>
          <span className="font-medium text-slate-400">{timeAgo}</span>
        </div>
        <div className="bg-slate-50/90 p-3 rounded-lg border border-slate-200/80 my-1">
          <p className="text-slate-700 leading-relaxed font-normal text-[11px] italic">
            &quot;{content}&quot;
          </p>
        </div>
      </div>
      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={onViewFull}
          className="text-[11px] font-bold text-burgundy hover:underline cursor-pointer"
        >
          View full commentary
        </button>
      </div>
    </div>
  );
}
