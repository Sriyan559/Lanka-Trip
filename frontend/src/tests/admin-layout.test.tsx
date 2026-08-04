import React from "react";
import Link from "next/link";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { ADMIN_NAVIGATION } from "@/constants/adminNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () =>
    "/admin/catalogue/product-approvals/product-uuid-001",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: {
      name: "Administrator",
      email: "admin@example.test",
      role: "super_admin",
    },
    logout: vi.fn(),
  }),
}));

describe("shared admin layout", () => {
  it("renders the product detail content inside the rich admin shell", () => {
    const { container } = render(
      <AdminShell>
        <Link href="/admin/catalogue/product-approvals">
          Back to Product Approval Queue
        </Link>
      </AdminShell>,
    );

    expect(container.querySelector(".shell-rich")).toBeInTheDocument();
    expect(container.querySelector(".sidebar-rich")).toBeInTheDocument();
    expect(container.querySelector(".header-rich")).toBeInTheDocument();
    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("link", { name: "Back to Product Approval Queue" }),
    );
    expect(
      screen.getByRole("link", {
        name: "Go to SL Beauty Admin Dashboard",
      }),
    ).toHaveAttribute("href", "/admin/dashboard");
  });

  it("renders structured catalogue navigation with the product queue active", () => {
    render(<AdminShell>Product detail</AdminShell>);

    expect(screen.getByRole("navigation", { name: "Admin navigation" }))
      .toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Catalogue" }))
      .toHaveClass("active");
    expect(screen.getByRole("link", { name: "Product Approvals" }))
      .toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Inventory & Expiry" }))
      .not.toHaveClass("active");
  });

  it("renders the shared header controls", () => {
    render(<AdminShell>Product detail</AdminShell>);

    expect(screen.getByRole("textbox", { name: "Global search" }))
      .toHaveClass("header-search-input");
    expect(screen.getByRole("button", { name: "Notifications" }))
      .toHaveClass("header-icon-btn");
    expect(screen.getByRole("button", { name: "Help" }))
      .toHaveClass("header-icon-btn");
    expect(screen.getByRole("button", { name: "Quick Action" }))
      .toHaveClass("header-cta");
  });

  it("uses implemented routes for every enabled sidebar item", () => {
    render(<AdminShell>Product detail</AdminShell>);

    expect(screen.getByRole("link", { name: "Dashboard" }))
      .toHaveAttribute("href", "/admin/dashboard");
    expect(screen.getByRole("link", { name: "Marketplace" }))
      .toHaveAttribute("href", "/admin/marketplace");
    expect(screen.getByRole("link", { name: "Catalogue" }))
      .toHaveAttribute("href", "/admin/catalogue/product-approvals");
    expect(screen.getByRole("link", { name: "Brands & Suppliers" }))
      .toHaveAttribute("href", "/admin/verification/brand-authorizations");
    expect(screen.getByRole("link", { name: "Verification & Compliance" }))
      .toHaveAttribute("href", "/admin/verification/suppliers");
    expect(screen.getByRole("link", { name: "Logistics" }))
      .toHaveAttribute("href", "/admin/logistics");
    expect(screen.getByRole("link", { name: "Customer Support" }))
      .toHaveAttribute("href", "/admin/customer-support/cases");
    expect(screen.getByRole("link", { name: "Analytics" }))
      .toHaveAttribute("href", "/admin/analytics");
    expect(screen.getByRole("link", { name: "Ecosystem Modules" }))
      .toHaveAttribute("href", "/admin/ecosystem-modules");
  });

  it("renders unimplemented modules as disabled non-links", () => {
    const { container } = render(<AdminShell>Product detail</AdminShell>);
    const disabledItems = container.querySelectorAll(
      '.nav-link-rich[aria-disabled="true"]',
    );

    expect(disabledItems).toHaveLength(4);
    expect(screen.queryByRole("link", { name: /Customers/ }))
      .not.toBeInTheDocument();
    expect(screen.getAllByText("Coming Soon")).toHaveLength(4);
  });

  it("keeps all enabled routes centralized and absolute", () => {
    const enabledItems = ADMIN_NAVIGATION.filter((item) => !item.disabled);

    expect(enabledItems.every((item) => item.href?.startsWith("/admin/")))
      .toBe(true);
    expect(
      enabledItems.flatMap((item) => item.children ?? [])
        .every((item) => item.href.startsWith("/admin/")),
    ).toBe(true);
  });
});
