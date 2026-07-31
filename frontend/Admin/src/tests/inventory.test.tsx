
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductInventoryPage from "@/app/admin/catalogue/inventory/page";

describe("ProductInventoryPage navigation and queue", () => {
  it("renders global inventory queue without productId", async () => {
    const ui = await ProductInventoryPage({ searchParams: Promise.resolve({}) });
    render(ui);
    
    // Check global breadcrumb
    expect(screen.getByText("Inventory Operations")).toBeInTheDocument();
    
    // "Product query filter" context panel should not be visible
    expect(screen.queryByText("Product Inventory Context")).not.toBeInTheDocument();

    // Verify KPI queue metrics
    expect(screen.getByText("Total Active Stock")).toBeInTheDocument();
    expect(screen.getByText("Quarantined Stock")).toBeInTheDocument();
    
    // Verify visible Open Batch actions
    const openBatchButtons = screen.getAllByRole("button", { name: /Open Batch/i });
    expect(openBatchButtons.length).toBeGreaterThan(0);
    
    // Navigation back to catalogue
    expect(screen.getByText("Back to Catalogue")).toBeInTheDocument();
  });

  it("renders product specific query filter when productId is provided", async () => {
    const ui = await ProductInventoryPage({ searchParams: Promise.resolve({ productId: "product-uuid-001" }) });
    render(ui);

    // "Product query filter" context panel should be visible
    expect(screen.getByText("Product Inventory Context")).toBeInTheDocument();
    expect(screen.getByText("Clear Product Filter")).toBeInTheDocument();
    
    // Navigation back to specific product approval detail
    expect(screen.getByText("Back to Product Approval Detail")).toBeInTheDocument();
  });
});
