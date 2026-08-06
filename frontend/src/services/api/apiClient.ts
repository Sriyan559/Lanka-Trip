import { API_BASE, getAuthToken } from "@/lib/api";

export class ApiError extends Error {
  constructor(message: string, public status: number, public details?: unknown, public referenceId?: string | null) {
    super(message);
    this.name = "ApiError";
  }
}

const headersFor = (options: RequestInit) => {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  const token = getAuthToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return headers;
};

export async function apiClient<T>(path: string, options: RequestInit & { timeout?: number } = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout ?? 30_000);
  const forwardAbort = () => controller.abort();
  options.signal?.addEventListener("abort", forwardAbort, { once: true });
  try {
    const response = await fetch(`${API_BASE}${path}`, { ...options, credentials: "include", headers: headersFor(options), signal: controller.signal });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      if (response.status === 401 && typeof window !== "undefined") window.dispatchEvent(new Event("auth:session-expired"));
      throw new ApiError(data?.message || `Request failed with status ${response.status}`, response.status, data?.errors, data?.reference_id);
    }
    return data as T;
  } finally {
    clearTimeout(timeout);
    options.signal?.removeEventListener("abort", forwardAbort);
  }
}

export async function downloadApiFile(path: string, filename: string, signal?: AbortSignal): Promise<void> {
  const response = await fetch(`${API_BASE}${path}`, { credentials: "include", headers: headersFor({}), signal });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(data?.message || "Unable to export the report.", response.status, data?.errors);
  }
  const blob = await response.blob();
  const disposition = response.headers.get("content-disposition") || "";
  const serverName = disposition.match(/filename="?([^";]+)"?/i)?.[1];
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = serverName || filename;
  link.click();
  URL.revokeObjectURL(url);
}
