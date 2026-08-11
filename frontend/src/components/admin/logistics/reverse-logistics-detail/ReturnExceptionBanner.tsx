"use client";

import React from "react";
import { AlertBanner } from "../shared/AlertBanner";

export function ReturnExceptionBanner() {
  return (
    <div className="mb-3">
      <AlertBanner
        type="warning"
        message="This return or reverse-logistics record was updated by another administrator, warehouse, carrier or operational service. Refresh before rescheduling collection, confirming receipt, completing inspection, approving disposition, releasing quarantine or clearing refund dependencies."
      />
    </div>
  );
}
