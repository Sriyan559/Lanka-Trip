import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import LogisticsShipmentsPage from "@/app/admin/logistics/shipments/page";
import ShipmentDetailPage from "@/app/admin/logistics/shipments/[id]/page";
import {
  fetchShipmentDetail,
  fetchShipmentOperations,
} from "@/services/api/logisticsService";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({ id: "SHP-2026-010293" }),
}));

describe("Logistics shipment operations", () => {
  it("filters the quick queue to priority shipments", async () => {
    const result = await fetchShipmentOperations({ filterKey: "priority" });

    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((shipment) => shipment.isPriority)).toBe(true);
  });

  it("returns a known shipment and rejects an unknown shipment", async () => {
    await expect(fetchShipmentDetail("SHP-2026-010293")).resolves.toMatchObject({
      shipment: { publicReference: "SHP-2026-010293" },
    });
    await expect(fetchShipmentDetail("SHP-UNKNOWN")).rejects.toThrow(
      "Shipment not found",
    );
  });

  it("renders the shipment workspace and its rows", async () => {
    render(<LogisticsShipmentsPage />);

    expect(
      screen.getByRole("heading", { name: "Logistics & Fulfilment Operations" }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByText("10293")[0]).toBeInTheDocument();
    });
    expect(
      screen.getByRole("button", { name: "Export Shipment Report" }),
    ).toBeInTheDocument();
  });

  it("renders a valid shipment detail route", async () => {
    render(<ShipmentDetailPage />);

    await waitFor(() => {
      expect(screen.getByText("Shipment Overview")).toBeInTheDocument();
    });
    expect(screen.getAllByText("SHP-2026-010293")[0]).toBeInTheDocument();
    expect(screen.getByText("Final Shipment Actions")).toBeInTheDocument();
  });
});
