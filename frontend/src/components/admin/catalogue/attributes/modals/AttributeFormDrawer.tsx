"use client";

import React, { useState, useEffect } from "react";
import { X, Layers, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { CatalogueAttribute, AttributeDataType, AttributeInputType } from "@/types/attributeManagement";

interface AttributeFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  attributeToEdit: CatalogueAttribute | null;
  onSave: (attr: Partial<CatalogueAttribute>) => void;
  existingAttributes: CatalogueAttribute[];
}

export const AttributeFormDrawer: React.FC<AttributeFormDrawerProps> = ({
  isOpen,
  onClose,
  attributeToEdit,
  onSave,
  existingAttributes,
}) => {
  const [attributeName, setAttributeName] = useState("");
  const [attributeId, setAttributeId] = useState("");
  const [groupName, setGroupName] = useState("Variants & Attributes");
  const [dataType, setDataType] = useState<AttributeDataType>("Text");
  const [inputType, setInputType] = useState<AttributeInputType>("Dropdown");
  const [isRequired, setIsRequired] = useState(true);
  const [isVariantGenerating, setIsVariantGenerating] = useState(true);
  const [owner, setOwner] = useState("Elena Vance");
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    if (attributeToEdit) {
      setAttributeName(attributeToEdit.attributeName);
      setAttributeId(attributeToEdit.attributeId);
      setGroupName(attributeToEdit.groupName);
      setDataType(attributeToEdit.dataType);
      setInputType(attributeToEdit.inputType);
      setIsRequired(attributeToEdit.isRequired);
      setIsVariantGenerating(attributeToEdit.isVariantGenerating);
      setOwner(attributeToEdit.owner);
      setDefinition(attributeToEdit.definition || "");
    } else {
      setAttributeName("");
      setAttributeId(`ATTR-0${Math.floor(100 + Math.random() * 900)}`);
      setGroupName("Variants & Attributes");
      setDataType("Text");
      setInputType("Dropdown");
      setIsRequired(true);
      setIsVariantGenerating(true);
      setOwner("Elena Vance");
      setDefinition("");
    }
  }, [attributeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attributeName.trim()) {
      toast.error("Please enter an Attribute Name.");
      return;
    }
    if (!attributeId.trim()) {
      toast.error("Please enter an Attribute ID.");
      return;
    }

    // Check duplicate ID if new
    if (!attributeToEdit && existingAttributes.some((a) => a.attributeId.toLowerCase() === attributeId.toLowerCase())) {
      toast.error(`Attribute ID ${attributeId} already exists!`);
      return;
    }

    onSave({
      attributeName,
      attributeId,
      groupName,
      dataType,
      inputType,
      isRequired,
      isVariantGenerating,
      owner,
      definition,
    });

    toast.success(attributeToEdit ? `Updated attribute "${attributeName}"!` : `Created attribute "${attributeName}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-[#741d35]" />
              <h3 className="text-sm font-bold text-gray-900">
                {attributeToEdit ? "Edit Attribute Master" : "Create New Attribute Master"}
              </h3>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 rounded">
              <X size={16} />
            </button>
          </div>

          {/* Form Body */}
          <form id="attribute-form" onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Attribute Name *</label>
              <input
                type="text"
                value={attributeName}
                onChange={(e) => setAttributeName(e.target.value)}
                placeholder="e.g. Shade Name"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Attribute ID *</label>
                <input
                  type="text"
                  value={attributeId}
                  onChange={(e) => setAttributeId(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Attribute Group *</label>
                <select
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="Product Identity">Product Identity</option>
                  <option value="Classification">Classification</option>
                  <option value="Skin & Beauty">Skin & Beauty</option>
                  <option value="Ingredients & Safety">Ingredients & Safety</option>
                  <option value="Variants & Attributes">Variants & Attributes</option>
                  <option value="Pricing & Tax">Pricing & Tax</option>
                  <option value="Media">Media</option>
                  <option value="Publication">Publication</option>
                  <option value="Inventory">Inventory</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Data Type *</label>
                <select
                  value={dataType}
                  onChange={(e) => setDataType(e.target.value as AttributeDataType)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="Text">Text</option>
                  <option value="Number">Number</option>
                  <option value="Boolean">Boolean</option>
                  <option value="Date">Date</option>
                  <option value="Select">Select</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Input Control Type *</label>
                <select
                  value={inputType}
                  onChange={(e) => setInputType(e.target.value as AttributeInputType)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="Dropdown">Dropdown</option>
                  <option value="Multi-select">Multi-select</option>
                  <option value="Text">Text</option>
                  <option value="Number">Number</option>
                  <option value="Radio">Radio</option>
                  <option value="Checkbox">Checkbox</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-800">
                <input
                  type="checkbox"
                  checked={isRequired}
                  onChange={(e) => setIsRequired(e.target.checked)}
                  className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35]"
                />
                Required Attribute
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-800">
                <input
                  type="checkbox"
                  checked={isVariantGenerating}
                  onChange={(e) => setIsVariantGenerating(e.target.checked)}
                  className="rounded border-gray-300 text-[#741d35] focus:ring-[#741d35]"
                />
                Variant-Generating Attribute
              </label>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Attribute Owner *</label>
              <select
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              >
                <option value="Elena Vance">Elena Vance</option>
                <option value="Marcus Lee">Marcus Lee</option>
                <option value="Priya Kapoor">Priya Kapoor</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Definition &amp; Governance Notes</label>
              <textarea
                rows={3}
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="Describe attribute purpose, usage scope and channel requirements..."
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="attribute-form"
            className="px-4 py-1.5 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a]"
          >
            {attributeToEdit ? "Update Attribute" : "Save Attribute"}
          </button>
        </div>
      </div>
    </div>
  );
};
