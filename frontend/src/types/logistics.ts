export type ShipmentStatus = 
  | "Pending Carrier Assignment"
  | "Pickup Scheduled"
  | "Scheduled"
  | "Awaiting Pickup"
  | "Picked Up"
  | "In Transit"
  | "Out for Delivery"
  | "Not Dispatched"
  | "Delivered"
  | "Delivery Failed"
  | "Return Shipment"
  | "Exception"
  | "Not Scheduled"
  | "Unassigned";

export type RiskLevel = "Low" | "Medium" | "High";
export type SLAStatus = "Within Target" | "Breached" | "6 Hours Remaining" | "12 Hours Remaining";
export type PackageStatus = "Ready for Handover" | "Sealed" | "Leak-Proof Packaging Required";
export type CODStatus = "Not Applicable" | "Pending Collection";

export interface ShipmentItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export interface Shipment {
  id: string;
  databaseId: string;
  reference: string;
  trackingNumber: string;
  orderReference: string;
  shipmentType: "Customer Delivery" | "Return Pickup" | "Supplier Fulfilment";
  
  customer: {
    name: string;
    id: string;
    phone: string;
    email: string;
    address: string;
    addressType: string;
    instructions: string;
  };

  supplier: {
    name: string;
    fulfilmentRef: string;
    status: string;
  };
  
  carrier: {
    name: string;
    partnerName: string;
    service: string;
    pickupWindow: string;
    estimatedTransit: string;
    route: string;
    distance: string;
    onTimeProbability: number;
  };

  origin: string;
  destination: string;
  
  packages: number;
  itemsCount: number;
  items?: ShipmentItem[];
  
  status: ShipmentStatus;
  pickupStatus: ShipmentStatus;
  deliveryStatus: ShipmentStatus;
  packageStatus: PackageStatus;
  codStatus: CODStatus;
  
  riskLevel: RiskLevel;
  slaStatus: SLAStatus;
  riskScore: number;

  assignedOfficer: string;
  
  createdAt: string;
  pickupDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  
  fulfilmentCompletion: number; // percentage
  packageReadiness: number;
  carrierConfidence: number;
  trackingCompleteness: number;
  deliveryConfidence: number;
  codExposure: number;
}

export interface LogisticsPartner {
  id: string;
  name: string;
  type: string;
  activeShipments: number;
  onTimeDeliveryRate: number;
  status: "Active" | "Inactive";
}

export interface LogisticsMetrics {
  totalActiveShipments: number;
  pendingCarrierAssignment: number;
  pickupScheduled: number;
  awaitingPickup: number;
  pickedUpToday: number;
  inTransit: number;
  outForDelivery: number;
  deliveredToday: number;
  deliveryExceptions: number;
  failedDeliveries: number;
  returnShipments: number;
  slaBreaches: number;
  codPendingRemittance: number;
  logisticsCostToday: number;
}

export interface OperationsHealth {
  averageDispatchTime: string;
  onTimePickupRate: number;
  onTimeDeliveryRate: number;
  activeSlaBreaches: number;
  carrierAssignmentBacklog: number;
  deliveryExceptionBacklog: number;
  unassignedHighRiskShipments: number;
}

export interface PriorityAlert {
  id: string;
  type: "Delivery Failed" | "Pickup Overdue" | "Carrier Unassigned" | "High-Risk Return" | "COD Variance" | "Package Damage";
  shipmentRef: string;
}

export interface QuickQueueItem {
  id: string;
  title: string;
  shipmentRef: string;
}

export interface CarrierPerformance {
  carrier: string;
  onTime: number;
  activeShipments: number;
  exceptions: number;
}

export interface CODFinancials {
  awaitingCollection: number;
  collected: number;
  remittancePending: number;
  variance: number;
  carrierChargesToday: number;
  deliveryLiabilityExposure: number;
}
