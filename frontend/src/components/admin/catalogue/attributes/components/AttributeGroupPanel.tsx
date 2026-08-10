"use client";

import React from "react";
import { Folder } from "lucide-react";
import { AttributeGroupItem } from "@/types/attributeManagement";

interface AttributeGroupPanelProps {
  groups: AttributeGroupItem[];
  selectedGroupName: string;
  onSelectGroup: (groupName: string) => void;
}

export const AttributeGroupPanel: React.FC<AttributeGroupPanelProps> = ({
  groups,
  selectedGroupName,
  onSelectGroup,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs flex flex-col justify-between h-full min-w-0">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
            <Folder size={14} className="text-[#741d35]" />
            Attribute Groups &amp; Templates
          </h3>
          <span className="text-[11px] font-bold text-gray-400">{groups.length}</span>
        </div>

        {/* Group List */}
        <div className="flex flex-col gap-1 text-xs">
          {groups.map((grp) => {
            const isSelected = selectedGroupName.toLowerCase() === grp.groupName.toLowerCase();

            return (
              <div
                key={grp.id}
                onClick={() => onSelectGroup(grp.groupName)}
                className={`p-2.5 rounded flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-[#f5ebed] text-[#741d35] font-bold border border-[#741d35]/30"
                    : "hover:bg-gray-50 text-gray-700 font-medium border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 pr-1 min-w-0">
                  <Folder size={13} className={isSelected ? "text-[#741d35] shrink-0" : "text-gray-400 shrink-0"} />
                  <span className="truncate text-[11.5px]" title={grp.groupName}>
                    {grp.groupName}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[10.5px] text-gray-500">{grp.attributeCount}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    ▲ {grp.readinessPercent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-[10px] text-gray-400">Templates are unavailable because no authoritative template schema is installed.</p>
    </div>
  );
};
