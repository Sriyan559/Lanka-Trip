import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OrderDetailPage from "@/app/admin/marketplace/orders/[orderId]/page";
import * as navigation from "next/navigation";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams("tab=overview"),
}));

describe("Screen 11 - Marketplace Order Details Page", () => {
  it("renders order summary header and metrics for ORD-2026-009021", async () => {
    const params = Promise.resolve({ orderId: "ORD-2026-009021" });
    const Component = await OrderDetailPage({ params });
    render(Component);

    expect(screen.getAllByText("ORD-2026-009021").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Elena Rodriguez").length).toBeGreaterThan(0);
    expect(screen.getByText("CUS-2026-01842")).toBeInTheDocument();
    expect(screen.getAllByText("Web Storefront").length).toBeGreaterThan(0);
    expect(screen.getByText("LKR")).toBeInTheDocument();
    expect(screen.getByText("Processing")).toBeInTheDocument();
    expect(screen.getAllByText("Paid").length).toBeGreaterThan(0);
    expect(screen.getByText("Awaiting Supplier Confirmation")).toBeInTheDocument();
  });

  it("renders circular health score widget and top operational actions", async () => {
    const params = Promise.resolve({ orderId: "ORD-2026-009021" });
    const Component = await OrderDetailPage({ params });
    render(Component);

    expect(screen.getAllByText("82").length).toBeGreaterThan(0);
    expect(screen.getAllByText("82/100").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Matched").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Update Order Status").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact Customer").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Hold Order").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Cancel Order").length).toBeGreaterThan(0);
  });

  it("renders all 9 tab labels and order lifecycle timeline", async () => {
    const params = Promise.resolve({ orderId: "ORD-2026-009021" });
    const Component = await OrderDetailPage({ params });
    render(Component);

    expect(screen.getAllByRole("tab", { name: "Order Overview" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("tab", { name: "Items & Supplier Fulfilment" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("tab", { name: "Payment & Transactions" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("tab", { name: "Batch Allocation" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("tab", { name: "Shipping & Delivery" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("tab", { name: "Returns & Refunds" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("tab", { name: "Customer Communication" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("tab", { name: "Operational Issues" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("tab", { name: "Audit History" }).length).toBeGreaterThan(0);

    expect(screen.getAllByText("Order Lifecycle Timeline").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Order Placed").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Payment Confirmed").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Supplier Confirmation").length).toBeGreaterThan(0);
  });

  it("renders dark-red Financial Reconciliation card with exact figures", async () => {
    const params = Promise.resolve({ orderId: "ORD-2026-009021" });
    const Component = await OrderDetailPage({ params });
    render(Component);

    expect(screen.getAllByText("Financial Reconciliation").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Platform Commission (10%)").length).toBeGreaterThan(0);
    expect(screen.getAllByText("LKR 1,450.00").length).toBeGreaterThan(0);
    expect(screen.getAllByText("LKR 10,855.00").length).toBeGreaterThan(0);
  });

  it("opens modal when clicking Update Order Status", async () => {
    const params = Promise.resolve({ orderId: "ORD-2026-009021" });
    const Component = await OrderDetailPage({ params });
    render(Component);

    const updateBtns = screen.getAllByText("Update Order Status");
    fireEvent.click(updateBtns[0]);

    expect(screen.getByText("Mandatory Reason *")).toBeInTheDocument();
  });
});
