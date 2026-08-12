import { KpiMetricData, WaterfallStepData } from "./executivePerformanceData";

export interface InventoryKpi extends KpiMetricData {
  vsPreviousLabel?: string;
}

export interface InventoryTrendPoint {
  date: string;
  inventoryValue: number;
  availableStock: number;
  reservedStock: number;
  allocatedStock: number;
  stockAvailability: number;
}

export interface InventoryCompositionDonutPoint {
  name: string;
  value: number;
  color: string;
}

export interface InventoryHealthRow {
  metric: string;
  actual: string;
  target: string;
  variance: string;
  status: string;
  isPositive?: boolean;
}

export interface CategoryProductivityRow {
  category: string;
  inventoryValue: string;
  turnover: string;
  daysOfInventory: string;
  sellThrough: string;
  gmroi: string;
  status: string;
}

export interface WarehousePerformanceRow {
  warehouse: string;
  region: string;
  inventoryValue: string;
  availableUnits: string;
  capacity: string;
  utilisation: string;
  orders: string;
  pickRate: string;
  dispatchSla: string;
  stockoutPercent: string;
  exceptions: number;
  costPerOrder: string;
  status: string;
}

export interface CapacityUtilisationBar {
  warehouse: string;
  utilisationPercent: number;
}

export interface OverstockAgeingRow {
  ageBand: string;
  value: string;
  percentOfTotal: string;
  summary?: string;
}

export interface CarrierPerformanceRow {
  carrier: string;
  shipments: string;
  onTimeDelivery: string;
  slaPercent: string;
  costPerShipment: string;
  trend: string;
}

export interface CarrierScatterPoint {
  x: number;
  y: number;
  z: number;
  name: string;
}

export interface DeliveryExceptionRow {
  exceptionType: string;
  open: number;
  percentOfTotal: string;
  vsPrior30D: string;
  isPositive?: boolean;
}

export interface ForecastTargetRow {
  metric: string;
  actual: string;
  target: string;
  variance: string;
  impact: string;
  isPositive?: boolean;
}

export interface UnderlyingLogisticsRecord {
  recordType: string;
  businessUnit: string;
  region: string;
  warehouse: string;
  carrier: string;
  date: string;
  reference: string;
  actual: string;
  reserved: string;
  allocated: string;
  shipped: string;
  delivered: string;
  sla: string;
  status: string;
  action: string;
}

export interface InventoryLogisticsHealthRailData {
  healthScore: number;
  label: string;
  subtext: string;
  inventorySummary: {
    inventoryValue: string;
    inventoryDelta: string;
    availableStock: string;
    availableDelta: string;
    reservedStock: string;
    reservedDelta: string;
    allocatedStock: string;
    allocatedDelta: string;
    discontinuedStock: string;
    discontinuedDelta: string;
  };
  warehouseSummary: {
    totalWarehouses: string;
    avgUtilisation: string;
    utilDelta: string;
    nearCapacity: string;
    criticalCapacity: string;
    inventoryAccuracy: string;
    accuracyDelta: string;
  };
  fulfilmentSummary: {
    totalOrders: string;
    ordersDelta: string;
    fulfilmentSla: string;
    slaDelta: string;
    pickAccuracy: string;
    pickDelta: string;
    packAccuracy: string;
    packDelta: string;
    dispatchSla: string;
    dispatchDelta: string;
  };
  deliverySummary: {
    totalShipments: string;
    shipmentsDelta: string;
    onTimeDelivery: string;
    onTimeDelta: string;
    failedDelivery: string;
    failedDelta: string;
    openExceptions: string;
    exceptionsDelta: string;
  };
  logisticsCostSummary: {
    totalCost: string;
    costDelta: string;
    costPerShipment: string;
    perShipmentDelta: string;
    warehousingCost: string;
    whDelta: string;
    deliveryCost: string;
    delDelta: string;
    reverseLogisticsCost: string;
    revDelta: string;
  };
  riskSummary: {
    stockoutRisk: number;
    overstockRisk: number;
    capacityRisk: number;
    carrierRisk: number;
    slaRisk: number;
  };
  quickQueues: {
    queueName: string;
    count: string;
  }[];
}

