// src/components/auth/SocialButton.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};

export const SocialButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="w-full h-11 border-white/40 bg-white/60 hover:bg-white text-[#2b2653]"
    >
      {children}
    </Button>
  );
};
