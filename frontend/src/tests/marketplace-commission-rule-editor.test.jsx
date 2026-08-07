import {fireEvent,render,screen} from "@testing-library/react";
import {describe,expect,it} from "vitest";
import CommissionRuleEditorView from "@/components/admin/marketplace/commissions/rule-editor/CommissionRuleEditorView";
import {createCommissionRuleEditorDraft,fetchCommissionRuleEditor} from "@/services/api/marketplaceCommissionRuleService";

describe("Commission Rule Create / Edit Workspace",()=>{
  it("creates a temporary draft reference without pretending to persist",async()=>{const data=await createCommissionRuleEditorDraft();expect(data.source).toBe("frontend-fixture");expect(data.rule.id).toMatch(/^DRAFT-COM-/);expect(data.rule.status).toBe("Draft")});

  it("loads the selected rule id and preserves version history",async()=>{const data=await fetchCommissionRuleEditor("COM-2026-00063");expect(data.rule.id).toBe("COM-2026-00063");expect(data.rule.name).toBe("Tokyo Beauty Ceylon Exception Rate");expect(data.rule.version).toBe(3);expect(data.versions).toHaveLength(3)});

  it("renders all twelve workflow sections and the completion rail",async()=>{render(<CommissionRuleEditorView mode="edit" ruleId="COM-2026-00063"/>);expect(await screen.findByRole("heading",{name:"Edit Commission Rule"})).toBeInTheDocument();for(const heading of ["Rule Identity","Scope Definition","Commission Rate Configuration","Tiered or Conditional Rates (Optional)","Effective Dates & Scheduling","Precedence & Override Behavior","Conflict Detection","Financial & Settlement Impact","Approval Workflow","Notifications","Internal Notes & Attachments","Audit & Version Information","Completion Status","Validation Summary","Final Actions"]){const escaped=heading.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");expect(screen.getByRole("heading",{name:new RegExp(escaped)})).toBeInTheDocument()}});

  it("marks create-mode edits as unsaved and validates required identity",async()=>{render(<CommissionRuleEditorView mode="create"/>);expect(await screen.findByRole("heading",{name:"Create Commission Rule"})).toBeInTheDocument();const name=screen.getByLabelText(/Rule Name/);fireEvent.change(name,{target:{value:"Sri Lanka Marketplace Launch Rate"}});expect(screen.getAllByText("Unsaved changes").length).toBeGreaterThan(0);fireEvent.change(name,{target:{value:""}});fireEvent.click(screen.getAllByRole("button",{name:"Validate Rule"})[0]);expect(await screen.findByText("Required")).toBeInTheDocument()});

  it("runs conflict resolution and financial preview in local state",async()=>{render(<CommissionRuleEditorView mode="edit" ruleId="COM-2026-00063"/>);await screen.findByRole("heading",{name:"Edit Commission Rule"});fireEvent.click(screen.getAllByRole("button",{name:"Resolve Conflicts"})[0]);expect(await screen.findByText("Blocking conflicts resolved locally.")).toBeInTheDocument();fireEvent.click(screen.getAllByRole("button",{name:"Preview Impact"})[0]);expect(await screen.findByText("Reviewed")).toBeInTheDocument()});

  it("shows a not-found state for an unknown rule id",async()=>{render(<CommissionRuleEditorView mode="edit" ruleId="COM-UNKNOWN"/>);expect(await screen.findByRole("heading",{name:"Commission rule unavailable"})).toBeInTheDocument();expect(screen.getByText("The requested commission rule could not be found.")).toBeInTheDocument()});
});
