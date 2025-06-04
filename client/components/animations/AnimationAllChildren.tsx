"use client";

import React from "react";
import { motion } from "framer-motion";

const AnimationAllChildren = ({
  children,
  parentVariant,
  childVariant,
}: {
  children: React.ReactNode;
  parentVariant: any;
  childVariant: any;
}) => {
  return (
    <motion.div
      variants={parentVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
    >
      {React.Children.map(children, (child: any) => (
        <motion.div variants={childVariant}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

export default AnimationAllChildren;
