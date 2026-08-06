"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { CatalogueBrand, BrandVerificationStatus, BrandAuthorizationStatus, BrandComplianceStatus, BrandRiskLevel } from "@/types/brandManagement";

interface BrandFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  brandToEdit?: CatalogueBrand | null;
  onSave: (brandData: Partial<CatalogueBrand>) => void;
  existingBrands: CatalogueBrand[];
}

export const BrandFormDrawer: React.FC<BrandFormDrawerProps> = ({
  isOpen,
  onClose,
  brandToEdit,
  onSave,
  existingBrands,
}) => {
  const [formData, setFormData] = useState({
    brandName: "",
    brandId: "",
    legalOwner: "",
    manufacturer: "",
    primarySupplier: "Luxe Distribution Pte Ltd",
    country: "USA",
    territory: "Global",
    brandOwner: "Elena Vance",
    verificationStatus: "Verified" as BrandVerificationStatus,
    authorizationStatus: "Valid" as BrandAuthorizationStatus,
    authorizationStartDate: "2024-01-01",
    authorizationExpiryDate: "2027-12-31",
    channelEligibility: "5 / 5",
    complianceStatus: "Compliant" as BrandComplianceStatus,
    riskLevel: "Low" as BrandRiskLevel,
    description: "",
    website: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (brandToEdit) {
      setFormData({
        brandName: brandToEdit.brandName,
        brandId: brandToEdit.brandId,
        legalOwner: brandToEdit.legalOwner,
        manufacturer: brandToEdit.manufacturer || brandToEdit.legalOwner,
        primarySupplier: brandToEdit.primarySupplier,
        country: brandToEdit.country,
        territory: brandToEdit.territory,
        brandOwner: brandToEdit.brandOwner,
        verificationStatus: brandToEdit.verificationStatus,
        authorizationStatus: brandToEdit.authorizationStatus,
        authorizationStartDate: brandToEdit.authorizationStartDate || "2024-01-01",
        authorizationExpiryDate: brandToEdit.authorizationExpiryDate || "2027-12-31",
        channelEligibility: brandToEdit.channelEligibility,
        complianceStatus: brandToEdit.complianceStatus,
        riskLevel: brandToEdit.riskLevel,
        description: brandToEdit.description || "",
        website: brandToEdit.website || "",
      });
    } else {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setFormData({
        brandName: "",
        brandId: `BRD-24-${randomNum}`,
        legalOwner: "",
        manufacturer: "",
        primarySupplier: "Luxe Distribution Pte Ltd",
        country: "USA",
        territory: "Global",
        brandOwner: "Elena Vance",
        verificationStatus: "Verified",
        authorizationStatus: "Valid",
        authorizationStartDate: "2024-01-01",
        authorizationExpiryDate: "2027-12-31",
        channelEligibility: "5 / 5",
        complianceStatus: "Compliant",
        riskLevel: "Low",
        description: "",
        website: "",
      });
    }
    setErrors({});
  }, [brandToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.brandName.trim()) newErrors.brandName = "Brand Name is required.";
    if (!formData.brandId.trim()) newErrors.brandId = "Brand ID is required.";
    if (!formData.legalOwner.trim()) newErrors.legalOwner = "Legal Owner is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";

    // Duplicate check
    const duplicate = existingBrands.find(
      (b) =>
        b.brandId.toLowerCase() === formData.brandId.toLowerCase() &&
        b.id !== brandToEdit?.id
    );
    if (duplicate) newErrors.brandId = "Brand ID must be unique.";

    // Expiry date check
    if (
      formData.authorizationStartDate &&
      formData.authorizationExpiryDate &&
      formData.authorizationExpiryDate <= formData.authorizationStartDate
    ) {
      newErrors.authorizationExpiryDate = "Expiry date must be after start date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please resolve form validation errors before saving.");
      return;
    }

    const initials = formData.brandName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "BR";

    onSave({
      ...formData,
      initials,
      activeProductsCount: brandToEdit?.activeProductsCount || 0,
      categoriesCount: brandToEdit?.categoriesCount || 1,
      catalogueReadinessPercent: brandToEdit?.catalogueReadinessPercent || 85,
      duplicateRisk: brandToEdit?.duplicateRisk || "Low",
      eligibleChannelsCount: parseInt(formData.channelEligibility[0]) || 5,
      totalChannelsCount: 5,
      updatedAt: "Just now",
    });

    toast.success(brandToEdit ? "Brand updated successfully!" : "Brand created successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#741d35]" />
                {brandToEdit ? "Edit Brand Master" : "Create New Brand Master"}
              </h2>
              <p className="text-[11px] text-gray-500">
                Configure brand metadata, legal owner, supplier mapping, and authorization parameters.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 text-xs">
            {/* Brand Name & ID */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Brand Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  placeholder="e.g. Estée Lauder"
                  className={`w-full px-3 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35] ${
                    errors.brandName ? "border-rose-500 bg-rose-50" : "border-gray-300 bg-white"
                  }`}
                />
                {errors.brandName && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.brandName}</span>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Brand ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.brandId}
                  onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                  placeholder="e.g. BRD-24-0124"
                  className={`w-full px-3 py-1.5 border rounded text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#741d35] ${
                    errors.brandId ? "border-rose-500 bg-rose-50" : "border-gray-300 bg-white"
                  }`}
                />
                {errors.brandId && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.brandId}</span>}
              </div>
            </div>

            {/* Legal Owner & Manufacturer */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Legal Owner <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.legalOwner}
                  onChange={(e) => setFormData({ ...formData, legalOwner: e.target.value })}
                  placeholder="e.g. Estée Lauder Companies Inc."
                  className={`w-full px-3 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35] ${
                    errors.legalOwner ? "border-rose-500 bg-rose-50" : "border-gray-300 bg-white"
                  }`}
                />
                {errors.legalOwner && <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.legalOwner}</span>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Manufacturer</label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  placeholder="e.g. Estée Lauder Companies Inc."
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                />
              </div>
            </div>

            {/* Supplier & Country */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Primary Supplier</label>
                <select
                  value={formData.primarySupplier}
                  onChange={(e) => setFormData({ ...formData, primarySupplier: e.target.value })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="Luxe Distribution Pte Ltd">Luxe Distribution Pte Ltd</option>
                  <option value="Glow Global Exports">Glow Global Exports</option>
                  <option value="Shiseido Global">Shiseido Global</option>
                  <option value="Beauty Asia Pte Ltd">Beauty Asia Pte Ltd</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Country <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="USA">USA</option>
                  <option value="Japan">Japan</option>
                  <option value="France">France</option>
                  <option value="Korea">Korea</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>

            {/* Territory & Brand Owner */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Territory</label>
                <select
                  value={formData.territory}
                  onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="Global">Global</option>
                  <option value="APAC">APAC</option>
                  <option value="EMEA">EMEA</option>
                  <option value="LATAM">LATAM</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Brand Owner</label>
                <select
                  value={formData.brandOwner}
                  onChange={(e) => setFormData({ ...formData, brandOwner: e.target.value })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="Elena Vance">Elena Vance</option>
                  <option value="Marcus Lee">Marcus Lee</option>
                  <option value="Priya Kapoor">Priya Kapoor</option>
                </select>
              </div>
            </div>

            {/* Verification & Authorization Status */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Verification Status</label>
                <select
                  value={formData.verificationStatus}
                  onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value as BrandVerificationStatus })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending Verification</option>
                  <option value="Unverified">Unverified</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Authorization Status</label>
                <select
                  value={formData.authorizationStatus}
                  onChange={(e) => setFormData({ ...formData, authorizationStatus: e.target.value as BrandAuthorizationStatus })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="Valid">Valid</option>
                  <option value="Expiring Soon">Expiring Soon</option>
                  <option value="Conditional">Conditional</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>

            {/* Authorization Start & Expiry Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Authorization Start Date</label>
                <input
                  type="date"
                  value={formData.authorizationStartDate}
                  onChange={(e) => setFormData({ ...formData, authorizationStartDate: e.target.value })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Authorization Expiry Date</label>
                <input
                  type="date"
                  value={formData.authorizationExpiryDate}
                  onChange={(e) => setFormData({ ...formData, authorizationExpiryDate: e.target.value })}
                  className={`w-full px-3 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35] ${
                    errors.authorizationExpiryDate ? "border-rose-500 bg-rose-50" : "border-gray-300"
                  }`}
                />
                {errors.authorizationExpiryDate && (
                  <span className="text-[10px] text-rose-600 mt-0.5 block">{errors.authorizationExpiryDate}</span>
                )}
              </div>
            </div>

            {/* Channel Eligibility & Compliance Status */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Channel Eligibility</label>
                <select
                  value={formData.channelEligibility}
                  onChange={(e) => setFormData({ ...formData, channelEligibility: e.target.value })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="5 / 5">5 / 5 Channels (All)</option>
                  <option value="4 / 5">4 / 5 Channels</option>
                  <option value="3 / 5">3 / 5 Channels</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Compliance Status</label>
                <select
                  value={formData.complianceStatus}
                  onChange={(e) => setFormData({ ...formData, complianceStatus: e.target.value as BrandComplianceStatus })}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                >
                  <option value="Compliant">Compliant</option>
                  <option value="Needs Review">Needs Review</option>
                  <option value="Non-Compliant">Non-Compliant</option>
                </select>
              </div>
            </div>

            {/* Description & Website */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Website URL</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://www.brandwebsite.com"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter brand background and portfolio scope..."
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-1.5 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a] transition-colors shadow-2xs"
          >
            {brandToEdit ? "Save Changes" : "Create Brand"}
          </button>
        </div>
      </div>
    </div>
  );
};
