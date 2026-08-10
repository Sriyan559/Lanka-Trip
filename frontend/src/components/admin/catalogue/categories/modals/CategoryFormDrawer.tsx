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
  onSave: (data: Partial<CategoryItem>) => Promise<void>;
  parentOptions: Array<{ id: string; name: string }>;
}

export const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({
  isOpen,
  onClose,
  initialData,
  mode,
  onSave,
  parentOptions,
}) => {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<CategoryItem>>({
    categoryName: "",
    categoryId: "",
    parentCategory: "Root",
    description: "",
    status: "Active",
    owner: "Unavailable",
    slug: "",
    requiredAttributesCount: 0,
    attributeCoveragePercent: null,
    seoReadinessPercent: null,
    channelEligibilityText: "Unavailable",
    complianceStatus: "Unavailable",
    riskLevel: "Unavailable",
  });

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else if (mode === "create") {
      setFormData({
        categoryName: "",
        categoryId: "Assigned on create",
        parentCategory: initialData?.categoryName || "Root",
        parentId: initialData?.id || null,
        level: initialData ? initialData.level + 1 : 4,
        description: "",
        status: "Active",
        owner: "Unavailable",
        slug: "",
        requiredAttributesCount: 0,
        attributeCoveragePercent: null,
        seoReadinessPercent: null,
        channelEligibilityText: "Unavailable",
        complianceStatus: "Unavailable",
        riskLevel: "Unavailable",
      });
    }
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryName) {
      toast.error("Category name is required!");
      return;
    }
    setSaving(true);
    try { await onSave(formData); onClose(); } catch { /* caller displays the API error */ } finally { setSaving(false); }
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
                disabled
                value={formData.categoryId || ""}
                className="w-full h-8 px-2.5 border border-gray-200 rounded bg-gray-100 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Parent Category</label>
              <select
                value={formData.parentId || ""}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value || null, parentCategory: parentOptions.find(p=>p.id===e.target.value)?.name || "Root" })}
                className="w-full h-8 px-2.5 border border-gray-300 rounded focus:border-[#741d35] focus:outline-none"
              >
                <option value="">Root</option>
                {parentOptions.filter(p=>p.id!==initialData?.id).map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Category Level</label>
              <input
                type="number"
                disabled
                value={formData.level || 4}
                className="w-full h-8 px-2.5 border border-gray-200 bg-gray-100 rounded"
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
                <option value="Inactive">Inactive</option>
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
              value="Unavailable — no category ownership field"
              disabled
              className="w-full h-8 px-2.5 border border-gray-200 rounded bg-gray-100"
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
            disabled={saving}
            className="h-8 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a] flex items-center gap-1.5 shadow-2xs disabled:opacity-60"
          >
            <Save size={13} />
            <span>{mode === "create" ? "Create Category" : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
