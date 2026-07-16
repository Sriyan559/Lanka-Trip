'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Sun, Moon, CheckCircle } from 'lucide-react';

export default function AIAdvisorRoutine({ routine, products = [] }) {
  if (!routine || routine.length === 0) return null;

  return (
    <div className="my-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Calendar size={18} className="text-purple-700" />
        <h4 className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider">
          Your Curated Routine Plan
        </h4>
      </div>

      <div className="relative border-l border-purple-200 ml-2.5 pl-4 space-y-4">
        {routine.map((step, idx) => {
          // Find matching product data
          const matchedProduct = products.find(
            (p) => String(p.id) === String(step.productId)
          );

          return (
            <div key={idx} className="relative">
              {/* Bullet circle */}
              <span className="absolute -left-[22.5px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white ring-4 ring-purple-100">
                {step.step || idx + 1}
              </span>

              <div>
                <h5 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  {step.title}
                </h5>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {step.instruction}
                </p>

                {matchedProduct && (
                  <div className="mt-2 flex items-center gap-2 p-2 bg-white rounded-xl border border-purple-100 hover:border-purple-200 transition-colors w-full max-w-sm">
                    {matchedProduct.featured_image && (
                      <Image
                        src={matchedProduct.featured_image}
                        alt={matchedProduct.name}
                        width={40}
                        height={40}
                        unoptimized
                        className="w-10 h-10 rounded-lg object-cover bg-gray-50"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-gray-400 uppercase truncate">
                        {matchedProduct.supplier || 'SL Beauty'}
                      </div>
                      <div className="text-[11px] font-semibold text-gray-800 truncate">
                        {matchedProduct.name}
                      </div>
                      <div className="text-[11px] font-bold text-purple-700">
                        LKR {matchedProduct.price}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
