import React from "react";
import { notFound } from "next/navigation";
import { BatchDetailView } from "./components/BatchDetailView";

export default async function BatchDetailPage({
  params,
}: {
  params: Promise<{ batchId: string }>;
}) {
  const { batchId } = await params;

  if (batchId.toUpperCase().includes("INVALID") || batchId === "invalid") {
    notFound();
  }

  return <BatchDetailView batchId={batchId} />;
}
