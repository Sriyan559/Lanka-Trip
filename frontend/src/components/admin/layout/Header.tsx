'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, HelpCircle, Menu, Zap, LogOut, UserRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { useClickOutside } from '@/lib/useClickOutside';
import { useAuth } from '@/contexts/AuthContext';

const ctaIconMap: Record<string, React.ElementType> = { Zap };

export function Header({
  onMenuClick,
  searchPlaceholder = 'Global search...',
  ctaLabel = 'Quick Action',
  ctaIcon = null,
}: {
  onMenuClick: () => void;
  searchPlaceholder?: string;
  ctaLabel?: string;
  ctaIcon?: string | null;
}) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(userMenuRef, () => setUserMenuOpen(false));

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    router.replace('/');
    router.refresh();
  };

  const CtaIcon = ctaIcon ? ctaIconMap[ctaIcon] : null;

  return (
    <header className="header-rich">
      <button
        onClick={onMenuClick}
        className="header-menu-btn"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className="header-search-wrap">
        <div className="header-search">
          <Search size={17} className="header-search-icon" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="header-search-input"
            aria-label="Global search"
          />
        </div>
      </div>

      <div className="header-actions-right">
        {/* Notification bell */}
        <div className="header-notif-wrap" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((p) => !p)}
            className="header-icon-btn"
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="notif-dot" />
          </button>
          {notifOpen && (
            <div className="header-dropdown notif-dropdown">
              <p className="dropdown-eyebrow">Notifications</p>
              <button className="notif-item">
                <span className="notif-title">Aura Beauty — document expiring</span>
                <span className="notif-sub">3 days remaining · Verification</span>
              </button>
              <button className="notif-item">
                <span className="notif-title">Counterfeit report filed</span>
                <span className="notif-sub">Product #4211 · High risk</span>
              </button>
              <button className="notif-item">
                <span className="notif-title">Order #ORD-9901 processing</span>
                <span className="notif-sub">Spa Ceylon · 2 hours ago</span>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => toast('Help Center arrives in a later screen.')}
          className="header-icon-btn"
          aria-label="Help"
        >
          <HelpCircle size={19} />
        </button>

        {/* User Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen((p) => !p)}
            className="header-icon-btn flex items-center gap-2 px-1.5 py-1 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="User menu"
          >
            <img
              src={
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name || user?.username || 'Admin User'
                )}&background=722140&color=ffffff&bold=true`
              }
              alt={`${user?.name || 'Admin'} avatar`}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 text-left">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {user?.name || user?.username || 'Super Admin'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {user?.email || 'admin@techromz.lk'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>

        <span className="header-divider" />

        <button
          onClick={() => toast.success(`${ctaLabel} would open here.`)}
          className="button primary header-cta"
        >
          {CtaIcon && <CtaIcon size={16} />}
          {ctaLabel}
        </button>
      </div>
    </header>
  );
}
