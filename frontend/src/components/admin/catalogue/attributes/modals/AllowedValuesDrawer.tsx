"use client";

import React, { useEffect, useState } from "react";
import { X, Plus, Trash2, Sliders } from "lucide-react";
import toast from "react-hot-toast";
import { CatalogueAttribute } from "@/types/attributeManagement";

interface AllowedValuesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  attribute: CatalogueAttribute | null;
  onSave: (values: string[]) => Promise<unknown>;
}

export const AllowedValuesDrawer: React.FC<AllowedValuesDrawerProps> = ({
  isOpen,
  onClose,
  attribute, onSave,
}) => {
  const [newValue, setNewValue] = useState("");
  const [valuesList, setValuesList] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  useEffect(() => setValuesList(attribute?.allowedValues || []), [attribute, isOpen]);

  if (!isOpen || !attribute) return null;

  const handleAddValue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue.trim()) return;
    if (valuesList.includes(newValue.trim())) {
      toast.error(`Value "${newValue}" already exists.`);
      return;
    }
    setValuesList((prev) => [...prev, newValue.trim()]);
    setNewValue("");
    toast.success(`Added value "${newValue.trim()}"`);
  };

  const handleRemoveValue = (val: string) => {
    setValuesList((prev) => prev.filter((item) => item !== val));
    toast.success(`Removed value "${val}"`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <Sliders size={18} className="text-[#741d35]" />
              <div>
                <h3 className="text-sm font-bold text-gray-900">Allowed Values — {attribute.attributeName}</h3>
                <span className="text-[10.5px] font-mono text-gray-500">{attribute.attributeId}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 rounded">
              <X size={16} />
            </button>
          </div>

          {/* Add Value Form */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <form onSubmit={handleAddValue} className="flex gap-2">
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Enter new allowed value..."
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#741d35] text-white text-xs font-bold rounded hover:bg-[#5c172a] flex items-center gap-1 shrink-0"
              >
                <Plus size={14} /> Add
              </button>
            </form>
          </div>

          {/* List of Allowed Values */}
          <div className="p-4 flex flex-col gap-1.5 max-h-[450px] overflow-y-auto text-xs">
            {valuesList.map((val, idx) => (
              <div
                key={idx}
                className="p-2 rounded border border-gray-200 bg-white flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">{val}</span>
                <button
                  onClick={() => handleRemoveValue(val)}
                  className="p-1 text-gray-400 hover:text-rose-600 rounded"
                  title="Delete Value"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Total: {valuesList.length} values</span>
          <button
            disabled={saving}
            onClick={async () => { setSaving(true); try { await onSave(valuesList); } finally { setSaving(false); } }}
            className="px-4 py-1.5 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a]"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
