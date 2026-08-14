"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface EcosystemModuleNavItem {
  id: string;
  label: string;
  route: string;
  exact?: boolean;
}

export const ecosystemModuleNavigation: EcosystemModuleNavItem[] = [
  {
    id: "EM01",
    label: "Ecosystem Modules Command Center",
    route: "/admin/ecosystem-modules",
    exact: true,
  },
  {
    id: "EM02",
    label: "Module Registry & Catalogue",
    route: "/admin/ecosystem-modules/registry",
  },
  {
    id: "EM03",
    label: "Module Detail, Configuration & Lifecycle",
    route: "/admin/ecosystem-modules/modules/crm-platform",
  },
  {
    id: "EM04",
    label: "Tenant & Ecosystem Module Assignment",
    route: "/admin/ecosystem-modules/assignments",
  },
  {
    id: "EM05",
    label: "Business Unit & Channel Capability Assignment",
    route: "/admin/ecosystem-modules/capabilities",
  },
  {
    id: "EM06",
    label: "Sector Packs & Capability Bundles",
    route: "/admin/ecosystem-modules/sector-packs",
    exact: true,
  },
  {
    id: "EM07",
    label: "Sector Pack Detail & Capability Configuration",
    route: "/admin/ecosystem-modules/sector-packs/beauty-retail-pack",
  },
  {
    id: "EM08",
    label: "Module Dependencies & Compatibility Map",
    route: "/admin/ecosystem-modules/dependencies",
  },
  {
    id: "EM09",
    label: "Feature Flags, Rollouts & Controlled Enablement",
    route: "/admin/ecosystem-modules/feature-flags",
  },
  {
    id: "EM10",
    label: "Versions, Releases & Environment Management",
    route: "/admin/ecosystem-modules/releases",
  },
  {
    id: "EM11",
    label: "Module Health, Performance & Adoption",
    route: "/admin/ecosystem-modules/health-adoption",
  },
  {
    id: "EM12",
    label: "Integrations, Services & External Providers",
    route: "/admin/ecosystem-modules/integrations",
  },
  {
    id: "EM13",
    label: "Governance, Access, Security & Policy Control",
    route: "/admin/ecosystem-modules/governance-access",
  },
  {
    id: "EM14",
    label: "Reports, Audit, Export & Ecosystem Change History",
    route: "/admin/ecosystem-modules/reports-audit",
  },
];

export function isEcosystemRouteActive(item: EcosystemModuleNavItem, pathname: string): boolean {
  if (!pathname) return false;
  if (item.id === "EM01") {
    return pathname === "/admin/ecosystem-modules" || pathname === "/admin/ecosystem-modules/";
  }
  if (item.id === "EM03") {
    return pathname.startsWith("/admin/ecosystem-modules/modules");
  }
  if (item.id === "EM06") {
    return pathname === "/admin/ecosystem-modules/sector-packs" || pathname === "/admin/ecosystem-modules/sector-packs/";
  }
  if (item.id === "EM07") {
    return (
      pathname.startsWith("/admin/ecosystem-modules/sector-packs/") &&
      pathname !== "/admin/ecosystem-modules/sector-packs" &&
      pathname !== "/admin/ecosystem-modules/sector-packs/"
    );
  }
  const basePath = item.route.split("?")[0];
  return pathname === basePath || pathname.startsWith(`${basePath}/`);
}

interface EcosystemModulesSubNavigationProps {
  onNavigate?: () => void;
}

export function EcosystemModulesSubNavigation({ onNavigate }: EcosystemModulesSubNavigationProps) {
  const rawPathname = usePathname();
  const pathname = rawPathname ?? "";


  return (
    <div
      className="sidebar-subnav ecosystem-subnav"
      role="menu"
      aria-label="Ecosystem Modules Submenu"
    >
      {ecosystemModuleNavigation.map((item) => {
        const isActive = isEcosystemRouteActive(item, pathname);

        return (
          <Link
            key={item.id}
            href={item.route}
            onClick={onNavigate}
            title={item.label}
            role="menuitem"
            aria-current={isActive ? "page" : undefined}
            className={`sidebar-subnav-link ${
              isActive ? "active" : ""
            }`}
          >
            <span className="truncate block">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
