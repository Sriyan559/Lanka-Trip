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

  if (!draft.linkedEntityType) {
    errors.push({ field: "linkedEntityType", message: "Linked entity type is required." });
  }

  if (!draft.linkedEntityName || !draft.linkedEntityName.trim()) {
    errors.push({ field: "linkedEntityName", message: "Product, brand, or compliance entity name is required." });
  }

  if (!draft.altText || !draft.altText.trim()) {
    errors.push({ field: "altText", message: "Alt text is required for accessibility & channel compliance." });
  }

  if (!draft.rightsStartDate || !draft.rightsExpiryDate) {
    errors.push({ field: "rights", message: "Usage rights start and expiry dates are required." });
  } else if (new Date(draft.rightsExpiryDate) <= new Date(draft.rightsStartDate)) {
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

  return {
    valid: true,
    totalRecords: 48,
    validRecords: 44,
    invalidRecords: 4,
    errors: [
      { row: 12, reason: "Missing alt text field." },
      { row: 19, reason: "Resolution 400x400 below minimum threshold of 800x800." },
      { row: 27, reason: "Invalid product entity ID PRD-9999." },
      { row: 34, reason: "Usage rights expiry date is in the past." },
    ],
  };
}
