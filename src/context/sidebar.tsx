// src/context/sidebar.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SidebarCtx = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  hoverExpand: boolean;
  setHoverExpand: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarCtx | null>(null);

export const SidebarProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [hoverExpand, setHoverExpand] = useState<boolean>(false);

  // Default collapsed on small screens, expanded on lg+
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = (matches: boolean) => setCollapsed(!matches);
    // Initialize based on current media query state
    apply(mq.matches);
    const listener = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener?.("change", listener as any);
    return () => mq.removeEventListener?.("change", listener as any);
  }, []);

  const value = useMemo(
    () => ({ collapsed, setCollapsed, hoverExpand, setHoverExpand }),
    [collapsed, hoverExpand]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};
