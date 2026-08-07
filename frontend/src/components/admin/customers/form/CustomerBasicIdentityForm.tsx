"use client";

import React from "react";
import { CustomerBasicIdentityFormState } from "@/types/customer-form";
import { Calendar } from "lucide-react";

interface CustomerBasicIdentityFormProps {
  formState: CustomerBasicIdentityFormState;
  onChange: (field: keyof CustomerBasicIdentityFormState, value: string) => void;
  errors?: Record<string, string>;
}

export function CustomerBasicIdentityForm({
  formState,
  onChange,
  errors = {},
}: CustomerBasicIdentityFormProps) {
  const notesCharCount = formState.customerNotes ? formState.customerNotes.length : 0;

  return (
    <div className="bg-white border border-line rounded-lg p-4 sm:p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-line pb-2.5">
        <h3 className="text-xs font-black text-ink uppercase tracking-wider font-mono">
          1. Basic Identity
        </h3>
        <span className="text-[10.5px] text-slate-400 font-mono">
          Step 2 / 13 — Core Customer Demographics & Master Metadata
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-[11px]">
        {/* Title */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Title <span className="text-rose-500">*</span>
          </label>
          <select
            value={formState.title}
            onChange={(e) => onChange("title", e.target.value)}
            className="w-full h-8.5 px-2.5 rounded border border-line text-[11.5px] font-semibold text-slate-800 bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="">Select Title</option>
            <option value="Ms.">Ms.</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
          </select>
          {errors.title && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.title}</span>}
        </div>

        {/* First Name */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formState.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="e.g. Amaya"
            className="w-full h-8.5 px-2.5 rounded border border-line text-[11.5px] font-semibold text-slate-800 focus:outline-none focus:border-[#671021]"
          />
          {errors.firstName && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.firstName}</span>}
        </div>

        {/* Middle Name */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Middle Name
          </label>
          <input
            type="text"
            value={formState.middleName}
            onChange={(e) => onChange("middleName", e.target.value)}
            placeholder="e.g. Nimali"
            className="w-full h-8.5 px-2.5 rounded border border-line text-[11.5px] text-slate-800 focus:outline-none focus:border-[#671021]"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formState.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="e.g. Perera"
            className="w-full h-8.5 px-2.5 rounded border border-line text-[11.5px] font-semibold text-slate-800 focus:outline-none focus:border-[#671021]"
          />
          {errors.lastName && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.lastName}</span>}
        </div>

        {/* Display Name */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Display Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formState.displayName}
            onChange={(e) => onChange("displayName", e.target.value)}
            placeholder="e.g. Amaya P."
            className="w-full h-8.5 px-2.5 rounded border border-line text-[11.5px] font-semibold text-slate-800 focus:outline-none focus:border-[#671021]"
          />
          {errors.displayName && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.displayName}</span>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Date of Birth <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              required
              value={formState.dob}
              onChange={(e) => onChange("dob", e.target.value)}
              className="w-full h-8.5 px-2.5 rounded border border-line text-[11.5px] font-mono text-slate-800 focus:outline-none focus:border-[#671021]"
            />
          </div>
          {errors.dob && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.dob}</span>}
        </div>

        {/* Gender */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Gender <span className="text-rose-500">*</span>
          </label>
          <select
            value={formState.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className="w-full h-8.5 px-2.5 rounded border border-line text-[11.5px] font-semibold text-slate-800 bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.gender && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.gender}</span>}
        </div>

        {/* Preferred Language */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Preferred Language <span className="text-rose-500">*</span>
          </label>
          <select
            value={formState.preferredLanguage}
            onChange={(e) => onChange("preferredLanguage", e.target.value)}
            className="w-full h-8.5 px-2.5 rounded border border-line text-[11.5px] font-semibold text-slate-800 bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>

        {/* Nationality */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Nationality <span className="text-rose-500">*</span>
          </label>
          <select
            value={formState.nationality}
            onChange={(e) => onChange("nationality", e.target.value)}
            className="w-full h-8.5 px-2.5 rounded border border-line text-[11.5px] font-semibold text-slate-800 bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="Sri Lankan">Sri Lankan</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Occupation */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Occupation
          </label>
          <input
            type="text"
            value={formState.occupation}
            onChange={(e) => onChange("occupation", e.target.value)}
            placeholder="e.g. Consultant"
            className="w-full h-8.5 px-2.5 rounded border border-line text-[11.5px] text-slate-800 focus:outline-none focus:border-[#671021]"
          />
        </div>

        {/* Customer Notes (Spans 2 Cols) */}
        <div className="sm:col-span-2">
          <div className="flex justify-between items-center mb-1">
            <label className="block font-bold text-slate-800">
              Customer Notes
            </label>
            <span className="text-[10px] font-mono text-slate-400">
              {notesCharCount} / 500
            </span>
          </div>
          <textarea
            rows={2}
            maxLength={500}
            value={formState.customerNotes}
            onChange={(e) => onChange("customerNotes", e.target.value)}
            placeholder="High-value, repeat customer with strong purchase history..."
            className="w-full p-2.5 rounded border border-line text-[11.5px] text-slate-800 focus:outline-none focus:border-[#671021] resize-none"
          />
        </div>
      </div>
    </div>
  );
}
