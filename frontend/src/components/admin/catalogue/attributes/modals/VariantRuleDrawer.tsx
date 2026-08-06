"use client";

import React, { useState, useEffect } from "react";
import { X, Layers } from "lucide-react";
import toast from "react-hot-toast";
import { VariantGenerationRule } from "@/types/attributeManagement";

interface VariantRuleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  ruleToEdit: VariantGenerationRule | null;
  onSaveRule: (rule: Partial<VariantGenerationRule>) => void;
}

export const VariantRuleDrawer: React.FC<VariantRuleDrawerProps> = ({
  isOpen,
  onClose,
  ruleToEdit,
  onSaveRule,
}) => {
  const [ruleName, setRuleName] = useState("");
  const [conditionText, setConditionText] = useState("");
  const [resultType, setResultType] = useState("Variant");
  const [status, setStatus] = useState<"Active" | "Draft" | "Inactive">("Active");

  useEffect(() => {
    if (ruleToEdit) {
      setRuleName(ruleToEdit.ruleName);
      setConditionText(ruleToEdit.conditionText);
      setResultType(ruleToEdit.resultType);
      setStatus(ruleToEdit.status);
    } else {
      setRuleName("");
      setConditionText("Shade AND Size");
      setResultType("Variant");
      setStatus("Active");
    }
  }, [ruleToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName.trim()) {
      toast.error("Please enter a Rule Name.");
      return;
    }

    onSaveRule({
      ruleName,
      conditionText,
      resultType,
      status,
    });

    toast.success(ruleToEdit ? `Updated variant rule "${ruleName}"!` : `Created variant rule "${ruleName}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-[#741d35]" />
              <h3 className="text-sm font-bold text-gray-900">
                {ruleToEdit ? "Edit Variant Rule" : "Create Variant Rule"}
              </h3>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 rounded">
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <form id="variant-rule-form" onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Rule Name *</label>
              <input
                type="text"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder="e.g. Shade + Size Combination"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Condition Expression *</label>
              <input
                type="text"
                value={conditionText}
                onChange={(e) => setConditionText(e.target.value)}
                placeholder="e.g. Shade AND Size"
                className="w-full px-3 py-1.5 border border-gray-300 rounded font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Result Type</label>
                <input
                  type="text"
                  value={resultType}
                  onChange={(e) => setResultType(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Rule Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Active" | "Draft" | "Inactive")}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded border border-gray-200 text-[11px] text-gray-600">
              Rule preview: <strong className="text-gray-800 font-mono">IF {conditionText || "conditions"} THEN generate {resultType}</strong>
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
            form="variant-rule-form"
            className="px-4 py-1.5 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a]"
          >
            {ruleToEdit ? "Update Rule" : "Save Rule"}
          </button>
        </div>
      </div>
    </div>
  );
};
