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

import { defaultDataOpsTrend, defaultJobStatusDonut } from "./data-operations.data";

const DONUT_COLORS = [
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#2563eb",
    "#06b6d4",
    "#9ca3af",
];

export function DataOpsTrendChart({
    data = defaultDataOpsTrend,
}: {
    data?: typeof defaultDataOpsTrend;
}) {
    const isEmpty = !data || data.length === 0;
    const displayData = isEmpty ? defaultDataOpsTrend : data;

    return (
        <div className="relative h-[225px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displayData}>
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
                        dataKey="Imports"
                        name="Imports"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Exports"
                        name="Exports"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Failed Records"
                        name="Failed Records"
                        stroke="#dc2626"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
            {isEmpty && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white/60">
                    <span className="text-xs text-gray-500 font-medium">No data operations activity available for selected period</span>
                </div>
            )}
        </div>
    );
}

export function JobStatusDistributionDonut({
    data = defaultJobStatusDonut,
}: {
    data?: typeof defaultJobStatusDonut;
}) {
    const isEmpty = !data || data.length === 0;
    const displayData = isEmpty ? defaultJobStatusDonut : data;
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
                            paddingAngle={total === 0 ? 0 : 1}
                        >
                            {displayData.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={total === 0 ? "#e5e7eb" : DONUT_COLORS[index % DONUT_COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-semibold text-gray-900">
                        {total}
                    </span>
                    <span className="text-[9px] text-gray-500">
                        Total Jobs
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
                                background: total === 0 ? "#e5e7eb" : DONUT_COLORS[index % DONUT_COLORS.length],
                            }}
                        />
                        <span className="truncate text-gray-700">{item.name}</span>
                        <span className="text-right text-gray-700">{item.value}</span>
                        <span className="text-right text-gray-500">
                            {total > 0 ? `${((item.value / total) * 100).toFixed(1)}%` : "0%"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
