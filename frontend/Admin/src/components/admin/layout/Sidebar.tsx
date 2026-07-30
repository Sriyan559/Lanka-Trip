'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Settings, X, ChevronsUpDown, UserRound, LogOut,
} from 'lucide-react';
import { useClickOutside } from '@/lib/useClickOutside';
import { ADMIN_NAVIGATION } from '@/constants/adminNavigation';
import { AdminBrandLogo } from './AdminBrandLogo';

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false));
  const activeParentId =
    ADMIN_NAVIGATION.find((item) => {
      if (!item.href || item.disabled) return false;
      if (item.exact) return pathname === item.href;
      if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
        return true;
      }
      return item.children?.some(
        (child) =>
          pathname === child.href || pathname.startsWith(`${child.href}/`),
      );
    })?.id ?? null;

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar-rich ${open ? 'sidebar-open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand-row">
          <AdminBrandLogo onNavigate={onClose} />
          <button onClick={onClose} className="sidebar-close-btn" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav" aria-label="Admin navigation">
          {ADMIN_NAVIGATION.map((item) => {
            const Icon = item.icon;
            const isActive = activeParentId === item.id;

            if (item.disabled || !item.href) {
              return (
                <div className="sidebar-nav-group" key={item.id}>
                  <span
                    className="nav-link-rich disabled"
                    aria-disabled="true"
                    title={`${item.label} — ${item.badge ?? 'Not Available'}`}
                  >
                    <Icon size={18} className="nav-icon" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="nav-coming-soon">{item.badge}</span>
                    )}
                  </span>
                </div>
              );
            }

            return (
              <div className="sidebar-nav-group" key={item.id}>
                <Link
                  href={item.href}
                  className={`nav-link-rich ${isActive ? 'active' : ''}`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={onClose}
                >
                  <Icon size={18} className="nav-icon" />
                  <span>{item.label}</span>
                </Link>
                {item.children && isActive && (
                  <div className="sidebar-subnav">
                    {item.children.map((child) => {
                      const childActive =
                        pathname === child.href ||
                        pathname.startsWith(`${child.href}/`);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`sidebar-subnav-link ${
                            childActive ? 'active' : ''
                          }`}
                          aria-current={childActive ? 'page' : undefined}
                          onClick={onClose}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="sidebar-user-footer" ref={menuRef}>
          {menuOpen && (
            <div className="sidebar-user-menu">
              <button className="sidebar-user-menu-item">
                <UserRound size={15} /> My Profile
              </button>
              <button className="sidebar-user-menu-item">
                <Settings size={15} /> Account Settings
              </button>
              <div className="sidebar-user-menu-divider" />
              <button className="sidebar-user-menu-item danger">
                <LogOut size={15} /> Sign Out
              </button>
              <p className="sidebar-user-menu-version">SL Beauty Admin v4.2.0-stable</p>
            </div>
          )}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="sidebar-user-trigger"
          >
            <img
              src="https://ui-avatars.com/api/?name=Elena+Vance&background=722140&color=ffffff&bold=true"
              alt="Elena Vance avatar"
              className="sidebar-avatar"
            />
            <span className="sidebar-user-info">
              <span className="sidebar-user-name">Elena Vance</span>
              <span className="sidebar-user-role">Compliance Lead</span>
            </span>
            <ChevronsUpDown size={15} className="sidebar-chevron" />
          </button>
        </div>
      </aside>
    </>
  );
}
