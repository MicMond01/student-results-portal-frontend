import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface MotionDropdownProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const MotionDropdown: React.FC<MotionDropdownProps> = ({
  isOpen,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dropdown-motion"
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotionDropdown;
