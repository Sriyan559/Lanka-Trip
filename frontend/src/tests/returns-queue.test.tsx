import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ReturnsQueuePage from "@/app/admin/marketplace/returns/page";
import { ReturnsPagination, getPaginationItems } from "@/components/admin/returns/ReturnsPagination";
import { fetchReturnCases } from "@/services/api/returnsService";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/marketplace/returns",
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

describe("Returns pagination", () => {
  const renderPagination = (overrides: Partial<React.ComponentProps<typeof ReturnsPagination>> = {}) => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();
    render(
      <ReturnsPagination
        page={1}
        pageSize={10}
        total={244}
        totalPages={25}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        {...overrides}
      />
    );
    return { onPageChange, onPageSizeChange };
  };

  it("renders the correct summary and accessible disabled controls on page one", () => {
    renderPagination();
    expect(screen.getByText(/Showing/)).toHaveTextContent("Showing 1–10 of 244 cases");
    expect(screen.getByRole("navigation", { name: "Returns pagination" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to first page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go to previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go to page 1" })).toHaveAttribute("aria-current", "page");
  });

  it("supports page-number, next, and last-page navigation", () => {
    const { onPageChange } = renderPagination();
    fireEvent.click(screen.getByRole("button", { name: "Go to page 3" }));
    fireEvent.click(screen.getByRole("button", { name: "Go to next page" }));
    fireEvent.click(screen.getByRole("button", { name: "Go to last page" }));
    expect(onPageChange.mock.calls).toEqual([[3], [2], [25]]);
  });

  it("supports first and previous navigation and disables forward controls on the last page", () => {
    const { onPageChange } = renderPagination({ page: 25 });
    fireEvent.click(screen.getByRole("button", { name: "Go to first page" }));
    fireEvent.click(screen.getByRole("button", { name: "Go to previous page" }));
    expect(onPageChange.mock.calls).toEqual([[1], [24]]);
    expect(screen.getByRole("button", { name: "Go to next page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go to last page" })).toBeDisabled();
  });

  it("changes page size and includes the 100-row project fallback option", () => {
    const { onPageSizeChange } = renderPagination();
    fireEvent.change(screen.getByLabelText("Rows per page:"), { target: { value: "100" } });
    expect(onPageSizeChange).toHaveBeenCalledWith(100);
  });

  it("renders an empty-result summary", () => {
    renderPagination({ total: 0, totalPages: 1 });
    expect(screen.getByText(/Showing/)).toHaveTextContent("Showing 0–0 of 0 cases");
  });

  it("uses a compact page range with neighboring pages and ellipses", () => {
    expect(getPaginationItems(10, 25)).toEqual([1, "ellipsis-start", 8, 9, 10, 11, 12, "ellipsis-end", 25]);
    expect(getPaginationItems(1, 500)).toEqual([1, 2, 3, 4, 5, "ellipsis-end", 500]);
  });

  it("prevents duplicate navigation while loading", () => {
    const { onPageChange } = renderPagination({ loading: true });
    expect(screen.getByRole("button", { name: "Go to next page" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Go to next page" }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("clamps invalid and out-of-range client-side requests", async () => {
    const invalid = await fetchReturnCases({ page: -4, pageSize: 17 });
    expect(invalid.page).toBe(1);
    expect(invalid.pageSize).toBe(10);

    const pastEnd = await fetchReturnCases({ page: 999, pageSize: 10 });
    expect(pastEnd.page).toBe(pastEnd.totalPages);
    expect(pastEnd.data.length).toBeGreaterThan(0);
  });
});
