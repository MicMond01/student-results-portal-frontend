// src/components/navigation/Topbar.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/Icon";
import { useAuthRole } from "@/context/auth-role";
import { useSidebar } from "@/context/sidebar";

const Topbar: React.FC = () => {
  const { userName, role } = useAuthRole();
  const { collapsed, setCollapsed, hoverExpand } = useSidebar();

  const isCollapsed = collapsed && !hoverExpand;

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-white/40 bg-white/60 px-4 backdrop-blur-xl sm:px-6 lg:pl-2 lg:pr-8">
      <div className="relative hidden w-80 items-center sm:flex">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-[#2b2653] lg:mr-5"
          onClick={() => (hoverExpand ? null : setCollapsed((v) => !v))}
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          <Icon.menu className="h-5 w-5" />
        </Button>

        <Input className="pl-9" placeholder="Search…" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" className="hidden sm:inline-flex gap-2">
          <Icon.plus className="h-4 w-4" />
          <span>Create</span>
        </Button>
        <Button size="icon" variant="ghost" className="relative">
          <Icon.bell className="h-5 w-5 text-[#7371fc]" />
          <span className="absolute right-1 top-1 inline-block h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#a594f9]">
            <img
              alt={userName}
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
                userName
              )}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden text-sm leading-tight md:block">
            <div className="font-medium text-[#2b2653]">{userName}</div>
            <div className="text-xs text-[#2b2653]/70 capitalize">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
