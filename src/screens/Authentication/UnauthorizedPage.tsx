import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-destructive">403</h1>
        <h2 className="text-2xl font-semibold">Access Denied</h2>
        <p className="text-muted-foreground max-w-md">
          You don't have permission to access this page. Please contact an
          administrator if you believe this is an error.
        </p>
        <Button asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
