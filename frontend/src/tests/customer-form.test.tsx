import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerCreatePage from "@/app/admin/customers/create/page";
import CustomerEditPage from "@/app/admin/customers/[customerId]/edit/page";
import { CustomerFormDashboard } from "@/components/admin/customers/form/CustomerFormDashboard";
import { getCustomerFormInitialData } from "@/data/customer-form.mock";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/admin/customers/create",
  useSearchParams: () => new URLSearchParams(),
}));

describe("CU04 Customer Create & Edit Workspace Suite", () => {
  it("fetches default mock data for Create mode", () => {
    const data = getCustomerFormInitialData("create");
    expect(data.mode).toBe("create");
    expect(data.basicIdentity.firstName).toBe("");
    expect(data.completenessMetrics.currentStepLabel).toBe("Customer Type");
  });

  it("fetches pre-populated mock data for Edit mode (CUST-100001)", () => {
    const data = getCustomerFormInitialData("edit", "CUST-100001");
    expect(data.mode).toBe("edit");
    expect(data.basicIdentity.firstName).toBe("Amaya");
    expect(data.basicIdentity.lastName).toBe("Perera");
    expect(data.completenessMetrics.overallCompleteness).toBe(82);
  });

  it("renders Create mode workspace header, context strip, stepper, and cards", () => {
    render(<CustomerFormDashboard mode="create" />);

    expect(screen.getAllByText("Customer Create")[0]).toBeInTheDocument();
    expect(screen.getByText("SL Beauty")).toBeInTheDocument();
    expect(screen.getByText("Overall Completeness")).toBeInTheDocument();
    expect(screen.getByText("Cross-Step Summary")).toBeInTheDocument();
  });

  it("renders Edit mode pre-populated form with Amaya Perera data", () => {
    render(<CustomerFormDashboard mode="edit" customerId="CUST-100001" />);

    expect(screen.getByText("Customer Create / Edit")).toBeInTheDocument();
    expect(screen.getByText("Concurrency Notice:")).toBeInTheDocument();

    const firstNameInput = screen.getByDisplayValue("Amaya");
    expect(firstNameInput).toBeInTheDocument();

    const lastNameInput = screen.getByDisplayValue("Perera");
    expect(lastNameInput).toBeInTheDocument();
  });

  it("allows switching workflow steps via stepper", () => {
    render(<CustomerFormDashboard mode="edit" customerId="CUST-100001" />);

    const step1Marker = screen.getAllByText("Customer Type")[0];
    fireEvent.click(step1Marker);

    expect(screen.getAllByText(/Step 1 \/ 13 — Customer Type/)[0]).toBeInTheDocument();
  });

  it("triggers validation error when clearing a required field and clicking Validate", () => {
    render(<CustomerFormDashboard mode="edit" customerId="CUST-100001" />);

    const firstNameInput = screen.getByDisplayValue("Amaya");
    fireEvent.change(firstNameInput, { target: { value: "" } });

    const validateBtn = screen.getAllByRole("button", { name: /Validate Customer/i })[0];
    fireEvent.click(validateBtn);

    expect(screen.getByText("First Name is required")).toBeInTheDocument();
  });

  it("opens live form preview modal on clicking Preview Customer", () => {
    render(<CustomerFormDashboard mode="edit" customerId="CUST-100001" />);

    const previewBtn = screen.getAllByRole("button", { name: /Preview Customer/i })[0];
    fireEvent.click(previewBtn);

    expect(screen.getByText("Unsaved Live Form Preview")).toBeInTheDocument();
    expect(screen.getByText("Ms. Amaya Perera")).toBeInTheDocument();
  });

  it("renders app router page component for create mode", () => {
    render(<CustomerCreatePage />);
    expect(screen.getAllByText("Customer Create")[0]).toBeInTheDocument();
  });

  it("renders app router page component for edit mode", () => {
    render(<CustomerEditPage params={{ customerId: "CUST-100001" }} />);
    expect(screen.getByText("Customer Create / Edit")).toBeInTheDocument();
  });
});
