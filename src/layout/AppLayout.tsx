// src/layout/AppLayout.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";
import Topbar from "@/components/navigation/Topbar";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

const pageVariants = {
  initial: { opacity: 0, y: 8, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(2px)" },
};

const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f5efff]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <div className="scrollbar-thin scrollbar-thumb-[#a594f9]/50 scrollbar-track-transparent flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
