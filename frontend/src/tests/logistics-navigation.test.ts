import { describe, expect, it } from "vitest";
import {
  ADMIN_NAVIGATION,
  getActiveAdminNavigation,
  getActiveChildHref,
} from "@/constants/adminNavigation";

const expectedChildren = [
  ["Command Center", "/admin/logistics"],
  ["Fulfilment Orders", "/admin/logistics/fulfilment-orders"],
  ["Warehouses & Fulfilment Centres", "/admin/logistics/warehouses"],
  ["Inventory Allocation", "/admin/logistics/inventory-allocation"],
  ["Shipments & Tracking", "/admin/logistics/shipments"],
  ["Shipment Detail & Carrier Tracking", "/admin/logistics/shipments?open=first"],
  ["Carriers & Delivery Partners", "/admin/logistics/carriers-delivery-partners"],
  ["Delivery Configuration", "/admin/logistics/delivery-configuration"],
  ["Returns & Reverse Logistics", "/admin/logistics/returns-reverse-logistics"],
  ["Return/Reverse Logistics Details", "/admin/logistics/reverse-logistics/RET-2026-004281"],
  ["Exceptions, Claims & Reconciliation", "/admin/logistics/exceptions-reconciliation"],
  ["Reports, Import, Export & Audit", "/admin/logistics/reports-import-export-audit"],
];

describe("Logistics admin navigation", () => {
  const logistics = ADMIN_NAVIGATION.find((item) => item.id === "logistics");

  it("registers all requested children once and in the exact order", () => {
    expect(logistics?.children?.map(({ label, href }) => [label, href]))
      .toEqual(expectedChildren);
    expect(new Set(logistics?.children?.map((child) => child.href)).size).toBe(12);
  });

  it("distinguishes the command center from child and detail routes", () => {
    expect(getActiveAdminNavigation("/admin/logistics")?.id).toBe("logistics");
    expect(getActiveChildHref(logistics, "/admin/logistics")).toBe("/admin/logistics");
    expect(getActiveChildHref(logistics, "/admin/logistics/warehouses")).toBe("/admin/logistics/warehouses");
    expect(getActiveChildHref(logistics, "/admin/logistics/warehouses/WH-CMB-01")).toBe("/admin/logistics/warehouses");
    expect(getActiveChildHref(logistics, "/admin/logistics/inventory-allocation"))
      .toBe("/admin/logistics/inventory-allocation");
    expect(getActiveChildHref(logistics, "/admin/logistics/shipments"))
      .toBe("/admin/logistics/shipments");
    expect(getActiveChildHref(logistics, "/admin/logistics/shipments?open=first"))
      .toBe("/admin/logistics/shipments?open=first");
    expect(getActiveChildHref(logistics, "/admin/logistics/reverse-logistics"))
      .toBe("/admin/logistics/returns-reverse-logistics");
    expect(getActiveChildHref(logistics, "/admin/logistics/reverse-logistics/RET-2026-004281"))
      .toBe("/admin/logistics/reverse-logistics/RET-2026-004281");
    expect(getActiveChildHref(logistics, "/admin/logistics/exceptions-reconciliation"))
      .toBe("/admin/logistics/exceptions-reconciliation");
    expect(getActiveChildHref(logistics, "/admin/logistics/reports-import-export-audit"))
      .toBe("/admin/logistics/reports-import-export-audit");
  });

  it("does not activate Logistics for a similarly named unrelated route", () => {
    expect(getActiveAdminNavigation("/admin/logistics-partners")).toBeNull();
  });
});
