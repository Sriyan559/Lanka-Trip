import { 
  Shipment, 
  LogisticsMetrics, 
  OperationsHealth, 
  PriorityAlert, 
  QuickQueueItem, 
  CarrierPerformance, 
  CODFinancials 
} from "@/types/logistics";

export const mockLogisticsMetrics: LogisticsMetrics = {
  totalActiveShipments: 1248,
  pendingCarrierAssignment: 36,
  pickupScheduled: 84,
  awaitingPickup: 57,
  pickedUpToday: 142,
  inTransit: 486,
  outForDelivery: 96,
  deliveredToday: 218,
  deliveryExceptions: 23,
  failedDeliveries: 12,
  returnShipments: 18,
  slaBreaches: 9,
  codPendingRemittance: 1840000, // LKR 1.84M
  logisticsCostToday: 485000 // LKR 485,000
};

export const mockOperationsHealth: OperationsHealth = {
  averageDispatchTime: "6.8h",
  onTimePickupRate: 94,
  onTimeDeliveryRate: 91,
  activeSlaBreaches: 9,
  carrierAssignmentBacklog: 36,
  deliveryExceptionBacklog: 23,
  unassignedHighRiskShipments: 4
};

export const mockPriorityAlerts: PriorityAlert[] = [
  { id: "1", type: "Delivery Failed", shipmentRef: "SHP-2026-010271" },
  { id: "2", type: "Pickup Overdue", shipmentRef: "SHP-2026-010244" },
  { id: "3", type: "Carrier Unassigned", shipmentRef: "SHP-2026-010260" },
  { id: "4", type: "High-Risk Return", shipmentRef: "SHP-2026-010236" },
  { id: "5", type: "COD Variance", shipmentRef: "SHP-2026-010221" },
  { id: "6", type: "Package Damage", shipmentRef: "SHP-2026-010205" }
];

export const mockQuickQueue: QuickQueueItem[] = [
  { id: "1", title: "Oldest Carrier-Unassigned", shipmentRef: "SHP-2026-010180" },
  { id: "2", title: "Oldest Pickup Overdue", shipmentRef: "SHP-2026-010194" },
  { id: "3", title: "Highest-Risk Shipment", shipmentRef: "SHP-2026-010236" },
  { id: "4", title: "Highest-Value COD", shipmentRef: "SHP-2026-010238" },
  { id: "5", title: "Delivery Exception", shipmentRef: "SHP-2026-010271" },
  { id: "6", title: "Return Pickup Required", shipmentRef: "SHP-2026-010260" }
];

export const mockCarrierPerformance: CarrierPerformance[] = [
  { carrier: "Koombiya Delivery", onTime: 94, activeShipments: 128, exceptions: 4 },
  { carrier: "QuickGo", onTime: 91, activeShipments: 96, exceptions: 6 },
  { carrier: "RiderFast", onTime: 86, activeShipments: 72, exceptions: 9 },
  { carrier: "PickMe Flash", onTime: 92, activeShipments: 54, exceptions: 3 }
];

export const mockCODFinancials: CODFinancials = {
  awaitingCollection: 2850000,
  collected: 4120000,
  remittancePending: 1840000,
  variance: 42500,
  carrierChargesToday: 485000,
  deliveryLiabilityExposure: 325000
};

