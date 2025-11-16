import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { IAdminStudentsByLevel } from "../type";

const StudentsByLevelChart: React.FC<{ data: IAdminStudentsByLevel[] }> = ({
  data,
}) => {
  const chartData = data.map((item) => ({
    name: `${item._id} Level`,
    Students: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            border: "1px solid #e2e8f0",
          }}
          labelStyle={{ color: "#0f172a" }}
        />
        <Legend />
        <Bar dataKey="Students" fill="#36013f" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StudentsByLevelChart;
