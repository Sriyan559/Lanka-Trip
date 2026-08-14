"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import type { AttributeFilterState, AttributeMutationPayload, CatalogueAttribute, DuplicateAttributePair } from "@/types/attributeManagement";
import { useAttributeManagement } from "@/hooks/useAttributeManagement";
import { useDebounce } from "@/hooks/useDebounce";
import { archiveAttribute, bulkAttributes, createAttribute, exportAttributes, importAttributes, mergeAttributes, updateAttribute, updateAttributeValues } from "@/services/api/attributeManagement";
import { AttributeHeader } from "./components/AttributeHeader";
import { AttributeBusinessContext } from "./components/AttributeBusinessContext";
import { AttributeKpiGrid } from "./components/AttributeKpiGrid";
import { AttributeStatusTabs } from "./components/AttributeStatusTabs";
import { AttributeFilters } from "./components/AttributeFilters";
import { AttributeGroupPanel } from "./components/AttributeGroupPanel";
import { AttributeTable } from "./components/AttributeTable";
import { SelectedAttributePreview } from "./components/SelectedAttributePreview";
import { AttributeIntelligenceSidebar } from "./components/AttributeIntelligenceSidebar";
import { AttributeLowerDashboards } from "./components/AttributeLowerDashboards";
import { AttributeFormDrawer } from "./modals/AttributeFormDrawer";
import { AllowedValuesDrawer } from "./modals/AllowedValuesDrawer";
import { ImportAttributesModal } from "./modals/ImportAttributesModal";
import { DuplicateAttributeComparisonModal } from "./modals/DuplicateAttributeComparisonModal";

const defaults: AttributeFilterState = { searchQuery: "", statusTab: "All Attributes", group: "All Groups", category: "All Categories", status: "All Statuses", dataType: "All Types", requiredStatus: "All", variantGenerating: "All", channelEligibility: "All Channels", riskLevel: "All", owner: "All Owners", updatedDate: "" };

const payloadFrom = (attribute: Partial<CatalogueAttribute>, groupId?: string | null): AttributeMutationPayload => ({
  name: attribute.attributeName?.trim() || "",
  attribute_group_id: groupId ? Number(groupId) : null,
  data_type: (attribute.dataType || "Text").toLowerCase(),
  input_type: (attribute.inputType || "Text").toLowerCase().replace("-", "_"),
  is_required: Boolean(attribute.isRequired),
  is_variant_defining: Boolean(attribute.isVariantGenerating),
  status: (attribute.status || "active").toLowerCase(),
  definition: attribute.definition || "",
});

