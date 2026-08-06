"use client";

import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import toast from "react-hot-toast";
import { CategoryItem } from "@/types/categoryManagement";

interface CategoryFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CategoryItem | null;
  mode: "create" | "edit";
  onSave: (data: Partial<CategoryItem>) => void;
}

export const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({
  isOpen,
  onClose,
  initialData,
  mode,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<CategoryItem>>({
    categoryName: "",
    categoryId: "",
    parentCategory: "Face Care",
    level: 4,
    description: "",
    status: "Active",
    owner: "Elena Vance",
    slug: "",
    requiredAttributesCount: 10,
    attributeCoveragePercent: 85,
    seoReadinessPercent: 80,
    channelEligibilityText: "5/5",
    complianceStatus: "Configured",
    riskLevel: "Low",
  });

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else if (mode === "create") {
      setFormData({
        categoryName: "",
        categoryId: `CAT-SKN-00${Math.floor(Math.random() * 90 + 10)}`,
        parentCategory: initialData?.categoryName || "Face Care",
        level: initialData ? initialData.level + 1 : 4,
        description: "",
        status: "Active",
        owner: "Elena Vance",
        slug: "",
        requiredAttributesCount: 10,
        attributeCoveragePercent: 85,
        seoReadinessPercent: 80,
        channelEligibilityText: "5/5",
        complianceStatus: "Configured",
        riskLevel: "Low",
      });
    }
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryName) {
      toast.error("Category name is required!");
      return;
    }
    if (!formData.categoryId) {
      toast.error("Category ID is required!");
      return;
    }

    onSave(formData);
    toast.success(`Category ${mode === "create" ? "created" : "updated"} successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900">
            {mode === "create" ? "Create New Category" : `Edit Category — ${formData.categoryName}`}
          </h2>
          <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form id="categoryForm" onSubmit={handleSubmit} className="p-4 flex-1 overflow-y-auto space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Category Name *</label>
            <input
              type="text"
              required
              value={formData.categoryName || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categoryName: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                })
              }
              placeholder="e.g. Face Serum"
              className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Category ID *</label>
              <input
                type="text"
                required
                value={formData.categoryId || ""}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Parent Category</label>
              <select
                value={formData.parentCategory || "Face Care"}
                onChange={(e) => setFormData({ ...formData, parentCategory: e.target.value })}
                className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none"
              >
                <option value="Beauty">Beauty (Root)</option>
                <option value="Skincare">Skincare</option>
                <option value="Face Care">Face Care</option>
                <option value="Makeup">Makeup</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Category Level</label>
              <input
                type="number"
                min={1}
                max={5}
                value={formData.level || 4}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) || 4 })}
                className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Status</label>
              <select
                value={formData.status || "Active"}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Review Required">Review Required</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Slug</label>
            <input
              type="text"
              value={formData.slug || ""}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Owner</label>
            <input
              type="text"
              value={formData.owner || "Elena Vance"}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter category scope and merchandise instructions..."
              className="w-full p-2 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none text-xs"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-8 px-3 rounded border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            form="categoryForm"
            type="submit"
            className="h-8 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a] flex items-center gap-1.5 shadow-2xs"
          >
            <Save size={13} />
            <span>{mode === "create" ? "Create Category" : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
