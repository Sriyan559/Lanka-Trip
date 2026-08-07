import React from "react";
import { ProductApprovalQueueView } from "./components/ProductApprovalQueueView";

export default async function ProductApprovalQueuePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; authorizationId?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const filterAuthId = resolvedSearchParams?.authorizationId || "AUTH-2023-0892";

  return <ProductApprovalQueueView filterAuthId={filterAuthId} />;
}
