// src/pages/dashboard/Overview.tsx
import { useGetLecturerCoursesAnalyticsQuery } from "@/redux/query/lecturer";
import React from "react";
import StatsCard from "./StatsCard";

const Overview: React.FC = () => {
  const { data: analyticsData } = useGetLecturerCoursesAnalyticsQuery();
  console.log(analyticsData);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <StatsCard
        title="Total Number of Students"
        subTitle={`${analyticsData?.analytics.overall?.totalStudents || 0}`}
      />
      <StatsCard
        title="Overall Average GPA"
        subTitle={`${analyticsData?.analytics.overall?.overallAverageGPA || 0}`}
      />
      <StatsCard
        title="Pass Rate"
        subTitle={`${analyticsData?.analytics.overall?.passRate || 0}`}
      />
    </div>
  );
};

export default Overview;
