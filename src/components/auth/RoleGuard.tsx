interface RoleGuardProps {
  allowedRoles: Array<"admin" | "lecturer" | "student">;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  children,
  fallback = null,
}) => {
  const { userRole } = useAuth();

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Usage in components:
// <RoleGuard allowedRoles={["admin"]}>
//   <AdminOnlyButton />
// </RoleGuard>
