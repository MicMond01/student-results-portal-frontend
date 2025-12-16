import type { IGradeDistribution } from "@/types/lecturer";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const GradeDistributionChart = ({ data }: { data: IGradeDistribution }) => {
  const chartData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key as keyof IGradeDistribution],
    fill:
      key === "F"
        ? "#ef4444"
        : key === "E"
        ? "#f97316"
        : key === "D"
        ? "#eab308"
        : "#10b981",
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
        barSize={32}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f1f5f9"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: "#f8fafc" }}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.name === "A" || entry.name === "B" || entry.name === "C"
                  ? "#10b981"
                  : entry.name === "D"
                  ? "#eab308"
                  : entry.name === "E"
                  ? "#f97316"
                  : "#ef4444"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GradeDistributionChart;
