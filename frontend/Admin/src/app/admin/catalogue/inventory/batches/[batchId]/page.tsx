import React from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, ShieldAlert, CheckCircle, MoreVertical, Info } from "lucide-react";
import styles from "./batch-detail.module.css";
import { notFound } from "next/navigation";

// Mock data (would normally be fetched from the backend)
const batchData = {
  batchId: "BT-2024-0098",
  productId: "421",
  productSku: "RAD-VITC-30ML",
  productName: "Radiance Vitamin C Serum (30 ml)",
  productRef: "PROD-2024-00421",
  brand: "Estée Lauder",
  supplier: "Luxe Distribution Pvt Ltd",
  complianceCert: "GMP/C-2024-V3",
  country: "United Kingdom",
  classification: "Premium Skincare",
  status: "ACTIVE",
  risk: "Low Risk",
  mfgDate: "Jan 15, 2024",
  expiryDate: "Jan 15, 2027",
  shelfLife: "36 Months",
  recallStatus: "None",
  locationName: "Colombo Main Hub",
  available: 2450,
  reserved: 200,
  quarantined: 0,
  damaged: 0,
  recalled: 0,
  inTransit: 450,
  totalPhysical: 3100,
  avgUnitCost: "3,450.00",
  availableValue: "8,452,500.00",
  reservedValue: "690,000.00",
  quarantinedValue: "0.00",
  inTransitValue: "1,552,500.00",
  totalValue: "10,695,000.00"
};

