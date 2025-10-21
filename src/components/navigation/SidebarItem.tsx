// src/components/navigation/SidebarItem.tsx
import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/context/sidebar";
import type { NavItem } from "@/types/app";
import { Icon } from "@/components/ui/Icon";

type Props = { item: NavItem };

const SidebarItem: React.FC<Props> = ({ item }) => {
  const { collapsed, hoverExpand } = useSidebar();
  const [open, setOpen] = useState(false);
  const isCollapsed = collapsed && !hoverExpand;

  const hasChildren = useMemo(
    () => item.children && item.children.length > 0,
    [item]
  );

  return (
    <div className="w-full">
      {item.to ? (
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            [
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-[#cdc1ff]/60 text-[#2b2653]"
                : "text-[#2b2653]/80 hover:bg-[#e5d9f2] hover:text-[#2b2653]",
            ].join(" ")
          }
        >
          <div className="flex h-6 w-6 items-center justify-center text-[#7371fc]">
            {item.icon}
          </div>
          {!isCollapsed && <span className="truncate">{item.label}</span>}
        </NavLink>
      ) : (
        <button
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-[#2b2653]/80 hover:bg-[#e5d9f2] hover:text-[#2b2653]"
        >
          <div className="flex h-6 w-6 items-center justify-center text-[#7371fc]">
            {item.icon}
          </div>
          {!isCollapsed && (
            <span className="flex-1 truncate">{item.label}</span>
          )}
          {!isCollapsed && hasChildren && (
            <Icon.chevron
              className={`h-4 w-4 transition-transform ${
                open ? "rotate-90" : ""
              }`}
            />
          )}
        </button>
      )}

      <AnimatePresence initial={false}>
        {hasChildren && !isCollapsed && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="ml-9 mt-1 space-y-1"
          >
            {item.children!.map((c) => (
              <NavLink
                key={c.id}
                to={c.to}
                className={({ isActive }) =>
                  [
                    "block rounded-md px-2 py-1.5 text-sm",
                    isActive
                      ? "bg-[#cdc1ff]/60 text-[#2b2653]"
                      : "text-[#2b2653]/70 hover:bg-[#e5d9f2] hover:text-[#2b2653]",
                  ].join(" ")
                }
              >
                {c.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarItem;
