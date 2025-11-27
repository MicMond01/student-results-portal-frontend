import { BookOpen, Users, TrendingUp, Activity } from "lucide-react";
import StatCard from "../stat-card";
import type { IAdminStatStats } from "../../type";

interface StatsGridProps {
  stats?: IAdminStatStats;
}
const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Courses"
        value={stats?.totalCourses || 0}
        icon={BookOpen}
        color="bg-blue-500"
      />
      <StatCard
        title="Students Taught"
        value={stats?.totalStudentsAcrossAllCourses || 0}
        icon={Users}
        color="bg-purple-500"
      />
      <StatCard
        title="Pass Rate"
        value={`${stats?.passRate}%`}
        icon={TrendingUp}
        color="bg-green-500"
        trend="+2.4% vs last session"
      />
      <StatCard
        title="Avg. Performance"
        value={`${stats?.averagePerformance}%`}
        icon={Activity}
        color="bg-amber-500"
      />
    </div>
  );
};

export default StatsGrid;
