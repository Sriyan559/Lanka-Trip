import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const sourceRoot = path.resolve(process.cwd(), "src");

function read(relativePath: string) {
  return fs.readFileSync(path.join(sourceRoot, relativePath), "utf8");
}

describe("admin layout initialization", () => {
  it("loads route-specific analytics CSS from exactly one layout", () => {
    const adminLayout = read("app/admin/layout.tsx");
    const analyticsLayout = read("app/admin/analytics/layout.jsx");

    expect(adminLayout).not.toContain("admin-analytics.css");
    expect(analyticsLayout).toContain('import "@/app/admin-analytics.css"');
  });

  it("keeps first-paint shell geometry in CSS instead of mount-time JavaScript", () => {
    const shell = read("components/admin/layout/AdminShell.tsx");
    const sidebar = read("components/admin/layout/Sidebar.tsx");
    const styles = read("app/admin-integrated.css");

    expect(`${shell}\n${sidebar}`).not.toMatch(
      /localStorage|sessionStorage|matchMedia|innerWidth|getBoundingClientRect/,
    );
    expect(styles).toContain(".shell-main{flex:1;display:flex;flex-direction:column;min-width:0}");
    expect(styles).toContain("@media(min-width:1024px){.sidebar-rich{position:sticky");
    expect(styles).toContain("@media(max-width:1023px){.sidebar-rich{transform:translateX(-100%)}");
  });

  it("does not generate supplier verification chart data differently during hydration", () => {
    const verificationPage = read("app/admin/brands-suppliers/verification/page.tsx");

    expect(verificationPage).not.toMatch(/Math\.random\(\)|Date\.now\(\)/);
  });
});
