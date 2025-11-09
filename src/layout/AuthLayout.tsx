import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { School } from "lucide-react";
import backgroundImg from "../assets/background-1.jpg";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, description, children }: AuthLayoutProps) => {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      {" "}
      <div className="w-full bg-bg-1 max-w-4xl overflow-hidden rounded-2xl shadow-2xl md:grid md:grid-cols-3">
        {/* Branding Column */}
        {/* <div className="bg-bg-1 w-full"> */}
        <div className="hidden md:col-span-1 md:flex md:flex-col md:items-center md:justify-center bg-linear-to-b from-primary to-primary-dark p-8 text-primary-foreground">
          <School className="h-24 w-24 text-white" />
          <h2 className="mt-4 text-center text-3xl font-bold text-white">
            University Portal
          </h2>
          <p className="mt-2 text-center text-sm text-primary-foreground/80">
            Access your student or staff dashboard.
          </p>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2 bg-white">
          <Card className="rounded-none border-0 p-4 shadow-none sm:p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AuthLayout;
