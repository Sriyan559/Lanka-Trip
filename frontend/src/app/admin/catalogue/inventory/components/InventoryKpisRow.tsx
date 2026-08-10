"use client";

import React from "react";
import {
  Package,
  Box,
  Bookmark,
  AlertTriangle,
  XCircle,
  Clock,
  Calendar,
  Shield,
  AlertOctagon,
} from "lucide-react";
import styles from "../inventory.module.css";
import type { InventoryOperationsData, Metric } from "@/types/inventoryOperations";

interface InventoryKpisRowProps { metrics: InventoryOperationsData['kpis']; }
const value=(metric:Metric)=>metric.value===null?'N/A':metric.value.toLocaleString();

export function InventoryKpisRow({ metrics }: InventoryKpisRowProps) {
  return (
    <div className={styles.kpiRow9}>
      {/* 1. Total Active Stock */}
      <div className={styles.kpiCard}>
        <div className={styles.kpiTop}>
          <span className={styles.kpiTitle}>Total Active Stock</span>
          <div className={`${styles.kpiIconWrapper} ${styles.iconGray}`}>
            <Package size={16} />
          </div>
        </div>
        <div className={styles.kpiVal} title={metrics.totalActiveStock.definition}>{value(metrics.totalActiveStock)}</div>
        <div className={styles.kpiSubText}>Units</div>
      </div>

      {/* 2. Available Stock */}
      <div className={styles.kpiCard}>
        <div className={styles.kpiTop}>
          <span className={styles.kpiTitle}>Available Stock</span>
          <div className={`${styles.kpiIconWrapper} ${styles.iconGreen}`}>
            <Box size={16} />
          </div>
        </div>
        <div className={styles.kpiVal} title={metrics.availableStock.definition}>{value(metrics.availableStock)}</div>
        <div className={styles.kpiSubText}>Units</div>
      </div>

      {/* 3. Reserved Stock */}
      <div className={styles.kpiCard}>
        <div className={styles.kpiTop}>
          <span className={styles.kpiTitle}>Reserved Stock</span>
          <div className={`${styles.kpiIconWrapper} ${styles.iconBlue}`}>
            <Bookmark size={16} />
          </div>
        </div>
        <div className={styles.kpiVal} title={metrics.reservedStock.reason}>{value(metrics.reservedStock)}</div>
        <div className={styles.kpiSubText}>Units</div>
      </div>

      {/* 4. Low-Stock Products */}
      <div className={styles.kpiCard}>
        <div className={styles.kpiTop}>
          <span className={styles.kpiTitle}>Low-Stock Products</span>
          <div className={`${styles.kpiIconWrapper} ${styles.iconAmber}`}>
            <AlertTriangle size={16} />
          </div>
        </div>
        <div className={styles.kpiVal}>{value(metrics.lowStockProducts)}</div>
        <div className={styles.kpiSubText}>Products</div>
      </div>

      {/* 5. Out-of-Stock Products */}
      <div className={styles.kpiCard}>
        <div className={styles.kpiTop}>
          <span className={styles.kpiTitle}>Out-of-Stock Products</span>
          <div className={`${styles.kpiIconWrapper} ${styles.iconRed}`}>
            <XCircle size={16} />
          </div>
        </div>
        <div className={styles.kpiVal}>{value(metrics.outOfStockProducts)}</div>
        <div className={styles.kpiSubText}>Products</div>
      </div>

      {/* 6. Near-Expiry Units */}
      <div className={styles.kpiCard}>
        <div className={styles.kpiTop}>
          <span className={styles.kpiTitle}>Near-Expiry Units</span>
          <div className={`${styles.kpiIconWrapper} ${styles.iconOrange}`}>
            <Clock size={16} />
          </div>
        </div>
        <div className={styles.kpiVal} title={metrics.nearExpiryUnits.reason}>{value(metrics.nearExpiryUnits)}</div>
        <div className={`${styles.kpiSubText} ${styles.orangeSubText}`}>
          {metrics.nearExpiryUnits.availability === 'unavailable' ? 'Unavailable' : 'High Risk — 30 Days'}
        </div>
      </div>

      {/* 7. Expired Units */}
      <div className={styles.kpiCard}>
        <div className={styles.kpiTop}>
          <span className={styles.kpiTitle}>Expired Units</span>
          <div className={`${styles.kpiIconWrapper} ${styles.iconRed}`}>
            <Calendar size={16} />
          </div>
        </div>
        <div className={styles.kpiVal} title={metrics.expiredUnits.reason}>{value(metrics.expiredUnits)}</div>
        <div className={styles.kpiSubText}>Units</div>
      </div>

      {/* 8. Quarantined Stock */}
      <div className={styles.kpiCard}>
        <div className={styles.kpiTop}>
          <span className={styles.kpiTitle}>Quarantined Stock</span>
          <div className={`${styles.kpiIconWrapper} ${styles.iconPurple}`}>
            <Shield size={16} />
          </div>
        </div>
        <div className={styles.kpiVal} title={metrics.quarantinedStock.reason}>{value(metrics.quarantinedStock)}</div>
        <div className={styles.kpiSubText}>Units</div>
      </div>

      {/* 9. Recalled Products */}
      <div className={styles.kpiCard}>
        <div className={styles.kpiTop}>
          <span className={styles.kpiTitle}>Recalled Products</span>
          <div className={`${styles.kpiIconWrapper} ${styles.iconRed}`}>
            <AlertOctagon size={16} />
          </div>
        </div>
        <div className={styles.kpiVal} title={metrics.recalledProducts.reason}>{value(metrics.recalledProducts)}</div>
        <div className={styles.kpiSubText}>Products</div>
      </div>
    </div>
  );
}
