// src/pages/students/StudentsList.tsx
import React, { useMemo } from "react";
import DataTable from "@/components/tables/DataTable";
import AvatarCell from "@/components/tables/cells/AvatarCell";
import StatusBadge from "@/components/tables/cells/StatusBadge";
import type { Student } from "@/types/student";
import { useNavigate } from "react-router-dom";

const mock: Student[] = [
  {
    id: "1",
    name: "Jacob Jones",
    email: "jacob.jones@example.com",
    enrolledAt: "2023-02-10",
    gpa: 3.4,
    status: "Active",
    source: "Facebook",
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    enrolledAt: "2022-09-18",
    gpa: 3.9,
    status: "Active",
    source: "Instagram",
  },
  {
    id: "3",
    name: "David Brown",
    email: "david.brown@example.com",
    enrolledAt: "2021-11-03",
    gpa: 3.1,
    status: "Probation",
    source: "LinkedIn",
  },
  {
    id: "4",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    enrolledAt: "2020-06-22",
    gpa: 3.7,
    status: "Alumni",
    source: "Github",
  },
  {
    id: "5",
    name: "Brian Wilson",
    email: "brian.wilson@example.com",
    enrolledAt: "2024-01-05",
    gpa: 3.5,
    status: "Active",
    source: "Twitter",
  },
];

const StudentsList: React.FC = () => {
  const nav = useNavigate();
  const cols = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        render: (r: Student) => <AvatarCell name={r.name} />,
      },
      { key: "email", header: "Email" },
      { key: "source", header: "Source" },
      { key: "enrolledAt", header: "Enrolled" },
      { key: "gpa", header: "GPA" },
      {
        key: "status",
        header: "Status",
        render: (r: Student) => <StatusBadge status={r.status} />,
      },
      {
        key: "action",
        header: "Action",
        render: (r: Student) => <span className="text-[#7371fc]">View</span>,
        className: "text-right",
      },
    ],
    []
  );

  return (
    <DataTable<Student>
      data={mock}
      columns={cols}
      searchableKeys={["name", "email", "source", "status"]}
      onRowClick={(row) => nav(`/students/${row.id}`)}
    />
  );
};

export default StudentsList;
