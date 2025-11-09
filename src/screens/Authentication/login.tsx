import LoginForm from "./LoginForm";
import VerificationForm from "./VerificationForm";
import ChangePasswordForm from "./ChangePasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { exitUser } from "@/redux/slices/auth";
import { useAppSelector } from "@/lib/hooks/dispatch-hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthenticationPage = () => {
  const { user, nextStep } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(nextStep);

  useEffect(() => {
    // Handle automatic navigation logic
    if (nextStep === "verification") {
      navigate("/verify-identity");
    } else if (nextStep === "change-password") {
      navigate("/change-password");
    } else if (nextStep === "dashboard") {
      const timer = setTimeout(() => navigate("/dashboard"), 3000);
      return () => clearTimeout(timer);
    }
  }, [nextStep, navigate]);

  switch (nextStep) {
    case null:
      return <LoginForm />;

    case "verification":
      return <VerificationForm />;

    case "change-password":
      return <ChangePasswordForm />;

    case "dashboard":
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Login Successful!</CardTitle>
              <CardDescription>
                You are now logged in as {user?.name} ({user?.role}).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>You will be redirected to your dashboard shortly.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => exitUser()} className="w-full">
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </div>
      );

    default:
      return <LoginForm />;
  }
};

export default AuthenticationPage;
