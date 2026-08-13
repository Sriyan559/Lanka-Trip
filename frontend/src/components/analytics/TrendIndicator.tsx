"use client";

import React from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface TrendIndicatorProps {
  value: string | number;
  direction?: "up" | "down" | "flat";
  isPositive?: boolean;
  suffix?: string;
  size?: number;
  className?: string;
}

export function TrendIndicator({
  value,
  direction = "up",
  isPositive = true,
  suffix = "",
  size = 12,
  className = "",
}: TrendIndicatorProps) {
  const isUp = direction === "up";
  const isDown = direction === "down";

  let textColor = isPositive ? "text-emerald-700 font-semibold" : "text-rose-700 font-semibold";
  if (direction === "flat") textColor = "text-slate-500 font-medium";

  return (
    <span className={`inline-flex items-center gap-0.5 text-xs ${textColor} ${className}`}>
      {isUp && <ArrowUp size={size} className="stroke-[2.5]" />}
      {isDown && <ArrowDown size={size} className="stroke-[2.5]" />}
      {!isUp && !isDown && <Minus size={size} />}
      <span>
        {value}
        {suffix}
      </span>
    </span>
  );
}
