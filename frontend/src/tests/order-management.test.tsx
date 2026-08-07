import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import OrderManagementPage from "@/app/admin/marketplace/orders/page";
import OrderDetailPage from "@/app/admin/marketplace/orders/[orderId]/page";
import { exportOrdersCsv, fetchMarketplaceOrders, assignOrders } from "@/services/api/orderService";

// Mock Next.js router & search params
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  notFound: () => {
    throw new Error("404 Not Found");
  },
}));

describe("Screen 10 — Marketplace Order Management", () => {
  it("renders Order Management page title and header actions", async () => {
    render(<OrderManagementPage />);

    expect(screen.getByText("Order Management")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Monitor customer orders, payments, multi-supplier fulfilment/i
      )
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Review Priority Orders/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Assign Orders/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Export Orders/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Failed Payments/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Return Requests/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Cancelled/i })).toBeInTheDocument();
  });

  it("renders 12 metric cards across two rows", async () => {
    render(<OrderManagementPage />);

    expect(screen.getAllByText("Total Today")[0]).toBeInTheDocument();
    expect(screen.getAllByText("1,482")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Pending Payment")[0]).toBeInTheDocument();
    expect(screen.getAllByText("42")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Payment Failed")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Processing")[0]).toBeInTheDocument();
    expect(screen.getAllByText("312")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Awaiting Supplier")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Ready for Dispatch")[0]).toBeInTheDocument();
    expect(screen.getAllByText("In Transit")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Delivered Today")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Cancelled")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Returns in Progress")[0]).toBeInTheDocument();
    expect(screen.getAllByText("SLA Breaches")[0]).toBeInTheDocument();
    expect(screen.getAllByText("High-Risk Orders")[0]).toBeInTheDocument();
  });

  it("renders order table sample rows", async () => {
    render(<OrderManagementPage />);

    await waitFor(() => {
      expect(screen.getAllByText("ORD-2026-009021")[0]).toBeInTheDocument();
      expect(screen.getByText("5S6814-409-52H")).toBeInTheDocument();
      expect(screen.getByText("Elena Rodriguez")).toBeInTheDocument();

      expect(screen.getAllByText("ORD-2026-009018")[0]).toBeInTheDocument();
      expect(screen.getByText("Julian Vance")).toBeInTheDocument();

      expect(screen.getByText("ORD-2026-008992")).toBeInTheDocument();
      expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    });
  });

  it("renders right operations panel cards", async () => {
    render(<OrderManagementPage />);

    expect(screen.getAllByText("Order Operations Health")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Priority Alerts")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Payment Summary")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Quick Queue")[0]).toBeInTheDocument();

    expect(screen.getAllByText("LKR 3.65M")[0]).toBeInTheDocument();
    expect(screen.getAllByText("LKR 1.12M")[0]).toBeInTheDocument();
  });

  it("filters orders by search query", async () => {
    const result = await fetchMarketplaceOrders({ search: "Elena Rodriguez" });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0].customerName).toBe("Elena Rodriguez");
  });

  it("exports orders to CSV format", async () => {
    const csvContent = await exportOrdersCsv();
    expect(csvContent).toContain("Order Reference");
    expect(csvContent).toContain("ORD-2026-009021");
    expect(csvContent).toContain("Elena Rodriguez");
  });

  it("assigns orders to an officer successfully", async () => {
    const res = await assignOrders({
      orderIds: ["5S6814-409-52H"],
      officerId: "off-1",
      officerName: "Elena Vance",
      note: "Priority assignment test",
    });
    expect(res.success).toBe(true);
    expect(res.message).toContain("Elena Vance");
  });

  it("renders order detail page for valid ID and handles invalid ID", async () => {
    const ValidComponent = await OrderDetailPage({
      params: Promise.resolve({ orderId: "5S6814-409-52H" }),
    });
    render(ValidComponent);
    expect(
      screen.getByRole("heading", { name: "ORD-2026-009021" }),
    ).toBeInTheDocument();

    await expect(
      OrderDetailPage({
        params: Promise.resolve({ orderId: "INVALID-ORDER-ID" }),
      })
    ).rejects.toThrow("404 Not Found");
  });
});
