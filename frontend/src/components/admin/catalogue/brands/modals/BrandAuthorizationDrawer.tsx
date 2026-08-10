"use client";
import React, { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import type { CatalogueBrand } from "@/types/brandManagement";
import { decideBrandAuthorization, getBrandAuthorizations } from "@/services/api/brandManagement";

type Authorization = { id:number; status:string; authorization_type:string; territory:string|null; starts_at:string|null; expires_at:string|null; supplier?:{company_name?:string} };
interface Props { isOpen:boolean; onClose:()=>void; brand:CatalogueBrand|null; canReview:boolean; onChanged:()=>void }

export const BrandAuthorizationDrawer = ({ isOpen, onClose, brand, canReview, onChanged }: Props) => {
  const [items, setItems] = useState<Authorization[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    if (!brand) return;
    setBusy(true);
    try {
      const response = await getBrandAuthorizations(brand.id);
      setItems(response.authorizations.data as Authorization[]);
      setError("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load authorization data.");
    } finally { setBusy(false); }
  }, [brand]);
  useEffect(() => { if (isOpen) void load(); }, [isOpen, load]);
  if (!isOpen) return null;
  const decide = async (authorization: Authorization, decision: string) => {
    const needsNotes = ["rejected", "evidence_required", "suspended", "revoked"].includes(decision);
    const notes = needsNotes ? window.prompt("Decision notes are required:") || "" : undefined;
    if (needsNotes && !notes) return;
    try {
      await decideBrandAuthorization(String(authorization.id), decision, notes);
      toast.success("Authorization decision recorded.");
      await load(); onChanged();
    } catch (caught) { toast.error(caught instanceof Error ? caught.message : "Unable to record decision."); }
  };
  return <div className="fixed inset-0 z-50 bg-black/30 flex justify-end"><aside className="w-full max-w-xl bg-white h-full shadow-2xl"><header className="p-4 border-b flex justify-between"><div><h3 className="font-bold">Brand Authorization</h3><p className="text-xs text-gray-500">{brand?.brandName}</p></div><button onClick={onClose}><X size={18}/></button></header><div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-70px)] text-xs">
    {busy && <p>Loading authorization records…</p>}
    {error && <div className="bg-rose-50 border border-rose-200 p-3 text-rose-700">{error}<button onClick={() => void load()} className="ml-2 underline">Retry</button></div>}
    {!busy && !error && items.length === 0 && <p className="text-gray-500">No supplier authorization records exist for this brand.</p>}
    {items.map(item => <article key={item.id} className="border rounded p-3"><div className="flex justify-between"><b>{item.supplier?.company_name ?? `Supplier authorization #${item.id}`}</b><span className="capitalize rounded bg-gray-100 px-2">{item.status.replaceAll("_", " ")}</span></div><dl className="grid grid-cols-2 gap-2 mt-2 text-gray-600"><div>Type: {item.authorization_type ?? "Not specified"}</div><div>Territory: {item.territory ?? "Not specified"}</div><div>Starts: {item.starts_at ?? "Open"}</div><div>Expires: {item.expires_at ?? "Open"}</div></dl>{canReview && <div className="flex flex-wrap gap-1 mt-3">
      {item.status === "submitted" && <><button onClick={() => void decide(item, "approved")} className="border rounded px-2 py-1">Approve</button><button onClick={() => void decide(item, "evidence_required")} className="border rounded px-2 py-1">Request Evidence</button><button onClick={() => void decide(item, "rejected")} className="border rounded px-2 py-1 text-rose-600">Reject</button></>}
      {item.status === "approved" && <><button onClick={() => void decide(item, "suspended")} className="border rounded px-2 py-1">Suspend</button><button onClick={() => void decide(item, "expired")} className="border rounded px-2 py-1">Mark Expired</button><button onClick={() => void decide(item, "revoked")} className="border rounded px-2 py-1 text-rose-600">Revoke</button></>}
      {item.status === "suspended" && <><button onClick={() => void decide(item, "approved")} className="border rounded px-2 py-1">Re-approve</button><button onClick={() => void decide(item, "revoked")} className="border rounded px-2 py-1 text-rose-600">Revoke</button></>}
    </div>}</article>)}
  </div></aside></div>;
};
