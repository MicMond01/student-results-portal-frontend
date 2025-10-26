// src/components/navigation/Topbar.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/Icon";
import { useSidebar } from "@/context/sidebar";
import ProfileDropdown from "../ui-components/ProfileDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";

const Topbar: React.FC = () => {
  const { collapsed, setCollapsed, hoverExpand } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);

  const isCollapsed = collapsed && !hoverExpand;

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-white/40 bg-white/60 px-4 backdrop-blur-xl sm:px-6 lg:pl-2 lg:pr-8">
      <div className="relative hidden w-80 items-center sm:flex">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-[#2b2653] lg:mr-5"
          onClick={() => {
            if (!hoverExpand) setCollapsed(!collapsed);
          }}
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
            <DropdownMenu
              open={isOpen}
              onOpenChange={(isOpen) => setIsOpen(isOpen)}
              modal={false}
            >
              <DropdownMenuTrigger>
                <div onMouseEnter={() => setIsOpen(true)}>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={10}
                className="w-full bg-white mr-8 border-none p-4"
                onMouseLeave={() => setIsOpen(false)}
                onCloseAutoFocus={(e) => {
                  e.preventDefault();
                }}
              >
                <DropdownMenuSeparator />

                <ProfileDropdown />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
