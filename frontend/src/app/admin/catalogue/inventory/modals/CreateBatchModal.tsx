"use client";

import React, { useState, useRef } from "react";
import { X, Plus } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";
import styles from "../inventory.module.css";

interface CreateBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (batchData: any) => void;
}

export function CreateBatchModal({
  isOpen,
  onClose,
  onConfirm,
}: CreateBatchModalProps) {
  const [productName, setProductName] = useState("Radiance Vitamin C Serum");
  const [sku, setSku] = useState("RAD-VITC-30ML");
  const [batchNumber, setBatchNumber] = useState("BT-2024-0301");
  const [supplier, setSupplier] = useState("Luxe Distribution Pvt Ltd");
  const [location, setLocation] = useState("Colombo Main Hub");
  const [mfgDate, setMfgDate] = useState("2024-08-01");
  const [expDate, setExpDate] = useState("2027-08-01");
  const [quantity, setQuantity] = useState(1500);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            <Plus size={18} color="#351119" /> Create New Inventory Batch
          </h3>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Product Name</label>
            <input
              type="text"
              className={styles.formInput}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className={styles.formRow2}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>SKU</label>
              <input
                type="text"
                className={styles.formInput}
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Batch Number</label>
              <input
                type="text"
                className={styles.formInput}
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formRow2}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Supplier</label>
              <input
                type="text"
                className={styles.formInput}
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Inventory Location</label>
              <select
                className={styles.formSelect}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="Colombo Main Hub">Colombo Main Hub</option>
                <option value="Kandy Regional Hub">Kandy Regional Hub</option>
                <option value="Galle Supplier Hub">Galle Supplier Hub</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow2}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Manufacturing Date</label>
              <input
                type="date"
                className={styles.formInput}
                value={mfgDate}
                onChange={(e) => setMfgDate(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Expiry Date</label>
              <input
                type="date"
                className={styles.formInput}
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Initial Stock Quantity (Units)</label>
            <input
              type="number"
              className={styles.formInput}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.btn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnBurgundy}`}
            onClick={() =>
              onConfirm({
                productName,
                sku,
                batchNumber,
                supplier,
                location,
                mfgDate,
                expDate,
                quantity,
              })
            }
          >
            Create Batch
          </button>
        </div>
      </div>
    </div>
  );
}
