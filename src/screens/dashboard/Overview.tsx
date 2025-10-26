// src/pages/dashboard/Overview.tsx
import { useGetAllResultsForLecturerCoursesQuery } from "@/redux/query/lecturer";
import React from "react";

const Overview: React.FC = () => {
  const { data } = useGetAllResultsForLecturerCoursesQuery();
  console.log(data);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl">
        <div className="text-sm text-[#2b2653]/70">Enrolled</div>
        <div className="mt-2 text-3xl font-semibold text-[#2b2653]">
          {data?.totalStudents || 0}
        </div>
      </div>
      <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl">
        <div className="text-sm text-[#2b2653]/70">
          Average GPA (Current Session)
        </div>
        <div className="mt-2 text-3xl font-semibold text-[#2b2653]">3.42</div>
      </div>
      <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl">
        <div className="text-sm text-[#2b2653]/70">On Probation</div>
        <div className="mt-2 text-3xl font-semibold text-[#2b2653]">32</div>
      </div>
    </div>
  );
};

export default Overview;
