"use client";

import React from "react";
import { TransferExceptionItem } from "@/data/marketingReportsAudit.mock";

interface TransferExceptionsTableProps {
  exceptions: TransferExceptionItem[];
}

export function TransferExceptionsTable({ exceptions }: TransferExceptionsTableProps) {
  const getActionStyle = (act: string) => {
    switch (act) {
      case "Resolve":
        return "text-rose-700 font-bold hover:underline cursor-pointer";
      case "Investigate":
        return "text-amber-700 font-bold hover:underline cursor-pointer";
      case "Review":
        return "text-[#800020] font-bold hover:underline cursor-pointer";
      case "Monitor":
      default:
        return "text-gray-600 font-semibold hover:underline cursor-pointer";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          16. Transfer Exceptions <span className="text-gray-400 font-normal">(Open)</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Job ID</th>
                <th className="py-1">Issue</th>
                <th className="py-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {exceptions.map((ex) => (
                <tr key={ex.jobId} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-[10px] font-bold text-gray-900">{ex.jobId}</td>
                  <td className="py-1.5 font-medium text-gray-700">{ex.issue}</td>
                  <td className="py-1.5 text-center">
                    <span className={getActionStyle(ex.actionRequired)}>{ex.actionRequired}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