export const mockShipments: Shipment[] = [
  {
    id: "1",
    databaseId: "10293",
    reference: "SHP-2026-010293",
    trackingNumber: "TRK-8821901",
    orderReference: "ORD-2026-009021",
    shipmentType: "Customer Delivery",
    customer: {
      name: "Elena Rodriguez",
      id: "CUS-2026-01842",
      phone: "+94 77 123 4567",
      email: "elena.rodriguez@example.com",
      address: "No. 42, Airport Road, Katunayake, 11450, Sri Lanka",
      addressType: "Home",
      instructions: "Call before delivery",
    },
    supplier: {
      name: "Luxe Distribution Pvt Ltd",
      fulfilmentRef: "FUL-2026-004501",
      status: "Confirmed"
    },
    carrier: {
      name: "Koombiya Delivery",
      partnerName: "Koombiya Delivery",
      service: "Next-Day Delivery",
      pickupWindow: "2:00 PM–4:00 PM",
      estimatedTransit: "1 Day",
      route: "Colombo Main Hub -> Katunayake",
      distance: "Approximately 32 km",
      onTimeProbability: 94
    },
    origin: "Colombo Main Hub",
    destination: "Katunayake",
    packages: 1,
    itemsCount: 2,
    status: "Pickup Scheduled",
    pickupStatus: "Scheduled",
    deliveryStatus: "Not Dispatched",
    packageStatus: "Ready for Handover",
    codStatus: "Not Applicable",
    riskLevel: "Low",
    slaStatus: "Within Target",
    riskScore: 92,
    assignedOfficer: "Elena Vance",
    createdAt: "Jul 22, 2026 — 10:15 AM",
    pickupDate: "Jul 22, 2026 — 2:00 PM",
    expectedDelivery: "Jul 23, 2026",
    fulfilmentCompletion: 70,
    packageReadiness: 100,
    carrierConfidence: 94,
    trackingCompleteness: 85,
    deliveryConfidence: 94,
    codExposure: 0
  },
  {
    id: "2",
    databaseId: "10289",
    reference: "SHP-2026-010289",
    trackingNumber: "QG-2911408",
    orderReference: "ORD-2026-008992",
    shipmentType: "Customer Delivery",
    customer: {
      name: "Sarah Chen",
      id: "CUS-2026-01840",
      phone: "+94 77 111 2222",
      email: "sarah@example.com",
      address: "Colombo 07",
      addressType: "Office",
      instructions: "Leave at reception",
    },
    supplier: {
      name: "Pure Organic Co.",
      fulfilmentRef: "FUL-2026-004480",
      status: "Confirmed"
    },
    carrier: {
      name: "QuickGo",
      partnerName: "QuickGo",
      service: "Same-Day Delivery",
      pickupWindow: "10:00 AM–12:00 PM",
      estimatedTransit: "Same Day",
      route: "Galle Supplier Hub -> Colombo 07",
      distance: "Approximately 120 km",
      onTimeProbability: 91
    },
    origin: "Galle Supplier Hub",
    destination: "Colombo 07",
    packages: 2,
    itemsCount: 4,
    status: "In Transit",
    pickupStatus: "Picked Up",
    deliveryStatus: "In Transit",
    packageStatus: "Sealed",
    codStatus: "Pending Collection",
    riskLevel: "Low",
    slaStatus: "6 Hours Remaining",
    riskScore: 88,
    assignedOfficer: "Natasha Silva",
    createdAt: "Jul 21, 2026",
    pickupDate: "Jul 21, 2026",
    expectedDelivery: "Jul 22, 2026",
    fulfilmentCompletion: 85,
    packageReadiness: 100,
    carrierConfidence: 90,
    trackingCompleteness: 95,
    deliveryConfidence: 89,
    codExposure: 15000
  },
  {
    id: "3",
    databaseId: "10271",
    reference: "SHP-2026-010271",
    trackingNumber: "RF-8800112",
    orderReference: "ORD-2026-009018",
    shipmentType: "Customer Delivery",
    customer: {
      name: "Julian Vance",
      id: "CUS-2026-01830",
      phone: "+94 77 333 4444",
      email: "julian@example.com",
      address: "Negombo",
      addressType: "Home",
      instructions: "",
    },
    supplier: {
      name: "Vogue Supply",
      fulfilmentRef: "FUL-2026-004472",
      status: "Confirmed"
    },
    carrier: {
      name: "RiderFast",
      partnerName: "RiderFast",
      service: "Standard Delivery",
      pickupWindow: "9:00 AM–11:00 AM",
      estimatedTransit: "2 Days",
      route: "Kandy Regional Hub -> Negombo",
      distance: "Approximately 80 km",
      onTimeProbability: 86
    },
    origin: "Kandy Regional Hub",
    destination: "Negombo",
    packages: 1,
    itemsCount: 1,
    status: "Delivery Failed",
    pickupStatus: "Picked Up",
    deliveryStatus: "Delivery Failed",
    packageStatus: "Sealed",
    codStatus: "Pending Collection",
    riskLevel: "Medium",
    slaStatus: "Breached",
    riskScore: 65,
    assignedOfficer: "Dilan Perera",
    createdAt: "Jul 20, 2026",
    pickupDate: "Jul 21, 2026",
    expectedDelivery: "Jul 21, 2026",
    fulfilmentCompletion: 90,
    packageReadiness: 100,
    carrierConfidence: 70,
    trackingCompleteness: 100,
    deliveryConfidence: 0,
    codExposure: 8500
  },
  {
    id: "4",
    databaseId: "10260",
    reference: "SHP-2026-010260",
    trackingNumber: "Not Available",
    orderReference: "RET-2026-045091",
    shipmentType: "Return Pickup",
    customer: {
      name: "Elena Rodriguez",
      id: "CUS-2026-01842",
      phone: "+94 77 123 4567",
      email: "elena@example.com",
      address: "Katunayake",
      addressType: "Home",
      instructions: "",
    },
    supplier: {
      name: "Not Applicable",
      fulfilmentRef: "-",
      status: "-"
    },
    carrier: {
      name: "Unassigned",
      partnerName: "-",
      service: "Standard Return",
      pickupWindow: "-",
      estimatedTransit: "-",
      route: "Katunayake -> Colombo Main Hub",
      distance: "32 km",
      onTimeProbability: 0
    },
    origin: "Katunayake",
    destination: "Colombo Main Hub - Returns Inspection",
    packages: 1,
    itemsCount: 1,
    status: "Pending Carrier Assignment",
    pickupStatus: "Not Scheduled",
    deliveryStatus: "Not Dispatched",
    packageStatus: "Leak-Proof Packaging Required",
    codStatus: "Not Applicable",
    riskLevel: "Medium",
    slaStatus: "12 Hours Remaining",
    riskScore: 45,
    assignedOfficer: "Elena Vance",
    createdAt: "Jul 22, 2026",
    pickupDate: "-",
    expectedDelivery: "Pending",
    fulfilmentCompletion: 10,
    packageReadiness: 0,
    carrierConfidence: 0,
    trackingCompleteness: 0,
    deliveryConfidence: 0,
    codExposure: 0
  }
];
