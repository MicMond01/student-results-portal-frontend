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
          setUserRole(res.user.role);
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
        id: "dashboard",
        label: "Dashboard",
        to: "/",
        icon: <Icon.dashboard className="h-5 w-5" />,
        allowedRoles: ["student", "lecturer", "admin"], // added admin too
      },
      {
        id: "students",
        label: "Students",
        to: "/students",
        icon: <Icon.students className="h-5 w-5" />,
        allowedRoles: ["admin"],
      },
      {
        id: "courses",
        label: "Courses",
        icon: <Icon.courses className="h-5 w-5" />,
        children: [
          {
            id: "c1",
            label: "My Courses",
            to: "/courses",
            allowedRoles: ["student", "lecturer"],
          },
          {
            id: "c2",
            label: "Manage Courses",
            to: "/courses/manage",
            allowedRoles: ["lecturer"],
          },
        ],
      },
      {
        id: "exams",
        label: "Exams",
        icon: <Icon.exams className="h-5 w-5" />,
        children: [
          {
            id: "e1",
            label: "Schedule",
            to: "/exams/schedule",
            allowedRoles: ["student", "lecturer"],
          },
          {
            id: "e2",
            label: "Results",
            to: "/exams/results",
            allowedRoles: ["student", "lecturer"],
          },
          {
            id: "e3",
            label: "Gradebook",
            to: "/exams/gradebook",
            allowedRoles: ["lecturer"],
          },
        ],
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
          <div className="h-8 w-8 rounded-lg bg-[#7371fc]" />
          {!isCollapsed && (
            <span className="text-sm font-semibold text-[#2b2653]">
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
