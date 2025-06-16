"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimationAllChildrenProps {
  children: React.ReactNode;
  parentVariant: Variants;
  childVariant: Variants;
}

const AnimationAllChildren = ({
  children,
  parentVariant,
  childVariant,
}: AnimationAllChildrenProps) => {
  return (
    <motion.div
      variants={parentVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={childVariant}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimationAllChildren;
