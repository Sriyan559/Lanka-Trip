import { MediaAsset, MediaFilterState } from "@/types/mediaManagement";

export function filterMediaAssets(
  assets: MediaAsset[],
  filters: MediaFilterState
): MediaAsset[] {
  return assets.filter((asset) => {
    // 1. Search Query
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      const matchSearch =
        asset.name.toLowerCase().includes(q) ||
        asset.id.toLowerCase().includes(q) ||
        asset.productName.toLowerCase().includes(q) ||
        asset.brandName.toLowerCase().includes(q) ||
        (asset.variant && asset.variant.toLowerCase().includes(q)) ||
        asset.format.toLowerCase().includes(q) ||
        asset.ownerName.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }

    // 2. Active Tab
    if (filters.activeTab && filters.activeTab !== "All Assets") {
      switch (filters.activeTab) {
        case "Images":
          if (asset.category !== "image") return false;
          break;
        case "Videos":
          if (asset.category !== "video") return false;
          break;
        case "Documents":
          if (asset.category !== "document") return false;
          break;
        case "Pending Approval":
          if (asset.approvalStatus !== "Pending" && asset.approvalStatus !== "Needs Review") return false;
          break;
        case "Quality Issues":
          if (asset.qualityScore >= 80) return false;
          break;
        case "Duplicates":
          if (asset.duplicateRisk === "None") return false;
          break;
        case "Usage Rights":
          if (!asset.usageRightsStatus.includes("Expiring")) return false;
          break;
        case "Archived":
          if (!asset.isArchived) return false;
          break;
      }
    }

    // 3. Asset Type Select
    if (filters.assetType && filters.assetType !== "All Types") {
      if (!asset.type.toLowerCase().includes(filters.assetType.toLowerCase())) return false;
    }

    // 4. Approval Status Select
    if (filters.approvalStatus && filters.approvalStatus !== "All Statuses") {
      if (asset.approvalStatus !== filters.approvalStatus) return false;
    }

    // 5. Linked Entity Select
    if (filters.linkedEntity && filters.linkedEntity !== "All Entities") {
      if (asset.linkedEntityType !== filters.linkedEntity) return false;
    }

    // 6. Brand Select
    if (filters.brand && filters.brand !== "All Brands") {
      if (asset.brandName !== filters.brand) return false;
    }

    // 7. Quality Status Select
    if (filters.qualityStatus && filters.qualityStatus !== "All") {
      if (filters.qualityStatus === "High Quality" && asset.qualityScore < 90) return false;
      if (filters.qualityStatus === "Needs Improvement" && (asset.qualityScore >= 90 || asset.qualityScore < 75)) return false;
      if (filters.qualityStatus === "Low Quality" && asset.qualityScore >= 75) return false;
    }

    // 8. Quick Filter Chips
    if (filters.quickChips && filters.quickChips.length > 0) {
      for (const chip of filters.quickChips) {
        switch (chip) {
          case "Assigned to Me":
            if (asset.ownerName !== "Elena Vance") return false;
            break;
          case "Pending Approval":
            if (asset.approvalStatus !== "Pending" && asset.approvalStatus !== "Needs Review") return false;
            break;
          case "Missing Mandatory":
            if (asset.qualityScore >= 90 || asset.altTextStatus === "Yes") return false;
            break;
          case "Low Resolution":
            if (asset.resolution.includes("2400") || asset.resolution.includes("1920") || asset.resolution.includes("2000")) return false;
            break;
          case "Duplicate Risk":
            if (asset.duplicateRisk === "None") return false;
            break;
          case "Unlinked":
            if (asset.linkedEntityType !== "Unlinked") return false;
            break;
          case "Rights Expiring":
            if (!asset.usageRightsStatus.includes("Expiring")) return false;
            break;
          case "Missing Alt Text":
            if (asset.altTextStatus === "Yes") return false;
            break;
          case "Recall Media":
            if (asset.riskLevel !== "High") return false;
            break;
        }
      }
    }

    return true;
  });
}
