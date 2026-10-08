
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { StatusCount } from "../types/dashboard";

type EmploymentStatusChartProps = {
    data: StatusCount[];
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
    Active: { label: "Active", color: "#159f6b" },
    OnLeave: { label: "On leave", color: "#f0ad29" },
    Terminated: { label: "Offboarded", color: "#dc2626" },
};

const STATUS_ORDER = ["Active", "OnLeave", "Terminated"];

type CustomTooltipProps = {
    active?: boolean;
    payload?: Array<{
        name?: string;
        value?: number;
        payload?: { status: string };
    }>;
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;

    const item = payload[0];
    const status = item.payload?.status ?? item.name ?? "";
    const config = STATUS_CONFIG[status];

    return (
        <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg">
            <p className="mb-1 text-xs font-semibold text-slate-900">
                People
            </p>

            <div className="flex items-center gap-2">
                <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: config?.color ?? "#94a3b8" }}
                />
                <span className="text-xs text-slate-500">
                    {config?.label ?? status}
                </span>
                <span className="text-xs font-semibold text-slate-900">
                    {item.value}
                </span>
            </div>
        </div>
    );
}

export default function EmploymentStatusChart({
    data,
}: EmploymentStatusChartProps) {
    const statuses = STATUS_ORDER.map((status) => ({
        status,
        count: data.find((item) => item.status === status)?.count ?? 0,
    }));

    return (
        <div className="col-span-6 lg:col-span-3 w-full rounded-[20px] border border-slate-200/80 bg-white px-6 py-6 shadow-sm">
            <div className="mb-4">
                <h2 className="text-base font-semibold text-slate-950">
                    Employment status
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Active, on leave and terminated
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                <div className="h-52 w-full min-w-0 sm:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={statuses.filter((item) => item.count > 0)}
                                dataKey="count"
                                nameKey="status"
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
                                {statuses
                                    .filter((item) => item.count > 0)
                                    .map((item) => (
                                        <Cell
                                            key={item.status}
                                            fill={STATUS_CONFIG[item.status].color}
                                        />
                                    ))}
                            </Pie>

                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex w-full min-w-0 flex-col gap-3 sm:w-1/2">
                    {statuses.map((item) => (
                        <div
                            key={item.status}
                            className="flex items-center justify-between gap-4"
                        >
                            <div className="flex min-w-0 items-center gap-2">
                                <span
                                    className="size-2.5 shrink-0 rounded-full"
                                    style={{
                                        backgroundColor:
                                            STATUS_CONFIG[item.status].color,
                                    }}
                                />
                                <span className="truncate text-sm text-slate-500">
                                    {STATUS_CONFIG[item.status].label}
                                </span>
                            </div>

                            <span className="text-sm font-medium text-slate-950">
                                {item.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
