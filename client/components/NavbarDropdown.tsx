"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const NavbarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="px-4 py-4  bg-black rounded-[10px] flex items-center justify-center cursor-pointer relative"
    >
      <motion.div
        animate={{ scale: isOpen ? 4 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-2 h-2 bg-white rounded-full "
      />
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-12 right-1/2 translate-x-1/2 bg-black shadow-lg rounded-lg p-4"
        >
          <motion.ul
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <LiWithAnimation>About</LiWithAnimation>
            <LiWithAnimation>Projects</LiWithAnimation>
            <LiWithAnimation>Contact</LiWithAnimation>
            <LiWithAnimation>Blog</LiWithAnimation>
            <LiWithAnimation>Resume</LiWithAnimation>
          </motion.ul>
        </motion.div>
      )}
    </div>
  );
};

const LiWithAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="text-white"
    >
      {children}
    </motion.li>
  );
};

export default NavbarDropdown;
