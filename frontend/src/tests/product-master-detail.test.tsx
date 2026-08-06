import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductMasterDetailPage from "@/app/admin/catalogue/products/[productId]/page";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.setConfig({ testTimeout: 15000 });

// Mock Next.js router & params
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useParams: () => ({
    productId: "PROD-2024-00421",
  }),
}));

describe("Product Master Detail (Screen C07)", () => {
  it("renders breadcrumb, title, conflict warning and back link", () => {
    render(<ProductMasterDetailPage />);
    expect(screen.getByRole("heading", { name: "Product Master Detail", level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Back to Product Master Management/i)).toBeInTheDocument();
    expect(screen.getByText(/This product master was updated by Marcus Lee/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Refresh Data/i })).toBeInTheDocument();
  });

  it("renders Product Summary Card metadata and status strip", () => {
    render(<ProductMasterDetailPage />);
    expect(screen.getAllByText(/Radiance Vitamin C Serum/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("PROD-2024-00421").length).toBeGreaterThan(0);
    expect(screen.getAllByText("RAD-VITC-30ML").length).toBeGreaterThan(0);
    expect(screen.getAllByText("8901234567895").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Estée Lauder").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Luxe Distribution Pvt Ltd").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Elena Vance/i).length).toBeGreaterThan(0);
  });

  it("renders primary product action buttons", () => {
    render(<ProductMasterDetailPage />);
    expect(screen.getAllByRole("button", { name: /Edit Product/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Submit for Approval/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Preview Marketplace Listing/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /More Actions/i })).toBeInTheDocument();
  });

  it("renders business context strip and live data indicator", () => {
    render(<ProductMasterDetailPage />);
    expect(screen.getByText(/SL Beauty/i)).toBeInTheDocument();
    expect(screen.getByText(/Beauty Marketplace/i)).toBeInTheDocument();
    expect(screen.getByText(/Consumer Beauty/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Data/i)).toBeInTheDocument();
  });

  it("renders 12 readiness KPI cards", () => {
    render(<ProductMasterDetailPage />);
    expect(screen.getAllByText("85%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("72%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Valid").length).toBeGreaterThan(0);
    expect(screen.getAllByText("100%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("80%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Linked").length).toBeGreaterThan(0);
  });

  it("renders 12 detail navigation tabs and switches tabs", () => {
    render(<ProductMasterDetailPage />);
    expect(screen.getByRole("button", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Identity & Classification" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Brand & Supplier" })).toBeInTheDocument();

    const brandTabBtn = screen.getByRole("button", { name: "Brand & Supplier" });
    fireEvent.click(brandTabBtn);
    expect(screen.getByText(/Brand & Supplier Relationship Workspace/i)).toBeInTheDocument();
  });

  it("renders Overview tab cards and lower tables", () => {
    render(<ProductMasterDetailPage />);
    expect(screen.getByText("1. Product Identity")).toBeInTheDocument();
    expect(screen.getByText("2. Classification")).toBeInTheDocument();
    expect(screen.getByText("3. Brand & Supplier Relationships")).toBeInTheDocument();
    expect(screen.getByText("4. Product Content Summary")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Product Blocking Issues" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recent Product Master Activity" })).toBeInTheDocument();
  });

  it("renders right Product Intelligence sidebar and SLA progress bar", () => {
    render(<ProductMasterDetailPage />);
    expect(screen.getByRole("heading", { name: "Product Health" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Current Product State" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Approval & SLA" })).toBeInTheDocument();
    expect(screen.getByText("18h 45m")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Final Product Actions" })).toBeInTheDocument();
  });

  it("opens and closes Edit Product drawer", async () => {
    render(<ProductMasterDetailPage />);
    const editBtns = screen.getAllByRole("button", { name: /Edit Product/i });
    fireEvent.click(editBtns[0]);
    expect(screen.getByRole("heading", { name: "Edit Product Master" })).toBeInTheDocument();
    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Edit Product Master" })).not.toBeInTheDocument();
    });
  });

  it("opens and closes Submit Approval modal and Marketplace Preview modal", async () => {
    render(<ProductMasterDetailPage />);

    // Submit Approval
    const submitBtns = screen.getAllByRole("button", { name: /Submit for Approval/i });
    fireEvent.click(submitBtns[0]);
    expect(screen.getByRole("heading", { name: "Submit for Approval" })).toBeInTheDocument();
    const cancelSubmitBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelSubmitBtn);
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Submit for Approval" })).not.toBeInTheDocument();
    });

    // Marketplace Preview
    const previewBtns = screen.getAllByRole("button", { name: /Preview Marketplace Listing/i });
    fireEvent.click(previewBtns[0]);
    expect(screen.getByRole("heading", { name: "Storefront Marketplace Preview" })).toBeInTheDocument();
    const closePreviewBtn = screen.getByRole("button", { name: "Close Preview" });
    fireEvent.click(closePreviewBtn);
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Storefront Marketplace Preview" })).not.toBeInTheDocument();
    });
  });

  it("verifies ADMIN_NAVIGATION exposes Catalogue parent menu", () => {
    const catalogueNav = ADMIN_NAVIGATION.find((item) => item.id === "catalogue");
    expect(catalogueNav).toBeDefined();
    expect(catalogueNav?.href).toBe("/admin/catalogue");
  });
});
