"use client";

import React, { useState } from "react";

export function ProductDetailTabs() {
  const [activeTab, setActiveTab] = useState("Overview");
  
  const tabs = [
    "Overview", 
    "Identity & Classification", 
    "Brand & Supplier", 
    "Product Content", 
    "Ingredients & Safety", 
    "Variants & Attributes", 
    "Images & Media", 
    "Compliance & Approval", 
    "Inventory & Batches", 
    "Pricing & Tax", 
    "Publication & Channels", 
    "Audit History"
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-line mb-6">
      {tabs.map((tab) => (
        <button 
          key={tab} 
          onClick={() => setActiveTab(tab)}
          className={`flex items-center justify-center px-4 py-2.5 text-[12px] font-bold whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-[#741d35] text-[#741d35]' : 'border-transparent text-muted hover:text-ink'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
