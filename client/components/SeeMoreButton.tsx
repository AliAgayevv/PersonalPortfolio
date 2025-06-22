"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SeeMoreButton = ({ innerText }: { innerText: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="px-[clamp(16px,2.8vw,24px)] py-[clamp(4px,1.5vw,7px)] text-[clamp(12px,1vw,16px)] bg-[#B8FF34] text-black font-medium rounded-[2px] transition-all duration-300 flex items-center gap-2"
      >
        <div className="relative overflow-hidden h-[1.5em] w-auto">
          <AnimatePresence mode="wait">
            <motion.span
              key={hovered ? "hovered" : "default"}
              initial={{ y: -20, opacity: 0 }}
              exit={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="inline-block"
            >
              {innerText}
            </motion.span>
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
};

export default SeeMoreButton;
