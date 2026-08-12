'use client';

import React from 'react';
import { Search, RotateCcw, Bookmark, SlidersHorizontal } from 'lucide-react';
import type { SupportCaseFilterParams } from '@/types/customerSupport';

interface SupportCaseFiltersProps {
  filters: SupportCaseFilterParams;
  onFilterChange: (key: keyof SupportCaseFilterParams, value: string) => void;
  onClearAll: () => void;
  onOpenSaveViewModal: () => void;
  onOpenMoreFiltersDrawer: () => void;
  activeMoreFiltersCount?: number;
}

export function SupportCaseFilters({
  filters,
  onFilterChange,
  onClearAll,
  onOpenSaveViewModal,
  onOpenMoreFiltersDrawer,
  activeMoreFiltersCount = 0,
}: SupportCaseFiltersProps) {
  const handleChange = (key: keyof SupportCaseFilterParams, val: string) => {
    onFilterChange(key, val);
  };

  const renderSelect = (label: string, key: keyof SupportCaseFilterParams, options: { label: string; value: string }[]) => (
    <div className="flex flex-col gap-0.5 min-w-[110px] flex-1">
      <label className="text-[9.5px] font-bold text-slate-500 uppercase tracking-tight truncate">{label}</label>
      <select
        value={(filters[key] as string) || 'all'}
        onChange={(e) => handleChange(key, e.target.value)}
        className="w-full h-7 px-2 text-[11.5px] bg-canvas border border-line rounded text-ink focus:outline-none focus:ring-1 focus:ring-primary-900 transition-shadow appearance-none cursor-pointer"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.35rem center', backgroundSize: '0.85em' }}
      >
        <option value="all">All</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-3 pb-3 border-b border-line mb-3">
      {/* Top Search Bar Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full max-w-2xl">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search case ID, customer, email, phone, order, return, shipment, product, supplier or message..."
            className="w-full h-8 pl-8 pr-3 bg-canvas border border-line rounded text-[12px] text-ink focus:outline-none focus:ring-1 focus:ring-primary-900 transition-all placeholder:text-slate-400"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button type="button" onClick={onClearAll} className="flex items-center gap-1.5 h-8 px-2.5 text-[11.5px] font-medium text-slate-600 bg-white border border-line rounded hover:bg-canvas transition-colors whitespace-nowrap">
            <RotateCcw size={12} />
            Clear All
          </button>
          <button type="button" onClick={onOpenSaveViewModal} className="flex items-center gap-1.5 h-8 px-2.5 text-[11.5px] font-medium text-slate-600 bg-white border border-line rounded hover:bg-canvas transition-colors whitespace-nowrap">
            <Bookmark size={12} />
            Save View
          </button>
          <button type="button" onClick={onOpenMoreFiltersDrawer} className="flex items-center gap-1.5 h-8 px-2.5 text-[11.5px] font-medium text-slate-600 bg-white border border-line rounded hover:bg-canvas transition-colors whitespace-nowrap relative">
            <SlidersHorizontal size={12} />
            More Filters
            {activeMoreFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary-900 text-white text-[8.5px] font-bold rounded-full flex items-center justify-center">
                {activeMoreFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {renderSelect('Case Status', 'status', [
          { value: 'open', label: 'Open' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'waiting-for-customer', label: 'Waiting for Customer' },
          { value: 'waiting-for-supplier', label: 'Waiting for Supplier' },
          { value: 'waiting-for-logistics', label: 'Waiting for Logistics' },
          { value: 'waiting-for-finance', label: 'Waiting for Finance' },
          { value: 'escalated', label: 'Escalated' },
          { value: 'resolved', label: 'Resolved' },
          { value: 'closed', label: 'Closed' },
        ])}
        {renderSelect('Priority', 'priority', [
          { value: 'low', label: 'Low' },
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' },
          { value: 'critical', label: 'Critical' },
        ])}
        {renderSelect('SLA Status', 'sla', [
          { value: 'within-target', label: 'Within Target' },
          { value: 'at-risk', label: 'At Risk' },
          { value: 'breached', label: 'Breached' },
          { value: 'completed', label: 'Completed' },
        ])}
        {renderSelect('Escalation Status', 'escalation', [
          { value: 'normal', label: 'Normal' },
          { value: 'escalated', label: 'Escalated' },
          { value: 'executive-escalation', label: 'Executive Escalation' },
        ])}
        {renderSelect('Case Category', 'category', [
          { value: 'delivery-issue', label: 'Delivery Issue' },
          { value: 'payment-issue', label: 'Payment Issue' },
          { value: 'product-safety', label: 'Product Safety' },
          { value: 'return-refund', label: 'Return & Refund' },
          { value: 'authenticity', label: 'Authenticity' },
          { value: 'supplier-issue', label: 'Supplier Issue' },
          { value: 'general-inquiry', label: 'General Inquiry' },
        ])}
        {renderSelect('Issue Type', 'issueType', [
          { value: 'shipment-not-dispatched', label: 'Shipment Not Dispatched' },
          { value: 'payment-failed', label: 'Payment Failed' },
          { value: 'skin-irritation', label: 'Skin Irritation' },
          { value: 'wrong-shade', label: 'Wrong Shade' },
          { value: 'fake-product-claim', label: 'Fake Product Claim' },
          { value: 'damaged-goods', label: 'Damaged Goods' },
        ])}
        {renderSelect('Channel', 'channel', [
          { value: 'in-app-chat', label: 'In-App Chat' },
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
          { value: 'whatsapp', label: 'WhatsApp' },
          { value: 'web-portal', label: 'Web Portal' },
        ])}
        {renderSelect('Customer', 'customer', [
          { value: 'elena-rodriguez', label: 'Elena Rodriguez' },
          { value: 'julian-vance', label: 'Julian Vance' },
          { value: 'nimal-sirisena', label: 'Nimal Sirisena' },
          { value: 'sarah-chen', label: 'Sarah Chen' },
        ])}

        {renderSelect('Assigned Agent', 'assignedAgent', [
          { value: 'unassigned', label: 'Unassigned' },
          { value: 'amaya-perera', label: 'Amaya Perera' },
          { value: 'dilan-perera', label: 'Dilan Perera' },
          { value: 'nadeesha-silva', label: 'Nadeesha Silva' },
          { value: 'elena-vance', label: 'Elena Vance' },
        ])}
        {renderSelect('Assigned Team', 'assignedTeam', [
          { value: 'tier-1', label: 'Tier 1 Support' },
          { value: 'tier-2', label: 'Tier 2 Support' },
          { value: 'finance', label: 'Finance Team' },
          { value: 'logistics', label: 'Logistics Ops' },
          { value: 'safety', label: 'Safety & Quality' },
        ])}
        {renderSelect('Supplier', 'supplier', [
          { value: 'luxe-distribution', label: 'Luxe Distribution Pvt Ltd' },
          { value: 'vogue-supply', label: 'Vogue Beauty Supply' },
          { value: 'pure-essence', label: 'Pure Essence Labs' },
        ])}
        {renderSelect('Product', 'product', [
          { value: 'vitamin-c-serum', label: 'Radiance Vitamin C Serum' },
          { value: 'matte-lipstick', label: 'Matte Silk Lipstick' },
          { value: 'gold-cream', label: 'Gold-Infused Cream' },
        ])}
        {renderSelect('Order Status', 'orderStatus', [
          { value: 'processing', label: 'Processing' },
          { value: 'shipped', label: 'Shipped' },
          { value: 'delivered', label: 'Delivered' },
          { value: 'cancelled', label: 'Cancelled' },
        ])}
        {renderSelect('Return Status', 'returnStatus', [
          { value: 'requested', label: 'Requested' },
          { value: 'approved', label: 'Approved' },
          { value: 'inspected', label: 'Inspected' },
          { value: 'refunded', label: 'Refunded' },
        ])}
        {renderSelect('Shipment Status', 'shipmentStatus', [
          { value: 'in-transit', label: 'In Transit' },
          { value: 'delayed', label: 'Delayed' },
          { value: 'delivered', label: 'Delivered' },
        ])}
        {renderSelect('Sentiment', 'sentiment', [
          { value: 'positive', label: 'Positive' },
          { value: 'neutral', label: 'Neutral' },
          { value: 'concerned', label: 'Concerned' },
          { value: 'frustrated', label: 'Frustrated' },
          { value: 'distressed', label: 'Distressed' },
        ])}

        {renderSelect('Risk Level', 'risk', [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'critical', label: 'Critical' },
        ])}
        {renderSelect('Created Date', 'createdDate', [
          { value: 'today', label: 'Today' },
          { value: 'last-7-days', label: 'Last 7 Days' },
          { value: 'last-30-days', label: 'Last 30 Days' },
        ])}
        {renderSelect('Last Updated Date', 'updatedDate', [
          { value: 'today', label: 'Today' },
          { value: 'yesterday', label: 'Yesterday' },
          { value: 'this-week', label: 'This Week' },
        ])}
        {renderSelect('SLA Due Date', 'slaDueDate', [
          { value: 'today', label: 'Today' },
          { value: 'next-24h', label: 'Next 24 Hours' },
          { value: 'overdue', label: 'Overdue' },
        ])}
      </div>
    </div>
  );
}
