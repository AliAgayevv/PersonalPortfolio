"use client";

import React from "react";
import {
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from "framer-motion";

interface TextAnimationProps {
  children: React.ReactNode;
  animations: {
    initial?: VariantLabels | TargetAndTransition;
    animate?: VariantLabels | TargetAndTransition;
    transition?: Transition;
  };
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  children,
  animations,
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

export default TextAnimation;
