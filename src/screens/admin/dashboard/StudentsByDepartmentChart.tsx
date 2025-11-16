import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { IAdminStudentsByDepartment } from "../type";

const StudentsByDepartmentChart: React.FC<{
  data: IAdminStudentsByDepartment[];
}> = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.departmentName,
    value: item.count,
  }));

  const COLORS = [" #36013f", "#2b2653 ", "#7371fc", "#c7d2fe"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          innerRadius={80}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={5}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            border: "1px solid #e2e8f0",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StudentsByDepartmentChart;
