/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ArrowLeft, MoreVertical, AlertTriangle, ShieldAlert, CheckCircle, FileText, Info, Camera, Tag, AlertOctagon, FileWarning, HelpCircle } from "lucide-react";
import styles from "./product-approval-detail.module.css";
import { products } from "@/mocks/admin/fixtures";

export default async function ProductApprovalDetailPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = products.find(x => x.id === productId) || products[0]; // fallback for demo purposes

  return (
    <div className={styles.pageWrapper}>
      <Link href="/admin/catalogue/product-approvals" className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to Product Approval Queue
      </Link>
      <div className={styles.breadcrumbs}>
        CATALOGUE &gt; PRODUCT APPROVAL QUEUE &gt; {product.id}
      </div>

      {/* Header Container */}
      <div className={styles.headerRow}>
        <div className={styles.productMetaHeader}>
          <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80" alt="Product" className={styles.productImageLg} />
          <div>
            <div className={styles.titleArea}>
              <h1>{product.name}</h1>
              <span className={`${styles.badge} ${styles.pink}`}>COMPLIANCE REVIEW</span>
            </div>
            <div className={styles.metaGrid}>
              <div><span className={styles.metaLabel}>SKU: </span><span className={styles.metaValue}>RAD-VITC-30ML</span></div>
              <div><span className={styles.metaLabel}>Brand: </span><span className={styles.metaValue}>{product.brand}</span></div>
              <div><span className={styles.metaLabel}>Supplier: </span><span className={styles.metaValue}>{product.supplier}</span></div>
              <div><span className={styles.metaLink}>View Supplier Case</span></div>
              <div><span className={styles.metaLabel}>Category &gt; </span><span className={styles.metaLink}>Face Serum</span></div>
            </div>
            <div className={styles.tagsRow}>
              <div className={styles.tagItem}><AlertTriangle size={14} color="#d97706" /> Medium Risk</div>
              <div className={styles.tagItem}><Info size={14} /> Review Age: 2 Days</div>
            </div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btn}>Request Additional Information</button>
          <button className={`${styles.btn} ${styles.btnDanger}`}>Reject Product</button>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Approve Product</button>
          <button className={styles.btn} style={{padding: '10px'}}><MoreVertical size={16} /></button>
        </div>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statBlock}>
          <div className={styles.statLabel}>Product Reference</div>
          <div className={styles.statVal}>{product.id}</div>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statLabel}>Database Product ID</div>
          <div className={styles.statVal}>421</div>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statLabel}>Submitted Date</div>
          <div className={styles.statVal}>Oct 24, 2024</div>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statLabel}>Assigned Reviewer</div>
          <div className={styles.statVal}>Elena Vance</div>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statLabel}>Review Status</div>
          <div className={styles.statVal}>Compliance Review v2</div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.active}`}>Overview</div>
        <div className={styles.tab}>Product Content</div>
        <div className={styles.tab}>Beauty Profile</div>
        <div className={styles.tab}>Ingredients & Safety</div>
        <div className={styles.tab}>Variants</div>
        <div className={styles.tab}>Images & Media</div>
        <div className={styles.tab}>Brand Authorization</div>
        <Link href={`/admin/catalogue/product-approvals/${product.id}/inventory`} style={{ textDecoration: 'none' }}>
          <div className={styles.tab}>Inventory & Batches</div>
        </Link>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Column Content */}
        <div>
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Product Identity</h2>
            <div className={styles.identityGrid}>
              <div className={styles.idField}><div className={styles.idLabel}>Product Reference</div><div className={styles.idValue}>{product.id}</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>SKU</div><div className={styles.idValue}>RAD-VITC-30ML</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Brand</div><div className={styles.idValue}>{product.brand} <span className={styles.metaLink} style={{display:'block',fontSize:11,marginTop:4}}>View Brand</span></div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Supplier</div><div className={styles.idValue}>{product.supplier} <span className={styles.metaLink} style={{display:'block',fontSize:11,marginTop:4}}>View Supplier Case</span></div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Database Product ID</div><div className={styles.idValue}>421</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Barcode (GTIN)</div><div className={styles.idValue}>8901234567895</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Manufacturer</div><div className={styles.idValue}>Estée Lauder Companies Inc.</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Created At</div><div className={styles.idValue}>Oct 24, 2024</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Category</div><div className={styles.idValue}>Skincare &gt; Face Serum</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Type</div><div className={styles.idValue}>Finished Cosmetic Product</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Status</div><div className={`${styles.badge} ${styles.green}`} style={{marginTop:4}}>Active</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Updated At</div><div className={styles.idValue}>Oct 26, 2024</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Subcategory</div><div className={styles.idValue}>Vitamin C Serums</div></div>
              <div className={styles.idField}><div className={styles.idLabel}>Country of Origin</div><div className={styles.idValue}>USA</div></div>
            </div>
          </div>

          <div className={styles.metricsGrid} style={{marginBottom: 24}}>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>Content Completeness</div>
              <div className={styles.metricValue}>85%</div>
              <div className={styles.progressBar}><div className={`${styles.progressFill} ${styles.black}`} style={{width: '85%'}}></div></div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>Compliance Completeness</div>
              <div className={`${styles.metricValue} ${styles.orange}`}>72%</div>
              <div className={styles.progressBar}><div className={`${styles.progressFill} ${styles.orange}`} style={{width: '72%'}}></div></div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>Brand Authorization</div>
              <div className={`${styles.metricValue} ${styles.green}`} style={{display:'flex', alignItems:'center', gap: 6}}><CheckCircle size={20}/> Valid</div>
              <div style={{fontSize: 11, fontWeight: 700}}>AUTH-2023-0892</div>
              <div className={styles.metaLink} style={{fontSize: 11, marginTop: 4}}>View Brand Authorization Case</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>Variant Readiness</div>
              <div className={styles.metricValue}>100%</div>
              <div className={styles.progressBar}><div className={`${styles.progressFill} ${styles.green}`} style={{width: '100%'}}></div></div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>Media Readiness</div>
              <div className={styles.metricValue}>80%</div>
              <div className={styles.progressBar}><div className={`${styles.progressFill} ${styles.black}`} style={{width: '80%'}}></div></div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>Duplicate Risk</div>
              <div className={`${styles.metricValue} ${styles.green}`}>Low</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>Risk Score</div>
              <div className={styles.metricValue}>38 <span style={{fontSize: 12, fontWeight: 700, color: '#d97706'}}>Medium Risk</span></div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>Open Issues</div>
              <div className={`${styles.metricValue} ${styles.red}`}>3</div>
              <div className={styles.metaLink} style={{fontSize: 11}}>View Issues</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>Submission Version</div>
              <div className={styles.metricValue}>v2</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>SLA Deadline</div>
              <div style={{fontSize: 14, fontWeight: 750}}>Oct 31, 2024</div>
              <div style={{fontSize: 11, color: '#68707d'}}>(5 days left)</div>
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Marketplace Preview Summary</h2>
            <div className={styles.marketPreview}>
              <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80" alt="Preview" className={styles.previewImage} />
              <div className={styles.previewInfo}>
                <div className={styles.previewHeader}>
                  <h3 className={styles.previewTitle}>{product.name} - 30ml</h3>
                  <div className={styles.previewPrice}>LKR 12,450.00</div>
                </div>
                <div className={styles.previewDesc}>
                  An advanced Vitamin C serum designed to brighten dull skin, even out complexion, and provide powerful antioxidant protection. Formulated with 15% Pure Vitamin C and Hyaluronic Acid for a hydrated, radiant glow.
                </div>
                <div className={styles.previewTags}>
                  <span><Tag size={14} color="#68707d" /> Skincare &gt; Face Serum</span>
                  <span><FileText size={14} color="#68707d" /> 3 Variants</span>
                  <span><CheckCircle size={14} color="#68707d" /> Estée Lauder</span>
                </div>
                <div className={styles.previewStatuses}>
                  <div className={styles.statusBlock}>
                    <div className={styles.statusLabel}><Info size={14} /> Marketplace Visibility</div>
                    <div className={styles.statusVal}>Hidden - Pending Approval</div>
                  </div>
                  <div className={styles.statusBlock}>
                    <div className={styles.statusLabel}><FileText size={14} /> Available Variants</div>
                    <div className={styles.statusVal}>3</div>
                  </div>
                  <div className={styles.statusBlock}>
                    <div className={styles.statusLabel}><Camera size={14} /> Primary Image Status</div>
                    <div className={styles.statusVal}>Available</div>
                  </div>
                  <div className={styles.statusBlock}>
                    <div className={styles.statusLabel}><AlertOctagon size={14} /> Publication Eligibility</div>
                    <div className={`${styles.statusVal} ${styles.red}`}>Not Ready</div>
                  </div>
                </div>
              </div>
              <button className={styles.btnGhost}>Preview Marketplace Listing</button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Context */}
        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <h3>REVIEW PROGRESS</h3>
            <div className={styles.reviewProgressRow}>
              <div className={styles.rpPercent}>78%</div>
              <div className={styles.rpSteps}>14 / 18 STEPS</div>
            </div>
            <div className={styles.rpBarContainer}>
              <div className={`${styles.rpSegment} ${styles.done}`}></div>
              <div className={`${styles.rpSegment} ${styles.done}`}></div>
              <div className={`${styles.rpSegment} ${styles.done}`}></div>
              <div className={styles.rpSegment}></div>
            </div>
          </div>

          <div className={styles.sideCard}>
            <h3 style={{display: 'flex', alignItems: 'center', gap: 6, color: '#b42318'}}><AlertTriangle size={14} /> BLOCKING ISSUES (3)</h3>
            <div className={styles.blockingIssue}>
              <div className={styles.biHeader}>Missing safety evidence for 15% Vitamin C <span className={styles.metaLink} style={{fontSize: 11, fontWeight: 750}}>Review &gt;</span></div>
              <div className={styles.biDesc}>Lab results must be uploaded to Ingredients & Safety.</div>
            </div>
            <div className={styles.blockingIssue}>
              <div className={styles.biHeader}>Unsupported anti-aging claim <span className={styles.metaLink} style={{fontSize: 11, fontWeight: 750}}>Review &gt;</span></div>
              <div className={styles.biDesc}>Review marketing copy on Product Content.</div>
            </div>
            <div className={styles.blockingIssue}>
              <div className={styles.biHeader}>Back packaging image missing <span className={styles.metaLink} style={{fontSize: 11, fontWeight: 750}}>Review &gt;</span></div>
              <div className={styles.biDesc}>High-res ingredients list photo required.</div>
            </div>
            <div className={styles.metaLink} style={{textAlign: 'center', fontSize: 11, marginTop: 16}}>View all issues</div>
          </div>

          <div className={styles.sideCard}>
            <h3>AUTOMATED VALIDATION</h3>
            <div className={styles.validationList}>
              <div className={styles.valItem}>
                <div className={styles.valLeft}><CheckCircle size={14} color="#68707d" /> Brand Authorization</div>
                <div className={`${styles.valRight} ${styles.green}`}>Valid</div>
              </div>
              <div className={styles.valItem}>
                <div className={styles.valLeft}><CheckCircle size={14} color="#68707d" /> Product Category Covered</div>
                <div className={`${styles.valRight} ${styles.green}`}>Yes</div>
              </div>
              <div className={styles.valItem}>
                <div className={styles.valLeft}><FileWarning size={14} color="#68707d" /> Duplicate Barcode</div>
                <div className={`${styles.valRight} ${styles.green}`}>None</div>
              </div>
              <div className={styles.valItem}>
                <div className={styles.valLeft}><AlertTriangle size={14} color="#68707d" /> Prohibited Ingredients</div>
                <div className={`${styles.valRight} ${styles.green}`}>Clear</div>
              </div>
              <div className={styles.valItem}>
                <div className={styles.valLeft}><ShieldAlert size={14} color="#68707d" /> Active Recall</div>
                <div className={`${styles.valRight} ${styles.green}`}>None</div>
              </div>
              <div className={styles.valItem}>
                <div className={styles.valLeft}><FileText size={14} color="#68707d" /> Batch Eligibility</div>
                <div className={`${styles.valRight} ${styles.gray}`}>Pending Batch Submission</div>
              </div>
            </div>
          </div>

          <div className={styles.sideCard}>
            <h3>REVIEWER RECOMMENDATION</h3>
            <div className={styles.reviewerProfile}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Elena Vance" className={styles.avatar} />
              <div>
                <div className={styles.revName}>Elena Vance</div>
                <div className={styles.revRole}>Compliance Officer</div>
              </div>
            </div>
            <div className={styles.revNote}>
              Approve with conditions. Submit the missing safety certificate and back-packaging image. Remove the unsupported clinical claim before publication.
            </div>
            <div className={styles.revTime}>Updated: Oct 26, 2024 10:25 AM</div>
          </div>

          <div className={styles.sideCard}>
            <h3 style={{display: 'flex', alignItems: 'center', gap: 6}}>FINAL PRODUCT DECISION <HelpCircle size={14} color="#68707d"/></h3>
            <div className={styles.decisionStack}>
              <button className={`${styles.btnDecision} ${styles.bgGreen}`}><CheckCircle size={16}/> Approve Product</button>
              <button className={`${styles.btnDecision} ${styles.bgGreenDark}`}><CheckCircle size={16}/> Approve with Conditions</button>
              <button className={`${styles.btnDecision} ${styles.bgOrange}`}><HelpCircle size={16}/> Request Additional Information</button>
              <button className={`${styles.btnDecision} ${styles.bgRed}`}><AlertOctagon size={16}/> Reject Product</button>
              <button className={`${styles.btnDecision} ${styles.bgGray}`}><MoreVertical size={16}/> Suspend Review</button>
            </div>
            <div className={styles.decisionNote}>All approval, rejection, suspension and override decisions require a reason and are recorded in the audit history.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
