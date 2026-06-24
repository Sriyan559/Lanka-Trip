'use client';

import { useState } from 'react';
import { User, Building2, Lock, Bell, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { userApi } from '@/lib/api';
import { initials } from '@/lib/utils';
import toast from 'react-hot-toast';

const TABS = [
  { key: 'profile',       label: 'Profile',       icon: User },
  { key: 'company',       label: 'Company',       icon: Building2 },
  { key: 'security',      label: 'Security',      icon: Lock },
  { key: 'notifications', label: 'Notifications', icon: Bell },
];

export default function SettingsContent() {
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState('profile');
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name:  user?.name  || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [company, setCompany] = useState({
    company_name:  user?.company        || '',
    business_type: user?.business_type  || 'Buyer',
    country:       user?.country        || 'Sri Lanka',
    website:       user?.website        || '',
    description:   user?.company_bio    || '',
  });
  const [password, setPassword] = useState({ current: '', next: '', confirm: '' });
  const [notifs, setNotifs] = useState({
    rfq_responses: true,
    order_updates: true,
    messages:      true,
    marketing:     false,
  });

  const saveSection = async (payload, successMsg) => {
    setSaving(true);
    try {
      await userApi.updateProfile(payload);
      updateUser(payload);
      toast.success(successMsg);
    } catch (err) {
      toast.error(err.message || 'Could not save changes — please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.next !== password.confirm) {
      toast.error('New password and confirmation do not match.');
      return;
    }
    if (password.next.length < 8) {
      toast.error('New password must be at least 8 characters.');
      return;
    }
    saveSection({ current_password: password.current, password: password.next }, 'Password updated.');
    setPassword({ current: '', next: '', confirm: '' });
  };

  const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Tab nav */}
      <aside className="w-full lg:w-56 flex-shrink-0">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 lg:sticky lg:top-20 flex lg:flex-col overflow-x-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors w-full text-left ${
                tab === key ? 'bg-primary-50 text-primary-800' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} className={tab === key ? 'text-primary-700' : 'text-gray-400'} />
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {tab === 'profile' && (
          <form onSubmit={(e) => { e.preventDefault(); saveSection(profile, 'Profile updated.'); }} className="space-y-5 max-w-lg">
            <h2 className="font-semibold text-gray-800">Profile Information</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-800 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">
                {initials(profile.name || 'U')}
              </div>
              <button type="button" className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <Camera size={14} /> Change photo
              </button>
            </div>
            <div>
              <label className={labelClass}>Full Name</label>
              <input className={inputClass} value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input type="email" className={inputClass} value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input type="tel" className={inputClass} value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} placeholder="+94 77 000 0000" />
            </div>
            <button type="submit" disabled={saving} className="px-5 py-2.5 bg-primary-800 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        )}

        {tab === 'company' && (
          <form onSubmit={(e) => { e.preventDefault(); saveSection(company, 'Company details updated.'); }} className="space-y-5 max-w-lg">
            <h2 className="font-semibold text-gray-800">Company Details</h2>
            <div>
              <label className={labelClass}>Company Name</label>
              <input className={inputClass} value={company.company_name} onChange={(e) => setCompany((c) => ({ ...c, company_name: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Account Type</label>
              <select className={`${inputClass} bg-white`} value={company.business_type} onChange={(e) => setCompany((c) => ({ ...c, business_type: e.target.value }))}>
                {['Buyer', 'Supplier', 'Both'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input className={inputClass} value={company.country} onChange={(e) => setCompany((c) => ({ ...c, country: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input className={inputClass} value={company.website} onChange={(e) => setCompany((c) => ({ ...c, website: e.target.value }))} placeholder="https://" />
            </div>
            <div>
              <label className={labelClass}>Company Description</label>
              <textarea rows={4} className={`${inputClass} resize-none`} value={company.description} onChange={(e) => setCompany((c) => ({ ...c, description: e.target.value }))} />
            </div>
            <button type="submit" disabled={saving} className="px-5 py-2.5 bg-primary-800 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        )}

        {tab === 'security' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-lg">
            <h2 className="font-semibold text-gray-800">Change Password</h2>
            <div>
              <label className={labelClass}>Current Password</label>
              <input type="password" required className={inputClass} value={password.current} onChange={(e) => setPassword((p) => ({ ...p, current: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>New Password</label>
              <input type="password" required minLength={8} className={inputClass} value={password.next} onChange={(e) => setPassword((p) => ({ ...p, next: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Confirm New Password</label>
              <input type="password" required className={inputClass} value={password.confirm} onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))} />
            </div>
            <button type="submit" disabled={saving} className="px-5 py-2.5 bg-primary-800 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl disabled:opacity-60">
              {saving ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        )}

        {tab === 'notifications' && (
          <div className="space-y-1 max-w-lg">
            <h2 className="font-semibold text-gray-800 mb-4">Notification Preferences</h2>
            {[
              { key: 'rfq_responses', label: 'RFQ responses',  desc: 'Get notified when a supplier replies to your RFQ' },
              { key: 'order_updates', label: 'Order updates',   desc: 'Status changes on orders you have placed' },
              { key: 'messages',      label: 'New messages',    desc: 'Direct messages from suppliers' },
              { key: 'marketing',     label: 'Marketing emails',desc: 'Occasional product news and promotions' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50">
                <div>
                  <div className="text-sm font-medium text-gray-800">{label}</div>
                  <div className="text-xs text-gray-400">{desc}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                  className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors flex-shrink-0 ${notifs[key] ? 'bg-primary-700 justify-end' : 'bg-gray-200 justify-start'}`}
                >
                  <span className="w-5 h-5 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            ))}
            <button
              onClick={() => saveSection({ notifications: notifs }, 'Notification preferences saved.')}
              disabled={saving}
              className="mt-5 px-5 py-2.5 bg-primary-800 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Preferences'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
