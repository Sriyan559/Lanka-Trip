import React from "react";
import { Loader2 } from "lucide-react";

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "warning";
  size?: "xs" | "sm" | "md";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  title?: string;
}

export function ActionButton({
  label,
  onClick,
  icon,
  variant = "outline",
  size = "sm",
  loading = false,
  disabled = false,
  className = "",
  title,
}: ActionButtonProps) {
  const variantStyles = {
    primary: "bg-rose-700 text-white hover:bg-rose-800 border-rose-700 shadow-xs",
    secondary: "bg-gray-900 text-white hover:bg-gray-800 border-gray-900 shadow-xs",
    outline: "bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-2xs",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 border-transparent",
    destructive: "bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200",
    warning: "bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200",
  };

  const sizeStyles = {
    xs: "px-2 py-1 text-[11px] font-medium gap-1 rounded",
    sm: "px-2.5 py-1.5 text-xs font-medium gap-1.5 rounded-md",
    md: "px-3.5 py-2 text-sm font-semibold gap-2 rounded-lg",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
      className={`inline-flex items-center justify-center border transition-all duration-150 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${className}`}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-current" />
      ) : icon ? (
        <span className="flex-shrink-0 text-current">{icon}</span>
      ) : null}
      <span className="truncate">{label}</span>
    </button>
  );
}
