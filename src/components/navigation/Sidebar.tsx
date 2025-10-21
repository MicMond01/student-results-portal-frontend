// src/components/navigation/Sidebar.tsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import SidebarItem from "./SidebarItem";
import { useSidebar } from "@/context/sidebar";
import { useAuthRole } from "@/context/auth-role";
import type { NavItem } from "@/types/app";
import { Icon } from "@/components/ui/Icon";

const Sidebar: React.FC = () => {
  const { role } = useAuthRole();
  const { collapsed, hoverExpand, setHoverExpand } = useSidebar();

  const items = useMemo<NavItem[]>(() => {
    const base: NavItem[] = [
      {
        id: "dashboard",
        label: "Dashboard",
        to: "/",
        icon: <Icon.dashboard className="h-5 w-5" />,
      },
      {
        id: "students",
        label: "Students",
        to: "/students",
        icon: <Icon.students className="h-5 w-5" />,
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
            roles: ["student", "lecturer"],
          },
          {
            id: "c2",
            label: "Manage Courses",
            to: "/courses/manage",
            roles: ["lecturer"],
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
            roles: ["student", "lecturer"],
          },
          {
            id: "e2",
            label: "Results",
            to: "/exams/results",
            roles: ["student", "lecturer"],
          },
          {
            id: "e3",
            label: "Gradebook",
            to: "/exams/gradebook",
            roles: ["lecturer"],
          },
        ],
      },
    ];
    // Filter by role for items and children
    return base
      .filter((i) => !i.roles || i.roles.includes(role))
      .map((i) =>
        i.children
          ? {
              ...i,
              children: i.children.filter(
                (c) => !c.roles || c.roles.includes(role)
              ),
            }
          : i
      );
  }, [role]);

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
