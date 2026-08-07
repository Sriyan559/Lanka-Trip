import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BatchDetailPage from "./page";
import * as navigation from "next/navigation";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("Batch Detail Page", () => {
  it("capability test - renders core details and actions", async () => {
    const params = Promise.resolve({ batchId: "BT-2024-0098" });
    const Component = await BatchDetailPage({ params });
    render(Component);

    expect(screen.getByText("Radiance Vitamin C Serum (30 ml)")).toBeInTheDocument();
    
    expect(screen.getAllByText("Record Stock Adjustment").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Initiate Recall").length).toBeGreaterThan(0);
    
    expect(screen.getByText("Batch Overview")).toBeInTheDocument();
    expect(screen.getByText("Movement History")).toBeInTheDocument();
  });

  it("mandatory-reason test - ensures disclaimer is present", async () => {
    const params = Promise.resolve({ batchId: "BT-2024-0098" });
    const Component = await BatchDetailPage({ params });
    render(Component);

    const disclaimerTexts = screen.getAllByText(/require a reason and are recorded in the/i);
    expect(disclaimerTexts.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/audit history/i).length).toBeGreaterThan(0);
  });

  it("invalid-ID test - triggers notFound on invalid batch", async () => {
    const params = Promise.resolve({ batchId: "INVALID-999" });
    await BatchDetailPage({ params });
    
    expect(navigation.notFound).toHaveBeenCalled();
  });

  it("route test - ensures back link returns to inventory", async () => {
    const params = Promise.resolve({ batchId: "BT-2024-0098" });
    const Component = await BatchDetailPage({ params });
    render(Component);

    const backLinks = screen.getAllByRole("link", { name: /Inventory & Expiry Operations/i });
    expect(backLinks[0]).toHaveAttribute("href", "/admin/catalogue/inventory");
  });
});
