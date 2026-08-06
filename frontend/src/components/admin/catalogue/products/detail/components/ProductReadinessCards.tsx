"use client";

import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck,
  ShieldCheck,
  Tag,
  Layers,
  Image as ImageIcon,
  Boxes,
  Globe,
  Copy,
  AlertCircle,
  ListFilter,
  Layers3,
} from "lucide-react";
import { DETAIL_READINESS_CARDS } from "@/data/productDetail.mock";

interface ProductReadinessCardsProps {
  onSelectTab: (tabId: string) => void;
}

export const ProductReadinessCards: React.FC<ProductReadinessCardsProps> = ({
  onSelectTab,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case "rc-1":
        return <FileCheck size={15} className="text-emerald-600" />;
      case "rc-2":
        return <ShieldCheck size={15} className="text-amber-600" />;
      case "rc-3":
        return <Tag size={15} className="text-emerald-600" />;
      case "rc-4":
        return <Layers size={15} className="text-emerald-600" />;
      case "rc-5":
        return <ImageIcon size={15} className="text-amber-600" />;
      case "rc-6":
        return <Boxes size={15} className="text-emerald-600" />;
      case "rc-7":
        return <Globe size={15} className="text-rose-600" />;
      case "rc-8":
        return <Copy size={15} className="text-emerald-600" />;
      case "rc-9":
        return <AlertCircle size={15} className="text-amber-600" />;
      case "rc-10":
        return <AlertTriangle size={15} className="text-rose-600" />;
      case "rc-11":
        return <Boxes size={15} className="text-emerald-600" />;
      case "rc-12":
        return <Layers3 size={15} className="text-amber-600" />;
      default:
        return <CheckCircle2 size={15} className="text-gray-500" />;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
      {DETAIL_READINESS_CARDS.map((card) => (
        <div
          key={card.id}
          onClick={() => card.targetTab && onSelectTab(card.targetTab)}
          className="bg-white rounded border border-gray-200 p-2.5 cursor-pointer hover:border-gray-400 transition-all shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-semibold text-gray-500 truncate">{card.label}</span>
            {getIcon(card.id)}
          </div>

          <div className="flex items-baseline justify-between">
            <span
              className={`text-xs font-black tracking-tight ${
                card.status === "good"
                  ? "text-emerald-700"
                  : card.status === "warning"
                  ? "text-amber-700"
                  : "text-rose-700"
              }`}
            >
              {card.value}
            </span>
            {card.actionText && (
              <span className="text-[10px] font-bold text-[#741d35] hover:underline">
                {card.actionText}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