export const INVENTORY_LOGISTICS_DATA = {
  headerMeta: {
    title: "Inventory, Warehouse, Fulfilment & Logistics Analytics",
    subtitle:
      "Analyze inventory health, warehouse productivity, fulfilment throughput, shipment performance, carrier reliability, logistics cost and delivery risk across the ecosystem.",
  },

  kpis: [
    {
      id: "inventory-value",
      number: "1.",
      title: "Inventory Value",
      mainValue: "LKR 142.8M",
      trendPercentage: 6.7,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [128, 131, 134, 137, 139, 141, 142.8],
    },
    {
      id: "available-stock",
      number: "2.",
      title: "Available Stock",
      mainValue: "84,216",
      trendPercentage: 5.4,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [76000, 78000, 79500, 81000, 82500, 83500, 84216],
    },
    {
      id: "inventory-turnover",
      number: "3.",
      title: "Inventory Turnover",
      mainValue: "6.2x",
      trendPercentage: 0.6,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "x",
      sparklineData: [5.2, 5.4, 5.6, 5.8, 6.0, 6.1, 6.2],
    },
    {
      id: "stock-availability",
      number: "4.",
      title: "Stock Availability",
      mainValue: "94.8%",
      trendPercentage: 1.3,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [92.1, 92.6, 93.2, 93.8, 94.2, 94.5, 94.8],
    },
    {
      id: "fulfilment-orders",
      number: "5.",
      title: "Fulfilment Orders",
      mainValue: "42,618",
      trendPercentage: 6.4,
      trendDirection: "up",
      isPositive: true,
      sparklineData: [38000, 39200, 40100, 41000, 41800, 42200, 42618],
    },
    {
      id: "fulfilment-sla",
      number: "6.",
      title: "Fulfilment SLA",
      mainValue: "94.2%",
      trendPercentage: 1.2,
      trendDirection: "up",
      isPositive: true,
      trendSuffix: "pp",
      sparklineData: [91.5, 92.1, 92.8, 93.3, 93.7, 94.0, 94.2],
    },
    {
      id: "on-time-delivery",
      number: "7.",
      title: "On-Time Delivery",
      mainValue: "91.4%",
      trendPercentage: -0.5,
      trendDirection: "down",
      isPositive: false,
      trendSuffix: "pp",
      sparklineData: [93.2, 92.8, 92.5, 92.1, 91.9, 91.6, 91.4],
    },
    {
      id: "open-delivery-exceptions",
      number: "8.",
      title: "Open Delivery Exceptions",
      mainValue: "23",
      trendPercentage: -15.0,
      trendDirection: "down",
      isPositive: true,
      sparklineData: [32, 30, 28, 26, 25, 24, 23],
    },
    {
      id: "avg-cost-shipment",
      number: "9.",
      title: "Avg Cost / Shipment",
      mainValue: "LKR 320",
      trendPercentage: -2.3,
      trendDirection: "down",
      isPositive: true,
      sparklineData: [342, 338, 332, 328, 325, 322, 320],
    },
  ] as InventoryKpi[],

  analyticsHealthKpi: {
    score: 94,
    maxScore: 100,
    label: "Healthy",
    subtext: "2 pts vs prior 30d",
  },

  tabs: [
    "Inventory Overview",
    "Inventory Health",
    "Warehouses",
    "Allocation",
    "Transfers",
    "Fulfilment",
    "Shipments",
    "Carriers",
    "Delivery",
    "Logistics Cost",
    "Returns & Reverse Logistics",
    "Capacity",
    "SLA",
    "Forecast",
    "Exceptions",
    "Underlying Data",
    "Audit",
  ],

  readinessStrip: [
    { label: "Healthy", count: 46, type: "success" },
    { label: "Stock Risk", count: 8, type: "danger" },
    { label: "Fulfilment Risk", count: 7, type: "danger" },
    { label: "Delivery Risk", count: 6, type: "danger" },
    { label: "Capacity Warning", count: 4, type: "warning" },
    { label: "Carrier Warning", count: 4, type: "warning" },
    { label: "SLA Risk", count: 5, type: "danger" },
    { label: "Data Warning", count: 2, type: "warning" },
  ],

  inventoryTrend: [
    { date: "Jul 15", inventoryValue: 128, availableStock: 76, reservedStock: 9.8, allocatedStock: 11.2, stockAvailability: 92.1 },
    { date: "Jul 22", inventoryValue: 132, availableStock: 78, reservedStock: 10.0, allocatedStock: 11.8, stockAvailability: 92.8 },
    { date: "Jul 29", inventoryValue: 136, availableStock: 80, reservedStock: 10.2, allocatedStock: 12.1, stockAvailability: 93.5 },
    { date: "Aug 5", inventoryValue: 140, availableStock: 82, reservedStock: 10.5, allocatedStock: 12.5, stockAvailability: 94.1 },
    { date: "Aug 12", inventoryValue: 142.8, availableStock: 84.2, reservedStock: 10.7, allocatedStock: 12.8, stockAvailability: 94.8 },
  ] as InventoryTrendPoint[],

  inventoryComposition: [
    { name: "Apparel", value: 38.8, color: "#2563eb" },
    { name: "Skincare", value: 18.2, color: "#800020" },
    { name: "Makeup", value: 18.8, color: "#059669" },
    { name: "Consumable", value: 6.1, color: "#7c3aed" },
    { name: "Intransit", value: 4.5, color: "#d97706" },
    { name: "Damaged", value: 2.1, color: "#dc2626" },
    { name: "Returned", value: 1.5, color: "#64748b" },
  ] as InventoryCompositionDonutPoint[],

  inventoryHealthSummary: [
    { metric: "Stock Availability", actual: "94.8%", target: "95.0%", variance: "-0.2pp", status: "Good", isPositive: true },
    { metric: "Inventory Turnover", actual: "6.2x", target: "6.5x", variance: "-0.3x", status: "Good", isPositive: true },
    { metric: "Days of Inventory", actual: "38.6", target: "35.0", variance: "-3.6", status: "Good", isPositive: true },
    { metric: "Sell-Through", actual: "68.4%", target: "70.0%", variance: "-1.6pp", status: "Good", isPositive: true },
    { metric: "Stockout Rate", actual: "2.1%", target: "<2.5%", variance: "-0.4pp", status: "Good", isPositive: true },
    { metric: "Overstock Rate", actual: "6.1%", target: "<4.0%", variance: "+2.1pp", status: "Watch", isPositive: false },
    { metric: "Dead Stock Rate", actual: "7.3%", target: "<5.0%", variance: "+2.3pp", status: "Watch", isPositive: false },
  ] as InventoryHealthRow[],

  categoryProductivity: [
    { category: "Skin Care", inventoryValue: "58.6M", turnover: "7.2x", daysOfInventory: "32.1", sellThrough: "72.8%", gmroi: "6.1", status: "Good" },
    { category: "Makeup", inventoryValue: "30.1M", turnover: "6.4x", daysOfInventory: "36.0", sellThrough: "69.1%", gmroi: "5.8", status: "Good" },
    { category: "Hair Care", inventoryValue: "21.8M", turnover: "5.4x", daysOfInventory: "41.2", sellThrough: "65.3%", gmroi: "5.0", status: "Good" },
    { category: "Fragrance", inventoryValue: "18.7M", turnover: "5.0x", daysOfInventory: "45.5", sellThrough: "60.2%", gmroi: "4.7", status: "Watch" },
    { category: "Wellness", inventoryValue: "15.2M", turnover: "3.6x", daysOfInventory: "62.3", sellThrough: "53.4%", gmroi: "3.7", status: "Watch" },
  ] as CategoryProductivityRow[],

  warehousePerformance: [
    { warehouse: "Colombo Central DC", region: "Western", inventoryValue: "58.7M", availableUnits: "34,216", capacity: "50,000", utilisation: "68%", orders: "10,246", pickRate: "245", dispatchSla: "95.2%", stockoutPercent: "97.0%", exceptions: 6, costPerOrder: "Good", status: "Good" },
    { warehouse: "Wattala RDC", region: "Western", inventoryValue: "31.2M", availableUnits: "14,654", capacity: "30,000", utilisation: "51%", orders: "10,168", pickRate: "210", dispatchSla: "92.1%", stockoutPercent: "95.8%", exceptions: 7, costPerOrder: "Good", status: "Good" },
    { warehouse: "Southern DC", region: "Southern", inventoryValue: "22.8M", availableUnits: "14,142", capacity: "20,000", utilisation: "71%", orders: "7,012", pickRate: "185", dispatchSla: "90.1%", stockoutPercent: "93.1%", exceptions: 5, costPerOrder: "Watch", status: "Watch" },
    { warehouse: "Kandy FC", region: "Central", inventoryValue: "11.4M", availableUnits: "7,645", capacity: "12,000", utilisation: "64%", orders: "5,912", pickRate: "195", dispatchSla: "92.0%", stockoutPercent: "95.3%", exceptions: 4, costPerOrder: "Good", status: "Good" },
  ] as WarehousePerformanceRow[],

  capacityUtilisation: [
    { warehouse: "Colombo Central DC", utilisationPercent: 68 },
    { warehouse: "Wattala RDC", utilisationPercent: 51 },
    { warehouse: "Southern DC", utilisationPercent: 71 },
    { warehouse: "Kandy FC", utilisationPercent: 64 },
  ] as CapacityUtilisationBar[],

  overstockAgeing: [
    { ageBand: "0–30d", value: "56.2M", percentOfTotal: "37.0%", summary: "Overstock Value: 16.7M" },
    { ageBand: "31–60d", value: "21.4M", percentOfTotal: "14.1%", summary: "Overstock %: 13.1%" },
    { ageBand: "61–90d", value: "12.6M", percentOfTotal: "8.3%", summary: "Dead Stock Value: 4.0M" },
    { ageBand: "91–180d", value: "18.2M", percentOfTotal: "12.0%", summary: "Dead Stock %: 3.4%" },
    { ageBand: "181–365d", value: "18.2M", percentOfTotal: "12.0%" },
    { ageBand: ">365d", value: "12.3M", percentOfTotal: "8.1%" },
  ] as OverstockAgeingRow[],

  allocationReservation: [
    { label: "Order Confirmed", value: "42,618" },
    { label: "Allocated", value: "41,032" },
    { label: "Pick-Reserved", value: "40,215" },
    { label: "Packed-Reserved", value: "38,982" },
    { label: "Pick Pending", value: "2,401" },
    { label: "Hold", value: "1,186" },
  ],

  stockingAnalytics: [
    { label: "Open Transfers", value: "86" },
    { label: "At Risk SKU", value: "54" },
    { label: "Stockout Events", value: "28" },
    { label: "Delayed Shipments", value: "8" },
  ],

  fulfilmentPerformance: [
    { label: "Orders", value: "6.2M" },
    { label: "Avg Transfer Time", value: "2.6 Days" },
    { label: "Exceptions", value: "5" },
    { label: "Picks / Orders", value: "97.2%" },
    { label: "Picks", value: "412K" },
    { label: "Pick Failures", value: "-326K" },
  ],

  fulfilmentLifecycle: [
    { step: "Order Confirmed", count: "42,618", percent: "100%" },
    { step: "Allocated", count: "41,032", percent: "96.4%" },
    { step: "Picking", count: "39,620", percent: "93.0%" },
    { step: "Packing", count: "38,942", percent: "91.4%" },
    { step: "Ready to Dispatch", count: "38,412", percent: "90.1%" },
    { step: "Carrier Handover", count: "37,198", percent: "87.3%" },
    { step: "Delivered", count: "35,918", percent: "84.3%" },
  ],

  pickPackProductivity: [
    { label: "Picking", rate1: "1,245 Lines / Hour", rate2: "1,102 Units / Hour" },
    { label: "Packing", rate1: "1,102 Lines / Hour", rate2: "1,845 Units / Hour" },
  ],

  shipmentTrend: [
    { date: "Jul 15", created: 980, dispatched: 940, inTransit: 890, delivered: 860, failed: 22 },
    { date: "Jul 22", created: 1020, dispatched: 980, inTransit: 930, delivered: 900, failed: 20 },
    { date: "Jul 29", created: 1050, dispatched: 1010, inTransit: 960, delivered: 930, failed: 18 },
    { date: "Aug 5", created: 1080, dispatched: 1040, inTransit: 990, delivered: 960, failed: 19 },
    { date: "Aug 12", created: 1110, dispatched: 1070, inTransit: 1010, delivered: 980, failed: 17 },
  ],

  carrierPerformance: [
    { carrier: "SpeedEx", shipments: "11,236", onTimeDelivery: "92.1%", slaPercent: "92.1%", costPerShipment: "312", trend: "Up" },
    { carrier: "QuickTrack", shipments: "9,842", onTimeDelivery: "91.6%", slaPercent: "90.2%", costPerShipment: "278", trend: "Up" },
    { carrier: "SwiftLog", shipments: "7,612", onTimeDelivery: "90.8%", slaPercent: "88.6%", costPerShipment: "245", trend: "Up" },
    { carrier: "CityConnect", shipments: "5,702", onTimeDelivery: "95.7%", slaPercent: "95.2%", costPerShipment: "321", trend: "Up" },
  ] as CarrierPerformanceRow[],

  carrierScatter: [
    { x: 92.1, y: 312, z: 450, name: "SpeedEx" },
    { x: 90.2, y: 278, z: 380, name: "QuickTrack" },
    { x: 88.6, y: 245, z: 290, name: "SwiftLog" },
    { x: 95.2, y: 321, z: 210, name: "CityConnect" },
  ] as CarrierScatterPoint[],

  deliveryExceptions: [
    { exceptionType: "Overstock", open: 10, percentOfTotal: "43.5%", vsPrior30D: "+ 1.2pp", isPositive: false },
    { exceptionType: "Failed Delivery", open: 6, percentOfTotal: "26.1%", vsPrior30D: "- 0.4pp", isPositive: true },
    { exceptionType: "Delivery Delay", open: 4, percentOfTotal: "17.4%", vsPrior30D: "- 0.2pp", isPositive: true },
    { exceptionType: "Wrong Item", open: 2, percentOfTotal: "8.7%", vsPrior30D: "- 0.4pp", isPositive: true },
  ] as DeliveryExceptionRow[],

  logisticsCostBridge: [
    { name: "Base Cost", value: 8.0, displayValue: "8.0M", type: "base" },
    { name: "Warehousing", value: 2.2, displayValue: "2.2M", type: "increase" },
    { name: "Inbound", value: 0.6, displayValue: "0.6M", type: "increase" },
    { name: "Outbound", value: 0.3, displayValue: "0.3M", type: "increase" },
    { name: "Last Mile", value: 0.6, displayValue: "0.6M", type: "increase" },
    { name: "Reverse Logistics", value: -0.4, displayValue: "-0.4M", type: "decrease" },
    { name: "Adjustments", value: -0.2, displayValue: "-0.2M", type: "decrease" },
    { name: "Total Cost", value: 11.1, displayValue: "11.1M", type: "total" },
  ] as WaterfallStepData[],

  reverseLogistics: [
    { label: "Returns Received", value: "1,842" },
    { label: "Pickup Scheduled", value: "1,621" },
    { label: "Collected", value: "1,422" },
    { label: "Received", value: "1,317" },
    { label: "Inspected", value: "828" },
    { label: "Restocked", value: "628" },
    { label: "Rejected / Disposed", value: "146" },
    { label: "Avg Cycle Time", value: "3.4 Days" },
    { label: "Return Rate", value: "4.2%" },
  ],

  slaScorecard: [
    { label: "Stock Availability", value: "94.8%", vsPrior: "+ 1.3pp", isPositive: true },
    { label: "Fulfilment SLA", value: "94.2%", vsPrior: "+ 1.2pp", isPositive: true },
    { label: "On-Time Delivery", value: "91.4%", vsPrior: "- 0.5pp", isPositive: false },
    { label: "Delivery SLA", value: "90.2%", vsPrior: "- 0.6pp", isPositive: false },
    { label: "Carrier SLA", value: "92.1%", vsPrior: "+ 0.2pp", isPositive: true },
  ],

  forecastSnapshot: [
    { label: "Inventory Demand Forecast", value: "16.8M LKR", delta: "+ 4.4%", confidence: "73%" },
    { label: "Warehouse Capacity Forecast", value: "312K", delta: "+ 12%", confidence: "85%" },
    { label: "Carrier / Delivery Forecast", value: "91.2%", delta: "- 0.1pp", confidence: "65%" },
  ],

  forecastVsTarget: [
    { metric: "Inventory Value (LKR)", actual: "142.8M", target: "142.4M", variance: "0.4M", impact: "High", isPositive: true },
    { metric: "Turnover", actual: "6.2x", target: "6.5x", variance: "-0.3x", impact: "Med", isPositive: false },
    { metric: "Stock Availability (%)", actual: "94.8%", target: "95.0%", variance: "-0.2pp", impact: "High", isPositive: false },
    { metric: "On-Time Delivery (%)", actual: "91.4%", target: "93.0%", variance: "-1.6pp", impact: "High", isPositive: false },
    { metric: "Total Logistics Cost (LKR)", actual: "11.1M", target: "10.8M", variance: "0.3M", impact: "Low", isPositive: false },
  ] as ForecastTargetRow[],

  priorityInsights: [
    { id: "pi1", insight: "Stock availability in Southern DC is below target (90.1%). Review allocations.", impact: "High" },
    { id: "pi2", insight: "Delivery delays increased by 15.0% vs prior period. Monitor carrier performance.", impact: "High" },
    { id: "pi3", insight: "Overstock ageing >180 days is at 20.2% of total inventory value.", impact: "Medium" },
    { id: "pi4", insight: "Fulfilment SLA is below target by 0.8pp. Focus on picking productivity.", impact: "Low" },
  ],

  underlyingLogisticsRecords: [
    { recordType: "Inventory On-Hand", businessUnit: "All", region: "West", warehouse: "Colombo Central DC", carrier: "SpeedEx", date: "Aug 14, 2025", reference: "INV-2025-0014-001", actual: "58,712", reserved: "5,214", allocated: "4,802", shipped: "4,602", delivered: "4,482", sla: "95.2%", status: "Good", action: "View" },
    { recordType: "Shipment", businessUnit: "All", region: "West", warehouse: "Wattala RDC", carrier: "QuickTrack", date: "Aug 14, 2025", reference: "SHP-2025-0016-165", actual: "1,245", reserved: "1,245", allocated: "1,245", shipped: "1,210", delivered: "1,186", sla: "92.1%", status: "Good", action: "View" },
    { recordType: "Fulfilment Order", businessUnit: "All", region: "South", warehouse: "Southern DC", carrier: "SwiftLog", date: "Aug 14, 2025", reference: "FUL-2025-0014-782", actual: "1,842", reserved: "1,842", allocated: "1,802", shipped: "1,712", delivered: "1,621", sla: "91.4%", status: "Good", action: "View" },
  ] as UnderlyingLogisticsRecord[],

  healthRail: {
    healthScore: 94,
    label: "Healthy",
    subtext: "Strong operational control",
    inventorySummary: {
      inventoryValue: "LKR 142.8M",
      inventoryDelta: "+ 6.7%",
      availableStock: "84,216",
      availableDelta: "+ 5.4%",
      reservedStock: "10,718",
      reservedDelta: "+ 4.1%",
      allocatedStock: "12,842",
      allocatedDelta: "+ 5.2%",
      discontinuedStock: "1,236",
      discontinuedDelta: "- 9.4%",
    },
    warehouseSummary: {
      totalWarehouses: "4",
      avgUtilisation: "61%",
      utilDelta: "+ 1pp",
      nearCapacity: "0",
      criticalCapacity: "0",
      inventoryAccuracy: "97.2%",
      accuracyDelta: "+ 1.0pp",
    },
    fulfilmentSummary: {
      totalOrders: "36,254",
      ordersDelta: "+ 6.4%",
      fulfilmentSla: "94.2%",
      slaDelta: "+ 1.2pp",
      pickAccuracy: "99.2%",
      pickDelta: "+ 0.8pp",
      packAccuracy: "99.2%",
      packDelta: "+ 1.0pp",
      dispatchSla: "95.6%",
      dispatchDelta: "- 0.4pp",
    },
    deliverySummary: {
      totalShipments: "25,254",
      shipmentsDelta: "+ 6.1%",
      onTimeDelivery: "91.4%",
      onTimeDelta: "- 0.5pp",
      failedDelivery: "2.1%",
      failedDelta: "+ 0.2pp",
      openExceptions: "23",
      exceptionsDelta: "- 15.0%",
    },
    logisticsCostSummary: {
      totalCost: "11.1M",
      costDelta: "+ 2.2%",
      costPerShipment: "LKR 320",
      perShipmentDelta: "- 2.3%",
      warehousingCost: "5.2M",
      whDelta: "+ 1.9%",
      deliveryCost: "4.2M",
      delDelta: "+ 2.1%",
      reverseLogisticsCost: "0.1M",
      revDelta: "0.0%",
    },
    riskSummary: {
      stockoutRisk: 8,
      overstockRisk: 6,
      capacityRisk: 4,
      carrierRisk: 4,
      slaRisk: 5,
    },
    quickQueues: [
      { queueName: "Stockout Risk", count: "18" },
      { queueName: "Overstock", count: "13" },
      { queueName: "Capacity Risk", count: "4" },
      { queueName: "Fulfilment SLA Risk", count: "12" },
      { queueName: "Carrier Exceptions", count: "23" },
      { queueName: "Delivery Exceptions", count: "23" },
      { queueName: "Revenue Logistics Delays", count: "8" },
    ],
  } as InventoryLogisticsHealthRailData,
};
