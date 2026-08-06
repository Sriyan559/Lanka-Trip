import { MediaAsset } from "@/types/mediaManagement";

export function exportMediaReportCSV(assets: MediaAsset[]): void {
  const headers = [
    "Asset ID",
    "Asset Name",
    "Asset Type",
    "Linked Entity",
    "Product / Brand",
    "Variant",
    "Format",
    "Resolution",
    "File Size",
    "Web Compat",
    "Mobile Compat",
    "B2B Compat",
    "Alt Text Status",
    "Quality Score",
    "Approval Status",
    "Usage Rights Status",
    "Duplicate Risk",
    "Risk Level",
    "Updated At",
    "Owner",
  ];

  const rows = assets.map((asset) => [
    `"${asset.id}"`,
    `"${asset.name.replace(/"/g, '""')}"`,
    `"${asset.type}"`,
    `"${asset.linkedEntityType}"`,
    `"${asset.productName} / ${asset.brandName}"`,
    `"${asset.variant || ""}"`,
    `"${asset.format}"`,
    `"${asset.resolution}"`,
    `"${asset.fileSizeFormatted}"`,
    `"${asset.channelCompatibility.web ? "Yes" : "No"}"`,
    `"${asset.channelCompatibility.mobile ? "Yes" : "No"}"`,
    `"${asset.channelCompatibility.b2b ? "Yes" : "No"}"`,
    `"${asset.altTextStatus}"`,
    `"${asset.qualityScore}/100"`,
    `"${asset.approvalStatus}"`,
    `"${asset.usageRightsStatus}"`,
    `"${asset.duplicateRisk}"`,
    `"${asset.riskLevel}"`,
    `"${asset.updatedAt}"`,
    `"${asset.ownerName}"`,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `media_assets_report_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
