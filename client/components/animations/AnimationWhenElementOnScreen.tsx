"use client";

import React from "react";
import {
  motion,
  TargetAndTransition,
  VariantLabels,
  Transition,
} from "framer-motion";

interface AnimationWhenElementOnScreenProps {
  children: React.ReactNode;
  animations: {
    initial?: TargetAndTransition | VariantLabels;
    whileInView?: TargetAndTransition | VariantLabels;
    transition?: Transition;
    viewport?: Partial<{
      once: boolean;
      amount: number | "some" | "all";
    }>;
  };
}

const AnimationWhenElementOnScreen = ({
  children,
  animations,
}: AnimationWhenElementOnScreenProps) => {
  return (
    <motion.div
      initial={animations.initial}
      whileInView={animations.whileInView}
      transition={animations.transition}
      viewport={animations.viewport}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimationWhenElementOnScreen;
