'use client';

import {
  AlertCircle, CheckCircle2, Clock, AlertTriangle, Users,
  Package, Settings, FileText, Trash2, GitCompare, History,
  Download, Eye,
} from 'lucide-react';
import { useState } from 'react';

interface QuickQueueItem {
  icon: React.ReactNode;
  label: string;
  count: number;
  status: 'warning' | 'error' | 'info';
}

const quickQueues: QuickQueueItem[] = [
  { icon: <AlertCircle className="w-5 h-5" />, label: 'Service Compliance Issues', count: 3, status: 'warning' },
  { icon: <Clock className="w-5 h-5" />, label: 'Pending Approvals', count: 2, status: 'warning' },
  { icon: <Users className="w-5 h-5" />, label: 'Salon Readiness', count: 1, status: 'warning' },
  { icon: <Package className="w-5 h-5" />, label: 'Product Stock Issues', count: 4, status: 'error' },
  { icon: <AlertTriangle className="w-5 h-5" />, label: 'Training Requirements', count: 2, status: 'warning' },
  { icon: <Clock className="w-5 h-5" />, label: 'Schedule Conflicts', count: 5, status: 'error' },
  { icon: <Settings className="w-5 h-5" />, label: 'Service Updates', count: 3, status: 'info' },
  { icon: <Users className="w-5 h-5" />, label: 'Staff Performance Review', count: 2, status: 'warning' },
];

export function BeautyWellnessOverview() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const healthScore = 96;
  const maxScore = 100;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Section A: Health Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-8 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-8">A. Beauty & Wellness Health Score</h2>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-52 h-52 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                {/* Progress circle - teal/green color */}
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="10"
                  strokeDasharray={`${(healthScore / maxScore) * 326.73} 326.73`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-5xl font-bold text-gray-900">{healthScore}</div>
                <div className="text-xl text-gray-600">/{maxScore}</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-teal-600">Excellent</div>
            </div>
          </div>
        </div>

        {/* Section B: Service Summary */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">B. Service Summary</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Current Version</span>
              <span className="font-semibold text-gray-900">v3.2.1</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Target Version</span>
              <span className="font-semibold text-gray-900">v3.3.0</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Active Services</span>
              <span className="font-semibold text-gray-900">24</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Service Categories</span>
              <span className="font-semibold text-gray-900">8</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Connected Salons</span>
              <span className="font-semibold text-gray-900">156</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Active Bookings</span>
              <span className="font-semibold text-gray-900">2,847</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Premium Services</span>
              <span className="font-semibold text-gray-900">12</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Regions Supported</span>
              <span className="font-semibold text-gray-900">9</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section C: Release Summary */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">C. Release Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <span className="text-gray-600 block mb-2">Service Readiness</span>
            <span className="text-2xl font-bold text-gray-900">98%</span>
          </div>
          <div>
            <span className="text-gray-600 block mb-2">Target Launch</span>
            <span className="text-sm font-semibold text-gray-900">Sep 15, 2026</span>
          </div>
          <div>
            <span className="text-gray-600 block mb-2">Pending Approvals</span>
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <div>
            <span className="text-gray-600 block mb-2">Compatibility Risks</span>
            <span className="text-2xl font-bold text-red-600">2</span>
          </div>
          <div>
            <span className="text-gray-600 block mb-2">Breaking Changes</span>
            <span className="text-2xl font-bold text-gray-900">0</span>
          </div>
          <div className="col-span-2 md:col-span-5">
            <span className="text-gray-600 block mb-2">Migration Required</span>
            <span className="text-sm font-semibold text-red-600">Yes</span>
          </div>
        </div>
      </div>

      {/* Section D: Franchise Impact */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">D. Franchise Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <span className="text-gray-600 block mb-2">Active Franchises</span>
            <span className="text-2xl font-bold text-gray-900">287</span>
          </div>
          <div>
            <span className="text-gray-600 block mb-2">Affected by v3.3</span>
            <span className="text-2xl font-bold text-orange-600">74</span>
          </div>
          <div>
            <span className="text-gray-600 block mb-2">Active Customizations</span>
            <span className="text-2xl font-bold text-gray-900">18</span>
          </div>
          <div>
            <span className="text-gray-600 block mb-2">Expiring Customizations</span>
            <span className="text-2xl font-bold text-red-600">3</span>
          </div>
          <div>
            <span className="text-gray-600 block mb-2">Franchises Requiring Review</span>
            <span className="text-2xl font-bold text-red-600">6</span>
          </div>
        </div>
      </div>

      {/* Section E: Quick Queues */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">E. Quick Queues</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickQueues.map((item, index) => {
            const statusColors = {
              warning: 'bg-orange-50 border-orange-200',
              error: 'bg-red-50 border-red-200',
              info: 'bg-blue-50 border-blue-200',
            };
            const badgeColors = {
              warning: 'bg-orange-100 text-orange-700 border-orange-300',
              error: 'bg-red-100 text-red-700 border-red-300',
              info: 'bg-blue-100 text-blue-700 border-blue-300',
            };

            return (
              <div
                key={index}
                className={`border-2 rounded-lg p-4 flex items-center justify-between ${statusColors[item.status]}`}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                </div>
                <span className={`flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold border-2 ${badgeColors[item.status]}`}>
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section F: Recommended Next Action */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">F. Recommended Next Action</h2>
        <p className="text-gray-800 mb-6 leading-relaxed">
          Complete the salon readiness review and approve the remaining compliance requirements before launching v3.3.0. Ensure all franchise partners have updated their service offerings and staff training is complete.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">Owner</span>
              <span className="font-semibold text-gray-900">Sarah Mitchell</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">Due Date</span>
              <span className="font-semibold text-gray-900">Sep 10, 2026</span>
            </div>
          </div>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
            View Action Plan
          </button>
        </div>
      </div>

      {/* Section G: Controlled Actions */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">G. Controlled Actions</h2>
        <div className="space-y-3">
          <button className="w-full bg-red-900 text-white py-3 rounded-lg font-medium hover:bg-red-950 transition-colors">
            Review Service Readiness
          </button>
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium border-2 border-red-300 hover:bg-red-200 transition-colors">
            Create New Version
          </button>
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium border-2 border-red-300 hover:bg-red-200 transition-colors">
            Validate Service Compatibility
          </button>
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium border-2 border-red-300 hover:bg-red-200 transition-colors">
            Review Service Dependencies
          </button>
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium border-2 border-red-300 hover:bg-red-200 transition-colors">
            Review Salon Readiness
          </button>
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium border-2 border-red-300 hover:bg-red-200 transition-colors">
            Review Franchise Impact
          </button>
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium border-2 border-red-300 hover:bg-red-200 transition-colors">
            Review Customizations
          </button>
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium border-2 border-red-300 hover:bg-red-200 transition-colors">
            Compare Versions
          </button>
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium border-2 border-red-300 hover:bg-red-200 transition-colors">
            View Audit History
          </button>
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium border-2 border-red-300 hover:bg-red-200 transition-colors">
            Export Service Definition
          </button>
        </div>

        {/* Request Deprecation */}
        <div className="mt-6 pt-6 border-t-2 border-red-200">
          <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium border-2 border-red-300 hover:bg-red-200 transition-colors">
            Request Deprecation
          </button>
        </div>
      </div>
    </div>
  );
}
