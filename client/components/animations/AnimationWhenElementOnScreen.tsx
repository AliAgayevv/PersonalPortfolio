"use client";

import React from "react";

import { AnimatePresence, motion } from "framer-motion";

const AnimationWhenElementOnScreen = ({
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
          whileInView={animations.whileInView}
          transition={animations.transition}
          viewport={animations.viewport}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export default AnimationWhenElementOnScreen;
