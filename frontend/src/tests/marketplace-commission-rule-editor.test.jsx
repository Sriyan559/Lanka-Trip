import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import CreateCommissionRulePage from "@/app/admin/marketplace/commissions/create/page";
import EditCommissionRulePage from "@/app/admin/marketplace/commissions/[ruleId]/edit/page";

describe("Commission rule editor unavailable state", () => {
  it("does not present a fake create workflow", () => {render(<CreateCommissionRulePage/>); expect(screen.getByRole("heading", {name: "Create Commission Rule"})).toBeInTheDocument(); expect(screen.getByRole("heading", {name: "Commission rule domain not configured"})).toBeInTheDocument(); expect(screen.queryByRole("button", {name: /Save Draft/})).not.toBeInTheDocument();});
  it("does not present a fake edit workflow", () => {render(<EditCommissionRulePage params={{ruleId: "COM-404"}}/>); expect(screen.getByText("Requested rule: COM-404")).toBeInTheDocument(); expect(screen.queryByRole("button", {name: /Submit for Approval/})).not.toBeInTheDocument();});
});
