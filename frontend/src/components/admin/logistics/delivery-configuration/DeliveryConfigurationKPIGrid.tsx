"use client";

import React from "react";
import { MetricCard } from "../shared/MetricCard";
import { CircularProgress } from "../shared/CircularProgress";
import { ReusableSparkline } from "../charts/ReusableSparkline";
import { ConfigurationMetrics } from "@/types/logistics/deliveryConfiguration";

interface DeliveryConfigurationKPIGridProps {
  metrics: ConfigurationMetrics;
}

export function DeliveryConfigurationKPIGrid({ metrics }: DeliveryConfigurationKPIGridProps) {
  return (
    <div className="space-y-2.5 mb-3">
      {/* 12 KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
        {/* 1. Active Delivery Zones */}
        <MetricCard
          number={1}
          title="ACTIVE ZONES"
          value={metrics.activeDeliveryZones}
          varianceText="+4 (5.1%)"
          isSuccess
          sparklineNode={<ReusableSparkline color="#10b981" data={[80, 82, 84, 86]} />}
        />

        {/* 2. Active Delivery Services */}
        <MetricCard
          number={2}
          title="ACTIVE SERVICES"
          value={metrics.activeDeliveryServices}
          varianceText="+2 (9.1%)"
          isSuccess
          sparklineNode={<ReusableSparkline color="#10b981" data={[22, 22, 23, 24]} />}
        />

        {/* 3. Active Rate Rules */}
        <MetricCard
          number={3}
          title="ACTIVE RATE RULES"
          value={metrics.activeRateRules}
          varianceText="+8 (6.0%)"
          isSuccess
          sparklineNode={<ReusableSparkline color="#10b981" data={[130, 134, 138, 142]} />}
        />

        {/* 4. Active Capacity Rules */}
        <MetricCard
          number={4}
          title="ACTIVE CAPACITY RULES"
          value={metrics.activeCapacityRules}
          varianceText="+5 (5.5%)"
          isSuccess
          sparklineNode={<ReusableSparkline color="#10b981" data={[90, 92, 94, 96]} />}
        />

        {/* 5. Active SLA Rules */}
        <MetricCard
          number={5}
          title="ACTIVE SLA RULES"
          value={metrics.activeSlaRules}
          varianceText="+4 (7.4%)"
          isSuccess
          sparklineNode={<ReusableSparkline color="#10b981" data={[52, 54, 56, 58]} />}
        />

        {/* 6. Carrier Eligibility */}
        <MetricCard
          number={6}
          title="CARRIER ELIGIBILITY"
          value={metrics.carrierZoneMappings}
          varianceText="+15 (4.8%)"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[310, 315, 320, 326]} />}
        />

        {/* 7. Configuration Conflicts */}
        <MetricCard
          number={7}
          title="CONFIG EXCEPTIONS"
          value={metrics.configurationConflicts}
          varianceText="-2 (20.0%)"
          isWarning
          sparklineNode={<ReusableSparkline color="#ef4444" data={[10, 10, 9, 8]} />}
        />

        {/* 8. Zones at Capacity Risk */}
        <MetricCard
          number={8}
          title="ZONES AT CAPACITY"
          value={metrics.zonesAtCapacityRisk}
          varianceText="-3 (20.0%)"
          isWarning
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[15, 14, 13, 12]} />}
        />

        {/* 9. Rate Rules Expiring */}
        <MetricCard
          number={9}
          title="EXPIRING RATE RULES"
          value={metrics.rateRulesExpiring}
          varianceText="-2 (12.5%)"
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[16, 15, 15, 14]} />}
        />

        {/* 10. Expiring SLA Rules */}
        <MetricCard
          number={10}
          title="EXPIRING SLA RULES"
          value={metrics.rateRulesExpiringSoon}
          varianceText="-2 (12.5%)"
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[16, 15, 15, 14]} />}
        />

        {/* 11. SLA Breaches */}
        <MetricCard
          number={11}
          title="SLA BREACHES"
          value={metrics.slaBreachRiskRules}
          varianceText="-1 (14.3%)"
          sparklineNode={<ReusableSparkline color="#ef4444" data={[7, 7, 7, 6]} />}
        />

        {/* 12. Pending Approval */}
        <MetricCard
          number={12}
          title="PENDING APPROVAL"
          value={metrics.pendingConfigurationApprovals}
          varianceText="+4 (28.6%)"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[14, 15, 16, 18]} />}
        />
      </div>

      {/* Secondary Performance Indicator Rings Strip */}
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs flex flex-wrap items-center justify-around gap-4">
        <CircularProgress
          value={96}
          label="Coverage Availability"
          trendText="+2.2%"
          color="#10b981"
        />
        <CircularProgress
          value={42}
          label="Same-Day Coverage"
          trendText="+1.8%"
          color="#3b82f6"
        />
        <CircularProgress
          value={78}
          label="Next-Day Coverage"
          trendText="+2.1%"
          color="#10b981"
        />
        <CircularProgress
          value={82}
          label="Avg Delivery Rate"
          trendText="LKR 245 (+1.2%)"
          color="#8b5cf6"
        />
        <CircularProgress
          value={76}
          label="Capacity Utilisation"
          trendText="+1.9%"
          color="#f59e0b"
        />
        <CircularProgress
          value={93}
          label="SLA Rule Compliance"
          trendText="+1.3%"
          color="#10b981"
        />
      </div>
    </div>
  );
}
