"use client";

import React, { useState } from "react";
import { X, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { validateMediaUpload, ValidationError } from "@/utils/mediaValidation";
import type { MediaDashboardData } from "@/types/mediaManagement";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (assetName: string) => void;
  onUpload: (form: FormData, onProgress: (loaded: number, total: number) => void) => Promise<void>;
  options: MediaDashboardData["options"];
}

export function UploadMediaModal({ isOpen, onClose, onSuccess, onUpload, options }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("Product Image — Hero");
  const linkedEntityType = "Product";
  const [linkedEntityName, setLinkedEntityName] = useState("");
  const [variant, setVariant] = useState("");
  const [altText, setAltText] = useState("");
  const [description, setDescription] = useState("");
  const [rightsOwner, setRightsOwner] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [rightsStartDate, setRightsStartDate] = useState("");
  const [rightsExpiryDate, setRightsExpiryDate] = useState("");
  const [isPrimary, setIsPrimary] = useState(true);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      if (!name) setName(selected.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateMediaUpload({
      name,
      type: type as any,
      linkedEntityType: linkedEntityType as any,
      linkedEntityName,
      altText,
      rightsStartDate,
      rightsExpiryDate,
    });

    if (!file) {
      validationErrors.unshift({ field: "file", message: "Please select a media file to upload." });
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsUploading(true);

    const form = new FormData();
    form.append("file", file!);
    form.append("category", file!.type.startsWith("image/") ? (type.includes("Banner") ? "banner_image" : "product_image") : "document");
    if (linkedEntityName) form.append("product_id", linkedEntityName);
    if (altText.trim()) form.append("alt_text", altText.trim());
    if (description.trim()) form.append("description", description.trim());
    if (rightsExpiryDate) form.append("rights_expires_at", rightsExpiryDate);
    try {
      await onUpload(form, (loaded, total) => setUploadProgress(total ? Math.round(loaded / total * 100) : 0));
      onSuccess(name || file!.name); onClose();
    } catch (cause) { setErrors([{ field: "file", message: cause instanceof Error ? cause.message : "Unable to upload media." }]); }
    finally { setIsUploading(false); setUploadProgress(0); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-line">
        {/* Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-base font-extrabold text-ink tracking-tight">Upload Media Asset</h2>
            <p className="text-[12px] text-muted">Add new product, brand, or campaign assets with required metadata.</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-ink rounded-md hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 text-[12px]">
          {errors.length > 0 && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-rose-900 font-bold">
                <AlertCircle size={14} /> Validation Errors
              </div>
              <ul className="list-disc list-inside pl-1">
                {errors.map((err, i) => (
                  <li key={i}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* File Drag and Drop */}
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#671021] bg-slate-50/50 transition-colors">
            <input
              type="file"
              id="media-upload-input"
              className="hidden"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xlsx"
            />
            <label htmlFor="media-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-[#671021] flex items-center justify-center">
                <Upload size={20} />
              </div>
              <div>
                <span className="font-bold text-ink">Click to upload</span> or drag and drop
              </div>
              <p className="text-[10px] text-muted">Supported formats: JPEG, PNG, WEBP, PDF, DOC, DOCX, XLSX (max 20 MB)</p>
            </label>
            {file && (
              <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 font-mono text-[11px] font-bold inline-flex items-center gap-2">
                <CheckCircle2 size={14} /> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>

          {/* Asset Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-ink mb-1">Asset Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Radiance Serum Hero Bottle"
                className="w-full h-9 px-3 border border-line rounded text-[12px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
              />
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Asset Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-9 px-3 border border-line rounded text-[12px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
              >
                <option value="Product Image — Hero">Product Image — Hero</option>
                <option value="Packaging Image — Back">Packaging Image — Back</option>
                <option value="Packaging Image — Ingredients">Packaging Image — Ingredients</option>
                <option value="Document — Certificate">Document — Certificate</option>
                <option value="Campaign Image — Banner">Campaign Image — Banner</option>
                <option value="Product Demo — Video" disabled>Product Demo — Video (unsupported)</option>
                <option value="Lifestyle Image — Model">Lifestyle Image — Model</option>
              </select>
            </div>
          </div>

          {/* Linked Entity & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-ink mb-1">Linked Entity *</label>
              <select
                value={linkedEntityType}
                disabled
                className="w-full h-9 px-3 border border-line rounded text-[12px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
              >
                <option value="Product">Product</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Product Master</label>
              <select
                value={linkedEntityName}
                onChange={(e) => setLinkedEntityName(e.target.value)}
                className="w-full h-9 px-3 border border-line rounded text-[12px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
              ><option value="">Unlinked</option>{options.products.map(product=><option key={product.id} value={product.id}>{product.name}</option>)}</select>
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Variant / Size</label>
              <input
                type="text"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                placeholder="e.g. 30 ml"
                disabled
                title="Variant mapping is available after upload in Edit Metadata."
                className="w-full h-9 px-3 border border-line rounded text-[12px] font-semibold text-ink focus:outline-none focus:border-[#671021]"
              />
            </div>
          </div>

          {/* Alt Text */}
          <div>
            <label className="block font-bold text-ink mb-1">Accessibility Alt Text *</label>
            <textarea
              rows={2}
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Provide a detailed, descriptive text for screen readers and SEO..."
              className="w-full px-3 py-2 border border-line rounded text-[12px] font-medium text-ink focus:outline-none focus:border-[#671021]"
            />
          </div>

          {/* Usage Rights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-line">
            <div>
              <label className="block font-bold text-ink mb-1">Rights Owner</label>
              <input
                type="text"
                value={rightsOwner}
                onChange={(e) => setRightsOwner(e.target.value)}
                disabled
                title="A rights-owner schema is not installed."
                className="w-full h-9 px-3 border border-line rounded text-[12px] font-semibold text-ink"
              />
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Start Date *</label>
              <input
                type="date"
                value={rightsStartDate}
                onChange={(e) => setRightsStartDate(e.target.value)}
                disabled
                title="A rights-start schema is not installed."
                className="w-full h-9 px-3 border border-line rounded text-[12px] font-semibold text-ink"
              />
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">Expiry Date *</label>
              <input
                type="date"
                value={rightsExpiryDate}
                onChange={(e) => setRightsExpiryDate(e.target.value)}
                className="w-full h-9 px-3 border border-line rounded text-[12px] font-semibold text-ink"
              />
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex justify-between text-[11px] font-bold text-ink">
                <span>Uploading file...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#671021] transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}

          {/* Submit Controls */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded border border-line bg-white text-[12px] font-semibold text-ink hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="h-9 px-5 rounded bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520c1a] disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Upload & Save Asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
