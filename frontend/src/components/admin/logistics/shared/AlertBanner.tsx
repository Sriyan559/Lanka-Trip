import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, Info, X, AlertCircle } from "lucide-react";

interface AlertBannerProps {
  message: string;
  type?: "warning" | "info" | "success" | "error";
  onClose?: () => void;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function AlertBanner({
  message,
  type = "warning",
  onClose,
  actionText,
  onAction,
  className = "",
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const styles = {
    warning: {
      bg: "bg-amber-50/90 border-amber-200 text-amber-900",
      icon: <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />,
    },
    info: {
      bg: "bg-blue-50/90 border-blue-200 text-blue-900",
      icon: <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />,
    },
    success: {
      bg: "bg-emerald-50/90 border-emerald-200 text-emerald-900",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />,
    },
    error: {
      bg: "bg-rose-50/90 border-rose-200 text-rose-900",
      icon: <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />,
    },
  };

  const handleDismiss = () => {
    setDismissed(true);
    if (onClose) onClose();
  };

  return (
    <div
      className={`border rounded-lg p-3 text-xs flex items-center justify-between gap-3 shadow-2xs ${styles[type].bg} ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {styles[type].icon}
        <span className="font-medium leading-relaxed truncate sm:whitespace-normal">
          {message}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {actionText && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="underline font-semibold hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            {actionText}
          </button>
        )}
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 hover:bg-black/5 rounded transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
        </button>
      </div>
    </div>
  );
}