export const AttributeManagementView: React.FC = () => {
  const params = useSearchParams(); const router = useRouter(); const pathname = usePathname();
  const [filters, setFilters] = useState<AttributeFilterState>({ ...defaults, searchQuery: params?.get("search") || "", statusTab: params?.get("tab") || defaults.statusTab });

  const [page, setPage] = useState(1); const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]); const [selected, setSelected] = useState<CatalogueAttribute | null>(null);
  const [activeKpi, setActiveKpi] = useState<string | null>(null); const [editing, setEditing] = useState<CatalogueAttribute | null>(null);
  const [formOpen, setFormOpen] = useState(false); const [valuesOpen, setValuesOpen] = useState(false); const [importOpen, setImportOpen] = useState(false);
  const [duplicate, setDuplicate] = useState<DuplicateAttributePair | null>(null);
  const debouncedSearch = useDebounce(filters.searchQuery, 350);
  const scope = ({ Active: "active", Required: "required", "Variant Attributes": "variant", "Data Quality Issues": "quality", Duplicates: "duplicates", "Invalid Combinations": "invalid" } as Record<string,string>)[filters.statusTab];
  const query = useMemo(() => ({ page, pageSize, search: debouncedSearch || undefined, groupId: filters.group !== "All Groups" ? filters.group : undefined, categoryId: filters.category !== "All Categories" ? filters.category : undefined, status: filters.status !== "All Statuses" ? filters.status.toLowerCase() : undefined, dataType: filters.dataType !== "All Types" ? filters.dataType.toLowerCase() : undefined, required: filters.requiredStatus === "Required" ? true : filters.requiredStatus === "Optional" ? false : undefined, variantGenerating: filters.variantGenerating === "Yes" ? true : filters.variantGenerating === "No" ? false : undefined, scope, updatedFrom: filters.updatedDate || undefined }), [page, pageSize, debouncedSearch, filters, scope]);
  const { data, loading, refreshing, error, refresh } = useAttributeManagement(query);
  const rows = data?.attributes.data || [];

  useEffect(() => { const queryParams = new URLSearchParams(); if (filters.searchQuery) queryParams.set("search", filters.searchQuery); if (filters.statusTab !== defaults.statusTab) queryParams.set("tab", filters.statusTab); const targetPath = pathname ?? ""; router.replace(queryParams.size ? `${targetPath}?${queryParams}` : targetPath, { scroll: false }); }, [filters.searchQuery, filters.statusTab, pathname, router]);

  useEffect(() => { setPage(1); }, [filters]);
  useEffect(() => { if (!selected || !rows.some(row => row.id === selected.id)) setSelected(rows[0] || null); }, [rows, selected]);

  const mutate = async (work: () => Promise<unknown>, message: string) => { try { await work(); toast.success(message); await refresh(); } catch (cause) { toast.error(cause instanceof Error ? cause.message : "The operation failed."); throw cause; } };
  const setFilter = (key: keyof AttributeFilterState, value: string) => setFilters(previous => ({ ...previous, [key]: value }));
  const counts = { all: data?.tabs.find(t => t.scope === "all")?.count || 0, active: data?.tabs.find(t => t.scope === "active")?.count || 0, required: data?.tabs.find(t => t.scope === "required")?.count || 0, variant: data?.tabs.find(t => t.scope === "variant")?.count || 0, dataQuality: data?.tabs.find(t => t.scope === "quality")?.count || 0, duplicates: data?.tabs.find(t => t.scope === "duplicates")?.count || 0, invalidCombos: data?.tabs.find(t => t.scope === "invalid")?.count ?? null };

  if (loading && !data) return <div className="m-5 min-h-[420px] animate-pulse rounded border border-gray-200 bg-white p-8 text-sm text-gray-500">Loading live attribute management data…</div>;
  if (error && !data) return <div className="m-5 rounded border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800"><p className="font-bold">Attribute management could not be loaded.</p><p className="mt-1">{error.message}</p><button onClick={refresh} className="mt-3 rounded bg-[#741d35] px-3 py-1.5 font-bold text-white">Retry</button></div>;
  if (!data) return null;

  const save = async (draft: Partial<CatalogueAttribute>) => { const groupId = data.options.groups.find(g => g.name === draft.groupName)?.id || draft.groupId; await mutate(() => editing ? updateAttribute(editing.id, payloadFrom(draft, groupId)) : createAttribute(payloadFrom(draft, groupId)), editing ? "Attribute updated." : "Attribute created."); setFormOpen(false); };
  const doMerge = async (pair: DuplicateAttributePair) => { const [target, source] = pair.attributeIds || []; if (!target || !source) return toast.error("The database did not return both duplicate IDs."); await mutate(() => mergeAttributes(source, target), "Duplicate attributes merged."); setDuplicate(null); };

  return <div className="w-full min-w-0 bg-gray-50/50 pb-12">
    <AttributeHeader canExport={Boolean(data.capabilities.canExport)} canImport={Boolean(data.capabilities.canImport)} canManage={Boolean(data.capabilities.canManage)} variantRulesAvailable={Boolean(data.capabilities.variantRules)} onExport={() => void exportAttributes(query)} onImport={() => setImportOpen(true)} onBulkActions={() => void mutate(() => bulkAttributes(selectedIds, "archive"), `Archived ${selectedIds.length} attributes.`).then(() => setSelectedIds([]))} onCreateAttribute={() => { setEditing(null); setFormOpen(true); }} onCreateVariantRule={() => toast.error(String(data.capabilities.variantRulesReason || "Variant rules are unavailable because no authoritative schema is installed."))} selectedCount={selectedIds.length} />
    <AttributeBusinessContext lastSynced={new Date(data.lastSyncedAt).toLocaleString()} onRefresh={refresh} isRefreshing={refreshing} />
    <div className="flex min-w-0 flex-col items-start gap-4 p-4 sm:p-5 xl:flex-row">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <AttributeKpiGrid kpis={data.kpis} activeKpiId={activeKpi} onKpiClick={id => { setActiveKpi(id === activeKpi ? null : id); const kpi = data.kpis.find(item => item.id === id); if (kpi?.filterKey) setFilter("statusTab", data.tabs.find(tab => tab.scope === kpi.filterKey)?.label || "All Attributes"); }} />
        <AttributeStatusTabs activeTab={filters.statusTab} onTabChange={tab => setFilter("statusTab", tab)} counts={counts} />
        <AttributeFilters filters={filters} onFilterChange={setFilter} onClearAll={() => { setFilters(defaults); setSelectedIds([]); setActiveKpi(null); }} onOpenMoreFilters={() => toast.error("Additional filters require authoritative governance schemas.")} onOpenSaveView={() => toast.error("Saved views are unavailable because no saved-view schema is installed.")} onRefresh={refresh} options={data.options} capabilities={data.capabilities} />
        <div className="grid min-w-0 grid-cols-1 items-start gap-3 lg:grid-cols-[minmax(160px,200px)_1fr_minmax(220px,280px)]">
          <AttributeGroupPanel groups={data.groups} selectedGroupName={data.options.groups.find(g => g.id === filters.group)?.name || "All Groups"} onSelectGroup={name => setFilter("group", data.options.groups.find(g => g.name === name)?.id || "All Groups")} />
          <div className="min-w-0 overflow-hidden"><AttributeTable attributes={rows} totalCount={data.attributes.total} filteredCount={data.attributes.total} currentPage={data.attributes.currentPage} pageSize={data.attributes.pageSize} totalPages={data.attributes.lastPage} onPageChange={setPage} onPageSizeChange={size => { setPageSize(size); setPage(1); }} selectedAttributeIds={selectedIds} selectedAttribute={selected} onSelectAttribute={setSelected} onToggleSelectRow={id => setSelectedIds(old => old.includes(id) ? old.filter(item => item !== id) : [...old, id])} onToggleSelectAll={() => setSelectedIds(rows.every(row => selectedIds.includes(row.id)) ? [] : rows.map(row => row.id))} onEditAttribute={attribute => { setEditing(attribute); setFormOpen(true); }} onManageAllowedValues={attribute => { setSelected(attribute); setValuesOpen(true); }} onArchiveAttribute={attribute => { if (window.confirm(`Archive ${attribute.attributeName}?`)) void mutate(() => archiveAttribute(attribute.id), "Attribute archived."); }} /></div>
          <SelectedAttributePreview attribute={selected} onEditAttribute={attribute => { setEditing(attribute); setFormOpen(true); }} onManageAllowedValues={attribute => { setSelected(attribute); setValuesOpen(true); }} />
        </div>
        <AttributeLowerDashboards data={data.lower} capabilities={data.capabilities} onCompareDuplicate={pair => setDuplicate(pair)} />
      </div>
      <div className="flex w-full flex-col gap-3 xl:sticky xl:top-4 xl:w-[280px] xl:shrink-0"><AttributeIntelligenceSidebar health={data.health} alerts={data.alerts} statusSummary={data.statusSummary} variantReadiness={data.variantReadiness} coverageSummary={data.coverageSummary} capabilities={data.capabilities} onSelectQueue={scopeKey => setFilter("statusTab", data.tabs.find(tab => tab.scope === scopeKey)?.label || "All Attributes")} /></div>
    </div>
    <AttributeFormDrawer isOpen={formOpen} onClose={() => setFormOpen(false)} attributeToEdit={editing} onSave={save} existingAttributes={rows} groups={data.options.groups} />
    <AllowedValuesDrawer isOpen={valuesOpen} onClose={() => setValuesOpen(false)} attribute={selected} onSave={values => mutate(() => updateAttributeValues(selected!.id, values), "Allowed values saved.").then(() => setValuesOpen(false))} />
    <ImportAttributesModal isOpen={importOpen} onClose={() => setImportOpen(false)} onImport={file => importAttributes(file)} onImportSuccess={() => { setImportOpen(false); void refresh(); }} />
    <DuplicateAttributeComparisonModal isOpen={Boolean(duplicate)} onClose={() => setDuplicate(null)} pair={duplicate} onMerge={doMerge} onIgnore={() => toast.error("Ignoring duplicate matches requires a persistence schema that is not installed.")} />
  </div>;
};
