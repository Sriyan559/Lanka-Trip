import { MediaUploadDraft } from "@/types/mediaManagement";

export interface ValidationError {
  field: string;
  message: string;
}

export function validateMediaUpload(draft: Partial<MediaUploadDraft>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!draft.name || !draft.name.trim()) {
    errors.push({ field: "name", message: "Asset name is required." });
  }

  if (!draft.type) {
    errors.push({ field: "type", message: "Asset type is required." });
  }

  if (draft.rightsStartDate && draft.rightsExpiryDate && new Date(draft.rightsExpiryDate) <= new Date(draft.rightsStartDate)) {
    errors.push({ field: "rightsExpiryDate", message: "Rights expiry date must be after the start date." });
  }

  return errors;
}

export interface ImportValidationResult {
  valid: boolean;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  errors: { row: number; reason: string }[];
}

export function validateImportFile(fileName: string): ImportValidationResult {
  const isZip = fileName.endsWith(".zip");
  const isCsv = fileName.endsWith(".csv");
  const isXlsx = fileName.endsWith(".xlsx");

  if (!isZip && !isCsv && !isXlsx) {
    return {
      valid: false,
      totalRecords: 0,
      validRecords: 0,
      invalidRecords: 1,
      errors: [{ row: 0, reason: "Unsupported file extension. Only .zip, .csv, and .xlsx are allowed." }],
    };
  }

  return { valid: true, totalRecords: 0, validRecords: 0, invalidRecords: 0, errors: [] };
}
