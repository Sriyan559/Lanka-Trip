import { Shipment, LogisticsPartner, LogisticsMetrics } from "@/types/logistics";

export const mockShipments: Shipment[] = [
  {
    id: "SHP-1001",
    trackingNumber: "TRK987654321",
    orderReference: "ORD-2026-X8",
    partnerName: "Ceylon Global Logistics",
    origin: "Colombo Warehouse",
    destination: "Kandy Central",
    status: "In Transit",
    estimatedDelivery: "2026-08-01",
  },
  {
    id: "SHP-1002",
    trackingNumber: "TRK123456789",
    orderReference: "ORD-2026-Y9",
    partnerName: "SL Express Courier Services",
    origin: "Galle Hub",
    destination: "Colombo 03",
    status: "Delivered",
    estimatedDelivery: "2026-07-29",
    actualDelivery: "2026-07-29",
  },
  {
    id: "SHP-1003",
    trackingNumber: "TRK112233445",
    orderReference: "ORD-2026-Z1",
    partnerName: "FastTrack Logistics",
    origin: "Jaffna Branch",
    destination: "Colombo 01",
    status: "Exception",
    estimatedDelivery: "2026-07-30",
  },
  {
    id: "SHP-1004",
    trackingNumber: "TRK556677889",
    orderReference: "ORD-2026-A2",
    partnerName: "Ceylon Global Logistics",
    origin: "Colombo Warehouse",
    destination: "Negombo",
    status: "Pending",
    estimatedDelivery: "2026-08-02",
  },
];

export const mockPartners: LogisticsPartner[] = [
  {
    id: "PRT-01",
    name: "Ceylon Global Logistics",
    type: "National Cargo",
    activeShipments: 124,
    onTimeDeliveryRate: 98.5,
    status: "Active",
  },
  {
    id: "PRT-02",
    name: "SL Express Courier Services",
    type: "Express Delivery",
    activeShipments: 345,
    onTimeDeliveryRate: 96.2,
    status: "Active",
  },
  {
    id: "PRT-03",
    name: "FastTrack Logistics",
    type: "Same-Day Delivery",
    activeShipments: 89,
    onTimeDeliveryRate: 91.0,
    status: "Active",
  }
];

export const mockLogisticsMetrics: LogisticsMetrics = {
  activeShipments: 558,
  deliveredToday: 142,
  exceptions: 12,
  activePartners: 3,
};
