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

const GradeDistributionChart = ({ data }: { data: Record<string, number> }) => {
  const chartData = ["A", "B", "C", "D", "E", "F"].map((key) => ({
    name: key,
    value: data[key as keyof typeof data] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
        barSize={40}
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
          tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
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
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          }}
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
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
