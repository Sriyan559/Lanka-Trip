"use client";

import React, { Suspense } from "react";
import { SegmentDashboard } from "@/components/admin/customers/segments/SegmentDashboard";

export default function CustomerSegmentsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm font-semibold">Loading Customer Segments & Groups...</div>}>
      <SegmentDashboard />
    </Suspense>
  );
}
