/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, Search, MoreVertical, Package, Box, Bookmark, 
  AlertTriangle, XCircle, Clock, Calendar, Shield, AlertOctagon, 
  ExternalLink, X, Plus, Activity, MapPin, Download, ChevronRight,
  AlertCircle, FileText, Info
} from "lucide-react";
import styles from "./inventory.module.css";
import { products } from "@/mocks/admin/fixtures";
import { notFound } from "next/navigation";

export default async function ProductInventoryPage({ searchParams }: { searchParams: Promise<{ productId?: string }> }) {
  const { productId } = await searchParams;
  
  // Find product from fixtures or just use generic data if not found, ONLY if productId is present
  const productData = productId ? products.find(p => p.id.toString() === productId) : null;
  
  if (productId && !productData) {
    notFound();
  }

  return (
    <div className={styles.pageWrapper}>
      {productId ? (
        <Link href={`/admin/catalogue/approvals/${productId}`} className={styles.backLink}>
          <ArrowLeft size={16} />
          Back to Product Approval Detail
        </Link>
      ) : (
        <Link href={`/admin/catalogue`} className={styles.backLink}>
          <ArrowLeft size={16} />
          Back to Catalogue
        </Link>
      )}

      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <div className={styles.headerMeta}>
            <span className={styles.metaLabel}>Catalogue</span>
            <span style={{color: '#9ca3af'}}>&gt;</span>
            {productId ? (
              <>
                <span className={styles.metaLabel}>Product Approval Queue</span>
                <span style={{color: '#9ca3af'}}>&gt;</span>
                <span className={styles.metaLabel}>{productData?.id}</span>
                <span style={{color: '#9ca3af'}}>&gt;</span>
                <span className={styles.metaLabel} style={{color: '#374151', fontWeight: 600}}>Inventory & Batches</span>
              </>
            ) : (
              <span className={styles.metaLabel} style={{color: '#374151', fontWeight: 600}}>Inventory Operations</span>
            )}
          </div>
          <h1 style={{marginTop: '16px'}}>Inventory & Expiry Operations</h1>
          <p>
            Monitor product inventory, available and reserved stock, expiry exposure, quarantine status, recall readiness and inventory discrepancies across verified suppliers and approved products.
          </p>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.btnSecondary}><Download size={14} /> Export Expiry Report</button>
          <button className={styles.btnSecondary}><Activity size={14} /> View Inventory Movements</button>
          <button className={styles.btnSecondary}><MapPin size={14} /> Manage Inventory Locations <ChevronRight size={14}/></button>
          <button className={styles.btnPrimary} style={{marginLeft: '12px'}}><Plus size={14} /> Create Batch</button>
          <button className={styles.btnSecondary}><FileText size={14} /> Record Stock Adjustments</button>
          <button className={styles.btnDanger}><AlertOctagon size={14} /> Start Recall Review</button>
        </div>
      </div>

      <div className={styles.mainLayout}>
        {/* Main Content Area */}
        <div>
          {/* Metrics Grid */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricCardTitle}>Total Active Stock</div>
              <div className={styles.metricCardIcon} style={{background: '#f3f4f6', color: '#374151'}}>
                <Package size={18} />
              </div>
              <div className={styles.metricCardValue}>124,592</div>
              <div className={styles.metricCardSub}>Units</div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.metricCardTitle}>Available Stock</div>
              <div className={styles.metricCardIcon} style={{background: '#ecfdf5', color: '#059669'}}>
                <Box size={18} />
              </div>
              <div className={styles.metricCardValue}>108,360</div>
              <div className={styles.metricCardSub}>Units</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricCardTitle}>Reserved Stock</div>
              <div className={styles.metricCardIcon} style={{background: '#eff6ff', color: '#2563eb'}}>
                <Bookmark size={18} />
              </div>
              <div className={styles.metricCardValue}>8,401</div>
              <div className={styles.metricCardSub}>Units</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricCardTitle}>Low-Stock Products</div>
              <div className={styles.metricCardIcon} style={{background: '#fef3c7', color: '#d97706'}}>
                <AlertTriangle size={18} />
              </div>
              <div className={styles.metricCardValue}>36</div>
              <div className={styles.metricCardSub}>Products</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricCardTitle}>Out-of-Stock Products</div>
              <div className={styles.metricCardIcon} style={{background: '#fef2f2', color: '#dc2626'}}>
                <XCircle size={18} />
              </div>
              <div className={styles.metricCardValue}>18</div>
              <div className={styles.metricCardSub}>Products</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricCardTitle}>Near-Expiry Units</div>
              <div className={styles.metricCardIcon} style={{background: '#ffedd5', color: '#ea580c'}}>
                <Clock size={18} />
              </div>
              <div className={styles.metricCardValue}>3,120</div>
              <div className={`${styles.metricCardSub} ${styles.danger}`}>High Risk — 30 Days</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricCardTitle}>Expired Units</div>
              <div className={styles.metricCardIcon} style={{background: '#fef2f2', color: '#dc2626'}}>
                <Calendar size={18} />
              </div>
              <div className={styles.metricCardValue}>220</div>
              <div className={styles.metricCardSub}>Units</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricCardTitle}>Quarantined Stock</div>
              <div className={styles.metricCardIcon} style={{background: '#f5f3ff', color: '#7c3aed'}}>
                <Shield size={18} />
              </div>
              <div className={styles.metricCardValue}>450</div>
              <div className={styles.metricCardSub}>Units</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricCardTitle}>Recalled Products</div>
              <div className={styles.metricCardIcon} style={{background: '#fef2f2', color: '#dc2626'}}>
                <AlertOctagon size={18} />
              </div>
              <div className={styles.metricCardValue}>12</div>
              <div className={styles.metricCardSub}>Products</div>
            </div>
          </div>

          {/* Product Context Panel */}
          {productId && productData && (
            <div className={styles.contextPanel}>
              <div style={{flex: 1}}>
                <div className={styles.contextTitle}>Product Inventory Context</div>
                <div className={styles.contextGrid}>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Product Reference</div>
                    <div className={styles.metaValue}>{productData.id}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Database Product ID</div>
                    <div className={styles.metaValue}>{productId}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Product</div>
                    <div className={styles.metaValue}>{productData.name}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Brand</div>
                    <div className={styles.metaValue}>{productData.brand}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Supplier</div>
                    <div className={styles.metaValue}>{productData.supplier}</div>
                  </div>
                </div>
              </div>
              <div className={styles.contextLinks}>
                <Link href={`/admin/catalogue/approvals/${productId}`} className={styles.contextLink}>
                  <ExternalLink size={14}/> View Product Approval Detail
                </Link>
                <Link href="/admin/catalogue/inventory" className={styles.contextLink}>
                  <X size={14}/> Clear Product Filter
                </Link>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className={styles.filterSection}>
            <div className={styles.mainFilters}>
              <div className={styles.searchBox}>
                <Search className={styles.searchIcon} size={16} />
                <input type="text" className={styles.searchInput} placeholder="Search by SKU, Name, Batch No, or Variant..." />
              </div>
              <select className={styles.filterSelect}><option>All Brands</option></select>
              <select className={styles.filterSelect}><option>All Suppliers</option></select>
              <select className={styles.filterSelect}><option>All Categories</option></select>
              <select className={styles.filterSelect}><option>All Variants</option></select>
              <select className={styles.filterSelect}><option>All Locations</option></select>
              <button className={styles.btnSecondary} style={{border: 'none'}}><Search size={14}/> More Filters</button>
              {productId ? (
                <Link href="/admin/catalogue/inventory" className={styles.contextLink} style={{background: 'none', border: 'none', padding: 0}}>Clear All</Link>
              ) : (
                <button className={styles.contextLink} style={{background: 'none', border: 'none', padding: 0}}>Clear All</button>
              )}
            </div>
            <div className={styles.quickFilters}>
              <span className={styles.quickFiltersLabel}>Quick Filters:</span>
              <button className={styles.quickFilterChip}>Near Expiry</button>
              <button className={styles.quickFilterChip}>Expired</button>
              <button className={styles.quickFilterChip}>Low Stock</button>
              <button className={styles.quickFilterChip}>Out of Stock</button>
              <button className={styles.quickFilterChip}>Quarantined</button>
              <button className={styles.quickFilterChip}>Recalled</button>
              <button className={styles.quickFilterChip}>Negative Stock</button>
              <button className={styles.quickFilterChip}>Missing Batch No.</button>
              <button className={styles.quickFilterChip}>Missing Expiry Date</button>
            </div>
          </div>

          {/* Data Table */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product & Variant</th>
                  <th>Product ID<br/><span style={{fontSize: '10px', fontWeight: 'normal'}}>(Public Reference)</span></th>
                  <th>Database<br/>Product ID</th>
                  <th>Brand</th>
                  <th>Supplier</th>
                  <th>SKU</th>
                  <th>Batch Number</th>
                  <th>Variant</th>
                  <th>Inventory<br/>Location</th>
                  <th>Available<br/>Stock</th>
                  <th>Reserved<br/>Stock</th>
                  <th>Quarantined<br/>Stock</th>
                  <th>Manufacturing<br/>Date</th>
                  <th>Expiry Date</th>
                  <th>Remaining<br/>Shelf Life</th>
                  <th>Batch<br/>Status</th>
                  <th>Recall<br/>Status</th>
                  <th>Risk<br/>Score</th>
                  <th>Last Stock<br/>Count</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.productCell}>
                      <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=100&h=100" alt="Product" className={styles.productImage} />
                      <div>
                        <span className={styles.productName}>Radiance<br/>Vitamin C Serum</span>
                        <span className={styles.productSize}>30 ml</span>
                      </div>
                    </div>
                  </td>
                  <td>421<br/><span style={{fontSize: '10px', color: '#6b7280'}}>(PROD-2024-00421)</span></td>
                  <td>421</td>
                  <td>Estée<br/>Lauder</td>
                  <td>Luxe<br/>Distribution<br/>Pvt Ltd</td>
                  <td>RAD-VITC-<br/>30ML</td>
                  <td>BT-2024-0098</td>
                  <td>-</td>
                  <td>Colombo<br/>Main Hub</td>
                  <td className={styles.textSuccess}>2,450</td>
                  <td>200</td>
                  <td>0</td>
                  <td>15 Jan 2024</td>
                  <td>15 Jan 2027</td>
                  <td className={styles.textSuccess}>30 Months<br/>Healthy</td>
                  <td><span className={styles.badgeSuccess}>Active</span></td>
                  <td><span className={styles.badgeNeutral}>None</span></td>
                  <td><span className={styles.badgeSuccess}>Low</span></td>
                  <td><button className={styles.btnAction}>Open Batch</button></td>
                  <td><MoreVertical size={16} color="#6b7280" /></td>
                </tr>

                <tr>
                  <td>
                    <div className={styles.productCell}>
                      <img src="https://images.unsplash.com/photo-1615397323286-90f7725dc012?auto=format&fit=crop&q=80&w=100&h=100" alt="Product" className={styles.productImage} />
                      <div>
                        <span className={styles.productName}>Luxe Skin Cream</span>
                        <span className={styles.productSize}>50 ml</span>
                      </div>
                    </div>
                  </td>
                  <td>436<br/><span style={{fontSize: '10px', color: '#6b7280'}}>(PROD-2024-00436)</span></td>
                  <td>436</td>
                  <td>Innisfree</td>
                  <td>Glow Global<br/>Exports</td>
                  <td>HYDRA-RICH-<br/>50ML</td>
                  <td>BT-2024-0112</td>
                  <td>-</td>
                  <td>Colombo<br/>Main Hub</td>
                  <td className={styles.textDanger}>12</td>
                  <td>8</td>
                  <td>0</td>
                  <td>01 Mar 2024</td>
                  <td>12 Aug 2026</td>
                  <td className={styles.textDanger}>22 Days<br/>Critical</td>
                  <td><span className={styles.badgeWarning}>Near Expiry</span></td>
                  <td><span className={styles.badgeNeutral}>None</span></td>
                  <td><span className={styles.badgeDanger}>High</span></td>
                  <td><button className={styles.btnAction}>Open Batch</button></td>
                  <td><MoreVertical size={16} color="#6b7280" /></td>
                </tr>

                <tr>
                  <td>
                    <div className={styles.productCell}>
                      <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=100&h=100" alt="Product" className={styles.productImage} />
                      <div>
                        <span className={styles.productName}>Matte Silk Lipstick</span>
                        <span className={styles.productSize}>Ruby Red</span>
                      </div>
                    </div>
                  </td>
                  <td>451<br/><span style={{fontSize: '10px', color: '#6b7280'}}>(PROD-2024-00451)</span></td>
                  <td>451</td>
                  <td>Chanel<br/>Beauty</td>
                  <td>Vortex<br/>Logistics<br/>Hub</td>
                  <td>MSL-RED-<br/>001</td>
                  <td>RECALL-442</td>
                  <td>-</td>
                  <td>Kandy<br/>Regional<br/>Hub</td>
                  <td>1,100</td>
                  <td>0</td>
                  <td className={styles.textDanger}>1,100</td>
                  <td>10 Sep 2023</td>
                  <td>15 Dec 2026</td>
                  <td>17 Months</td>
                  <td><span className={styles.badgePurple}>Quarantined</span></td>
                  <td><span className={styles.badgeDanger}>Active Recall</span></td>
                  <td><span className={styles.badgeDanger}>Critical</span></td>
                  <td><button className={styles.btnAction}>Open Batch</button></td>
                  <td><MoreVertical size={16} color="#6b7280" /></td>
                </tr>

                <tr>
                  <td>
                    <div className={styles.productCell}>
                      <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=100&h=100" alt="Product" className={styles.productImage} />
                      <div>
                        <span className={styles.productName}>Nourishing Glow Oil</span>
                        <span className={styles.productSize}>100 ml</span>
                      </div>
                    </div>
                  </td>
                  <td>462<br/><span style={{fontSize: '10px', color: '#6b7280'}}>(PROD-2024-00462)</span></td>
                  <td>462</td>
                  <td>Botanica<br/>Pure</td>
                  <td>Pure<br/>Organic Co.</td>
                  <td>NGO-100ML</td>
                  <td>BT-2024-0211</td>
                  <td>-</td>
                  <td>Galle<br/>Supplier Hub</td>
                  <td>450</td>
                  <td>0</td>
                  <td>450</td>
                  <td>10 Apr 2024</td>
                  <td>05 Nov 2027</td>
                  <td>16 Months</td>
                  <td><span className={styles.badgePurple}>Quarantined</span></td>
                  <td><span className={styles.badgeWarning}>Safety Review<br/>Open</span></td>
                  <td><span className={styles.badgeDanger}>High</span></td>
                  <td><button className={styles.btnAction}>Open Batch</button></td>
                  <td><MoreVertical size={16} color="#6b7280" /></td>
                </tr>
              </tbody>
            </table>
            <div className={styles.tableFooter}>
              <div className={styles.tableCount}>Showing 1 to 4 of 4 products</div>
              <div className={styles.pagination}>
                <button className={styles.pageBtn}>&lt;</button>
                <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
                <button className={styles.pageBtn}>&gt;</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div>
          {/* Expiry Exposure */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>
              Expiry Exposure <span style={{fontWeight: 'normal', color: '#6b7280'}}>(Units & Value at Risk) <Info size={14}/></span>
            </h3>
            
            <div className={styles.exposureRow}>
              <div className={styles.exposureLabel}>Critical — 30 Days</div>
              <div className={styles.exposureBarContainer}>
                <div className={styles.exposureBar} style={{width: '20%', background: '#dc2626'}}></div>
              </div>
              <div className={styles.exposureValue}>3,120 <span style={{fontWeight: 'normal', color: '#6b7280'}}>units</span></div>
            </div>
            <div style={{textAlign: 'right', fontSize: '11px', color: '#6b7280', marginTop: '-8px', marginBottom: '12px'}}>LKR 42,650.00</div>

            <div className={styles.exposureRow}>
              <div className={styles.exposureLabel}>Moderate — 60 Days</div>
              <div className={styles.exposureBarContainer}>
                <div className={styles.exposureBar} style={{width: '45%', background: '#f59e0b'}}></div>
              </div>
              <div className={styles.exposureValue}>8,450 <span style={{fontWeight: 'normal', color: '#6b7280'}}>units</span></div>
            </div>
            <div style={{textAlign: 'right', fontSize: '11px', color: '#6b7280', marginTop: '-8px', marginBottom: '12px'}}>LKR 128,200.00</div>

            <div className={styles.exposureRow}>
              <div className={styles.exposureLabel}>Planned — 90 Days</div>
              <div className={styles.exposureBarContainer}>
                <div className={styles.exposureBar} style={{width: '80%', background: '#3b82f6'}}></div>
              </div>
              <div className={styles.exposureValue}>15,200 <span style={{fontWeight: 'normal', color: '#6b7280'}}>units</span></div>
            </div>
            <div style={{textAlign: 'right', fontSize: '11px', color: '#6b7280', marginTop: '-8px', marginBottom: '12px'}}>LKR 310,400.00</div>

            <div className={styles.exposureTotal}>
              <span>Total Value at Risk <span style={{fontWeight: 'normal', color: '#6b7280'}}>(Calculated)</span></span>
              <span>LKR 481,450.00</span>
            </div>
          </div>

          {/* Inventory Alerts */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>Inventory Alerts</h3>
            
            <div className={styles.alertRow}>
              <div className={styles.alertLabel}><AlertTriangle size={14} color="#dc2626" /> Negative Stock Detected</div>
              <div className={styles.alertCount}>3 records</div>
              <Link href="#" className={styles.alertView}>View</Link>
            </div>
            <div className={styles.alertRow}>
              <div className={styles.alertLabel}><AlertCircle size={14} color="#dc2626" /> Stock Mismatch</div>
              <div className={styles.alertCount}>8 records</div>
              <Link href="#" className={styles.alertView}>View</Link>
            </div>
            <div className={styles.alertRow}>
              <div className={styles.alertLabel}><AlertTriangle size={14} color="#dc2626" /> Missing Batch Number</div>
              <div className={styles.alertCount}>12 records</div>
              <Link href="#" className={styles.alertView}>View</Link>
            </div>
            <div className={styles.alertRow}>
              <div className={styles.alertLabel}><AlertTriangle size={14} color="#d97706" /> Missing Expiry Date</div>
              <div className={styles.alertCount}>5 records</div>
              <Link href="#" className={styles.alertView}>View</Link>
            </div>
            <div className={styles.alertRow}>
              <div className={styles.alertLabel}><AlertTriangle size={14} color="#d97706" /> Unusual Adjustment</div>
              <div className={styles.alertCount}>2 records</div>
              <Link href="#" className={styles.alertView}>View</Link>
            </div>
            
            <Link href="#" className={styles.viewAllAlerts}>View all alerts</Link>
          </div>

          {/* Recall Status Center */}
          <div className={styles.recallCenter}>
            <div className={styles.recallHeader}>
              <AlertTriangle size={18} /> Recall Status Center
            </div>
            
            <div className={styles.recallGrid}>
              <div className={styles.recallMetric}>
                <div className={styles.recallMetricLabel}>Active Recall Cases</div>
                <div className={styles.recallMetricValue}>2</div>
              </div>
              <div className={styles.recallMetric}>
                <div className={styles.recallMetricLabel}>Customers Linked</div>
                <div className={styles.recallMetricValue}>1,185</div>
              </div>
              <div className={styles.recallMetric}>
                <div className={styles.recallMetricLabel}>Orders Linked</div>
                <div className={styles.recallMetricValue}>4,210</div>
              </div>
              <div className={styles.recallMetric}>
                <div className={styles.recallMetricLabel}>Suppliers Awaiting<br/>Response</div>
                <div className={styles.recallMetricValue}>3</div>
              </div>
            </div>

            <div className={styles.recallRecalled}>
              <span>Recalled Products</span>
              <span style={{fontWeight: 600, fontSize: '16px'}}>12</span>
            </div>

            <button className={styles.btnRecall}><ExternalLink size={16}/> Open Recall Dashboard</button>
          </div>

          {/* Quick Queue */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>Quick Queue</h3>
            
            <div className={styles.queueRow}>
              <div className={styles.queueLabel}>Oldest Near-Expiry Batch</div>
              <div className={styles.queueValue}>BT-2024-0112 <ChevronRight size={14} color="#9ca3af"/></div>
            </div>
            <div className={styles.queueRow}>
              <div className={styles.queueLabel}>Highest-Risk Batch</div>
              <div className={styles.queueValue}>RECALL-442 <ChevronRight size={14} color="#9ca3af"/></div>
            </div>
            <div className={styles.queueRow}>
              <div className={styles.queueLabel}>Largest Inventory Discrepancy</div>
              <div className={styles.queueValue}>BT-2024-0198 <ChevronRight size={14} color="#9ca3af"/></div>
            </div>
            <div className={styles.queueRow}>
              <div className={styles.queueLabel}>Batch Awaiting Supplier Response</div>
              <div className={styles.queueValue}>BT-2024-0211 <ChevronRight size={14} color="#9ca3af"/></div>
            </div>
          </div>

          {/* Inventory Health */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>Inventory Health <Info size={14} color="#9ca3af" /></h3>
            
            <div className={styles.healthRow}>
              <span className={styles.queueLabel}>Inventory Accuracy</span>
              <span className={styles.queueValue}>98.4%</span>
            </div>
            <div className={styles.healthBar}>
              <div className={styles.healthBarFill} style={{width: '98.4%'}}></div>
            </div>

            <div className={styles.healthRow}>
              <span className={styles.queueLabel}>Low-Stock Products</span>
              <span className={styles.queueValue}>36</span>
            </div>
            <div className={styles.healthRow}>
              <span className={styles.queueLabel}>Out-of-Stock Products</span>
              <span className={styles.queueValue}>18</span>
            </div>
            <div className={styles.healthRow}>
              <span className={styles.queueLabel}>Unresolved Adjustments</span>
              <span className={styles.queueValue}>5</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
