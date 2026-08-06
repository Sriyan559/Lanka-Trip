import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CreateProductMasterPage from "@/app/admin/catalogue/products/create/page";
import EditProductMasterPage from "@/app/admin/catalogue/products/[productId]/edit/page";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.setConfig({ testTimeout: 15000 });

// Mock Next.js router & params
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === "step" ? "ingredients-safety" : null),
  }),
  useParams: () => ({
    productId: "PROD-2024-00421",
  }),
}));

describe("Product Create / Edit Form Workspace (Screen C08)", () => {
  it("renders Create Product Master page header, breadcrumbs, and mode badge", () => {
    render(<CreateProductMasterPage />);
    expect(screen.getByRole("heading", { name: "Create Product Master", level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Create a validated product master record/i)).toBeInTheDocument();
    expect(screen.getAllByText("Create").length).toBeGreaterThan(0);
    expect(screen.getAllByText("New").length).toBeGreaterThan(0);
  });

  it("renders Edit Product Master page header and populates product ID", () => {
    render(<EditProductMasterPage />);
    expect(screen.getByRole("heading", { name: "Edit Product Master", level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText(/Edit Product Master \(PROD-2024-00421\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Edit").length).toBeGreaterThan(0);
    expect(screen.getAllByText("v2").length).toBeGreaterThan(0);
  });

  it("renders 10 workflow steps and switches active step", () => {
    render(<CreateProductMasterPage />);
    expect(screen.getByRole("button", { name: /Identity/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Classification/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ingredients & Safety/i })).toBeInTheDocument();

    const identityBtn = screen.getByRole("button", { name: /Identity/i });
    fireEvent.click(identityBtn);
    expect(screen.getByRole("heading", { name: "Step 1 — Product Identity" })).toBeInTheDocument();
  });

  it("renders Completeness Summary metrics and Regulatory Compliance Block alert", () => {
    render(<CreateProductMasterPage />);
    expect(screen.getAllByText("68%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("82").length).toBeGreaterThan(0);
    expect(screen.getAllByText("7").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Regulatory Compliance Block").length).toBeGreaterThan(0);
  });

  it("renders Formulation Matrix table and ingredient rows", () => {
    render(<CreateProductMasterPage />);
    expect(screen.getByRole("heading", { name: "Formulation Matrix" })).toBeInTheDocument();
    expect(screen.getByText("Vitamin C")).toBeInTheDocument();
    expect(screen.getByText("Ascorbic Acid")).toBeInTheDocument();
    expect(screen.getByText("15.00%")).toBeInTheDocument();
    expect(screen.getByText("Hyaluronic Acid")).toBeInTheDocument();
    expect(screen.getByText("Sodium Hyaluronate")).toBeInTheDocument();
    expect(screen.getByText("2.00%")).toBeInTheDocument();
  });

  it("opens and closes Add Ingredient drawer", async () => {
    render(<CreateProductMasterPage />);
    const addBtn = screen.getByRole("button", { name: /Add Ingredient/i });
    fireEvent.click(addBtn);

    expect(screen.getByRole("heading", { name: "Add Formulation Ingredient" })).toBeInTheDocument();

    const cancelBtns = screen.getAllByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtns[cancelBtns.length - 1]);

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Add Formulation Ingredient" })).not.toBeInTheDocument();
    });
  });

  it("opens and closes Import Ingredient List modal", async () => {
    render(<CreateProductMasterPage />);
    const importBtn = screen.getByRole("button", { name: /Import Ingredient List/i });
    fireEvent.click(importBtn);

    expect(screen.getByRole("heading", { name: "Import Ingredient List" })).toBeInTheDocument();

    const cancelBtns = screen.getAllByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtns[cancelBtns.length - 1]);

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Import Ingredient List" })).not.toBeInTheDocument();
    });
  });

  it("opens and completes Safety Evidence upload modal", async () => {
    render(<CreateProductMasterPage />);
    const uploadBtns = screen.getAllByRole("button", { name: /Upload Safety Evidence/i });
    fireEvent.click(uploadBtns[0]);

    expect(screen.getByRole("heading", { name: "Upload Clinical Safety Evidence" })).toBeInTheDocument();

    const saveBtn = screen.getByRole("button", { name: "Save & Resolve Blocker" });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Upload Clinical Safety Evidence" })).not.toBeInTheDocument();
    });
  });

  it("renders right Validation & Readiness sidebar metrics and blocking issues", () => {
    render(<CreateProductMasterPage />);
    expect(screen.getByRole("heading", { name: "Validation & Readiness" })).toBeInTheDocument();
    expect(screen.getAllByText("Missing safety certificate").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Back packaging image missing").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Compare Candidates/i }).length).toBeGreaterThan(0);
  });

  it("renders sticky bottom action bar with step progress and actions", () => {
    render(<CreateProductMasterPage />);
    expect(screen.getByText("STEP 5 / 10")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Save & Continue/i }).length).toBeGreaterThan(0);
  });

  it("verifies ADMIN_NAVIGATION exposes Catalogue parent menu", () => {
    const catalogueNav = ADMIN_NAVIGATION.find((item) => item.id === "catalogue");
    expect(catalogueNav).toBeDefined();
    expect(catalogueNav?.href).toBe("/admin/catalogue");
  });
});
