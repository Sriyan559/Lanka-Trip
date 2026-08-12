"use client";

import {
    Bar,
    BarChart,
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
    governanceStatuses,
    ruleDomains,
    trendData,
} from "./governance.data";

const COLORS = [
    "#9f1239",
    "#16a34a",
    "#2563eb",
    "#7c3aed",
    "#06b6d4",
    "#f97316",
    "#fb923c",
];

export function GovernanceActivityTrend({ data = trendData }: { data?: any[] }) {
    const isEmpty = !data || data.length === 0;
    const chartData = isEmpty ? [{ date: 'No Data', active: 0, approvals: 0, conflicts: 0, escalations: 0, revalidations: 0 }] : data;

    return (
        <div className="relative h-[225px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
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

                    <Legend
                        wrapperStyle={{
                            fontSize: 10,
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="active"
                        name="Active Rules"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="approvals"
                        name="Approvals"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="conflicts"
                        name="Conflicts"
                        stroke="#dc2626"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="escalations"
                        name="Escalations"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="revalidations"
                        name="Revalidations"
                        stroke="#9333ea"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
            {isEmpty && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white/60">
                    <span className="text-xs text-gray-500 font-medium">No governance activity for this period</span>
                </div>
            )}
        </div>
    );
}

export function RuleDomainDistribution({ data = ruleDomains }: { data?: any[] }) {
    const isEmpty = !data || data.length === 0;
    const displayData = isEmpty ? [{ name: 'No Rules', value: 0 }] : data;
    const total = isEmpty ? 0 : displayData.reduce((sum, item) => sum + (item.value || 0), 0);

    return (
        <div className="flex min-h-[225px] items-center">
            <div className="relative h-[200px] w-[48%] min-w-[160px]">
                <ResponsiveContainer>
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
                                    fill={isEmpty ? "#e5e7eb" : COLORS[index % COLORS.length]}
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
                        {isEmpty ? 'No Data' : 'Total Rules'}
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
                                background: isEmpty ? "#e5e7eb" : COLORS[index % COLORS.length],
                            }}
                        />

                        <span className="truncate text-gray-700">
                            {item.name}
                        </span>

                        <span className="text-right text-gray-700">
                            {item.value || 0}
                        </span>

                        <span className="text-right text-gray-500">
                            {total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function GovernanceStatusSummary({ data = governanceStatuses }: { data?: any[] }) {
    const isEmpty = !data || data.length === 0;
    const displayData = isEmpty ? [
        { label: "Active", value: 0, percentage: 0, color: "#16a34a" },
        { label: "Draft", value: 0, percentage: 0, color: "#6b7280" },
        { label: "Pending Approval", value: 0, percentage: 0, color: "#2563eb" },
    ] : data;

    const max = Math.max(...displayData.map((x) => x.value), 1);
    const totalCount = isEmpty ? 0 : displayData.reduce((a, b) => a + (b.value || 0), 0);

    return (
        <div className="space-y-3 py-3">
            {displayData.map((status) => (
                <div
                    key={status.label}
                    className="grid grid-cols-[110px_1fr_35px_45px] items-center gap-2 text-[10px]"
                >
                    <span>{status.label}</span>

                    <div className="h-[5px] overflow-hidden rounded-full bg-gray-100">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${(status.value / max) * 100}%`,
                                backgroundColor: status.color,
                            }}
                        />
                    </div>

                    <span className="text-right">
                        {status.value}
                    </span>

                    <span className="text-right text-gray-500">
                        {status.percentage}%
                    </span>
                </div>
            ))}

            <div className="grid grid-cols-[110px_1fr_35px_45px] border-t pt-2 text-[10px] font-semibold">
                <span>Total</span>
                <span />
                <span className="text-right">{totalCount}</span>
                <span className="text-right">{totalCount > 0 ? "100%" : "0%"}</span>
            </div>
        </div>
    );
}