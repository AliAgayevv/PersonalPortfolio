"use client";

import React from "react";
import {
  motion,
  TargetAndTransition,
  VariantLabels,
  Transition,
} from "framer-motion";

interface ImageAnimationProps {
  children: React.ReactNode;
  animations: {
    initial?: TargetAndTransition | VariantLabels;
    animate?: TargetAndTransition | VariantLabels;
    transition?: Transition;
  };
}

const ImageAnimation = ({ children, animations }: ImageAnimationProps) => {
  return (
    <motion.div
      initial={animations.initial}
      animate={animations.animate}
      transition={animations.transition}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default ImageAnimation;