export default async function BatchDetailPage({ params }: { params: Promise<{ batchId: string }> }) {
  const { batchId } = await params;
  
  if (batchId !== batchData.batchId && batchId !== "mock") {
    notFound();
  }

  return (
    <div className={styles.pageWrapper}>
      <Link href="/admin/catalogue/inventory" className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to Inventory & Expiry Operations
      </Link>
      <div className={styles.breadcrumbs}>
        <Link href="/admin/catalogue" className={styles.bcLink}>Catalogue</Link> &gt;{" "}
        <Link href="/admin/catalogue/inventory" className={styles.bcLink}>Inventory & Expiry Operations</Link> &gt;{" "}
        <span style={{ color: "#374151", fontWeight: 600 }}>{batchData.batchId}</span>
      </div>

      <div className={styles.layout}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          <div className={styles.card} style={{ paddingBottom: 0 }}>
            <div className={styles.headerTop}>
              <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80" alt="Product" className={styles.productImage} />
              <div className={styles.headerInfo}>
                <div className={styles.titleRow}>
                  <h1>
                    {batchData.productName}
                    <span className={styles.badgeActive}>{batchData.status}</span>
                  </h1>
                  <div className={styles.headerTags}>
                    <div className={styles.tagLocation}><MapPin size={14} /> {batchData.locationName}</div>
                    <div className={styles.tagRisk}><ShieldAlert size={14} /> {batchData.risk}</div>
                  </div>
                </div>
                <div className={styles.metaGrid}>
                  <div>ID: <span>{batchData.productId}</span></div>
                  <div>SKU: <span>{batchData.productSku}</span></div>
                  <div>Batch: <span>{batchData.batchId}</span></div>
                </div>
                <div className={styles.statsGrid}>
                  <div className={styles.statBlock}>
                    <div className={styles.statLabel}>MFG DATE</div>
                    <div className={styles.statVal}>{batchData.mfgDate}</div>
                  </div>
                  <div className={styles.statBlock}>
                    <div className={styles.statLabel}>EXPIRY DATE</div>
                    <div className={styles.statVal}>{batchData.expiryDate}</div>
                  </div>
                  <div className={styles.statBlock}>
                    <div className={styles.statLabel}>SHELF LIFE</div>
                    <div className={styles.statVal}>{batchData.shelfLife}</div>
                  </div>
                  <div className={styles.statBlock}>
                    <div className={styles.statLabel}>RECALL STATUS</div>
                    <div className={`${styles.statVal} ${styles.green}`}>{batchData.recallStatus}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.actionRow} style={{ paddingBottom: 24 }}>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>Record Stock Adjustment</button>
              <button className={styles.btn}>Transfer Stock</button>
              <button className={styles.btn}>Quarantine Batch</button>
              <button className={`${styles.btn} ${styles.btnDanger}`}>Initiate Recall</button>
              <button className={styles.btn}>Mark Damaged</button>
              <button className={styles.btn}>Notify Supplier</button>
              <button className={styles.btn}>Export Batch Record</button>
              <button className={styles.btn} style={{ padding: "8px 10px" }}><MoreVertical size={16}/></button>
            </div>

            <div className={styles.tabs}>
              <div className={`${styles.tab} ${styles.active}`}>Batch Overview</div>
              <div className={styles.tab}>Movement History</div>
              <div className={styles.tab}>Inventory Locations</div>
              <div className={styles.tab}>Expiry & Shelf Life</div>
              <div className={styles.tab}>Quality & Compliance</div>
              <div className={styles.tab}>Recall Management</div>
              <div className={styles.tab}>Linked Orders</div>
              <div className={styles.tab}>Supplier Communication</div>
              <div className={styles.tab}>Audit History</div>
            </div>
          </div>

          <div className={styles.dataGrid}>
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Batch Identity</h3>
              <div className={styles.dataList}>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Product SKU</div><div className={styles.dataRowVal}>{batchData.productSku}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Public Product Ref</div><div className={styles.dataRowVal}>{batchData.productRef}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Database Product ID</div><div className={styles.dataRowVal}>{batchData.productId}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Brand</div><div className={styles.dataRowVal}>{batchData.brand}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Supplier</div><div className={styles.dataRowVal}>{batchData.supplier}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Batch Number</div><div className={styles.dataRowVal}>{batchData.batchId}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Database Batch ID</div><div className={styles.dataRowVal}>98</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Compliance Cert</div><div className={`${styles.dataRowVal} ${styles.cert}`}>{batchData.complianceCert}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Country of Origin</div><div className={styles.dataRowVal}>{batchData.country}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Classification</div><div className={styles.dataRowVal}>{batchData.classification}</div></div>
              </div>
            </div>
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Stock Summary</h3>
              <div className={styles.dataList}>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Available</div><div className={styles.dataRowVal}>{batchData.available.toLocaleString()}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Reserved</div><div className={styles.dataRowVal}>{batchData.reserved.toLocaleString()}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Quarantined</div><div className={styles.dataRowVal}>{batchData.quarantined}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Damaged</div><div className={styles.dataRowVal}>{batchData.damaged}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Recalled</div><div className={styles.dataRowVal}>{batchData.recalled}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>In Transit</div><div className={styles.dataRowVal}>{batchData.inTransit.toLocaleString()}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel} style={{color: '#059669', fontWeight: 600}}>Available to Sell</div><div className={`${styles.dataRowVal} ${styles.green}`}>{batchData.available.toLocaleString()}</div></div>
                <div className={styles.divider}></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel} style={{color: '#111827', fontWeight: 600}}>Total Physical</div><div className={styles.dataRowVal}>{batchData.totalPhysical.toLocaleString()}</div></div>
              </div>
            </div>
          </div>

          <div className={styles.dataGrid}>
            <div className={styles.card}>
              <h3 className={styles.cardHeaderIcon}>
                <div className={styles.chiBox}>📈</div> Inventory Valuation
              </h3>
              <div className={styles.dataList}>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Average Unit Cost (LKR)</div><div className={styles.dataRowVal}>LKR {batchData.avgUnitCost}</div></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Available Stock Value</div><div className={styles.dataRowVal}>LKR {batchData.availableValue}</div></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Reserved Stock Value</div><div className={styles.dataRowVal}>LKR {batchData.reservedValue}</div></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>Quarantined Stock Value</div><div className={styles.dataRowVal}>LKR {batchData.quarantinedValue}</div></div>
                <div className={styles.dataRow}><div className={styles.dataRowLabel}>In-Transit Stock Value</div><div className={styles.dataRowVal}>LKR {batchData.inTransitValue}</div></div>
              </div>
              <div className={styles.darkValueBox}>
                <div className={styles.dvbLabel}>TOTAL BATCH VALUE - CALCULATED</div>
                <div className={styles.dvbValue}>LKR {batchData.totalValue}</div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardHeaderIcon}>
                <div className={styles.chiBox}>📦</div> Storage & Handling
              </h3>
              <div className={styles.storageGrid}>
                <div className={styles.stBlock}>
                  <div className={styles.stLabel}>LOCATION CODE</div>
                  <div className={styles.stVal}>CMB-MAIN</div>
                </div>
                <div className={styles.stBlock}>
                  <div className={styles.stLabel}>LOCATION TYPE</div>
                  <div className={styles.stVal}>Main Hub</div>
                </div>
                <div className={styles.stBlock}>
                  <div className={styles.stLabel}>BIN / SHELF</div>
                  <div className={styles.stVal}>A-16-08</div>
                </div>
                <div className={styles.stBlock}>
                  <div className={styles.stLabel}>REQUIRED TEMP</div>
                  <div className={styles.stVal}>18°C - 28°C</div>
                </div>
                <div className={styles.stBlock}>
                  <div className={styles.stLabel}>HUMIDITY</div>
                  <div className={styles.stVal}>Below 60%</div>
                </div>
                <div className={styles.stBlock}>
                  <div className={styles.stLabel}>FRAGILE</div>
                  <div className={styles.stVal}>Yes</div>
                </div>
                <div className={styles.stBlock}>
                  <div className={styles.stLabel}>LIGHT SENSITIVE</div>
                  <div className={styles.stVal}>Yes</div>
                </div>
                <div className={styles.stBlock}>
                  <div className={styles.stLabel}>COMPLIANCE</div>
                  <div className={`${styles.stVal} ${styles.cert}`}>Verified</div>
                </div>
              </div>
              <div className={styles.infoBox}>
                <Info size={16} color="#6b7280" style={{flexShrink: 0, marginTop: 2}} />
                <div>Handling <strong>Keep upright</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={styles.rightCol}>
          <div className={styles.scoreCard}>
            <h3 className={styles.scTitle}>Batch Health</h3>
            <div className={styles.gaugeContainer}>
              <div className={styles.gaugeCircle}>
                <div className={styles.gaugeInner}>
                  <div className={styles.gaugeNum}>92</div>
                  <div className={styles.gaugeLabel}>Score</div>
                </div>
              </div>
            </div>
            
            <div className={styles.lifeGrid}>
              <div className={styles.statBlock}>
                <div className={styles.statLabel}>Shelf-Life Consumed</div>
                <div className={styles.statVal}>16.7%</div>
              </div>
              <div className={styles.statBlock} style={{alignItems: "flex-end"}}>
                <div className={styles.statLabel}>Shelf-Life Remaining</div>
                <div className={styles.statVal}>30 Months</div>
              </div>
            </div>

            <div className={styles.recSection}>
              <div className={styles.recTitle}>AUTOMATED RECOMMENDATIONS</div>
              <div className={styles.recItem}>
                <CheckCircle size={16} color="#059669" style={{flexShrink: 0, marginTop: 2}}/>
                Continue normal marketplace sale
              </div>
              <div className={styles.recItem}>
                <div style={{width: 14, height: 14, borderRadius: '50%', border: '2px solid #ea580c', flexShrink: 0, marginTop: 3}}></div>
                Complete receipt of the 450 in-transit units.
              </div>
            </div>

            <div className={styles.healthList}>
              <div className={styles.hlItem}>
                <div className={styles.hlLabel}><CheckCircle size={14}/> Batch Status:</div>
                <div className={styles.hlVal} style={{color: '#059669'}}>Active</div>
              </div>
              <div className={styles.hlItem}>
                <div className={styles.hlLabel}><CheckCircle size={14}/> Risk Status:</div>
                <div className={styles.hlVal} style={{color: '#059669'}}>Low</div>
              </div>
              <div className={styles.hlItem}>
                <div className={styles.hlLabel}><CheckCircle size={14}/> Storage Compliance:</div>
                <div className={styles.hlVal} style={{color: '#059669'}}>Verified</div>
              </div>
              <div className={styles.hlItem}>
                <div className={styles.hlLabel}><CheckCircle size={14}/> Stock Reconciliation:</div>
                <div className={styles.hlVal} style={{color: '#059669'}}>Matched</div>
              </div>
            </div>

            <div className={styles.actionsCard}>
              <button className={`${styles.btnBlock} ${styles.btnBlockPrimary}`}>Record Stock Adjustment</button>
              <button className={styles.btnBlock}>Transfer Stock</button>
              <button className={styles.btnBlock}>Quarantine Batch</button>
              <button className={`${styles.btnBlock} ${styles.btnBlockDanger}`}>Initiate Recall</button>
              <button className={styles.btnBlock}>Mark Damaged</button>
              <button className={styles.btnBlock}>Notify Supplier</button>
              <button className={styles.btnBlock}>Export Batch Record</button>
              <button className={styles.btnBlock} style={{marginTop: 8}}>Suspend Marketplace Availability</button>
            </div>

            <div className={styles.disclaimer}>
              <Info size={16} style={{flexShrink: 0, marginTop: 2}}/>
              <div>
                All stock adjustments, transfers, quarantine actions, recalls, damage records, marketplace suspensions and overrides require a reason and are recorded in the <strong>audit history</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
