import { useAppSelector } from "@/lib/hooks/dispatch-hooks";

interface RoleGuardProps {
  allowedRoles: Array<"admin" | "lecturer" | "student">;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const useAuth = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.role;
  return { userRole };
};

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  children,
  fallback = null,
}) => {
  const { userRole } = useAuth();

  if (
    !userRole ||
    !allowedRoles.includes(userRole as "admin" | "lecturer" | "student")
  ) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Usage in components:
// <RoleGuard allowedRoles={["admin"]}>
//   <AdminOnlyButton />
// </RoleGuard>
