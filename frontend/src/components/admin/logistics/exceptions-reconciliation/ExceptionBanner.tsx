"use client";

import React from "react";
import { AlertBanner } from "../shared/AlertBanner";

export function ExceptionBanner() {
  return (
    <div className="mb-3">
      <AlertBanner
        type="warning"
        message="Active logistics cost variances, carrier weight discrepancies, or claims require audit approval before releasing financial settlement dependencies."
      />
    </div>
  );
}
