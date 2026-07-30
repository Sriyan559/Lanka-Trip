/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ArrowLeft, Search, MoreVertical } from "lucide-react";
import styles from "./product-approvals.module.css";
import { products } from "@/mocks/admin/fixtures";

export default async function ProductApprovalQueuePage({ searchParams }: { searchParams: Promise<{ status?: string, authorizationId?: string }> }) {
  // Simulating URL filter mapping
  const resolvedSearchParams = await searchParams;
  const filterAuthId = resolvedSearchParams?.authorizationId || "AUTH-2023-0892";
  
  return (
    <div className={styles.pageWrapper}>
      <Link href="/admin/verification/brand-authorizations" className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to Brand Authorization Case
      </Link>

      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h1>Product Approval Queue</h1>
          <p>
            Review submitted products for catalogue accuracy, brand authorization, legal/regulatory, attribute completeness, ingredient and safety compliance, content readiness and distributor/supplier validation before publishing to marketplace.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Review Next Product</button>
          <button className={styles.btn}>Bulk Assign</button>
          <button className={styles.btn}>View Approval History</button>
          <button className={styles.btn}>Product Import Review</button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>New Submissions</div>
          <div className={styles.kpiValue}>
            142 <span className={`${styles.kpiTrend} ${styles.trendUp}`}>+12%</span>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Under Review</div>
          <div className={styles.kpiValue}>38</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Info Requested</div>
          <div className={styles.kpiValue}>19</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Approval Today</div>
          <div className={styles.kpiValue}>64</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Rejected</div>
          <div className={styles.kpiValue}>8</div>
        </div>
        <div className={`${styles.kpiCard} ${styles.redText} ${styles.redBorder}`}>
          <div className={styles.kpiLabel}>Brand Auth Issues</div>
          <div className={styles.kpiValue}>12</div>
        </div>
        <div className={`${styles.kpiCard} ${styles.redText} ${styles.redBorder}`}>
          <div className={styles.kpiLabel}>Missing Compliance</div>
          <div className={styles.kpiValue}>24</div>
        </div>
        <div className={`${styles.kpiCard} ${styles.orangeText} ${styles.orangeBorder}`}>
          <div className={styles.kpiLabel}>Duplicate Warnings</div>
          <div className={styles.kpiValue}>7</div>
        </div>
        <div className={`${styles.kpiCard} ${styles.redText} ${styles.redBorder}`}>
          <div className={styles.kpiLabel}>High Risk</div>
          <div className={styles.kpiValue}>3</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterControls}>
          <div className={styles.searchBox}>
            <Search size={16} color="#68707d" />
            <input type="text" placeholder="Search product name, SKU, brand..." />
          </div>
          <select className={styles.dropdown}>
            <option>Status: All Submissions</option>
          </select>
          <select className={styles.dropdown}>
            <option>Under: All Reviewers</option>
          </select>
          <select className={styles.dropdown}>
            <option>Risk Level: All Levels</option>
          </select>
        </div>
        <div className={styles.quickViews}>
          <span className={styles.quickViewsLabel}>Quick Views:</span>
          <button className={`${styles.pill} ${styles.activeDarkRed}`}>Assigned to Me</button>
          <button className={styles.pill}>New Submissions</button>
          <button className={`${styles.pill} ${styles.riskRed}`}>High Risk</button>
          <button className={styles.pill}>Information Requested</button>
          <button className={styles.pill}>Globally Pending</button>
          <button className={styles.pill}>Ready for Final Approval</button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Data Table */}
        <div className={styles.tableContainer}>
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th>Product & Identity</th>
                <th>Product ID</th>
                <th>Brand & Supplier</th>
                <th>Category</th>
                <th>Variants</th>
                <th>Selling Price</th>
                <th>Brand Authorization</th>
                <th>Content Completeness</th>
                <th>Compliance Status</th>
                <th>Duplicate Risk</th>
                <th>Risk Level</th>
                <th>Submitted Date</th>
                <th>Assigned Reviewer</th>
                <th>Review Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.productCell}>
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=100&q=80" alt="Serum" className={styles.productImage} />
                    <div className={styles.productInfo}>
                      <h4>Radiance Vitamin C Serum</h4>
                      <div className={styles.productMeta}>
                        SKU: RAD-VITC-30ML<br/>
                        Type: Face Serum<br/>
                        Version: v2
                      </div>
                    </div>
                  </div>
                </td>
                <td>PROD-<br/>2024-<br/>00421</td>
                <td>
                  <div style={{fontWeight: 700}}>Estée<br/>Lauder</div>
                  <div style={{color: '#68707d', fontSize: 11, marginTop: 4}}>Luxe<br/>Distribution<br/>Pvt Ltd</div>
                </td>
                <td>Skincare &gt;<br/>Face Serum</td>
                <td style={{textAlign: 'center', fontWeight: 700}}>3</td>
                <td>LKR<br/>12,450.00</td>
                <td>
                  <div className={`${styles.badge} ${styles.valid}`} style={{marginBottom: 4}}>Valid</div>
                  <div style={{fontSize: 11, color: '#68707d'}}>AUTH-2023-<br/>0892</div>
                </td>
                <td>
                  <div style={{fontWeight: 700, fontSize: 12}}>85%</div>
                  <div className={styles.progressBar}><div className={styles.progressFill} style={{width: '85%'}}></div></div>
                </td>
                <td>
                  <div className={`${styles.badge} ${styles.pending}`}>Safety<br/>Evidence<br/>Pending</div>
                </td>
                <td style={{fontWeight: 650}}>Low</td>
                <td><span className={`${styles.badge} ${styles.medium}`}>Medium</span></td>
                <td style={{fontWeight: 650}}>Oct 24,<br/>2024</td>
                <td>Elena<br/>Vance</td>
                <td><span className={`${styles.badge} ${styles.blue}`}>Compliance<br/>Review</span></td>
                <td>
                  <div style={{display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center'}}>
                    <Link href={`/admin/catalogue/product-approvals/${products[0]?.id || 'mock'}`}>
                      <button className={`${styles.btn} ${styles.btnDarkRed}`} style={{padding: '8px 12px', fontSize: 12}}>Open Review</button>
                    </Link>
                    <button className={styles.btn} style={{padding: '8px'}}><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.tableFooter}>
            <div>Showing 1 product submitted under {filterAuthId}</div>
            <div className={styles.pagination}>
              <button className={styles.pageBtn}>&lt;</button>
              <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
              <button className={styles.pageBtn}>&gt;</button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
