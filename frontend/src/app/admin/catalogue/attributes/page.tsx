"use client";

import React, { Suspense } from "react";
import { AttributeManagementView } from "@/components/admin/catalogue/attributes/AttributeManagementView";

export default function AttributeManagementPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-gray-500">Loading Attribute & Variant Management dashboard...</div>}>
      <AttributeManagementView />
    </Suspense>
  );
}