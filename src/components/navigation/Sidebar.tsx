// src/components/navigation/Sidebar.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SidebarItem from "./SidebarItem";
import { useSidebar } from "@/context/sidebar";
import { Icon } from "@/components/ui/Icon";
import { useLazyGetLoggedInUserQuery } from "@/redux/query/auth";
import type { NavItem } from "@/types/app";

const Sidebar: React.FC = () => {
  const { collapsed, hoverExpand, setHoverExpand } = useSidebar();
  const [getAuthUser] = useLazyGetLoggedInUserQuery();
  const [userRole, setUserRole] = useState<"admin" | "lecturer" | "student">(
    "student"
  );

  // ✅ Fetch logged-in user once
  useEffect(() => {
    (async () => {
      try {
        const res = await getAuthUser().unwrap();
        if (res && res.user?.role) {
          if (["admin", "lecturer", "student"].includes(res.user.role)) {
            setUserRole(res.user.role as "admin" | "lecturer" | "student");
          }
        }
      } catch (err) {
        console.error("Failed to fetch logged-in user:", err);
      }
    })();
  }, [getAuthUser]);

  // ✅ Define sidebar items
  const items = useMemo<NavItem[]>(() => {
    const base: NavItem[] = [
      {
        id: "st-dashboard",
        label: "Dashboard",
        to: "/student/dashboard",
        icon: <Icon.dashboard className="h-5 w-5" />,
        allowedRoles: ["student"],
      },
      {
        id: "lr-dashboard",
        label: "Dashboard",
        to: "/lecturer/dashboard",
        icon: <Icon.dashboard className="h-5 w-5" />,
        allowedRoles: ["lecturer"],
      },
      {
        id: "ad-dashboard",
        label: "Dashboard",
        to: "/admin/dashboard",
        icon: <Icon.dashboard className="h-5 w-5" />,
        allowedRoles: ["admin"],
      },
      {
        id: "my-students",
        label: "My Students",
        icon: <Icon.courses className="h-5 w-5" />,
        allowedRoles: ["lecturer"],
        children: [
          {
            id: "my1",
            label: "Students List",
            to: "/myStudents",
            allowedRoles: ["admin", "lecturer"],
          },
          {
            id: "my2",
            label: "Manage Courses",
            to: "/courses/manage",
            allowedRoles: ["lecturer"],
          },
        ],
      },
      {
        id: "lecturer-profile",
        label: "Lecturer Profile",
        icon: <Icon.courses className="h-5 w-5" />,
        allowedRoles: ["lecturer"],
        children: [
          {
            id: "l1",
            label: "Profile",
            to: "/profile",
            allowedRoles: ["lecturer"],
          },
          {
            id: "l2",
            label: "Update Profile",
            to: "/profile-update",
            allowedRoles: ["lecturer"],
          },
        ],
      },

      {
        id: "lecturer-courses",
        label: "My Courses",
        icon: <Icon.courses className="h-5 w-5" />,
        to: "/courses",
        allowedRoles: ["lecturer"],
      },
      {
        id: "exams",
        label: "Exams",
        icon: <Icon.exams className="h-5 w-5" />,
        to: "/exams",
        allowedRoles: ["lecturer"],
      },
      {
        id: "student-profile",
        label: "Profile",
        icon: <Icon.profile />,
        to: "/myprofile",
        allowedRoles: ["student"],
      },
      {
        id: "student-results",
        label: "Results",
        icon: <Icon.students className="h-5 w-5" />,
        to: "/myresults",
        allowedRoles: ["student"],
      },
      {
        id: "student-courses",
        label: "Courses",
        icon: <Icon.exams className="h-5 w-5" />,
        to: "/mycourses",
        allowedRoles: ["student"],
      },
      {
        id: "ad-courses",
        label: "All Courses",
        icon: <Icon.courses className="h-5 w-5" />,
        allowedRoles: ["admin"],
        children: [
          {
            id: "ad-courses",
            label: "Courses",
            to: "/admin/courses",
            allowedRoles: ["admin"],
          },
          {
            id: "ad-courses-dt",
            label: "Course Details",
            to: "/admin/course-details",
            allowedRoles: ["admin"],
          },
        ],
      },
      {
        id: "ad-departments",
        label: "All Departments",
        icon: <Icon.courses className="h-5 w-5" />,
        allowedRoles: ["admin"],
        children: [
          {
            id: "ad-department",
            label: "Departments",
            to: "/admin/departments",
            allowedRoles: ["admin"],
          },
        ],
      },
      {
        id: "ad-lecturers",
        label: "Lecturers",
        icon: <Icon.exams className="h-5 w-5" />,
        to: "/admin/lecturers",
        allowedRoles: ["admin"],
      },
    ];

    // ✅ Filter items and children based on role
    return base
      .filter(
        (item) => !item.allowedRoles || item.allowedRoles.includes(userRole)
      )
      .map((item) =>
        item.children
          ? {
              ...item,
              children: item.children.filter(
                (child) =>
                  !child.allowedRoles || child.allowedRoles.includes(userRole)
              ),
            }
          : item
      );
  }, [userRole]);

  const isCollapsed = collapsed && !hoverExpand;

  return (
    <motion.aside
      onMouseEnter={() => collapsed && setHoverExpand(true)}
      onMouseLeave={() => setHoverExpand(false)}
      animate={{ width: isCollapsed ? 72 : 264 }}
      transition={{ duration: 0.25 }}
      className="relative z-20 flex h-full shrink-0 flex-col border-r border-white/40 bg-white/60 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          {!isCollapsed && (
            <span className="text-sm font-semibold text-foreground">
              School Admin
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
