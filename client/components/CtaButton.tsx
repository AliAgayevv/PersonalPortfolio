"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import emailSVG from "@/public/svg/email.svg";
import Image from "next/image";

const CtaButton = ({
  innerText,
  mode,
}: {
  innerText: string;
  mode: "email" | "start";
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: `
          0px 24px 52.8px rgba(0, 0, 0, 0.35),
          0px 9.44px 20.77px rgba(0, 0, 0, 0.137),
          0px 4.25px 9.36px rgba(0, 0, 0, 0.063),
          0px 1.94px 4.26px rgba(0, 0, 0, 0.027),
          0px 0.71px 1.56px rgba(0, 0, 0, 0.01)
        `,
      }}
      className="px-[clamp(20px,4vw,32px)] py-[clamp(10px,2.5vw,16px)] bg-black text-white text-[clamp(14px,1.1vw,18px)] font-medium rounded-3xl hover:bg-neutral-900 transition-all duration-300 flex items-center gap-2
      
      "
    >
      <div className="relative overflow-hidden h-[1.5em] w-auto">
        {mode === "start" ? (
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
        ) : (
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
        )}
      </div>

      {mode === "start" ? (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-[clamp(14px,1vw,20px)] h-[clamp(14px,1vw,20px)]"
          animate={{ x: hovered ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </motion.svg>
      ) : (
        // email icon
        <Image alt="email Svg" src={emailSVG} />
      )}
    </button>
  );
};

export default CtaButton;
