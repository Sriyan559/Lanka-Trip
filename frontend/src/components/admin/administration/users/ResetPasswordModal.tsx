'use client';

import React, { useState } from 'react';
import { KeyRound, Check, Copy, Loader2, X } from 'lucide-react';
import { IdentityUser } from '@/services/api/administrationService';

interface ResetPasswordModalProps {
  user: IdentityUser | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: number) => Promise<string>;
  loading?: boolean;
}

export function ResetPasswordModal({
  user,
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: ResetPasswordModalProps) {
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const handleReset = async () => {
    setError(null);
    try {
      const pwd = await onConfirm(user.id);
      setTempPassword(pwd);
    } catch (err: any) {
      setError(err?.message || 'Failed to reset password.');
    }
  };

  const handleCopy = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setTempPassword(null);
    setCopied(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <KeyRound size={14} className="text-[#741d35]" />
            <span>Reset Password: {user.name}</span>
          </h3>
          <button type="button" onClick={handleClose} className="text-gray-400 hover:text-gray-600 rounded p-1">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3 text-xs">
          {error && (
            <div className="p-2 bg-red-50 border border-red-200 text-red-700 rounded text-[10px]">
              {error}
            </div>
          )}

          {!tempPassword ? (
            <p className="text-gray-600 leading-relaxed">
              This will generate a new secure temporary password for <strong>{user.email}</strong>.
              The temporary password will be shown on the screen once.
            </p>
          ) : (
            <div className="flex flex-col gap-2 bg-amber-50 border border-amber-200 rounded p-3">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                Temporary Password Generated:
              </span>
              <div className="flex items-center justify-between bg-white border border-amber-300 px-3 py-2 rounded font-mono font-bold text-sm text-gray-900">
                <span>{tempPassword}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 text-gray-600 hover:text-gray-900 rounded flex items-center gap-1 text-[10px] font-sans"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <span className="text-[10px] text-amber-700">
                Provide this temporary credential securely to the user.
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 px-4 py-3 bg-gray-50 border-t border-gray-200">
          {!tempPassword ? (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleReset}
                className="px-3.5 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white rounded text-xs font-bold shadow flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading && <Loader2 size={12} className="animate-spin" />}
                <span>Generate Password</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white rounded text-xs font-bold shadow"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
