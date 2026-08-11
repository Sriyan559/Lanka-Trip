"use client";

import React from "react";
import { MetricCard } from "../shared/MetricCard";
import { ReusableSparkline } from "../charts/ReusableSparkline";
import { ReturnCase } from "@/types/logistics/reverseLogistics";

interface ReturnDetailKPIGridProps {
  returnCase: ReturnCase;
}

export function ReturnDetailKPIGrid({ returnCase }: ReturnDetailKPIGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2 mb-3">
      {/* 1. Returned Qty */}
      <MetricCard
        number={1}
        title="Returned Qty"
        value={returnCase.returnedQuantity || 1}
        varianceText="Single Item"
        sparklineNode={<ReusableSparkline color="#3b82f6" data={[1, 1, 1, 1]} />}
      />

      {/* 2. Return Value */}
      <MetricCard
        number={2}
        title="Return Value"
        value={`LKR ${returnCase.returnValue.toLocaleString()}`}
        varianceText="Verified Value"
        isSuccess
        sparklineNode={<ReusableSparkline color="#10b981" data={[4500, 4600, 4800, 4800]} />}
      />

      {/* 3. Collection */}
      <MetricCard
        number={3}
        title="Collection"
        value="100%"
        varianceText="Completed"
        isSuccess
        sparklineNode={<ReusableSparkline color="#10b981" data={[0, 50, 100, 100]} />}
      />

      {/* 4. Reverse Transit */}
      <MetricCard
        number={4}
        title="Reverse Transit"
        value="68%"
        varianceText="In Transit"
        sparklineNode={<ReusableSparkline color="#3b82f6" data={[0, 30, 50, 68]} />}
      />

      {/* 5. Receipt */}
      <MetricCard
        number={5}
        title="Receipt"
        value="0%"
        varianceText="Pending WH"
        sparklineNode={<ReusableSparkline color="#94a3b8" data={[0, 0, 0, 0]} />}
      />

      {/* 6. Inspection */}
      <MetricCard
        number={6}
        title="Inspection"
        value="0%"
        varianceText="Pending Inspection"
        sparklineNode={<ReusableSparkline color="#94a3b8" data={[0, 0, 0, 0]} />}
      />

      {/* 7. Disposition */}
      <MetricCard
        number={7}
        title="Disposition"
        value="0%"
        varianceText="Pending Approval"
        sparklineNode={<ReusableSparkline color="#94a3b8" data={[0, 0, 0, 0]} />}
      />

      {/* 8. Refund Dependency */}
      <MetricCard
        number={8}
        title="Refund Dependency"
        value="40%"
        varianceText="Blocked"
        isWarning
        sparklineNode={<ReusableSparkline color="#f59e0b" data={[0, 20, 30, 40]} />}
      />

      {/* 9. SLA Progress */}
      <MetricCard
        number={9}
        title="SLA Progress"
        value="62%"
        varianceText="On Track"
        sparklineNode={<ReusableSparkline color="#3b82f6" data={[20, 40, 55, 62]} />}
      />

      {/* 10. Reverse Cost */}
      <MetricCard
        number={10}
        title="Reverse Cost"
        value="LKR 650"
        varianceText="Est. Courier Cost"
        sparklineNode={<ReusableSparkline color="#8b5cf6" data={[500, 550, 600, 650]} />}
      />

      {/* 11. Exceptions */}
      <MetricCard
        number={11}
        title="Exceptions"
        value="1"
        varianceText="Attempt 1 Failed"
        isWarning
        sparklineNode={<ReusableSparkline color="#ef4444" data={[0, 1, 1, 1]} />}
      />

      {/* 12. Health Score */}
      <MetricCard
        number={12}
        title="Health Score"
        value="92/100"
        varianceText="+2 pts"
        isSuccess
        sparklineNode={<ReusableSparkline color="#10b981" data={[88, 90, 91, 92]} />}
      />
    </div>
  );
}
