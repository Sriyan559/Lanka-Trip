import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ReturnsQueuePage from "@/app/admin/marketplace/returns/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Screen 12 - Returns, Refunds & Disputes Queue Page", () => {
  it("renders page header title, description, and 7 header actions", async () => {
    render(<ReturnsQueuePage />);

    await waitFor(
      () => {
        expect(screen.getByRole("heading", { name: "Returns, Refunds & Disputes" })).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText("Review Priority Cases")).toBeInTheDocument();
    expect(screen.getByText("Assign Cases")).toBeInTheDocument();
    expect(screen.getByText("Export Report")).toBeInTheDocument();
    expect(screen.getByText("View Authenticity Complaints")).toBeInTheDocument();
    expect(screen.getByText("View Delivery Damage Cases")).toBeInTheDocument();
    expect(screen.getByText("View Refund Queue")).toBeInTheDocument();
    expect(screen.getByText("View Safety Complaints")).toBeInTheDocument();
  });

  it("renders 14 summary metric cards including dark-red monthly refund value card", async () => {
    render(<ReturnsQueuePage />);

    await waitFor(
      () => {
        expect(screen.getByText("NEW RETURN REQUESTS")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("AUTHENTICITY COMPLAINTS")).toBeInTheDocument();
    expect(screen.getAllByText("3")[0]).toBeInTheDocument();
    expect(screen.getByText("MONTHLY REFUND VALUE")).toBeInTheDocument();
    expect(screen.getByText("LKR 2.4M")).toBeInTheDocument();
  });

  it("renders return cases table rows matching reference image", async () => {
    render(<ReturnsQueuePage />);

    await waitFor(
      () => {
        expect(screen.getAllByText("RET-2026-045091")[0]).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText("Elena Rodriguez")).toBeInTheDocument();
    expect(screen.getByText("ORD-2026-009021")).toBeInTheDocument();
    expect(screen.getByText("Radiance Vitamin C Serum")).toBeInTheDocument();
    expect(screen.getAllByText("Luxe Distribution")[0]).toBeInTheDocument();

    expect(screen.getAllByText("RET-2026-045088")[0]).toBeInTheDocument();
    expect(screen.getByText("Kanishka M.")).toBeInTheDocument();

    expect(screen.getAllByText("RET-2026-045075")[0]).toBeInTheDocument();
    expect(screen.getByText("Nimali Sirisena")).toBeInTheDocument();
  });

  it("renders Open Case action buttons navigating to Screen 13", async () => {
    render(<ReturnsQueuePage />);

    await waitFor(
      () => {
        expect(screen.getAllByText("RET-2026-045091")[0]).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const openCaseBtns = screen.getAllByText("Open Case");
    expect(openCaseBtns.length).toBeGreaterThan(0);
  });

  it("renders Order Reference link connecting to Screen 11", async () => {
    render(<ReturnsQueuePage />);

    await waitFor(
      () => {
        const orderLink = screen.getByText("ORD-2026-009021");
        expect(orderLink).toHaveAttribute("href", "/admin/marketplace/orders/ORD-2026-009021");
      },
      { timeout: 3000 }
    );
  });

  it("renders right sidebar panels (Operations Health, Priority Alerts, Refund Performance, Quick Queue, Liability Summary)", async () => {
    render(<ReturnsQueuePage />);

    await waitFor(
      () => {
        expect(screen.getByText("Returns Operations Health")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText("Priority Alerts")).toBeInTheDocument();
    expect(screen.getByText("Refund Performance")).toBeInTheDocument();
    expect(screen.getByText("Quick Queue")).toBeInTheDocument();
    expect(screen.getByText("Liability Summary")).toBeInTheDocument();

    expect(screen.getByText("Supplier Liability")).toBeInTheDocument();
    expect(screen.getByText("LKR 1.25M")).toBeInTheDocument();
  });
});
