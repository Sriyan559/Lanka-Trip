"use client";

import React from "react";
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    healthTrendData,
    operationalStatusData,
    riskDistributionData,
} from "./reports.data";

const DONUT_COLORS = [
    "#9f1239",
    "#16a34a",
    "#2563eb",
    "#7c3aed",
    "#06b6d4",
    "#f97316",
    "#6b7280",
];

export function ComplianceHealthTrendChart({
    data = healthTrendData,
}: {
    data?: typeof healthTrendData;
}) {
    const isEmpty = !data || data.length === 0;

    return (
        <div className="relative h-[225px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={isEmpty ? [{ date: "No Data", breaches: 0, approvals: 0, riskEvents: 0, slaBreaches: 0 }] : data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line
                        type="monotone"
                        dataKey="breaches"
                        name="Active Breaches"
                        stroke="#dc2626"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="approvals"
                        name="Approvals"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="riskEvents"
                        name="Risk Events"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="slaBreaches"
                        name="SLA Breaches"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
            {isEmpty && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white/60">
                    <span className="text-xs text-gray-500 font-medium">No data available for the selected period</span>
                </div>
            )}
        </div>
    );
}

export function ComplianceRiskDistributionDonut({
    data = riskDistributionData,
}: {
    data?: typeof riskDistributionData;
}) {
    const isEmpty = !data || data.length === 0;
    const displayData = isEmpty
        ? [{ name: "No Data", value: 1, percentage: 0 }]
        : data;
    const total = isEmpty ? 0 : data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="flex min-h-[225px] items-center">
            <div className="relative h-[200px] w-[48%] min-w-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={displayData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={48}
                            outerRadius={75}
                            paddingAngle={isEmpty ? 0 : 1}
                        >
                            {displayData.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={isEmpty ? "#e5e7eb" : DONUT_COLORS[index % DONUT_COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-semibold text-gray-900">
                        {isEmpty ? 0 : total}
                    </span>
                    <span className="text-[9px] text-gray-500">
                        {isEmpty ? "No Data" : "Total Risks"}
                    </span>
                </div>
            </div>

            <div className="flex-1 space-y-2">
                {displayData.map((item, index) => (
                    <div
                        key={item.name}
                        className="grid grid-cols-[10px_1fr_35px_45px] items-center gap-2 text-[10px]"
                    >
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{
                                background: isEmpty ? "#e5e7eb" : DONUT_COLORS[index % DONUT_COLORS.length],
                            }}
                        />
                        <span className="truncate text-gray-700">{item.name}</span>
                        <span className="text-right text-gray-700">
                            {isEmpty ? 0 : item.value}
                        </span>
                        <span className="text-right text-gray-500">
                            {isEmpty ? "0%" : `${item.percentage.toFixed(1)}%`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function OperationalStatusSummaryChart({
    data = operationalStatusData,
}: {
    data?: typeof operationalStatusData;
}) {
    const isEmpty = !data || data.length === 0;
    const displayData = isEmpty
        ? [
            { status: "On Track", count: 0, percentage: 0, color: "#16a34a" },
            { status: "At Risk", count: 0, percentage: 0, color: "#f59e0b" },
            { status: "Under Review", count: 0, percentage: 0, color: "#2563eb" },
            { status: "Escalated", count: 0, percentage: 0, color: "#dc2626" },
            { status: "Closed", count: 0, percentage: 0, color: "#6b7280" },
        ]
        : data;

    const max = Math.max(...displayData.map((x) => x.count), 1);
    const totalCount = isEmpty ? 0 : displayData.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <div className="space-y-3 py-3">
            {displayData.map((item) => (
                <div
                    key={item.status}
                    className="grid grid-cols-[110px_1fr_35px_45px] items-center gap-2 text-[10px]"
                >
                    <span>{item.status}</span>
                    <div className="h-[5px] overflow-hidden rounded-full bg-gray-100">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: isEmpty ? "0%" : `${(item.count / max) * 100}%`,
                                backgroundColor: item.color,
                            }}
                        />
                    </div>
                    <span className="text-right">{item.count}</span>
                    <span className="text-right text-gray-500">
                        {item.percentage}%
                    </span>
                </div>
            ))}

            <div className="grid grid-cols-[110px_1fr_35px_45px] border-t pt-2 text-[10px] font-semibold">
                <span>Total</span>
                <span />
                <span className="text-right">{totalCount}</span>
                <span className="text-right">{isEmpty ? "0%" : "100%"}</span>
            </div>
        </div>
    );
}

export function MiniSparkline({
    data = [10, 15, 12, 18, 16, 20],
    color = "#16a34a",
    width = 60,
    height = 20,
}: {
    data?: number[];
    color?: string;
    width?: number;
    height?: number;
}) {
    if (!data || data.length === 0) {
        return (
            <svg width={width} height={height} className="overflow-visible">
                <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="2 2" />
            </svg>
        );
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min === 0 ? 1 : max - min;

    const points = data
        .map((val, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((val - min) / range) * (height - 4) - 2;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <svg width={width} height={height} className="overflow-visible">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
        </svg>
    );
}

export function MiniBarChart({
    data = [4, 6, 8, 5, 9, 10],
    color = "#850019",
    width = 60,
    height = 20,
}: {
    data?: number[];
    color?: string;
    width?: number;
    height?: number;
}) {
    if (!data || data.length === 0) {
        return (
            <svg width={width} height={height} className="overflow-visible">
                <line x1={0} y1={height - 1} x2={width} y2={height - 1} stroke="#cbd5e1" strokeWidth={1} />
            </svg>
        );
    }

    const max = Math.max(...data, 1);
    const barWidth = Math.max(2, (width / data.length) - 2);

    return (
        <svg width={width} height={height} className="overflow-visible">
            {data.map((val, i) => {
                const barHeight = (val / max) * (height - 2);
                const x = i * (barWidth + 2);
                const y = height - barHeight;
                return (
                    <rect
                        key={i}
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={color}
                        rx={1}
                    />
                );
            })}
        </svg>
    );
}
