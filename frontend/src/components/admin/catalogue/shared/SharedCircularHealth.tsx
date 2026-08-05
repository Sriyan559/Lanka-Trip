"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ChevronRight } from "lucide-react";

export interface SharedHealthMetric {
  label: string;
  value: string | number;
  color?: string; // Optional dot color
}

export interface SharedCircularHealthProps {
  title: string;
  score: number;
  statusText: string;
  linkText: string;
  layout?: "vertical" | "horizontal";
  metrics?: SharedHealthMetric[];
}

export function SharedCircularHealth({ title, score, statusText, linkText, layout = "vertical", metrics = [] }: SharedCircularHealthProps) {
  return (
    <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
      <h3 className="text-[13px] font-bold text-ink mb-4">{title}</h3>
      
      {layout === "vertical" ? (
        <div className="flex flex-col items-center mb-5 relative">
          <div className="w-32 h-32 relative">
            <CircularProgressbar
              value={score}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: '#059669',
                trailColor: '#f1f5f9',
                strokeLinecap: 'round',
              })}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-3xl font-bold text-ink leading-none">{score}</span>
               <span className="text-[11px] font-bold text-muted">/100</span>
            </div>
          </div>
          <div className="absolute -bottom-3 bg-[#059669] text-white px-4 py-1 rounded-full text-[12px] font-bold shadow-sm">
            {statusText}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-6 mb-4">
          <div className="w-20 h-20 flex-shrink-0 relative">
            <CircularProgressbar
              value={score}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: '#059669',
                trailColor: '#f1f5f9',
                strokeLinecap: 'round',
              })}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-xl font-bold text-ink leading-none">{score}</span>
               <span className="text-[9px] font-bold text-muted">/100</span>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[12px] font-bold self-start mb-3 border border-green-200 shadow-sm">
              {statusText}
            </div>
            {metrics.length > 0 && (
              <div className="text-[11px] text-muted space-y-1 w-full">
                {metrics.map((m, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5">
                      {m.color && <div className={`w-1.5 h-1.5 rounded-full ${m.color}`}></div>}
                      {m.label}
                    </span>
                    <span className="font-bold text-ink">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <button className={`text-[11px] font-bold text-[#741d35] hover:underline w-full ${layout === 'vertical' ? 'text-center flex items-center justify-center gap-1 mt-4' : 'text-left flex items-center gap-1 mt-2'}`}>
        {linkText} <ChevronRight size={12} />
      </button>
    </div>
  );
}
