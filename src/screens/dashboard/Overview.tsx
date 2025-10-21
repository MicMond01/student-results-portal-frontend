// src/pages/dashboard/Overview.tsx
import React from "react";

const Overview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl">
        <div className="text-sm text-[#2b2653]/70">Enrolled</div>
        <div className="mt-2 text-3xl font-semibold text-[#2b2653]">1,248</div>
      </div>
      <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl">
        <div className="text-sm text-[#2b2653]/70">Average GPA</div>
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
