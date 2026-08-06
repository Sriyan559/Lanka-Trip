"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import { FormulationIngredient } from "@/types/productForm";

interface IngredientFormDrawerProps {
  isOpen: boolean;
  ingredientToEdit: FormulationIngredient | null;
  onClose: () => void;
  onSave: (ingredient: FormulationIngredient) => void;
}

export const IngredientFormDrawer: React.FC<IngredientFormDrawerProps> = ({
  isOpen,
  ingredientToEdit,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [inci, setInci] = useState("");
  const [concentration, setConcentration] = useState(1.0);
  const [func, setFunc] = useState("Active");
  const [isRestricted, setIsRestricted] = useState(false);
  const [isAllergen, setIsAllergen] = useState(false);

  useEffect(() => {
    if (ingredientToEdit) {
      setName(ingredientToEdit.ingredientName);
      setInci(ingredientToEdit.inciName);
      setConcentration(ingredientToEdit.concentration);
      setFunc(ingredientToEdit.function);
      setIsRestricted(ingredientToEdit.isRestricted);
      setIsAllergen(ingredientToEdit.isAllergen);
    } else {
      setName("");
      setInci("");
      setConcentration(1.0);
      setFunc("Active");
      setIsRestricted(false);
      setIsAllergen(false);
    }
  }, [ingredientToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !inci.trim()) {
      toast.error("Please enter both Ingredient Name and INCI Name.");
      return;
    }
    if (concentration <= 0 || concentration > 100) {
      toast.error("Concentration must be between 0.01% and 100%.");
      return;
    }

    const saved: FormulationIngredient = {
      id: ingredientToEdit ? ingredientToEdit.id : `ing-${Date.now()}`,
      rowNumber: ingredientToEdit ? ingredientToEdit.rowNumber : 99,
      ingredientName: name.trim(),
      inciName: inci.trim(),
      concentration: Number(concentration),
      function: func,
      isRestricted,
      isAllergen,
      safetyStatus: isRestricted ? "Requires Review" : "Safe",
      evidenceStatus: isRestricted ? "Missing" : "N/A",
    };

    onSave(saved);
    toast.success(ingredientToEdit ? "Updated formulation ingredient." : "Added new ingredient to matrix.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between relative overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#f5ebed] text-[#741d35] flex items-center justify-center">
                {ingredientToEdit ? <Edit2 size={15} /> : <Plus size={15} />}
              </div>
              <h3 className="text-base font-bold text-gray-900">
                {ingredientToEdit ? "Edit Formulation Ingredient" : "Add Formulation Ingredient"}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Ingredient Common Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Niacinamide"
                className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">INCI Nomenclature *</label>
              <input
                type="text"
                required
                value={inci}
                onChange={(e) => setInci(e.target.value)}
                placeholder="e.g. Nicotinamide"
                className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Concentration (%) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="100"
                  required
                  value={concentration}
                  onChange={(e) => setConcentration(parseFloat(e.target.value) || 0)}
                  className="w-full h-9 px-3 rounded border border-gray-300 text-xs font-bold focus:outline-none focus:border-[#741d35]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Function</label>
                <select
                  value={func}
                  onChange={(e) => setFunc(e.target.value)}
                  className="w-full h-9 px-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
                >
                  <option value="Antioxidant">Antioxidant</option>
                  <option value="Humectant">Humectant</option>
                  <option value="Solvent">Solvent</option>
                  <option value="Active">Active</option>
                  <option value="Emulsifier">Emulsifier</option>
                  <option value="Preservative">Preservative</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                <input
                  type="checkbox"
                  checked={isRestricted}
                  onChange={(e) => setIsRestricted(e.target.checked)}
                  className="w-4 h-4 accent-[#741d35] rounded"
                />
                <span>Restricted / Controlled Substance (Requires Safety Evidence)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                <input
                  type="checkbox"
                  checked={isAllergen}
                  onChange={(e) => setIsAllergen(e.target.checked)}
                  className="w-4 h-4 accent-[#741d35] rounded"
                />
                <span>Declared Fragrance Allergen</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-2 text-xs">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 px-4 rounded bg-[#741d35] text-white font-bold hover:bg-[#5c172a]"
            >
              {ingredientToEdit ? "Save Changes" : "Add to Matrix"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
