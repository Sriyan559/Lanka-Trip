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

interface InventoryKpisRowProps {
  totalActiveStock?: number;
  availableStock?: number;
  reservedStock?: number;
  lowStockCount?: number;
  outOfStockCount?: number;
  nearExpiryUnits?: number;
  expiredUnits?: number;
  quarantinedStock?: number;
  recalledCount?: number;
}

export function InventoryKpisRow({
  totalActiveStock = 124592,
  availableStock = 108360,
  reservedStock = 8401,
  lowStockCount = 36,
  outOfStockCount = 18,
  nearExpiryUnits = 3120,
  expiredUnits = 220,
  quarantinedStock = 450,
  recalledCount = 12,
}: InventoryKpisRowProps) {
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
        <div className={styles.kpiVal}>{totalActiveStock.toLocaleString()}</div>
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
        <div className={styles.kpiVal}>{availableStock.toLocaleString()}</div>
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
        <div className={styles.kpiVal}>{reservedStock.toLocaleString()}</div>
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
        <div className={styles.kpiVal}>{lowStockCount}</div>
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
        <div className={styles.kpiVal}>{outOfStockCount}</div>
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
        <div className={styles.kpiVal}>{nearExpiryUnits.toLocaleString()}</div>
        <div className={`${styles.kpiSubText} ${styles.orangeSubText}`}>
          High Risk — 30 Days
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
        <div className={styles.kpiVal}>{expiredUnits}</div>
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
        <div className={styles.kpiVal}>{quarantinedStock}</div>
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
        <div className={styles.kpiVal}>{recalledCount}</div>
        <div className={styles.kpiSubText}>Products</div>
      </div>
    </div>
  );
}
