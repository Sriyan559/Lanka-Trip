"use client";

import React, { Suspense } from "react";
import { CategoryManagementView } from "@/components/admin/catalogue/categories/CategoryManagementView";

export default function CategoryManagementPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-gray-500">Loading Category Management dashboard...</div>}>
      <CategoryManagementView />
    </Suspense>
  );
}