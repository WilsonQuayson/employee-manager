
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { SalaryBand } from "../types/dashboard";

type SalaryBandsChartProps = {
    data: SalaryBand[];
};

const COLORS = {
    minimum: "#c3e9da",
    average: "#159f6b",
    maximum: "#85ccb0",
};

const formatSalary = (value: number) =>
    new Intl.NumberFormat("en-BE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(value);

type CustomTooltipProps = {
    active?: boolean;
    label?: string | number;
    payload?: Array<{
        name?: string;
        value?: number;
        color?: string;
    }>;
};

function CustomTooltip({ active, label, payload }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg">
            <p className="mb-2 text-xs font-semibold text-slate-900">
                {label}
            </p>

            <div className="flex flex-col gap-1.5">
                {payload.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <span
                            className="size-2.5 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-slate-500">
                            {item.name}
                        </span>
                        <span className="ml-auto text-xs font-semibold text-slate-900">
                            {item.value != null ? formatSalary(item.value) : "—"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function SalaryBandsChart({ data }: SalaryBandsChartProps) {
    return (
        <div className="col-span-6 w-full rounded-[20px] border border-slate-200/80 bg-white px-6 py-6 shadow-sm">
            <div className="mb-4">
                <h2 className="text-base font-semibold text-slate-950">
                    Salary bands by position
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Position min / max vs. average salary
                </p>
            </div>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 8, right: 8, bottom: 12, left: 0 }}
                        barGap={4}
                        barCategoryGap="12%"
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="#e2e8f0"
                            strokeDasharray="4 4"
                            strokeWidth={1}
                        />

                        <XAxis
                            dataKey="position"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 11 }}
                            tickMargin={14}
                            interval={0}
                            height={45}
                        />

                        <YAxis
                            domain={[0, "auto"]}
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            tickMargin={12}
                            width={55}
                            tickFormatter={(value: number) => `€${value / 1000}k`}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: "rgba(16,185,129,0.04)" }}
                        />

                        <Legend
                            verticalAlign="top"
                            align="right"
                            iconType="circle"
                            wrapperStyle={{ fontSize: 12, paddingBottom: 12 }}
                        />

                        <Bar
                            dataKey="minimumSalary"
                            name="Minimum"
                            fill={COLORS.minimum}
                            radius={[6, 6, 0, 0]}
                            maxBarSize={32}
                        />

                        <Bar
                            dataKey="averageSalary"
                            name="Average"
                            fill={COLORS.average}
                            radius={[6, 6, 0, 0]}
                            maxBarSize={32}
                        />

                        <Bar
                            dataKey="maximumSalary"
                            name="Maximum"
                            fill={COLORS.maximum}
                            radius={[6, 6, 0, 0]}
                            maxBarSize={32}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
