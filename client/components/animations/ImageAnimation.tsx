"use client";

import React from "react";

import { motion } from "framer-motion";

const ImageAnimation = ({
  children,
  animations,
}: {
  children: React.ReactNode;
  animations: any;
}) => {
  return (
    <>
      {children && (
        <motion.div
          initial={animations.initial}
          animate={animations.animate}
          transition={animations.transition}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export default ImageAnimation;
