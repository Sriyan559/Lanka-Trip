"use client";

import React, { useState } from "react";
import {
  Plus,
  Upload,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Edit2,
  Trash2,
  ExternalLink,
  Edit3,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  FormulationIngredient,
  SafetyDeclarationCard,
  SafetyValidationFindings,
  ProductStepId,
} from "@/types/productForm";

interface Step5IngredientsSafetyProps {
  ingredients: FormulationIngredient[];
  declarations: SafetyDeclarationCard[];
  findings: SafetyValidationFindings;
  onAddIngredient: () => void;
  onEditIngredient: (ingredient: FormulationIngredient) => void;
  onDeleteIngredient: (ingredientId: string) => void;
  onImportList: () => void;
  onValidateInci: () => void;
  onUploadEvidence: () => void;
  onEditDeclaration: (declaration: SafetyDeclarationCard) => void;
  onFixFinding: (targetStep: ProductStepId) => void;
}

export const Step5IngredientsSafety: React.FC<Step5IngredientsSafetyProps> = ({
  ingredients,
  declarations,
  findings,
  onAddIngredient,
  onEditIngredient,
  onDeleteIngredient,
  onImportList,
  onValidateInci,
  onUploadEvidence,
  onEditDeclaration,
  onFixFinding,
}) => {
  const totalConcentration = ingredients.reduce((sum, ing) => sum + ing.concentration, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Formulation Matrix Section */}
      <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xs font-bold text-gray-900">Formulation Matrix</h3>
            <p className="text-[11.5px] text-gray-500">Declare all active and inactive compounds.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onAddIngredient}
              className="h-8 px-3 rounded bg-white border border-gray-300 text-[11.5px] font-bold text-[#741d35] hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Plus size={14} />
              <span>Add Ingredient</span>
            </button>

            <button
              onClick={onImportList}
              className="h-8 px-3 rounded bg-white border border-gray-300 text-[11.5px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Upload size={14} className="text-gray-500" />
              <span>Import Ingredient List</span>
            </button>

            <button
              onClick={onValidateInci}
              className="h-8 px-3 rounded bg-white border border-gray-300 text-[11.5px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Validate INCI</span>
            </button>
          </div>
        </div>

        {/* Formulation Matrix Table */}
        <div className="overflow-x-auto border border-gray-200 rounded mb-3">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[9.5px]">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Ingredient Name</th>
                <th className="py-2 px-3">INCI Name</th>
                <th className="py-2 px-3 text-right">Concentration</th>
                <th className="py-2 px-3">Function</th>
                <th className="py-2 px-3 text-center">Restricted</th>
                <th className="py-2 px-3 text-center">Allergen</th>
                <th className="py-2 px-3">Safety Status</th>
                <th className="py-2 px-3">Evidence</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ingredients.map((ing) => (
                <tr key={ing.id} className="hover:bg-gray-50/80">
                  <td className="py-2.5 px-3 font-semibold text-gray-500">{ing.rowNumber}</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">{ing.ingredientName}</td>
                  <td className="py-2.5 px-3 font-mono text-gray-600 text-[10.5px]">{ing.inciName}</td>
                  <td className="py-2.5 px-3 text-right font-extrabold text-gray-900">
                    {ing.concentration.toFixed(2)}%
                  </td>
                  <td className="py-2.5 px-3 text-gray-700">{ing.function}</td>
                  <td className="py-2.5 px-3 text-center">
                    {ing.isRestricted ? (
                      <span title="Restricted Compound">
                        <AlertTriangle size={15} className="text-rose-500 mx-auto" />
                      </span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center text-gray-600">
                    {ing.isAllergen ? <span className="font-bold text-amber-600">Yes</span> : "No"}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1 ${
                        ing.safetyStatus === "Safe"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {ing.safetyStatus === "Safe" ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                      {ing.safetyStatus}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    {ing.evidenceStatus === "Verified" ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[10.5px]">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    ) : ing.evidenceStatus === "Missing" ? (
                      <button
                        onClick={onUploadEvidence}
                        className="text-rose-600 font-bold flex items-center gap-1 text-[10.5px] hover:underline"
                      >
                        <AlertTriangle size={12} /> Missing
                      </button>
                    ) : (
                      <span className="text-gray-400 text-[10.5px]">N/A</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onEditIngredient(ing)}
                        title="Edit Ingredient"
                        className="p-1 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={onUploadEvidence}
                        title="Upload Evidence"
                        className="p-1 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Upload size={13} />
                      </button>
                      <button
                        onClick={() => onDeleteIngredient(ing.id)}
                        title="Delete Ingredient"
                        className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-2 text-gray-600">
            <span>Total Formulation Concentration:</span>
            <span
              className={`font-black text-xs ${
                totalConcentration === 99.0 || totalConcentration === 100.0
                  ? "text-emerald-700"
                  : "text-amber-600"
              }`}
            >
              {totalConcentration.toFixed(2)}%
            </span>
            {totalConcentration < 100 && (
              <span className="text-[10.5px] text-gray-400">(Includes vehicle base compounds)</span>
            )}
          </div>

          <button
            onClick={() => toast("Opening full INCI ingredient analysis report.", { icon: "🧪" })}
            className="text-[11px] font-semibold text-[#741d35] hover:underline text-left sm:text-right"
          >
            View full ingredient analysis &rarr;
          </button>
        </div>
      </div>

      {/* 2. Safety & Compliance Declarations Grid & Automated Validation Findings */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Declarations 11-Card Grid */}
        <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs flex flex-col gap-4">
          <h3 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
            Safety & Compliance Declarations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {declarations.map((card) => (
              <div
                key={card.id}
                className="bg-gray-50/70 rounded border border-gray-200 p-3 flex flex-col justify-between hover:border-gray-300 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">
                    {card.title}
                  </span>
                  {card.editable && (
                    <button
                      onClick={() => onEditDeclaration(card)}
                      className="p-1 text-gray-400 hover:text-[#741d35] rounded hover:bg-gray-200/60"
                      title="Edit declaration"
                    >
                      <Edit3 size={13} />
                    </button>
                  )}
                </div>

                <div
                  className={`text-xs font-black ${
                    card.status === "good"
                      ? "text-emerald-700"
                      : card.status === "warning"
                      ? "text-amber-600"
                      : card.status === "alert"
                      ? "text-rose-600"
                      : "text-gray-700"
                  }`}
                >
                  {card.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Safety Validation Findings Panel */}
        <div className="bg-white rounded border border-gray-200 p-5 shadow-2xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h3 className="text-xs font-bold text-gray-900">Automated Safety Validation Findings</h3>
            <button
              onClick={onValidateInci}
              className="text-gray-400 hover:text-gray-600"
              title="Re-run INCI safety checks"
            >
              <CheckCircle2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1 text-center bg-gray-50 p-2 rounded text-[10.5px]">
            <div>
              <span className="text-gray-400 block text-[9px] uppercase font-semibold">Total Checks</span>
              <span className="font-extrabold text-gray-800">{findings.totalChecks}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px] uppercase font-semibold">Passed</span>
              <span className="font-bold text-emerald-700">{findings.passedCount}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px] uppercase font-semibold">Warnings</span>
              <span className="font-bold text-amber-600">{findings.warningsCount}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px] uppercase font-semibold">Failed</span>
              <span className="font-bold text-rose-600">{findings.failedCount}</span>
            </div>
          </div>

          <div className="text-[11px] font-bold text-rose-600 bg-rose-50 p-2 rounded border border-rose-200 text-center">
            Status: {findings.statusText}
          </div>

          <div className="space-y-2 text-[11px] pt-1">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Top Corrective Actions</div>
            {findings.topActions.map((action) => (
              <div
                key={action.id}
                className="p-2 rounded bg-gray-50 border border-gray-200 flex items-center justify-between gap-2"
              >
                <span className="font-semibold text-gray-800 text-[10.5px]">{action.description}</span>
                <button
                  onClick={() => onFixFinding(action.targetStep)}
                  className="px-2 py-0.5 rounded bg-[#741d35] text-white font-bold text-[10px] hover:bg-[#5c172a]"
                >
                  {action.actionLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
