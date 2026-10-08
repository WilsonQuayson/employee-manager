
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { DepartmentCount } from "../types/dashboard";

type DepartmentDistributionChartProps = {
    data: DepartmentCount[];
};

const COLORS = [
    "#159f6b",
    "#4db68f",
    "#7ac8aa",
    "#9bd7bf",
    "#b8e3d3",
    "#d2eee3",
    "#e1f4ec",
];

type CustomTooltipProps = {
    active?: boolean;
    payload?: Array<{
        name?: string;
        value?: number;
        color?: string;
    }>;
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;

    const item = payload[0];

    return (
        <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg">
            <p className="mb-1 text-xs font-semibold text-slate-900">
                People
            </p>

            <div className="flex items-center gap-2">
                <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: item.color ?? "#159f6b" }}
                />

                <span className="text-xs text-slate-500">
                    {item.name}
                </span>

                <span className="text-xs font-semibold text-slate-900">
                    {item.value}
                </span>
            </div>
        </div>
    );
}

export default function DepartmentDistributionChart({data,}: DepartmentDistributionChartProps) {
    const departments = data.filter((department) => department.count > 0);

    return (
        <div className="col-span-6 w-full rounded-[20px] border border-slate-200/80 bg-white px-6 py-6 shadow-sm">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-base font-semibold text-slate-950">
                    Department distribution
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    People per department
                </p>
            </div>

            {/* Chart and legend */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                <div className="h-52 w-full min-w-0 sm:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={departments}
                                dataKey="count"
                                nameKey="department"
                                cx="50%"
                                cy="50%"
                                innerRadius="62%"
                                outerRadius="85%"
                                startAngle={0}
                                endAngle={360}
                                paddingAngle={0}
                                stroke="#ffffff"
                                strokeWidth={2}
                            >
                                {departments.map((department, index) => (
                                    <Cell
                                        key={department.department}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom legend */}
                <div className="flex w-full min-w-0 flex-col gap-3 sm:w-1/2">
                    {departments.map((department, index) => (
                        <div
                            key={department.department}
                            className="flex items-center justify-between gap-4"
                        >
                            <div className="flex min-w-0 items-center gap-2">
                                <span
                                    className="size-2.5 shrink-0 rounded-full"
                                    style={{
                                        backgroundColor:
                                            COLORS[index % COLORS.length],
                                    }}
                                />

                                <span className="truncate text-sm text-slate-500">
                                    {department.department}
                                </span>
                            </div>

                            <span className="text-sm font-medium text-slate-950">
                                {department.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
