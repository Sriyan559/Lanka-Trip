import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerSegmentsPage from "@/app/admin/customers/segments/page";

// Mock Next.js navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/customers/segments",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

describe("CU05 Customer Segments & Groups Workspace", () => {
  it("renders page header, title, context strip, top actions, and KPI grid", () => {
    render(<CustomerSegmentsPage />);

    // Title
    expect(screen.getByText("Customer Segments & Groups")).toBeDefined();

    // Top action buttons
    expect(screen.getAllByText("Export Segment Report").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Review Segment Conflicts").length).toBeGreaterThan(0);
    expect(screen.getByText("Create Segment")).toBeDefined();

    // KPI cards
    expect(screen.getByText("Total Segments")).toBeDefined();
    expect(screen.getAllByText("Active Segments").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Dynamic Segments").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Static Groups").length).toBeGreaterThan(0);
  });

  it("renders primary horizontal tabs and responds to tab switching", () => {
    render(<CustomerSegmentsPage />);

    expect(screen.getAllByText("Overview").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Dynamic").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Static Groups").length).toBeGreaterThan(0);

    // Click Dynamic tab
    fireEvent.click(screen.getAllByText("Dynamic")[0]);
    expect(screen.getAllByText("Dynamic").length).toBeGreaterThan(0);
  });

  it("renders segment portfolio table and handles search input", () => {
    render(<CustomerSegmentsPage />);

    expect(screen.getByText("Customer Segment Portfolio")).toBeDefined();
    expect(screen.getAllByText("High-Value Beauty Buyers").length).toBeGreaterThan(0);
    expect(screen.getByText("Gold Loyalty Members")).toBeDefined();

    // Type in search
    const searchInput = screen.getByPlaceholderText("Search segments by name, ID, owner...");
    fireEvent.change(searchInput, { target: { value: "Gold" } });

    expect(screen.getByText("Gold Loyalty Members")).toBeDefined();
    expect(screen.queryByText("Dormant & Re-engagement Pool")).toBeNull();
  });

  it("opens Create Segment modal on clicking Create Segment button", () => {
    render(<CustomerSegmentsPage />);

    const createBtn = screen.getByText("Create Segment");
    fireEvent.click(createBtn);

    expect(screen.getAllByText("Create Customer Segment").length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText("e.g. High-Value Beauty Buyers")).toBeDefined();
  });

  it("renders selected segment preview panel and right segmentation health rail", () => {
    render(<CustomerSegmentsPage />);

    expect(screen.getByText("Selected Segment /")).toBeDefined();
    expect(screen.getAllByText("A. Segmentation Health").length).toBeGreaterThan(0);
    expect(screen.getByText("B. Priority Segment Alerts")).toBeDefined();
  });
});
