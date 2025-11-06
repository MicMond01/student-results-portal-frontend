// src/pages/LoginPage.tsx
import * as React from "react";
import { GlassPanel } from "@/components/shared/GlassPanel";
// import { LoginForm } from "@/components/auth/LoginForm";
import { motion } from "framer-motion";
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

const AuthenticationPage: React.FC = () => {
  const { authState, user, logout } = useAuthStore();

  switch (authState) {
    case "loggedOut":
      return <LoginForm />;
    case "needsVerification":
      return <VerificationForm />;
    case "needsPasswordChange":
      return <ChangePasswordForm />;
    case "loggedIn":
      // In a real app, this would be a redirect to the main dashboard
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Login Successful!</CardTitle>
              <CardDescription>
                You are now logged in as {user?.name} ({user?.role}).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>You would now be redirected to your dashboard.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={logout} className="w-full">
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
// // src/pages/LoginPage.tsx
// import * as React from "react";
// import { GlassPanel } from "@/components/shared/GlassPanel";
// import { LoginForm } from "@/components/auth/LoginForm";
// import { motion } from "framer-motion";

// const pageVariants = {
//   initial: { opacity: 0, y: 16, filter: "blur(4px)" },
//   animate: { opacity: 1, y: 0, filter: "blur(0px)" },
//   exit: { opacity: 0, y: -16, filter: "blur(4px)" },
// };

// // If user is loging in with eamil then the user is a lecturer
// // If user is loging in with matriculation number, then user is a student

// const AuthenticationPage: React.FC = () => {
//   return (
//     <div
//       className={[
//         "min-h-screen w-full",
//         "bg-[url('/public/image/banner_new.png')]",
//         "bg-no-repeat bg-center bg-cover",
//       ].join(" ")}
//       //   className={[
//       //     "min-h-screen w-full",
//       //     "bg-[radial-gradient(1200px_800px_at_-10%_-20%,#f5efff,transparent_60%),radial-gradient(1000px_700px_at_110%_120%,#e5d9f2,transparent_60%)]",
//       //     "bg-[#cdc1ff]",
//       //   ].join(" ")}
//     >
//       <div className="mx-auto  flex  flex-col px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
//         {/* Left side (empty on large screens) */}
//         <div className="hidden lg:block lg:w-1/2 " />

//         {/* Right side: the panel */}
//         <div className=" lg:w-1/2 h-[90vh] flex flex-col justify-center items-center  bg-[#cdc1ff]">
//           <motion.div
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
//             className=" h-[70vh] w-3/4"
//           >
//             <GlassPanel className="p-6 sm:p-8 md:p-10">
//               <div className="mx-auto w-full max-w-md">
//                 <div className="mb-6 flex items-center gap-2">
//                   <div className="h-8 w-8 rounded-lg bg-[#7371fc]" />
//                   <div className="h-8 w-8 rounded-lg bg-[#a594f9]" />
//                   <div className="h-8 w-8 rounded-lg bg-[#cdc1ff]" />
//                 </div>

//                 <LoginForm />
//               </div>
//             </GlassPanel>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthenticationPage;
