import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockDashboardData } from "../data.ts";

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: string | number }>;
  label?: string | number;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-slate-900">
        {label}
      </p>

      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />

        <span className="text-xs text-slate-500">
          Headcount
        </span>

        <span className="text-xs font-semibold text-slate-900">
          {payload[0].value}
        </span>
      </div>
    </div>
  );
}

export default function EmployeeGrowthChart() {
  const data = mockDashboardData.employeeGrowth;

  return (
    <div className="col-span-6 w-full rounded-[20px] border border-slate-200/80 bg-white px-6 py-6 shadow-sm">

      {/* Header */}
      <div className="mb-2">
        <h2 className="text-base font-semibold text-slate-950">
          Employee growth
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Headcount over the last {data.length} months
        </p>
      </div>

      {/* Chart */}
      <div className="h-90 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              bottom: 0,
              left: 0,
            }}
          >
            <defs>
              <linearGradient
                id="employeeGrowth"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#10b981"
                  stopOpacity={0.18}
                />

                <stop
                  offset="75%"
                  stopColor="#10b981"
                  stopOpacity={0.04}
                />

                <stop
                  offset="100%"
                  stopColor="#10b981"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              strokeWidth={1}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickMargin={14}
            />

            <YAxis
              domain={["dataMin - 10", "dataMax + 10"]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickMargin={12}
              width={42}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#cbd5e1",
                strokeWidth: 1,
              }}
            />

            <Area
              type="monotone"
              dataKey="headcount"
              stroke="#059669"
              strokeWidth={2}
              fill="url(#employeeGrowth)"
              activeDot={{
                r: 4,
                fill: "#10b981",
                stroke: "#10b981",
                strokeWidth: 0,
              }}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}