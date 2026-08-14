'use client';

import React, { useState } from 'react';
import { ShieldAlert, Loader2 } from 'lucide-react';
import { IdentityUser } from '@/services/api/administrationService';

interface StatusChangeModalProps {
  user: IdentityUser | null;
  targetStatus: 'active' | 'suspended' | 'locked' | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: number, status: string, reason?: string) => Promise<void>;
  loading?: boolean;
}

export function StatusChangeModal({
  user,
  targetStatus,
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: StatusChangeModalProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !user || !targetStatus) return null;

  const statusLabel =
    targetStatus === 'active'
      ? 'Activate'
      : targetStatus === 'suspended'
      ? 'Suspend'
      : 'Lock';

  const isDestructive = targetStatus !== 'active';

  const handleConfirm = async () => {
    setError(null);
    try {
      await onConfirm(user.id, targetStatus, reason.trim() || undefined);
      setReason('');
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Status change failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-gray-200">
        <div className="p-4 flex items-start gap-3">
          <div
            className={`p-2 rounded-full flex-shrink-0 ${
              isDestructive ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
            }`}
          >
            <ShieldAlert size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              {statusLabel} Account: {user.name}
            </h3>
            <p className="text-[11px] text-gray-500 mt-1">
              Are you sure you want to change the status of <strong>{user.email}</strong> to{' '}
              <span className="uppercase font-bold">{targetStatus}</span>?
            </p>

            {error && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-700 rounded text-[10px]">
                {error}
              </div>
            )}

            <div className="mt-3">
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">
                Audit Reason (Optional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={2}
                placeholder="Reason for administrative status change..."
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#741d35]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-4 py-3 bg-gray-50 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleConfirm}
            className={`px-3.5 py-1.5 text-white rounded text-xs font-bold shadow flex items-center gap-1.5 disabled:opacity-50 ${
              isDestructive
                ? 'bg-red-700 hover:bg-red-800'
                : 'bg-green-700 hover:bg-green-800'
            }`}
          >
            {loading && <Loader2 size={12} className="animate-spin" />}
            <span>Confirm {statusLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
