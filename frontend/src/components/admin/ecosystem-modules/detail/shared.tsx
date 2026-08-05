import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import type { StatusTone } from "../types";

export function StatusPill({ value, tone = "neutral" }: { value: string; tone?: StatusTone }) {
  const getToneClasses = (t: StatusTone) => {
    switch (t) {
      case "success": return "bg-success/10 text-success";
      case "warning": return "bg-warning/10 text-warning";
      case "danger": return "bg-danger/10 text-danger";
      case "info": return "bg-info/10 text-info";
      default: return "bg-canvas text-muted";
    }
  };

  return <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider ${getToneClasses(tone)}`}>{value}</span>;
}

export function ProgressBar({ value, tone = "success" as const }: { value: number; tone?: "success" | "warning" }) {
  return (
    <span className="block w-full h-1.5 bg-line rounded-full overflow-hidden mt-1">
      <i className={`block h-full rounded-full ${tone === "warning" ? "bg-warning" : "bg-success"}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </span>
  );
}

export function SectionCard({
  title,
  description,
  aside,
  children,
  scroll = true,
}: {
  title: string;
  description?: string;
  aside?: ReactNode;
  children: ReactNode;
  scroll?: boolean;
}) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-line flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-line flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[13px] font-bold text-ink">{title}</h2>
          {description && <p className="text-[11px] text-muted mt-1">{description}</p>}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
      <div className="flex-1 min-h-0 bg-white">
        {scroll ? <div className="overflow-x-auto">{children}</div> : children}
      </div>
    </section>
  );
}

export function ViewDetailsLink({ onClick, label = "View details" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" className="text-[11px] font-bold text-[#741d35] flex items-center gap-1 hover:underline mt-auto pt-4" onClick={onClick}>
      {label} <ChevronRight size={12} />
    </button>
  );
}

export function EmptyRow({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center text-muted py-5 text-[12px]">
        {message}
      </td>
    </tr>
  );
}
