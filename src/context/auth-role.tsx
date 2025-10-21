// src/context/auth-role.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import type { Role } from "@/types/app";

type AuthRoleCtx = {
  role: Role;
  setRole: (r: Role) => void;
  userName: string;
};

const AuthRoleContext = createContext<AuthRoleCtx | null>(null);

export const AuthRoleProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Demo: default to "student"; swap to "lecturer" to see different nav
  const [role, setRole] = useState<Role>("student");
  const value = useMemo(
    () => ({
      role,
      setRole,
      userName: role === "lecturer" ? "Dr. Ade" : "Gbenga",
    }),
    [role]
  );
  return (
    <AuthRoleContext.Provider value={value}>
      {children}
    </AuthRoleContext.Provider>
  );
};

export const useAuthRole = () => {
  const ctx = useContext(AuthRoleContext);
  if (!ctx) throw new Error("useAuthRole must be used within AuthRoleProvider");
  return ctx;
};
