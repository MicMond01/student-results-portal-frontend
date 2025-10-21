// src/pages/students/StudentDetail.tsx
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import type { Student } from "@/types/student";
import StatusBadge from "@/components/tables/cells/StatusBadge";

const data: Record<string, Student> = {
  "1": {
    id: "1",
    name: "Jacob Jones",
    email: "jacob.jones@example.com",
    enrolledAt: "2023-02-10",
    gpa: 3.4,
    status: "Active",
    phone: "(375) 584-4263",
    source: "Facebook",
  },
  "2": {
    id: "2",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    enrolledAt: "2022-09-18",
    gpa: 3.9,
    status: "Active",
    phone: "(375) 584-4263",
    source: "Instagram",
  },
  "3": {
    id: "3",
    name: "David Brown",
    email: "david.brown@example.com",
    enrolledAt: "2021-11-03",
    gpa: 3.1,
    status: "Probation",
    phone: "(458) 654-6542",
    source: "LinkedIn",
  },
};

const StudentDetail: React.FC = () => {
  const { id } = useParams();
  const student = useMemo(() => (id ? data[id] : undefined), [id]);

  if (!student) {
    return (
      <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl">
        <div className="mb-2 text-lg font-semibold text-[#2b2653]">
          Student not found
        </div>
        <Link to="/students" className="text-[#7371fc] hover:underline">
          Back to students
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl lg:col-span-2">
        <div className="mb-4 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[#cdc1ff]" />
          <div>
            <div className="text-xl font-semibold text-[#2b2653]">
              {student.name}
            </div>
            <div className="text-sm text-[#2b2653]/70">{student.email}</div>
          </div>
          <div className="ml-auto">
            <StatusBadge status={student.status} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Info label="Phone" value={student.phone ?? "—"} />
          <Info label="Source" value={student.source ?? "—"} />
          <Info label="Enrolled" value={student.enrolledAt} />
          <Info label="GPA" value={student.gpa.toFixed(2)} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl">
        <div className="mb-3 text-lg font-semibold text-[#2b2653]">Actions</div>
        <ul className="space-y-2 text-sm text-[#2b2653]">
          <li>
            <button className="rounded-md bg-[#7371fc] px-3 py-2 text-white hover:bg-[#6b67f0]">
              Message Student
            </button>
          </li>
          <li>
            <button className="rounded-md border border-white/40 bg-white/60 px-3 py-2 hover:bg-white">
              Add Note
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Info: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="rounded-xl border border-white/40 bg-white/60 p-4">
    <div className="text-xs uppercase tracking-wide text-[#2b2653]/60">
      {label}
    </div>
    <div className="mt-1 text-sm text-[#2b2653]">{value}</div>
  </div>
);

export default StudentDetail;
