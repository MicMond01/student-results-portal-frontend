// src/components/shared/GlassPanel.tsx
import React from "react";
import { cn } from "@/lib/utils"; // if you have shadcn's cn util; else replace with simple join

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export const GlassPanel: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl",
        "supports-[backdrop-filter]:backdrop-saturate-150",
        className
      )}
    >
      {children}
    </div>
  );
};
