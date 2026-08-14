'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { CreateUserPayload, UpdateUserPayload, IdentityUser } from '@/services/api/administrationService';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateUserPayload | UpdateUserPayload) => Promise<void>;
  user?: IdentityUser | null; // If provided, edit mode
  loading?: boolean;
}

export function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  user,
  loading = false,
}: UserFormModalProps) {
  const isEdit = Boolean(user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('buyer');
  const [businessUnit, setBusinessUnit] = useState('SL Beauty Enterprise');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('active');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setUsername(user.username || '');
      setRole(user.role || 'buyer');
      setBusinessUnit(user.businessUnit || 'SL Beauty Enterprise');
      setStatus(user.status || 'active');
      setPhone('');
      setPassword('');
    } else {
      setName('');
      setEmail('');
      setUsername('');
      setRole('buyer');
      setBusinessUnit('SL Beauty Enterprise');
      setStatus('active');
      setPhone('');
      setPassword('');
    }
    setFormError(null);
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setFormError('Name and Email are required.');
      return;
    }
    setFormError(null);

    try {
      if (isEdit) {
        await onSubmit({
          name: name.trim(),
          email: email.trim(),
          username: username.trim() || undefined,
          role,
          business_unit: businessUnit,
          phone: phone.trim() || undefined,
          status,
        });
      } else {
        await onSubmit({
          name: name.trim(),
          email: email.trim(),
          username: username.trim() || undefined,
          role,
          business_unit: businessUnit,
          phone: phone.trim() || undefined,
          password: password.trim() || undefined,
          status,
        });
      }
      onClose();
    } catch (err: any) {
      setFormError(err?.message || 'Action failed. Please check form values.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            {isEdit ? `Edit User: ${user?.name}` : 'Create New Administrator / User'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded p-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3 text-xs">
          {formError && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded text-[11px] font-semibold">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Vance"
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. elena@slbeauty.com"
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. elena.vance"
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+94 77 123 4567"
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#741d35] bg-white font-medium"
              >
                <option value="super_admin">Platform Administrator (Super Admin)</option>
                <option value="admin">Administrator</option>
                <option value="manager">Operations Manager</option>
                <option value="moderator">Security & Audit Moderator</option>
                <option value="supplier">Verified Brand Supplier</option>
                <option value="buyer">Enterprise Buyer</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                Business Unit / Scope
              </label>
              <input
                type="text"
                value={businessUnit}
                onChange={(e) => setBusinessUnit(e.target.value)}
                placeholder="e.g. SL Beauty Enterprise"
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                Account Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#741d35] bg-white font-medium"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="locked">Locked</option>
                <option value="pending">Pending Invitation</option>
              </select>
            </div>

            {!isEdit && (
              <div>
                <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                  Temporary Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Defaults to auto-generated"
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#741d35]"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white rounded text-xs font-bold shadow flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              <span>{isEdit ? 'Save Changes' : 'Create Account'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
