"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Plus,
  Move,
  GitMerge,
  Search,
} from "lucide-react";
import { HierarchyNode } from "@/types/categoryManagement";

interface CategoryHierarchyTreeProps {
  tree: HierarchyNode[];
  selectedNodeId: string;
  onSelectNode: (node: HierarchyNode) => void;
  onAddChild: (parentNode?: HierarchyNode) => void;
  onMoveNode: (node?: HierarchyNode) => void;
  onMergeNode: (node?: HierarchyNode) => void;
}

export const CategoryHierarchyTree: React.FC<CategoryHierarchyTreeProps> = ({
  tree,
  selectedNodeId,
  onSelectNode,
  onAddChild,
  onMoveNode,
  onMergeNode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "node-beauty": true,
    "node-skincare": true,
    "node-facecare": true,
  });

  const toggleExpand = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleExpandAll = () => {
    setExpandedNodes({
      "node-beauty": true,
      "node-skincare": true,
      "node-facecare": true,
      "node-makeup": true,
      "node-haircare": true,
    });
  };

  const handleCollapseAll = () => {
    setExpandedNodes({});
  };

  const renderNode = (node: HierarchyNode) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes[node.id] || false;
    const isSelected = selectedNodeId === node.id || (selectedNodeId === "cat-1" && node.name === "Face Serum");

    if (
      searchQuery &&
      !node.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !node.children?.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return null;
    }

    return (
      <div key={node.id} className="flex flex-col text-xs">
        <div
          onClick={() => onSelectNode(node)}
          className={`flex items-center justify-between py-1.5 px-2 rounded cursor-pointer transition-colors ${
            isSelected
              ? "bg-[#f5ebed] text-[#741d35] font-bold border-l-2 border-[#741d35]"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          style={{ paddingLeft: `${(node.level - 1) * 12 + 8}px` }}
        >
          <div className="flex items-center gap-1.5 truncate">
            {hasChildren ? (
              <button
                onClick={(e) => toggleExpand(node.id, e)}
                className="p-0.5 rounded text-gray-500 hover:text-gray-800"
              >
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            ) : (
              <span className="w-3.5 inline-block" />
            )}

            {isExpanded ? (
              <FolderOpen size={14} className={isSelected ? "text-[#741d35]" : "text-amber-500"} />
            ) : (
              <Folder size={14} className={isSelected ? "text-[#741d35]" : "text-amber-500"} />
            )}

            <span className="truncate">{node.name}</span>
          </div>

          <span className="text-[10.5px] font-semibold text-gray-400 pl-2">
            {node.productCount.toLocaleString()}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="flex flex-col">
            {node.children!.map((child) => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded border border-gray-200 p-3 flex flex-col gap-2.5 shadow-2xs h-full">
      {/* Header Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Category Hierarchy</h3>
        <div className="flex items-center gap-1 text-[10.5px] font-semibold text-[#741d35]">
          <button onClick={handleExpandAll} className="hover:underline">Expand All</button>
          <span>•</span>
          <button onClick={handleCollapseAll} className="hover:underline">Collapse All</button>
        </div>
      </div>

      {/* Toolbar actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onAddChild()}
          className="h-7 px-2 rounded border border-gray-300 text-[10.5px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1 shrink-0"
        >
          <Plus size={12} /> Add Child
        </button>
        <button
          onClick={() => onMoveNode()}
          className="h-7 px-2 rounded border border-gray-300 text-[10.5px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1 shrink-0"
        >
          <Move size={12} /> Move
        </button>
        <button
          onClick={() => onMergeNode()}
          className="h-7 px-2 rounded border border-gray-300 text-[10.5px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1 shrink-0"
        >
          <GitMerge size={12} /> Merge
        </button>
      </div>

      {/* Tree Search */}
      <div className="relative">
        <Search size={13} className="absolute left-2.5 top-2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Hierarchy"
          className="w-full h-7 pl-7 pr-2 rounded border border-gray-300 text-[11px] focus:outline-none focus:border-[#741d35]"
        />
      </div>

      {/* Tree Content */}
      <div className="flex flex-col gap-0.5 overflow-y-auto max-h-[500px] pr-1 no-scrollbar">
        {tree.map((rootNode) => renderNode(rootNode))}
      </div>
    </div>
  );
};
