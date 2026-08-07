import React, { Suspense } from "react";
import { ReturnsQueueView } from "@/components/admin/returns/ReturnsQueueView";

function ReturnsLoadingFallback() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", color: "#94a3b8", fontSize: "0.9rem" }}>
      Loading Returns Queue…
    </div>
  );
}

export default function ReturnsQueuePage() {
  return (
    <Suspense fallback={<ReturnsLoadingFallback />}>
      <ReturnsQueueView />
    </Suspense>
  );
}
