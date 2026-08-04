import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ReturnDetailPage from "@/app/admin/marketplace/returns/[returnId]/page";

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Screen 13 - Return Case Details and Decision Management Page", () => {
  it("renders return case header, public reference, database ID, and original order links for RET-2026-045091", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    expect(await screen.findByRole("heading", { name: "RET-2026-045091" })).toBeInTheDocument();
    expect(screen.getByText("Database Return ID:")).toBeInTheDocument();
    expect(screen.getByText("45091")).toBeInTheDocument();
    const orderRefLinks = screen.getAllByText("ORD-2026-009021");
    expect(orderRefLinks.length).toBeGreaterThan(0);
    expect(screen.getByText("9021")).toBeInTheDocument();
  });

  it("renders separated status badges (Eligibility Review, Eligible Subject to Inspection, Pending, Pending Review, None, Low, 18 Hours Remaining)", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    expect(await screen.findByText("Eligibility Review")).toBeInTheDocument();
    expect(screen.getByText("Eligible Subject to Inspection")).toBeInTheDocument();
    expect(screen.getByText("Pending Review")).toBeInTheDocument();
    const slaPills = screen.getAllByText("18 Hours Remaining");
    expect(slaPills.length).toBeGreaterThan(0);
  });

  it("renders Case Summary Card customer statement and metadata", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    expect(await screen.findByText(/Seal arrived broken and the product leaked into the outer packaging/i)).toBeInTheDocument();
    expect(screen.getByText("Previous Claims")).toBeInTheDocument();
    expect(screen.getByText("1 Claim")).toBeInTheDocument();
    expect(screen.getByText("Seal Broken and Leakage")).toBeInTheDocument();
  });

  it("renders Original Order Summary card with functional link to Screen 11", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    expect(await screen.findByText("Original Order Summary")).toBeInTheDocument();
    const orderLinks = screen.getAllByText("ORD-2026-009021");
    expect(orderLinks.length).toBeGreaterThan(0);
    expect(orderLinks[0].closest("a")).toHaveAttribute("href", "/admin/marketplace/orders/ORD-2026-009021");
  });

  it("renders Customer Profile Card, Health Metrics, and Internal Case Note", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    expect(await screen.findByText("Customer Profile")).toBeInTheDocument();
    expect(screen.getByText("Elena Rodriguez")).toBeInTheDocument();
    expect(screen.getByText("elena.rodriguez@example.com")).toBeInTheDocument();

    expect(screen.getByText("Internal Risk & Health Metrics")).toBeInTheDocument();
    const scoreBadges = screen.getAllByText("88/100");
    expect(scoreBadges.length).toBeGreaterThan(0);

    expect(screen.getByText(/Initial eligibility review completed/i)).toBeInTheDocument();
  });

  it("renders right-side Case Decision Panel with blocking issues and decision actions", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    expect(await screen.findByText("Final Case Decision")).toBeInTheDocument();
    expect(screen.getByText("Physical inspection not completed")).toBeInTheDocument();
    expect(screen.getByText("Review Inspection")).toBeInTheDocument();

    const replacementBtns = screen.getAllByText("Approve Replacement");
    expect(replacementBtns.length).toBeGreaterThan(0);
    expect(screen.getByText("Approve Partial Refund")).toBeInTheDocument();
    expect(screen.getByText("Request Additional Evidence")).toBeInTheDocument();
    expect(screen.getByText("Schedule Inspection")).toBeInTheDocument();
    expect(screen.getByText("Reject Return")).toBeInTheDocument();
    expect(screen.getByText("Escalate Case")).toBeInTheDocument();
    expect(screen.getByText("Suspend Decision")).toBeInTheDocument();
  });

  it("renders disabled Approve Full Refund explanation while inspection is pending", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    expect(await screen.findByText(/Available after inspection completion or through an authorized override/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Approve Full Refund/i })).toBeDisabled();
  });

  it("marks the overview tab active and synchronizes tab changes to the URL", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    const overview = await screen.findByRole("tab", { name: "Case Overview" });
    expect(overview).toHaveAttribute("aria-current", "page");
    fireEvent.click(screen.getByRole("tab", { name: "Returned Items" }));
    expect(pushMock).toHaveBeenCalledWith("/admin/marketplace/returns/RET-2026-045091?tab=items");
  });

  it("supports arrow-key tab navigation", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    fireEvent.keyDown(await screen.findByRole("tab", { name: "Case Overview" }), { key: "ArrowRight" });
    expect(pushMock).toHaveBeenCalledWith("/admin/marketplace/returns/RET-2026-045091?tab=items");
  });

  it("opens the correct tab from a blocking issue", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    fireEvent.click(await screen.findByRole("button", { name: "Review Inspection" }));
    expect(pushMock).toHaveBeenCalledWith("/admin/marketplace/returns/RET-2026-045091?tab=inspection");
  });

  it("opens and closes the replacement workflow with Escape", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    fireEvent.click((await screen.findAllByRole("button", { name: "Approve Replacement" }))[0]);
    expect(screen.getByRole("dialog", { name: "Approve Replacement Order" })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("shows required-field feedback for an empty replacement submission", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    fireEvent.click((await screen.findAllByRole("button", { name: "Approve Replacement" }))[0]);
    const dialog = screen.getByRole("dialog", { name: "Approve Replacement Order" });
    fireEvent.submit(dialog.querySelector("form")!);
    expect(await screen.findByText("A mandatory reason is required to approve product replacement.")).toBeInTheDocument();
  });

  it.each([
    ["Approve Partial Refund", "Approve Partial Refund"],
    ["Request Additional Evidence", "Request Additional Evidence"],
    ["Schedule Inspection", "Schedule Physical Inspection"],
    ["Reject Return", "Reject Return Case"],
    ["Escalate Case", "Escalate Case Priority"],
    ["Suspend Decision", "Suspend Decision"],
  ])("opens the %s workflow dialog", async (buttonName, dialogName) => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-2026-045091" }) });
    render(page);

    fireEvent.click(await screen.findByRole("button", { name: buttonName }));
    expect(screen.getByRole("dialog", { name: dialogName })).toBeInTheDocument();
  });

  it("renders Return Case Not Found state for invalid return ID", async () => {
    const page = await ReturnDetailPage({ params: Promise.resolve({ returnId: "RET-9999-INVALID" }) });
    render(page);

    expect(await screen.findByRole("heading", { name: "Return Case Not Found" })).toBeInTheDocument();
    expect(screen.getByText(/RET-9999-INVALID/i)).toBeInTheDocument();
  });
});
